# Salt Consumer Agent Instructions

Copy this guidance into consuming app agent instructions when the app uses `@tenex-eng/salt`.

Before implementing UI with Salt:

1. Read Salt's `docs/design-engineering/index.md`.
2. Read the relevant file under Salt's `docs/design-engineering/`.
3. For token work, read `docs/design-engineering/colors.md` and `docs/design-engineering/mise-en-mode.md`.
4. Use Salt primitives and semantic utilities before custom UI.
5. Keep app domain language in the app; map domain values to Salt `Tone` / `Appearance`.

Example:

```ts
const SEVERITY_TONE = {
  critical: 'danger',
  high: 'warning',
  medium: 'caution',
  low: 'neutral',
} satisfies Record<Severity, Tone>;
```

Do not add app-specific terms such as severity, priority, case status, or system health to Salt core APIs or tokens.
