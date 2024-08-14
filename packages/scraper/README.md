To update database data, run the following commands:

```bash
# get latest repo data into database
bun scripts/fill-repo-data.ts

# fill the relationship between awesome list and the repos
bun fill-is-awesome.ts


bun cli.ts refresh --new-awesome-list
bun cli.ts refresh --awesome-list-repos
bun cli.ts refresh --draft-repos
bun cli.ts refresh --outdated-repos
bun cli.ts refresh --is-awesome
```
