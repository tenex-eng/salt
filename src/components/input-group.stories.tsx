import type { Meta, StoryObj } from '@storybook/react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
} from './input-group';
import { Search, Mail, DollarSign, Eye, Copy, Send, AtSign } from 'lucide-react';
import { Kbd } from './kbd';

const meta: Meta<typeof InputGroup> = {
  title: 'Components/InputGroup',
  component: InputGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[300px]">
      <InputGroup>
        <InputGroupAddon>
          <Search className="h-4 w-4" />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search..." />
      </InputGroup>
    </div>
  ),
};

export const WithPrefixText: Story = {
  render: () => (
    <div className="w-[300px]">
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="example.com" />
      </InputGroup>
    </div>
  ),
};

export const WithSuffixText: Story = {
  render: () => (
    <div className="w-[300px]">
      <InputGroup>
        <InputGroupInput placeholder="0.00" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>USD</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <InputGroup>
        <InputGroupAddon>
          <Mail className="h-4 w-4" />
        </InputGroupAddon>
        <InputGroupInput type="email" placeholder="Email address" />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <DollarSign className="h-4 w-4" />
        </InputGroupAddon>
        <InputGroupInput type="number" placeholder="Amount" />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <AtSign className="h-4 w-4" />
        </InputGroupAddon>
        <InputGroupInput placeholder="Username" />
      </InputGroup>
    </div>
  ),
};

export const WithButton: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon align="inline-end">
          <InputGroupButton>
            <Search className="h-4 w-4" />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput type="password" placeholder="Password" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-xs">
            <Eye className="h-4 w-4" />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

export const WithKeyboardShortcut: Story = {
  render: () => (
    <div className="w-[300px]">
      <InputGroup>
        <InputGroupAddon>
          <Search className="h-4 w-4" />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search cases..." />
        <InputGroupAddon align="inline-end">
          <Kbd>⌘K</Kbd>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

export const CopyInput: Story = {
  render: () => (
    <div className="w-[400px]">
      <InputGroup>
        <InputGroupInput defaultValue="sk-1234567890abcdef" readOnly />
        <InputGroupAddon align="inline-end">
          <InputGroupButton>
            <Copy className="h-4 w-4" />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

export const WithTextarea: Story = {
  render: () => (
    <div className="w-[400px]">
      <InputGroup>
        <InputGroupTextarea placeholder="Type your message..." rows={3} />
        <InputGroupAddon align="block-end">
          <InputGroupButton size="sm">
            <Send className="h-4 w-4" />
            Send
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div className="w-[300px]">
      <InputGroup>
        <InputGroupAddon>
          <Mail className="h-4 w-4" />
        </InputGroupAddon>
        <InputGroupInput
          type="email"
          placeholder="Email"
          defaultValue="invalid-email"
          aria-invalid="true"
        />
      </InputGroup>
      <p className="mt-1 text-sm text-destructive">Please enter a valid email address</p>
    </div>
  ),
};
