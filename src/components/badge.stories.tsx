import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './badge';

const meta: Meta<typeof Badge> = {
  title: 'Primitives/Badge',
  component: Badge,
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = { args: { children: 'Badge' } };
export const Secondary: Story = { args: { children: 'Secondary', variant: 'secondary' } };
export const Destructive: Story = { args: { children: 'Destructive', variant: 'destructive' } };

export function SeverityExamples() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge className="border-severity-critical-border bg-severity-critical-bg text-severity-critical-text">Critical</Badge>
      <Badge className="border-severity-high-border bg-severity-high-bg text-severity-high-text">High</Badge>
      <Badge className="border-severity-medium-border bg-severity-medium-bg text-severity-medium-text">Medium</Badge>
      <Badge className="border-severity-low-border bg-severity-low-bg text-severity-low-text">Low</Badge>
    </div>
  );
}
