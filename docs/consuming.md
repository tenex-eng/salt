# Consuming Salt

Salt is a private Tenex package published to GitHub Packages as `@tenex-eng/salt`.

## Package auth

Consumers need package-read auth before installing. The shared credential in 1Password is for consumers only; it is not used by Salt's release workflow.

Use a GitHub **Classic Token** with `read:packages` access from the TENEX Engineering Vault. Do not commit the token.

Add this `.npmrc` to consuming repos:

```ini
@tenex-eng:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

Bun and npm both read this file.

### Local development

Set `NODE_AUTH_TOKEN` to the classic package-read token from 1Password before installing:

```sh
export NODE_AUTH_TOKEN=<classic-token-from-1password>
bun add @tenex-eng/salt
```

If you put a literal token in a user-level npm config, keep it outside the repo. Never commit a literal token.

### CI

Create a repository secret named `NODE_AUTH_TOKEN` with the shared classic token, or map another secret such as `GH_PACKAGES_TOKEN` to `NODE_AUTH_TOKEN` before installing dependencies.

Example GitHub Actions step:

```yaml
- name: Install dependencies
  env:
    NODE_AUTH_TOKEN: ${{ secrets.NODE_AUTH_TOKEN }}
  run: bun install --frozen-lockfile
```

## Install

After auth is configured:

```sh
bun add @tenex-eng/salt
```

## Troubleshooting

- `404 Not Found` from `registry.npmjs.org`: missing the `@tenex-eng` GitHub Packages registry line.
- `401 Unauthorized` from `npm.pkg.github.com`: missing token.
- `403 Forbidden` from `npm.pkg.github.com`: token lacks `read:packages` or package/org access.
