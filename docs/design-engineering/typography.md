# Typography

Use a small, consistent type scale.

## Scale

```tsx
<h1 className="text-2xl font-bold tracking-tight">Page title</h1>
<h2 className="text-lg font-semibold tracking-tight">Section</h2>
<h3 className="text-base font-medium">Subsection</h3>
<p className="text-base leading-relaxed">Body text</p>
<span className="text-sm text-muted-foreground">Secondary text</span>
<label className="text-sm font-medium leading-snug">Label</label>
```

Rules:

- One `text-2xl` page title per view.
- Do not skip hierarchy levels.
- Use `text-muted-foreground` for secondary text, not opacity.
- Never change font weight on hover; it causes layout shift.

## Wrapping

- Use `text-wrap-balance` for short headings.
- Use `text-wrap-pretty` for prose.
- Use `truncate` for constrained single-line labels.

## Numeric and technical text

- Use `tabular-nums` for aligned numeric columns.
- Use `font-mono` for code-like values.
- Use `whitespace-nowrap` for timestamps and compact status text.

## Proper characters

Use real characters: `…`, `→`, `–`, `—`, `×`.
