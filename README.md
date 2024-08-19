# Awesome

[![wakatime](https://wakatime.com/badge/user/94be0fbf-cb9d-411d-8526-d0c4a4e82e1a/project/1989049a-b9c6-42c0-bf4c-48cfcd06369d.svg)](https://wakatime.com/badge/user/94be0fbf-cb9d-411d-8526-d0c4a4e82e1a/project/1989049a-b9c6-42c0-bf4c-48cfcd06369d)

> There are many "awesome-\*" repositories that list great projects.
> However, with so many options, it's challenging to find ones that are both well-maintained and of high quality.
> This project aims to curate a selection of "awesome" lists, ensuring that only the best and most reliable projects are featured.

## Development

- Bun
- pnpm
- Nodejs

```bash
pnpm build  # build all packages
bun scripts/init-env-vars.ts
pnpm --filter db gen  # generate database types
pnpm scrape # scrape all awesome lists
```

To add a GitHub awesome list repo, edit `packages/scraper/data/awesome-list.ts`.

### Start Local Neo4j DB

```bash
docker run \
    --rm \
    --name awesome-neo4j \
    --publish=7474:7474 --publish=7687:7687 \
    --env=NEO4J_AUTH=none \
    --volume=awesome-neo4j:/data \
    -e NEO4J_apoc_export_file_enabled=true \
    -e NEO4J_apoc_import_file_enabled=true \
    -e NEO4J_apoc_import_file_use__neo4j__config=true \
    -e NEO4JLABS_PLUGINS=\[\"apoc\"\] \
    neo4j
    # --volume=$HOME/neo4j/data:/data \
# default credentials: neo4j/neo4j
```