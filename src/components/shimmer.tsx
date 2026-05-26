import { cn } from '../lib/utils';

interface ShimmerContentProps {
  className?: string;
  height?: string;
  width?: string;
  rounded?: boolean;
}

export function ShimmerContent({
  className,
  height = 'full',
  width = 'full',
  rounded = false,
}: ShimmerContentProps) {
  return (
    <div className={cn('h-full w-full overflow-hidden', className)}>
      <div
        className={cn(
          'relative h-full w-full bg-linear-to-r from-slate-800/50 to-slate-900/50 dark:from-slate-800/50 dark:to-slate-900/50',
          height === 'full' ? 'h-full' : height,
          width === 'full' ? 'w-full' : width,
          rounded ? 'rounded-md' : ''
        )}
      >
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-slate-600/10 to-transparent" />
      </div>
    </div>
  );
}
