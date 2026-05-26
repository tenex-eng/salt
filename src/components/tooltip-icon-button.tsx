'use client';

import { Button } from './';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './';
import type { ReactNode } from 'react';

interface TooltipIconButtonProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

/**
 * Button with an icon and tooltip
 */
export function TooltipIconButton({
  icon,
  label,
  onClick,
  className,
  disabled = false,
}: TooltipIconButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className={
              className ||
              'h-9 w-9 rounded-full border-border/50 bg-background shadow-xs transition-all hover:bg-muted/50'
            }
            onClick={onClick}
            disabled={disabled}
          >
            {icon}
            <span className="sr-only">{label}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
