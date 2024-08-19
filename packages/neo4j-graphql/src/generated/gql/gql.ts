/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation CreateAwesomeLists($input: [AwesomeListCreateInput!]!) {\n  createAwesomeLists(input: $input) {\n    awesomeLists {\n      lastRefreshTime\n      name\n      tags\n      url\n    }\n  }\n}": types.CreateAwesomeListsDocument,
    "mutation CreateRepos($input: [RepoCreateInput!]!) {\n  createRepos(input: $input) {\n    repos {\n      url\n      name\n      owner\n      stars\n      forkCount\n      description\n      diskUsage\n      forkCount\n      closeIssuesCount\n      homepageUrl\n      hasSponsorshipsEnabled\n      lastModified\n      license\n      missing\n    }\n  }\n}": types.CreateReposDocument,
    "mutation connectRepo($connect: RepoConnectInput) {\n  updateRepos(connect: $connect) {\n    info {\n      relationshipsCreated\n      relationshipsDeleted\n    }\n    repos {\n      url\n      stars\n    }\n  }\n}": types.ConnectRepoDocument,
    "query AwesomeLists($where: AwesomeListWhere) {\n  awesomeLists(where: $where) {\n    lastModified\n    lastRefreshTime\n    name\n    url\n    tags\n    id\n  }\n}": types.AwesomeListsDocument,
    "query Repos($where: RepoWhere, $options: RepoOptions) {\n  repos(where: $where, options: $options) {\n    diskUsage\n    name\n    url\n    owner\n    id\n    stars\n    lastModified\n    repoCreatedAt\n  }\n}": types.ReposDocument,
    "mutation UpdateAwesomeLists($where: AwesomeListWhere, $update: AwesomeListUpdateInput, $connect: AwesomeListConnectInput, $disconnect: AwesomeListDisconnectInput, $create: AwesomeListRelationInput, $delete: AwesomeListDeleteInput, $connectOrCreate: AwesomeListConnectOrCreateInput) {\n  updateAwesomeLists(\n    where: $where\n    update: $update\n    connect: $connect\n    disconnect: $disconnect\n    create: $create\n    delete: $delete\n    connectOrCreate: $connectOrCreate\n  ) {\n    awesomeLists {\n      lastRefreshTime\n      name\n      tags\n      url\n      id\n      lastModified\n    }\n  }\n}": types.UpdateAwesomeListsDocument,
    "mutation UpdateRepos($connect: RepoConnectInput, $where: RepoWhere, $update: RepoUpdateInput, $create: RepoRelationInput, $connectOrCreate: RepoConnectOrCreateInput, $delete: RepoDeleteInput, $disconnect: RepoDisconnectInput) {\n  updateRepos(\n    connect: $connect\n    where: $where\n    update: $update\n    create: $create\n    connectOrCreate: $connectOrCreate\n    delete: $delete\n    disconnect: $disconnect\n  ) {\n    info {\n      relationshipsCreated\n      relationshipsDeleted\n    }\n    repos {\n      url\n      stars\n    }\n  }\n}": types.UpdateReposDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateAwesomeLists($input: [AwesomeListCreateInput!]!) {\n  createAwesomeLists(input: $input) {\n    awesomeLists {\n      lastRefreshTime\n      name\n      tags\n      url\n    }\n  }\n}"): (typeof documents)["mutation CreateAwesomeLists($input: [AwesomeListCreateInput!]!) {\n  createAwesomeLists(input: $input) {\n    awesomeLists {\n      lastRefreshTime\n      name\n      tags\n      url\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateRepos($input: [RepoCreateInput!]!) {\n  createRepos(input: $input) {\n    repos {\n      url\n      name\n      owner\n      stars\n      forkCount\n      description\n      diskUsage\n      forkCount\n      closeIssuesCount\n      homepageUrl\n      hasSponsorshipsEnabled\n      lastModified\n      license\n      missing\n    }\n  }\n}"): (typeof documents)["mutation CreateRepos($input: [RepoCreateInput!]!) {\n  createRepos(input: $input) {\n    repos {\n      url\n      name\n      owner\n      stars\n      forkCount\n      description\n      diskUsage\n      forkCount\n      closeIssuesCount\n      homepageUrl\n      hasSponsorshipsEnabled\n      lastModified\n      license\n      missing\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation connectRepo($connect: RepoConnectInput) {\n  updateRepos(connect: $connect) {\n    info {\n      relationshipsCreated\n      relationshipsDeleted\n    }\n    repos {\n      url\n      stars\n    }\n  }\n}"): (typeof documents)["mutation connectRepo($connect: RepoConnectInput) {\n  updateRepos(connect: $connect) {\n    info {\n      relationshipsCreated\n      relationshipsDeleted\n    }\n    repos {\n      url\n      stars\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query AwesomeLists($where: AwesomeListWhere) {\n  awesomeLists(where: $where) {\n    lastModified\n    lastRefreshTime\n    name\n    url\n    tags\n    id\n  }\n}"): (typeof documents)["query AwesomeLists($where: AwesomeListWhere) {\n  awesomeLists(where: $where) {\n    lastModified\n    lastRefreshTime\n    name\n    url\n    tags\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Repos($where: RepoWhere, $options: RepoOptions) {\n  repos(where: $where, options: $options) {\n    diskUsage\n    name\n    url\n    owner\n    id\n    stars\n    lastModified\n    repoCreatedAt\n  }\n}"): (typeof documents)["query Repos($where: RepoWhere, $options: RepoOptions) {\n  repos(where: $where, options: $options) {\n    diskUsage\n    name\n    url\n    owner\n    id\n    stars\n    lastModified\n    repoCreatedAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateAwesomeLists($where: AwesomeListWhere, $update: AwesomeListUpdateInput, $connect: AwesomeListConnectInput, $disconnect: AwesomeListDisconnectInput, $create: AwesomeListRelationInput, $delete: AwesomeListDeleteInput, $connectOrCreate: AwesomeListConnectOrCreateInput) {\n  updateAwesomeLists(\n    where: $where\n    update: $update\n    connect: $connect\n    disconnect: $disconnect\n    create: $create\n    delete: $delete\n    connectOrCreate: $connectOrCreate\n  ) {\n    awesomeLists {\n      lastRefreshTime\n      name\n      tags\n      url\n      id\n      lastModified\n    }\n  }\n}"): (typeof documents)["mutation UpdateAwesomeLists($where: AwesomeListWhere, $update: AwesomeListUpdateInput, $connect: AwesomeListConnectInput, $disconnect: AwesomeListDisconnectInput, $create: AwesomeListRelationInput, $delete: AwesomeListDeleteInput, $connectOrCreate: AwesomeListConnectOrCreateInput) {\n  updateAwesomeLists(\n    where: $where\n    update: $update\n    connect: $connect\n    disconnect: $disconnect\n    create: $create\n    delete: $delete\n    connectOrCreate: $connectOrCreate\n  ) {\n    awesomeLists {\n      lastRefreshTime\n      name\n      tags\n      url\n      id\n      lastModified\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateRepos($connect: RepoConnectInput, $where: RepoWhere, $update: RepoUpdateInput, $create: RepoRelationInput, $connectOrCreate: RepoConnectOrCreateInput, $delete: RepoDeleteInput, $disconnect: RepoDisconnectInput) {\n  updateRepos(\n    connect: $connect\n    where: $where\n    update: $update\n    create: $create\n    connectOrCreate: $connectOrCreate\n    delete: $delete\n    disconnect: $disconnect\n  ) {\n    info {\n      relationshipsCreated\n      relationshipsDeleted\n    }\n    repos {\n      url\n      stars\n    }\n  }\n}"): (typeof documents)["mutation UpdateRepos($connect: RepoConnectInput, $where: RepoWhere, $update: RepoUpdateInput, $create: RepoRelationInput, $connectOrCreate: RepoConnectOrCreateInput, $delete: RepoDeleteInput, $disconnect: RepoDisconnectInput) {\n  updateRepos(\n    connect: $connect\n    where: $where\n    update: $update\n    create: $create\n    connectOrCreate: $connectOrCreate\n    delete: $delete\n    disconnect: $disconnect\n  ) {\n    info {\n      relationshipsCreated\n      relationshipsDeleted\n    }\n    repos {\n      url\n      stars\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;