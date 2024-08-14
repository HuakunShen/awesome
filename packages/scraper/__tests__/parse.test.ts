import { describe, expect, test } from "bun:test"
import { parseMarkdownLinks, parseOwnerAndRepoFromGithubUrl } from "../src/parser"
import { fetchGitHubRepoReadme } from "../src/scraper"

test("Parse Markdown Links", async () => {
	const links = parseMarkdownLinks(await fetchGitHubRepoReadme("tauri-apps", "awesome-tauri"))
	expect(links.length).toBeGreaterThan(0)
})

describe("Parse GitHub URL", () => {
	function testUrl(url: string) {
		const out = parseOwnerAndRepoFromGithubUrl(url)
		expect(out).toBeDefined()
		expect(out?.owner).toBe("tauri-apps")
		expect(out?.name).toBe("awesome-tauri")
	}

	test("Regular GitHub URL", () => {
		testUrl("https://github.com/tauri-apps/awesome-tauri")
	})

	test("Regular GitHub URL with slug", () => {
		testUrl("https://github.com/tauri-apps/awesome-tauri#readme")
	})

	test("Regular GitHub URL with more params", () => {
		testUrl("https://github.com/tauri-apps/awesome-tauri/a/b?q=d")
	})
})
