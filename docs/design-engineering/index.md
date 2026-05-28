# Salt Design Engineering

Salt is a domain-neutral React design system. It provides generic interface language, tokens, and primitives; consuming apps own product/domain semantics.

## Core principles

- Compose Salt primitives before building new UI.
- Use semantic utilities backed by Salt CSS variables; avoid raw palette classes in reusable components.
- Prefer `tone` + `appearance` for expressive APIs.
- Keep domain words such as severity, priority, case status, and system health in consuming apps.
- Use skeletons for content loading; avoid spinners except inline status indicators.
- Animate only when motion improves comprehension.
- Keep primitives accessible by default.

## Reference index

| Task | Read |
| --- | --- |
| Component composition, loading, empty states | [components.md](./components.md) |
| Forms and validation | [forms.md](./forms.md) |
| Accessibility, focus, ARIA, touch | [accessibility.md](./accessibility.md) |
| Motion and transitions | [animations.md](./animations.md) |
| Type scale and text rules | [typography.md](./typography.md) |
| Spacing, layout, density | [spacing-layout.md](./spacing-layout.md) |
| Icons | [iconography.md](./iconography.md) |
| Tone, appearance, tokens | [colors.md](./colors.md) |
| Mise en Mode theory | [mise-en-mode.md](./mise-en-mode.md) |
| Palette weight categories | [tonal-categories.md](./tonal-categories.md) |

## Consumer app rule

Map app language to Salt language in the consuming app:

```ts
const SEVERITY_TONE = {
  critical: 'danger',
  high: 'warning',
  medium: 'caution',
  low: 'neutral',
} satisfies Record<Severity, Tone>;
```

Then render generic Salt components:

```tsx
<Badge tone={SEVERITY_TONE[alert.severity]} appearance="subtle">
  {alert.severity}
</Badge>
```
