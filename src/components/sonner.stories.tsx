import type { Meta, StoryObj } from '@storybook/react';
import { Toaster } from './sonner';
import { Button } from './button';
import { toast } from 'sonner';

const meta: Meta<typeof Toaster> = {
  title: 'Components/Sonner',
  component: Toaster,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Button variant="outline" onClick={() => toast('Event has been created')}>
      Show Toast
    </Button>
  ),
};

export const Success: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast.success('Case resolved', {
          description: 'Case #1234 has been marked as resolved.',
        })
      }
    >
      Show Success
    </Button>
  ),
};

export const Error: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast.error('Failed to save', {
          description: 'There was an error saving your changes.',
        })
      }
    >
      Show Error
    </Button>
  ),
};

export const Warning: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast.warning('Session expiring', {
          description: 'Your session will expire in 5 minutes.',
        })
      }
    >
      Show Warning
    </Button>
  ),
};

export const Info: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast.info('New alert received', {
          description: 'A new high-severity alert has been created.',
        })
      }
    >
      Show Info
    </Button>
  ),
};

export const Loading: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() => {
        const loadingToast = toast.loading('Processing...');
        setTimeout(() => {
          toast.success('Done!', { id: loadingToast });
        }, 2000);
      }}
    >
      Show Loading
    </Button>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast('Alert assigned', {
          description: 'Alert #5678 has been assigned to you.',
          action: {
            label: 'View',
            onClick: () => console.log('View clicked'),
          },
        })
      }
    >
      Show With Action
    </Button>
  ),
};

export const Promise: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() => {
        const promise = new Promise(resolve => setTimeout(resolve, 2000));
        toast.promise(promise, {
          loading: 'Saving changes...',
          success: 'Changes saved successfully!',
          error: 'Failed to save changes',
        });
      }}
    >
      Show Promise
    </Button>
  ),
};

export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => toast('Default toast message')}>
        Default
      </Button>
      <Button variant="outline" onClick={() => toast.success('Success message')}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast.error('Error message')}>
        Error
      </Button>
      <Button variant="outline" onClick={() => toast.warning('Warning message')}>
        Warning
      </Button>
      <Button variant="outline" onClick={() => toast.info('Info message')}>
        Info
      </Button>
    </div>
  ),
};

export const SecurityAlerts: Story = {
  render: () => (
    <div className="flex w-[300px] flex-col gap-2">
      <Button
        variant="destructive"
        onClick={() =>
          toast.error('Critical Alert', {
            description: 'Suspicious activity detected from IP 192.168.1.100',
          })
        }
      >
        Critical Alert
      </Button>
      <Button
        className="bg-orange-500 hover:bg-orange-600"
        onClick={() =>
          toast.warning('High Severity Alert', {
            description: 'Multiple failed login attempts detected',
          })
        }
      >
        High Alert
      </Button>
      <Button
        onClick={() =>
          toast.success('Alert Resolved', {
            description: 'Case #1234 has been marked as false positive',
          })
        }
      >
        Resolved
      </Button>
    </div>
  ),
};
