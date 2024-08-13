import PocketBase from "pocketbase"
import type {
	AwesomeListRecord,
	AwesomeListResponse,
	AwesomeListTypeOptions,
	RepoRecord,
	RepoResponse,
	TypedPocketBase
} from "./pocketbase-types"

export class AwesomeListDao {
	client: TypedPocketBase
	tableName = "awesome_list"
	constructor(client: TypedPocketBase) {
		this.client = client
	}

	/* --------------------------------- Create --------------------------------- */
	insert(data: { name: string; url: string; type: AwesomeListTypeOptions; metadata: unknown }) {
		return this.client.collection(this.tableName).create<AwesomeListRecord>({
			url: data.url,
			name: data.name,
			type: data.type,
			metadata: data.metadata
		})
	}

	/* --------------------------------- Delete --------------------------------- */
	delete(id: string) {
		return this.client.collection(this.tableName).delete(id)
	}

	/* --------------------------------- Update --------------------------------- */
	async update(id: string, name: string, url: string) {
		return await this.client.collection(this.tableName).update<AwesomeListRecord>(id, {
			name,
			url
		})
	}

	/* --------------------------------- Read --------------------------------- */
	async get(id: string) {
		return await this.client.collection(this.tableName).getOne<AwesomeListRecord>(id)
	}

	async getByUrl(url: string): Promise<AwesomeListRecord | null> {
		return this.client
			.collection(this.tableName)
			.getFirstListItem<AwesomeListRecord>(`url="${url}"`)
			.catch((err) => {
				return null
			})
	}

	async getAll() {
		return await this.client.collection(this.tableName).getFullList<AwesomeListRecord>()
	}
}

export class AwesomeRepoDao {
	client: TypedPocketBase
	tableName = "repo"
	awesomeListDao: AwesomeListDao

	constructor(client: TypedPocketBase, awesomeListDao: AwesomeListDao) {
		this.client = client
		this.awesomeListDao = awesomeListDao
	}

	insert(data: RepoRecord) {
		return this.client.collection(this.tableName).create<RepoRecord>({
			url: data.url,
			name: data.name,
			description: data.description,
			stars: data.stars,
			metadata: data.metadata
		})
	}

	getByUrl(url: string) {
		return this.client
			.collection(this.tableName)
			.getFirstListItem<RepoResponse>(`url="${url}"`)
			.catch((err) => {
				return null
			})
	}

	getAllBasicRepos(): Promise<RepoResponse[]> {
		return this.client.collection(this.tableName).getFullList({
			fields: "url,name,updated,created,url"
		})
	}

	update(id: string, data: RepoRecord) {
		return this.client.collection(this.tableName).update<RepoRecord>(id, data)
	}

	async insertOrUpdate(data: RepoRecord) {
		const rec = await this.getByUrl(data.url)
		if (rec) {
			const updateTimestamp = new Date(rec.updated)
			// check if the repo has been updated in the last 24 hours
			if (new Date().getTime() - updateTimestamp.getTime() < 24 * 60 * 60 * 1000) {
				return null
			}
			return this.update(rec.id, data)
		} else {
			return this.insert(data)
		}
	}
}
