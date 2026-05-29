---
name: salt-design-system
description: >-
  Use when building or reviewing React interfaces in apps that consume @tenex-eng/salt. Guides agents to compose Salt primitives, read package-shipped design-engineering docs, preserve domain-neutral Tone and Appearance language, and keep product-specific guidance in app-owned design-extension skills.
---

# Salt Design System

Salt is Tenex's design system and shared React component library. It provides domain-neutral interface primitives, semantic styling utilities, and design-engineering guidance for consuming applications.

## When to use

Use this skill when:

- building UI in a React app that depends on `@tenex-eng/salt`,
- choosing Salt components, tones, appearances, or semantic utilities,
- deciding whether UI belongs in Salt or in the consuming app,
- reviewing app UI for Salt design-system fit.

## First moves

1. Confirm the app imports Salt styles once near the app root:

   ```ts
   import "@tenex-eng/salt/styles.css";
   ```

2. Inspect the installed public API before coding:
   - first: `node_modules/@tenex-eng/salt/dist/index.d.ts`,
   - then, when available: `node_modules/@tenex-eng/salt/src/index.ts`, component source, and stories for context.
3. Read `node_modules/@tenex-eng/salt/docs/design-engineering/index.md`.
4. Read the topic doc matching the task instead of guessing patterns.
5. Compose exported Salt primitives before creating custom UI.

## React library boundary

Salt's runtime package API is React-only.

Do:

- import components from `@tenex-eng/salt`,
- use exported types and primitives,
- use semantic Tailwind utilities backed by Salt CSS variables.

Do not:

- import Next.js APIs from Salt,
- assume app routing, server components, or framework-specific behavior,
- import app/domain modules into Salt patterns,
- use private Salt source modules unless they are exported by the package root.

## Design-engineering docs

Link to package-shipped docs; do not duplicate them here.

Start:

- `docs/design-engineering/index.md`

Then read the relevant topic:

- `components.md` — composition, loading/empty states, prop conventions.
- `forms.md` — inputs and validation.
- `typography.md` — hierarchy and readability.
- `colors.md` — purpose intents, tones, expressions, dark mode.
- `tonal-categories.md` — color scale weights.
- `mise-en-mode.md` — intent token architecture.
- `spacing-layout.md` — layout and spacing.
- `animations.md` — transitions and motion.
- `accessibility.md` — touch, keyboard, ARIA.
- `iconography.md` — icon usage.

## Core Salt language

### Tone

`Tone` is generic semantic color intent for UI communication.

Use Salt tones such as:

- `neutral`
- `info`
- `success`
- `caution`
- `warning`
- `danger`

Do not add product terms such as severity, priority, case status, or system health to Salt core APIs.

### Appearance

`Appearance` is generic visual treatment or emphasis within a component. Prefer component-supported appearance props before custom classes.

### Domain adapter

A domain adapter belongs in the consuming app. It maps product language to Salt language.

```ts
const SEVERITY_TONE = {
  critical: "danger",
  high: "warning",
  medium: "caution",
  low: "neutral",
} satisfies Record<Severity, Tone>;
```

Keep the domain terms in the app. Pass Salt the mapped `Tone`, `Appearance`, and primitive props.

## Salt primitives vs product-specific components

Salt primitives are reusable, domain-neutral building blocks exported by `@tenex-eng/salt`.

Product-specific components belong in the consuming app when they express:

- app workflows,
- product nouns,
- business status models,
- app-specific data presentation,
- domain-specific copy or interaction policy.

Build product-specific components by composing Salt primitives. Promote to Salt only when the component is clearly useful across apps and can be described without app domain terms.

## App design-extension skills

App-specific UI guidance belongs in app-owned design-extension skills, not this package skill.

Use an app design-extension skill for:

- product-specific component patterns,
- app workflow conventions,
- domain term mappings,
- local layout rules,
- app-specific examples.

This `salt-design-system` skill stays package-owned and domain-neutral.

## V1 exclusions

This skill intentionally avoids:

- generated component inventory,
- MCP integration,
- tool-specific installer behavior,
- app-specific product guidance.

For installed API discovery, inspect generated declarations and source exports instead of relying on an inventory copied into this skill.
