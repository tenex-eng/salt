import type { Meta, StoryObj } from '@storybook/react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './resizable';

const meta: Meta<typeof ResizablePanelGroup> = {
  title: 'Components/Resizable',
  component: ResizablePanelGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ResizablePanelGroup direction="horizontal" className="max-w-md rounded-lg border">
      <ResizablePanel defaultSize={50}>
        <div className="flex h-[200px] items-center justify-center p-6">
          <span className="font-semibold">Panel One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-[200px] items-center justify-center p-6">
          <span className="font-semibold">Panel Two</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const WithHandle: Story = {
  render: () => (
    <ResizablePanelGroup direction="horizontal" className="max-w-md rounded-lg border">
      <ResizablePanel defaultSize={50}>
        <div className="flex h-[200px] items-center justify-center p-6">
          <span className="font-semibold">Panel One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-[200px] items-center justify-center p-6">
          <span className="font-semibold">Panel Two</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const Vertical: Story = {
  render: () => (
    <ResizablePanelGroup direction="vertical" className="min-h-[400px] max-w-md rounded-lg border">
      <ResizablePanel defaultSize={30}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Header</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={70}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Content</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const ThreePanels: Story = {
  render: () => (
    <ResizablePanelGroup direction="horizontal" className="max-w-2xl rounded-lg border">
      <ResizablePanel defaultSize={25} minSize={15}>
        <div className="flex h-[300px] items-center justify-center p-6">
          <span className="font-semibold">Sidebar</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-[300px] items-center justify-center p-6">
          <span className="font-semibold">Main Content</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={25} minSize={15}>
        <div className="flex h-[300px] items-center justify-center p-6">
          <span className="font-semibold">Details</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const Nested: Story = {
  render: () => (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[400px] max-w-2xl rounded-lg border"
    >
      <ResizablePanel defaultSize={25}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Sidebar</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={75}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={70}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Main Content</span>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={30}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Details Panel</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const CaseLayout: Story = {
  render: () => (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[500px] max-w-4xl rounded-lg border"
    >
      <ResizablePanel defaultSize={35} minSize={20}>
        <div className="flex h-full flex-col">
          <div className="border-b p-4 font-semibold">Cases</div>
          <div className="flex-1 p-4">
            <div className="space-y-2">
              {['Case #1234', 'Case #1235', 'Case #1236'].map(c => (
                <div key={c} className="cursor-pointer rounded-md border p-3 hover:bg-muted">
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={65}>
        <div className="flex h-full flex-col">
          <div className="border-b p-4 font-semibold">Case Details</div>
          <div className="flex-1 p-4">
            <p className="text-muted-foreground">Select a case to view details</p>
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};
