import { env } from "$env/dynamic/private"
import { AwesomeListDao, AwesomeRepoDao, getAdminPocketBaseClient, IsAwesomeDao } from "db"

const { PB_URL, PB_ADMIN_USERNAME, PB_ADMIN_PASSWORD } = env

export const adminDBClient = await getAdminPocketBaseClient(
	PB_URL,
	PB_ADMIN_USERNAME,
	PB_ADMIN_PASSWORD
)
export const awesomeListDao = new AwesomeListDao(adminDBClient)
export const awesomeRepoDao = new AwesomeRepoDao(adminDBClient, awesomeListDao)
export const isAwesomeDao = new IsAwesomeDao(adminDBClient)
