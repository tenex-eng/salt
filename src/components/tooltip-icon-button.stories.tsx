import type { Meta, StoryObj } from '@storybook/react';
import { TooltipIconButton } from './tooltip-icon-button';
import { Copy, Share, Download, Trash2, Edit, Eye, Plus, Settings, Bookmark } from 'lucide-react';

const meta: Meta<typeof TooltipIconButton> = {
  title: 'Components/TooltipIconButton',
  component: TooltipIconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <Copy className="h-4 w-4" />,
    label: 'Copy to clipboard',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <TooltipIconButton icon={<Copy className="h-4 w-4" />} label="Copy" />
      <TooltipIconButton icon={<Share className="h-4 w-4" />} label="Share" />
      <TooltipIconButton icon={<Download className="h-4 w-4" />} label="Download" />
      <TooltipIconButton icon={<Edit className="h-4 w-4" />} label="Edit" />
      <TooltipIconButton icon={<Eye className="h-4 w-4" />} label="View" />
    </div>
  ),
};

export const Actions: Story = {
  render: () => (
    <div className="flex items-center gap-2 rounded-lg border p-4">
      <span className="mr-4 text-sm font-medium">Case #1234</span>
      <TooltipIconButton
        icon={<Eye className="h-4 w-4" />}
        label="View details"
        onClick={() => console.log('View clicked')}
      />
      <TooltipIconButton
        icon={<Edit className="h-4 w-4" />}
        label="Edit case"
        onClick={() => console.log('Edit clicked')}
      />
      <TooltipIconButton
        icon={<Bookmark className="h-4 w-4" />}
        label="Bookmark"
        onClick={() => console.log('Bookmark clicked')}
      />
      <TooltipIconButton
        icon={<Trash2 className="h-4 w-4" />}
        label="Delete case"
        onClick={() => console.log('Delete clicked')}
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <TooltipIconButton icon={<Copy className="h-4 w-4" />} label="Copy" />
      <TooltipIconButton icon={<Share className="h-4 w-4" />} label="Share (Disabled)" disabled />
      <TooltipIconButton icon={<Download className="h-4 w-4" />} label="Download" />
    </div>
  ),
};

export const WithCustomClass: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <TooltipIconButton
        icon={<Plus className="h-4 w-4" />}
        label="Add new"
        className="border-primary text-primary hover:bg-primary/10"
      />
      <TooltipIconButton
        icon={<Trash2 className="h-4 w-4" />}
        label="Delete"
        className="border-destructive text-destructive hover:bg-destructive/10"
      />
      <TooltipIconButton
        icon={<Settings className="h-4 w-4" />}
        label="Settings"
        className="border-muted-foreground"
      />
    </div>
  ),
};

export const InToolbar: Story = {
  render: () => (
    <div className="flex items-center gap-1 rounded-lg border bg-muted/50 p-1">
      <TooltipIconButton icon={<Copy className="h-4 w-4" />} label="Copy" />
      <TooltipIconButton icon={<Share className="h-4 w-4" />} label="Share" />
      <div className="mx-1 h-6 w-px bg-border" />
      <TooltipIconButton icon={<Edit className="h-4 w-4" />} label="Edit" />
      <TooltipIconButton icon={<Trash2 className="h-4 w-4" />} label="Delete" />
    </div>
  ),
};

export const InCard: Story = {
  render: () => (
    <div className="w-[300px] rounded-lg border p-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium">Alert #5678</h3>
          <p className="text-sm text-muted-foreground">Suspicious login attempt detected</p>
        </div>
        <div className="flex gap-1">
          <TooltipIconButton icon={<Eye className="h-4 w-4" />} label="View details" />
          <TooltipIconButton icon={<Copy className="h-4 w-4" />} label="Copy ID" />
        </div>
      </div>
    </div>
  ),
};
