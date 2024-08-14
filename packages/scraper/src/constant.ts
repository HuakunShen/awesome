import { z } from "zod"

export const GITHUB_TOKEN = process.env.GITHUB_TOKEN

export const GitHubRepoUrlRegex = /^https:\/\/github\.com\/([\w-]+)\/([\w-]+)(?:\/|#?.*)?$/

/* -------------------------------------------------------------------------- */
/*                                    Time                                    */
/* -------------------------------------------------------------------------- */

export const MINUTE_MS = 60 * 1000
export const HOUR_MS = 60 * MINUTE_MS
export const DAY_MS = 24 * HOUR_MS
export const REPO_CACHE_LIFE_DAYS = z.coerce
	.number()
	.default(7)
	.parse(process.env.REPO_CACHE_LIFE_DAYS)
export const CACHE_INVALIDATION_TIME = REPO_CACHE_LIFE_DAYS * DAY_MS
