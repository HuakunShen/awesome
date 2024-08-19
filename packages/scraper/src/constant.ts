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

/* -------------------------------------------------------------------------- */
/*                                    Neo4j                                   */
/* -------------------------------------------------------------------------- */
export const NEO4J_URI = process.env.NEO4J_URI!
export const NEO4J_DATABASE_URL = process.env.NEO4J_DATABASE_URL!
export const NEO4J_USERNAME = process.env.NEO4J_USERNAME!
export const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD
if (!NEO4J_URI) {
	throw new Error("NEO4J_URI is required")
}
if (!NEO4J_DATABASE_URL) {
	throw new Error("NEO4J_DATABASE_URL is required")
}
if (!NEO4J_USERNAME) {
	throw new Error("NEO4J_USERNAME is required")
}
// if (!NEO4J_PASSWORD) {
// 	throw new Error("NEO4J_PASSWORD is required")
// }
export const NEO4J_CONFIG = {
	uri: NEO4J_URI,
	database: NEO4J_DATABASE_URL,
	username: NEO4J_USERNAME,
	password: NEO4J_PASSWORD
}
