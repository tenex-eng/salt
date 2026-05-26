# @tenex/salt

Tenex Salt is an internal React component library for shared Tenex product UI.

## Install

```sh
bun add @tenex/salt
```

Import styles once in the consuming app:

```ts
import '@tenex/salt/styles.css';
```

Or import layers explicitly:

```ts
import '@tenex/salt/styles/base.css';
import '@tenex/salt/styles/security.css';
```

## Development

```sh
bun install
bun run storybook
bun run check
```

## Publishing

Internal package, semver, GitHub Packages registry: `https://npm.pkg.github.com`.
