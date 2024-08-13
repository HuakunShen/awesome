import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.resolve(__dirname, "..")
const rootEnvPath = path.join(repoRoot, ".env")
if (!fs.existsSync(rootEnvPath)) {
	console.error(`.env file not found at ${rootEnvPath}`)
	process.exit(1)
}

const targetPkgPaths = ["apps/web", "packages/scraper", "packages/github-graphql", "packages/db"]
const rootEnv = Bun.file(".env")
for (const targetPkgPath of targetPkgPaths) {
	Bun.write(path.join(repoRoot, targetPkgPath, ".env"), await rootEnv.text())
}
