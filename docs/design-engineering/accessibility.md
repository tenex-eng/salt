# Accessibility

Salt primitives should be accessible by default.

## Touch

- Minimum practical tap target: 44px (`min-h-11 min-w-11`).
- Icon buttons need explicit size.
- Gate hover styles behind hover capability:

```tsx
<button className="[@media(hover:hover)]:hover:bg-accent" />
```

## Keyboard

- Preserve natural DOM tab order.
- Never use positive `tabIndex`.
- Use `tabIndex={-1}` only for programmatic focus targets.
- Modal primitives must trap focus and restore focus on close.

## ARIA

Icon-only controls need an accessible name.

```tsx
<Button size="icon" aria-label="Search">
  <SearchIcon className="size-4" />
</Button>
```

Dynamic status needs live regions:

```tsx
<div role="status" aria-live="polite">Saved</div>
<div role="alert" aria-live="assertive">Failed</div>
```

## Focus

Do not remove focus styles unless replacing with a visible alternative.

```tsx
<button className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
```

## Contrast

- Normal text: 4.5:1.
- Large text and UI objects: 3:1.
- Do not rely on color alone; pair color with text/icon/shape.

## Reduced motion

Respect `prefers-reduced-motion`. Remove movement; opacity changes may remain.
