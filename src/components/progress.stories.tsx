import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './progress';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
  },
  decorators: [
    Story => (
      <div className="w-[350px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 60,
  },
};

export const Empty: Story = {
  args: {
    value: 0,
  },
};

export const Quarter: Story = {
  args: {
    value: 25,
  },
};

export const Half: Story = {
  args: {
    value: 50,
  },
};

export const ThreeQuarters: Story = {
  args: {
    value: 75,
  },
};

export const Complete: Story = {
  args: {
    value: 100,
  },
};

export const WithLabel: Story = {
  render: () => {
    const value = 66;
    return (
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>{value}%</span>
        </div>
        <Progress value={value} />
      </div>
    );
  },
};

export const MultipleProgress: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span>Alerts Processed</span>
          <span className="tabular-nums">85%</span>
        </div>
        <Progress value={85} />
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span>Cases Closed</span>
          <span className="tabular-nums">42%</span>
        </div>
        <Progress value={42} />
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span>SLA Compliance</span>
          <span className="tabular-nums">98%</span>
        </div>
        <Progress value={98} />
      </div>
    </div>
  ),
};
