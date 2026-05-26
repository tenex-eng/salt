import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldSet,
  FieldLegend,
  FieldSeparator,
  FieldContent,
} from './field';
import { Input } from './input';
import { Textarea } from './textarea';
import { Checkbox } from './checkbox';
import { Switch } from './switch';
import { Button } from './button';
import { RadioGroup, RadioGroupItem } from './radio-group';

const meta: Meta<typeof Field> = {
  title: 'Components/Field',
  component: Field,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Field className="w-[300px]">
      <FieldLabel htmlFor="email">Email</FieldLabel>
      <Input id="email" type="email" placeholder="name@example.com" />
    </Field>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <Field className="w-[300px]">
      <FieldLabel htmlFor="username">Username</FieldLabel>
      <Input id="username" placeholder="Enter username" />
      <FieldDescription>This will be your public display name.</FieldDescription>
    </Field>
  ),
};

export const WithError: Story = {
  render: () => (
    <Field data-invalid="true" className="w-[300px]">
      <FieldLabel htmlFor="email-error">Email</FieldLabel>
      <Input id="email-error" type="email" aria-invalid="true" defaultValue="invalid-email" />
      <FieldError errors={[{ message: 'Please enter a valid email address' }]} />
    </Field>
  ),
};

export const MultipleErrors: Story = {
  render: () => (
    <Field data-invalid="true" className="w-[300px]">
      <FieldLabel htmlFor="password">Password</FieldLabel>
      <Input id="password" type="password" aria-invalid="true" />
      <FieldError
        errors={[
          { message: 'Password must be at least 8 characters' },
          { message: 'Password must contain a number' },
          { message: 'Password must contain a special character' },
        ]}
      />
    </Field>
  ),
};

export const HorizontalLayout: Story = {
  render: () => (
    <Field orientation="horizontal" className="w-[400px]">
      <Checkbox id="terms" />
      <FieldContent>
        <FieldLabel htmlFor="terms">Accept terms and conditions</FieldLabel>
        <FieldDescription>You agree to our Terms of Service and Privacy Policy.</FieldDescription>
      </FieldContent>
    </Field>
  ),
};

export const FieldSetExample: Story = {
  render: () => (
    <FieldSet className="w-[350px]">
      <FieldLegend>Personal Information</FieldLegend>
      <FieldDescription>Please fill out your personal details below.</FieldDescription>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="first-name">First Name</FieldLabel>
          <Input id="first-name" placeholder="John" />
        </Field>
        <Field>
          <FieldLabel htmlFor="last-name">Last Name</FieldLabel>
          <Input id="last-name" placeholder="Doe" />
        </Field>
        <Field>
          <FieldLabel htmlFor="email-fs">Email</FieldLabel>
          <Input id="email-fs" type="email" placeholder="john@example.com" />
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
};

export const WithRadioGroup: Story = {
  render: () => (
    <FieldSet className="w-[350px]">
      <FieldLegend variant="label">Notification Preferences</FieldLegend>
      <RadioGroup defaultValue="all">
        <Field orientation="horizontal">
          <RadioGroupItem value="all" id="all" />
          <FieldContent>
            <FieldLabel htmlFor="all">All notifications</FieldLabel>
            <FieldDescription>Receive all email notifications.</FieldDescription>
          </FieldContent>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="important" id="important" />
          <FieldContent>
            <FieldLabel htmlFor="important">Important only</FieldLabel>
            <FieldDescription>Only critical alerts and updates.</FieldDescription>
          </FieldContent>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="none" id="none" />
          <FieldContent>
            <FieldLabel htmlFor="none">None</FieldLabel>
            <FieldDescription>No email notifications.</FieldDescription>
          </FieldContent>
        </Field>
      </RadioGroup>
    </FieldSet>
  ),
};

/**
 * Choice Card — wrap a `Field` inside `FieldLabel` to create a selectable card.
 * Works with Checkbox, RadioGroupItem, and Switch.
 */
export const ChoiceCardCheckbox: Story = {
  name: 'Choice Card / Checkbox',
  render: function ChoiceCardCheckboxStory() {
    const [checked, setChecked] = useState(false);
    return (
      <div className="w-[400px]">
        <FieldLabel htmlFor="global-option">
          <Field orientation="horizontal">
            <Checkbox id="global-option" checked={checked} onCheckedChange={v => setChecked(!!v)} />
            <FieldContent>
              <FieldLabel htmlFor="global-option">Global</FieldLabel>
              <FieldDescription>Available to all tenants at any point in time.</FieldDescription>
            </FieldContent>
          </Field>
        </FieldLabel>
      </div>
    );
  },
};

export const ChoiceCardRadio: Story = {
  name: 'Choice Card / Radio',
  render: function ChoiceCardRadioStory() {
    return (
      <RadioGroup defaultValue="email" className="w-[400px]">
        <FieldLabel htmlFor="notify-email">
          <Field orientation="horizontal">
            <FieldContent>
              <FieldLabel htmlFor="notify-email">Email</FieldLabel>
              <FieldDescription>Get notified via email for all updates.</FieldDescription>
            </FieldContent>
            <RadioGroupItem value="email" id="notify-email" />
          </Field>
        </FieldLabel>
        <FieldLabel htmlFor="notify-sms">
          <Field orientation="horizontal">
            <FieldContent>
              <FieldLabel htmlFor="notify-sms">SMS</FieldLabel>
              <FieldDescription>Receive text messages for critical alerts only.</FieldDescription>
            </FieldContent>
            <RadioGroupItem value="sms" id="notify-sms" />
          </Field>
        </FieldLabel>
        <FieldLabel htmlFor="notify-none">
          <Field orientation="horizontal">
            <FieldContent>
              <FieldLabel htmlFor="notify-none">None</FieldLabel>
              <FieldDescription>No notifications will be sent.</FieldDescription>
            </FieldContent>
            <RadioGroupItem value="none" id="notify-none" />
          </Field>
        </FieldLabel>
      </RadioGroup>
    );
  },
};

export const ChoiceCardSwitch: Story = {
  name: 'Choice Card / Switch',
  render: function ChoiceCardSwitchStory() {
    const [enabled, setEnabled] = useState(false);
    return (
      <div className="w-[400px]">
        <FieldLabel htmlFor="auto-remediate">
          <Field orientation="horizontal">
            <Switch id="auto-remediate" checked={enabled} onCheckedChange={setEnabled} />
            <FieldContent>
              <FieldLabel htmlFor="auto-remediate">Auto-remediate</FieldLabel>
              <FieldDescription>
                Automatically apply recommended fixes when threats are detected.
              </FieldDescription>
            </FieldContent>
          </Field>
        </FieldLabel>
      </div>
    );
  },
};

export const SelectAllIndeterminate: Story = {
  render: function SelectAllStory() {
    const items = ['Alpha Tenant', 'Beta Tenant', 'Gamma Tenant'];
    const [selected, setSelected] = useState<string[]>(['Alpha Tenant']);

    const allSelected = selected.length === items.length;
    const someSelected = selected.length > 0 && !allSelected;
    const selectAllChecked: boolean | 'indeterminate' = allSelected
      ? true
      : someSelected
        ? 'indeterminate'
        : false;

    return (
      <FieldGroup className="w-[300px] gap-2">
        <Field orientation="horizontal">
          <Checkbox
            id="select-all"
            checked={selectAllChecked}
            onCheckedChange={checked => {
              setSelected(checked ? [...items] : []);
            }}
          />
          <FieldLabel htmlFor="select-all" className="cursor-pointer">
            Select All
          </FieldLabel>
        </Field>
        {items.map(item => (
          <Field key={item} orientation="horizontal">
            <Checkbox
              id={`item-${item}`}
              checked={selected.includes(item)}
              onCheckedChange={checked => {
                setSelected(checked ? [...selected, item] : selected.filter(i => i !== item));
              }}
            />
            <FieldLabel htmlFor={`item-${item}`} className="cursor-pointer">
              {item}
            </FieldLabel>
          </Field>
        ))}
      </FieldGroup>
    );
  },
};

/**
 * Composite form modeled on `/workflows/new` — demonstrates all Field system
 * patterns together: text input, textarea, horizontal checkbox, checkbox card,
 * select-all with indeterminate, FieldSet + FieldLegend + FieldSeparator.
 */
export const CompositeForm: Story = {
  render: function CompositeFormStory() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isEnabled, setIsEnabled] = useState(true);
    const [isGlobal, setIsGlobal] = useState(false);
    const [selectedTenants, setSelectedTenants] = useState<string[]>([]);

    const tenants = ['Acme Corp', 'Globex Inc', 'Initech LLC'];
    const allSelected = selectedTenants.length === tenants.length && tenants.length > 0;
    const someSelected = selectedTenants.length > 0 && !allSelected;
    const selectAllChecked: boolean | 'indeterminate' = allSelected
      ? true
      : someSelected
        ? 'indeterminate'
        : false;

    return (
      <div className="flex w-[500px] flex-col gap-6">
        <FieldSet>
          <FieldLegend variant="legend">Basic Information</FieldLegend>
          <FieldDescription>Name, description and enabled can be changed later.</FieldDescription>

          <Field>
            <FieldLabel htmlFor="wf-name">Name *</FieldLabel>
            <Input
              id="wf-name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="My Workflow"
            />
            <FieldDescription>A descriptive name for your workflow.</FieldDescription>
          </Field>

          <Field>
            <FieldLabel htmlFor="wf-description">Description</FieldLabel>
            <Textarea
              id="wf-description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Describe what this workflow does…"
              rows={3}
            />
          </Field>

          <Field orientation="horizontal">
            <Checkbox
              id="wf-enabled"
              checked={isEnabled}
              onCheckedChange={checked => setIsEnabled(!!checked)}
            />
            <FieldLabel htmlFor="wf-enabled" className="cursor-pointer">
              Enabled
            </FieldLabel>
          </Field>
        </FieldSet>

        <FieldSeparator />

        <FieldSet>
          <FieldLegend variant="legend">Availability *</FieldLegend>
          <FieldDescription>
            Choose whether this workflow is available globally or to specific tenants.
          </FieldDescription>

          <FieldLabel htmlFor="wf-global">
            <Field orientation="horizontal">
              <Checkbox
                id="wf-global"
                checked={isGlobal}
                onCheckedChange={checked => {
                  setIsGlobal(!!checked);
                  if (checked) setSelectedTenants([]);
                }}
              />
              <FieldContent>
                <FieldLabel htmlFor="wf-global">Global</FieldLabel>
                <FieldDescription>Available to all tenants at any point in time.</FieldDescription>
              </FieldContent>
            </Field>
          </FieldLabel>

          <FieldGroup className="gap-2">
            <FieldLabel>Or select specific tenants</FieldLabel>
            <Field orientation="horizontal">
              <Checkbox
                id="wf-select-all"
                checked={selectAllChecked}
                onCheckedChange={checked => {
                  setSelectedTenants(checked ? [...tenants] : []);
                }}
                disabled={isGlobal}
              />
              <FieldLabel
                htmlFor="wf-select-all"
                className={isGlobal ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
              >
                Select All
              </FieldLabel>
            </Field>
            {tenants.map(tenant => (
              <Field key={tenant} orientation="horizontal">
                <Checkbox
                  id={`wf-tenant-${tenant}`}
                  checked={selectedTenants.includes(tenant)}
                  onCheckedChange={checked => {
                    setSelectedTenants(
                      checked
                        ? [...selectedTenants, tenant]
                        : selectedTenants.filter(t => t !== tenant)
                    );
                  }}
                  disabled={isGlobal}
                />
                <FieldLabel
                  htmlFor={`wf-tenant-${tenant}`}
                  className={isGlobal ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                >
                  {tenant}
                </FieldLabel>
              </Field>
            ))}
          </FieldGroup>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline">Cancel</Button>
            <Button disabled={!name.trim() || (!isGlobal && selectedTenants.length === 0)}>
              Create Workflow
            </Button>
          </div>
        </FieldSet>
      </div>
    );
  },
};
