import { $ } from "bun"
import { getAdminPocketBaseClient } from "../src/client"

if (!(Bun.env.PB_URL && Bun.env.PB_ADMIN_USERNAME && Bun.env.PB_ADMIN_PASSWORD)) {
	throw new Error("PB_ADMIN_USERNAME and PB_ADMIN_PASSWORD are required")
}

const adminDBClient = await getAdminPocketBaseClient(
	Bun.env.PB_URL,
	Bun.env.PB_ADMIN_USERNAME,
	Bun.env.PB_ADMIN_PASSWORD
)

await adminDBClient.backups.create("tmp.zip")
const token = await adminDBClient.files.getToken()
const url = adminDBClient.backups.getDownloadUrl(token, "tmp.zip")
// download the file
const result = await fetch(url)
const path = "./tmp.zip"
await Bun.write(path, result)
// delete backup
await adminDBClient.backups.delete("tmp.zip")

// unzip the file
await $`unzip tmp.zip -d tmp_db`

await $`npx pocketbase-typegen@latest --db ./tmp_db/data.db --out src/pocketbase-types.ts`

// delete the db backup
await $`rm tmp.zip`
await $`rm -rf tmp_db`
