import { GitHubRepoUrlRegex } from "@/constant"
import { neo4jSdk } from "@/db"
import { logger } from "@/logger"
import { parseMarkdownLinks, parseOwnerAndRepoFromGithubUrl } from "@/parser"
import { fetchGitHubRepoReadme } from "@/scraper"
import { getGithubRepoUrl } from "@/url"
import cliProgress from "cli-progress"
import pLimit from "p-limit"

/**
 * Rebuild the is-awesome relation between repo and awesome list
 */
export async function refreshIsAwesome() {
	let allLists = await neo4jSdk.AwesomeLists()
	const existingListUrls = allLists.data.awesomeLists.map((list) => list.url)
	const pbar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
	pbar.start(existingListUrls.length, 0)
	const reposNotInDB: string[] = []
	for (const repo of existingListUrls) {
		pbar.increment()
		const alistParse = parseOwnerAndRepoFromGithubUrl(repo)
		if (!alistParse) {
			continue
		}
		const awesomeListUrl = getGithubRepoUrl(alistParse.owner, alistParse.name)
		const awesomeReadme = await fetchGitHubRepoReadme(alistParse.owner, alistParse.name)
		const markdownLinks = parseMarkdownLinks(awesomeReadme)
		const githubReposInAwesomeReadme = markdownLinks.filter((link) =>
			link.url.match(GitHubRepoUrlRegex)
		)
		const limit = pLimit(10) // at most 10 concurrent connections
		const jobs = []
		for (const repo of githubReposInAwesomeReadme) {
			const parse = parseOwnerAndRepoFromGithubUrl(repo.url)
			if (!parse) {
				continue
			}
			const repoUrl = getGithubRepoUrl(parse.owner, parse.name)

			jobs.push(
				limit(async () => {
					// get db repo
					const dbReposRes = await neo4jSdk.Repos({
						where: {
							url: repoUrl
						}
					})
					const dbRepos = dbReposRes.data.repos
					if (dbRepos.length === 0) {
						logger.warn(`Repo not found in DB: ${repoUrl}`)
						reposNotInDB.push(repoUrl)
						return
					}
					const dbRepo = dbRepos[0]
					// logger.debug(
					// 	`Connection repo ${dbRepo.owner}/${dbRepo.name} to awesome list ${alistParse.owner}/${alistParse.name}`
					// )
					return neo4jSdk.UpdateRepos({
						where: {
							url: dbRepo.url
						},
						connect: {
							inAwesomeListAwesomeLists: [
								{
									where: {
										node: {
											url: awesomeListUrl
										}
									}
								}
							]
						}
					})
				})
			)
		}
		await Promise.all(jobs)
	}
	console.log(reposNotInDB)
	console.log("reposNotInDB length: ", reposNotInDB.length)
	pbar.stop()
}
