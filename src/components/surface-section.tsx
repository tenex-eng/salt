import * as React from 'react';

import { cn } from '../lib/utils';

/**
 * An inline elevated region that sits between Card (auxiliary/canvas) and
 * Dialog (primary/modal). Applies `surface-secondary-mode` so descendants
 * resolve intent tokens (--border, --card, --muted, --input, …) to the
 * secondary tier — `Separator`, `Input`, nested `Card`, `bg-muted`, and
 * plain `border` inherit the correct values automatically.
 *
 * Defaults to a <section> element; override via `as`.
 */
interface SurfaceSectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
}

const SurfaceSection = React.forwardRef<HTMLElement, SurfaceSectionProps>(
  ({ as: Component = 'section', className, ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(
        'surface-secondary-mode rounded-lg border border-surface-secondary-border bg-surface-secondary-bg p-4 text-surface-secondary-fg',
        className
      )}
      {...props}
    />
  )
);
SurfaceSection.displayName = 'SurfaceSection';

export { SurfaceSection };
