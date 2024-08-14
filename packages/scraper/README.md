To update database data, run the following commands:

```bash
# # get latest repo data into database
# bun scripts/fill-repo-data.ts

# # fill the relationship between awesome list and the repos
# bun fill-is-awesome.ts


bun cli.ts refresh --new-awesome-list
bun cli.ts refresh --awesome-list-repos
# Index draft repos in batch mode first, non-existing repos will fail the entire batch
bun cli.ts refresh --draft-repos --batch
# Then run single repo indexing to fix the missing repos
bun cli.ts refresh --draft-repos

# batch mode should normally work, but newly deleted/moved repos could potentially fail the code, need to handle this later
bun cli.ts refresh --outdated-repos --batch

bun cli.ts refresh --is-awesome
```
