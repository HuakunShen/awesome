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
import { fetchGitHubRepoMetadata, fetchGitHubRepoReadme, indexGitHubRepo } from "@/scraper"
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

// const x = githubRepoUrls.map(parseOwnerAndRepoFromGithubUrl).filter((r) => r)
// console.log(x)
let allLists = await awesomeListDao.getAll({})
const existingListUrls = allLists.map((list) => list.url)
const urls = githubAwesomeList.map((x) => constructGitHubRepoUrl(x.owner, x.name))
console.log("urls", urls)
console.log("existingListUrls", existingListUrls)

const dneUrls = urls.filter((url) => {
	return !existingListUrls.includes(url)
})
console.log(dneUrls)

// console.log(urls.includes("https://github.com/oxnr/awesome-bigdata"));
// console.log(urls.includes("https://github.com/analysis-tools-dev/static-analysis"));
