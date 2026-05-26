'use client';

import { createContext, useContext, useState } from 'react';
import { cn } from '../../lib/utils';
import type {
  InlinePanelContextValue,
  InlinePanelProviderProps,
  InlinePanelProps,
  InlinePanelSubProps,
} from './types';
import { DEFAULT_PANEL_WIDTH } from './constants';

const InlinePanelContext = createContext<InlinePanelContextValue | null>(null);

const readStorage = (key: string): boolean | null => {
  try {
    const value = localStorage.getItem(key);
    return value === null ? null : value === '1';
  } catch {
    return null;
  }
};

const writeStorage = (key: string, open: boolean) => {
  try {
    localStorage.setItem(key, open ? '1' : '0');
  } catch {
    // storage unavailable — in-memory state still works
  }
};

export function InlinePanelProvider({
  storageKey,
  defaultOpen = false,
  children,
}: InlinePanelProviderProps) {
  const [open, setOpenState] = useState(() => readStorage(storageKey) ?? defaultOpen);

  const setOpen = (next: boolean) => {
    setOpenState(next);
    writeStorage(storageKey, next);
  };

  const toggle = () =>
    setOpenState(prev => {
      const next = !prev;
      writeStorage(storageKey, next);
      return next;
    });

  const close = () => setOpen(false);

  return (
    <InlinePanelContext.Provider value={{ open, toggle, close, setOpen }}>
      {children}
    </InlinePanelContext.Provider>
  );
}

export function useInlinePanel(): InlinePanelContextValue {
  const ctx = useContext(InlinePanelContext);
  if (!ctx) throw new Error('useInlinePanel must be used within InlinePanelProvider');
  return ctx;
}

export function InlinePanel({
  width = DEFAULT_PANEL_WIDTH,
  className,
  children,
}: InlinePanelProps) {
  const { open } = useInlinePanel();
  return (
    <aside
      aria-label="Side panel"
      style={{ width: open ? width : 0 }}
      className={cn(
        'relative flex h-full flex-col overflow-hidden border-l transition-[width] duration-200',
        className
      )}
    >
      <div style={{ width }} className="flex h-full flex-col">
        {children}
      </div>
    </aside>
  );
}

export function InlinePanelHeader({ className, children }: InlinePanelSubProps) {
  return (
    <header
      className={cn(
        'flex h-10 shrink-0 items-center justify-between border-b bg-background px-4',
        className
      )}
    >
      {children}
    </header>
  );
}

export function InlinePanelBody({ className, children }: InlinePanelSubProps) {
  return <section className={cn('min-h-0 flex-1 overflow-auto', className)}>{children}</section>;
}
