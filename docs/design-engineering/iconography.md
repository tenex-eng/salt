# Iconography

Icons are optional; clarity is not.

## Default stance

- Prefer visible text labels.
- Use icons to improve scanning, reduce errors, or clarify state.
- Do not add icons as decoration or alignment filler.

## Patterns

Preferred:

```tsx
<Button>
  <PlusIcon className="size-4" />
  Create
</Button>
```

Icon-only requires accessible name and usually a tooltip:

```tsx
<Button size="icon" aria-label="Search">
  <SearchIcon className="size-4" />
</Button>
```

## Tone-aware icons

Lucide icons use `currentColor`, so they inherit from tone-aware parents.

```tsx
<Badge tone="danger" appearance="solid">
  <ShieldAlertIcon className="size-4" />
  Critical
</Badge>
```

Standalone expressive icons should use tone foreground utilities:

```tsx
<AlertTriangleIcon className="size-4 text-warning-fg" />
```

Do not use domain classes such as `alert-critical-icon` in Salt core.

## Sizing

- Dense UI: `size-4`.
- Standard UI: `size-5`.
- Emphasis/toolbar: `size-6`.

## Gate

Before adding an icon, ask: Is it necessary, familiar, unique in meaning, labeled, legible, consistent, and accessible?
