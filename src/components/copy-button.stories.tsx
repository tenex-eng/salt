import type { Meta, StoryObj } from '@storybook/react';
import { CopyButton } from './copy-button';

const meta: Meta<typeof CopyButton> = {
  title: 'Components/CopyButton',
  component: CopyButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    getText: () => 'Text to copy',
  },
};

export const WithCode: Story = {
  render: () => (
    <div className="flex items-center gap-2 rounded-md border bg-muted p-3">
      <code className="flex-1 font-mono text-sm">npm install @radix-ui/react-dialog</code>
      <CopyButton getText={() => 'npm install @radix-ui/react-dialog'} />
    </div>
  ),
};

export const WithIPAddress: Story = {
  render: () => (
    <div className="flex items-center gap-2 rounded-md border p-3">
      <span className="font-mono text-sm">192.168.1.100</span>
      <CopyButton getText={() => '192.168.1.100'} />
    </div>
  ),
};

export const InCard: Story = {
  render: () => (
    <div className="w-[300px] rounded-lg border p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium">API Key</span>
        <CopyButton getText={() => 'sk-1234567890abcdef'} />
      </div>
      <code className="block rounded bg-muted p-2 font-mono text-xs">sk-1234...cdef</code>
    </div>
  ),
};
