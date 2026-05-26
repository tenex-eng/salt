import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here. This is the main body of the card.</p>
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Name of your project" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  ),
};

export const SimpleCard: Story = {
  render: () => (
    <Card className="w-[350px] p-6">
      <p className="text-sm">A simple card with just content and no header/footer.</p>
    </Card>
  ),
};

export const NotificationCard: Story = {
  render: () => (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-start gap-4 rounded-md border p-4">
          <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
          <div className="space-y-1">
            <p className="text-sm leading-none font-medium">New alert detected</p>
            <p className="text-sm text-muted-foreground">Suspicious activity from IP 192.168.1.1</p>
          </div>
        </div>
        <div className="flex items-start gap-4 rounded-md border p-4">
          <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
          <div className="space-y-1">
            <p className="text-sm leading-none font-medium">Case assigned</p>
            <p className="text-sm text-muted-foreground">You have been assigned to Case #1234</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="outline">
          Mark all as read
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const StatsCard: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Total Alerts</CardDescription>
          <CardTitle className="text-4xl tabular-nums">1,234</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground tabular-nums">+20.1% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Open Cases</CardDescription>
          <CardTitle className="text-4xl tabular-nums">56</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground tabular-nums">-4.5% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Response Time</CardDescription>
          <CardTitle className="text-4xl tabular-nums">2.4h</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">-12% from last month</p>
        </CardContent>
      </Card>
    </div>
  ),
};
