import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';
import {
  Search,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Info,
  Plus,
  Settings,
  Trash,
} from 'lucide-react';

/**
 * Iconography — text-first, icons are optional, clarity is not.
 *
 * Reference: Icons Are Not Enough — Nikita Prokopov
 * https://tonsky.me/blog/tahoe-icons/
 *
 * Icons justified when: visual/spatial outcome, severity/status,
 * state indication, or already standardized.
 */
const meta: Meta = {
  title: 'Foundations/Iconography',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

/** Menu items: text-only default vs selective icons for high-signal items. */
export const MenuItems: Story = {
  render: () => (
    <div className="flex gap-8">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-green-600">Correct — text-only default</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Actions</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Dashboard</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-destructive">Wrong — icon on every item</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Actions</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Search className="size-4" />
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="size-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash className="size-4" />
              Profile
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  ),
};

/** Buttons: text-only, text+icon, icon-only (with tooltip + aria-label). */
export const ButtonPatterns: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium">Text-only (default)</span>
          <div className="flex gap-2">
            <Button>Create Case</Button>
            <Button variant="outline">Cancel</Button>
            <Button variant="destructive">Delete</Button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium">Text + icon (justified: standardized action)</span>
          <div className="flex gap-2">
            <Button>
              <Plus className="size-4" />
              Add Case
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium">
            Icon-only (space constrained + tooltip + aria-label)
          </span>
          <div className="flex gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="outline" aria-label="Search">
                  <Search className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Search</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="outline" aria-label="Settings">
                  <Settings className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Settings</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </TooltipProvider>
  ),
};

/** Icon sizing: `size-4` (dense/16px) vs `size-5` (standard/20px). */
export const IconSizing: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium">
          size-4 (16px) — dense UI: tables, compact buttons
        </span>
        <div className="flex items-center gap-3">
          <ShieldAlert className="size-4" />
          <AlertTriangle className="size-4" />
          <Info className="size-4" />
          <ShieldCheck className="size-4" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium">size-5 (20px) — standard UI</span>
        <div className="flex items-center gap-3">
          <ShieldAlert className="size-5" />
          <AlertTriangle className="size-5" />
          <Info className="size-5" />
          <ShieldCheck className="size-5" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium">size-6 (24px) — toolbars, emphasis</span>
        <div className="flex items-center gap-3">
          <ShieldAlert className="size-6" />
          <AlertTriangle className="size-6" />
          <Info className="size-6" />
          <ShieldCheck className="size-6" />
        </div>
      </div>
    </div>
  ),
};

/**
 * The Icon Gate — checklist before adding any icon.
 *
 * | Check       | Question                                               |
 * |-------------|--------------------------------------------------------|
 * | Necessity   | What user problem does it solve?                       |
 * | Metaphor    | Is it familiar and literal?                             |
 * | Uniqueness  | Used for exactly one meaning?                          |
 * | Labeling    | Has visible text label? If icon-only, why?             |
 * | Legibility  | Readable at target size in dense UI?                   |
 * | Consistency | Matches existing icons? Paired actions have pairs?     |
 * | Accessibility | Has accessible name? Meets contrast + 44px target? |
 */
export const IconGate: Story = {
  render: () => (
    <div className="flex max-w-lg flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-green-600">Passes the gate</span>
        <div className="flex items-center gap-3 rounded border border-green-300 p-3">
          <ShieldAlert className="size-4 shrink-0 text-destructive" />
          <span className="text-sm">
            Severity icon — marks high-signal status, unique meaning, readable at size-4
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-destructive">Fails the gate</span>
        <div className="flex items-center gap-3 rounded border border-dashed border-red-300 p-3">
          <Settings className="size-4 shrink-0 text-muted-foreground" />
          <span className="text-sm">
            Decorative icon on &quot;Settings&quot; menu item — text alone is clear, icon adds noise
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-destructive">Fails — no accessible name</span>
        <div className="flex items-center gap-3 rounded border border-dashed border-red-300 p-3">
          <Button size="icon">
            <Search className="size-4" />
          </Button>
          <span className="text-sm">
            Icon-only button without <code>aria-label</code> or tooltip
          </span>
        </div>
      </div>
    </div>
  ),
};
