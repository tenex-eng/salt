import type { Meta, StoryObj } from '@storybook/react';
import { Kbd, KbdGroup } from './kbd';

const meta: Meta<typeof Kbd> = {
  title: 'Components/Kbd',
  component: Kbd,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Kbd>K</Kbd>,
};

export const Modifier: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Kbd>⌘</Kbd>
      <Kbd>⌥</Kbd>
      <Kbd>⇧</Kbd>
      <Kbd>⌃</Kbd>
    </div>
  ),
};

export const Combination: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  ),
};

export const CommonShortcuts: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm">Search</span>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm">Save</span>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>S</Kbd>
        </KbdGroup>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm">New Case</span>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>N</Kbd>
        </KbdGroup>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm">Close</span>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>W</Kbd>
        </KbdGroup>
      </div>
    </div>
  ),
};

export const SpecialKeys: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Kbd>Enter</Kbd>
      <Kbd>Tab</Kbd>
      <Kbd>Esc</Kbd>
      <Kbd>Space</Kbd>
    </div>
  ),
};

export const ArrowKeys: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Kbd>↑</Kbd>
      <Kbd>↓</Kbd>
      <Kbd>←</Kbd>
      <Kbd>→</Kbd>
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div className="rounded-lg border p-4">
      <p className="text-sm text-muted-foreground">
        Press{' '}
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>{' '}
        to open the command palette, or{' '}
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>⇧</Kbd>
          <Kbd>P</Kbd>
        </KbdGroup>{' '}
        to search for actions.
      </p>
    </div>
  ),
};
