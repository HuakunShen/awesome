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

abstract class BaseDao<T> {
	client: TypedPocketBase
	tableName: string
	defaultFields: (keyof T)[] = []

	constructor(client: TypedPocketBase, tableName: string) {
		this.client = client
		this.tableName = tableName
	}

	get collection() {
		return this.client.collection<T>(this.tableName)
	}

	getAll(options: { fields?: (keyof RepoResponse)[]; extraFields?: (keyof RepoResponse)[] }) {
		const fields = options.fields ?? this.defaultFields
		const extraFields = options.extraFields ?? []
		const fieldsSet = new Set([...fields, ...extraFields])
		return this.collection.getFullList({
			fields: Array.from(fieldsSet).join(",")
		})
	}
}

export class AwesomeListDao extends BaseDao<AwesomeListResponse> {
	defaultFields: (keyof AwesomeListResponse)[] = ["id", "url", "name", "type", "updated"]
	constructor(client: TypedPocketBase) {
		super(client, "awesome_list")
	}

	/* --------------------------------- Create --------------------------------- */
	insert(data: { name: string; url: string; type: AwesomeListTypeOptions; metadata: unknown }) {
		return this.collection.create({
			url: data.url,
			name: data.name,
			type: data.type,
			metadata: data.metadata
		})
	}

	/* --------------------------------- Delete --------------------------------- */
	delete(id: string) {
		return this.collection.delete(id)
	}

	/* --------------------------------- Update --------------------------------- */
	update(id: string, name: string, url: string) {
		return this.collection.update(id, {
			name,
			url
		})
	}

	async setLastRefreshed(id: string) {
		return this.collection.update(id, {
			updated: new Date().toISOString()
		})
	}

	/* --------------------------------- Read --------------------------------- */
	async get(id: string) {
		return await this.collection.getOne(id)
	}

	async getByUrl(url: string) {
		return this.collection.getFirstListItem(`url="${url}"`).catch((err) => {
			return null
		})
	}

	// async getAll(options: {
	// 	fields?: (keyof AwesomeListResponse)[]
	// 	extraFields?: (keyof AwesomeListResponse)[]
	// }) {
	// 	return this.collection.getFullList()
	// }
}

export class AwesomeRepoDao extends BaseDao<RepoResponse> {
	awesomeListDao: AwesomeListDao
	defaultFields: (keyof RepoResponse)[] = ["url", "name", "updated", "created", "id", "stars"]
	constructor(client: TypedPocketBase, awesomeListDao: AwesomeListDao) {
		super(client, "repo")
		this.awesomeListDao = awesomeListDao
	}

	insert(data: RepoRecord) {
		return this.collection.create(data)
	}

	getByUrl(url: string) {
		return this.client
			.collection(this.tableName)
			.getFirstListItem(`url="${url}"`)
			.catch((err) => {
				return null
			})
	}

	// getAll(options: { fields?: (keyof RepoResponse)[]; extraFields?: (keyof RepoResponse)[] }) {
	// 	const fields = options.fields ?? this.defaultFields
	// 	const extraFields = options.extraFields ?? []
	// 	const fieldsSet = new Set([...fields, ...extraFields])
	// 	return this.collection.getFullList({
	// 		fields: Array.from(fieldsSet).join(",")
	// 	})
	// }

	/**
	 * Given cache life in milliseconds, return all outdated repos
	 * @param lifeMs Cache life in milliseconds
	 * @returns
	 */
	getOutdatedRepos(lifeMs: number) {
		const now = new Date().getTime()
		const threshold = now - lifeMs
		const isoThreshold = new Date(threshold).toISOString()
		return this.collection.getFullList({ filter: `updated < "${isoThreshold}"` })
	}

	getDraftRepos(options: {
		fields?: (keyof RepoResponse)[]
		extraFields?: (keyof RepoResponse)[]
	}) {
		const fields = options.fields ?? this.defaultFields
		const extraFields = options.extraFields ?? []
		const fieldsSet = new Set([...fields, ...extraFields])
		return this.collection.getFullList({
			filter: `draft=true`,
			fields: Array.from(fieldsSet).join(",")
		})
	}

	update(id: string, data: RepoRecord) {
		return this.collection.update(id, data)
	}

	delete(id: string) {
		return this.collection.delete(id)
	}

	// setMissing(repoUrl: string) {
	// 	return this.collection.update(repoUrl, { missing: true })
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
export class IsAwesomeDao extends BaseDao<IsAwesomeResponse> {
	constructor(client: TypedPocketBase) {
		super(client, "is_awesome")
	}

	// getAll() {
	// 	return this.collection.getFullList()
	// }

	insert(data: IsAwesomeRecord) {
		return this.collection.create(data)
	}

	delete(id: string) {
		return this.collection.delete(id)
	}

	async getByListAndRepo(listId: string, repoId: string) {
		return this.client
			.collection(this.tableName)
			.getFirstListItem(`awesome_list="${listId}" AND repo="${repoId}"`)
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
