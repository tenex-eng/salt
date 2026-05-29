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

PR CI requires a changeset when package-visible files change (`src`, `bin`, `docs`, `skills`, `README.md`, `AI.md`, `llms.txt`, or `package.json`). Version PRs are exempt because they consume pending changesets.

## Release flow

1. Merge feature PRs with `.changeset/*.md` files.
2. The Release workflow runs on `main` and reports pending changesets without publishing.
3. Create a version branch locally: `git checkout -b chore/version-packages`.
4. Run `bun run version-packages`.
5. Commit the generated version bump and `CHANGELOG.md`: `git add package.json CHANGELOG.md .changeset && git commit -m "chore: version packages"`.
6. Push the branch and open a PR.
7. Merge the version PR.
8. The Release workflow runs again, builds the package, publishes to GitHub Packages, and creates the release tag.

## Local commands

```bash
bun run changeset          # create a changeset
bun run version-packages   # apply pending changesets locally
bun run release            # publish locally; normally CI does this
bun run check              # full verification gate
```

Only run `version-packages` locally when preparing a version PR. Only run `release` locally when intentionally publishing outside CI.

## GitHub Packages auth

### Publishing

The workflow publishes with `GITHUB_TOKEN` and `packages: write` permission. Enterprise policy blocks Actions-created PRs, so maintainers create version PRs manually. If GitHub Packages rejects the token because package ownership is not linked to this repo, add a package-scoped token and switch `NODE_AUTH_TOKEN` in `.github/workflows/release.yml`.

### Consuming

Consumer installs are separate from publishing. Since Salt is private, consuming repos and local developers need GitHub Packages read auth. Use the shared GitHub Classic Token from the TENEX Engineering Vault for `NODE_AUTH_TOKEN`; it needs `read:packages`. See [`consuming.md`](./consuming.md).
