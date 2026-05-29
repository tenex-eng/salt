# Changesets

Add a changeset for each package-visible change:

```bash
bun run changeset
```

Use `patch` for fixes, `minor` for public additions, and `minor` for breaking changes while Salt is pre-1.0.

A maintainer consumes these files with `bun run version-packages` in a version PR. Do not edit generated output by hand unless the changelog needs wording polish.
