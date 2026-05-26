import type { Meta, StoryObj } from '@storybook/react';
import { JsonDiffViewer } from './json-diff-viewer';

const meta: Meta<typeof JsonDiffViewer> = {
  title: 'Components/JsonDiffViewer',
  component: JsonDiffViewer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[500px]">
      <JsonDiffViewer
        current={{
          name: 'John Doe',
          email: 'john@example.com',
          role: 'admin',
        }}
      />
    </div>
  ),
};

export const WithChanges: Story = {
  render: () => (
    <div className="w-[500px]">
      <JsonDiffViewer
        current={{
          name: 'John Doe',
          email: 'john.doe@example.com',
          role: 'admin',
          active: true,
        }}
        compare={{
          name: 'John Doe',
          email: 'john@example.com',
          role: 'user',
        }}
      />
    </div>
  ),
};

export const AlertDiff: Story = {
  render: () => (
    <div className="w-[600px]">
      <JsonDiffViewer
        current={{
          alertId: 'ALT-1234',
          status: 'resolved',
          severity: 'medium',
          assignee: 'analyst@company.com',
          notes: 'False positive - legitimate admin activity',
          updatedAt: '2024-01-15T14:30:00Z',
        }}
        compare={{
          alertId: 'ALT-1234',
          status: 'open',
          severity: 'high',
          assignee: null,
          updatedAt: '2024-01-15T10:00:00Z',
        }}
      />
    </div>
  ),
};

export const NestedObjects: Story = {
  render: () => (
    <div className="w-[600px]">
      <JsonDiffViewer
        current={{
          case: {
            id: 'CASE-001',
            title: 'Suspicious Login Activity',
            priority: 'high',
            tags: ['authentication', 'suspicious', 'reviewed'],
          },
          metadata: {
            createdBy: 'system',
            updatedBy: 'analyst@company.com',
          },
        }}
        compare={{
          case: {
            id: 'CASE-001',
            title: 'Suspicious Login',
            priority: 'medium',
            tags: ['authentication', 'suspicious'],
          },
          metadata: {
            createdBy: 'system',
          },
        }}
      />
    </div>
  ),
};

export const ArrayChanges: Story = {
  render: () => (
    <div className="w-[500px]">
      <JsonDiffViewer
        current={{
          indicators: ['192.168.1.100', '10.0.0.50', 'malware.evil.com'],
          ports: [443, 8080, 22],
        }}
        compare={{
          indicators: ['192.168.1.100', '10.0.0.25'],
          ports: [443, 80],
        }}
      />
    </div>
  ),
};

export const LargeObject: Story = {
  render: () => (
    <div className="w-[600px]">
      <JsonDiffViewer
        current={{
          event: {
            type: 'NETWORK_CONNECTION',
            timestamp: '2024-01-15T14:30:00Z',
            source: {
              ip: '192.168.1.100',
              port: 54321,
              hostname: 'workstation-01',
            },
            destination: {
              ip: '10.0.0.1',
              port: 443,
              hostname: 'api.internal.com',
            },
            protocol: 'HTTPS',
            bytes: 1024,
          },
        }}
        maxDepth={5}
      />
    </div>
  ),
};
