'use client';

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SlidersHorizontal, X } from 'lucide-react';
import { Button } from '../button';
import {
  InlinePanelProvider,
  InlinePanel,
  InlinePanelHeader,
  InlinePanelBody,
  useInlinePanel,
} from './index';

const meta: Meta = {
  title: 'Components/InlineCollapsiblePanel',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

function ToggleButton({ label = 'Toggle panel' }: { label?: string }) {
  const { toggle } = useInlinePanel();
  return (
    <Button variant="ghost" size="icon" onClick={toggle} aria-label={label}>
      <SlidersHorizontal className="h-4 w-4" />
    </Button>
  );
}

function CloseButton() {
  const { close } = useInlinePanel();
  return (
    <Button variant="ghost" size="icon" onClick={close} aria-label="Close panel">
      <X className="h-4 w-4" />
    </Button>
  );
}

function MainArea({ title = 'Main content' }: { title?: string }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex h-10 items-center justify-between border-b px-4">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <ToggleButton />
      </div>
      <div className="flex-1 p-4">
        <div className="grid gap-3">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="h-12 rounded border bg-muted/30" />
          ))}
        </div>
      </div>
    </div>
  );
}

function PanelContent({ title = 'Filters' }: { title?: string }) {
  return (
    <>
      <InlinePanelHeader>
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <CloseButton />
      </InlinePanelHeader>
      <InlinePanelBody>
        <div className="p-4">
          <div className="grid gap-3">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="h-8 rounded border bg-muted/30" />
            ))}
          </div>
        </div>
      </InlinePanelBody>
    </>
  );
}

export const Default: Story = {
  render: () => (
    <div className="flex h-[500px] overflow-hidden rounded-lg border">
      <InlinePanelProvider storageKey="story:default">
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <MainArea />
          <InlinePanel>
            <PanelContent />
          </InlinePanel>
        </div>
      </InlinePanelProvider>
    </div>
  ),
};

export const DefaultOpen: Story = {
  render: () => (
    <div className="flex h-[500px] overflow-hidden rounded-lg border">
      <InlinePanelProvider storageKey="story:default-open" defaultOpen>
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <MainArea />
          <InlinePanel>
            <PanelContent />
          </InlinePanel>
        </div>
      </InlinePanelProvider>
    </div>
  ),
};

export const CustomWidth: Story = {
  render: () => (
    <div className="flex h-[500px] overflow-hidden rounded-lg border">
      <InlinePanelProvider storageKey="story:custom-width" defaultOpen>
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <MainArea />
          <InlinePanel width="32rem">
            <PanelContent title="Wide panel (32rem)" />
          </InlinePanel>
        </div>
      </InlinePanelProvider>
    </div>
  ),
};

export const WithScrollableContent: Story = {
  render: () => (
    <div className="flex h-[500px] overflow-hidden rounded-lg border">
      <InlinePanelProvider storageKey="story:scrollable" defaultOpen>
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <MainArea />
          <InlinePanel>
            <InlinePanelHeader>
              <span className="text-sm font-medium text-muted-foreground">Filters</span>
              <CloseButton />
            </InlinePanelHeader>
            <InlinePanelBody>
              <div className="p-4">
                <div className="grid gap-3">
                  {Array.from({ length: 20 }, (_, i) => (
                    <div key={i} className="flex h-10 items-center gap-2">
                      <div className="h-4 w-4 rounded border bg-muted" />
                      <div className="h-4 flex-1 rounded bg-muted/50" />
                    </div>
                  ))}
                </div>
              </div>
            </InlinePanelBody>
          </InlinePanel>
        </div>
      </InlinePanelProvider>
    </div>
  ),
};

export const Interactive: Story = {
  render: function InteractiveStory() {
    const [activeFilters, setActiveFilters] = useState(0);

    return (
      <div className="flex h-[600px] flex-col overflow-hidden rounded-lg border">
        <div className="flex h-12 items-center justify-between border-b px-4">
          <span className="font-medium">Results</span>
          {activeFilters > 0 && (
            <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
              {activeFilters} active
            </span>
          )}
        </div>
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <InlinePanelProvider storageKey="story:interactive" defaultOpen>
            <div className="flex min-h-0 flex-1 overflow-hidden">
              <div className="flex min-h-0 flex-1 flex-col">
                <div className="flex h-10 items-center justify-between border-b px-4">
                  <span className="text-sm text-muted-foreground">Showing 142 items</span>
                  <ToggleButton label="Toggle filters" />
                </div>
                <div className="flex-1 overflow-auto p-4">
                  <div className="grid gap-2">
                    {Array.from({ length: 12 }, (_, i) => (
                      <div key={i} className="flex h-14 items-center gap-3 rounded border px-4">
                        <div className="h-4 w-4 rounded bg-muted" />
                        <div className="flex flex-1 flex-col gap-1">
                          <div className="h-3 w-48 rounded bg-muted" />
                          <div className="h-3 w-32 rounded bg-muted/50" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <InlinePanel>
                <InlinePanelHeader>
                  <span className="text-sm font-medium text-muted-foreground">Filters</span>
                  <div className="flex items-center gap-1">
                    {activeFilters > 0 && (
                      <Button variant="ghost" size="sm" onClick={() => setActiveFilters(0)}>
                        Reset
                      </Button>
                    )}
                    <CloseButton />
                  </div>
                </InlinePanelHeader>
                <InlinePanelBody>
                  <div className="p-4">
                    <div className="grid gap-4">
                      {['Status', 'Severity', 'Type', 'Source'].map(label => (
                        <div key={label} className="flex flex-col gap-2">
                          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            {label}
                          </span>
                          <div className="grid gap-1">
                            {['Option A', 'Option B', 'Option C'].map(opt => (
                              <label
                                key={opt}
                                className="flex cursor-pointer items-center gap-2 text-sm"
                              >
                                <input
                                  type="checkbox"
                                  className="h-4 w-4 rounded border"
                                  onChange={e =>
                                    setActiveFilters(prev => prev + (e.target.checked ? 1 : -1))
                                  }
                                />
                                {opt}
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </InlinePanelBody>
              </InlinePanel>
            </div>
          </InlinePanelProvider>
        </div>
      </div>
    );
  },
};
