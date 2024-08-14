import {
	AwesomeListDao,
	AwesomeListTypeOptions,
	AwesomeRepoDao,
	getAdminPocketBaseClient,
	IsAwesomeDao,
	type IsAwesomeRecord,
	type IsAwesomeResponse
} from "db"
import { GitHubRepoUrlRegex, PB_ADMIN_PASSWORD, PB_ADMIN_USERNAME, PB_URL } from "../src/constant"
import { parseMarkdownLinks, parseOwnerAndRepoFromGithubUrl } from "../src/parser"
import { fetchGitHubRepoMetadata, fetchGitHubRepoReadme, findAwesomeRepos } from "../src/scraper"

const adminDBClient = await getAdminPocketBaseClient(PB_URL, PB_ADMIN_USERNAME, PB_ADMIN_PASSWORD)
const awesomeListDao = new AwesomeListDao(adminDBClient)
const awesomeRepoDao = new AwesomeRepoDao(adminDBClient, awesomeListDao)

const awesomeRepos = await findAwesomeRepos(awesomeRepoDao, 5000, 10)
Bun.write(
	"./awesome-repos.json",
	JSON.stringify(
		awesomeRepos.map((r) => r.url),
		null,
		2
	)
)
Bun.write("./awesome-repos.json", JSON.stringify(awesomeRepos, null, 2))
// console.log(awesomeRepos)
console.log(awesomeRepos.map((r) => r.url))

console.log(awesomeRepos.length)
