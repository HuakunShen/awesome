import type { CodegenConfig } from "@graphql-codegen/cli"

const GITHUB_TOKEN = Bun.env.GITHUB_TOKEN
if (!GITHUB_TOKEN) {
	throw new Error("GITHUB_TOKEN is not set")
}

const config: CodegenConfig = {
	overwrite: true,
	schema: {
		"https://api.github.com/graphql": {
			headers: {
				authorization: `Bearer ${GITHUB_TOKEN}`,
				"User-Agent": "GitHub GraphQL SDK"
			}
		}
	},

	documents: "src/operations/**/*.gql",
	generates: {
		"src/generated/gql/": {
			preset: "client",
			presetConfig: {
				fragmentMasking: { unmaskFunctionName: "getFragmentData" }
			}
		},

		"src/generated/req.ts": {
			plugins: ["typescript", "typescript-operations", "typescript-graphql-request"],
			config: {
				rawRequest: true
			}
		}
	}
}

export default config
