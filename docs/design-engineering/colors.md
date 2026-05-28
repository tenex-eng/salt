# Colors

Semantic color system built on the Mise en Mode framework (Donnie D'Amato, 2024). Structure (intents) is separate from expression (tones + appearances).

## Expressions

Expressions alter an element's presentation to convey a new idea — an error state, a success confirmation, a warning. The element's purpose (surface, action, control) is stable; the expression is a composable overlay.

In our system, expressions are composed from two orthogonal axes: **tone** and **appearance**.

### Tones

6 canonical tones — the complete expression vocabulary. Tones communicate sentiment, ordered from warm (highest intensity) to cool (lowest intensity).

| Tone      | Hue    | Communicates                                       |
| --------- | ------ | -------------------------------------------------- |
| `danger`  | red    | Failure, destructive, blocking, critical           |
| `warning` | orange | Significant concern, degraded, action needed       |
| `caution` | yellow | Elevated concern, needs attention                  |
| `success` | green  | Positive outcome, completion, healthy              |
| `info`    | blue   | Informational, awareness, passive context          |
| `neutral` | slate  | Default state, no particular sentiment             |

### Appearances

4 visual weight levels — how prominently the expression renders. This corresponds to the priority dimension: primary (most disruptive) through auxiliary (most common).

| Appearance | Treatment                                           |
| ---------- | --------------------------------------------------- |
| `subtle`   | Tinted surface + colored text                       |
| `outline`  | Transparent surface + colored border + colored text |
| `solid`    | Filled surface + high-contrast text                 |
| `ghost`    | Transparent surface + muted colored text            |

### Brand Default (No Tone)

When no tone is set, elements render with the **brand cyan** palette. This is the default mode in Mise en Mode terms — the base expression with no override applied. Brand is not a tone; it is the absence of expression.

### Using Expressions

```tsx
// Tone + appearance on any expression-aware component
<Badge tone="danger" appearance="solid">Critical</Badge>
<Alert tone="warning" appearance="subtle">
  <AlertTriangle />
  <AlertTitle>Review required</AlertTitle>
</Alert>

// No tone = brand default
<Badge appearance="solid">Default</Badge>
```

### Shared Module

Types and utilities: `src/components/tone.ts`

- `Tone` — the 6 tone values
- `Appearance` — the 4 appearance values
- `toneStyle(tone, appearance)` — CSS custom properties for a tone × appearance combination
- `BRAND_CLASSES` — Tailwind classes for brand default at each appearance

### Expression Palette Tokens

Each tone provides 5 CSS custom properties in `src/styles/base.css`, with light and dark values that comply with the [tonal category rules](tonal-categories.md):

| Property            | Light weight | Dark weight | Tonal category        |
| ------------------- | ------------ | ----------- | --------------------- |
| `--{tone}-subtle`   | 050          | 950         | Highlights / Shadows  |
| `--{tone}-fg`       | 600          | 400         | Mid-Tones / Mid-Tones |
| `--{tone}-border`   | 300          | 700         | 1/4 Tones / 3/4 Tones |
| `--{tone}-solid`    | 500          | 500         | Mid-Tones             |
| `--{tone}-solid-fg` | 000          | 050         | Highlights            |

## Domain → Tone Mapping

**Components never know about severity, case priority, system health, or other domain concepts.** Tones are the design system's shared vocabulary. Domain concepts map to tones through business logic utilities — never through CSS or component props.

```tsx
// DO: Map domain → tone in business logic, pass tone to component
<Badge tone={SEVERITY_TONE[alert.severity]}>{alert.severityLabel}</Badge>

// DON'T: Domain concept as component prop
<Badge severity="critical">Critical</Badge>
```

Example mappings belong in consuming apps, not Salt core. Changing which tone a domain value maps to is a product decision — no CSS or component changes should be required.

## Intent Tokens

Intent tokens describe the default, expressionless state of the UI. Constructed as `--{purpose}-{priority}-{property}`. Components reference intents by purpose; modes supply values from the palette.

| Token                        | Purpose                                                                        |
| ---------------------------- | ------------------------------------------------------------------------------ |
| `surface-*-bg/fg/border`     | Non-interactive containers (surfaces at primary/secondary/auxiliary elevation) |
| `action-*-bg/fg/border`      | Interactive elements (primary/secondary/auxiliary visual weight)               |
| `control-bg/fg/border`       | Form inputs (no priority — all inputs equal)                                   |
| `background`                 | Auxiliary surface (page canvas)                                                |
| `foreground`                 | Default surface foreground                                                     |
| `muted` / `muted-foreground` | Subdued surface + text                                                         |
| `card` / `card-foreground`   | Card-level surface                                                             |
| `primary`                    | Brand primary action (cyan)                                                    |
| `border`                     | Default structural border                                                      |

## Primitive → Surface Tier

Each UI primitive binds to one surface tier. Use `bg-surface-{tier}-bg`, `text-surface-{tier}-fg`, and `border-surface-{tier}-border` together — bg and border must come from the same tier or the edge disappears against its own fill. Legacy aliases (`bg-popover`, `bg-card`, `bg-background`) continue to work but resolve through the tier mapping below.

| Primitive                                                                     | Tier          | Reason                                                       |
| ----------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------ |
| `Dialog`, `AlertDialog`, `Sheet`                                              | **primary**   | Modals — most disruptive, trap focus, block underlying UI    |
| `Popover`, `DropdownMenu`, `Select`, `Tooltip`, `HoverCard`, `NavigationMenu`, `SurfaceSection` | **secondary** | Temporarily elevated, dismissible, keep page context visible |
| `Card`, `Input`, `Textarea`, `Accordion`, page canvas                         | **auxiliary** | Default / most common treatment                              |

**Rule of thumb:** if it traps focus and dims the page, it's **primary**. If it floats on top of the page but the page stays interactive/visible, it's **secondary**. Everything else is **auxiliary**.

### Surface Modes — MEM Translation

Donnie D'Amato's *Mise en Mode* defines a **mode** as a complete collection of curated values for every intent token that changes when the experience enters a new scope. Applying a mode to a subtree re-curates the entire intent set inside — "mode-ception" from the book. CSS custom property inheritance is the mechanism.

A note on vocabulary: this doc uses **tier** as a practical synonym for Mise en Mode's **priority** value on the `surface` purpose (primary / secondary / auxiliary). For surfaces, priority corresponds to elevation — so *tier* = *priority* = *elevation* throughout; all three refer to the same dimension.

Our translation into Tailwind v4:

| Layer | Where | What |
|---|---|---|
| **Palette** | `@theme` | Raw oklch scales — `--color-slate-*`, `--color-cyan-*`, … |
| **Surface tier tokens** | `:root` + `.dark` | `--surface-{primary,secondary,auxiliary}-{bg,fg,border,subtle}` — full light+dark coverage |
| **Intent tokens** | `:root` + `.dark` | `--background`, `--foreground`, `--card`, `--border`, `--input`, `--muted`, `--control-bg`, … default to auxiliary |
| **@theme aliases** | auto-generated by Tailwind | `--color-background: var(--background)`, `--color-border: var(--border)`, … — used by `bg-X`, `border-X`, `text-X` utilities |
| **Surface modes** | `.surface-primary-mode`, `.surface-secondary-mode` in `src/styles/base.css` | Re-declare intents **and** their `--color-*` aliases for the tier |

Auxiliary is the global default — no class needed. Nesting falls back up the DOM via CSS custom property inheritance exactly as MEM's "parent mode caring for any missing children" describes.

#### Applying a mode

Elevated primitives add the appropriate `surface-*-mode` class. Every descendant — `Separator`, `Input`, `Card`, `bg-muted`, plain `border`, anything that resolves through an intent — picks up the tier's value automatically.

```tsx
// Secondary surface: popover, dropdown, select, tooltip, hover-card, nav-menu
className="surface-secondary-mode border border-surface-secondary-border bg-popover ..."

// Primary surface: dialog, alert-dialog, sheet
className="surface-primary-mode border border-surface-primary-border bg-surface-primary-bg ..."
```

The primitive still declares explicit `bg-*`/`border-*`/`text-*` classes for readability. The mode class handles the descendant re-curation.

#### Three Tailwind v4 gotchas the mode must handle

The mode is a **plain CSS class** (not `@utility`) and re-declares both the raw intents and the `--color-*` aliases. Both are load-bearing.

**1. `@utility` strips `--color-*`.** Tailwind v4 treats custom properties in the `@theme` namespace as theme concerns and filters them out of `@utility` blocks. A `@utility surface-secondary-mode { --color-border: ... }` compiles with the `--color-border` line silently removed. Plain class selectors (`.surface-secondary-mode { ... }`) compile verbatim.

**2. `var()` in `@theme` aliases resolves at `:root`, not at each descendant.** Tailwind's `@theme` emits `--color-border: var(--border)` at `:root`. Chrome computes `var(--border)` once at `:root` (to auxiliary's value) and inherits that resolved color down the tree. Re-defining `--border` inside a nested scope does **not** retroactively re-resolve `--color-border` for that subtree — inheritance carries the already-resolved value. Since Tailwind utilities like `bg-border` reference `var(--color-border)`, they would bypass the mode's intent override unless the alias itself is re-declared at the mode's scope.

**3. `--color-{tone}-{subtle,fg,border,solid,solid-fg}` are not published as CSS vars.** Tone expression-palette entries in `@theme` (e.g. `--color-danger-solid: var(--danger-solid)`) compile into utility classes (`bg-danger-solid`, `text-danger-fg`, `border-danger-border`) but do **not** appear as `:root` custom properties in the output. Referencing `var(--color-danger-solid)` at runtime resolves to empty. The underlying intent tokens `--{tone}-{subtle,fg,border,solid,solid-fg}` declared in `:root` / `.dark` ARE published — reach for those directly when building runtime values (inline `style`, SVG `stroke`/`fill`, `color-mix()`). Non-tone `@theme` entries like `--color-border` or `--color-toast-bg` ARE published; this behavior is specific to the tone expression palette.

Result: every mode declares both `--X` and `--color-X` for any intent it re-curates.

```css
.surface-secondary-mode {
  /* Intents */
  --border: var(--surface-secondary-border);
  --muted: var(--surface-secondary-subtle);
  /* ... */

  /* Tailwind @theme alias chain — Chrome re-resolves at this scope */
  --color-border: var(--surface-secondary-border);
  --color-muted: var(--surface-secondary-subtle);
  /* ... */
}
```

#### Adding a new intent

When introducing a new intent whose value differs across surface tiers:

1. Declare in `:root` and `.dark` with **auxiliary-tier values** (the global default).
2. If a tier-specific value is needed, add `--surface-{tier}-{intent}` alongside the existing `--surface-{tier}-{bg,fg,border,subtle}` set in `:root` and `.dark`.
3. Re-declare in **both** `.surface-primary-mode` and `.surface-secondary-mode` — the raw intent **and** the Tailwind `--color-*` alias if the intent has one.
4. Descendants keep referencing the intent by name (`bg-muted`, `text-foreground`, plain `border`). They never know their tier — the mode supplies it.

This is the coverage cost the book accepts in exchange for MEM's scaling properties:

> "each collection of tokens distributed as a mode is meant to be fully complete with an identical set of intents, there is no risk of a missing token in the collection or a component style that doesn't have an appropriate token assigned yet."

If you forget step 3, the symptom appears in dark mode first (where auxiliary and elevated tier values are closer in weight and collisions are visible).

#### What not to do

An earlier iteration patched individual tokens on each primitive with Tailwind arbitrary properties (`[--border:var(--surface-secondary-border)]`). That fixes one collision per primitive at a time and leaks every time a new intent is introduced. A mode covers the set once and scales.

## Dark Mode

All colors must work in both modes. The same intent tokens serve both — light mode pulls from Highlight weights for surfaces and 3/4 Tone weights for text; dark mode mirrors across the lightness axis.

```tsx
// DON'T: Hardcode colors
<div className="bg-white text-black">

// DO: Use intent tokens
<div className="bg-background text-foreground">
```

## Storybook Reference

- `Foundations/Color Scales > Tones` — all 6 tones × 5 properties
- `Components/Badge > All Tones` — interactive tone × appearance matrix
- `Components/Alert > All Tones` — with icon/description toggles
- `Components/Badge > Consumer Domain Mapping` — app-owned domain mapping example
- `Components/Alert > Consumer Domain Mapping` — app-owned domain mapping example
