import type { RepositoryQuery } from "@hk/github-graphql"
import type { RepoMetadata } from "types"

/**
 * [missing] field not included in the return value
 * @param repoMetadata
 * @returns
 */
export function githubRepoMetadataToDBRepo(
	repoMetadata: RepositoryQuery["repository"] | RepoMetadata
) {
	repoMetadata = repoMetadata!
	return {
		owner: repoMetadata.owner.login,
		name: repoMetadata.name,
		stars: repoMetadata.stargazerCount,
		url: repoMetadata.url,
		description: repoMetadata.description,
		diskUsage: repoMetadata.diskUsage,
		forkCount: repoMetadata.forkCount,
		hasDiscussionsEnabled: repoMetadata.hasDiscussionsEnabled,
		hasIssuesEnabled: repoMetadata.hasIssuesEnabled,
		hasSponsorshipsEnabled: repoMetadata.hasSponsorshipsEnabled,
		homepageUrl: repoMetadata.homepageUrl,
		licenseInfo: repoMetadata.licenseInfo
			? {
					key: repoMetadata.licenseInfo.key,
					name: repoMetadata.licenseInfo.name,
					nickname: repoMetadata.licenseInfo.nickname
				}
			: null,
		openIssuesCount: repoMetadata.openIssues.totalCount,
		// repoMetadata.closeIssuesCount
		closeIssuesCount: repoMetadata.closedIssues.totalCount,
		pullRequestsCount: repoMetadata.pullRequests.totalCount,
		releasesCount: repoMetadata.releases.totalCount,
		repoPushedAt: repoMetadata.pushedAt,
		repoUpdatedAt: repoMetadata.updatedAt,
		repoCreatedAt: repoMetadata.createdAt,
		watchersCount: repoMetadata.watchers.totalCount
	}
}
