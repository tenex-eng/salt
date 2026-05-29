# Nucleus Salt shim pilot

Pilot date: 2026-05-28.

Goal: prove Nucleus can consume Salt through local `src/components/ui/*` re-export shims before any broad import codemod.

## Test fit

From `~/github/nucleus/frontend/nucleus-app`, using a packed Salt tarball from this repo:

```sh
# in Salt
bun run build
npm pack --pack-destination /tmp

# in Nucleus frontend
bun add @tenex-eng/salt@file:/tmp/tenex-eng-salt-0.5.0.tgz
```

Nucleus is a Tailwind v4 consumer. Its `src/app/globals.css` can keep the app-owned Tailwind import and add Salt's integration entry immediately after it:

```css
@import 'tailwindcss';
@import '@tenex-eng/salt/styles/tailwind.css';
```

No Nucleus domain components were promoted to Salt during this pilot.

## Shimmed primitives

High-volume Nucleus primitives were test-shimmed by replacing local component implementations with re-exports from the Salt package root:

```ts
// src/components/ui/button.tsx
export { Button, buttonVariants, type ButtonProps } from '@tenex-eng/salt';

// src/components/ui/badge.tsx
export { Badge, badgeVariants, type BadgeAppearance, type BadgeTone } from '@tenex-eng/salt';

// src/components/ui/input.tsx
export { Input } from '@tenex-eng/salt';

// src/components/ui/card.tsx
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@tenex-eng/salt';

// src/components/ui/separator.tsx
export { Separator } from '@tenex-eng/salt';
```

These five shims cover the highest-volume local import patterns without codemodding call sites.

## Verification results

Commands run in the Nucleus frontend after applying the dependency, style import, and shims:

```sh
bun run typecheck:raw
bun run lint:check:components
```

Results:

- `bun add @tenex-eng/salt@file:/tmp/tenex-eng-salt-0.5.0.tgz` completed without peer warnings after Salt widened Nucleus-compatible peer ranges for `@tanstack/react-hotkeys` and `date-fns`.
- `bun run typecheck:raw` had no Salt shim type errors. It failed on a pre-existing Nucleus-local blocker:
  - `src/lib/analytics/AnalyticsProvider.tsx`: `dom-accessibility-api` exposes declarations that TypeScript cannot resolve under package `exports`.
- `bun run lint:check:components` exited with warning-only existing lint findings and no Salt-shim-specific errors.

## Remaining blockers / follow-ups

No Salt-side blockers remain for the five-primitive shim pilot.

Nucleus-local follow-up before treating the whole frontend gate as green:

- Fix or suppress the `dom-accessibility-api` declaration resolution issue in `src/lib/analytics/AnalyticsProvider.tsx`.

Expected migration follow-ups:

- Pilot additional `src/components/ui/*` shims in small batches, starting with components whose local source already matches Salt.
- Keep Nucleus domain-specific components in Nucleus; only promote primitives to Salt when they are domain-neutral and reusable across apps.
- Prefer shim batches plus targeted checks over a broad import codemod.
