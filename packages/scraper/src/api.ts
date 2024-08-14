import {
	ApolloClient,
	gql,
	HttpLink,
	InMemoryCache,
	type NormalizedCacheObject
} from "@apollo/client"
import { getSdk, type RepositoryQuery } from "github-graphql/req"
import { GraphQLClient } from "graphql-request"
import { GitHubGqlRepoReadme, GitHubGqlRepoReadmeRaw, RepoMetadata, type Repo } from "types"
import { GITHUB_TOKEN } from "./constant"

const client = new GraphQLClient("https://api.github.com/graphql", {
	headers: {
		authorization: `Bearer ${GITHUB_TOKEN}`,
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

export function getGitHubGraphqlSdk() {
	return sdk
}

export function getGitHubApiApolloClient() {
	return new ApolloClient({
		cache: new InMemoryCache(),
		link: new HttpLink({
			uri: "https://api.github.com/graphql",
			headers: {
				authorization: `Bearer ${GITHUB_TOKEN}`,
				"User-Agent": "GitHub GraphQL Client"
			}
		})
	})
}

export const constructBatchGitHubRepoQuery = (repos: Repo[]) => {
	const queries = repos.map(
		({ owner, name }, index) => `
        repo${index}: repository(owner: "${owner}", name: "${name}") {
                stargazerCount
                forkCount
                createdAt
                description
                hasDiscussionsEnabled
                hasIssuesEnabled
                forkingAllowed
                diskUsage
                hasSponsorshipsEnabled
                homepageUrl
                createdAt
                pushedAt
                updatedAt
                name
                owner {
                    login
                }
                url
                watchers {
                    totalCount
                }
                openIssues: issues(states: OPEN) {
                    totalCount
                }
                closedIssues: issues(states: CLOSED) {
                    totalCount
                }
                pullRequests {
                    totalCount
                }
                pushedAt
                releases {
                    totalCount
                }
                licenseInfo {
                    key
                    name
                    nickname
                }
            }
      `
	)

	return `
      {
        ${queries.join("\n")}
      }
    `
}

/**
 * Send a single GraphQL query to fetch metadata of a batch of GitHub repos
 * @param repos
 * @returns
 */
export async function getGitHubRepoMetadataInBatch(repos: Repo[]): Promise<RepoMetadata[]> {
	const batchQuery = constructBatchGitHubRepoQuery(repos)
	const client = getGitHubApiApolloClient()
	const res = await client.query<Record<string, RepositoryQuery["repository"]>>({
		query: gql`
			${batchQuery}
		`
	})
	if (!res.data) {
		throw new Error("Failed to fetch metadata")
	}
	const reposData = Object.entries(res.data).map(([key, value]) => RepoMetadata.parse(value))
	return reposData
}

export const constructBatchGitHubRepoReadmeQuery = (repos: Repo[]) => {
	const queries = repos.map(
		({ owner, name }, index) => `
        repo${index}: repository(owner: "${owner}", name: "${name}") {
			owner {
				login
			}
			name
			url
			object(expression: "HEAD:README.md") {
				... on Blob {
					text
				}
			}
		}
      `
	)

	return `
      {
        ${queries.join("\n")}
      }
    `
}

export async function getGitHubRepoReadmeInBatch(repos: Repo[]): Promise<GitHubGqlRepoReadme[]> {
	const batchQuery = constructBatchGitHubRepoReadmeQuery(repos)
	const client = getGitHubApiApolloClient()
	const res = await client.query<Record<string, RepositoryQuery["repository"]>>({
		query: gql`
			${batchQuery}
		`
	})
	if (!res.data) {
		throw new Error("Failed to fetch metadata")
	}

	const reposData = Object.entries(res.data).map(([key, value]) =>
		GitHubGqlRepoReadmeRaw.parse(value)
	)
	return reposData.map((repo) =>
		GitHubGqlRepoReadme.parse({
			owner: repo.owner.login,
			name: repo.name,
			url: repo.url,
			readme: repo.object.text
		})
	)
}
