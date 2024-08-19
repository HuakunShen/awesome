import { GraphQLClient } from "graphql-request"
import { getSdk } from "./src/generated/req"

const client = new GraphQLClient("http://localhost:4000/graphql")
const sdk = getSdk(client)

// const ret = await sdk.UpdateRepos({
// 	connect: {
// 		// awesomeListsIsFrom

// 		inAwesomeListAwesomeLists: [
// 			{
// 				where: {
// 					node: {
// 						url: "https://github.com/2"
// 					}
// 				}
// 			}
// 		]
// 	}
// })

// console.log(ret)
// const repo = await sdk.CreateRepos({
// 	input: {
// 		owner: "tauri-apps",
// 		name: "create-tauri-app",
// 		stars: 10,
// 		url: "https://github.com/tauri-apps/create-tauri-app",
// 		missing: false,
// 		description: "Rapidly scaffold out a new tauri app project.",
// 		diskUsage: 101010,
// 		forkCount: 81,
// 		hasSponsorshipsEnabled: false,
// 		homepageUrl: "",
// 		// licenseInfo:
// 		openIssuesCount: 4,
// 		closeIssuesCount: 1,
// 		pullRequestsCount: 630,
// 		releasesCount: 215,
// 		repoPushedAt: "2024-08-14T15:44:35.000Z",
// 		repoUpdatedAt: "2024-08-14T15:41:53.000Z",
// 		repoCreatedAt: "2022-02-17T17:44:10.000Z",
// 		watchersCount: 17
// 	}
// })
// const res = await sdk.CreateAwesomeLists({
// 	input: {
// 		url: "https://github.com/2",
// 		// createdAt: new Date(),
// 		// isFromRepos
// 		// lastRefreshTime: new Date(),
// 		lastRefreshTime: new Date(),
// 		name: "Awesome Listss",
// 		// reposInAwesomeList
// 		tags: [],
// 		isFromRepo: {
// 			connect: {
// 				where: {
// 					node: {
// 						url: repo.data.createRepos.repos[0].url
// 					}
// 				}
// 			}
// 		}
// 	}
// })

// console.log(res)

// const repo = await
// console.log(repo)
