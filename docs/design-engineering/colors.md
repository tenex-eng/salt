# Colors

Salt separates structure from expression.

## Expressions

Expression = how an element communicates sentiment. Salt expresses sentiment through two orthogonal axes:

- **Tone**: semantic intent.
- **Appearance**: visual treatment / emphasis.

## Tones

| Tone | Communicates |
| --- | --- |
| `danger` | Failure, destructive, blocking, critical |
| `warning` | Significant concern, degraded, action needed |
| `caution` | Elevated concern, needs attention |
| `success` | Positive outcome, completion, healthy |
| `info` | Informational, awareness, passive context |
| `neutral` | Default state, no sentiment |

## Appearances

| Appearance | Treatment |
| --- | --- |
| `subtle` | Tinted surface + colored text |
| `outline` | Transparent surface + colored border/text |
| `solid` | Filled surface + high-contrast text |
| `ghost` | Transparent surface + muted colored text |

No tone means brand default. Brand is not a tone.

## Domain mapping

Salt core never owns severity, priority, case status, or system health. Apps map those terms to `Tone`.

```tsx
<Badge tone={SEVERITY_TONE[severity]} appearance="subtle">
  {severity}
</Badge>
```

Do not add `severity`, `priority`, or security-specific props/tokens to Salt core.

## Token utilities

Expression utilities follow:

- `bg-{tone}-subtle`
- `text-{tone}-fg`
- `border-{tone}-border`
- `bg-{tone}-solid`
- `text-{tone}-solid-fg`

Use semantic utilities in reusable components. Avoid raw palette utilities like `bg-red-500` except in palette demo stories.
