import type { Meta, StoryObj } from '@storybook/react';
import { ButtonGroup, ButtonGroupText, ButtonGroupSeparator } from './button-group';
import { Button } from './button';
import { ChevronDown, Plus, Minus, Bold, Italic, Underline } from 'lucide-react';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Left</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Right</Button>
    </ButtonGroup>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline" size="icon">
        <Bold className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon">
        <Italic className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon">
        <Underline className="h-4 w-4" />
      </Button>
    </ButtonGroup>
  ),
};

export const WithText: Story = {
  render: () => (
    <ButtonGroup>
      <ButtonGroupText>Quantity:</ButtonGroupText>
      <Button variant="outline" size="icon">
        <Minus className="h-4 w-4" />
      </Button>
      <ButtonGroupText className="w-12 justify-center">5</ButtonGroupText>
      <Button variant="outline" size="icon">
        <Plus className="h-4 w-4" />
      </Button>
    </ButtonGroup>
  ),
};

export const WithSeparator: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Save</Button>
      <ButtonGroupSeparator />
      <Button variant="outline" size="icon">
        <ChevronDown className="h-4 w-4" />
      </Button>
    </ButtonGroup>
  ),
};

export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical">
      <Button variant="outline">Top</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Bottom</Button>
    </ButtonGroup>
  ),
};

export const SplitButton: Story = {
  render: () => (
    <ButtonGroup>
      <Button>Create Alert</Button>
      <ButtonGroupSeparator />
      <Button size="icon">
        <ChevronDown className="h-4 w-4" />
      </Button>
    </ButtonGroup>
  ),
};
