/**
 * This file was @generated using pocketbase-typegen
 */

import type PocketBase from "pocketbase"
import type { RecordService } from "pocketbase"

export enum Collections {
	AwesomeList = "awesome_list",
	IsAwesome = "is_awesome",
	Repo = "repo",
	Users = "users"
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export enum AwesomeListTypeOptions {
	"github" = "github"
}
export type AwesomeListRecord<Tmetadata = unknown> = {
	metadata: null | Tmetadata
	name: string
	type: AwesomeListTypeOptions
	url: string
}

export type IsAwesomeRecord = {
	awesome_list?: RecordIdString
	repo?: RecordIdString
}

export type RepoRecord<Tmetadata = unknown> = {
	description?: string
	metadata?: null | Tmetadata
	missing?: boolean
	name: string
	stars?: number
	url: string
}

export type UsersRecord = {
	avatar?: string
	name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type AwesomeListResponse<Tmetadata = unknown, Texpand = unknown> = Required<
	AwesomeListRecord<Tmetadata>
> &
	BaseSystemFields<Texpand>
export type IsAwesomeResponse<Texpand = unknown> = Required<IsAwesomeRecord> &
	BaseSystemFields<Texpand>
export type RepoResponse<Tmetadata = unknown, Texpand = unknown> = Required<RepoRecord<Tmetadata>> &
	BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	awesome_list: AwesomeListRecord
	is_awesome: IsAwesomeRecord
	repo: RepoRecord
	users: UsersRecord
}

export type CollectionResponses = {
	awesome_list: AwesomeListResponse
	is_awesome: IsAwesomeResponse
	repo: RepoResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: "awesome_list"): RecordService<AwesomeListResponse>
	collection(idOrName: "is_awesome"): RecordService<IsAwesomeResponse>
	collection(idOrName: "repo"): RecordService<RepoResponse>
	collection(idOrName: "users"): RecordService<UsersResponse>
}
