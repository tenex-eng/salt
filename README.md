# @tenex-eng/salt

Tenex Salt is an internal React component library for shared Tenex product UI.

## Install

```sh
bun add @tenex-eng/salt
```

## Usage

Import styles once in the consuming app:

```ts
import "@tenex-eng/salt/styles.css";
```

Or import the base layer explicitly:

```ts
import "@tenex-eng/salt/styles/base.css";
```

Import components from the package root:

```tsx
import { Button, Card, CardContent, CardHeader, CardTitle } from "@tenex-eng/salt";

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Deploy controls</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Deploy</Button>
      </CardContent>
    </Card>
  );
}
```

## AI entrypoints

- [`AI.md`](./AI.md) — package-root quickstart for coding agents.
- [`docs/ai.md`](./docs/ai.md) — structured agent docs index.
- `salt-install-skill` — copies the package Salt design-system skill into `.agents/skills/salt-design-system/` in a consuming repo:

  ```sh
  bunx @tenex-eng/salt salt-install-skill
  ```

## Development

```sh
bun install
bun run storybook
bun run check
```

## Contributing

- Use semantic Tailwind utilities backed by Salt tokens; avoid raw palette classes in reusable components.
- Keep primitives accessible by default.
- Prefer composition over large config APIs.
- Add or update Storybook stories for public API changes.
- Add interaction or unit tests for behavior changes.
- Run `bun run check` before handoff.

## Publishing

Internal package, semver, GitHub Packages registry: `https://npm.pkg.github.com`.
