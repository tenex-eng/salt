import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TokenInput } from './token-input';
import { Field, FieldLabel, FieldDescription, FieldError } from './field';

const meta: Meta<typeof TokenInput> = {
  title: 'Components/TokenInput',
  component: TokenInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

function DefaultDemo() {
  const [tags, setTags] = useState<string[]>([]);
  return (
    <div className="w-[400px]">
      <TokenInput values={tags} onChange={setTags} placeholder="Type and press Enter..." />
    </div>
  );
}

export const Default: Story = { render: () => <DefaultDemo /> };

function WithExistingTokensDemo() {
  const [tags, setTags] = useState(['@acme.com', '@acme.io', '@subsidiary.com']);
  return (
    <div className="w-[400px]">
      <TokenInput values={tags} onChange={setTags} placeholder="Add a domain..." />
    </div>
  );
}

export const WithExistingTokens: Story = { render: () => <WithExistingTokensDemo /> };

function WithFieldWrapperDemo() {
  const [tags, setTags] = useState(['@example.com']);
  return (
    <div className="w-[400px]">
      <Field>
        <FieldLabel>Domains</FieldLabel>
        <TokenInput values={tags} onChange={setTags} placeholder="Add domain..." />
        <FieldDescription>
          Enter your company email domains. Press Enter to add each one.
        </FieldDescription>
      </Field>
    </div>
  );
}

export const WithFieldWrapper: Story = {
  name: 'Inside Field (label + description)',
  render: () => <WithFieldWrapperDemo />,
};

function MaxTagsDemo() {
  const [tags, setTags] = useState(['one', 'two']);
  return (
    <div className="w-[400px]">
      <TokenInput values={tags} onChange={setTags} placeholder="Max 3..." maxTags={3} />
      <p className="mt-2 text-xs text-muted-foreground">{tags.length}/3 tokens</p>
    </div>
  );
}

export const MaxTags: Story = {
  name: 'Max 3 tokens',
  render: () => <MaxTagsDemo />,
};

export const Disabled: Story = {
  render: () => (
    <div className="w-[400px]">
      <TokenInput values={['locked', 'values']} onChange={() => {}} disabled />
    </div>
  ),
};

function InvalidDemo() {
  const [tags, setTags] = useState<string[]>([]);
  return (
    <div className="w-[400px]">
      <Field data-invalid="true">
        <FieldLabel>
          Domains<span className="ml-1 text-destructive">*</span>
        </FieldLabel>
        <TokenInput
          values={tags}
          onChange={setTags}
          placeholder="Add at least one domain..."
          aria-invalid
        />
        <FieldError errors={[{ message: 'At least one domain is required' }]} />
      </Field>
    </div>
  );
}

export const Invalid: Story = { render: () => <InvalidDemo /> };
