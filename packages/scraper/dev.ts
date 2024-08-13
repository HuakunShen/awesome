import {
	AwesomeListDao,
	AwesomeListTypeOptions,
	AwesomeRepoDao,
	getAdminPocketBaseClient
} from "db"
import { githubAwesomeList } from "./data/awesome-list"
import { GitHubRepoUrlRegex, PB_ADMIN_PASSWORD, PB_ADMIN_USERNAME, PB_URL } from "./src/constant"
import { parseMarkdownLinks, parseOwnerAndRepoFromGithubUrl } from "./src/parser"
import { fetchGitHubRepoMetadata, fetchGitHubRepoReadme } from "./src/scraper"
import { getGithubRepoUrl } from "./src/url"

const adminDBClient = await getAdminPocketBaseClient(PB_URL, PB_ADMIN_USERNAME, PB_ADMIN_PASSWORD)
const awesomeListDao = new AwesomeListDao(adminDBClient)
const awesomeRepoDao = new AwesomeRepoDao(adminDBClient, awesomeListDao)
let allLists = await awesomeListDao.getAll()

for (const repo of githubAwesomeList) {
	const existingListUrls = allLists.map((list) => list.url)
	if (existingListUrls.includes(getGithubRepoUrl(repo.owner, repo.name))) {
		console.log(`Skipping ${repo.name} because it already exists`)
		continue
	}
	const ret = await awesomeListDao.insert({
		url: getGithubRepoUrl(repo.owner, repo.name),
		name: repo.name,
		type: AwesomeListTypeOptions.github,
		metadata: await fetchGitHubRepoMetadata(repo.owner, repo.name)
	})
}
allLists = await awesomeListDao.getAll()

// function updateRepo(owner: string, repoName: string) {
// 	await fetchGitHubRepoMetadata(repo.owner, repo.name)
// }

const candidateRepos = new Set<string>()
for (const list of allLists) {
	if (list.type === AwesomeListTypeOptions.github) {
		const { owner, name: repoName } = parseOwnerAndRepoFromGithubUrl(list.url)
		const awesomeReadme = await fetchGitHubRepoReadme(owner, repoName)
		const markdownLinks = parseMarkdownLinks(awesomeReadme)
		// filter out non-github-repo links with regex
		const githubRepos = markdownLinks.filter((link) => link.url.match(GitHubRepoUrlRegex))
		for (const repo of githubRepos) {
			candidateRepos.add(repo.url)
		}
	}
}

let progress = 0
console.log(`Update GitHub Repo`)
const allRepos = await awesomeRepoDao.getAllBasicRepos()
const recentlyUpdatedRepos = allRepos.filter((repo) => {
	const updatedTime = new Date(repo.updated)
	return new Date().getTime() - updatedTime.getTime() < 24 * 60 * 60 * 1000
})
const originalCandidateSize = candidateRepos.size
for (const repo of recentlyUpdatedRepos) {
	candidateRepos.delete(repo.url)
}
console.log(`Skipped ${originalCandidateSize - candidateRepos.size} recently updated repos`)

for (const repoUrl of candidateRepos) {
	const { owner, name: repoName } = parseOwnerAndRepoFromGithubUrl(repoUrl)

	const repoMetadata = await fetchGitHubRepoMetadata(owner, repoName)
	if (!repoMetadata) {
		console.warn(`Failed to fetch metadata for ${owner}/${repoName}`)
		continue
	}
	await awesomeRepoDao.insertOrUpdate({
		description: repoMetadata?.description ?? "",
		metadata: repoMetadata,
		name: repoName,
		stars: repoMetadata?.stargazerCount,
		url: repoUrl
	})

	process.stdout.write(
		`${progress} / ${candidateRepos.size} (${owner}/${repoName}) ${" ".repeat(20)}\r`
	)
	progress++
}
