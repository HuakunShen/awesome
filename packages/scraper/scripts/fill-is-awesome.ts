import {
	AwesomeListDao,
	AwesomeListTypeOptions,
	AwesomeRepoDao,
	getAdminPocketBaseClient,
	IsAwesomeDao,
	type IsAwesomeRecord,
	type IsAwesomeResponse
} from "db"
import { githubAwesomeList } from "../data/awesome-list"
import { fetchGitHubApiRateLimit } from "../src/api"
import { GitHubRepoUrlRegex, PB_ADMIN_PASSWORD, PB_ADMIN_USERNAME, PB_URL } from "../src/constant"
import { parseMarkdownLinks, parseOwnerAndRepoFromGithubUrl } from "../src/parser"
import { fetchGitHubRepoMetadata, fetchGitHubRepoReadme } from "../src/scraper"
import { getGithubRepoUrl } from "../src/url"

const adminDBClient = await getAdminPocketBaseClient(PB_URL, PB_ADMIN_USERNAME, PB_ADMIN_PASSWORD)
const awesomeListDao = new AwesomeListDao(adminDBClient)
const awesomeRepoDao = new AwesomeRepoDao(adminDBClient, awesomeListDao)
const isAwesomeDao = new IsAwesomeDao(adminDBClient)

const allLists = await awesomeListDao.getAll()
const listToRepos: Record<string, Set<string>> = {}

for (const list of allLists) {
	if (list.type === AwesomeListTypeOptions.github) {
		const { owner, name: repoName } = parseOwnerAndRepoFromGithubUrl(list.url)
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

const awesomeListUrlToId = allLists.reduce(
	(acc, list) => {
		acc[list.url] = list.id
		return acc
	},
	{} as Record<string, string>
)
const allRepos = await awesomeRepoDao.getAllBasicRepos()
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
let progress = 0
async function runJob(job: {
	repoId: string
	listId: string
}): Promise<IsAwesomeResponse | null | Error> {
	progress++
	process.stdout.write(`Progress: ${progress}/${candidates.size}\r`)
	try {
		const res = await isAwesomeDao.insertIfNotExist({
			repo: job.repoId,
			awesome_list: job.listId
		})
		return res
	} catch (error) {
		return error as Error
	}
}

const jobBatches = []
const batchSize = 1
let batch = []
for (const candidate of candidates) {
	if (batch.length === batchSize) {
		jobBatches.push(batch)
		batch = []
	}
	batch.push(candidate)
}

for (const jobBatch of jobBatches) {
	const jobs = jobBatch.map((job) => runJob(job))
	let result = await Promise.all(jobs)
	for (const res of result) {
		if (res instanceof Error) {
			console.log("error", res)
		}
	}
}

// const jobs = Array.from(candidates).map((candidate) => runJob(candidate))
// let result = await Promise.all(jobs)
// for (const res of result) {
// 	if (res instanceof Error) {
// 		console.log("error", res)
// 	}
// }

// for (const candidate of candidates) {
// 	const res = await runJob(candidate)
// 	if (res instanceof Error) {
// 		console.log("error", res, candidate)
// 	}
// }
