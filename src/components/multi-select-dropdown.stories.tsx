'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { MultiSelectDropdown, type MultiSelectOption } from './multi-select-dropdown';
import { useState } from 'react';
import { Badge } from './badge';

const meta: Meta<typeof MultiSelectDropdown> = {
  title: 'Components/MultiSelectDropdown',
  component: MultiSelectDropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const statusOptions: MultiSelectOption[] = [
  { value: 'open', label: 'Open' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'closed', label: 'Closed' },
];

export const Default: Story = {
  render: function DefaultStory() {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <MultiSelectDropdown
        placeholder="Status"
        options={statusOptions}
        selected={selected}
        onChange={setSelected}
      />
    );
  },
};

export const WithSelection: Story = {
  render: function WithSelectionStory() {
    const [selected, setSelected] = useState<string[]>(['open', 'in-progress']);
    return (
      <MultiSelectDropdown
        placeholder="Status"
        options={statusOptions}
        selected={selected}
        onChange={setSelected}
      />
    );
  },
};

const severityOptions: MultiSelectOption[] = [
  { value: 'critical', label: 'Critical' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
  { value: 'info', label: 'Informational' },
];

export const Severity: Story = {
  render: function SeverityStory() {
    const [selected, setSelected] = useState<string[]>(['critical', 'high']);
    return (
      <MultiSelectDropdown
        placeholder="Severity"
        options={severityOptions}
        selected={selected}
        onChange={setSelected}
        width={200}
      />
    );
  },
};

const tenantOptions: MultiSelectOption[] = [
  { value: 'tenant-1', label: 'Acme Corp', searchableText: 'acme corp tenant-1' },
  { value: 'tenant-2', label: 'TechStart Inc', searchableText: 'techstart inc tenant-2' },
  { value: 'tenant-3', label: 'Global Systems', searchableText: 'global systems tenant-3' },
  { value: 'tenant-4', label: 'DataFlow Ltd', searchableText: 'dataflow ltd tenant-4' },
  { value: 'tenant-5', label: 'SecureNet', searchableText: 'securenet tenant-5' },
];

export const WithSearch: Story = {
  render: function WithSearchStory() {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <MultiSelectDropdown
        placeholder="Tenants"
        options={tenantOptions}
        selected={selected}
        onChange={setSelected}
        width={220}
      />
    );
  },
};

export const NoSearch: Story = {
  render: function NoSearchStory() {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <MultiSelectDropdown
        placeholder="Priority"
        options={[
          { value: 'p1', label: 'P1 - Critical' },
          { value: 'p2', label: 'P2 - High' },
          { value: 'p3', label: 'P3 - Medium' },
          { value: 'p4', label: 'P4 - Low' },
        ]}
        selected={selected}
        onChange={setSelected}
        disableSearch
        width={180}
      />
    );
  },
};

export const CustomRender: Story = {
  render: function CustomRenderStory() {
    const [selected, setSelected] = useState<string[]>([]);
    const options: MultiSelectOption[] = [
      { value: 'critical', label: 'Critical' },
      { value: 'high', label: 'High' },
      { value: 'medium', label: 'Medium' },
      { value: 'low', label: 'Low' },
    ];

    const severityColors: Record<string, string> = {
      critical: 'bg-red-500',
      high: 'bg-orange-500',
      medium: 'bg-yellow-500',
      low: 'bg-green-500',
    };

    return (
      <MultiSelectDropdown
        placeholder="Severity"
        options={options}
        selected={selected}
        onChange={setSelected}
        width={200}
        renderOption={(option, isSelected) => (
          <span className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${severityColors[option.value]}`} />
            <span className="text-sm">{option.label}</span>
            {isSelected && (
              <Badge variant="secondary" className="ml-auto">
                Selected
              </Badge>
            )}
          </span>
        )}
      />
    );
  },
};

export const NoClearButton: Story = {
  render: function NoClearButtonStory() {
    const [selected, setSelected] = useState<string[]>(['open']);
    return (
      <MultiSelectDropdown
        placeholder="Status"
        options={statusOptions}
        selected={selected}
        onChange={setSelected}
        showClearButton={false}
      />
    );
  },
};
