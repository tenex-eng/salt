'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { TooltipIconButton } from './tooltip-icon-button';

interface CopyButtonProps {
  /**
   * Returns the text to copy to the clipboard
   */
  getText: () => string;
  className?: string;
}

export function CopyButton({ getText, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    if (copied) return;
    try {
      await navigator.clipboard.writeText(getText());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      console.error('Failed to copy to clipboard');
    }
  };

  return (
    <TooltipIconButton
      icon={copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      label="Copy"
      onClick={onCopy}
      className={className}
    />
  );
}
