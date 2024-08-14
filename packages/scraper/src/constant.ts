import { z } from "zod"

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

export const GitHubRepoUrlRegex = /^https:\/\/github\.com\/([\w-]+)\/([\w-]+)(?:\/|#?.*)?$/

/* -------------------------------------------------------------------------- */
/*                                    Time                                    */
/* -------------------------------------------------------------------------- */

export const MINUTE_MS = 60 * 1000
export const HOUR_MS = 60 * MINUTE_MS
export const DAY_MS = 24 * HOUR_MS
export const REPO_CACHE_LIFE_DAYS_MS = z.coerce
	.number()
	.default(7)
	.parse(process.env.REPO_CACHE_LIFE_DAYS)
export const CACHE_INVALIDATION_TIME = REPO_CACHE_LIFE_DAYS_MS * DAY_MS
