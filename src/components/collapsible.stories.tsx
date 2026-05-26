'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from './collapsible';
import { Button } from './button';
import { ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

const meta: Meta<typeof Collapsible> = {
  title: 'Components/Collapsible',
  component: Collapsible,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultCollapsible() {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-[350px] space-y-2">
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">@peduarte starred 3 repositories</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
          @radix-ui/primitives
        </div>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
            @radix-ui/colors
          </div>
          <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
            @stitches/react
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  },
};

export const DefaultOpen: Story = {
  render: () => (
    <Collapsible defaultOpen className="w-[350px] space-y-2">
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">Alert Details</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-2 text-sm">Severity: High</div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-2 text-sm">Source: Firewall</div>
        <div className="rounded-md border px-4 py-2 text-sm">IP: 192.168.1.100</div>
        <div className="rounded-md border px-4 py-2 text-sm">Port: 443</div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const WithCustomTrigger: Story = {
  render: function CustomTriggerCollapsible() {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-[350px]">
        <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border p-4 hover:bg-muted">
          <span className="font-medium">Click to expand</span>
          <ChevronsUpDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">
            This content is revealed when you click the trigger above.
          </p>
        </CollapsibleContent>
      </Collapsible>
    );
  },
};
