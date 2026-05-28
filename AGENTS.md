# Salt Agent Guide

Before modifying components, read `docs/DESIGN_ENGINEERING.md` and `docs/TOKENS.md`.

Rules:
- React library only; no Next.js imports.
- Components use semantic Tailwind utilities, not raw palette classes.
- Tailwind utilities are backed by CSS variables in `src/styles/*`.
- No app/domain imports from consuming apps.
- Prefer composition over configuration.
- Keep primitives accessible by default.
- Add or update Storybook stories for public API changes.
- Add interaction/unit tests for behavior changes.

## Agent skills

### Issue tracker

Issues live in GitHub Issues for `tenex-eng/salt`. See `docs/agents/issue-tracker.md`.

### Triage labels

Use the default five-label triage vocabulary. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout: root `CONTEXT.md` plus `docs/adr/`. See `docs/agents/domain.md`.
