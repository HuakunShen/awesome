import { z } from "zod"

export const Repo = z.object({
	owner: z.string(),
	name: z.string()
})

export type Repo = z.infer<typeof Repo>

export const RepoMetadata = z.object({
	stargazerCount: z.number(),
	forkCount: z.number(),
	createdAt: z.string(),
	description: z.string(),
	hasDiscussionsEnabled: z.boolean(),
	hasIssuesEnabled: z.boolean(),
	forkingAllowed: z.boolean(),
	diskUsage: z.number(),
	hasSponsorshipsEnabled: z.boolean(),
	homepageUrl: z.string().nullable(),
	pushedAt: z.string(),
	updatedAt: z.string(),
	name: z.string(),
	owner: z.object({ __typename: z.string(), login: z.string() }),
	url: z.string(),
	watchers: z.object({ __typename: z.string(), totalCount: z.number() }),
	openIssues: z.object({ __typename: z.string(), totalCount: z.number() }),
	closedIssues: z.object({ __typename: z.string(), totalCount: z.number() }),
	pullRequests: z.object({ __typename: z.string(), totalCount: z.number() }),
	releases: z.object({ __typename: z.string(), totalCount: z.number() }),
	licenseInfo: z
		.object({
			__typename: z.string(),
			key: z.string(),
			name: z.string(),
			nickname: z.null()
		})
		.nullable()
})
export type RepoMetadata = z.infer<typeof RepoMetadata>

export const GitHubGqlRepoReadmeRaw = z.object({
	owner: z.object({ __typename: z.string(), login: z.string() }),
	name: z.string(),
	url: z.string(),
	object: z.object({ __typename: z.string(), text: z.string() })
})
export type GitHubGqlRepoReadmeRaw = z.infer<typeof GitHubGqlRepoReadmeRaw>

export const GitHubGqlRepoReadme = z.object({
	owner: z.string(),
	name: z.string(),
	url: z.string(),
	text: z.string()
})
export type GitHubGqlRepoReadme = z.infer<typeof GitHubGqlRepoReadme>
