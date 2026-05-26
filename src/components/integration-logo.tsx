'use client';


import { Settings } from 'lucide-react';
import { cn } from '../lib/utils';

/**
 * Derive a stable hue from a stable key so every integration
 * gets a unique-but-harmonious color without a manual brand registry.
 */
function stableKeyToHue(stableKey: string): number {
  let hash = 0;
  for (let i = 0; i < stableKey.length; i++) {
    hash = stableKey.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
}

const LOGO_REGISTRY: Record<string, string> = {
  // Add entries as logos are sourced:
  // crowdstrike: '/logos/crowdstrike.svg',
  // splunk: '/logos/splunk.svg',
};

interface IntegrationLogoProps {
  stableKey?: string;
  identifier?: string;
  name: string;
  className?: string;
  /** Use Settings icon instead of initials for the fallback */
  showFallbackIcon?: boolean;
}

export function IntegrationLogo({
  stableKey,
  identifier,
  name,
  className,
  showFallbackIcon = false,
}: IntegrationLogoProps) {
  const fallbackKey = (stableKey ?? identifier ?? name).trim() || name;
  const logoPath = LOGO_REGISTRY[fallbackKey.toLowerCase()];

  if (logoPath) {
    return (
      <div className={cn('relative shrink-0 overflow-hidden', className)}>
        <img src={logoPath} alt={`${name} logo`} className="h-full w-full object-contain" />
      </div>
    );
  }

  if (showFallbackIcon) {
    return (
      <div className={cn('flex items-center justify-center rounded-lg bg-muted', className)}>
        <Settings className="h-5 w-5 text-muted-foreground" />
      </div>
    );
  }

  const hue = stableKeyToHue(fallbackKey);

  return (
    <div
      className={cn('flex items-center justify-center rounded-lg', className)}
      style={{ backgroundColor: `hsl(${hue} 45% 55%)`, color: 'white' }}
    >
      <span className="text-xs leading-none font-bold">
        {(name || fallbackKey).slice(0, 2).toUpperCase()}
      </span>
    </div>
  );
}
