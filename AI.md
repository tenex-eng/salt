# Salt AI quickstart

Salt is Tenex's design system and shared React component library: reusable, domain-neutral UI primitives plus design-engineering guidance for consuming apps.

## First moves

1. Install/import `@tenex-eng/salt` from React code only. Do not use Next.js-only imports from Salt.
2. Import Salt styles once in the app shell. Non-Tailwind consumers use compiled CSS:

   ```ts
   import "@tenex-eng/salt/styles.css";
   ```

   Tailwind v4 consumers keep one app-owned `@import "tailwindcss"`, then add:

   ```css
   @import "@tenex-eng/salt/styles/tailwind.css";
   ```

   Use `@tenex-eng/salt/styles/base.css` only for advanced custom pipelines.

3. Inspect the installed public API before coding:
   - first: `node_modules/@tenex-eng/salt/dist/index.d.ts`
   - then, when available: `node_modules/@tenex-eng/salt/src/index.ts` and component source for context
4. Compose exported primitives before creating custom UI.
5. Use Salt generic interface language. Apps own domain adapters that map product terms to Salt `Tone` and `Appearance`.

## Core language

- `Tone`: generic color intent such as `neutral`, `info`, `success`, `caution`, `warning`, `danger`.
- `Appearance`: generic emphasis/treatment within a component.
- `Domain adapter`: app-owned mapping from domain terms such as severity, priority, status, or health into Salt language.

## Read next

- `docs/ai.md` — structured agent docs index and consumer setup.
- `docs/design-engineering/index.md` — design-engineering rules and topic links.
- `docs/agents/salt-consumer.md` — copyable consumer-agent guidance.

## V1 scope

This package intentionally does not ship generated inventory, `llms-full.txt`, MCP integration, skill distribution, or a manually maintained component map.
