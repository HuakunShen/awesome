import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
	overwrite: true,
	schema: "http://localhost:4000",
	documents: "src/operations/**/*.gql",
	generates: {
		"src/generated/gql/": {
			preset: "client",
			presetConfig: {
				fragmentMasking: { unmaskFunctionName: "getFragmentData" }
			},
			config: {
				useTypeImports: true // The updated setting.
			}
		},
		"src/generated/req.ts": {
			plugins: ["typescript", "typescript-operations", "typescript-graphql-request"],
			config: {
				rawRequest: true
			}
		},
		"./github-graphql.schema.json": {
			plugins: ["introspection"]
		}
	}
}

export default config
