import { fetchGitHubApiRateLimit } from "@/api"
import {
	CACHE_INVALIDATION_TIME,
	MINUTE_MS,
	PB_ADMIN_PASSWORD,
	PB_ADMIN_USERNAME,
	PB_URL
} from "@/constant"
import { parseOwnerAndRepoFromGithubUrl } from "@/parser"
import { batchIndexGitHubReposWithBatchSize, indexGitHubRepo } from "@/scraper"
import cliProgress from "cli-progress"
import { AwesomeListDao, AwesomeRepoDao, getAdminPocketBaseClient } from "db"
import type { Repo } from "types"

/**
 * Refresh outdated repo data for repos in DB
 */
export async function refreshOutDatedRepoData(options: { batch?: boolean } = {}) {
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
	if (options.batch) {
		const repos: Repo[] = outdatedRepos
			.map((x) => x.url)
			.map(parseOwnerAndRepoFromGithubUrl)
			.filter((x) => x !== null)
		const batchSize = 20
		await batchIndexGitHubReposWithBatchSize(repos, awesomeRepoDao, batchSize)
	} else {
		const pbar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
		pbar.start(outdatedRepos.length, 0)
		for (const repo of outdatedRepos) {
			pbar.increment()
			await indexGitHubRepo(repo.url, awesomeRepoDao)
		}
		pbar.stop()
	}
}

export async function refreshDraftRepoData(options: { batch?: boolean } = {}) {
	const githubRateLimit = await fetchGitHubApiRateLimit()
	const adminDBClient = await getAdminPocketBaseClient(PB_URL, PB_ADMIN_USERNAME, PB_ADMIN_PASSWORD)
	const awesomeListDao = new AwesomeListDao(adminDBClient)
	const awesomeRepoDao = new AwesomeRepoDao(adminDBClient, awesomeListDao)
	let draftRepos = await awesomeRepoDao.getDraftRepos({ extraFields: ["draft"] })
	const originalLength = draftRepos.length
	draftRepos = draftRepos.slice(0, githubRateLimit.remaining)
	const batchSize = 20
	console.log(`Draft repos: ${originalLength}; remaining rate limit: ${githubRateLimit.remaining};`)

	// batch indexing could result in batch error when a repo is not found, cannot use in the draft stage
	// can be used in refreshing outdated repos (but also need to be careful of deleted/moved repos)
	if (options.batch) {
		console.log(`Will index at most ${githubRateLimit.remaining * batchSize} repos`)

		const repos: Repo[] = draftRepos
			.map((x) => x.url)
			.map(parseOwnerAndRepoFromGithubUrl)
			.filter((x) => x !== null)
		await batchIndexGitHubReposWithBatchSize(repos, awesomeRepoDao, batchSize)
	} else {
		console.log(`Will index ${draftRepos.length} repos`)
		const pbar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
		pbar.start(draftRepos.length, 0)
		for (const repo of draftRepos) {
			pbar.increment()
			await indexGitHubRepo(repo.url, awesomeRepoDao)
		}
		pbar.stop()
	}
}
