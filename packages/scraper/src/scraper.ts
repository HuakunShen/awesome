import { SortDirection } from "@awesome/neo4j-graphql"
import { getSdk, type RepositoryQuery } from "@hk/github-graphql/req"
import cliProgress from "cli-progress"
import { GraphQLClient } from "graphql-request"
import type { Repo, RepoMetadata } from "types"
import { getGitHubGraphqlSdk, getGitHubRepoMetadataInBatch } from "./api"
import { CACHE_INVALIDATION_TIME } from "./constant"
import { neo4jSdk } from "./db"
import { logger } from "./logger"
import { githubRepoMetadataToDBRepo } from "./model"
import { parseOwnerAndRepoFromGithubUrl } from "./parser"
import { getGithubRepoMetadataUrl, getGithubRepoToReadmeUrl, getGithubRepoUrl } from "./url"

export async function fetchGitHubRepoReadme(owner: string, repo: string): Promise<string> {
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
): Promise<RepositoryQuery["repository"] | null> {
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
	return neo4jSdk
		.Repos({
			where: {
				stars_GTE: minStars,
				name_CONTAINS: "awesome-",
				repoUpdatedAt_GTE: new Date(new Date().setMonth(new Date().getMonth() - recentMonths))
			},
			options: {
				sort: [
					{
						stars: SortDirection.Desc
					}
				]
			}
		})
		.then((res) => res.data.repos.sort((a, b) => b.stars - a.stars))
}

/**
 * Add given github repo to database
 * `draft` field will always update to `false` because after indexing, it's no longer draft
 * @param githubRepoUrl
 */
export async function indexGitHubRepo(githubRepoUrl: string, awesomeListId?: string) {
	const parse = parseOwnerAndRepoFromGithubUrl(githubRepoUrl)
	if (!parse) {
		return
	}
	const { owner, name: repoName } = parse
	const cleanGitHubRepoUrl = getGithubRepoUrl(owner, repoName)
	console.log(`Indexing GitHub Repo: ${cleanGitHubRepoUrl}; Original URL: ${githubRepoUrl}`)

	const repoMetadata = await fetchGitHubRepoMetadata(owner, repoName)
	// dbRepo could be undefined if no repo is found
	await addRepoToDB(cleanGitHubRepoUrl, owner, repoName, awesomeListId, repoMetadata)
}

async function addRepoToDB(
	githubRepoUrl: string,
	owner: string,
	repoName: string,
	awesomeListId?: string,
	repoMetadata?: RepositoryQuery["repository"] | null
) {
	const dbRepos = (
		await neo4jSdk.Repos({
			where: {
				url: githubRepoUrl
			}
		})
	).data.repos
	const dbRepo = dbRepos.at(0)
	const thresholdDate = new Date(Date.now() - CACHE_INVALIDATION_TIME)
	if (dbRepo && dbRepo.lastModified > thresholdDate) {
		console.log(`Repo ${githubRepoUrl} is up to date; skipping`)
		return
	}
	const connectAwesomeListPayload = awesomeListId
		? {
				inAwesomeListAwesomeLists: [
					{
						where: {
							node: {
								id: awesomeListId
							}
						}
					}
				]
			}
		: undefined
	if (!repoMetadata) {
		console.warn(`Failed to fetch metadata for ${githubRepoUrl}`)
		// await db.upsertRepo(githubRepoMetadataToDBRepo(repoMetadata))
		// await neo4jSdk.UpdateRepos({
		// 	update: {
		// 		missing: true
		// 	},
		// 	where: {
		// 		url: githubRepoUrl
		// 	}
		// })
		if (dbRepo) {
			// update
			await neo4jSdk.UpdateRepos({
				where: {
					url: githubRepoUrl
				},
				update: {
					missing: true
				},
				connect: connectAwesomeListPayload
			})
		} else {
			// create
			await neo4jSdk.CreateRepos({
				input: {
					owner,
					name: repoName,
					url: githubRepoUrl,
					missing: true,
					stars: 10,
					diskUsage: 0,
					forkCount: 0,
					hasSponsorshipsEnabled: false,
					homepageUrl: "",
					// licenseInfo:
					openIssuesCount: 0,
					closeIssuesCount: 0,
					pullRequestsCount: 0,
					releasesCount: 0,
					repoPushedAt: new Date(),
					repoUpdatedAt: new Date(),
					repoCreatedAt: new Date(),
					watchersCount: 0,
					inAwesomeListAwesomeLists: {
						connect: [{ where: { node: { id: awesomeListId } } }]
					}
				}
			})
		}
	} else {
		const newData = {
			name: repoName,
			owner,
			url: githubRepoUrl,
			stars: repoMetadata.stargazerCount,
			diskUsage: repoMetadata.diskUsage ?? 0,
			forkCount: repoMetadata.forkCount,
			hasSponsorshipsEnabled: repoMetadata.hasSponsorshipsEnabled,
			homepageUrl: repoMetadata.homepageUrl,
			openIssuesCount: repoMetadata.openIssues.totalCount,
			closeIssuesCount: repoMetadata.closedIssues.totalCount,
			pullRequestsCount: repoMetadata.pullRequests.totalCount,
			releasesCount: repoMetadata.releases.totalCount,
			repoPushedAt: repoMetadata.pushedAt,
			repoUpdatedAt: repoMetadata.updatedAt,
			repoCreatedAt: repoMetadata.createdAt,
			watchersCount: repoMetadata.watchers.totalCount,
			missing: false
		}
		if (dbRepo) {
			await neo4jSdk.UpdateRepos({
				where: {
					url: githubRepoUrl
				},
				update: newData,
				connect: connectAwesomeListPayload
			})
		} else {
			await neo4jSdk.CreateRepos({
				input: {
					...newData,
					inAwesomeListAwesomeLists: {
						connect: [{ where: { node: { id: awesomeListId } } }]
					}
				}
			})
		}
	}
}

/**
 * Batch index github repos, don't pass in hundreds of repos at once,
 * this function sends a single graphql to get metadata of all repos.
 * Use `batchIndexGitHubReposWithBatchSize()` if you have a lot of repos to index
 * !Watch out of Non-Existing Repo, it will fail the entire batch GraphQL query, only use this function on existing repos
 * @param githubRepoUrls
 */
export async function batchIndexGitHubRepos(
	repos: Repo[],
	awesomeListId?: string
): Promise<string[]> {
	let reposMetadata: RepositoryQuery["repository"][] = []
	try {
		reposMetadata = await getGitHubRepoMetadataInBatch(repos)
	} catch (error) {
		console.log(error)
		return []
	}
	const indexedRepoUrls: string[] = []
	for (const [idx, repoMetadata] of reposMetadata.entries()) {
		if (!repoMetadata) {
			const repo = repos[idx] // repos and reposMetadata should have the same order
			const repoUrl = getGithubRepoMetadataUrl(repo.owner, repo.name)
			console.warn(`Failed to fetch metadata for ${repoUrl}`)
			indexedRepoUrls.push(getGithubRepoUrl(repo.owner, repo.name))
			await addRepoToDB(repoUrl, repo.owner, repo.name, awesomeListId, repoMetadata)
		} else {
			// await db.upsertRepo(githubRepoMetadataToDBRepo(repoMetadata))
			await addRepoToDB(
				repoMetadata.url,
				repoMetadata.owner.login,
				repoMetadata.name,
				awesomeListId,
				repoMetadata
			)
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
