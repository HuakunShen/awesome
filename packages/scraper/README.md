To update database data, run the following commands:

```bash
# get latest repo data into database
bun scripts/fill-repo-data.ts

# fill the relationship between awesome list and the repos
bun fill-is-awesome.ts
```
