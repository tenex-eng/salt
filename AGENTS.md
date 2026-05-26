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
