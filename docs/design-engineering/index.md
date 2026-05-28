# Salt Design Engineering Patterns

Quick reference for building polished, accessible Salt interfaces.

## Core philosophy

**Lean on primitives, don't reinvent.** Compose existing Salt primitives before building new UI.

**Consistency over cleverness.** A slightly less optimal solution that matches existing patterns beats a novel approach that introduces inconsistency.

**Restraint-first animations.** Product UI prioritizes speed over delight. Animate only when motion aids comprehension.

**Domain-neutral core.** Salt owns generic interface language; consuming apps own domain terms.

## How to use these docs

1. Check Quick Rules below.
2. Read the reference file matching your task.
3. Read component source and stories before assuming an API.

## Reference index

| Task | Read |
| --- | --- |
| Composition patterns, loading/empty states, prop conventions | [components.md](./components.md) |
| Forms and inputs | [forms.md](./forms.md) |
| Typography | [typography.md](./typography.md) |
| Purpose intents, tones, expressions, dark mode | [colors.md](./colors.md) |
| Color scale weights | [tonal-categories.md](./tonal-categories.md) |
| Intent token architecture | [mise-en-mode.md](./mise-en-mode.md) |
| Spacing, padding, layout | [spacing-layout.md](./spacing-layout.md) |
| Transitions and animations | [animations.md](./animations.md) |
| Touch, keyboard, ARIA | [accessibility.md](./accessibility.md) |
| Icons | [iconography.md](./iconography.md) |

## Quick rules

- **Always Skeleton, never spinners** — match loading placeholders to content shape.
- **Tone expressions only** — use `neutral`, `info`, `success`, `caution`, `warning`, `danger`; apps map domain concepts to tones.
- **No animation unless needed** — default to no motion; add only for comprehension.
- **Hover requires capability check** — use `@media (hover: hover)` for hover effects.
- **44px minimum tap targets** — touch devices need adequate hit areas.
- **16px+ input font** — prevents iOS zoom on focus.
- **One primary action per section** — don't compete for attention.
- **Use existing components** — check `src/components/` and stories before building.
- **Text-first iconography** — icons need visible labels; icon-only requires justification.

## Salt animation system

Radix components expose `data-[state]` attributes. Combine with Tailwind utilities:

```tsx
<DialogContent className="data-[state=open]:animate-in data-[state=closed]:animate-out" />
```

Available keyframes in `src/styles/base.css`:

- `accordion-down/up`
- `collapsible-down/up`
- `shimmer`

## Common mistakes

| Mistake | Fix |
| --- | --- |
| `transition-all` | Specify exact properties: `transition-opacity`, `transition-transform` |
| Custom card-like divs | Use `Card` when it fits |
| Spinner for content loading | Use `Skeleton` matching content shape |
| Hover effects on touch | Wrap in `@media (hover: hover)` |
| Hardcoded colors | Use intent/tone tokens |
| Weight change on hover | Use opacity or color instead |
| `text-opacity` for secondary | Use `text-muted-foreground` |
| Arbitrary spacing values | Use the spacing scale |
| Icon-only buttons | Add visible label or `aria-label` + tooltip |

## File references

- Design tokens, Tailwind v4 theme, keyframes: `src/styles/base.css`
- PostCSS pipeline: `postcss.config.mjs`
- Component primitives: `src/components/`
- Component stories: `src/components/*.stories.tsx`
