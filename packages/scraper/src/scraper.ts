import type { AwesomeRepoDao } from "db"
import { githubGraphql } from "github-graphql"
import { getSdk, type RepositoryQuery } from "github-graphql/req"
import { GraphQLClient } from "graphql-request"
import { getGitHubGraphqlSdk } from "./api"
import { GITHUB_TOKEN, PB_URL } from "./constant"
import { parseOwnerAndRepoFromGithubUrl } from "./parser"
import { getGithubRepoMetadataUrl, getGithubRepoToReadmeUrl } from "./url"

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
 * @param awesomeRepoDao
 * @param minStars
 * @param recentMonths
 * @returns
 */
export async function findAwesomeRepos(
	awesomeRepoDao: AwesomeRepoDao,
	minStars = 100,
	recentMonths = 2
) {
	let allRepos = await awesomeRepoDao.getAll({ extraFields: ["url", "name", "stars", "metadata"] })
	return allRepos
		.filter((r) => r.name.toLowerCase().includes("awesome-"))
		.filter((r) => r.stars > minStars)
		.filter((r) => {
			const metadata = r.metadata as RepositoryQuery["repository"]
			const updatedAt = new Date(metadata?.updatedAt)
			const pushedAt = new Date(metadata?.pushedAt)
			const min = Math.min(updatedAt.getTime(), pushedAt.getTime())
			const recentMonthsAgo = new Date()
			recentMonthsAgo.setMonth(recentMonthsAgo.getMonth() - recentMonths)
			// last update time is later than `recentMonths` months ago
			delete r.metadata
			return min >= recentMonthsAgo.getTime()
		})
		.sort((a, b) => b.stars - a.stars)
}

/**
 * Add given github repo to database
 * `draft` field will always update to `false` because after indexing, it's no longer draft
 * @param githubRepoUrl
 */
export async function indexGitHubRepo(githubRepoUrl: string, awesomeRepoDao: AwesomeRepoDao) {
	const parse = parseOwnerAndRepoFromGithubUrl(githubRepoUrl)
	if (!parse) {
		return
	}
	const { owner, name: repoName } = parse
	const repoMetadata = await fetchGitHubRepoMetadata(owner, repoName)
	if (!repoMetadata) {
		console.warn(`Failed to fetch metadata for ${githubRepoUrl}`)
		await awesomeRepoDao.insertOrUpdate({
			missing: true,
			name: repoName,
			url: githubRepoUrl,
			draft: false
		})
	}
	await awesomeRepoDao.insertOrUpdate({
		description: repoMetadata?.description ?? "",
		metadata: repoMetadata,
		name: repoName,
		stars: repoMetadata?.stargazerCount,
		url: githubRepoUrl,
		draft: false
	})
}
