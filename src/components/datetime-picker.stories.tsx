'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { DateTimePicker, TimePicker } from './datetime-picker';
import { useState } from 'react';

const meta: Meta<typeof DateTimePicker> = {
  title: 'Components/DateTimePicker',
  component: DateTimePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultPicker() {
    const [date, setDate] = useState<Date | undefined>();
    return (
      <div className="w-[300px]">
        <DateTimePicker value={date} onChange={setDate} placeholder="Select date and time" />
      </div>
    );
  },
};

export const WithValue: Story = {
  render: function WithValuePicker() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <div className="w-[300px]">
        <DateTimePicker value={date} onChange={setDate} />
      </div>
    );
  },
};

export const Hour12Format: Story = {
  render: function Hour12Picker() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <div className="w-[300px]">
        <DateTimePicker value={date} onChange={setDate} hourCycle={12} />
      </div>
    );
  },
};

export const MinuteGranularity: Story = {
  render: function MinutePicker() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <div className="w-[300px]">
        <DateTimePicker value={date} onChange={setDate} granularity="minute" />
      </div>
    );
  },
};

export const DayOnly: Story = {
  render: function DayPicker() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <div className="w-[300px]">
        <DateTimePicker value={date} onChange={setDate} granularity="day" />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-[300px]">
      <DateTimePicker value={new Date()} disabled placeholder="Disabled picker" />
    </div>
  ),
};

export const TimePickerOnly: Story = {
  render: function TimeOnly() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <div className="rounded-md border p-4">
        <TimePicker date={date} onChange={setDate} />
      </div>
    );
  },
};

export const TimePicker12Hour: Story = {
  render: function Time12Hour() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <div className="rounded-md border p-4">
        <TimePicker date={date} onChange={setDate} hourCycle={12} />
      </div>
    );
  },
};
