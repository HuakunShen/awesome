# Awesome

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
