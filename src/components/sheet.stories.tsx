import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from './sheet';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { ToggleGroup, ToggleGroupItem } from './toggle-group';
import { Field, FieldLabel } from './field';
import { Checkbox } from './checkbox';
import { Separator } from './separator';
import { Settings } from 'lucide-react';

const meta: Meta<typeof Sheet> = {
  title: 'Components/Sheet',
  component: Sheet,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const Left: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Left</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Browse different sections of the application.</SheetDescription>
        </SheetHeader>
        <nav className="grid gap-2 py-4">
          <Button variant="ghost" className="justify-start">
            Dashboard
          </Button>
          <Button variant="ghost" className="justify-start">
            Cases
          </Button>
          <Button variant="ghost" className="justify-start">
            Alerts
          </Button>
          <Button variant="ghost" className="justify-start">
            Reports
          </Button>
          <Button variant="ghost" className="justify-start">
            Settings
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  ),
};

export const Top: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Top</Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Search</SheetTitle>
          <SheetDescription>Search across all cases and alerts.</SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <Input placeholder="Search..." className="w-full" />
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const Bottom: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Bottom</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Quick Actions</SheetTitle>
          <SheetDescription>Perform common actions quickly.</SheetDescription>
        </SheetHeader>
        <div className="grid grid-cols-4 gap-4 py-4">
          <Button variant="outline">New Case</Button>
          <Button variant="outline">New Alert</Button>
          <Button variant="outline">Run Report</Button>
          <Button variant="outline">Settings</Button>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const CaseDetails: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>View Case Details</Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Case #1234</SheetTitle>
          <SheetDescription>Suspicious Login Activity</SheetDescription>
        </SheetHeader>
        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-muted-foreground">Status</Label>
              <p className="font-medium">Open</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Severity</Label>
              <p className="font-medium text-orange-500">High</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Assigned To</Label>
              <p className="font-medium">John Analyst</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Created</Label>
              <p className="font-medium">Jan 15, 2024</p>
            </div>
          </div>
          <div>
            <Label className="text-muted-foreground">Description</Label>
            <p className="mt-1 text-sm">
              Multiple failed login attempts detected from an unusual location. The source IP has
              been flagged for potential brute force attack.
            </p>
          </div>
          <div>
            <Label className="text-muted-foreground">Related Alerts</Label>
            <div className="mt-2 space-y-2">
              <div className="rounded border p-2 text-sm">ALT-5678 - Failed SSH Login</div>
              <div className="rounded border p-2 text-sm">ALT-5679 - Unusual IP Location</div>
            </div>
          </div>
        </div>
        <SheetFooter>
          <Button variant="outline">Add Note</Button>
          <Button>Update Status</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

/**
 * Filter Sheet with State Sync — opens from the right.
 * Time range preset toggle group syncs with date fields.
 * Deselecting a preset clears the date it set.
 * CLEAR resets ALL state (inputs + toggles).
 * State persists across sheet open/close.
 */
export const FilterSheet: Story = {
  render: function FilterSheetStory() {
    const [open, setOpen] = useState(false);
    const [preset, setPreset] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [critical, setCritical] = useState(false);
    const [high, setHigh] = useState(false);

    const applyPreset = (value: string) => {
      if (!value) {
        setStartDate('');
        setEndDate('');
        setPreset('');
        return;
      }
      setPreset(value);
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - Number(value));
      setStartDate(start.toISOString().split('T')[0]);
      setEndDate(end.toISOString().split('T')[0]);
    };

    const clearAll = () => {
      setPreset('');
      setStartDate('');
      setEndDate('');
      setCritical(false);
      setHigh(false);
    };

    const hasFilters = preset || startDate || endDate || critical || high;

    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline">Filters{hasFilters ? ' (active)' : ''}</Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Filter Cases</SheetTitle>
            <SheetDescription>Narrow down results by time range and severity.</SheetDescription>
          </SheetHeader>

          <div className="flex flex-col gap-6 py-4">
            {/* Time range presets */}
            <div className="flex flex-col gap-2">
              <Label>Time Range</Label>
              <ToggleGroup
                type="single"
                variant="outline"
                value={preset}
                onValueChange={applyPreset}
              >
                <ToggleGroupItem value="7">7 days</ToggleGroupItem>
                <ToggleGroupItem value="30">30 days</ToggleGroupItem>
                <ToggleGroupItem value="90">90 days</ToggleGroupItem>
              </ToggleGroup>
            </div>

            {/* Date inputs — synced with presets */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="filter-start">Start</Label>
                <Input
                  id="filter-start"
                  type="date"
                  value={startDate}
                  onChange={e => {
                    setStartDate(e.target.value);
                    setPreset('');
                  }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="filter-end">End</Label>
                <Input
                  id="filter-end"
                  type="date"
                  value={endDate}
                  onChange={e => {
                    setEndDate(e.target.value);
                    setPreset('');
                  }}
                />
              </div>
            </div>

            <Separator />

            {/* Severity checkboxes */}
            <div className="flex flex-col gap-3">
              <Label>Severity</Label>
              <Field orientation="horizontal">
                <Checkbox
                  id="filter-critical"
                  checked={critical}
                  onCheckedChange={v => setCritical(!!v)}
                />
                <FieldLabel htmlFor="filter-critical" className="cursor-pointer">
                  Critical
                </FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <Checkbox id="filter-high" checked={high} onCheckedChange={v => setHigh(!!v)} />
                <FieldLabel htmlFor="filter-high" className="cursor-pointer">
                  High
                </FieldLabel>
              </Field>
            </div>
          </div>

          <SheetFooter>
            <Button variant="outline" onClick={clearAll} disabled={!hasFilters}>
              Clear
            </Button>
            <SheetClose asChild>
              <Button>Apply</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  },
};

/**
 * Settings Sheet — form-in-sheet with explicit Save + toast feedback.
 * Modeled on workflow editor settings pattern.
 */
export const SettingsSheet: Story = {
  render: function SettingsSheetStory() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('My Workflow');
    const [description, setDescription] = useState('Automated triage for alerts');
    const [enabled, setEnabled] = useState(true);

    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" aria-label="Settings">
            <Settings className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>{name}</SheetTitle>
            <SheetDescription>Edit workflow settings.</SheetDescription>
          </SheetHeader>

          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="settings-name">Name</Label>
              <Input id="settings-name" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="settings-desc">Description</Label>
              <Input
                id="settings-desc"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
            <Field orientation="horizontal">
              <Checkbox
                id="settings-enabled"
                checked={enabled}
                onCheckedChange={v => setEnabled(!!v)}
              />
              <FieldLabel htmlFor="settings-enabled" className="cursor-pointer">
                Enabled
              </FieldLabel>
            </Field>
          </div>

          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
            <Button onClick={() => setOpen(false)}>Save</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  },
};

export const AllSides: Story = {
  render: () => (
    <div className="flex gap-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Top</Button>
        </SheetTrigger>
        <SheetContent side="top">
          <SheetHeader>
            <SheetTitle>Top Sheet</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Right</Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Right Sheet</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Bottom Sheet</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Left</Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Left Sheet</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  ),
};
