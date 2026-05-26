import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert, AlertDescription, AlertTitle } from './alert';

const meta: Meta<typeof Alert> = { title: 'Components/Alert', component: Alert };
export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>Salt alert content.</AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive">
      <AlertTitle>Critical</AlertTitle>
      <AlertDescription>Something needs attention.</AlertDescription>
    </Alert>
  ),
};
