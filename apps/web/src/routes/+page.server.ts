import { error } from "@sveltejs/kit"
import { awesomeListDao, isAwesomeDao } from "$lib/server/db"

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const ret = await Promise.all([isAwesomeDao.getAll({}), awesomeListDao.getAll({})])
	return { awesomeLists: ret[1], isAwesomes: ret[0] }
}
