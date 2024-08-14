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

const githubRateLimit = await fetchGitHubApiRateLimit()
const adminDBClient = await getAdminPocketBaseClient(PB_URL, PB_ADMIN_USERNAME, PB_ADMIN_PASSWORD)
const awesomeListDao = new AwesomeListDao(adminDBClient)
const awesomeRepoDao = new AwesomeRepoDao(adminDBClient, awesomeListDao)
let allLists = await awesomeListDao.getAll()

console.log(chalk.blue(`Update Awesome List`))
const pbar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
pbar1.start(githubAwesomeList.length, 0)
for (const repo of githubAwesomeList) {
	pbar1.increment()
	const existingListUrls = allLists.map((list) => list.url)
	if (existingListUrls.includes(getGithubRepoUrl(repo.owner, repo.name))) {
		continue
	}
	const ret = await awesomeListDao.insert({
		url: getGithubRepoUrl(repo.owner, repo.name),
		name: repo.name,
		type: AwesomeListTypeOptions.github,
		metadata: await fetchGitHubRepoMetadata(repo.owner, repo.name)
	})
}
pbar1.stop()

allLists = await awesomeListDao.getAll()

console.log(chalk.blue(`Parse Links From Awesome List Repo Readme`))
const pbar2 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
pbar2.start(allLists.length, 0)
const candidateRepos = new Set<string>()
for (const list of allLists) {
	pbar2.increment()
	if (list.type === AwesomeListTypeOptions.github) {
		const parse = parseOwnerAndRepoFromGithubUrl(list.url)
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
			candidateRepos.add(constructGitHubRepoUrl(owner, repoName))
		}
	}
}
pbar2.stop()
const allRepos = await awesomeRepoDao.getAll({})
const recentlyUpdatedRepos = allRepos.filter((repo) => {
	const updatedTime = new Date(repo.updated)
	return new Date().getTime() - updatedTime.getTime() < CACHE_INVALIDATION_TIME
})
const originalCandidateSize = candidateRepos.size
for (const repo of recentlyUpdatedRepos) {
	candidateRepos.delete(repo.url)
}
console.log(`Skipped ${originalCandidateSize - candidateRepos.size} recently updated repos`)

let candidateReposArray = Array.from(candidateRepos)
console.log(chalk.blue("GitHub API Rate Limit:"), githubRateLimit)

if (githubRateLimit.remaining < candidateRepos.size) {
	candidateReposArray = candidateReposArray.slice(0, githubRateLimit.remaining)
	console.log(`Rate limit reached, only updating ${githubRateLimit.remaining} repos`)
}
// process.stdout.write
const pbar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
pbar.start(candidateReposArray.length, 0)
for (const repoUrl of candidateReposArray) {
	const parse = parseOwnerAndRepoFromGithubUrl(repoUrl)
	if (!parse) {
		continue
	}
	const { owner, name: repoName } = parse
	await indexGitHubRepo(repoUrl, awesomeRepoDao)
	// process.stdout.write(
	// 	`${progress} / ${candidateReposArray.length} (${owner}/${repoName}) ${" ".repeat(20)}\r`
	// )
	pbar.increment()
}
pbar.stop()
