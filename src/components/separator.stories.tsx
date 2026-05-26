import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from './separator';

const meta: Meta<typeof Separator> = {
  title: 'Components/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-[300px]">
      <div className="space-y-1">
        <h4 className="text-sm leading-none font-medium">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">An open-source UI component library.</p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-10 items-center space-x-4 text-sm">
      <div>Home</div>
      <Separator orientation="vertical" />
      <div>Dashboard</div>
      <Separator orientation="vertical" />
      <div>Settings</div>
    </div>
  ),
};

export const InMenu: Story = {
  render: () => (
    <div className="w-[200px] rounded-md border p-2">
      <div className="px-2 py-1.5 text-sm font-semibold">My Account</div>
      <Separator className="my-1" />
      <div className="space-y-1">
        <div className="cursor-pointer rounded px-2 py-1.5 text-sm hover:bg-accent">Profile</div>
        <div className="cursor-pointer rounded px-2 py-1.5 text-sm hover:bg-accent">Billing</div>
        <div className="cursor-pointer rounded px-2 py-1.5 text-sm hover:bg-accent">Settings</div>
      </div>
      <Separator className="my-1" />
      <div className="cursor-pointer rounded px-2 py-1.5 text-sm text-destructive hover:bg-accent">
        Log out
      </div>
    </div>
  ),
};

export const InList: Story = {
  render: () => (
    <div className="w-[300px] space-y-0">
      {['Alert #1234', 'Alert #1235', 'Alert #1236'].map((item, index) => (
        <div key={item}>
          {index > 0 && <Separator />}
          <div className="flex items-center justify-between py-3">
            <span className="text-sm">{item}</span>
            <span className="text-xs text-muted-foreground">2 hours ago</span>
          </div>
        </div>
      ))}
    </div>
  ),
};
