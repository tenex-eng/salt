# Salt AI docs index

Use this as the structured starting point for coding agents consuming `@tenex/salt`.

## What Salt is

Salt is Tenex's React design system. It provides generic interface language, CSS variable-backed Tailwind utilities, and reusable React components for product UI. Consuming apps keep application/domain semantics in the app.

## Consumer setup

### Install

```sh
bun add @tenex/salt
```

### Import components

Import public React APIs from the package root:

```tsx
import { Button } from "@tenex/salt";
```

Salt is a React library only. Do not add Next.js imports, routing APIs, server-component assumptions, or app/domain imports to Salt usage.

### Load styles

Import styles once near the consuming app root:

```ts
import "@tenex/salt/styles.css";
```

If an app needs the base layer explicitly, import:

```ts
import "@tenex/salt/styles/base.css";
```

Tailwind utilities in Salt are semantic and backed by CSS variables from `src/styles/*`.

## Discover the installed API

Do not rely on a manually maintained component map. Before using a component or type, inspect the installed package:

1. Read generated type declarations first: `node_modules/@tenex/salt/dist/index.d.ts`.
2. If source is available, read source exports next: `node_modules/@tenex/salt/src/index.ts`.
3. For behavior and composition context, read the relevant component source and stories when shipped.

Generated declarations are the source of truth for the installed public API. Source files provide context, not permission to import private modules unless they are explicitly exported.

## Core interface language

### Tone

`Tone` is Salt's generic semantic color intent for UI communication. Use Salt tones such as `neutral`, `info`, `success`, `caution`, `warning`, and `danger` instead of app-specific terms.

### Appearance

`Appearance` is Salt's generic visual treatment/emphasis model within a component. Prefer appearance props over custom styling when a component supports them.

### Domain adapter

A domain adapter belongs in the consuming app. It maps product language to Salt language:

```ts
const SEVERITY_TONE = {
  critical: "danger",
  high: "warning",
  medium: "caution",
  low: "neutral",
} satisfies Record<Severity, Tone>;
```

Do not add domain terms such as severity, priority, case status, system health, or workflow state to Salt core APIs.

## Design-engineering guidance

Start with `docs/design-engineering/index.md`, then read the topic matching the task:

- `docs/design-engineering/components.md` — composition, states, prop conventions.
- `docs/design-engineering/forms.md` — forms and inputs.
- `docs/design-engineering/typography.md` — text hierarchy and readability.
- `docs/design-engineering/colors.md` — purpose intents, tones, expressions, dark mode.
- `docs/design-engineering/tonal-categories.md` — color scale weights.
- `docs/design-engineering/mise-en-mode.md` — intent token architecture.
- `docs/design-engineering/spacing-layout.md` — layout and spacing.
- `docs/design-engineering/animations.md` — transitions and motion.
- `docs/design-engineering/accessibility.md` — touch, keyboard, ARIA.
- `docs/design-engineering/iconography.md` — icon usage.

## V1 exclusions

Agent legibility v1 intentionally excludes:

- generated inventory,
- `llms-full.txt`,
- MCP integration,
- skill distribution,
- a manually maintained component map.

Keep this index curated. Prefer pointing agents to generated type declarations and source exports over duplicating API inventory here.
