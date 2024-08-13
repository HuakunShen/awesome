import { describe, expect, test } from "bun:test"
import { parseMarkdownLinks } from "../src/parser"
import { fetchGitHubRepoReadme } from "../src/scraper"

// console.log(parseMdLinks(`[x]()`));
test("Parse Markdown Links", async () => {
	const links = parseMarkdownLinks(await fetchGitHubRepoReadme("tauri-apps", "awesome-tauri"))
	expect(links.length).toBeGreaterThan(0)
})
