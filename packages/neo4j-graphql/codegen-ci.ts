/**
 * This script is designed for CI to start a server then run codegen
 */
import { $ } from "bun"

$`node server.js`
// sleep for 4 seconds to wait for server to start
await new Promise((resolve) => setTimeout(resolve, 5000))
await $`bun run codegen`
process.exit(0)
