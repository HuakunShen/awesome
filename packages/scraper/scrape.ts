import { log } from "console"
import { $ } from "bun"

log("Update Is Awesome Data")
await $`bun scripts/fill-repo-data.ts`
log("\n")
log("Update Repo Data")
await $`bun scripts/fill-is-awesome.ts`
