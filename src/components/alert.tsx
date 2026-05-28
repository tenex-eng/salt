import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../lib/utils';
import { toneStyle, BRAND_CLASSES, type Tone, type Appearance } from './tone';

/**
 * @deprecated Use `tone` + `appearance` props instead. Will be removed once all
 * consumers are migrated. See Storybook "UI/Alert" → "All Tones" for the matrix.
 */
const alertVariants = cva(
  'group/alert relative grid w-full gap-0.5 rounded-lg border px-2.5 py-2 text-left text-sm has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*=size-])]:size-4',
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground',
        destructive:
          'bg-card text-destructive *:data-[slot=alert-description]:text-destructive/90 [&>svg]:text-current',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const BASE =
  'group/alert relative grid w-full gap-0.5 rounded-lg border px-2.5 py-2 text-left text-sm has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*=size-])]:size-4';

/** When tone is set, make title and description inherit the tone's foreground color. */
const TONE_CHILDREN =
  '*:data-[slot=alert-title]:text-current *:data-[slot=alert-description]:text-current *:data-[slot=alert-description]:opacity-90';

interface AlertProps extends React.ComponentProps<'div'>, VariantProps<typeof alertVariants> {
  /** Semantic tone (expression/mode). Omit for brand default (cyan). */
  tone?: Tone;
  /** Visual treatment. When set, tone/appearance system is used instead of variant. Defaults to "subtle" for alerts. */
  appearance?: Appearance;
}

function Alert({ className, variant, tone, appearance, style, ...props }: AlertProps) {
  // New tone/appearance system takes precedence
  if (tone !== undefined || appearance !== undefined) {
    const resolvedAppearance = appearance ?? 'subtle';

    if (tone) {
      return (
        <div
          data-slot="alert"
          role="alert"
          className={cn(BASE, TONE_CHILDREN, className)}
          style={{ ...toneStyle(tone, resolvedAppearance), ...style }}
          {...props}
        />
      );
    }

    // No tone = brand default (cyan)
    return (
      <div
        data-slot="alert"
        role="alert"
        className={cn(BASE, TONE_CHILDREN, BRAND_CLASSES[resolvedAppearance], className)}
        style={style}
        {...props}
      />
    );
  }

  // Legacy variant path (deprecated)
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      style={style}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-title"
      className={cn('font-medium tracking-tight group-has-[>svg]/alert:col-start-2', className)}
      {...props}
    />
  );
}

function AlertDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        'text-sm text-balance text-muted-foreground group-has-[>svg]/alert:col-start-2 md:text-pretty [&_p:not(:last-child)]:mb-4',
        className
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
