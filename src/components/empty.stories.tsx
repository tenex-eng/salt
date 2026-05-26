import type { Meta, StoryObj } from '@storybook/react';
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
} from './empty';
import { Button } from './button';
import { FileQuestion, Search, AlertCircle, Inbox, FolderOpen, ListFilter } from 'lucide-react';

const meta: Meta<typeof Empty> = {
  title: 'Components/Empty',
  component: Empty,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Empty className="w-[400px]">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Inbox />
        </EmptyMedia>
        <EmptyTitle>No items found</EmptyTitle>
        <EmptyDescription>There are no items to display at the moment.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Empty className="w-[400px]">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderOpen />
        </EmptyMedia>
        <EmptyTitle>No cases yet</EmptyTitle>
        <EmptyDescription>Get started by creating your first security case.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Create Case</Button>
      </EmptyContent>
    </Empty>
  ),
};

export const SearchNoResults: Story = {
  render: () => (
    <Empty className="w-[400px]">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Search />
        </EmptyMedia>
        <EmptyTitle>No results found</EmptyTitle>
        <EmptyDescription>
          We couldn&apos;t find anything matching your search. Try different keywords.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline">Clear Search</Button>
      </EmptyContent>
    </Empty>
  ),
};

export const Error: Story = {
  render: () => (
    <Empty className="w-[400px]">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <AlertCircle />
        </EmptyMedia>
        <EmptyTitle>Failed to load data</EmptyTitle>
        <EmptyDescription>
          Something went wrong while loading the data. Please try again.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline">Retry</Button>
      </EmptyContent>
    </Empty>
  ),
};

/**
 * Honest context: user action required.
 * Don't say "No items yet" when the real issue is "select a tenant first."
 * Modeled on the Workflows table no-tenant-selected state.
 */
export const ActionRequired: Story = {
  render: () => (
    <Empty className="w-[400px]">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ListFilter className="text-muted-foreground" />
        </EmptyMedia>
        <EmptyTitle>Select a tenant</EmptyTitle>
        <EmptyDescription>
          Choose a tenant from the selector above to view workflows.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
};

export const NoPermission: Story = {
  render: () => (
    <Empty className="w-[400px]">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FileQuestion />
        </EmptyMedia>
        <EmptyTitle>Access Denied</EmptyTitle>
        <EmptyDescription>
          You don&apos;t have permission to view this content. Contact your administrator for
          access.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline">Request Access</Button>
      </EmptyContent>
    </Empty>
  ),
};

export const WithCustomMedia: Story = {
  render: () => (
    <Empty className="w-[400px]">
      <EmptyHeader>
        <EmptyMedia>
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
            <Inbox className="h-12 w-12 text-muted-foreground" />
          </div>
        </EmptyMedia>
        <EmptyTitle>Your inbox is empty</EmptyTitle>
        <EmptyDescription>When you receive new alerts, they will appear here.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
};
