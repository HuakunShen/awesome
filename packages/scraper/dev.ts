import { getSdk } from "@hk/github-graphql/req"
import { GraphQLClient } from "graphql-request"

const client = new GraphQLClient("https://api.github.com/graphql", {
	headers: {
		authorization: `Bearer ${Bun.env.GITHUB_TOKEN}`,
		"User-Agent": "github-graphql package"
	}
})
const sdk = getSdk(client)

const data = await sdk.Repository({
	owner: "tauri-apps",
	name: "tauri"
})

console.log(data);
