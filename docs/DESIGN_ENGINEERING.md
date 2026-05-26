# Salt Design Engineering

Salt components consume meaning, not raw color.

- Use semantic Tailwind classes: `bg-primary`, `text-muted-foreground`, `bg-severity-critical-bg`.
- Do not hardcode palette utilities in reusable components: avoid `bg-red-500`, `text-slate-700`.
- CSS variables provide runtime theming; Tailwind `@theme` exposes those variables as utilities.
- Touch targets should be at least 44px where practical.
- Interactive elements need visible focus states.
- Dialog/sheet/popover components must preserve keyboard and screen-reader behavior.
- Use `prefers-reduced-motion` for non-trivial animation.
- Prefer compound components and slots over large config objects.
