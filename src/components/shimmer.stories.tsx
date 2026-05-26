import type { Meta, StoryObj } from '@storybook/react';
import { ShimmerContent } from './shimmer';

const meta: Meta<typeof ShimmerContent> = {
  title: 'Components/Shimmer',
  component: ShimmerContent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="h-[200px] w-[300px]">
      <ShimmerContent />
    </div>
  ),
};

export const Rounded: Story = {
  render: () => (
    <div className="h-[200px] w-[300px]">
      <ShimmerContent rounded />
    </div>
  ),
};

export const CardLoading: Story = {
  render: () => (
    <div className="w-[350px] space-y-4 rounded-lg border p-4">
      <div className="h-4 w-3/4">
        <ShimmerContent rounded />
      </div>
      <div className="h-4 w-full">
        <ShimmerContent rounded />
      </div>
      <div className="h-4 w-5/6">
        <ShimmerContent rounded />
      </div>
      <div className="h-24 w-full">
        <ShimmerContent rounded />
      </div>
    </div>
  ),
};

export const TableLoading: Story = {
  render: () => (
    <div className="w-[500px] space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex gap-4 p-2">
          <div className="h-4 w-[80px]">
            <ShimmerContent rounded />
          </div>
          <div className="h-4 flex-1">
            <ShimmerContent rounded />
          </div>
          <div className="h-4 w-[100px]">
            <ShimmerContent rounded />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const AvatarLoading: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="h-12 w-12 overflow-hidden rounded-full">
        <ShimmerContent />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-[150px]">
          <ShimmerContent rounded />
        </div>
        <div className="h-3 w-[100px]">
          <ShimmerContent rounded />
        </div>
      </div>
    </div>
  ),
};

export const DashboardLoading: Story = {
  render: () => (
    <div className="grid w-[600px] grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="space-y-2 rounded-lg border p-4">
          <div className="h-3 w-1/2">
            <ShimmerContent rounded />
          </div>
          <div className="h-8 w-3/4">
            <ShimmerContent rounded />
          </div>
          <div className="h-3 w-2/3">
            <ShimmerContent rounded />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const ListLoading: Story = {
  render: () => (
    <div className="w-[350px] space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 rounded-lg border p-3">
          <div className="h-10 w-10 overflow-hidden rounded-md">
            <ShimmerContent />
          </div>
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4">
              <ShimmerContent rounded />
            </div>
            <div className="h-3 w-1/2">
              <ShimmerContent rounded />
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};
