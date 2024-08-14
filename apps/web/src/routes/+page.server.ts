import { error } from "@sveltejs/kit"
import { db } from "$lib/server/db"

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	return { awesomeLists: await db.getAllAwesomeLists() }
	// const ret = await Promise.all([isAwesomeDao.getAll({}), awesomeListDao.getAll({})])
	// return { awesomeLists: ret[1], isAwesomes: ret[0] }
}
