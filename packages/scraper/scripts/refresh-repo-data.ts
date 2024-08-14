/**
 * Only refresh repo data of indexed repos
 */

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

const adminDBClient = await getAdminPocketBaseClient(PB_URL, PB_ADMIN_USERNAME, PB_ADMIN_PASSWORD)
const awesomeListDao = new AwesomeListDao(adminDBClient)
const awesomeRepoDao = new AwesomeRepoDao(adminDBClient, awesomeListDao)
