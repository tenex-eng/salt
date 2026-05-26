import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './textarea';
import { Label } from './label';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
    rows: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
  },
  decorators: [
    Story => (
      <div className="w-[350px]">
        <Story />
      </div>
    ),
  ],
};

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-[350px] gap-1.5">
      <Label htmlFor="message">Message</Label>
      <Textarea id="message" placeholder="Type your message here..." />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled textarea',
    value: 'This content cannot be edited',
  },
  decorators: [
    Story => (
      <div className="w-[350px]">
        <Story />
      </div>
    ),
  ],
};

export const WithError: Story = {
  render: () => (
    <div className="grid w-[350px] gap-1.5">
      <Label htmlFor="error-textarea">Description</Label>
      <Textarea id="error-textarea" aria-invalid="true" defaultValue="Too short" />
      <p className="text-sm text-destructive">Description must be at least 20 characters</p>
    </div>
  ),
};

export const WithCharacterCount: Story = {
  render: function TextareaWithCount() {
    const maxLength = 200;
    const text =
      'This is an example of a textarea with character counting. It helps users know how much more they can type.';
    return (
      <div className="grid w-[350px] gap-1.5">
        <Label htmlFor="counted">Bio</Label>
        <Textarea id="counted" defaultValue={text} maxLength={maxLength} />
        <p className="text-right text-sm text-muted-foreground">
          {text.length}/{maxLength}
        </p>
      </div>
    );
  },
};
