# Animations

Product UI prioritizes speed and comprehension over delight.

## When to animate

| Frequency | Motion |
| --- | --- |
| Constant/live updates | none |
| Very frequent actions | minimal, ~100ms |
| Frequent state changes | subtle, 150–200ms |
| Infrequent overlays | noticeable, 200–300ms |

Never exceed 300ms for routine product UI.

## Properties

Animate compositor-friendly properties:

```tsx
className="transition-opacity duration-150"
className="transition-transform duration-200"
```

Avoid:

```tsx
className="transition-all"
className="transition-[width]"
className="transition-[height]"
```

## Easing

- Enter: ease-out.
- Exit: ease-out, often faster than enter.
- Position changes: ease-in-out.
- Hover/focus: standard ease.

## Radix state

Use `data-[state]` attributes for entry/exit where available.

```tsx
<DialogContent className="data-[state=open]:animate-in data-[state=closed]:animate-out" />
```

## Reduced motion

```tsx
<div className="transition-transform motion-reduce:transition-none" />
```

Reduced motion should remove movement, not simply slow it.
