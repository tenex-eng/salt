import type { Meta, StoryObj } from '@storybook/react';
import { ScrollArea, ScrollBar } from './scroll-area';
import { Separator } from './separator';

const meta: Meta<typeof ScrollArea> = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const tags = Array.from({ length: 50 }).map((_, i) => `v1.2.0-beta.${i}`);

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm leading-none font-medium">Tags</h4>
        {tags.map(tag => (
          <div key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

const alerts = Array.from({ length: 20 }).map((_, i) => ({
  id: `ALT-${1000 + i}`,
  title: `Suspicious activity detected ${i + 1}`,
  severity: ['Critical', 'High', 'Medium', 'Low'][i % 4],
}));

export const AlertList: Story = {
  render: () => (
    <ScrollArea className="h-[400px] w-[350px] rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium">Recent Alerts</h4>
        {alerts.map(alert => (
          <div key={alert.id} className="mb-2 cursor-pointer rounded-md border p-3 hover:bg-muted">
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">{alert.id}</span>
              <span
                className={`rounded px-2 py-0.5 text-xs ${
                  alert.severity === 'Critical'
                    ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    : alert.severity === 'High'
                      ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                      : alert.severity === 'Medium'
                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                        : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                }`}
              >
                {alert.severity}
              </span>
            </div>
            <p className="mt-1 text-sm">{alert.title}</p>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

const images = Array.from({ length: 10 }).map((_, i) => ({
  id: i,
  name: `Screenshot ${i + 1}`,
}));

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="w-96 rounded-md border whitespace-nowrap">
      <div className="flex w-max space-x-4 p-4">
        {images.map(image => (
          <div
            key={image.id}
            className="flex h-[100px] w-[150px] shrink-0 items-center justify-center rounded-md bg-muted"
          >
            <span className="text-sm text-muted-foreground">{image.name}</span>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};

export const BothDirections: Story = {
  render: () => (
    <ScrollArea className="h-[300px] w-[400px] rounded-md border">
      <div className="p-4">
        <table className="w-[600px]">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Severity</th>
              <th className="p-2 text-left">Assignee</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 20 }).map((_, i) => (
              <tr key={i} className="border-b">
                <td className="p-2 font-mono text-sm">CASE-{1000 + i}</td>
                <td className="p-2 text-sm">Open</td>
                <td className="p-2 text-sm">Security incident #{i + 1}</td>
                <td className="p-2 text-sm">High</td>
                <td className="p-2 text-sm">analyst@company.com</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};

export const LogViewer: Story = {
  render: () => (
    <ScrollArea className="h-[300px] w-[500px] rounded-md border bg-gray-950">
      <div className="p-4 font-mono text-xs text-green-400">
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="py-0.5">
            [{new Date(Date.now() - i * 60000).toISOString()}] INFO: Processing request {50 - i}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};
