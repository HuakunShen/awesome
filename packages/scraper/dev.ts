// const data = await Bun.file("./awesome-repo.json").json()
// const urls = Object.values(data).flat()
// console.log(urls.length)
// console.log(new Set(urls).size)

import { neo4jSdk } from "@/db"
import { indexGitHubRepo } from "@/scraper"

// await indexGitHubRepo(
// 	"https://github.com/CrossCopy/tauri-plugin-clipboard",
// 	"19d60311-ad74-4b92-ada2-9cbec9830d06"
// )
const updateRes = await neo4jSdk.UpdateRepos({
	where: {
		url: "https://github.com/CrossCopy/tauri-plugin-clipboard"
	},
	connect: {
		inAwesomeListAwesomeLists: [
			{
				where: {
					node: {
						url: "https://github.com/tauri-apps/awesome-tauri"
					}
				}
			}
		]
	}
})
console.log(updateRes.data.updateRepos.info)

// console.log(
// 	(
// 		await neo4jSdk.Repos({
// 			where: {
// 				name: "tauri-plugin-clipboard"
// 			}
// 		})
// 	).data.repos
// )

// const updateRes = await neo4jSdk.UpdateRepos({
// 	where: {
// 		id: "74c0ed37-b09d-4c43-97f3-aa08e7fd56da"
// 	},
// 	update: {
// 		missing: true
// 	},
// 	connect: {
// 		inAwesomeListAwesomeLists: [
// 			{
// 				where: {
// 					node: {
// 						id: "19d60311-ad74-4b92-ada2-9cbec9830d06"
// 					}
// 				}
// 			}
// 		]
// 	}
// })

// console.log(updateRes.data.updateRepos.info)
// console.log(updateRes.data.updateRepos.repos)
