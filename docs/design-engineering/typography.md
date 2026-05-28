# Typography

Type scale, text wrapping, font rendering, and proper characters.

## Typography Scale

Establish hierarchy with consistent type:

```tsx
// Page titles (one per view)
<h1 className="text-2xl font-bold tracking-tight">Case Details</h1>

// Section headers
<h2 className="text-lg font-semibold tracking-tight">Related Alerts</h2>

// Subsection/card titles
<h3 className="text-base font-medium">Activity timeline</h3>

// Body text
<p className="text-base leading-relaxed">Description text here</p>

// Secondary/caption text
<span className="text-sm text-muted-foreground">Last updated 2h ago</span>

// Labels
<label className="text-sm font-medium leading-snug">Email Address</label>
```

**Hierarchy rules:**

- One `text-2xl` per view maximum, in most cases this should be in a PageHeader
- Section headers: `text-lg font-semibold`
- Subsection headings within tab content: `text-base font-medium` — no decorative icons; text-only
- Don't skip levels (no `text-2xl` → `text-sm`)
- Use `text-muted-foreground` for secondary info, not opacity

## Text Wrapping

```tsx
// Balance short headings
<h2 className="text-wrap-balance">Notification Settings</h2>

// Prevent orphans in prose
<p className="text-wrap-pretty">Long description text...</p>
```

## Technical metadata

Recommended style for timestamps, status text, and inline loading indicators.

**Base classes:** `font-mono text-xs font-medium text-muted-foreground`

Add `whitespace-nowrap` when the text must not wrap (timestamps, single-line status).

```tsx
// Timestamp display
<time className="font-mono text-xs font-medium whitespace-nowrap text-muted-foreground">
  Feb 06, 2026, 14:30 UTC
</time>

// Status with timestamp
<div className="flex items-center gap-1.5 font-mono text-xs font-medium whitespace-nowrap text-muted-foreground">
  <CheckCircle2 className="size-3 shrink-0" />
  <span>Draft saved</span>
  <span className="opacity-50">•</span>
  <time>14:30 UTC</time>
</div>

// Inline loading state (use RefreshCw animate-spin, not Skeleton)
<div className="flex items-center gap-1 font-mono text-xs font-medium whitespace-nowrap text-muted-foreground">
  <RefreshCw className="h-3 w-3 animate-spin" />
  Loading items…
</div>

// Table column timestamps (add tabular-nums for alignment)
<span className="font-mono text-xs font-medium whitespace-nowrap tabular-nums text-muted-foreground">
  {formatTimestampForDisplay(createdAt)}
</span>
```

**Rules:**

- Use semantic text color such as `text-muted-foreground` unless a component defines a stronger contract
- Weight is `font-medium` — never `font-light`
- Inline loading uses `RefreshCw` with `animate-spin` + action text with ellipsis ("Loading items…")
- Icons in this style inherit color from the parent — no explicit icon color
- Skeleton loading is for content placeholders; technical metadata loading is for compact status indicators

## Numeric Data

```tsx
// Tabular numbers for aligned columns
<td className="tabular-nums">1,234,567</td>

// Monospace for code-like values
<code className="font-mono text-sm">192.168.1.1</code>
```

## Font Rendering

```tsx
// Applied globally, but know it exists
className = 'antialiased';

// For icons and symbols
className = 'font-smoothing-antialiased';
```

## Anti-Patterns

- Never change `font-weight` on hover (causes layout shift)
- Never use opacity alone for secondary text (`text-muted-foreground` instead)
- Never set line-height on single-line elements

## Proper Characters

Use proper characters, not ASCII approximations:

| Instead of     | Use     | Character           |
| -------------- | ------- | ------------------- |
| `...`          | `…`     | Horizontal ellipsis |
| `'`            | `'` `'` | Curly quotes        |
| `"`            | `"` `"` | Curly double quotes |
| `--`           | `–`     | En dash             |
| `---`          | `—`     | Em dash             |
| `->`           | `→`     | Arrow               |
| `x` (multiply) | `×`     | Multiplication sign |

```tsx
// CSS truncation handles ellipsis automatically
<span className="truncate">Long text that gets cut off</span>
```
