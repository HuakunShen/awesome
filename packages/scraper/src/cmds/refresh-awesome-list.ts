import { githubAwesomeList } from "@/../data/awesome-list"
import { fetchGitHubApiRateLimit, getGitHubRepoMetadataInBatch } from "@/api"
import {
	CACHE_INVALIDATION_TIME,
	DAY_MS,
	GitHubRepoUrlRegex,
	PB_ADMIN_PASSWORD,
	PB_ADMIN_USERNAME,
	PB_URL
} from "@/constant"
import { logger } from "@/logger"
import {
	constructGitHubRepoUrl,
	parseMarkdownLinks,
	parseOwnerAndRepoFromGithubUrl
} from "@/parser"
import { fetchGitHubRepoReadme } from "@/scraper"
import { getGithubRepoUrl } from "@/url"
import { isOutDated } from "@/utils"
import chalk from "chalk"
import cliProgress from "cli-progress"
import {
	AwesomeListDao,
	AwesomeListTypeOptions,
	AwesomeRepoDao,
	getAdminPocketBaseClient
} from "db"
import type { Repo, RepoMetadata } from "types"

const adminDBClient = await getAdminPocketBaseClient(PB_URL, PB_ADMIN_USERNAME, PB_ADMIN_PASSWORD)
const awesomeListDao = new AwesomeListDao(adminDBClient)
const awesomeRepoDao = new AwesomeRepoDao(adminDBClient, awesomeListDao)

/**
 * Check if there is new awesome list not added to DB
 */
export async function refreshNewAwesomeList() {
	logger.info(`Refresh Awesome List: Add new Awesome List and Draft Repos`)
	let allLists = await awesomeListDao.getAll({})
	const existingListUrls = allLists.map((list) => list.url)
	const reposNotInDb = githubAwesomeList.filter(
		(repo) => !existingListUrls.includes(getGithubRepoUrl(repo.owner, repo.name))
	)
	if (reposNotInDb.length === 0) {
		logger.info("No new awesome list to add")
		return
	}
	const reposDataArr = await getGitHubRepoMetadataInBatch(reposNotInDb)
	const urlToRepoMetadataMap = reposDataArr.reduce(
		(acc, repo2) => {
			acc[repo2.url] = repo2
			return acc
		},
		{} as Record<string, RepoMetadata>
	)
	const pbar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
	pbar.start(Object.keys(urlToRepoMetadataMap).length, 0)
	for (const [repoUrl, repoMetadata] of Object.entries(urlToRepoMetadataMap)) {
		pbar.increment()
		await awesomeListDao.insertOrUpdate({
			url: repoUrl,
			name: repoMetadata.name,
			type: AwesomeListTypeOptions.github,
			metadata: repoMetadata
		})
	}
	pbar.stop()
}

/**
 * Read all awesome lists, get repos and add to DB if not exist
 * Don't worry about repo data here, if repo doesn't exist, set `draft` to true
 * Repo data will be refreshed in another command
 */
export async function refreshAwesomeListRepos() {
	const allLists = await awesomeListDao.getAll({ extraFields: ["url"] })
	const pbar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
	pbar.start(allLists.length, 0)
	const allRepos = new Set(allLists.map((repo) => repo.url))
	for (const awesomeList of allLists) {
		pbar.increment()
		// if (awesomeList.updated && !isOutDated(new Date(awesomeList.updated), CACHE_INVALIDATION_TIME)) {
		// 	// if `updated` exists and is not outdated, continue scraping.
		// 	// skip otherwise
		// console.log("skipping", awesomeList.url);
		// 	continue
		// }
		// console.log("not skipping", awesomeList.url);

		if (awesomeList.type === AwesomeListTypeOptions.github) {
			const parse = parseOwnerAndRepoFromGithubUrl(awesomeList.url)
			if (!parse) {
				continue
			}
			const { owner, name: repoName } = parse
			const awesomeReadme = await fetchGitHubRepoReadme(owner, repoName)
			const markdownLinks = parseMarkdownLinks(awesomeReadme)
			// filter out non-github-repo links with regex
			const githubRepos = markdownLinks.filter((link) => link.url.match(GitHubRepoUrlRegex))
			for (const repo of githubRepos) {
				const parse = parseOwnerAndRepoFromGithubUrl(repo.url)
				if (!parse) {
					continue
				}
				const { owner, name: repoName } = parse
				const url = constructGitHubRepoUrl(owner, repoName)
				if (!allRepos.has(url)) {
					await awesomeRepoDao.insert({
						name: repoName,
						url,
						draft: true
					})
				}
			}
			await awesomeListDao.setLastRefreshed(awesomeList.id)
		}
	}
	pbar.stop()
	logger.info(`Refresh Awesome List: Add new Awesome List and Draft Repos`)
}
