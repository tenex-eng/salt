# Animations

Easing, timing, performance, and motion patterns for Salt UI.

## Table of Contents

- [When to Animate](#when-to-animate)
- [Easing Blueprint](#easing-blueprint)
- [Duration Guidelines](#duration-guidelines)
- [Salt Utilities](#salt-utilities)
- [Performance](#performance)
- [Springs (When Appropriate)](#springs-when-appropriate)
- [Reduced Motion](#reduced-motion)
- [Theme Transitions](#theme-transitions)
- [Anti-Patterns](#anti-patterns)

## When to Animate

**Frequency rule:** The more frequently an action occurs, the less animation it needs.

| Frequency                      | Animation Level          | Example                       |
| ------------------------------ | ------------------------ | ----------------------------- |
| Constant (every second)        | None                     | Live data updates             |
| Very frequent (every click)    | Minimal (opacity, 100ms) | Button clicks, toggles        |
| Frequent (several per session) | Subtle (150-200ms)       | Dropdown opens, tab switches  |
| Infrequent (1-2 per session)   | Noticeable (200-300ms)   | Modal opens, page transitions |
| Rare (setup, onboarding)       | Elaborate (300-500ms)    | Wizard steps, celebrations    |

**Product vs marketing:**

- Product UI: Speed over delight. Minimize animation.
- Marketing/landing: Delight matters. More elaborate motion.

## Easing Blueprint

| Use Case           | Easing        | CSS                                | When                          |
| ------------------ | ------------- | ---------------------------------- | ----------------------------- |
| Entering view      | `ease-out`    | `cubic-bezier(0, 0, 0.2, 1)`       | Modal appears, dropdown opens |
| Exiting view       | `ease-out`    | `cubic-bezier(0, 0, 0.2, 1)`       | Same—fast start, gentle end   |
| Moving position    | `ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)`     | Slide between states          |
| Micro-interactions | `ease`        | `cubic-bezier(0.25, 0.1, 0.25, 1)` | Hover, focus changes          |

**Never use:**

- `linear` for UI (robotic feel)
- `ease-in` alone (feels sluggish at end)

## Duration Guidelines

| Animation Type            | Duration  | Tailwind                       |
| ------------------------- | --------- | ------------------------------ |
| Micro (hover, focus)      | 100-150ms | `duration-100`, `duration-150` |
| Small (toggles, icons)    | 150-200ms | `duration-150`, `duration-200` |
| Medium (dropdowns, cards) | 200-250ms | `duration-200`, `duration-250` |
| Large (modals, sheets)    | 250-300ms | `duration-300`                 |

**Rules:**

- Never exceed 300ms for product UI
- Exits can be 20-30% faster than entrances
- If it feels slow, it is slow

## Salt Utilities

Radix components expose `data-[state]` attributes:

```tsx
// Dialog enter/exit
<DialogContent className="
  data-[state=open]:animate-in
  data-[state=closed]:animate-out
  data-[state=closed]:fade-out-0
  data-[state=open]:fade-in-0
  data-[state=closed]:zoom-out-95
  data-[state=open]:zoom-in-95
">

// Accordion
<AccordionContent className="
  data-[state=open]:animate-accordion-down
  data-[state=closed]:animate-accordion-up
">
```

**Available keyframes** (defined in `src/styles/base.css` via `@theme` and `@keyframes` — Tailwind v4 has no config file):

- `accordion-down` / `accordion-up` — Height animation
- `shimmer` — Skeleton loading pulse

**Tailwind animate utilities:**

- `animate-in`, `animate-out` — Entry/exit
- `fade-in-0`, `fade-out-0` — Opacity 0↔1
- `zoom-in-95`, `zoom-out-95` — Scale 0.95↔1
- `slide-in-from-top-2` — Slide from offset

## Performance

**Compositor-only properties (GPU accelerated):**

```tsx
// DO: Only animate these
className = 'transition-transform';
className = 'transition-opacity';

// DON'T: Trigger layout/paint
className = 'transition-all'; // Includes everything
className = 'transition-[width]'; // Triggers layout
className = 'transition-[height]'; // Triggers layout
```

**Blur performance:**

```tsx
// Blur is expensive—limit radius
<div className="backdrop-blur-sm">  // 4px, OK
<div className="backdrop-blur-md">  // 12px, use sparingly
// Avoid: backdrop-blur-xl (24px), backdrop-blur-2xl (40px)
```

**will-change:**

```tsx
// Only add when animating, remove after
<div className={animating ? "will-change-transform" : ""}>
// Never: will-change: all (memory hog)
```

## Springs (When Appropriate)

Springs feel natural for:

- Draggable elements
- Physics-based interactions
- Playful or marketing UI, when appropriate

**Note:** Framer Motion is now the [`motion`](https://www.npmjs.com/package/motion) package (v12+). Import from `motion`:

```tsx
import { motion } from 'motion/react';
```

```tsx
// Framer Motion spring (via motion package)
<motion.div
  animate={{ x: 0 }}
  transition={{
    type: 'spring',
    stiffness: 300,
    damping: 30,
  }}
/>
```

**Spring config guide:**
| Feel | Stiffness | Damping |
|------|-----------|---------|
| Snappy | 400-500 | 30-40 |
| Balanced | 200-300 | 20-30 |
| Bouncy | 100-200 | 10-15 |

**For Salt:** Prefer CSS transitions. Springs are overkill for most product UI.

## Reduced Motion

Always respect user preferences:

```tsx
// Tailwind utility
<div className="
  transition-transform duration-200
  motion-reduce:transition-none
">

// CSS media query
@media (prefers-reduced-motion: reduce) {
  .animate-something {
    animation: none;
    transition: none;
  }
}
```

**Reduced motion should:**

- Remove movement entirely (not just slow it down)
- Keep opacity changes (they're not motion)
- Preserve functionality

## Theme Transitions

Disable transitions during theme switch to prevent flash:

```tsx
// In theme toggle handler
document.documentElement.classList.add('no-transitions');
// Toggle theme
requestAnimationFrame(() => {
  document.documentElement.classList.remove('no-transitions');
});
```

```css
.no-transitions,
.no-transitions * {
  transition: none !important;
}
```

## Anti-Patterns

```tsx
// DON'T: Animate everything
<div className="transition-all">

// DO: Be specific
<div className="transition-opacity duration-150">

// DON'T: Long durations in product UI
<div className="duration-500">

// DO: Keep it snappy
<div className="duration-200">

// DON'T: Animate on scroll (distracting)
// DO: Static content that's immediately visible

// DON'T: Bouncy animations in dense product workflows
// DO: Professional, efficient transitions
```
