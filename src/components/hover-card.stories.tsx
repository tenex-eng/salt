import type { Meta, StoryObj } from '@storybook/react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Button } from './button';
import { CalendarDays, User } from 'lucide-react';

const meta: Meta<typeof HoverCard> = {
  title: 'Components/HoverCard',
  component: HoverCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@nextjs</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm">The React Framework – created and maintained by @vercel.</p>
            <div className="flex items-center gap-2 pt-2">
              <CalendarDays className="h-4 w-4 opacity-70" />
              <span className="text-xs text-muted-foreground">Joined December 2021</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const UserProfile: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="ghost" className="gap-2">
          <User className="h-4 w-4" />
          John Analyst
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarFallback>JA</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <h4 className="text-sm font-semibold">John Analyst</h4>
            <p className="text-sm text-muted-foreground">Security Analyst</p>
            <p className="text-sm">john.analyst@company.com</p>
            <div className="flex items-center gap-4 pt-2 text-xs text-muted-foreground tabular-nums">
              <span>12 cases assigned</span>
              <span>45 alerts triaged</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const AlertDetails: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="outline" size="sm">
          Alert #1234
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold">Suspicious Login Attempt</h4>
            <span className="rounded bg-destructive/10 px-2 py-0.5 text-xs text-destructive">
              High
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Multiple failed login attempts detected from unusual location.
          </p>
          <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
            <div>
              <span className="text-muted-foreground">Source IP:</span>
              <p className="font-mono">192.168.1.100</p>
            </div>
            <div>
              <span className="text-muted-foreground">Time:</span>
              <p>2 hours ago</p>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};
