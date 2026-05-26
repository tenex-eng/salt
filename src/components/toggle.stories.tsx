import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './toggle';
import { ToggleGroup, ToggleGroupItem } from './toggle-group';
import { useState } from 'react';
import { Button } from './button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Sun,
  Moon,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Toggle aria-label="Toggle bold">
      <Bold className="h-4 w-4" />
    </Toggle>
  ),
};

export const WithText: Story = {
  render: () => (
    <Toggle aria-label="Toggle italic">
      <Italic className="h-4 w-4" />
      Italic
    </Toggle>
  ),
};

export const Outline: Story = {
  render: () => (
    <Toggle variant="outline" aria-label="Toggle underline">
      <Underline className="h-4 w-4" />
    </Toggle>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Toggle size="sm" aria-label="Small toggle">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle size="default" aria-label="Default toggle">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle size="lg" aria-label="Large toggle">
        <Bold className="h-4 w-4" />
      </Toggle>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Toggle disabled aria-label="Disabled toggle">
      <Bold className="h-4 w-4" />
    </Toggle>
  ),
};

export const Pressed: Story = {
  render: () => (
    <Toggle defaultPressed aria-label="Pressed toggle">
      <Bold className="h-4 w-4" />
    </Toggle>
  ),
};

export const FormattingToolbar: Story = {
  render: () => (
    <div className="flex items-center gap-1 rounded-md border p-1">
      <Toggle aria-label="Bold" size="sm">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Italic" size="sm">
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Underline" size="sm">
        <Underline className="h-4 w-4" />
      </Toggle>
    </div>
  ),
};

export const ToggleGroupSingle: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="center">
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeft className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenter className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRight className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const ToggleGroupMultiple: Story = {
  render: () => (
    <ToggleGroup type="multiple" defaultValue={['bold', 'italic']}>
      <ToggleGroupItem value="bold" aria-label="Bold">
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline">
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const ToggleGroupOutline: Story = {
  render: () => (
    <ToggleGroup type="single" variant="outline" defaultValue="left">
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeft className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenter className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRight className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const ToggleGroupSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ToggleGroup type="single" size="sm" defaultValue="left">
        <ToggleGroupItem value="left">
          <AlignLeft className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="center">
          <AlignCenter className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="right">
          <AlignRight className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" size="default" defaultValue="left">
        <ToggleGroupItem value="left">
          <AlignLeft className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="center">
          <AlignCenter className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="right">
          <AlignRight className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" size="lg" defaultValue="left">
        <ToggleGroupItem value="left">
          <AlignLeft className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="center">
          <AlignCenter className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="right">
          <AlignRight className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
};

export const ThemeToggle: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="light">
      <ToggleGroupItem value="light" aria-label="Light mode">
        <Sun className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="dark" aria-label="Dark mode">
        <Moon className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

/**
 * Binary on/off panel toggles — modeled on CasePageHeader.
 * Any binary state button should use Toggle, not Button.
 */
export const PanelToggles: Story = {
  render: function PanelTogglesStory() {
    const [assistant, setAssistant] = useState(false);
    const [playbooks, setPlaybooks] = useState(false);

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Toggle variant="outline" pressed={assistant} onPressedChange={setAssistant}>
            Assistant
          </Toggle>
          <Toggle variant="outline" pressed={playbooks} onPressedChange={setPlaybooks}>
            Playbooks
          </Toggle>
        </div>
        <p className="text-xs text-muted-foreground">
          Binary state = Toggle. Pressed state is visually distinct.
        </p>
      </div>
    );
  },
};

/**
 * Toggle vs Button — when to use which.
 *
 * - Toggle: binary on/off state (panels, modes, features)
 * - Button: one-shot actions (create, delete, submit)
 * - Button with chevron: expand/collapse (NOT Toggle — reverted after testing)
 * - Select: status filters (NOT toggle buttons)
 */
export const ToggleVsButton: Story = {
  render: function ToggleVsButtonStory() {
    const [panelOpen, setPanelOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);

    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium">Toggle — binary state</span>
          <div className="flex gap-2">
            <Toggle variant="outline" pressed={panelOpen} onPressedChange={setPanelOpen}>
              Assistant
            </Toggle>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium">Button — one-shot action</span>
          <div className="flex gap-2">
            <Button>Create Case</Button>
            <Button variant="destructive">Delete</Button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium">Button with chevron — expand/collapse</span>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setExpanded(!expanded)}>
              {expanded ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
              {expanded ? 'Collapse All' : 'Expand All'}
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium">Select — status filters</span>
          <Select defaultValue="all">
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  },
};
