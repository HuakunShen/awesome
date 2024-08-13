import type {
	AwesomeListRecord,
	AwesomeListResponse,
	AwesomeListTypeOptions,
	IsAwesomeRecord,
	IsAwesomeResponse,
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
		return this.client.collection(this.tableName).create<AwesomeListResponse>({
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
		return await this.client.collection(this.tableName).update<AwesomeListResponse>(id, {
			name,
			url
		})
	}

	/* --------------------------------- Read --------------------------------- */
	async get(id: string) {
		return await this.client.collection(this.tableName).getOne<AwesomeListResponse>(id)
	}

	async getByUrl(url: string): Promise<AwesomeListResponse | null> {
		return this.client
			.collection(this.tableName)
			.getFirstListItem<AwesomeListResponse>(`url="${url}"`)
			.catch((err) => {
				return null
			})
	}

	async getAll() {
		return this.client.collection(this.tableName).getFullList<AwesomeListResponse>()
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
		return this.client.collection(this.tableName).create<RepoResponse>({
			url: data.url,
			name: data.name,
			description: data.description,
			stars: data.stars,
			metadata: data.metadata,
			missing: data.missing
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
			fields: "url,name,updated,created,id"
		})
	}

	update(id: string, data: RepoRecord) {
		return this.client.collection(this.tableName).update<RepoResponse>(id, data)
	}

	// setMissing(repoUrl: string) {
	// 	return this.client.collection(this.tableName).update<RepoResponse>(repoUrl, { missing: true })
	// }

	async insertOrUpdate(data: RepoRecord) {
		const rec = await this.getByUrl(data.url)
		if (rec) {
			return this.update(rec.id, data)
		} else {
			return this.insert(data)
		}
	}
}
export class IsAwesomeDao {
	client: TypedPocketBase
	tableName = "is_awesome"

	constructor(client: TypedPocketBase) {
		this.client = client
	}

	getAll() {
		return this.client.collection(this.tableName).getFullList<IsAwesomeResponse>()
	}

	insert(data: IsAwesomeRecord) {
		return this.client.collection(this.tableName).create<IsAwesomeResponse>(data)
	}

	async getByListAndRepo(listId: string, repoId: string) {
		return this.client
			.collection(this.tableName)
			.getFirstListItem<IsAwesomeResponse>(`awesome_list="${listId}" AND repo="${repoId}"`)
			.catch((err) => {
				return null
			})
	}

	async insertIfNotExist(data: Required<IsAwesomeRecord>) {
		const rec = await this.getByListAndRepo(data.awesome_list, data.repo)
		if (!rec) {
			return this.insert(data)
		}
		return null
	}
}
