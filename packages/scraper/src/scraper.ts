import cliProgress from "cli-progress"
import { db } from "db"
import { githubGraphql } from "github-graphql"
import { getSdk, type RepositoryQuery } from "github-graphql/req"
import { GraphQLClient } from "graphql-request"
import type { Repo, RepoMetadata } from "types"
import { getGitHubGraphqlSdk, getGitHubRepoMetadataInBatch } from "./api"
import { logger } from "./logger"
import { githubRepoMetadataToDBRepo } from "./model"
import { parseOwnerAndRepoFromGithubUrl } from "./parser"
import { getGithubRepoMetadataUrl, getGithubRepoToReadmeUrl, getGithubRepoUrl } from "./url"

export async function fetchGitHubRepoReadme(owner: string, repo: string): Promise<string> {
	// console.log(`fetching readme for ${owner}/${repo}`);

	// const sdk = getGitHubGraphqlSdk()
	// const readmeRes = await sdk.RepoReadme({ owner, name: repo })
	// try {
	// 	const readme = (readmeRes.data.repository?.object as { text: string }).text
	// 	return readme
	// } catch (error) {
	// 	console.log(error)
	// 	console.log(readmeRes.data.repository?.object)
	// 	return ""
	// }
	// !object(expression: "HEAD:README.md") { in GitHub Gql Query doesn't seem to work for some repos, got null
	const rawRes = await fetch(getGithubRepoToReadmeUrl(owner, repo), {
		headers: {
			authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
			"User-Agent": "Awesome Analysis"
		}
	})
	const jsonRes = await rawRes.json()
	const decodedContent = atob(jsonRes.content)
	return decodedContent
}

export async function fetchGitHubRepoMetadata(
	owner: string,
	repo: string
): Promise<githubGraphql.RepositoryQuery["repository"] | null> {
	const sdk = getGitHubGraphqlSdk()
	return sdk
		.Repository({
			owner,
			name: repo
		})
		.then((res) => res.data.repository)
		.catch(() => null)
}

/**
 * From database, find all `awesome-*` repos with more than $minStars stars
 * And last update is within $recentMonths months
 * @param minStars
 * @param recentMonths
 * @returns
 */
export async function findAwesomeRepos(options?: { minStars?: number; recentMonths?: number }) {
	options = options || {}
	const minStars = options.minStars ?? 100
	const recentMonths = options.recentMonths ?? 2
	console.log("recentMonths", recentMonths)

	return db.client.repo.findMany({
		select: {
			id: true,
			stars: true,
			url: true,
			name: true,
			createdAt: true,
			updatedAt: true,
			repoCreatedAt: true
		},
		where: {
			stars: { gte: minStars },
			name: { contains: "awesome-", mode: "insensitive" },
			repoUpdatedAt: { gte: new Date(new Date().setMonth(new Date().getMonth() - recentMonths)) }
		},
		orderBy: {
			stars: "desc"
		}
	})
}

/**
 * Add given github repo to database
 * `draft` field will always update to `false` because after indexing, it's no longer draft
 * @param githubRepoUrl
 */
export async function indexGitHubRepo(githubRepoUrl: string) {
	const parse = parseOwnerAndRepoFromGithubUrl(githubRepoUrl)
	if (!parse) {
		return
	}
	const { owner, name: repoName } = parse

	const repoMetadata = await fetchGitHubRepoMetadata(owner, repoName)
	if (!repoMetadata) {
		console.warn(`Failed to fetch metadata for ${githubRepoUrl}`)
		// await db.upsertRepo(githubRepoMetadataToDBRepo(repoMetadata))
		return await db.upsertRepo({
			url: getGithubRepoUrl(owner, repoName),
			owner,
			name: repoName,
			missing: true
		})
	} else {
		await db.upsertRepo({ ...githubRepoMetadataToDBRepo(repoMetadata), missing: false })
	}
}

/**
 * Batch index github repos, don't pass in hundreds of repos at once,
 * this function sends a single graphql to get metadata of all repos.
 * Use `batchIndexGitHubReposWithBatchSize()` if you have a lot of repos to index
 * !Watch out of Non-Existing Repo, it will fail the entire batch GraphQL query, only use this function on existing repos
 * @param githubRepoUrls
 */
export async function batchIndexGitHubRepos(repos: Repo[]): Promise<string[]> {
	let reposMetadata: RepoMetadata[] = []
	try {
		reposMetadata = await getGitHubRepoMetadataInBatch(repos)
	} catch (error) {
		console.log(error)
		return []
	}
	const indexedRepoUrls = []
	for (const [idx, repoMetadata] of reposMetadata.entries()) {
		if (!repoMetadata) {
			const repo = repos[idx] // repos and reposMetadata should have the same order
			const repoUrl = getGithubRepoMetadataUrl(repo.owner, repo.name)
			console.warn(`Failed to fetch metadata for ${repoUrl}`)
			// await db.upsertRepo(githubRepoMetadataToDBRepo(repoMetadata))
			await db.upsertRepo({
				url: getGithubRepoUrl(repo.owner, repo.name),
				owner: repo.owner,
				name: repo.name,
				missing: true
			})
			indexedRepoUrls.push(getGithubRepoUrl(repo.owner, repo.name))
		} else {
			await db.upsertRepo(githubRepoMetadataToDBRepo(repoMetadata))
			indexedRepoUrls.push(getGithubRepoUrl(repoMetadata.owner.login, repoMetadata.name))
		}
	}
	return indexedRepoUrls
}

/**
 * !Watch out of Non-Existing Repo, it will fail the entire batch GraphQL query, only use this function on existing repos
 * @param repos
 * @param batchSize
 */
export async function batchIndexGitHubReposWithBatchSize(
	repos: Repo[],
	batchSize = 10
): Promise<string[]> {
	const batches = []
	for (let i = 0; i < repos.length; i += batchSize) {
		batches.push(repos.slice(i, i + batchSize))
	}
	logger.info(
		`Batch indexing ${repos.length} repos in ${batches.length} batches with size ${batchSize}`
	)
	const pbar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
	pbar.start(batches.length, 0)
	let indexedUrls: string[] = []
	for (const batch of batches) {
		pbar.increment()
		indexedUrls = [...indexedUrls, ...(await batchIndexGitHubRepos(batch))]
	}
	pbar.stop()
	return indexedUrls
}
