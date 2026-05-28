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

## Salt design-system skill

Salt ships a canonical `salt-design-system` skill for consuming repos.

Install or refresh the active skill copy from the consuming repo root:

```sh
bunx @tenex-eng/salt salt-install-skill
```

The installer copies the package skill into:

```txt
.agents/skills/salt-design-system/
```

This directory is the active skill copy. Local agents and tool-specific integrations should use or point to this active copy. Do not point tool-specific integrations directly at `node_modules/@tenex-eng/salt/skills/salt-design-system/`; package installs are disposable and may move across package-manager layouts.

The installer is safe to rerun and overwrites `.agents/skills/salt-design-system/` to match the package source. Do not make local edits there. Put app-specific guidance in separate app-owned design-extension skills, for example:

```txt
.agents/skills/nucleus-design-extension/
```

Use app design-extension skills for product workflows, domain vocabulary, app-specific component patterns, and local examples. Keep the Salt design-system skill domain-neutral.

## Migrating app-local design guidance

Nucleus-like apps with existing app-local design-engineering guidance can thin or replace it after adopting Salt:

1. Keep Salt-wide rules in `salt-design-system`.
2. Remove duplicated generic guidance that now lives in Salt docs or the Salt skill.
3. Preserve only app-specific decisions in an app design-extension skill.
4. Map app domain concepts to Salt `Tone` and `Appearance` in the app.
5. Point tool-specific integrations at the active skill copies under `.agents/skills/`.
