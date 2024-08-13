import { describe, expect, test } from "bun:test"
import { fetchGitHubRepoReadme } from "../src/scraper"

describe("Fetch Data", () => {
	test("Fetch Default GitHuub Repo README", async () => {
		const content = await fetchGitHubRepoReadme("tauri-apps", "awesome-tauri")
		expect(content).toContain("Awesome Tauri")
	})
})
