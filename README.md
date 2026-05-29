# @tenex-eng/salt

Salt is Tenex's design system and primarily its shared React component library. It packages reusable components, semantic styles/tokens, and design-engineering guidance for Tenex product UI.

## Install

```sh
bun add @tenex-eng/salt
```

## Usage

Import styles once in the consuming app.

Non-Tailwind consumers: load Salt's standalone compiled CSS:

```ts
import "@tenex-eng/salt/styles.css";
```

Tailwind v4 consumers: keep your app's single Tailwind import, then load Salt's integration CSS:

```css
@import "tailwindcss";
@import "@tenex-eng/salt/styles/tailwind.css";
```

Use `@tenex-eng/salt/styles/base.css` only for advanced custom pipelines that already provide Tailwind source scanning and compiler setup.

Import components from the package root:

```tsx
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@tenex-eng/salt";

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

## Runtime dependency contract

Salt bundles low-level styling and Radix primitive dependencies used internally by public components.

Consumer-installed peer dependencies:

- `react` / `react-dom` `>=18.3 <20` — required for all components.
- `@tanstack/react-hotkeys` `^0.10.0` — required when using `Sidebar`; used for the `Mod+B` shortcut.
- `sonner` `^2.0.7` — required when using `Toaster`; use the same app-installed `sonner` package for toast calls.
- `next-themes` `^0.4.6` — optional peer for `Toaster` theme syncing; if omitted, Salt falls back to the document `.dark` class.
- `react-day-picker` `^9.11.3` and `date-fns` `^4.3.0` — required when using `Calendar` or `DateTimePicker`; locales passed to `DateTimePicker` should come from the same `date-fns` major.

Docs/story/test-only packages such as `react-hook-form`, `zod`, `recharts`, `vaul`, `input-otp`, and carousel helpers are dev-only and are not part of Salt's runtime dependency contract.

## AI entrypoints

- [`llms.txt`](./llms.txt) / [`AI.md`](./AI.md) — package-root quickstarts for coding agents.
- [`docs/ai/index.md`](./docs/ai/index.md) / [`docs/ai.md`](./docs/ai.md) — structured agent docs index.
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
