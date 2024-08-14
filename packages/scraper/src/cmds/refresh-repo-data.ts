import { githubAwesomeList } from "@/../data/awesome-list"
import { fetchGitHubApiRateLimit } from "@/api"
import {
	CACHE_INVALIDATION_TIME,
	DAY_MS,
	GitHubRepoUrlRegex,
	PB_ADMIN_PASSWORD,
	PB_ADMIN_USERNAME,
	PB_URL
} from "@/constant"
import {
	constructGitHubRepoUrl,
	parseMarkdownLinks,
	parseOwnerAndRepoFromGithubUrl
} from "@/parser"
import { fetchGitHubRepoMetadata, fetchGitHubRepoReadme, indexGitHubRepo } from "@/scraper"
import { getGithubRepoUrl } from "@/url"
import chalk from "chalk"
import cliProgress from "cli-progress"
import {
	AwesomeListDao,
	AwesomeListTypeOptions,
	AwesomeRepoDao,
	getAdminPocketBaseClient
} from "db"

/**
 * Refresh outdated repo data for repos in DB
 */
export async function refreshOutDatedRepoData() {
	const githubRateLimit = await fetchGitHubApiRateLimit()
	const adminDBClient = await getAdminPocketBaseClient(PB_URL, PB_ADMIN_USERNAME, PB_ADMIN_PASSWORD)
	const awesomeListDao = new AwesomeListDao(adminDBClient)
	const awesomeRepoDao = new AwesomeRepoDao(adminDBClient, awesomeListDao)
	let outdatedRepos = await awesomeRepoDao.getOutdatedRepos(CACHE_INVALIDATION_TIME)
	const originalLength = outdatedRepos.length
	outdatedRepos = outdatedRepos.slice(0, githubRateLimit.remaining)
	console.log(
		`Draft repos: ${originalLength}; remaining rate limit: ${githubRateLimit.remaining}; Will index ${outdatedRepos.length} repos`
	)
	const pbar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
	pbar.start(outdatedRepos.length, 0)
	for (const repo of outdatedRepos) {
		pbar.increment()
		await indexGitHubRepo(repo.url, awesomeRepoDao)
	}
	pbar.stop()
}

export async function refreshDraftRepoData() {
	const githubRateLimit = await fetchGitHubApiRateLimit()
	const adminDBClient = await getAdminPocketBaseClient(PB_URL, PB_ADMIN_USERNAME, PB_ADMIN_PASSWORD)
	const awesomeListDao = new AwesomeListDao(adminDBClient)
	const awesomeRepoDao = new AwesomeRepoDao(adminDBClient, awesomeListDao)
	let draftRepos = await awesomeRepoDao.getDraftRepos({ extraFields: ["draft"] })
	const originalLength = draftRepos.length
	draftRepos = draftRepos.slice(0, githubRateLimit.remaining)
	console.log(
		`Draft repos: ${originalLength}; remaining rate limit: ${githubRateLimit.remaining}; Will index ${draftRepos.length} repos`
	)
	const pbar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
	pbar.start(draftRepos.length, 0)
	for (const repo of draftRepos) {
		pbar.increment()
		await indexGitHubRepo(repo.url, awesomeRepoDao)
	}
	pbar.stop()
}
