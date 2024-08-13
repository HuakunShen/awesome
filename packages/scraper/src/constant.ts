if (!(process.env.PB_URL && process.env.PB_ADMIN_USERNAME && process.env.PB_ADMIN_PASSWORD)) {
	throw new Error("PB_URL and PB_ADMIN_USERNAME and PB_ADMIN_PASSWORD are required")
}

if (!process.env.GITHUB_TOKEN) {
	throw new Error("GITHUB_TOKEN is required")
}

export const PB_URL = process.env.PB_URL
export const PB_ADMIN_USERNAME = process.env.PB_ADMIN_USERNAME
export const PB_ADMIN_PASSWORD = process.env.PB_ADMIN_PASSWORD
export const GITHUB_TOKEN = process.env.GITHUB_TOKEN

export const GitHubRepoUrlRegex = /^https:\/\/github\.com\/([\w-]+)\/([\w-]+)\/?$/
