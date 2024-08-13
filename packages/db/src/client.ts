import PocketBase from "pocketbase"
import type { TypedPocketBase } from "./pocketbase-types"

export async function getAdminPocketBaseClient(
	url: string,
	username: string,
	password: string
): Promise<TypedPocketBase> {
	const pb = new PocketBase(url)
	const authData = await pb.admins.authWithPassword(username, password)
	return pb
}
