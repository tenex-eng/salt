# Releasing Salt

Salt uses Changesets to version `@tenex-eng/salt`, generate changelog entries, tag releases, and publish to GitHub Packages.

## Contributor flow

For each package-visible change, add a changeset:

```bash
bun run changeset
```

Pick the smallest useful bump:

- `patch`: bug fixes, compatibility fixes, docs/content corrections that affect package consumers.
- `minor`: new components, new props, new tokens, public API additions.
- `minor`: breaking public API or token changes while Salt is pre-1.0.
- `major`: only when Salt is ready for 1.0+ SemVer stability.

No changeset needed for internal CI, tests, refactors, or docs that do not need a package release.

## Release flow

1. Merge feature PRs with `.changeset/*.md` files.
2. The Release workflow runs on `main`.
3. Changesets opens `chore: version packages`.
4. Review the generated version bump and `CHANGELOG.md`.
5. Merge the version PR.
6. The Release workflow runs again, builds the package, publishes to GitHub Packages, and creates the release tag.

## Local commands

```bash
bun run changeset          # create a changeset
bun run version-packages   # apply pending changesets locally
bun run release            # publish locally; normally CI does this
bun run check              # full verification gate
```

Only run `version-packages` or `release` locally when intentionally managing a release outside CI.

## GitHub Packages auth

The workflow publishes with `GITHUB_TOKEN` and `packages: write` permission. If GitHub Packages rejects the token because package ownership is not linked to this repo, add a package-scoped token and switch `NODE_AUTH_TOKEN` in `.github/workflows/release.yml`.
