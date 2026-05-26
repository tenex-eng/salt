import type React from 'react';

/** Semantic tone — which expression/mode to apply. Omit for brand default (cyan). */
export type Tone = 'neutral' | 'info' | 'success' | 'caution' | 'warning' | 'danger';

/** Visual weight — how prominent the element appears. */
export type Appearance = 'subtle' | 'outline' | 'solid' | 'ghost';

/** Tailwind classes for brand default (no tone) — uses cyan scale with dark mode support. */
export const BRAND_CLASSES: Record<Appearance, string> = {
  subtle: 'border-transparent bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-200',
  outline: 'border-cyan-300 text-cyan-700 dark:border-cyan-700 dark:text-cyan-200',
  solid: 'border-transparent bg-primary text-primary-foreground',
  ghost: 'border-transparent text-cyan-700 opacity-70 dark:text-cyan-200',
};

/**
 * Builds inline style object for a toned element. Uses CSS custom properties from
 * the expression palette (globals.css) so light/dark mode is handled automatically.
 */
export function toneStyle(tone: Tone, appearance: Appearance): React.CSSProperties {
  switch (appearance) {
    case 'subtle':
      return {
        background: `var(--${tone}-subtle)`,
        color: `var(--${tone}-fg)`,
        borderColor: 'transparent',
      };
    case 'outline':
      return {
        borderColor: `var(--${tone}-border)`,
        color: `var(--${tone}-fg)`,
        background: 'transparent',
      };
    case 'solid':
      return {
        background: `var(--${tone}-solid)`,
        color: `var(--${tone}-solid-fg)`,
        borderColor: 'transparent',
      };
    case 'ghost':
      return {
        background: 'transparent',
        color: `var(--${tone}-fg)`,
        borderColor: 'transparent',
        opacity: 0.7,
      };
  }
}
