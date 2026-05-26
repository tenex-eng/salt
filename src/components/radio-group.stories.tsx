import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, RadioGroupItem } from './radio-group';
import { Label } from './label';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">Option Two</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-three" id="option-three" />
        <Label htmlFor="option-three">Option Three</Label>
      </div>
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable" className="flex gap-4">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  ),
};

export const SeveritySelector: Story = {
  render: () => (
    <div className="w-[300px]">
      <Label className="mb-3 block">Alert Severity</Label>
      <RadioGroup defaultValue="high">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="critical" id="critical" />
          <Label htmlFor="critical" className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            Critical
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="high" id="high" />
          <Label htmlFor="high" className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            High
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="medium" id="medium" />
          <Label htmlFor="medium" className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-yellow-500" />
            Medium
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="low" id="low" />
          <Label htmlFor="low" className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Low
          </Label>
        </div>
      </RadioGroup>
    </div>
  ),
};

export const WithDescriptions: Story = {
  render: () => (
    <RadioGroup defaultValue="email" className="w-[400px]">
      <div className="flex items-start space-x-3 rounded-lg border p-4">
        <RadioGroupItem value="email" id="email" className="mt-1" />
        <div className="space-y-1">
          <Label htmlFor="email" className="font-medium">
            Email Notifications
          </Label>
          <p className="text-sm text-muted-foreground">
            Receive notifications via email for important alerts.
          </p>
        </div>
      </div>
      <div className="flex items-start space-x-3 rounded-lg border p-4">
        <RadioGroupItem value="slack" id="slack" className="mt-1" />
        <div className="space-y-1">
          <Label htmlFor="slack" className="font-medium">
            Slack Notifications
          </Label>
          <p className="text-sm text-muted-foreground">
            Get real-time alerts in your Slack workspace.
          </p>
        </div>
      </div>
      <div className="flex items-start space-x-3 rounded-lg border p-4">
        <RadioGroupItem value="none" id="none" className="mt-1" />
        <div className="space-y-1">
          <Label htmlFor="none" className="font-medium">
            No Notifications
          </Label>
          <p className="text-sm text-muted-foreground">
            Only see alerts when you visit the dashboard.
          </p>
        </div>
      </div>
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="d1" />
        <Label htmlFor="d1">Available</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="d2" disabled />
        <Label htmlFor="d2" className="text-muted-foreground">
          Disabled
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-three" id="d3" />
        <Label htmlFor="d3">Available</Label>
      </div>
    </RadioGroup>
  ),
};
