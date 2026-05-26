import type { Meta, StoryObj } from '@storybook/react';
import { UserAvatar, getInitials } from './user-avatar';

const meta: Meta<typeof UserAvatar> = {
  title: 'Components/UserAvatar',
  component: UserAvatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'number', min: 16, max: 128 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    userEmail: 'john.analyst@company.com',
    userFullName: 'John Analyst',
    size: 40,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <UserAvatar userEmail="user@example.com" userFullName="Small User" size={24} />
      <UserAvatar userEmail="user@example.com" userFullName="Default User" size={32} />
      <UserAvatar userEmail="user@example.com" userFullName="Medium User" size={40} />
      <UserAvatar userEmail="user@example.com" userFullName="Large User" size={56} />
      <UserAvatar userEmail="user@example.com" userFullName="XL User" size={80} />
    </div>
  ),
};

export const DifferentUsers: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <UserAvatar userEmail="alice@company.com" userFullName="Alice Smith" size={40} />
      <UserAvatar userEmail="bob@company.com" userFullName="Bob Johnson" size={40} />
      <UserAvatar userEmail="carol@company.com" userFullName="Carol Williams" size={40} />
      <UserAvatar userEmail="david@company.com" userFullName="David Brown" size={40} />
      <UserAvatar userEmail="eve@company.com" userFullName="Eve Davis" size={40} />
    </div>
  ),
};

export const DeterministicColors: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Colors are generated deterministically from email addresses:
      </p>
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center gap-1">
          <UserAvatar userEmail="analyst@acme.com" userFullName="Security Analyst" size={48} />
          <span className="text-xs">analyst@acme.com</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <UserAvatar userEmail="admin@acme.com" userFullName="Admin User" size={48} />
          <span className="text-xs">admin@acme.com</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <UserAvatar userEmail="soc@acme.com" userFullName="SOC Team" size={48} />
          <span className="text-xs">soc@acme.com</span>
        </div>
      </div>
    </div>
  ),
};

export const InList: Story = {
  render: () => (
    <div className="w-[300px] space-y-2">
      {[
        { email: 'john@company.com', name: 'John Analyst' },
        { email: 'jane@company.com', name: 'Jane Security' },
        { email: 'bob@company.com', name: 'Bob Investigator' },
      ].map(user => (
        <div key={user.email} className="flex items-center gap-3 rounded-lg border p-3">
          <UserAvatar userEmail={user.email} userFullName={user.name} size={36} />
          <div>
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const InComment: Story = {
  render: () => (
    <div className="w-[400px] space-y-4 rounded-lg border p-4">
      <div className="flex gap-3">
        <UserAvatar userEmail="analyst@company.com" userFullName="Security Analyst" size={32} />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Security Analyst</span>
            <span className="text-xs text-muted-foreground">2 hours ago</span>
          </div>
          <p className="mt-1 text-sm">
            I&apos;ve reviewed the alert and it appears to be a false positive. The activity is
            consistent with normal user behavior.
          </p>
        </div>
      </div>
      <div className="flex gap-3">
        <UserAvatar userEmail="lead@company.com" userFullName="Team Lead" size={32} />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Team Lead</span>
            <span className="text-xs text-muted-foreground">1 hour ago</span>
          </div>
          <p className="mt-1 text-sm">Thanks for the analysis. I&apos;ll mark this as resolved.</p>
        </div>
      </div>
    </div>
  ),
};

export const Initials: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        The getInitials helper extracts initials from names:
      </p>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <code>&quot;John Doe&quot;</code> → <strong>{getInitials('John Doe')}</strong>
        </div>
        <div>
          <code>&quot;Alice&quot;</code> → <strong>{getInitials('Alice')}</strong>
        </div>
        <div>
          <code>&quot;Bob James Smith&quot;</code> →{' '}
          <strong>{getInitials('Bob James Smith')}</strong>
        </div>
        <div>
          <code>&quot;&quot;</code> → <strong>&quot;{getInitials('')}&quot;</strong>
        </div>
      </div>
    </div>
  ),
};

export const AvatarGroup: Story = {
  render: () => (
    <div className="flex -space-x-2">
      <UserAvatar
        userEmail="user1@company.com"
        userFullName="User One"
        size={36}
        className="ring-2 ring-background"
      />
      <UserAvatar
        userEmail="user2@company.com"
        userFullName="User Two"
        size={36}
        className="ring-2 ring-background"
      />
      <UserAvatar
        userEmail="user3@company.com"
        userFullName="User Three"
        size={36}
        className="ring-2 ring-background"
      />
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-xs font-medium ring-2 ring-background">
        +5
      </div>
    </div>
  ),
};
