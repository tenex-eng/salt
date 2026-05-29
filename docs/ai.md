# Salt AI docs index

Use this as the structured starting point for coding agents consuming `@tenex-eng/salt`.

## What Salt is

Salt is Tenex's design system and shared React component library. It provides generic interface language, CSS variable-backed Tailwind utilities, and reusable React components for product UI. Consuming apps keep application/domain semantics in the app.

## Consumer setup

### Install

```sh
bun add @tenex-eng/salt
```

### Import components

Import public React APIs from the package root:

```tsx
import { Button } from "@tenex-eng/salt";
```

Salt is a React library only. Do not add Next.js imports, routing APIs, server-component assumptions, or app/domain imports to Salt usage.

### Load styles

Import styles once near the consuming app root.

Non-Tailwind consumers load standalone compiled CSS:

```ts
import "@tenex-eng/salt/styles.css";
```

Tailwind v4 consumers keep the app-owned single Tailwind import, then load Salt's integration CSS:

```css
@import "tailwindcss";
@import "@tenex-eng/salt/styles/tailwind.css";
```

Use `@tenex-eng/salt/styles/base.css` only for advanced custom pipelines that already provide Tailwind source scanning and compiler setup. Tailwind utilities in Salt are semantic and backed by CSS variables from `src/styles/*`.

## Runtime dependency contract

Salt bundles Radix and low-level styling dependencies used internally. Consumers must install peer dependencies for the components they use:

- `react` / `react-dom` `>=18.3 <20` — all components.
- `@tanstack/react-hotkeys` `>=0.1 <1` — `Sidebar` keyboard shortcut support.
- `sonner` `^2.0.7` — `Toaster`; toast calls should use the same app-installed package.
- `next-themes` `^0.4.6` — optional `Toaster` theme sync; without it, Salt reads the document `.dark` class.
- `react-day-picker` `^9.11.3` and `date-fns` `>=4.1 <5` — `Calendar` and `DateTimePicker`.

Docs/story/test-only packages are dev-only and not runtime requirements.

## Discover the installed API

Do not rely on a manually maintained component map. Before using a component or type, inspect the installed package:

1. Read generated type declarations first: `node_modules/@tenex-eng/salt/dist/index.d.ts`.
2. If source is available, read source exports next: `node_modules/@tenex-eng/salt/src/index.ts`.
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

## Salt design-system skill

Salt ships a canonical `salt-design-system` skill for consuming repositories. From a consumer repo, install or refresh the active skill copy with:

```sh
bunx @tenex-eng/salt salt-install-skill
```

The command copies the package skill to `.agents/skills/salt-design-system/`. That directory is the active skill copy agents should use.

Tool-specific integrations may point or symlink to `.agents/skills/salt-design-system/`, but should not point directly to `node_modules/@tenex-eng/salt/skills/salt-design-system/`.

The installer overwrites the Salt active copy on rerun. Keep local product guidance in separate app design-extension skills under `.agents/skills/`, not in `.agents/skills/salt-design-system/`.

For Nucleus-like apps, thin app-local design guidance after adopting Salt: remove duplicated generic design-system guidance, keep Salt-wide rules in the Salt skill/docs, and preserve product-specific workflow/domain rules in an app-owned design-extension skill.

## V1 exclusions

Agent legibility v1 intentionally excludes:

- generated inventory,
- `llms-full.txt`,
- MCP integration,
- skill distribution,
- a manually maintained component map.

Keep this index curated. Prefer pointing agents to generated type declarations and source exports over duplicating API inventory here.
