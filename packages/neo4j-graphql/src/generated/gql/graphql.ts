/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date and time, represented as an ISO-8601 string */
  DateTime: { input: any; output: any; }
};

export type AwesomeList = {
  __typename?: 'AwesomeList';
  id: Scalars['ID']['output'];
  isFromRepo: Repo;
  isFromRepoAggregate?: Maybe<AwesomeListRepoIsFromRepoAggregationSelection>;
  isFromRepoConnection: AwesomeListIsFromRepoConnection;
  lastModified: Scalars['DateTime']['output'];
  lastRefreshTime: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  reposInAwesomeList: Array<Repo>;
  reposInAwesomeListAggregate?: Maybe<AwesomeListRepoReposInAwesomeListAggregationSelection>;
  reposInAwesomeListConnection: AwesomeListReposInAwesomeListConnection;
  tags: Array<Maybe<Scalars['String']['output']>>;
  url: Scalars['String']['output'];
};


export type AwesomeListIsFromRepoArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<RepoOptions>;
  where?: InputMaybe<RepoWhere>;
};


export type AwesomeListIsFromRepoAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<RepoWhere>;
};


export type AwesomeListIsFromRepoConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<AwesomeListIsFromRepoConnectionSort>>;
  where?: InputMaybe<AwesomeListIsFromRepoConnectionWhere>;
};


export type AwesomeListReposInAwesomeListArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<RepoOptions>;
  where?: InputMaybe<RepoWhere>;
};


export type AwesomeListReposInAwesomeListAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<RepoWhere>;
};


export type AwesomeListReposInAwesomeListConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<AwesomeListReposInAwesomeListConnectionSort>>;
  where?: InputMaybe<AwesomeListReposInAwesomeListConnectionWhere>;
};

export type AwesomeListAggregateSelection = {
  __typename?: 'AwesomeListAggregateSelection';
  count: Scalars['Int']['output'];
  id: IdAggregateSelection;
  lastModified: DateTimeAggregateSelection;
  lastRefreshTime: DateTimeAggregateSelection;
  name: StringAggregateSelection;
  url: StringAggregateSelection;
};

export type AwesomeListConnectInput = {
  isFromRepo?: InputMaybe<AwesomeListIsFromRepoConnectFieldInput>;
  reposInAwesomeList?: InputMaybe<Array<AwesomeListReposInAwesomeListConnectFieldInput>>;
};

export type AwesomeListConnectOrCreateInput = {
  isFromRepo?: InputMaybe<AwesomeListIsFromRepoConnectOrCreateFieldInput>;
  reposInAwesomeList?: InputMaybe<Array<AwesomeListReposInAwesomeListConnectOrCreateFieldInput>>;
};

export type AwesomeListConnectOrCreateWhere = {
  node: AwesomeListUniqueWhere;
};

export type AwesomeListConnectWhere = {
  node: AwesomeListWhere;
};

export type AwesomeListCreateInput = {
  isFromRepo?: InputMaybe<AwesomeListIsFromRepoFieldInput>;
  lastRefreshTime: Scalars['DateTime']['input'];
  name: Scalars['String']['input'];
  reposInAwesomeList?: InputMaybe<AwesomeListReposInAwesomeListFieldInput>;
  tags: Array<InputMaybe<Scalars['String']['input']>>;
  url: Scalars['String']['input'];
};

export type AwesomeListDeleteInput = {
  isFromRepo?: InputMaybe<AwesomeListIsFromRepoDeleteFieldInput>;
  reposInAwesomeList?: InputMaybe<Array<AwesomeListReposInAwesomeListDeleteFieldInput>>;
};

export type AwesomeListDisconnectInput = {
  isFromRepo?: InputMaybe<AwesomeListIsFromRepoDisconnectFieldInput>;
  reposInAwesomeList?: InputMaybe<Array<AwesomeListReposInAwesomeListDisconnectFieldInput>>;
};

export type AwesomeListEdge = {
  __typename?: 'AwesomeListEdge';
  cursor: Scalars['String']['output'];
  node: AwesomeList;
};

export type AwesomeListIsFromRepoAggregateInput = {
  AND?: InputMaybe<Array<AwesomeListIsFromRepoAggregateInput>>;
  NOT?: InputMaybe<AwesomeListIsFromRepoAggregateInput>;
  OR?: InputMaybe<Array<AwesomeListIsFromRepoAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<AwesomeListIsFromRepoNodeAggregationWhereInput>;
};

export type AwesomeListIsFromRepoConnectFieldInput = {
  connect?: InputMaybe<RepoConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<RepoConnectWhere>;
};

export type AwesomeListIsFromRepoConnectOrCreateFieldInput = {
  onCreate: AwesomeListIsFromRepoConnectOrCreateFieldInputOnCreate;
  where: RepoConnectOrCreateWhere;
};

export type AwesomeListIsFromRepoConnectOrCreateFieldInputOnCreate = {
  node: RepoOnCreateInput;
};

export type AwesomeListIsFromRepoConnection = {
  __typename?: 'AwesomeListIsFromRepoConnection';
  edges: Array<AwesomeListIsFromRepoRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type AwesomeListIsFromRepoConnectionSort = {
  node?: InputMaybe<RepoSort>;
};

export type AwesomeListIsFromRepoConnectionWhere = {
  AND?: InputMaybe<Array<AwesomeListIsFromRepoConnectionWhere>>;
  NOT?: InputMaybe<AwesomeListIsFromRepoConnectionWhere>;
  OR?: InputMaybe<Array<AwesomeListIsFromRepoConnectionWhere>>;
  node?: InputMaybe<RepoWhere>;
};

export type AwesomeListIsFromRepoCreateFieldInput = {
  node: RepoCreateInput;
};

export type AwesomeListIsFromRepoDeleteFieldInput = {
  delete?: InputMaybe<RepoDeleteInput>;
  where?: InputMaybe<AwesomeListIsFromRepoConnectionWhere>;
};

export type AwesomeListIsFromRepoDisconnectFieldInput = {
  disconnect?: InputMaybe<RepoDisconnectInput>;
  where?: InputMaybe<AwesomeListIsFromRepoConnectionWhere>;
};

export type AwesomeListIsFromRepoFieldInput = {
  connect?: InputMaybe<AwesomeListIsFromRepoConnectFieldInput>;
  connectOrCreate?: InputMaybe<AwesomeListIsFromRepoConnectOrCreateFieldInput>;
  create?: InputMaybe<AwesomeListIsFromRepoCreateFieldInput>;
};

export type AwesomeListIsFromRepoNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<AwesomeListIsFromRepoNodeAggregationWhereInput>>;
  NOT?: InputMaybe<AwesomeListIsFromRepoNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<AwesomeListIsFromRepoNodeAggregationWhereInput>>;
  closeIssuesCount_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  closeIssuesCount_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  closeIssuesCount_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  closeIssuesCount_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  closeIssuesCount_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  closeIssuesCount_MAX_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  closeIssuesCount_MAX_GT?: InputMaybe<Scalars['Int']['input']>;
  closeIssuesCount_MAX_GTE?: InputMaybe<Scalars['Int']['input']>;
  closeIssuesCount_MAX_LT?: InputMaybe<Scalars['Int']['input']>;
  closeIssuesCount_MAX_LTE?: InputMaybe<Scalars['Int']['input']>;
  closeIssuesCount_MIN_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  closeIssuesCount_MIN_GT?: InputMaybe<Scalars['Int']['input']>;
  closeIssuesCount_MIN_GTE?: InputMaybe<Scalars['Int']['input']>;
  closeIssuesCount_MIN_LT?: InputMaybe<Scalars['Int']['input']>;
  closeIssuesCount_MIN_LTE?: InputMaybe<Scalars['Int']['input']>;
  closeIssuesCount_SUM_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  closeIssuesCount_SUM_GT?: InputMaybe<Scalars['Int']['input']>;
  closeIssuesCount_SUM_GTE?: InputMaybe<Scalars['Int']['input']>;
  closeIssuesCount_SUM_LT?: InputMaybe<Scalars['Int']['input']>;
  closeIssuesCount_SUM_LTE?: InputMaybe<Scalars['Int']['input']>;
  description_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  description_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  description_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  description_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  description_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  description_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  description_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  description_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  description_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  description_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  diskUsage_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  diskUsage_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  diskUsage_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  diskUsage_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  diskUsage_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  diskUsage_MAX_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  diskUsage_MAX_GT?: InputMaybe<Scalars['Int']['input']>;
  diskUsage_MAX_GTE?: InputMaybe<Scalars['Int']['input']>;
  diskUsage_MAX_LT?: InputMaybe<Scalars['Int']['input']>;
  diskUsage_MAX_LTE?: InputMaybe<Scalars['Int']['input']>;
  diskUsage_MIN_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  diskUsage_MIN_GT?: InputMaybe<Scalars['Int']['input']>;
  diskUsage_MIN_GTE?: InputMaybe<Scalars['Int']['input']>;
  diskUsage_MIN_LT?: InputMaybe<Scalars['Int']['input']>;
  diskUsage_MIN_LTE?: InputMaybe<Scalars['Int']['input']>;
  diskUsage_SUM_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  diskUsage_SUM_GT?: InputMaybe<Scalars['Int']['input']>;
  diskUsage_SUM_GTE?: InputMaybe<Scalars['Int']['input']>;
  diskUsage_SUM_LT?: InputMaybe<Scalars['Int']['input']>;
  diskUsage_SUM_LTE?: InputMaybe<Scalars['Int']['input']>;
  forkCount_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  forkCount_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  forkCount_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  forkCount_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  forkCount_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  forkCount_MAX_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  forkCount_MAX_GT?: InputMaybe<Scalars['Int']['input']>;
  forkCount_MAX_GTE?: InputMaybe<Scalars['Int']['input']>;
  forkCount_MAX_LT?: InputMaybe<Scalars['Int']['input']>;
  forkCount_MAX_LTE?: InputMaybe<Scalars['Int']['input']>;
  forkCount_MIN_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  forkCount_MIN_GT?: InputMaybe<Scalars['Int']['input']>;
  forkCount_MIN_GTE?: InputMaybe<Scalars['Int']['input']>;
  forkCount_MIN_LT?: InputMaybe<Scalars['Int']['input']>;
  forkCount_MIN_LTE?: InputMaybe<Scalars['Int']['input']>;
  forkCount_SUM_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  forkCount_SUM_GT?: InputMaybe<Scalars['Int']['input']>;
  forkCount_SUM_GTE?: InputMaybe<Scalars['Int']['input']>;
  forkCount_SUM_LT?: InputMaybe<Scalars['Int']['input']>;
  forkCount_SUM_LTE?: InputMaybe<Scalars['Int']['input']>;
  homepageUrl_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  homepageUrl_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  homepageUrl_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  homepageUrl_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  homepageUrl_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  homepageUrl_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  homepageUrl_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  homepageUrl_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  homepageUrl_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  homepageUrl_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  homepageUrl_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  homepageUrl_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  homepageUrl_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  homepageUrl_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  homepageUrl_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  lastModified_MAX_EQUAL?: InputMaybe<Scalars['DateTime']['input']>;
  lastModified_MAX_GT?: InputMaybe<Scalars['DateTime']['input']>;
  lastModified_MAX_GTE?: InputMaybe<Scalars['DateTime']['input']>;
  lastModified_MAX_LT?: InputMaybe<Scalars['DateTime']['input']>;
  lastModified_MAX_LTE?: InputMaybe<Scalars['DateTime']['input']>;
  lastModified_MIN_EQUAL?: InputMaybe<Scalars['DateTime']['input']>;
  lastModified_MIN_GT?: InputMaybe<Scalars['DateTime']['input']>;
  lastModified_MIN_GTE?: InputMaybe<Scalars['DateTime']['input']>;
  lastModified_MIN_LT?: InputMaybe<Scalars['DateTime']['input']>;
  lastModified_MIN_LTE?: InputMaybe<Scalars['DateTime']['input']>;
  licenseInfo_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  licenseInfo_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  licenseInfo_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  licenseInfo_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  licenseInfo_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  licenseInfo_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  licenseInfo_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  licenseInfo_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  licenseInfo_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  licenseInfo_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  licenseInfo_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  licenseInfo_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  licenseInfo_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  licenseInfo_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  licenseInfo_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  license_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  license_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  license_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  license_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  license_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  license_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  license_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  license_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  license_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  license_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  license_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  license_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  license_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  license_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  license_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  openIssuesCount_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  openIssuesCount_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  openIssuesCount_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  openIssuesCount_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  openIssuesCount_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  openIssuesCount_MAX_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  openIssuesCount_MAX_GT?: InputMaybe<Scalars['Int']['input']>;
  openIssuesCount_MAX_GTE?: InputMaybe<Scalars['Int']['input']>;
  openIssuesCount_MAX_LT?: InputMaybe<Scalars['Int']['input']>;
  openIssuesCount_MAX_LTE?: InputMaybe<Scalars['Int']['input']>;
  openIssuesCount_MIN_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  openIssuesCount_MIN_GT?: InputMaybe<Scalars['Int']['input']>;
  openIssuesCount_MIN_GTE?: InputMaybe<Scalars['Int']['input']>;
  openIssuesCount_MIN_LT?: InputMaybe<Scalars['Int']['input']>;
  openIssuesCount_MIN_LTE?: InputMaybe<Scalars['Int']['input']>;
  openIssuesCount_SUM_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  openIssuesCount_SUM_GT?: InputMaybe<Scalars['Int']['input']>;
  openIssuesCount_SUM_GTE?: InputMaybe<Scalars['Int']['input']>;
  openIssuesCount_SUM_LT?: InputMaybe<Scalars['Int']['input']>;
  openIssuesCount_SUM_LTE?: InputMaybe<Scalars['Int']['input']>;
  owner_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  owner_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  owner_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  owner_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  owner_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  owner_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  owner_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  owner_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  owner_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  owner_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  owner_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  owner_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  owner_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  owner_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  owner_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  pullRequestsCount_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  pullRequestsCount_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  pullRequestsCount_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  pullRequestsCount_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  pullRequestsCount_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  pullRequestsCount_MAX_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  pullRequestsCount_MAX_GT?: InputMaybe<Scalars['Int']['input']>;
  pullRequestsCount_MAX_GTE?: InputMaybe<Scalars['Int']['input']>;
  pullRequestsCount_MAX_LT?: InputMaybe<Scalars['Int']['input']>;
  pullRequestsCount_MAX_LTE?: InputMaybe<Scalars['Int']['input']>;
  pullRequestsCount_MIN_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  pullRequestsCount_MIN_GT?: InputMaybe<Scalars['Int']['input']>;
  pullRequestsCount_MIN_GTE?: InputMaybe<Scalars['Int']['input']>;
  pullRequestsCount_MIN_LT?: InputMaybe<Scalars['Int']['input']>;
  pullRequestsCount_MIN_LTE?: InputMaybe<Scalars['Int']['input']>;
  pullRequestsCount_SUM_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  pullRequestsCount_SUM_GT?: InputMaybe<Scalars['Int']['input']>;
  pullRequestsCount_SUM_GTE?: InputMaybe<Scalars['Int']['input']>;
  pullRequestsCount_SUM_LT?: InputMaybe<Scalars['Int']['input']>;
  pullRequestsCount_SUM_LTE?: InputMaybe<Scalars['Int']['input']>;
  releasesCount_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  releasesCount_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  releasesCount_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  releasesCount_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  releasesCount_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  releasesCount_MAX_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  releasesCount_MAX_GT?: InputMaybe<Scalars['Int']['input']>;
  releasesCount_MAX_GTE?: InputMaybe<Scalars['Int']['input']>;
  releasesCount_MAX_LT?: InputMaybe<Scalars['Int']['input']>;
  releasesCount_MAX_LTE?: InputMaybe<Scalars['Int']['input']>;
  releasesCount_MIN_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  releasesCount_MIN_GT?: InputMaybe<Scalars['Int']['input']>;
  releasesCount_MIN_GTE?: InputMaybe<Scalars['Int']['input']>;
  releasesCount_MIN_LT?: InputMaybe<Scalars['Int']['input']>;
  releasesCount_MIN_LTE?: InputMaybe<Scalars['Int']['input']>;
  releasesCount_SUM_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  releasesCount_SUM_GT?: InputMaybe<Scalars['Int']['input']>;
  releasesCount_SUM_GTE?: InputMaybe<Scalars['Int']['input']>;
  releasesCount_SUM_LT?: InputMaybe<Scalars['Int']['input']>;
  releasesCount_SUM_LTE?: InputMaybe<Scalars['Int']['input']>;
  repoCreatedAt_MAX_EQUAL?: InputMaybe<Scalars['DateTime']['input']>;
  repoCreatedAt_MAX_GT?: InputMaybe<Scalars['DateTime']['input']>;
  repoCreatedAt_MAX_GTE?: InputMaybe<Scalars['DateTime']['input']>;
  repoCreatedAt_MAX_LT?: InputMaybe<Scalars['DateTime']['input']>;
  repoCreatedAt_MAX_LTE?: InputMaybe<Scalars['DateTime']['input']>;
  repoCreatedAt_MIN_EQUAL?: InputMaybe<Scalars['DateTime']['input']>;
  repoCreatedAt_MIN_GT?: InputMaybe<Scalars['DateTime']['input']>;
  repoCreatedAt_MIN_GTE?: InputMaybe<Scalars['DateTime']['input']>;
  repoCreatedAt_MIN_LT?: InputMaybe<Scalars['DateTime']['input']>;
  repoCreatedAt_MIN_LTE?: InputMaybe<Scalars['DateTime']['input']>;
  repoPushedAt_MAX_EQUAL?: InputMaybe<Scalars['DateTime']['input']>;
  repoPushedAt_MAX_GT?: InputMaybe<Scalars['DateTime']['input']>;
  repoPushedAt_MAX_GTE?: InputMaybe<Scalars['DateTime']['input']>;
  repoPushedAt_MAX_LT?: InputMaybe<Scalars['DateTime']['input']>;
  repoPushedAt_MAX_LTE?: InputMaybe<Scalars['DateTime']['input']>;
  repoPushedAt_MIN_EQUAL?: InputMaybe<Scalars['DateTime']['input']>;
  repoPushedAt_MIN_GT?: InputMaybe<Scalars['DateTime']['input']>;
  repoPushedAt_MIN_GTE?: InputMaybe<Scalars['DateTime']['input']>;
  repoPushedAt_MIN_LT?: InputMaybe<Scalars['DateTime']['input']>;
  repoPushedAt_MIN_LTE?: InputMaybe<Scalars['DateTime']['input']>;
  repoUpdatedAt_MAX_EQUAL?: InputMaybe<Scalars['DateTime']['input']>;
  repoUpdatedAt_MAX_GT?: InputMaybe<Scalars['DateTime']['input']>;
  repoUpdatedAt_MAX_GTE?: InputMaybe<Scalars['DateTime']['input']>;
  repoUpdatedAt_MAX_LT?: InputMaybe<Scalars['DateTime']['input']>;
  repoUpdatedAt_MAX_LTE?: InputMaybe<Scalars['DateTime']['input']>;
  repoUpdatedAt_MIN_EQUAL?: InputMaybe<Scalars['DateTime']['input']>;
  repoUpdatedAt_MIN_GT?: InputMaybe<Scalars['DateTime']['input']>;
  repoUpdatedAt_MIN_GTE?: InputMaybe<Scalars['DateTime']['input']>;
  repoUpdatedAt_MIN_LT?: InputMaybe<Scalars['DateTime']['input']>;
  repoUpdatedAt_MIN_LTE?: InputMaybe<Scalars['DateTime']['input']>;
  stars_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  stars_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  stars_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  stars_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  stars_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  stars_MAX_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  stars_MAX_GT?: InputMaybe<Scalars['Int']['input']>;
  stars_MAX_GTE?: InputMaybe<Scalars['Int']['input']>;
  stars_MAX_LT?: InputMaybe<Scalars['Int']['input']>;
  stars_MAX_LTE?: InputMaybe<Scalars['Int']['input']>;
  stars_MIN_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  stars_MIN_GT?: InputMaybe<Scalars['Int']['input']>;
  stars_MIN_GTE?: InputMaybe<Scalars['Int']['input']>;
  stars_MIN_LT?: InputMaybe<Scalars['Int']['input']>;
  stars_MIN_LTE?: InputMaybe<Scalars['Int']['input']>;
  stars_SUM_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  stars_SUM_GT?: InputMaybe<Scalars['Int']['input']>;
  stars_SUM_GTE?: InputMaybe<Scalars['Int']['input']>;
  stars_SUM_LT?: InputMaybe<Scalars['Int']['input']>;
  stars_SUM_LTE?: InputMaybe<Scalars['Int']['input']>;
  url_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  url_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  url_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  url_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  url_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  url_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  url_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  url_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  url_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  url_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  url_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  url_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  url_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  url_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  url_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  watchersCount_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  watchersCount_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  watchersCount_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  watchersCount_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  watchersCount_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  watchersCount_MAX_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  watchersCount_MAX_GT?: InputMaybe<Scalars['Int']['input']>;
  watchersCount_MAX_GTE?: InputMaybe<Scalars['Int']['input']>;
  watchersCount_MAX_LT?: InputMaybe<Scalars['Int']['input']>;
  watchersCount_MAX_LTE?: InputMaybe<Scalars['Int']['input']>;
  watchersCount_MIN_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  watchersCount_MIN_GT?: InputMaybe<Scalars['Int']['input']>;
  watchersCount_MIN_GTE?: InputMaybe<Scalars['Int']['input']>;
  watchersCount_MIN_LT?: InputMaybe<Scalars['Int']['input']>;
  watchersCount_MIN_LTE?: InputMaybe<Scalars['Int']['input']>;
  watchersCount_SUM_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  watchersCount_SUM_GT?: InputMaybe<Scalars['Int']['input']>;
  watchersCount_SUM_GTE?: InputMaybe<Scalars['Int']['input']>;
  watchersCount_SUM_LT?: InputMaybe<Scalars['Int']['input']>;
  watchersCount_SUM_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type AwesomeListIsFromRepoRelationship = {
  __typename?: 'AwesomeListIsFromRepoRelationship';
  cursor: Scalars['String']['output'];
  node: Repo;
};

export type AwesomeListIsFromRepoUpdateConnectionInput = {
  node?: InputMaybe<RepoUpdateInput>;
};

export type AwesomeListIsFromRepoUpdateFieldInput = {
  connect?: InputMaybe<AwesomeListIsFromRepoConnectFieldInput>;
  connectOrCreate?: InputMaybe<AwesomeListIsFromRepoConnectOrCreateFieldInput>;
  create?: InputMaybe<AwesomeListIsFromRepoCreateFieldInput>;
  delete?: InputMaybe<AwesomeListIsFromRepoDeleteFieldInput>;
  disconnect?: InputMaybe<AwesomeListIsFromRepoDisconnectFieldInput>;
  update?: InputMaybe<AwesomeListIsFromRepoUpdateConnectionInput>;
  where?: InputMaybe<AwesomeListIsFromRepoConnectionWhere>;
};

export type AwesomeListOnCreateInput = {
  lastRefreshTime: Scalars['DateTime']['input'];
  name: Scalars['String']['input'];
  tags: Array<InputMaybe<Scalars['String']['input']>>;
  url: Scalars['String']['input'];
};

export type AwesomeListOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more AwesomeListSort objects to sort AwesomeLists by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<AwesomeListSort>>;
};

export type AwesomeListRelationInput = {
  isFromRepo?: InputMaybe<AwesomeListIsFromRepoCreateFieldInput>;
  reposInAwesomeList?: InputMaybe<Array<AwesomeListReposInAwesomeListCreateFieldInput>>;
};

export type AwesomeListRepoIsFromRepoAggregationSelection = {
  __typename?: 'AwesomeListRepoIsFromRepoAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<AwesomeListRepoIsFromRepoNodeAggregateSelection>;
};

export type AwesomeListRepoIsFromRepoNodeAggregateSelection = {
  __typename?: 'AwesomeListRepoIsFromRepoNodeAggregateSelection';
  closeIssuesCount: IntAggregateSelection;
  description: StringAggregateSelection;
  diskUsage: IntAggregateSelection;
  forkCount: IntAggregateSelection;
  homepageUrl: StringAggregateSelection;
  id: IdAggregateSelection;
  lastModified: DateTimeAggregateSelection;
  license: StringAggregateSelection;
  licenseInfo: StringAggregateSelection;
  name: StringAggregateSelection;
  openIssuesCount: IntAggregateSelection;
  owner: StringAggregateSelection;
  pullRequestsCount: IntAggregateSelection;
  releasesCount: IntAggregateSelection;
  repoCreatedAt: DateTimeAggregateSelection;
  repoPushedAt: DateTimeAggregateSelection;
  repoUpdatedAt: DateTimeAggregateSelection;
  stars: IntAggregateSelection;
  url: StringAggregateSelection;
  watchersCount: IntAggregateSelection;
};

export type AwesomeListRepoReposInAwesomeListAggregationSelection = {
  __typename?: 'AwesomeListRepoReposInAwesomeListAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<AwesomeListRepoReposInAwesomeListNodeAggregateSelection>;
};

export type AwesomeListRepoReposInAwesomeListNodeAggregateSelection = {
  __typename?: 'AwesomeListRepoReposInAwesomeListNodeAggregateSelection';
  closeIssuesCount: IntAggregateSelection;
  description: StringAggregateSelection;
  diskUsage: IntAggregateSelection;
  forkCount: IntAggregateSelection;
  homepageUrl: StringAggregateSelection;
  id: IdAggregateSelection;
  lastModified: DateTimeAggregateSelection;
  license: StringAggregateSelection;
  licenseInfo: StringAggregateSelection;
  name: StringAggregateSelection;
  openIssuesCount: IntAggregateSelection;
  owner: StringAggregateSelection;
  pullRequestsCount: IntAggregateSelection;
  releasesCount: IntAggregateSelection;
  repoCreatedAt: DateTimeAggregateSelection;
  repoPushedAt: DateTimeAggregateSelection;
  repoUpdatedAt: DateTimeAggregateSelection;
  stars: IntAggregateSelection;
  url: StringAggregateSelection;
  watchersCount: IntAggregateSelection;
};

export type AwesomeListReposInAwesomeListAggregateInput = {
  AND?: InputMaybe<Array<AwesomeListReposInAwesomeListAggregateInput>>;
  NOT?: InputMaybe<AwesomeListReposInAwesomeListAggregateInput>;
  OR?: InputMaybe<Array<AwesomeListReposInAwesomeListAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<AwesomeListReposInAwesomeListNodeAggregationWhereInput>;
};

export type AwesomeListReposInAwesomeListConnectFieldInput = {
  connect?: InputMaybe<Array<RepoConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<RepoConnectWhere>;
};

export type AwesomeListReposInAwesomeListConnectOrCreateFieldInput = {
  onCreate: AwesomeListReposInAwesomeListConnectOrCreateFieldInputOnCreate;
  where: RepoConnectOrCreateWhere;
};

export type AwesomeListReposInAwesomeListConnectOrCreateFieldInputOnCreate = {
  node: RepoOnCreateInput;
};

export type AwesomeListReposInAwesomeListConnection = {
  __typename?: 'AwesomeListReposInAwesomeListConnection';
  edges: Array<AwesomeListReposInAwesomeListRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type AwesomeListReposInAwesomeListConnectionSort = {
  node?: InputMaybe<RepoSort>;
};

export type AwesomeListReposInAwesomeListConnectionWhere = {
  AND?: InputMaybe<Array<AwesomeListReposInAwesomeListConnectionWhere>>;
  NOT?: InputMaybe<AwesomeListReposInAwesomeListConnectionWhere>;
  OR?: InputMaybe<Array<AwesomeListReposInAwesomeListConnectionWhere>>;
  node?: InputMaybe<RepoWhere>;
};

export type AwesomeListReposInAwesomeListCreateFieldInput = {
  node: RepoCreateInput;
};

export type AwesomeListReposInAwesomeListDeleteFieldInput = {
  delete?: InputMaybe<RepoDeleteInput>;
  where?: InputMaybe<AwesomeListReposInAwesomeListConnectionWhere>;
};

export type AwesomeListReposInAwesomeListDisconnectFieldInput = {
  disconnect?: InputMaybe<RepoDisconnectInput>;
  where?: InputMaybe<AwesomeListReposInAwesomeListConnectionWhere>;
};

export type AwesomeListReposInAwesomeListFieldInput = {
  connect?: InputMaybe<Array<AwesomeListReposInAwesomeListConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<AwesomeListReposInAwesomeListConnectOrCreateFieldInput>>;
  create?: InputMaybe<Array<AwesomeListReposInAwesomeListCreateFieldInput>>;
};

export type AwesomeListReposInAwesomeListNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<AwesomeListReposInAwesomeListNodeAggregationWhereInput>>;
  NOT?: InputMaybe<AwesomeListReposInAwesomeListNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<AwesomeListReposInAwesomeListNodeAggregationWhereInput>>;
  closeIssuesCount_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  closeIssuesCount_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  closeIssuesCount_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  closeIssuesCount_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  closeIssuesCount_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  closeIssuesCount_MAX_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  closeIssuesCount_MAX_GT?: InputMaybe<Scalars['Int']['input']>;
  closeIssuesCount_MAX_GTE?: InputMaybe<Scalars['Int']['input']>;
  closeIssuesCount_MAX_LT?: InputMaybe<Scalars['Int']['input']>;
  closeIssuesCount_MAX_LTE?: InputMaybe<Scalars['Int']['input']>;
  closeIssuesCount_MIN_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  closeIssuesCount_MIN_GT?: InputMaybe<Scalars['Int']['input']>;
  closeIssuesCount_MIN_GTE?: InputMaybe<Scalars['Int']['input']>;
  closeIssuesCount_MIN_LT?: InputMaybe<Scalars['Int']['input']>;
  closeIssuesCount_MIN_LTE?: InputMaybe<Scalars['Int']['input']>;
  closeIssuesCount_SUM_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  closeIssuesCount_SUM_GT?: InputMaybe<Scalars['Int']['input']>;
  closeIssuesCount_SUM_GTE?: InputMaybe<Scalars['Int']['input']>;
  closeIssuesCount_SUM_LT?: InputMaybe<Scalars['Int']['input']>;
  closeIssuesCount_SUM_LTE?: InputMaybe<Scalars['Int']['input']>;
  description_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  description_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  description_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  description_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  description_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  description_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  description_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  description_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  description_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  description_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  diskUsage_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  diskUsage_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  diskUsage_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  diskUsage_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  diskUsage_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  diskUsage_MAX_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  diskUsage_MAX_GT?: InputMaybe<Scalars['Int']['input']>;
  diskUsage_MAX_GTE?: InputMaybe<Scalars['Int']['input']>;
  diskUsage_MAX_LT?: InputMaybe<Scalars['Int']['input']>;
  diskUsage_MAX_LTE?: InputMaybe<Scalars['Int']['input']>;
  diskUsage_MIN_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  diskUsage_MIN_GT?: InputMaybe<Scalars['Int']['input']>;
  diskUsage_MIN_GTE?: InputMaybe<Scalars['Int']['input']>;
  diskUsage_MIN_LT?: InputMaybe<Scalars['Int']['input']>;
  diskUsage_MIN_LTE?: InputMaybe<Scalars['Int']['input']>;
  diskUsage_SUM_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  diskUsage_SUM_GT?: InputMaybe<Scalars['Int']['input']>;
  diskUsage_SUM_GTE?: InputMaybe<Scalars['Int']['input']>;
  diskUsage_SUM_LT?: InputMaybe<Scalars['Int']['input']>;
  diskUsage_SUM_LTE?: InputMaybe<Scalars['Int']['input']>;
  forkCount_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  forkCount_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  forkCount_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  forkCount_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  forkCount_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  forkCount_MAX_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  forkCount_MAX_GT?: InputMaybe<Scalars['Int']['input']>;
  forkCount_MAX_GTE?: InputMaybe<Scalars['Int']['input']>;
  forkCount_MAX_LT?: InputMaybe<Scalars['Int']['input']>;
  forkCount_MAX_LTE?: InputMaybe<Scalars['Int']['input']>;
  forkCount_MIN_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  forkCount_MIN_GT?: InputMaybe<Scalars['Int']['input']>;
  forkCount_MIN_GTE?: InputMaybe<Scalars['Int']['input']>;
  forkCount_MIN_LT?: InputMaybe<Scalars['Int']['input']>;
  forkCount_MIN_LTE?: InputMaybe<Scalars['Int']['input']>;
  forkCount_SUM_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  forkCount_SUM_GT?: InputMaybe<Scalars['Int']['input']>;
  forkCount_SUM_GTE?: InputMaybe<Scalars['Int']['input']>;
  forkCount_SUM_LT?: InputMaybe<Scalars['Int']['input']>;
  forkCount_SUM_LTE?: InputMaybe<Scalars['Int']['input']>;
  homepageUrl_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  homepageUrl_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  homepageUrl_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  homepageUrl_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  homepageUrl_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  homepageUrl_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  homepageUrl_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  homepageUrl_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  homepageUrl_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  homepageUrl_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  homepageUrl_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  homepageUrl_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  homepageUrl_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  homepageUrl_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  homepageUrl_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  lastModified_MAX_EQUAL?: InputMaybe<Scalars['DateTime']['input']>;
  lastModified_MAX_GT?: InputMaybe<Scalars['DateTime']['input']>;
  lastModified_MAX_GTE?: InputMaybe<Scalars['DateTime']['input']>;
  lastModified_MAX_LT?: InputMaybe<Scalars['DateTime']['input']>;
  lastModified_MAX_LTE?: InputMaybe<Scalars['DateTime']['input']>;
  lastModified_MIN_EQUAL?: InputMaybe<Scalars['DateTime']['input']>;
  lastModified_MIN_GT?: InputMaybe<Scalars['DateTime']['input']>;
  lastModified_MIN_GTE?: InputMaybe<Scalars['DateTime']['input']>;
  lastModified_MIN_LT?: InputMaybe<Scalars['DateTime']['input']>;
  lastModified_MIN_LTE?: InputMaybe<Scalars['DateTime']['input']>;
  licenseInfo_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  licenseInfo_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  licenseInfo_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  licenseInfo_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  licenseInfo_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  licenseInfo_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  licenseInfo_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  licenseInfo_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  licenseInfo_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  licenseInfo_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  licenseInfo_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  licenseInfo_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  licenseInfo_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  licenseInfo_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  licenseInfo_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  license_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  license_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  license_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  license_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  license_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  license_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  license_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  license_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  license_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  license_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  license_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  license_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  license_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  license_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  license_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  openIssuesCount_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  openIssuesCount_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  openIssuesCount_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  openIssuesCount_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  openIssuesCount_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  openIssuesCount_MAX_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  openIssuesCount_MAX_GT?: InputMaybe<Scalars['Int']['input']>;
  openIssuesCount_MAX_GTE?: InputMaybe<Scalars['Int']['input']>;
  openIssuesCount_MAX_LT?: InputMaybe<Scalars['Int']['input']>;
  openIssuesCount_MAX_LTE?: InputMaybe<Scalars['Int']['input']>;
  openIssuesCount_MIN_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  openIssuesCount_MIN_GT?: InputMaybe<Scalars['Int']['input']>;
  openIssuesCount_MIN_GTE?: InputMaybe<Scalars['Int']['input']>;
  openIssuesCount_MIN_LT?: InputMaybe<Scalars['Int']['input']>;
  openIssuesCount_MIN_LTE?: InputMaybe<Scalars['Int']['input']>;
  openIssuesCount_SUM_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  openIssuesCount_SUM_GT?: InputMaybe<Scalars['Int']['input']>;
  openIssuesCount_SUM_GTE?: InputMaybe<Scalars['Int']['input']>;
  openIssuesCount_SUM_LT?: InputMaybe<Scalars['Int']['input']>;
  openIssuesCount_SUM_LTE?: InputMaybe<Scalars['Int']['input']>;
  owner_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  owner_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  owner_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  owner_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  owner_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  owner_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  owner_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  owner_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  owner_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  owner_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  owner_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  owner_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  owner_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  owner_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  owner_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  pullRequestsCount_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  pullRequestsCount_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  pullRequestsCount_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  pullRequestsCount_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  pullRequestsCount_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  pullRequestsCount_MAX_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  pullRequestsCount_MAX_GT?: InputMaybe<Scalars['Int']['input']>;
  pullRequestsCount_MAX_GTE?: InputMaybe<Scalars['Int']['input']>;
  pullRequestsCount_MAX_LT?: InputMaybe<Scalars['Int']['input']>;
  pullRequestsCount_MAX_LTE?: InputMaybe<Scalars['Int']['input']>;
  pullRequestsCount_MIN_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  pullRequestsCount_MIN_GT?: InputMaybe<Scalars['Int']['input']>;
  pullRequestsCount_MIN_GTE?: InputMaybe<Scalars['Int']['input']>;
  pullRequestsCount_MIN_LT?: InputMaybe<Scalars['Int']['input']>;
  pullRequestsCount_MIN_LTE?: InputMaybe<Scalars['Int']['input']>;
  pullRequestsCount_SUM_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  pullRequestsCount_SUM_GT?: InputMaybe<Scalars['Int']['input']>;
  pullRequestsCount_SUM_GTE?: InputMaybe<Scalars['Int']['input']>;
  pullRequestsCount_SUM_LT?: InputMaybe<Scalars['Int']['input']>;
  pullRequestsCount_SUM_LTE?: InputMaybe<Scalars['Int']['input']>;
  releasesCount_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  releasesCount_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  releasesCount_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  releasesCount_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  releasesCount_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  releasesCount_MAX_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  releasesCount_MAX_GT?: InputMaybe<Scalars['Int']['input']>;
  releasesCount_MAX_GTE?: InputMaybe<Scalars['Int']['input']>;
  releasesCount_MAX_LT?: InputMaybe<Scalars['Int']['input']>;
  releasesCount_MAX_LTE?: InputMaybe<Scalars['Int']['input']>;
  releasesCount_MIN_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  releasesCount_MIN_GT?: InputMaybe<Scalars['Int']['input']>;
  releasesCount_MIN_GTE?: InputMaybe<Scalars['Int']['input']>;
  releasesCount_MIN_LT?: InputMaybe<Scalars['Int']['input']>;
  releasesCount_MIN_LTE?: InputMaybe<Scalars['Int']['input']>;
  releasesCount_SUM_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  releasesCount_SUM_GT?: InputMaybe<Scalars['Int']['input']>;
  releasesCount_SUM_GTE?: InputMaybe<Scalars['Int']['input']>;
  releasesCount_SUM_LT?: InputMaybe<Scalars['Int']['input']>;
  releasesCount_SUM_LTE?: InputMaybe<Scalars['Int']['input']>;
  repoCreatedAt_MAX_EQUAL?: InputMaybe<Scalars['DateTime']['input']>;
  repoCreatedAt_MAX_GT?: InputMaybe<Scalars['DateTime']['input']>;
  repoCreatedAt_MAX_GTE?: InputMaybe<Scalars['DateTime']['input']>;
  repoCreatedAt_MAX_LT?: InputMaybe<Scalars['DateTime']['input']>;
  repoCreatedAt_MAX_LTE?: InputMaybe<Scalars['DateTime']['input']>;
  repoCreatedAt_MIN_EQUAL?: InputMaybe<Scalars['DateTime']['input']>;
  repoCreatedAt_MIN_GT?: InputMaybe<Scalars['DateTime']['input']>;
  repoCreatedAt_MIN_GTE?: InputMaybe<Scalars['DateTime']['input']>;
  repoCreatedAt_MIN_LT?: InputMaybe<Scalars['DateTime']['input']>;
  repoCreatedAt_MIN_LTE?: InputMaybe<Scalars['DateTime']['input']>;
  repoPushedAt_MAX_EQUAL?: InputMaybe<Scalars['DateTime']['input']>;
  repoPushedAt_MAX_GT?: InputMaybe<Scalars['DateTime']['input']>;
  repoPushedAt_MAX_GTE?: InputMaybe<Scalars['DateTime']['input']>;
  repoPushedAt_MAX_LT?: InputMaybe<Scalars['DateTime']['input']>;
  repoPushedAt_MAX_LTE?: InputMaybe<Scalars['DateTime']['input']>;
  repoPushedAt_MIN_EQUAL?: InputMaybe<Scalars['DateTime']['input']>;
  repoPushedAt_MIN_GT?: InputMaybe<Scalars['DateTime']['input']>;
  repoPushedAt_MIN_GTE?: InputMaybe<Scalars['DateTime']['input']>;
  repoPushedAt_MIN_LT?: InputMaybe<Scalars['DateTime']['input']>;
  repoPushedAt_MIN_LTE?: InputMaybe<Scalars['DateTime']['input']>;
  repoUpdatedAt_MAX_EQUAL?: InputMaybe<Scalars['DateTime']['input']>;
  repoUpdatedAt_MAX_GT?: InputMaybe<Scalars['DateTime']['input']>;
  repoUpdatedAt_MAX_GTE?: InputMaybe<Scalars['DateTime']['input']>;
  repoUpdatedAt_MAX_LT?: InputMaybe<Scalars['DateTime']['input']>;
  repoUpdatedAt_MAX_LTE?: InputMaybe<Scalars['DateTime']['input']>;
  repoUpdatedAt_MIN_EQUAL?: InputMaybe<Scalars['DateTime']['input']>;
  repoUpdatedAt_MIN_GT?: InputMaybe<Scalars['DateTime']['input']>;
  repoUpdatedAt_MIN_GTE?: InputMaybe<Scalars['DateTime']['input']>;
  repoUpdatedAt_MIN_LT?: InputMaybe<Scalars['DateTime']['input']>;
  repoUpdatedAt_MIN_LTE?: InputMaybe<Scalars['DateTime']['input']>;
  stars_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  stars_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  stars_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  stars_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  stars_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  stars_MAX_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  stars_MAX_GT?: InputMaybe<Scalars['Int']['input']>;
  stars_MAX_GTE?: InputMaybe<Scalars['Int']['input']>;
  stars_MAX_LT?: InputMaybe<Scalars['Int']['input']>;
  stars_MAX_LTE?: InputMaybe<Scalars['Int']['input']>;
  stars_MIN_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  stars_MIN_GT?: InputMaybe<Scalars['Int']['input']>;
  stars_MIN_GTE?: InputMaybe<Scalars['Int']['input']>;
  stars_MIN_LT?: InputMaybe<Scalars['Int']['input']>;
  stars_MIN_LTE?: InputMaybe<Scalars['Int']['input']>;
  stars_SUM_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  stars_SUM_GT?: InputMaybe<Scalars['Int']['input']>;
  stars_SUM_GTE?: InputMaybe<Scalars['Int']['input']>;
  stars_SUM_LT?: InputMaybe<Scalars['Int']['input']>;
  stars_SUM_LTE?: InputMaybe<Scalars['Int']['input']>;
  url_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  url_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  url_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  url_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  url_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  url_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  url_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  url_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  url_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  url_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  url_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  url_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  url_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  url_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  url_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  watchersCount_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  watchersCount_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  watchersCount_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  watchersCount_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  watchersCount_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  watchersCount_MAX_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  watchersCount_MAX_GT?: InputMaybe<Scalars['Int']['input']>;
  watchersCount_MAX_GTE?: InputMaybe<Scalars['Int']['input']>;
  watchersCount_MAX_LT?: InputMaybe<Scalars['Int']['input']>;
  watchersCount_MAX_LTE?: InputMaybe<Scalars['Int']['input']>;
  watchersCount_MIN_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  watchersCount_MIN_GT?: InputMaybe<Scalars['Int']['input']>;
  watchersCount_MIN_GTE?: InputMaybe<Scalars['Int']['input']>;
  watchersCount_MIN_LT?: InputMaybe<Scalars['Int']['input']>;
  watchersCount_MIN_LTE?: InputMaybe<Scalars['Int']['input']>;
  watchersCount_SUM_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  watchersCount_SUM_GT?: InputMaybe<Scalars['Int']['input']>;
  watchersCount_SUM_GTE?: InputMaybe<Scalars['Int']['input']>;
  watchersCount_SUM_LT?: InputMaybe<Scalars['Int']['input']>;
  watchersCount_SUM_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type AwesomeListReposInAwesomeListRelationship = {
  __typename?: 'AwesomeListReposInAwesomeListRelationship';
  cursor: Scalars['String']['output'];
  node: Repo;
};

export type AwesomeListReposInAwesomeListUpdateConnectionInput = {
  node?: InputMaybe<RepoUpdateInput>;
};

export type AwesomeListReposInAwesomeListUpdateFieldInput = {
  connect?: InputMaybe<Array<AwesomeListReposInAwesomeListConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<AwesomeListReposInAwesomeListConnectOrCreateFieldInput>>;
  create?: InputMaybe<Array<AwesomeListReposInAwesomeListCreateFieldInput>>;
  delete?: InputMaybe<Array<AwesomeListReposInAwesomeListDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<AwesomeListReposInAwesomeListDisconnectFieldInput>>;
  update?: InputMaybe<AwesomeListReposInAwesomeListUpdateConnectionInput>;
  where?: InputMaybe<AwesomeListReposInAwesomeListConnectionWhere>;
};

/** Fields to sort AwesomeLists by. The order in which sorts are applied is not guaranteed when specifying many fields in one AwesomeListSort object. */
export type AwesomeListSort = {
  id?: InputMaybe<SortDirection>;
  lastModified?: InputMaybe<SortDirection>;
  lastRefreshTime?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  url?: InputMaybe<SortDirection>;
};

export type AwesomeListUniqueWhere = {
  url?: InputMaybe<Scalars['String']['input']>;
};

export type AwesomeListUpdateInput = {
  isFromRepo?: InputMaybe<AwesomeListIsFromRepoUpdateFieldInput>;
  lastRefreshTime?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  reposInAwesomeList?: InputMaybe<Array<AwesomeListReposInAwesomeListUpdateFieldInput>>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tags_POP?: InputMaybe<Scalars['Int']['input']>;
  tags_PUSH?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type AwesomeListWhere = {
  AND?: InputMaybe<Array<AwesomeListWhere>>;
  NOT?: InputMaybe<AwesomeListWhere>;
  OR?: InputMaybe<Array<AwesomeListWhere>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  isFromRepo?: InputMaybe<RepoWhere>;
  isFromRepoAggregate?: InputMaybe<AwesomeListIsFromRepoAggregateInput>;
  isFromRepoConnection?: InputMaybe<AwesomeListIsFromRepoConnectionWhere>;
  isFromRepoConnection_NOT?: InputMaybe<AwesomeListIsFromRepoConnectionWhere>;
  isFromRepo_NOT?: InputMaybe<RepoWhere>;
  lastModified?: InputMaybe<Scalars['DateTime']['input']>;
  lastModified_GT?: InputMaybe<Scalars['DateTime']['input']>;
  lastModified_GTE?: InputMaybe<Scalars['DateTime']['input']>;
  lastModified_IN?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lastModified_LT?: InputMaybe<Scalars['DateTime']['input']>;
  lastModified_LTE?: InputMaybe<Scalars['DateTime']['input']>;
  lastRefreshTime?: InputMaybe<Scalars['DateTime']['input']>;
  lastRefreshTime_GT?: InputMaybe<Scalars['DateTime']['input']>;
  lastRefreshTime_GTE?: InputMaybe<Scalars['DateTime']['input']>;
  lastRefreshTime_IN?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lastRefreshTime_LT?: InputMaybe<Scalars['DateTime']['input']>;
  lastRefreshTime_LTE?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  reposInAwesomeListAggregate?: InputMaybe<AwesomeListReposInAwesomeListAggregateInput>;
  /** Return AwesomeLists where all of the related AwesomeListReposInAwesomeListConnections match this filter */
  reposInAwesomeListConnection_ALL?: InputMaybe<AwesomeListReposInAwesomeListConnectionWhere>;
  /** Return AwesomeLists where none of the related AwesomeListReposInAwesomeListConnections match this filter */
  reposInAwesomeListConnection_NONE?: InputMaybe<AwesomeListReposInAwesomeListConnectionWhere>;
  /** Return AwesomeLists where one of the related AwesomeListReposInAwesomeListConnections match this filter */
  reposInAwesomeListConnection_SINGLE?: InputMaybe<AwesomeListReposInAwesomeListConnectionWhere>;
  /** Return AwesomeLists where some of the related AwesomeListReposInAwesomeListConnections match this filter */
  reposInAwesomeListConnection_SOME?: InputMaybe<AwesomeListReposInAwesomeListConnectionWhere>;
  /** Return AwesomeLists where all of the related Repos match this filter */
  reposInAwesomeList_ALL?: InputMaybe<RepoWhere>;
  /** Return AwesomeLists where none of the related Repos match this filter */
  reposInAwesomeList_NONE?: InputMaybe<RepoWhere>;
  /** Return AwesomeLists where one of the related Repos match this filter */
  reposInAwesomeList_SINGLE?: InputMaybe<RepoWhere>;
  /** Return AwesomeLists where some of the related Repos match this filter */
  reposInAwesomeList_SOME?: InputMaybe<RepoWhere>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tags_INCLUDES?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  url_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  url_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  url_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  url_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
};

export type AwesomeListsConnection = {
  __typename?: 'AwesomeListsConnection';
  edges: Array<AwesomeListEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CreateAwesomeListsMutationResponse = {
  __typename?: 'CreateAwesomeListsMutationResponse';
  awesomeLists: Array<AwesomeList>;
  info: CreateInfo;
};

/** Information about the number of nodes and relationships created during a create mutation */
export type CreateInfo = {
  __typename?: 'CreateInfo';
  /** @deprecated This field has been deprecated because bookmarks are now handled by the driver. */
  bookmark?: Maybe<Scalars['String']['output']>;
  nodesCreated: Scalars['Int']['output'];
  relationshipsCreated: Scalars['Int']['output'];
};

export type CreateReposMutationResponse = {
  __typename?: 'CreateReposMutationResponse';
  info: CreateInfo;
  repos: Array<Repo>;
};

export type DateTimeAggregateSelection = {
  __typename?: 'DateTimeAggregateSelection';
  max?: Maybe<Scalars['DateTime']['output']>;
  min?: Maybe<Scalars['DateTime']['output']>;
};

/** Information about the number of nodes and relationships deleted during a delete mutation */
export type DeleteInfo = {
  __typename?: 'DeleteInfo';
  /** @deprecated This field has been deprecated because bookmarks are now handled by the driver. */
  bookmark?: Maybe<Scalars['String']['output']>;
  nodesDeleted: Scalars['Int']['output'];
  relationshipsDeleted: Scalars['Int']['output'];
};

export type IdAggregateSelection = {
  __typename?: 'IDAggregateSelection';
  longest?: Maybe<Scalars['ID']['output']>;
  shortest?: Maybe<Scalars['ID']['output']>;
};

export type IntAggregateSelection = {
  __typename?: 'IntAggregateSelection';
  average?: Maybe<Scalars['Float']['output']>;
  max?: Maybe<Scalars['Int']['output']>;
  min?: Maybe<Scalars['Int']['output']>;
  sum?: Maybe<Scalars['Int']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAwesomeLists: CreateAwesomeListsMutationResponse;
  createRepos: CreateReposMutationResponse;
  deleteAwesomeLists: DeleteInfo;
  deleteRepos: DeleteInfo;
  updateAwesomeLists: UpdateAwesomeListsMutationResponse;
  updateRepos: UpdateReposMutationResponse;
};


export type MutationCreateAwesomeListsArgs = {
  input: Array<AwesomeListCreateInput>;
};


export type MutationCreateReposArgs = {
  input: Array<RepoCreateInput>;
};


export type MutationDeleteAwesomeListsArgs = {
  delete?: InputMaybe<AwesomeListDeleteInput>;
  where?: InputMaybe<AwesomeListWhere>;
};


export type MutationDeleteReposArgs = {
  delete?: InputMaybe<RepoDeleteInput>;
  where?: InputMaybe<RepoWhere>;
};


export type MutationUpdateAwesomeListsArgs = {
  connect?: InputMaybe<AwesomeListConnectInput>;
  connectOrCreate?: InputMaybe<AwesomeListConnectOrCreateInput>;
  create?: InputMaybe<AwesomeListRelationInput>;
  delete?: InputMaybe<AwesomeListDeleteInput>;
  disconnect?: InputMaybe<AwesomeListDisconnectInput>;
  update?: InputMaybe<AwesomeListUpdateInput>;
  where?: InputMaybe<AwesomeListWhere>;
};


export type MutationUpdateReposArgs = {
  connect?: InputMaybe<RepoConnectInput>;
  connectOrCreate?: InputMaybe<RepoConnectOrCreateInput>;
  create?: InputMaybe<RepoRelationInput>;
  delete?: InputMaybe<RepoDeleteInput>;
  disconnect?: InputMaybe<RepoDisconnectInput>;
  update?: InputMaybe<RepoUpdateInput>;
  where?: InputMaybe<RepoWhere>;
};

/** Pagination information (Relay) */
export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  awesomeLists: Array<AwesomeList>;
  awesomeListsAggregate: AwesomeListAggregateSelection;
  awesomeListsConnection: AwesomeListsConnection;
  repos: Array<Repo>;
  reposAggregate: RepoAggregateSelection;
  reposConnection: ReposConnection;
};


export type QueryAwesomeListsArgs = {
  options?: InputMaybe<AwesomeListOptions>;
  where?: InputMaybe<AwesomeListWhere>;
};


export type QueryAwesomeListsAggregateArgs = {
  where?: InputMaybe<AwesomeListWhere>;
};


export type QueryAwesomeListsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<AwesomeListSort>>>;
  where?: InputMaybe<AwesomeListWhere>;
};


export type QueryReposArgs = {
  options?: InputMaybe<RepoOptions>;
  where?: InputMaybe<RepoWhere>;
};


export type QueryReposAggregateArgs = {
  where?: InputMaybe<RepoWhere>;
};


export type QueryReposConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<RepoSort>>>;
  where?: InputMaybe<RepoWhere>;
};

export type Repo = {
  __typename?: 'Repo';
  awesomeListsIsFrom?: Maybe<AwesomeList>;
  awesomeListsIsFromAggregate?: Maybe<RepoAwesomeListAwesomeListsIsFromAggregationSelection>;
  awesomeListsIsFromConnection: RepoAwesomeListsIsFromConnection;
  closeIssuesCount: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  diskUsage?: Maybe<Scalars['Int']['output']>;
  forkCount: Scalars['Int']['output'];
  hasSponsorshipsEnabled: Scalars['Boolean']['output'];
  homepageUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  inAwesomeListAwesomeLists: Array<AwesomeList>;
  inAwesomeListAwesomeListsAggregate?: Maybe<RepoAwesomeListInAwesomeListAwesomeListsAggregationSelection>;
  inAwesomeListAwesomeListsConnection: RepoInAwesomeListAwesomeListsConnection;
  lastModified: Scalars['DateTime']['output'];
  license?: Maybe<Scalars['String']['output']>;
  licenseInfo?: Maybe<Scalars['String']['output']>;
  missing: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  openIssuesCount: Scalars['Int']['output'];
  owner: Scalars['String']['output'];
  pullRequestsCount: Scalars['Int']['output'];
  releasesCount: Scalars['Int']['output'];
  repoCreatedAt: Scalars['DateTime']['output'];
  repoPushedAt: Scalars['DateTime']['output'];
  repoUpdatedAt: Scalars['DateTime']['output'];
  stars: Scalars['Int']['output'];
  url: Scalars['String']['output'];
  watchersCount: Scalars['Int']['output'];
};


export type RepoAwesomeListsIsFromArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<AwesomeListOptions>;
  where?: InputMaybe<AwesomeListWhere>;
};


export type RepoAwesomeListsIsFromAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<AwesomeListWhere>;
};


export type RepoAwesomeListsIsFromConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<RepoAwesomeListsIsFromConnectionSort>>;
  where?: InputMaybe<RepoAwesomeListsIsFromConnectionWhere>;
};


export type RepoInAwesomeListAwesomeListsArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<AwesomeListOptions>;
  where?: InputMaybe<AwesomeListWhere>;
};


export type RepoInAwesomeListAwesomeListsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<AwesomeListWhere>;
};


export type RepoInAwesomeListAwesomeListsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<RepoInAwesomeListAwesomeListsConnectionSort>>;
  where?: InputMaybe<RepoInAwesomeListAwesomeListsConnectionWhere>;
};

export type RepoAggregateSelection = {
  __typename?: 'RepoAggregateSelection';
  closeIssuesCount: IntAggregateSelection;
  count: Scalars['Int']['output'];
  description: StringAggregateSelection;
  diskUsage: IntAggregateSelection;
  forkCount: IntAggregateSelection;
  homepageUrl: StringAggregateSelection;
  id: IdAggregateSelection;
  lastModified: DateTimeAggregateSelection;
  license: StringAggregateSelection;
  licenseInfo: StringAggregateSelection;
  name: StringAggregateSelection;
  openIssuesCount: IntAggregateSelection;
  owner: StringAggregateSelection;
  pullRequestsCount: IntAggregateSelection;
  releasesCount: IntAggregateSelection;
  repoCreatedAt: DateTimeAggregateSelection;
  repoPushedAt: DateTimeAggregateSelection;
  repoUpdatedAt: DateTimeAggregateSelection;
  stars: IntAggregateSelection;
  url: StringAggregateSelection;
  watchersCount: IntAggregateSelection;
};

export type RepoAwesomeListAwesomeListsIsFromAggregationSelection = {
  __typename?: 'RepoAwesomeListAwesomeListsIsFromAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<RepoAwesomeListAwesomeListsIsFromNodeAggregateSelection>;
};

export type RepoAwesomeListAwesomeListsIsFromNodeAggregateSelection = {
  __typename?: 'RepoAwesomeListAwesomeListsIsFromNodeAggregateSelection';
  id: IdAggregateSelection;
  lastModified: DateTimeAggregateSelection;
  lastRefreshTime: DateTimeAggregateSelection;
  name: StringAggregateSelection;
  url: StringAggregateSelection;
};

export type RepoAwesomeListInAwesomeListAwesomeListsAggregationSelection = {
  __typename?: 'RepoAwesomeListInAwesomeListAwesomeListsAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<RepoAwesomeListInAwesomeListAwesomeListsNodeAggregateSelection>;
};

export type RepoAwesomeListInAwesomeListAwesomeListsNodeAggregateSelection = {
  __typename?: 'RepoAwesomeListInAwesomeListAwesomeListsNodeAggregateSelection';
  id: IdAggregateSelection;
  lastModified: DateTimeAggregateSelection;
  lastRefreshTime: DateTimeAggregateSelection;
  name: StringAggregateSelection;
  url: StringAggregateSelection;
};

export type RepoAwesomeListsIsFromAggregateInput = {
  AND?: InputMaybe<Array<RepoAwesomeListsIsFromAggregateInput>>;
  NOT?: InputMaybe<RepoAwesomeListsIsFromAggregateInput>;
  OR?: InputMaybe<Array<RepoAwesomeListsIsFromAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<RepoAwesomeListsIsFromNodeAggregationWhereInput>;
};

export type RepoAwesomeListsIsFromConnectFieldInput = {
  connect?: InputMaybe<AwesomeListConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<AwesomeListConnectWhere>;
};

export type RepoAwesomeListsIsFromConnectOrCreateFieldInput = {
  onCreate: RepoAwesomeListsIsFromConnectOrCreateFieldInputOnCreate;
  where: AwesomeListConnectOrCreateWhere;
};

export type RepoAwesomeListsIsFromConnectOrCreateFieldInputOnCreate = {
  node: AwesomeListOnCreateInput;
};

export type RepoAwesomeListsIsFromConnection = {
  __typename?: 'RepoAwesomeListsIsFromConnection';
  edges: Array<RepoAwesomeListsIsFromRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type RepoAwesomeListsIsFromConnectionSort = {
  node?: InputMaybe<AwesomeListSort>;
};

export type RepoAwesomeListsIsFromConnectionWhere = {
  AND?: InputMaybe<Array<RepoAwesomeListsIsFromConnectionWhere>>;
  NOT?: InputMaybe<RepoAwesomeListsIsFromConnectionWhere>;
  OR?: InputMaybe<Array<RepoAwesomeListsIsFromConnectionWhere>>;
  node?: InputMaybe<AwesomeListWhere>;
};

export type RepoAwesomeListsIsFromCreateFieldInput = {
  node: AwesomeListCreateInput;
};

export type RepoAwesomeListsIsFromDeleteFieldInput = {
  delete?: InputMaybe<AwesomeListDeleteInput>;
  where?: InputMaybe<RepoAwesomeListsIsFromConnectionWhere>;
};

export type RepoAwesomeListsIsFromDisconnectFieldInput = {
  disconnect?: InputMaybe<AwesomeListDisconnectInput>;
  where?: InputMaybe<RepoAwesomeListsIsFromConnectionWhere>;
};

export type RepoAwesomeListsIsFromFieldInput = {
  connect?: InputMaybe<RepoAwesomeListsIsFromConnectFieldInput>;
  connectOrCreate?: InputMaybe<RepoAwesomeListsIsFromConnectOrCreateFieldInput>;
  create?: InputMaybe<RepoAwesomeListsIsFromCreateFieldInput>;
};

export type RepoAwesomeListsIsFromNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<RepoAwesomeListsIsFromNodeAggregationWhereInput>>;
  NOT?: InputMaybe<RepoAwesomeListsIsFromNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<RepoAwesomeListsIsFromNodeAggregationWhereInput>>;
  lastModified_MAX_EQUAL?: InputMaybe<Scalars['DateTime']['input']>;
  lastModified_MAX_GT?: InputMaybe<Scalars['DateTime']['input']>;
  lastModified_MAX_GTE?: InputMaybe<Scalars['DateTime']['input']>;
  lastModified_MAX_LT?: InputMaybe<Scalars['DateTime']['input']>;
  lastModified_MAX_LTE?: InputMaybe<Scalars['DateTime']['input']>;
  lastModified_MIN_EQUAL?: InputMaybe<Scalars['DateTime']['input']>;
  lastModified_MIN_GT?: InputMaybe<Scalars['DateTime']['input']>;
  lastModified_MIN_GTE?: InputMaybe<Scalars['DateTime']['input']>;
  lastModified_MIN_LT?: InputMaybe<Scalars['DateTime']['input']>;
  lastModified_MIN_LTE?: InputMaybe<Scalars['DateTime']['input']>;
  lastRefreshTime_MAX_EQUAL?: InputMaybe<Scalars['DateTime']['input']>;
  lastRefreshTime_MAX_GT?: InputMaybe<Scalars['DateTime']['input']>;
  lastRefreshTime_MAX_GTE?: InputMaybe<Scalars['DateTime']['input']>;
  lastRefreshTime_MAX_LT?: InputMaybe<Scalars['DateTime']['input']>;
  lastRefreshTime_MAX_LTE?: InputMaybe<Scalars['DateTime']['input']>;
  lastRefreshTime_MIN_EQUAL?: InputMaybe<Scalars['DateTime']['input']>;
  lastRefreshTime_MIN_GT?: InputMaybe<Scalars['DateTime']['input']>;
  lastRefreshTime_MIN_GTE?: InputMaybe<Scalars['DateTime']['input']>;
  lastRefreshTime_MIN_LT?: InputMaybe<Scalars['DateTime']['input']>;
  lastRefreshTime_MIN_LTE?: InputMaybe<Scalars['DateTime']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  url_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  url_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  url_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  url_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  url_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  url_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  url_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  url_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  url_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  url_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  url_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  url_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  url_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  url_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  url_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type RepoAwesomeListsIsFromRelationship = {
  __typename?: 'RepoAwesomeListsIsFromRelationship';
  cursor: Scalars['String']['output'];
  node: AwesomeList;
};

export type RepoAwesomeListsIsFromUpdateConnectionInput = {
  node?: InputMaybe<AwesomeListUpdateInput>;
};

export type RepoAwesomeListsIsFromUpdateFieldInput = {
  connect?: InputMaybe<RepoAwesomeListsIsFromConnectFieldInput>;
  connectOrCreate?: InputMaybe<RepoAwesomeListsIsFromConnectOrCreateFieldInput>;
  create?: InputMaybe<RepoAwesomeListsIsFromCreateFieldInput>;
  delete?: InputMaybe<RepoAwesomeListsIsFromDeleteFieldInput>;
  disconnect?: InputMaybe<RepoAwesomeListsIsFromDisconnectFieldInput>;
  update?: InputMaybe<RepoAwesomeListsIsFromUpdateConnectionInput>;
  where?: InputMaybe<RepoAwesomeListsIsFromConnectionWhere>;
};

export type RepoConnectInput = {
  awesomeListsIsFrom?: InputMaybe<RepoAwesomeListsIsFromConnectFieldInput>;
  inAwesomeListAwesomeLists?: InputMaybe<Array<RepoInAwesomeListAwesomeListsConnectFieldInput>>;
};

export type RepoConnectOrCreateInput = {
  awesomeListsIsFrom?: InputMaybe<RepoAwesomeListsIsFromConnectOrCreateFieldInput>;
  inAwesomeListAwesomeLists?: InputMaybe<Array<RepoInAwesomeListAwesomeListsConnectOrCreateFieldInput>>;
};

export type RepoConnectOrCreateWhere = {
  node: RepoUniqueWhere;
};

export type RepoConnectWhere = {
  node: RepoWhere;
};

export type RepoCreateInput = {
  awesomeListsIsFrom?: InputMaybe<RepoAwesomeListsIsFromFieldInput>;
  closeIssuesCount: Scalars['Int']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  diskUsage?: InputMaybe<Scalars['Int']['input']>;
  forkCount: Scalars['Int']['input'];
  hasSponsorshipsEnabled: Scalars['Boolean']['input'];
  homepageUrl?: InputMaybe<Scalars['String']['input']>;
  inAwesomeListAwesomeLists?: InputMaybe<RepoInAwesomeListAwesomeListsFieldInput>;
  license?: InputMaybe<Scalars['String']['input']>;
  licenseInfo?: InputMaybe<Scalars['String']['input']>;
  missing: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  openIssuesCount: Scalars['Int']['input'];
  owner: Scalars['String']['input'];
  pullRequestsCount: Scalars['Int']['input'];
  releasesCount: Scalars['Int']['input'];
  repoCreatedAt: Scalars['DateTime']['input'];
  repoPushedAt: Scalars['DateTime']['input'];
  repoUpdatedAt: Scalars['DateTime']['input'];
  stars: Scalars['Int']['input'];
  url: Scalars['String']['input'];
  watchersCount: Scalars['Int']['input'];
};

export type RepoDeleteInput = {
  awesomeListsIsFrom?: InputMaybe<RepoAwesomeListsIsFromDeleteFieldInput>;
  inAwesomeListAwesomeLists?: InputMaybe<Array<RepoInAwesomeListAwesomeListsDeleteFieldInput>>;
};

export type RepoDisconnectInput = {
  awesomeListsIsFrom?: InputMaybe<RepoAwesomeListsIsFromDisconnectFieldInput>;
  inAwesomeListAwesomeLists?: InputMaybe<Array<RepoInAwesomeListAwesomeListsDisconnectFieldInput>>;
};

export type RepoEdge = {
  __typename?: 'RepoEdge';
  cursor: Scalars['String']['output'];
  node: Repo;
};

export type RepoInAwesomeListAwesomeListsAggregateInput = {
  AND?: InputMaybe<Array<RepoInAwesomeListAwesomeListsAggregateInput>>;
  NOT?: InputMaybe<RepoInAwesomeListAwesomeListsAggregateInput>;
  OR?: InputMaybe<Array<RepoInAwesomeListAwesomeListsAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<RepoInAwesomeListAwesomeListsNodeAggregationWhereInput>;
};

export type RepoInAwesomeListAwesomeListsConnectFieldInput = {
  connect?: InputMaybe<Array<AwesomeListConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<AwesomeListConnectWhere>;
};

export type RepoInAwesomeListAwesomeListsConnectOrCreateFieldInput = {
  onCreate: RepoInAwesomeListAwesomeListsConnectOrCreateFieldInputOnCreate;
  where: AwesomeListConnectOrCreateWhere;
};

export type RepoInAwesomeListAwesomeListsConnectOrCreateFieldInputOnCreate = {
  node: AwesomeListOnCreateInput;
};

export type RepoInAwesomeListAwesomeListsConnection = {
  __typename?: 'RepoInAwesomeListAwesomeListsConnection';
  edges: Array<RepoInAwesomeListAwesomeListsRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type RepoInAwesomeListAwesomeListsConnectionSort = {
  node?: InputMaybe<AwesomeListSort>;
};

export type RepoInAwesomeListAwesomeListsConnectionWhere = {
  AND?: InputMaybe<Array<RepoInAwesomeListAwesomeListsConnectionWhere>>;
  NOT?: InputMaybe<RepoInAwesomeListAwesomeListsConnectionWhere>;
  OR?: InputMaybe<Array<RepoInAwesomeListAwesomeListsConnectionWhere>>;
  node?: InputMaybe<AwesomeListWhere>;
};

export type RepoInAwesomeListAwesomeListsCreateFieldInput = {
  node: AwesomeListCreateInput;
};

export type RepoInAwesomeListAwesomeListsDeleteFieldInput = {
  delete?: InputMaybe<AwesomeListDeleteInput>;
  where?: InputMaybe<RepoInAwesomeListAwesomeListsConnectionWhere>;
};

export type RepoInAwesomeListAwesomeListsDisconnectFieldInput = {
  disconnect?: InputMaybe<AwesomeListDisconnectInput>;
  where?: InputMaybe<RepoInAwesomeListAwesomeListsConnectionWhere>;
};

export type RepoInAwesomeListAwesomeListsFieldInput = {
  connect?: InputMaybe<Array<RepoInAwesomeListAwesomeListsConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<RepoInAwesomeListAwesomeListsConnectOrCreateFieldInput>>;
  create?: InputMaybe<Array<RepoInAwesomeListAwesomeListsCreateFieldInput>>;
};

export type RepoInAwesomeListAwesomeListsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<RepoInAwesomeListAwesomeListsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<RepoInAwesomeListAwesomeListsNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<RepoInAwesomeListAwesomeListsNodeAggregationWhereInput>>;
  lastModified_MAX_EQUAL?: InputMaybe<Scalars['DateTime']['input']>;
  lastModified_MAX_GT?: InputMaybe<Scalars['DateTime']['input']>;
  lastModified_MAX_GTE?: InputMaybe<Scalars['DateTime']['input']>;
  lastModified_MAX_LT?: InputMaybe<Scalars['DateTime']['input']>;
  lastModified_MAX_LTE?: InputMaybe<Scalars['DateTime']['input']>;
  lastModified_MIN_EQUAL?: InputMaybe<Scalars['DateTime']['input']>;
  lastModified_MIN_GT?: InputMaybe<Scalars['DateTime']['input']>;
  lastModified_MIN_GTE?: InputMaybe<Scalars['DateTime']['input']>;
  lastModified_MIN_LT?: InputMaybe<Scalars['DateTime']['input']>;
  lastModified_MIN_LTE?: InputMaybe<Scalars['DateTime']['input']>;
  lastRefreshTime_MAX_EQUAL?: InputMaybe<Scalars['DateTime']['input']>;
  lastRefreshTime_MAX_GT?: InputMaybe<Scalars['DateTime']['input']>;
  lastRefreshTime_MAX_GTE?: InputMaybe<Scalars['DateTime']['input']>;
  lastRefreshTime_MAX_LT?: InputMaybe<Scalars['DateTime']['input']>;
  lastRefreshTime_MAX_LTE?: InputMaybe<Scalars['DateTime']['input']>;
  lastRefreshTime_MIN_EQUAL?: InputMaybe<Scalars['DateTime']['input']>;
  lastRefreshTime_MIN_GT?: InputMaybe<Scalars['DateTime']['input']>;
  lastRefreshTime_MIN_GTE?: InputMaybe<Scalars['DateTime']['input']>;
  lastRefreshTime_MIN_LT?: InputMaybe<Scalars['DateTime']['input']>;
  lastRefreshTime_MIN_LTE?: InputMaybe<Scalars['DateTime']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  url_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  url_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  url_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  url_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  url_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  url_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  url_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  url_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  url_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  url_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  url_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  url_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  url_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  url_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  url_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type RepoInAwesomeListAwesomeListsRelationship = {
  __typename?: 'RepoInAwesomeListAwesomeListsRelationship';
  cursor: Scalars['String']['output'];
  node: AwesomeList;
};

export type RepoInAwesomeListAwesomeListsUpdateConnectionInput = {
  node?: InputMaybe<AwesomeListUpdateInput>;
};

export type RepoInAwesomeListAwesomeListsUpdateFieldInput = {
  connect?: InputMaybe<Array<RepoInAwesomeListAwesomeListsConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<RepoInAwesomeListAwesomeListsConnectOrCreateFieldInput>>;
  create?: InputMaybe<Array<RepoInAwesomeListAwesomeListsCreateFieldInput>>;
  delete?: InputMaybe<Array<RepoInAwesomeListAwesomeListsDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<RepoInAwesomeListAwesomeListsDisconnectFieldInput>>;
  update?: InputMaybe<RepoInAwesomeListAwesomeListsUpdateConnectionInput>;
  where?: InputMaybe<RepoInAwesomeListAwesomeListsConnectionWhere>;
};

export type RepoOnCreateInput = {
  closeIssuesCount: Scalars['Int']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  diskUsage?: InputMaybe<Scalars['Int']['input']>;
  forkCount: Scalars['Int']['input'];
  hasSponsorshipsEnabled: Scalars['Boolean']['input'];
  homepageUrl?: InputMaybe<Scalars['String']['input']>;
  license?: InputMaybe<Scalars['String']['input']>;
  licenseInfo?: InputMaybe<Scalars['String']['input']>;
  missing: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  openIssuesCount: Scalars['Int']['input'];
  owner: Scalars['String']['input'];
  pullRequestsCount: Scalars['Int']['input'];
  releasesCount: Scalars['Int']['input'];
  repoCreatedAt: Scalars['DateTime']['input'];
  repoPushedAt: Scalars['DateTime']['input'];
  repoUpdatedAt: Scalars['DateTime']['input'];
  stars: Scalars['Int']['input'];
  url: Scalars['String']['input'];
  watchersCount: Scalars['Int']['input'];
};

export type RepoOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more RepoSort objects to sort Repos by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<RepoSort>>;
};

export type RepoRelationInput = {
  awesomeListsIsFrom?: InputMaybe<RepoAwesomeListsIsFromCreateFieldInput>;
  inAwesomeListAwesomeLists?: InputMaybe<Array<RepoInAwesomeListAwesomeListsCreateFieldInput>>;
};

/** Fields to sort Repos by. The order in which sorts are applied is not guaranteed when specifying many fields in one RepoSort object. */
export type RepoSort = {
  closeIssuesCount?: InputMaybe<SortDirection>;
  description?: InputMaybe<SortDirection>;
  diskUsage?: InputMaybe<SortDirection>;
  forkCount?: InputMaybe<SortDirection>;
  hasSponsorshipsEnabled?: InputMaybe<SortDirection>;
  homepageUrl?: InputMaybe<SortDirection>;
  id?: InputMaybe<SortDirection>;
  lastModified?: InputMaybe<SortDirection>;
  license?: InputMaybe<SortDirection>;
  licenseInfo?: InputMaybe<SortDirection>;
  missing?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  openIssuesCount?: InputMaybe<SortDirection>;
  owner?: InputMaybe<SortDirection>;
  pullRequestsCount?: InputMaybe<SortDirection>;
  releasesCount?: InputMaybe<SortDirection>;
  repoCreatedAt?: InputMaybe<SortDirection>;
  repoPushedAt?: InputMaybe<SortDirection>;
  repoUpdatedAt?: InputMaybe<SortDirection>;
  stars?: InputMaybe<SortDirection>;
  url?: InputMaybe<SortDirection>;
  watchersCount?: InputMaybe<SortDirection>;
};

export type RepoUniqueWhere = {
  url?: InputMaybe<Scalars['String']['input']>;
};

export type RepoUpdateInput = {
  awesomeListsIsFrom?: InputMaybe<RepoAwesomeListsIsFromUpdateFieldInput>;
  closeIssuesCount?: InputMaybe<Scalars['Int']['input']>;
  closeIssuesCount_DECREMENT?: InputMaybe<Scalars['Int']['input']>;
  closeIssuesCount_INCREMENT?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  diskUsage?: InputMaybe<Scalars['Int']['input']>;
  diskUsage_DECREMENT?: InputMaybe<Scalars['Int']['input']>;
  diskUsage_INCREMENT?: InputMaybe<Scalars['Int']['input']>;
  forkCount?: InputMaybe<Scalars['Int']['input']>;
  forkCount_DECREMENT?: InputMaybe<Scalars['Int']['input']>;
  forkCount_INCREMENT?: InputMaybe<Scalars['Int']['input']>;
  hasSponsorshipsEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  homepageUrl?: InputMaybe<Scalars['String']['input']>;
  inAwesomeListAwesomeLists?: InputMaybe<Array<RepoInAwesomeListAwesomeListsUpdateFieldInput>>;
  license?: InputMaybe<Scalars['String']['input']>;
  licenseInfo?: InputMaybe<Scalars['String']['input']>;
  missing?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  openIssuesCount?: InputMaybe<Scalars['Int']['input']>;
  openIssuesCount_DECREMENT?: InputMaybe<Scalars['Int']['input']>;
  openIssuesCount_INCREMENT?: InputMaybe<Scalars['Int']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  pullRequestsCount?: InputMaybe<Scalars['Int']['input']>;
  pullRequestsCount_DECREMENT?: InputMaybe<Scalars['Int']['input']>;
  pullRequestsCount_INCREMENT?: InputMaybe<Scalars['Int']['input']>;
  releasesCount?: InputMaybe<Scalars['Int']['input']>;
  releasesCount_DECREMENT?: InputMaybe<Scalars['Int']['input']>;
  releasesCount_INCREMENT?: InputMaybe<Scalars['Int']['input']>;
  repoCreatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  repoPushedAt?: InputMaybe<Scalars['DateTime']['input']>;
  repoUpdatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  stars?: InputMaybe<Scalars['Int']['input']>;
  stars_DECREMENT?: InputMaybe<Scalars['Int']['input']>;
  stars_INCREMENT?: InputMaybe<Scalars['Int']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  watchersCount?: InputMaybe<Scalars['Int']['input']>;
  watchersCount_DECREMENT?: InputMaybe<Scalars['Int']['input']>;
  watchersCount_INCREMENT?: InputMaybe<Scalars['Int']['input']>;
};

export type RepoWhere = {
  AND?: InputMaybe<Array<RepoWhere>>;
  NOT?: InputMaybe<RepoWhere>;
  OR?: InputMaybe<Array<RepoWhere>>;
  awesomeListsIsFrom?: InputMaybe<AwesomeListWhere>;
  awesomeListsIsFromAggregate?: InputMaybe<RepoAwesomeListsIsFromAggregateInput>;
  awesomeListsIsFromConnection?: InputMaybe<RepoAwesomeListsIsFromConnectionWhere>;
  awesomeListsIsFromConnection_NOT?: InputMaybe<RepoAwesomeListsIsFromConnectionWhere>;
  awesomeListsIsFrom_NOT?: InputMaybe<AwesomeListWhere>;
  closeIssuesCount?: InputMaybe<Scalars['Int']['input']>;
  closeIssuesCount_GT?: InputMaybe<Scalars['Int']['input']>;
  closeIssuesCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  closeIssuesCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  closeIssuesCount_LT?: InputMaybe<Scalars['Int']['input']>;
  closeIssuesCount_LTE?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  description_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  description_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  diskUsage?: InputMaybe<Scalars['Int']['input']>;
  diskUsage_GT?: InputMaybe<Scalars['Int']['input']>;
  diskUsage_GTE?: InputMaybe<Scalars['Int']['input']>;
  diskUsage_IN?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  diskUsage_LT?: InputMaybe<Scalars['Int']['input']>;
  diskUsage_LTE?: InputMaybe<Scalars['Int']['input']>;
  forkCount?: InputMaybe<Scalars['Int']['input']>;
  forkCount_GT?: InputMaybe<Scalars['Int']['input']>;
  forkCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  forkCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  forkCount_LT?: InputMaybe<Scalars['Int']['input']>;
  forkCount_LTE?: InputMaybe<Scalars['Int']['input']>;
  hasSponsorshipsEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  homepageUrl?: InputMaybe<Scalars['String']['input']>;
  homepageUrl_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  homepageUrl_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  homepageUrl_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  homepageUrl_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  inAwesomeListAwesomeListsAggregate?: InputMaybe<RepoInAwesomeListAwesomeListsAggregateInput>;
  /** Return Repos where all of the related RepoInAwesomeListAwesomeListsConnections match this filter */
  inAwesomeListAwesomeListsConnection_ALL?: InputMaybe<RepoInAwesomeListAwesomeListsConnectionWhere>;
  /** Return Repos where none of the related RepoInAwesomeListAwesomeListsConnections match this filter */
  inAwesomeListAwesomeListsConnection_NONE?: InputMaybe<RepoInAwesomeListAwesomeListsConnectionWhere>;
  /** Return Repos where one of the related RepoInAwesomeListAwesomeListsConnections match this filter */
  inAwesomeListAwesomeListsConnection_SINGLE?: InputMaybe<RepoInAwesomeListAwesomeListsConnectionWhere>;
  /** Return Repos where some of the related RepoInAwesomeListAwesomeListsConnections match this filter */
  inAwesomeListAwesomeListsConnection_SOME?: InputMaybe<RepoInAwesomeListAwesomeListsConnectionWhere>;
  /** Return Repos where all of the related AwesomeLists match this filter */
  inAwesomeListAwesomeLists_ALL?: InputMaybe<AwesomeListWhere>;
  /** Return Repos where none of the related AwesomeLists match this filter */
  inAwesomeListAwesomeLists_NONE?: InputMaybe<AwesomeListWhere>;
  /** Return Repos where one of the related AwesomeLists match this filter */
  inAwesomeListAwesomeLists_SINGLE?: InputMaybe<AwesomeListWhere>;
  /** Return Repos where some of the related AwesomeLists match this filter */
  inAwesomeListAwesomeLists_SOME?: InputMaybe<AwesomeListWhere>;
  lastModified?: InputMaybe<Scalars['DateTime']['input']>;
  lastModified_GT?: InputMaybe<Scalars['DateTime']['input']>;
  lastModified_GTE?: InputMaybe<Scalars['DateTime']['input']>;
  lastModified_IN?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lastModified_LT?: InputMaybe<Scalars['DateTime']['input']>;
  lastModified_LTE?: InputMaybe<Scalars['DateTime']['input']>;
  license?: InputMaybe<Scalars['String']['input']>;
  licenseInfo?: InputMaybe<Scalars['String']['input']>;
  licenseInfo_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  licenseInfo_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  licenseInfo_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  licenseInfo_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  license_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  license_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  license_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  license_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  missing?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  openIssuesCount?: InputMaybe<Scalars['Int']['input']>;
  openIssuesCount_GT?: InputMaybe<Scalars['Int']['input']>;
  openIssuesCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  openIssuesCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  openIssuesCount_LT?: InputMaybe<Scalars['Int']['input']>;
  openIssuesCount_LTE?: InputMaybe<Scalars['Int']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  owner_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  owner_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  owner_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  owner_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  pullRequestsCount?: InputMaybe<Scalars['Int']['input']>;
  pullRequestsCount_GT?: InputMaybe<Scalars['Int']['input']>;
  pullRequestsCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  pullRequestsCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  pullRequestsCount_LT?: InputMaybe<Scalars['Int']['input']>;
  pullRequestsCount_LTE?: InputMaybe<Scalars['Int']['input']>;
  releasesCount?: InputMaybe<Scalars['Int']['input']>;
  releasesCount_GT?: InputMaybe<Scalars['Int']['input']>;
  releasesCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  releasesCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  releasesCount_LT?: InputMaybe<Scalars['Int']['input']>;
  releasesCount_LTE?: InputMaybe<Scalars['Int']['input']>;
  repoCreatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  repoCreatedAt_GT?: InputMaybe<Scalars['DateTime']['input']>;
  repoCreatedAt_GTE?: InputMaybe<Scalars['DateTime']['input']>;
  repoCreatedAt_IN?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  repoCreatedAt_LT?: InputMaybe<Scalars['DateTime']['input']>;
  repoCreatedAt_LTE?: InputMaybe<Scalars['DateTime']['input']>;
  repoPushedAt?: InputMaybe<Scalars['DateTime']['input']>;
  repoPushedAt_GT?: InputMaybe<Scalars['DateTime']['input']>;
  repoPushedAt_GTE?: InputMaybe<Scalars['DateTime']['input']>;
  repoPushedAt_IN?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  repoPushedAt_LT?: InputMaybe<Scalars['DateTime']['input']>;
  repoPushedAt_LTE?: InputMaybe<Scalars['DateTime']['input']>;
  repoUpdatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  repoUpdatedAt_GT?: InputMaybe<Scalars['DateTime']['input']>;
  repoUpdatedAt_GTE?: InputMaybe<Scalars['DateTime']['input']>;
  repoUpdatedAt_IN?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  repoUpdatedAt_LT?: InputMaybe<Scalars['DateTime']['input']>;
  repoUpdatedAt_LTE?: InputMaybe<Scalars['DateTime']['input']>;
  stars?: InputMaybe<Scalars['Int']['input']>;
  stars_GT?: InputMaybe<Scalars['Int']['input']>;
  stars_GTE?: InputMaybe<Scalars['Int']['input']>;
  stars_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  stars_LT?: InputMaybe<Scalars['Int']['input']>;
  stars_LTE?: InputMaybe<Scalars['Int']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  url_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  url_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  url_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  url_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  watchersCount?: InputMaybe<Scalars['Int']['input']>;
  watchersCount_GT?: InputMaybe<Scalars['Int']['input']>;
  watchersCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  watchersCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  watchersCount_LT?: InputMaybe<Scalars['Int']['input']>;
  watchersCount_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type ReposConnection = {
  __typename?: 'ReposConnection';
  edges: Array<RepoEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/** An enum for sorting in either ascending or descending order. */
export enum SortDirection {
  /** Sort by field values in ascending order. */
  Asc = 'ASC',
  /** Sort by field values in descending order. */
  Desc = 'DESC'
}

export type StringAggregateSelection = {
  __typename?: 'StringAggregateSelection';
  longest?: Maybe<Scalars['String']['output']>;
  shortest?: Maybe<Scalars['String']['output']>;
};

export type UpdateAwesomeListsMutationResponse = {
  __typename?: 'UpdateAwesomeListsMutationResponse';
  awesomeLists: Array<AwesomeList>;
  info: UpdateInfo;
};

/** Information about the number of nodes and relationships created and deleted during an update mutation */
export type UpdateInfo = {
  __typename?: 'UpdateInfo';
  /** @deprecated This field has been deprecated because bookmarks are now handled by the driver. */
  bookmark?: Maybe<Scalars['String']['output']>;
  nodesCreated: Scalars['Int']['output'];
  nodesDeleted: Scalars['Int']['output'];
  relationshipsCreated: Scalars['Int']['output'];
  relationshipsDeleted: Scalars['Int']['output'];
};

export type UpdateReposMutationResponse = {
  __typename?: 'UpdateReposMutationResponse';
  info: UpdateInfo;
  repos: Array<Repo>;
};

export type CreateAwesomeListsMutationVariables = Exact<{
  input: Array<AwesomeListCreateInput> | AwesomeListCreateInput;
}>;


export type CreateAwesomeListsMutation = { __typename?: 'Mutation', createAwesomeLists: { __typename?: 'CreateAwesomeListsMutationResponse', awesomeLists: Array<{ __typename?: 'AwesomeList', lastRefreshTime: any, name: string, tags: Array<string | null>, url: string }> } };

export type CreateReposMutationVariables = Exact<{
  input: Array<RepoCreateInput> | RepoCreateInput;
}>;


export type CreateReposMutation = { __typename?: 'Mutation', createRepos: { __typename?: 'CreateReposMutationResponse', repos: Array<{ __typename?: 'Repo', url: string, name: string, owner: string, stars: number, forkCount: number, description?: string | null, diskUsage?: number | null, closeIssuesCount: number, homepageUrl?: string | null, hasSponsorshipsEnabled: boolean, lastModified: any, license?: string | null, missing: boolean }> } };

export type ConnectRepoMutationVariables = Exact<{
  connect?: InputMaybe<RepoConnectInput>;
}>;


export type ConnectRepoMutation = { __typename?: 'Mutation', updateRepos: { __typename?: 'UpdateReposMutationResponse', info: { __typename?: 'UpdateInfo', relationshipsCreated: number, relationshipsDeleted: number }, repos: Array<{ __typename?: 'Repo', url: string, stars: number }> } };

export type AwesomeListsQueryVariables = Exact<{
  where?: InputMaybe<AwesomeListWhere>;
}>;


export type AwesomeListsQuery = { __typename?: 'Query', awesomeLists: Array<{ __typename?: 'AwesomeList', lastModified: any, lastRefreshTime: any, name: string, url: string, tags: Array<string | null>, id: string }> };

export type ReposQueryVariables = Exact<{
  where?: InputMaybe<RepoWhere>;
  options?: InputMaybe<RepoOptions>;
}>;


export type ReposQuery = { __typename?: 'Query', repos: Array<{ __typename?: 'Repo', diskUsage?: number | null, name: string, url: string, owner: string, id: string, stars: number, lastModified: any, repoCreatedAt: any }> };

export type UpdateAwesomeListsMutationVariables = Exact<{
  where?: InputMaybe<AwesomeListWhere>;
  update?: InputMaybe<AwesomeListUpdateInput>;
  connect?: InputMaybe<AwesomeListConnectInput>;
  disconnect?: InputMaybe<AwesomeListDisconnectInput>;
  create?: InputMaybe<AwesomeListRelationInput>;
  delete?: InputMaybe<AwesomeListDeleteInput>;
  connectOrCreate?: InputMaybe<AwesomeListConnectOrCreateInput>;
}>;


export type UpdateAwesomeListsMutation = { __typename?: 'Mutation', updateAwesomeLists: { __typename?: 'UpdateAwesomeListsMutationResponse', awesomeLists: Array<{ __typename?: 'AwesomeList', lastRefreshTime: any, name: string, tags: Array<string | null>, url: string, id: string, lastModified: any }> } };

export type UpdateReposMutationVariables = Exact<{
  connect?: InputMaybe<RepoConnectInput>;
  where?: InputMaybe<RepoWhere>;
  update?: InputMaybe<RepoUpdateInput>;
  create?: InputMaybe<RepoRelationInput>;
  connectOrCreate?: InputMaybe<RepoConnectOrCreateInput>;
  delete?: InputMaybe<RepoDeleteInput>;
  disconnect?: InputMaybe<RepoDisconnectInput>;
}>;


export type UpdateReposMutation = { __typename?: 'Mutation', updateRepos: { __typename?: 'UpdateReposMutationResponse', info: { __typename?: 'UpdateInfo', relationshipsCreated: number, relationshipsDeleted: number }, repos: Array<{ __typename?: 'Repo', url: string, stars: number }> } };


export const CreateAwesomeListsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAwesomeLists"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AwesomeListCreateInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAwesomeLists"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"awesomeLists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastRefreshTime"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<CreateAwesomeListsMutation, CreateAwesomeListsMutationVariables>;
export const CreateReposDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRepos"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RepoCreateInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRepos"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"stars"}},{"kind":"Field","name":{"kind":"Name","value":"forkCount"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"diskUsage"}},{"kind":"Field","name":{"kind":"Name","value":"forkCount"}},{"kind":"Field","name":{"kind":"Name","value":"closeIssuesCount"}},{"kind":"Field","name":{"kind":"Name","value":"homepageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"hasSponsorshipsEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"lastModified"}},{"kind":"Field","name":{"kind":"Name","value":"license"}},{"kind":"Field","name":{"kind":"Name","value":"missing"}}]}}]}}]}}]} as unknown as DocumentNode<CreateReposMutation, CreateReposMutationVariables>;
export const ConnectRepoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"connectRepo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"connect"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RepoConnectInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRepos"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"connect"},"value":{"kind":"Variable","name":{"kind":"Name","value":"connect"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"info"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"relationshipsCreated"}},{"kind":"Field","name":{"kind":"Name","value":"relationshipsDeleted"}}]}},{"kind":"Field","name":{"kind":"Name","value":"repos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"stars"}}]}}]}}]}}]} as unknown as DocumentNode<ConnectRepoMutation, ConnectRepoMutationVariables>;
export const AwesomeListsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AwesomeLists"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AwesomeListWhere"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"awesomeLists"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastModified"}},{"kind":"Field","name":{"kind":"Name","value":"lastRefreshTime"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AwesomeListsQuery, AwesomeListsQueryVariables>;
export const ReposDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Repos"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RepoWhere"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RepoOptions"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repos"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"diskUsage"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"stars"}},{"kind":"Field","name":{"kind":"Name","value":"lastModified"}},{"kind":"Field","name":{"kind":"Name","value":"repoCreatedAt"}}]}}]}}]} as unknown as DocumentNode<ReposQuery, ReposQueryVariables>;
export const UpdateAwesomeListsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAwesomeLists"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AwesomeListWhere"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"update"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AwesomeListUpdateInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"connect"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AwesomeListConnectInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"disconnect"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AwesomeListDisconnectInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"create"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AwesomeListRelationInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"delete"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AwesomeListDeleteInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"connectOrCreate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AwesomeListConnectOrCreateInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAwesomeLists"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"update"},"value":{"kind":"Variable","name":{"kind":"Name","value":"update"}}},{"kind":"Argument","name":{"kind":"Name","value":"connect"},"value":{"kind":"Variable","name":{"kind":"Name","value":"connect"}}},{"kind":"Argument","name":{"kind":"Name","value":"disconnect"},"value":{"kind":"Variable","name":{"kind":"Name","value":"disconnect"}}},{"kind":"Argument","name":{"kind":"Name","value":"create"},"value":{"kind":"Variable","name":{"kind":"Name","value":"create"}}},{"kind":"Argument","name":{"kind":"Name","value":"delete"},"value":{"kind":"Variable","name":{"kind":"Name","value":"delete"}}},{"kind":"Argument","name":{"kind":"Name","value":"connectOrCreate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"connectOrCreate"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"awesomeLists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastRefreshTime"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastModified"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateAwesomeListsMutation, UpdateAwesomeListsMutationVariables>;
export const UpdateReposDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateRepos"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"connect"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RepoConnectInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RepoWhere"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"update"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RepoUpdateInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"create"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RepoRelationInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"connectOrCreate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RepoConnectOrCreateInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"delete"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RepoDeleteInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"disconnect"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RepoDisconnectInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRepos"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"connect"},"value":{"kind":"Variable","name":{"kind":"Name","value":"connect"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"update"},"value":{"kind":"Variable","name":{"kind":"Name","value":"update"}}},{"kind":"Argument","name":{"kind":"Name","value":"create"},"value":{"kind":"Variable","name":{"kind":"Name","value":"create"}}},{"kind":"Argument","name":{"kind":"Name","value":"connectOrCreate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"connectOrCreate"}}},{"kind":"Argument","name":{"kind":"Name","value":"delete"},"value":{"kind":"Variable","name":{"kind":"Name","value":"delete"}}},{"kind":"Argument","name":{"kind":"Name","value":"disconnect"},"value":{"kind":"Variable","name":{"kind":"Name","value":"disconnect"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"info"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"relationshipsCreated"}},{"kind":"Field","name":{"kind":"Name","value":"relationshipsDeleted"}}]}},{"kind":"Field","name":{"kind":"Name","value":"repos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"stars"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateReposMutation, UpdateReposMutationVariables>;