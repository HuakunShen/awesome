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
import { fetchGitHubRepoReadme } from "@/scraper"
import { getGithubRepoUrl } from "@/url"
import chalk from "chalk"
import cliProgress from "cli-progress"
import {
	AwesomeListDao,
	AwesomeListTypeOptions,
	AwesomeRepoDao,
	getAdminPocketBaseClient,
	IsAwesomeDao,
	type IsAwesomeResponse
} from "db"

/**
 * Refresh relationships between awesome list and repos
 */
export async function refreshIsAwesome() {
	// const githubRateLimit = await fetchGitHubApiRateLimit()
	const adminDBClient = await getAdminPocketBaseClient(PB_URL, PB_ADMIN_USERNAME, PB_ADMIN_PASSWORD)
	const awesomeListDao = new AwesomeListDao(adminDBClient)
	const awesomeRepoDao = new AwesomeRepoDao(adminDBClient, awesomeListDao)
	const isAwesomeDao = new IsAwesomeDao(adminDBClient)

	const allLists = await awesomeListDao.getAll({})
	// map each awesome list repo URL to a set of awesome repos
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
	// map awesome list repo url to Database ID
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

	const allIsAwesomes = await isAwesomeDao.getAll({})

	// candidates is a set of repo and list IDs that are not in the isAwesome table
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
	console.log(
		`${listToRepos.length} pairs of awesome list to repos; Will add ${candidates.size} non-existent candidates to add to isAwesome table`
	)

	async function runJob(job: {
		repoId: string
		listId: string
	}): Promise<IsAwesomeResponse | null | Error> {
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

	const bar2 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
	for (const candidate of candidates) {
		const res = await runJob(candidate)
		if (res instanceof Error) {
			console.log("error", res, candidate)
		}
	}
	bar2.stop()
}
