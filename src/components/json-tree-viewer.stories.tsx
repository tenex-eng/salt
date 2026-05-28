import type { Meta, StoryObj } from '@storybook/react';
import { JsonTreeViewer } from './json-tree-viewer';

const sample = {
  id: 'evt_123',
  type: 'user.updated',
  active: true,
  retryCount: 2,
  actor: {
    id: 'usr_456',
    email: 'alex@example.com',
    roles: ['admin', 'analyst'],
  },
  changes: [
    { field: 'name', from: 'Alex', to: 'Alex Morgan' },
    { field: 'status', from: null, to: 'active' },
  ],
};

const meta: Meta<typeof JsonTreeViewer> = {
  title: 'Components/JsonTreeViewer',
  component: JsonTreeViewer,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[520px] rounded-lg border bg-card p-4 font-mono text-sm">
      <JsonTreeViewer data={sample} />
    </div>
  ),
};

export const RootMode: Story = {
  render: () => (
    <div className="w-[520px] rounded-lg border bg-card p-4 font-mono text-sm">
      <JsonTreeViewer data={sample} root />
    </div>
  ),
};

export const PrimitiveValues: Story = {
  render: () => (
    <div className="grid w-[360px] gap-3 rounded-lg border bg-card p-4 font-mono text-sm">
      <JsonTreeViewer data="hello" />
      <JsonTreeViewer data={42} />
      <JsonTreeViewer data={false} />
      <JsonTreeViewer data={null} />
      <JsonTreeViewer data={[]} />
      <JsonTreeViewer data={{}} />
    </div>
  ),
};
