import type { Meta, StoryObj } from '@storybook/react';
import { Bell, Check, FileText, MoreHorizontal } from 'lucide-react';
import { Badge } from './badge';
import { Button } from './button';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from './item';

const meta: Meta<typeof Item> = {
  title: 'Components/Item',
  component: Item,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Item className="w-[420px]">
      <ItemMedia variant="icon">
        <FileText />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Quarterly report</ItemTitle>
        <ItemDescription>Updated financial summary and supporting notes.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="ghost" size="icon" aria-label="More actions">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </ItemActions>
    </Item>
  ),
};

export const Variants: Story = {
  render: () => (
    <ItemGroup className="w-[460px] gap-2">
      <Item variant="default">
        <ItemContent>
          <ItemTitle>Default item</ItemTitle>
          <ItemDescription>Transparent background for quiet lists.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Outline item</ItemTitle>
          <ItemDescription>Bordered treatment for stronger separation.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="muted">
        <ItemContent>
          <ItemTitle>Muted item</ItemTitle>
          <ItemDescription>Subtle filled background for grouped content.</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  ),
};

export const Structured: Story = {
  render: () => (
    <ItemGroup className="w-[480px] rounded-lg border">
      <Item>
        <ItemHeader>
          <ItemTitle>Notifications</ItemTitle>
          <Badge variant="secondary">3 new</Badge>
        </ItemHeader>
        <ItemMedia variant="icon">
          <Bell />
        </ItemMedia>
        <ItemContent>
          <ItemDescription>Receive product updates and account alerts.</ItemDescription>
        </ItemContent>
        <ItemFooter>
          <span className="text-sm text-muted-foreground">Enabled</span>
          <Check className="h-4 w-4 text-success" />
        </ItemFooter>
      </Item>
      <ItemSeparator />
      <Item size="sm">
        <ItemContent>
          <ItemTitle>Compact row</ItemTitle>
        </ItemContent>
      </Item>
    </ItemGroup>
  ),
};
