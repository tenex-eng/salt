'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './slider';
import { Label } from './label';
import { useState } from 'react';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultSlider() {
    const [value, setValue] = useState([50]);
    return (
      <div className="w-[300px]">
        <Slider value={value} onValueChange={setValue} max={100} step={1} />
      </div>
    );
  },
};

export const WithLabel: Story = {
  render: function WithLabelSlider() {
    const [value, setValue] = useState([75]);
    return (
      <div className="w-[300px] space-y-4">
        <div className="flex justify-between">
          <Label>Volume</Label>
          <span className="text-sm text-muted-foreground">{value[0]}%</span>
        </div>
        <Slider value={value} onValueChange={setValue} max={100} step={1} />
      </div>
    );
  },
};

export const Range: Story = {
  render: function RangeSlider() {
    const [value, setValue] = useState([25, 75]);
    return (
      <div className="w-[300px] space-y-4">
        <div className="flex justify-between">
          <Label>Price Range</Label>
          <span className="text-sm text-muted-foreground">
            ${value[0]} - ${value[1]}
          </span>
        </div>
        <Slider value={value} onValueChange={setValue} max={100} step={1} />
      </div>
    );
  },
};

export const Steps: Story = {
  render: function StepsSlider() {
    const [value, setValue] = useState([50]);
    return (
      <div className="w-[300px] space-y-4">
        <div className="flex justify-between">
          <Label>Step Size: 10</Label>
          <span className="text-sm text-muted-foreground">{value[0]}</span>
        </div>
        <Slider value={value} onValueChange={setValue} max={100} step={10} />
      </div>
    );
  },
};

export const MinMax: Story = {
  render: function MinMaxSlider() {
    const [value, setValue] = useState([2024]);
    return (
      <div className="w-[300px] space-y-4">
        <div className="flex justify-between">
          <Label>Year</Label>
          <span className="text-sm text-muted-foreground">{value[0]}</span>
        </div>
        <Slider value={value} onValueChange={setValue} min={2000} max={2030} step={1} />
      </div>
    );
  },
};

export const SeverityThreshold: Story = {
  render: function SeveritySlider() {
    const [value, setValue] = useState([70]);
    const getSeverityLabel = (v: number) => {
      if (v >= 90) return 'Critical';
      if (v >= 70) return 'High';
      if (v >= 40) return 'Medium';
      return 'Low';
    };
    const getSeverityColor = (v: number) => {
      if (v >= 90) return 'text-red-500';
      if (v >= 70) return 'text-orange-500';
      if (v >= 40) return 'text-yellow-500';
      return 'text-green-500';
    };
    return (
      <div className="w-[300px] space-y-4">
        <div className="flex justify-between">
          <Label>Alert Threshold</Label>
          <span className={`text-sm font-medium ${getSeverityColor(value[0])}`}>
            {getSeverityLabel(value[0])} ({value[0]})
          </span>
        </div>
        <Slider value={value} onValueChange={setValue} max={100} step={1} />
        <p className="text-xs text-muted-foreground">
          Alerts above this threshold will trigger notifications.
        </p>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <Label className="text-muted-foreground">Disabled Slider</Label>
      <Slider value={[50]} max={100} step={1} disabled />
    </div>
  ),
};

export const MultipleSliders: Story = {
  render: function MultipleSliders() {
    const [confidence, setConfidence] = useState([80]);
    const [relevance, setRelevance] = useState([60]);
    const [urgency, setUrgency] = useState([40]);
    return (
      <div className="w-[300px] space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Confidence</Label>
            <span className="text-sm text-muted-foreground">{confidence[0]}%</span>
          </div>
          <Slider value={confidence} onValueChange={setConfidence} max={100} />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Relevance</Label>
            <span className="text-sm text-muted-foreground">{relevance[0]}%</span>
          </div>
          <Slider value={relevance} onValueChange={setRelevance} max={100} />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Urgency</Label>
            <span className="text-sm text-muted-foreground">{urgency[0]}%</span>
          </div>
          <Slider value={urgency} onValueChange={setUrgency} max={100} />
        </div>
      </div>
    );
  },
};
