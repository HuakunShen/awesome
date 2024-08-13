import { githubGraphql } from "github-graphql"
import { getSdk } from "github-graphql/req"
import { GraphQLClient } from "graphql-request"
import { GITHUB_API_TOKEN, PB_URL } from "./constant"
import { getGithubRepoMetadataUrl, getGithubRepoToReadmeUrl } from "./url"

export async function fetchGitHubRepoReadme(owner: string, repo: string): Promise<string> {
	const rawRes = await fetch(getGithubRepoToReadmeUrl(owner, repo))
	const jsonRes = await rawRes.json()
	const decodedContent = atob(jsonRes.content)
	return decodedContent
}

export async function fetchGitHubRepoMetadata(
	owner: string,
	repo: string
): Promise<githubGraphql.RepositoryQuery["repository"] | null> {
	const client = new GraphQLClient("https://api.github.com/graphql", {
		headers: {
			authorization: `Bearer ${GITHUB_API_TOKEN}`,
			"User-Agent": "GitHub GraphQL SDK"
		}
	})
	const sdk = getSdk(client)
	return sdk
		.Repository({
			owner,
			name: repo
		})
		.then((res) => res.data.repository)
		.catch(() => null)
}
