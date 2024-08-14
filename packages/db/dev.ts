import { PrismaClient, type AwesomeList, type Prisma } from "@prisma/client"
import { db } from "./index"

const prisma = new PrismaClient()
// prisma.repo.findRaw({
//     filter: {"title"}
// })
// const ret = await db.createAwesomeList({
// 	name: "awesome-tauri",
// 	url: "https://github.com/tauri-apps/awesome-tauri"
// })

// console.log(ret)
//
