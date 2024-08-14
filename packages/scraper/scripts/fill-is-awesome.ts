import { GitHubRepoUrlRegex, PB_ADMIN_PASSWORD, PB_ADMIN_USERNAME, PB_URL } from "@/constant"
import { parseMarkdownLinks, parseOwnerAndRepoFromGithubUrl } from "@/parser"
import { fetchGitHubRepoReadme } from "@/scraper"
import chalk from "chalk"
import cliProgress from "cli-progress"
import {
	AwesomeListDao,
	AwesomeListTypeOptions,
	AwesomeRepoDao,
	getAdminPocketBaseClient,
	IsAwesomeDao,
	type IsAwesomeRecord,
	type IsAwesomeResponse
} from "db"

const adminDBClient = await getAdminPocketBaseClient(PB_URL, PB_ADMIN_USERNAME, PB_ADMIN_PASSWORD)
const awesomeListDao = new AwesomeListDao(adminDBClient)
const awesomeRepoDao = new AwesomeRepoDao(adminDBClient, awesomeListDao)
const isAwesomeDao = new IsAwesomeDao(adminDBClient)

const allLists = await awesomeListDao.getAll()
const listToRepos: Record<string, Set<string>> = {}

console.log(chalk.blue(`Map Awesome List to Repos`))
const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
bar1.start(allLists.length, 0)
for (const list of allLists) {
	bar1.increment()
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
			if (!(list.url in listToRepos)) {
				listToRepos[list.url] = new Set<string>()
			}
			listToRepos[list.url].add(repo.url)
		}
	}
}
bar1.stop()
const awesomeListUrlToId = allLists.reduce(
	(acc, list) => {
		acc[list.url] = list.id
		return acc
	},
	{} as Record<string, string>
)
const allRepos = await awesomeRepoDao.getAll({})
const repoToId = allRepos.reduce(
	(acc, repo) => {
		acc[repo.url] = repo.id
		return acc
	},
	{} as Record<string, string>
)
// console.log(repoToId)

const allIsAwesomes = await isAwesomeDao.getAll()
const allIsAwesomesSet = new Set<IsAwesomeResponse>()

const candidates: Set<{ repoId: string; listId: string }> = new Set()
Object.entries(listToRepos).forEach(async ([listUrl, repoUrls]) => {
	const listId = awesomeListUrlToId[listUrl]
	for (const repoUrl of repoUrls) {
		const repoId = repoToId[repoUrl]
		if (repoId) {
			const isAwesome = allIsAwesomes.find(
				(isAwesome) => isAwesome.repo === repoId && isAwesome.awesome_list === listId
			)
			if (!isAwesome) {
				candidates.add({ repoId, listId })
			}
		}
	}
})
const bar2 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
async function runJob(job: {
	repoId: string
	listId: string
}): Promise<IsAwesomeResponse | null | Error> {
	// process.stdout.write(`Progress: ${progress}/${candidates.size}\r`)
	try {
		bar2.increment()
		const res = await isAwesomeDao.insertIfNotExist({
			repo: job.repoId,
			awesome_list: job.listId
		})
		return res
	} catch (error) {
		return error as Error
	}
}
bar2.start(candidates.size, 0)
for (const candidate of candidates) {
	const res = await runJob(candidate)
	if (res instanceof Error) {
		console.log("error", res, candidate)
	}
}
bar2.stop()
