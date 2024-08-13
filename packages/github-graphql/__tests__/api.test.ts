import { expect, test } from "bun:test"
import { GraphQLClient } from "graphql-request"
import { getSdk } from "../src/generated/req"

test("Get repo info", async () => {
	const client = new GraphQLClient("https://api.github.com/graphql", {
		headers: {
			authorization: `Bearer ${Bun.env.GITHUB_TOKEN}`,
			"User-Agent": "GitHub GraphQL SDK"
		}
	})
	const sdk = getSdk(client)
	const data = await sdk.Repository({
		owner: "tauri-apps",
		name: "tauri"
	})

	expect(data.data.repository?.stargazerCount).toBeGreaterThan(100)
})
