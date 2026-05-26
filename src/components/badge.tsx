import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../lib/utils';
import { toneStyle, BRAND_CLASSES, type Tone, type Appearance } from './tone';

/**
 * @deprecated Use `tone` + `appearance` props instead. Will be removed once all
 * consumers are migrated. See Storybook "UI/Badge" → "All Tones" for the matrix.
 */
const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold leading-tight transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground shadow-sm hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/80',
        outline: 'text-foreground',
        success: 'border-transparent bg-green-500 text-white shadow-sm hover:bg-green-600',
        warning: 'border-transparent bg-yellow-500 text-white shadow-sm hover:bg-yellow-600',
        ghost: 'hover:bg-accent hover:text-accent-foreground border-0',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/** @deprecated Use `Tone` from `./tone` instead. */
type BadgeTone = Tone;

/** @deprecated Use `Appearance` from `./tone` instead. */
type BadgeAppearance = Appearance;

const BASE =
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold leading-tight transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2';

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
  /** Semantic tone (expression/mode). Omit for brand default (cyan). */
  tone?: Tone;
  /** Visual weight (priority). When set, tone/appearance system is used instead of variant. */
  appearance?: Appearance;
}

function Badge({ className, variant, tone, appearance, style, ...props }: BadgeProps) {
  // New tone/appearance system takes precedence
  if (tone !== undefined || appearance !== undefined) {
    const resolvedAppearance = appearance ?? 'solid';

    if (tone) {
      return (
        <div
          className={cn(BASE, className)}
          style={{ ...toneStyle(tone, resolvedAppearance), ...style }}
          {...props}
        />
      );
    }

    // No tone = brand default (cyan)
    return (
      <div
        className={cn(BASE, BRAND_CLASSES[resolvedAppearance], className)}
        style={style}
        {...props}
      />
    );
  }

  // Legacy variant path (deprecated)
  return <div className={cn(badgeVariants({ variant }), className)} style={style} {...props} />;
}

export { Badge, badgeVariants };
export type { BadgeTone, BadgeAppearance };
