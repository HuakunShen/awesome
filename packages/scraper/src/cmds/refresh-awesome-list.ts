import { githubAwesomeList } from "@/../data/awesome-list"
import { fetchGitHubApiRateLimit, getGitHubGraphqlSdk, getGitHubRepoMetadataInBatch } from "@/api"
import { CACHE_INVALIDATION_TIME, DAY_MS, GitHubRepoUrlRegex } from "@/constant"
import { neo4jSdk } from "@/db"
import { logger } from "@/logger"
import { githubRepoMetadataToDBRepo } from "@/model"
import { parseMarkdownLinks, parseOwnerAndRepoFromGithubUrl } from "@/parser"
import {
	batchIndexGitHubReposWithBatchSize,
	fetchGitHubRepoReadme,
	indexGitHubRepo
} from "@/scraper"
import { getGithubRepoUrl } from "@/url"
import cliProgress from "cli-progress"
import PQueue from "p-queue"
import type { Repo, RepoMetadata } from "types"

/**
 * Add newly added awesome list to DB
 */
export async function refreshNewAwesomeList() {
	logger.info(`Refresh Awesome List: Add new Awesome List`)
	let allLists = await neo4jSdk.AwesomeLists()
	const existingListUrls = allLists.data.awesomeLists.map((list) => list.url)
	const awesomeReposUrlsNotInDb = new Set(
		githubAwesomeList
			.filter((repo) => !existingListUrls.includes(getGithubRepoUrl(repo.owner, repo.name)))
			.map((repo) => getGithubRepoUrl(repo.owner, repo.name))
	)
	if (awesomeReposUrlsNotInDb.size === 0) {
		logger.info("No new awesome list to add")
		return
	}
	const pbar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
	pbar.start(awesomeReposUrlsNotInDb.size, 0)
	for (const repo of Array.from(awesomeReposUrlsNotInDb)) {
		pbar.increment()
		const parse = parseOwnerAndRepoFromGithubUrl(repo)
		if (!parse) {
			continue
		}
		const repoUrl = getGithubRepoUrl(parse.owner, parse.name)
		await indexGitHubRepo(repoUrl) // index the awesome list repo, so the next step can find the repo to connect
		await neo4jSdk.CreateAwesomeLists({
			input: {
				name: parse.name,
				url: repoUrl,
				lastRefreshTime: new Date(0), // set to 0 because not yet refreshed when created so it will be refreshed in the other command
				tags: [],
				isFromRepo: {
					connect: {
						where: {
							node: {
								url: repoUrl
							}
						}
					}
				}
			}
		})
	}
	pbar.stop()
}

/**
 * Read all awesome lists, get repos and add to DB if not exist
 * Don't worry about repo data here, if repo doesn't exist, set `draft` to true
 * Repo data will be refreshed in another command
 */
export async function refreshAwesomeListRepos(options: { batch?: boolean; force?: boolean } = {}) {
	const cacheInvalidTime = options.force ? 0 : CACHE_INVALIDATION_TIME
	const thresholdDate = new Date(Date.now() - cacheInvalidTime)
	const outdatedAwesomeLists = (
		await neo4jSdk.AwesomeLists({
			where: {
				lastRefreshTime_LT: thresholdDate
			}
		})
	).data.awesomeLists
	const pbar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
	logger.info(`Refreshing ${outdatedAwesomeLists.length} outdated awesome lists`)
	pbar.start(outdatedAwesomeLists.length, 0)
	// const allRepos = await db.client.repo.findMany({ select: { url: true } })
	const allRepos = (await neo4jSdk.Repos()).data.repos
	const allReposUrls = new Set(allRepos.map((repo) => repo.url))
	for (const awesomeList of outdatedAwesomeLists.reverse()) {
		pbar.increment()
		const parse = parseOwnerAndRepoFromGithubUrl(awesomeList.url)
		if (!parse) {
			logger.error(`Failed to parse owner and repo from ${awesomeList.url}`)
			continue
		}
		const { owner: awesomeListOwner, name: awesomeListName } = parse
		const awesomeReadme = await fetchGitHubRepoReadme(awesomeListOwner, awesomeListName)
		const markdownLinks = parseMarkdownLinks(awesomeReadme)
		// filter out non-github-repo links with regex
		const githubReposInAwesomeReadme = markdownLinks.filter((link) =>
			link.url.match(GitHubRepoUrlRegex)
		)
		if (options.batch) {
			console.log(
				`Batch Indexing ${githubReposInAwesomeReadme.length} repos for ${awesomeList.name}`
			)
			const repoUrlsToIndex = githubReposInAwesomeReadme
				.filter((repo) => !allReposUrls.has(repo.url))
				.map((repo) => parseOwnerAndRepoFromGithubUrl(repo.url))
				.filter((x) => x) as Repo[]
			await batchIndexGitHubReposWithBatchSize(repoUrlsToIndex)
		} else {
			const queue = new PQueue({ concurrency: 7 })
			for (const repo of githubReposInAwesomeReadme) {
				if (!allReposUrls.has(repo.url)) {
					queue.add(
						() => indexGitHubRepo(repo.url, awesomeList.id) // this will auto connect with awesome list when id is provided
					)
				}
			}
		}
		// await db.refreshAwesomeList(awesomeList.id)
		await neo4jSdk.UpdateAwesomeLists({
			where: {
				id: awesomeList.id
			},
			update: {
				lastRefreshTime: new Date()
			}
		})
	}
	pbar.stop()
	logger.info(`Refresh Awesome List: Add new Awesome List and Draft Repos`)
}
