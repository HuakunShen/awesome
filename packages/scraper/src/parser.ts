import { fromMarkdown } from "mdast-util-from-markdown"
import { MarkdownLink, Repo } from "types"
import { visit } from "unist-util-visit"

export function parseMarkdownLinks(md: string): MarkdownLink[] {
	const tree = fromMarkdown(md)
	const links: MarkdownLink[] = []
	visit(tree, "link", function (node, index, parent) {
		const textChildren = node.children.filter((n) => n.type === "text")
		if (textChildren.length === 1) {
			const textNode = node.children[0] as { value: string }
			links.push({
				text: textNode.value,
				url: node.url
			})
		}
	})
	return MarkdownLink.array().parse(links)
}

export function parseOwnerAndRepoFromGithubUrl(url: string): Repo {
	const split = url.split("/")
	return {
		owner: split[3],
		name: split[4]
	}
}
