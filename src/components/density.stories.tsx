import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './badge';
import { Button } from './button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table';
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from './empty';
import { AlertCircle, Inbox, ShieldAlert, ShieldCheck } from 'lucide-react';

/**
 * Density System — value / (time + space).
 *
 * Pick one density per region. Change only at semantic boundaries.
 * Dense ≠ cramped — whitespace is still essential.
 */
const meta: Meta = {
  title: 'Foundations/Density',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

/** High density: alert queues, tables — tight spacing, `size-4` icons. */
export const HighDensity: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <p className="mb-3 text-xs font-medium text-muted-foreground">
        High density — alert queues, tables
      </p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-8" />
            <TableHead>Alert</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[
            {
              icon: ShieldAlert,
              alert: 'Brute force detected',
              severity: 'Critical',
              status: 'Open',
            },
            { icon: ShieldAlert, alert: 'Lateral movement', severity: 'High', status: 'Open' },
            { icon: ShieldCheck, alert: 'Scan completed', severity: 'Low', status: 'Resolved' },
          ].map(row => (
            <TableRow key={row.alert}>
              <TableCell className="py-1.5">
                <row.icon className="size-4 text-muted-foreground" />
              </TableCell>
              <TableCell className="py-1.5 text-sm">{row.alert}</TableCell>
              <TableCell className="py-1.5">
                <Badge variant="outline" className="text-xs">
                  {row.severity}
                </Badge>
              </TableCell>
              <TableCell className="py-1.5 text-xs text-muted-foreground">{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};

/** Medium density: detail views, forms — default spacing. */
export const MediumDensity: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <p className="mb-3 text-xs font-medium text-muted-foreground">
        Medium density — detail views, forms
      </p>
      <div className="flex flex-col gap-4 rounded-lg border p-4">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">Case: Suspicious Login Activity</span>
          <span className="text-sm text-muted-foreground">
            Detected anomalous authentication patterns from multiple regions.
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Status</span>
            <Badge variant="outline" className="w-fit">
              Open
            </Badge>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Severity</span>
            <Badge variant="destructive" className="w-fit">
              Critical
            </Badge>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Assignee</span>
            <span className="text-sm">John Analyst</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Created</span>
            <span className="text-sm tabular-nums">Jan 15, 2024, 14:30 UTC</span>
          </div>
        </div>
      </div>
    </div>
  ),
};

/** Low density: onboarding, empty states, destructive confirmations. */
export const LowDensity: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <p className="mb-3 text-xs font-medium text-muted-foreground">
        Low density — onboarding, empty states
      </p>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Inbox />
          </EmptyMedia>
          <EmptyTitle>Welcome to Nucleus</EmptyTitle>
          <EmptyDescription>
            Get started by creating your first case or configuring your integrations.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>Create Your First Case</Button>
        </EmptyContent>
      </Empty>
    </div>
  ),
};

/**
 * Side-by-side comparison of all three density levels.
 * Pick one per region — don't mix within the same section.
 */
export const Comparison: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6">
      {/* High */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium">High — tables, queues</span>
        <div className="rounded-lg border">
          {['Alert: Brute force', 'Alert: Lateral movement', 'Alert: Exfiltration'].map(item => (
            <div
              key={item}
              className="flex items-center gap-2 border-b px-3 py-1.5 text-sm last:border-b-0"
            >
              <ShieldAlert className="size-4 shrink-0 text-muted-foreground" />
              <span className="truncate">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Medium */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium">Medium — detail views</span>
        <div className="flex flex-col gap-3 rounded-lg border p-4">
          <span className="text-sm font-medium">Case Details</span>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Status</span>
              <span>Open</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Priority</span>
              <span>High</span>
            </div>
          </div>
        </div>
      </div>

      {/* Low */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium">Low — onboarding, confirmations</span>
        <div className="flex flex-col items-center gap-4 rounded-lg border p-8 text-center">
          <AlertCircle className="size-8 text-destructive" />
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium">Delete this case?</span>
            <span className="text-xs text-muted-foreground">This action cannot be undone.</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Cancel
            </Button>
            <Button variant="destructive" size="sm">
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  ),
};
