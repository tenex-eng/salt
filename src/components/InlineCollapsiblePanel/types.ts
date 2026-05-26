import type { ReactNode } from 'react';

export type InlinePanelContextValue = {
  open: boolean;
  toggle: () => void;
  close: () => void;
  setOpen: (open: boolean) => void;
};

export type InlinePanelProviderProps = {
  storageKey: string;
  defaultOpen?: boolean;
  children: ReactNode;
};

export type InlinePanelProps = {
  width?: string;
  className?: string;
  children: ReactNode;
};

export type InlinePanelSubProps = {
  className?: string;
  children: ReactNode;
};
