import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';
import { Mail, Loader2, Plus } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon', 'icon-sm', 'icon-lg'],
    },
    disabled: {
      control: 'boolean',
    },
    asChild: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Button' },
};

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Delete' },
};

export const Outline: Story = {
  args: { variant: 'outline', children: 'Outline' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Ghost' },
};

export const Link: Story = {
  args: { variant: 'link', children: 'Link' },
};

export const Small: Story = {
  args: { size: 'sm', children: 'Small' },
};

export const Large: Story = {
  args: { size: 'lg', children: 'Large' },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Mail /> Login with Email
      </>
    ),
  },
};

export const IconOnly: Story = {
  args: { size: 'icon', children: <Mail /> },
};

export const Disabled: Story = {
  args: { disabled: true, children: 'Disabled' },
};

export const Loading: Story = {
  args: {
    disabled: true,
    children: (
      <>
        <Loader2 className="animate-spin" /> Please wait
      </>
    ),
  },
};

/**
 * Correct: Button owns icon-to-text gap via flex `gap-2` in CVA base class.
 * Icons need no spacing utilities — the component handles it.
 */
export const IconSpacingCorrect: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Button>
          <Mail className="size-4" />
          Send Email
        </Button>
        <Button variant="outline">
          <Loader2 className="size-4" />
          Processing
        </Button>
        <Button size="sm">
          <Plus className="size-4" />
          Add Item
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Button CVA includes <code>gap-2</code> — icons and text space themselves.
      </p>
    </div>
  ),
};

/**
 * Anti-pattern: Adding `mr-2` to icons inside buttons.
 * This doubles the gap since Button already applies `gap-2`.
 * Never add margin utilities to icons inside buttons.
 */
export const IconSpacingAntiPattern: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Button>
          <Mail className="mr-2 size-4" />
          Wrong — mr-2
        </Button>
        <Button>
          <Mail className="size-4" />
          Correct — no margin
        </Button>
      </div>
      <p className="text-xs text-destructive">
        Left button has doubled spacing from <code>mr-2</code> + <code>gap-2</code>.
      </p>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button>Default</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="flex items-center gap-2">
        <Button size="sm">Small</Button>
        <Button>Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" aria-label="Mail">
          <Mail />
        </Button>
        <Button size="icon-sm">
          <Mail />
        </Button>
        <Button size="icon-lg">
          <Mail />
        </Button>
      </div>
    </div>
  ),
};
