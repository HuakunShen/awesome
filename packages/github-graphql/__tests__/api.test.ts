import { expect, test } from "bun:test"
import { GraphQLClient } from "graphql-request"
import { getSdk } from "../src/generated/req"

const client = new GraphQLClient("https://api.github.com/graphql", {
	headers: {
		authorization: `Bearer ${Bun.env.GITHUB_TOKEN}`,
		"User-Agent": "GitHub GraphQL SDK"
	}
})
const sdk = getSdk(client)

test("Get repo info", async () => {
	const data = await sdk.Repository({
		owner: "tauri-apps",
		name: "tauri"
	})

	expect(data.data.repository?.stargazerCount).toBeGreaterThan(100)
})

test("Get Rate Limit Info", async () => {
	const data = await sdk.RateLimit()
	console.log(data.data.rateLimit)
	expect(data.data.rateLimit).toBeDefined()
	const { limit, remaining, used, resetAt } = data.data.rateLimit!
	expect(limit).toBeDefined()
	expect(remaining).toBeDefined()
	expect(used).toBeDefined()
	expect(new Date(resetAt)).toBeDefined()
})
