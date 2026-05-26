'use client';

import { useSyncExternalStore } from 'react';
import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

/**
 * Reads the effective theme from the DOM (.dark class) as a fallback when
 * next-themes isn't available (e.g. Storybook). Subscribes to class mutations
 * so the theme stays in sync with Storybook's withThemeByClassName decorator.
 *
 * Server snapshot defaults to 'dark' to match the app's defaultTheme setting
 * in ThemeContext.tsx, avoiding hydration mismatches on first render.
 */
function useDomTheme(): 'light' | 'dark' {
  const getSnapshot = () =>
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
      ? ('dark' as const)
      : ('light' as const);

  return useSyncExternalStore(
    callback => {
      if (typeof document === 'undefined') return () => {};
      const observer = new MutationObserver(callback);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      });
      return () => observer.disconnect();
    },
    getSnapshot,
    // Server: match app's defaultTheme ('dark') so hydration is consistent
    () => 'dark' as const
  );
}

export function Toaster({ ...props }: ToasterProps) {
  const { theme: nextTheme, resolvedTheme } = useTheme();
  const domTheme = useDomTheme();
  // Prefer next-themes resolved value; fall back to DOM class (Storybook)
  const theme = resolvedTheme ?? (nextTheme !== 'system' ? nextTheme : undefined) ?? domTheme;

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      position="top-center"
      richColors
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          '--normal-bg': 'var(--color-toast-bg)',
          '--normal-text': 'var(--color-toast-foreground)',
          '--normal-border': 'var(--color-border)',
          '--border-radius': 'var(--radius)',
        } as React.CSSProperties
      }
      {...props}
    />
  );
}
