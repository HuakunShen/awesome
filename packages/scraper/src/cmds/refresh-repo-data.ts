import { fetchGitHubApiRateLimit } from "@/api"
import { CACHE_INVALIDATION_TIME, MINUTE_MS, REPO_CACHE_LIFE_DAYS } from "@/constant"
import { neo4jSdk } from "@/db"
import { parseOwnerAndRepoFromGithubUrl } from "@/parser"
import { batchIndexGitHubReposWithBatchSize, indexGitHubRepo } from "@/scraper"
import cliProgress from "cli-progress"
import type { Repo } from "types"

/**
 * Refresh outdated repo data for repos in DB
 */
export async function refreshOutDatedRepoData(options: { batch?: boolean } = {}) {
	const githubRateLimit = await fetchGitHubApiRateLimit()
	const thresholdDate = new Date(Date.now() - CACHE_INVALIDATION_TIME)
	// let outdatedRepos = await db.getOutdatedRepos(thresholdDate)
	let outdatedRepos = (
		await neo4jSdk.Repos({
			where: {
				lastModified_LT: thresholdDate
			}
		})
	).data.repos
	// let outdatedRepos = await awesomeRepoDao.getOutdatedRepos(CACHE_INVALIDATION_TIME)
	const originalLength = outdatedRepos.length
	outdatedRepos = outdatedRepos.slice(0, githubRateLimit.remaining)
	console.log(
		`Draft repos: ${originalLength}; remaining rate limit: ${githubRateLimit.remaining}; Will index ${outdatedRepos.length} repos`
	)
	if (options.batch) {
		throw new Error("Not Implemented")
		// const repos: Repo[] = outdatedRepos
		// 	.map((x) => x.url)
		// 	.map(parseOwnerAndRepoFromGithubUrl)
		// 	.filter((x) => x !== null)
		// const batchSize = 20
		// const indexedUrls = await batchIndexGitHubReposWithBatchSize(repos, batchSize)
	} else {
		const pbar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
		pbar.start(outdatedRepos.length, 0)
		for (const repo of outdatedRepos) {
			pbar.increment()
			await indexGitHubRepo(repo.url)
		}
		pbar.stop()
	}
}

export async function refreshDraftRepoData(options: { batch?: boolean } = {}) {
	const githubRateLimit = await fetchGitHubApiRateLimit()
	throw new Error("Not Implemented")
	// let draftRepos = await db.getAllCandidateRepos()
	// let draftRepos = await awesomeRepoDao.getDraftRepos({ extraFields: ["draft"] })
	// const originalLength = draftRepos.length
	// draftRepos = draftRepos.slice(0, githubRateLimit.remaining)
	// const batchSize = 20
	// console.log(`Draft repos: ${originalLength}; remaining rate limit: ${githubRateLimit.remaining};`)

	// batch indexing could result in batch error when a repo is not found, cannot use in the draft stage
	// can be used in refreshing outdated repos (but also need to be careful of deleted/moved repos)
	if (options.batch) {
		throw new Error("Not Implemented")
		// console.log(`Will index at most ${githubRateLimit.remaining * batchSize} repos`)

		// const repos: Repo[] = draftRepos
		// 	.map((x) => x.url)
		// 	.map(parseOwnerAndRepoFromGithubUrl)
		// 	.filter((x) => x !== null)
		// const indexedUrls = await batchIndexGitHubReposWithBatchSize(repos, batchSize)
		// for (const repo of draftRepos) {
		// 	if (indexedUrls.includes(repo.url)) {
		// 		await db.deleteCandidateRepo(repo.id)
		// 	}
		// }
	} else {
		// console.log(`Will index ${draftRepos.length} repos`)
		// const pbar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
		// pbar.start(draftRepos.length, 0)
		// for (const repo of draftRepos) {
		// 	pbar.increment()
		// 	await indexGitHubRepo(repo.url)
		// 	await db.deleteCandidateRepo(repo.id)
		// }
		// pbar.stop()
	}
}
