import { getSdk } from "github-graphql/req"
import { GraphQLClient } from "graphql-request"

const client = new GraphQLClient("https://api.github.com/graphql", {
	headers: {
		authorization: `Bearer ${Bun.env.GITHUB_TOKEN}`,
		"User-Agent": "GitHub GraphQL SDK"
	}
})
const sdk = getSdk(client)

export async function fetchGitHubApiRateLimit() {
	const res = await sdk.RateLimit()
	if (!res.data.rateLimit) {
		throw new Error("Rate limit not found")
	}
	const { limit, remaining, used, resetAt } = res.data.rateLimit
	return { limit, remaining, used, resetAt: new Date(resetAt) }
}
