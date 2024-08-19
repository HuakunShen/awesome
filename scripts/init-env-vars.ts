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
GITHUB_TOKEN=${process.env.GITHUB_TOKEN}
NEO4J_URI=${process.env.NEO4J_URI}
NEO4J_USERNAME=${process.env.NEO4J_USERNAME}
NEO4J_PASSWORD=${process.env.NEO4J_PASSWORD}
AURA_INSTANCEID=${process.env.AURA_INSTANCEID}
AURA_INSTANCENAME=${process.env.AURA_INSTANCENAME}
NEO4J_DATABASE_URL=${process.env.NEO4J_DATABASE_URL}
`
	)
}

const targetPkgPaths = [
	"apps/web",
	"packages/scraper",
	"packages/db",
	"packages/neo4jdb",
	"packages/neo4j-graphql",
	"apps/dashboard"
]
const rootEnv = Bun.file(".env")
for (const targetPkgPath of targetPkgPaths) {
	Bun.write(path.join(repoRoot, targetPkgPath, ".env"), await rootEnv.text())
}
