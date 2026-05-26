import type { Meta, StoryObj } from '@storybook/react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './select';
import { Label } from './label';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
        <SelectItem value="grape">Grape</SelectItem>
        <SelectItem value="mango">Mango</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="status">Status</Label>
      <Select>
        <SelectTrigger id="status">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="open">Open</SelectItem>
          <SelectItem value="in-progress">In Progress</SelectItem>
          <SelectItem value="resolved">Resolved</SelectItem>
          <SelectItem value="closed">Closed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a timezone" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>North America</SelectLabel>
          <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
          <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
          <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Europe</SelectLabel>
          <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
          <SelectItem value="cet">Central European Time (CET)</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Asia</SelectLabel>
          <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
          <SelectItem value="ist">India Standard Time (IST)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const Severity: Story = {
  render: () => (
    <Select defaultValue="high">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select severity" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="critical">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            Critical
          </span>
        </SelectItem>
        <SelectItem value="high">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            High
          </span>
        </SelectItem>
        <SelectItem value="medium">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-yellow-500" />
            Medium
          </span>
        </SelectItem>
        <SelectItem value="low">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Low
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Disabled" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option">Option</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const DisabledItems: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select role" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="viewer">Viewer</SelectItem>
        <SelectItem value="analyst">Analyst</SelectItem>
        <SelectItem value="admin" disabled>
          Admin (Requires approval)
        </SelectItem>
        <SelectItem value="super-admin" disabled>
          Super Admin (Contact IT)
        </SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const FormExample: Story = {
  render: () => (
    <div className="grid w-[400px] gap-4">
      <div className="grid gap-1.5">
        <Label>Case Status</Label>
        <Select defaultValue="open">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label>Assigned To</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select analyst" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="john">John Analyst</SelectItem>
            <SelectItem value="jane">Jane Security</SelectItem>
            <SelectItem value="bob">Bob Investigator</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label>Priority</Label>
        <Select defaultValue="p2">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="p1">P1 - Critical</SelectItem>
            <SelectItem value="p2">P2 - High</SelectItem>
            <SelectItem value="p3">P3 - Medium</SelectItem>
            <SelectItem value="p4">P4 - Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
};
