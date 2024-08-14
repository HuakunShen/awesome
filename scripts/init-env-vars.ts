import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.resolve(__dirname, "..")
const rootEnvPath = path.join(repoRoot, ".env")
if (!fs.existsSync(rootEnvPath)) {
	Bun.write(
		rootEnvPath,
		`
PB_URL=${process.env.PB_URL}
PB_ADMIN_USERNAME=${process.env.PB_ADMIN_USERNAME}
PB_ADMIN_PASSWORD=${process.env.PB_ADMIN_PASSWORD}
GITHUB_TOKEN	=${process.env.GITHUB_TOKEN}
`
	)
}

const targetPkgPaths = [
	"apps/web",
	"packages/scraper",
	"packages/github-graphql",
	"packages/db",
	"apps/dashboard"
]
const rootEnv = Bun.file(".env")
for (const targetPkgPath of targetPkgPaths) {
	Bun.write(path.join(repoRoot, targetPkgPath, ".env"), await rootEnv.text())
}
