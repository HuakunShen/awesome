export const getGithubRepoUrl = (owner: string, repo: string) =>
	`https://github.com/${owner}/${repo}`

export const getGithubRepoToReadmeUrl = (owner: string, repo: string) =>
	`https://api.github.com/repos/${owner}/${repo}/readme`

export const getGithubRepoMetadataUrl = (owner: string, repo: string): string =>
	`https://api.github.com/repos/${owner}/${repo}`
