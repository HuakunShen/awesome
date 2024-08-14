import { findAwesomeRepos } from "@/scraper"

const awesomeRepos = await findAwesomeRepos({ minStars: 5000, recentMonths: 3 })
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
