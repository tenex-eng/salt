import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './container';

const meta: Meta<typeof Container> = {
  title: 'Components/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Container className="bg-muted/50 py-8">
      <div className="rounded-lg border bg-background p-6">
        <h2 className="text-lg font-semibold">Default Container</h2>
        <p className="text-muted-foreground">max-w-7xl with responsive padding</p>
      </div>
    </Container>
  ),
};

export const Small: Story = {
  render: () => (
    <Container size="small" className="bg-muted/50 py-8">
      <div className="rounded-lg border bg-background p-6">
        <h2 className="text-lg font-semibold">Small Container</h2>
        <p className="text-muted-foreground">max-w-4xl - ideal for forms and focused content</p>
      </div>
    </Container>
  ),
};

export const Large: Story = {
  render: () => (
    <Container size="large" className="bg-muted/50 py-8">
      <div className="rounded-lg border bg-background p-6">
        <h2 className="text-lg font-semibold">Large Container</h2>
        <p className="text-muted-foreground">max-w-2xl - for wide dashboard layouts</p>
      </div>
    </Container>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4 py-8">
      <Container size="small" className="bg-blue-100/50 py-4 dark:bg-blue-900/20">
        <div className="rounded border bg-background p-4 text-center">Small (max-w-4xl)</div>
      </Container>
      <Container size="default" className="bg-green-100/50 py-4 dark:bg-green-900/20">
        <div className="rounded border bg-background p-4 text-center">Default (max-w-7xl)</div>
      </Container>
      <Container size="large" className="bg-purple-100/50 py-4 dark:bg-purple-900/20">
        <div className="rounded border bg-background p-4 text-center">Large (max-w-2xl)</div>
      </Container>
    </div>
  ),
};
