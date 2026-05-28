# Components

Salt components are primitives for composition, not domain widgets.

## Composition

- Prefer existing Salt primitives before adding new components.
- Prefer compound components and slots over large configuration objects.
- Public API changes need Storybook coverage.
- Behavior changes need unit or interaction tests.

## Props

- Boolean props: `isOpen`, `isLoading`, `hasError`.
- Events: `onOpenChange`, `onSelect`, `onSubmit`.
- Render props: `renderItem`, `renderEmpty`.
- Use `asChild` when a primitive should render another element while preserving behavior.
- New expressive APIs should use `tone` and `appearance`; legacy `variant` may remain only for migration.

## Loading

Use `Skeleton` for content placeholders. Match final content shape to prevent layout shift.

```tsx
<div className="flex flex-col gap-3">
  <Skeleton className="h-8 w-1/3" />
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-2/3" />
</div>
```

## Empty states

Empty states should explain what happened and offer the next useful action. Keep one primary action.

## Anti-patterns

- custom card-like divs when `Card` fits
- domain props such as `severity="critical"` in Salt core
- raw palette utilities in reusable components
- `transition-all`
- icon-only controls without accessible names
