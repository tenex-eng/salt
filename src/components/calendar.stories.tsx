'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './calendar';
import { useState } from 'react';

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultCalendar() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
    );
  },
};

export const WithRange: Story = {
  render: function RangeCalendar() {
    const [range, setRange] = useState<{ from: Date; to?: Date } | undefined>({
      from: new Date(),
      to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    return (
      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
        numberOfMonths={2}
        className="rounded-md border"
      />
    );
  },
};

export const Multiple: Story = {
  render: function MultipleCalendar() {
    const [dates, setDates] = useState<Date[] | undefined>([new Date()]);
    return (
      <Calendar
        mode="multiple"
        selected={dates}
        onSelect={setDates}
        className="rounded-md border"
      />
    );
  },
};

export const WithDisabledDates: Story = {
  render: function DisabledCalendar() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const disabledDays = [
      new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    ];
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={disabledDays}
        className="rounded-md border"
      />
    );
  },
};

export const WithDropdowns: Story = {
  render: function DropdownCalendar() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        captionLayout="dropdown"
        className="rounded-md border"
      />
    );
  },
};
