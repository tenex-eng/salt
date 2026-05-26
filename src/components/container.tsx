import { cn } from '../lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: 'default' | 'small' | 'large';
}

export function Container({ children, className, size = 'default', ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full', // Base padding for all sizes
        // Size variants
        {
          'max-w-(--breakpoint-2xl) lg:px-8': size === 'large',
          'max-w-7xl lg:px-6': size === 'default',
          'max-w-4xl lg:px-6': size === 'small',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
