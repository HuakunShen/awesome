import { Repo, RepoMetadata } from "types"
import repos from "./all-repos.json"

for (const repo of repos as any[]) {
	// if (!repo) {
	// 	console.log('repo is null');

	// }
	const metadata = repo.metadata as RepoMetadata
	if (!metadata) {
		console.log("metadata is null", repo)
	}
	// if (!r.owner) {
	// 	console.log(repo)
	// }
}
