# Forms

Field component system, input patterns, validation, and keyboard interactions.

## Table of Contents

- [Field Component System](#field-component-system)
- [Form Spacing Hierarchy](#form-spacing-hierarchy)
- [Form Structure](#form-structure)
- [Input Best Practices](#input-best-practices)
- [Autocomplete & Spellcheck](#autocomplete--spellcheck)
- [Keyboard Submission](#keyboard-submission)
- [Button States](#button-states)
- [Checkboxes & Controls](#checkboxes--controls)
- [Error Handling](#error-handling)
- [Dialog Reset Anti-Pattern](#dialog-reset-anti-pattern)

## Field Component System

Salt uses a hierarchical field system:

```tsx
import { Field, FieldSet, FieldGroup, FieldLabel, FieldError, Input } from '@tenex-eng/salt';

<FieldSet>
  <FieldGroup>
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor="email">Email *</FieldLabel>
      <Input id="email" type="email" aria-invalid={fieldState.invalid} {...field} />
      {fieldState.error && <FieldError errors={[fieldState.error]} />}
    </Field>
  </FieldGroup>
</FieldSet>;
```

**Component hierarchy:**

- `FieldSet` — Groups related field groups (like HTML fieldset)
- `FieldGroup` — Groups related fields (horizontal or vertical)
- `Field` — Single input with label and error
- `FieldLabel` — Label with required indicator support
- `FieldError` — Error message display

## Form Spacing Hierarchy

Forms use a three-tier vertical rhythm. Consistent spacing creates visual grouping and scannable structure.

**The pattern:**

| Level   | Gap            | Use Case                                |
| ------- | -------------- | --------------------------------------- |
| Section | `gap-6` (24px) | Between major form sections (FieldSets) |
| Field   | `gap-3` (12px) | Between fields within a section         |
| Micro   | `gap-1` (4px)  | Legend + description pairs, icon + text |

**Example structure:**

```tsx
<form className="flex flex-col gap-6">
  {/* Section 1: Editor */}
  <FieldSet className="gap-2">
    <RichTextEditor />
    <DraftStatus /> {/* Tight coupling to editor */}
  </FieldSet>

  {/* Section 2: Options */}
  <FieldSet className="gap-3">
    <div className="flex flex-col gap-1">
      <FieldLegend>External Communication</FieldLegend>
      <FieldDescription>Send via JIRA Service Management.</FieldDescription>
    </div>
    <Checkbox />
    <InfoBox />
  </FieldSet>

  {/* Section 3: Attachments */}
  <FieldSet className="gap-3">
    <AttachmentSelector />
  </FieldSet>

  {/* Actions - no extra padding, parent gap-6 handles spacing */}
  <div className="flex justify-end gap-2">
    <Button variant="ghost">Cancel</Button>
    <Button type="submit">Submit</Button>
  </div>
</form>
```

**Key rules:**

- Parent container uses `gap-6` for section separation
- Each FieldSet uses `gap-3` for internal field spacing
- Legend + description wrapped together with `gap-1`
- Actions section needs no `pt-*` — parent gap handles it
- Use `flex gap-*` not `space-y-*` (more predictable with conditionals)

Use this structure as the default for complex consuming-app workflow forms.

## Form Structure

Use react-hook-form with Controller:

```tsx
import { useForm, FormProvider as Form, Controller as FormField } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const form = useForm({
  resolver: zodResolver(schema),
  defaultValues: { name: '', email: '' },
});

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
      control={form.control}
      name="name"
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>Name *</FieldLabel>
          <Input {...field} id={field.name} aria-invalid={fieldState.invalid} />
          {fieldState.error && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
    <Button type="submit" disabled={form.formState.isSubmitting}>
      Save
    </Button>
  </form>
</Form>;
```

**Key patterns:**

- Use `useId()` for unique IDs (especially array/nested fields)
- Import `FormProvider as Form`, `Controller as FormField` directly
- Spread `field` props onto input

## Input Best Practices

**Input types:**

```tsx
// Use semantic types for mobile keyboards
<Input type="email" />      // @ key visible
<Input type="tel" />        // Number pad
<Input type="url" />        // .com key
<Input type="number" inputMode="decimal" />  // Decimal pad
```

**Font size:**

```tsx
// Minimum 16px to prevent iOS zoom on focus
<Input className="text-base" /> // 16px
// Never: <Input className="text-sm" />
```

**Decorations:**

```tsx
import { InputGroup, InputGroupInput, InputGroupAddon } from '@tenex-eng/salt';

// Prefix (e.g., currency symbol)
<InputGroup>
  <InputGroupAddon>$</InputGroupAddon>
  <InputGroupInput placeholder="0.00" />
</InputGroup>

// Suffix (e.g., unit)
<InputGroup>
  <InputGroupInput placeholder="100" />
  <InputGroupAddon>kg</InputGroupAddon>
</InputGroup>
```

## Autocomplete & Spellcheck

```tsx
// Enable autocomplete for user data
<Input type="email" autoComplete="email" />
<Input type="tel" autoComplete="tel" />
<Input type="text" autoComplete="name" />
<Input type="text" autoComplete="organization" />

// Disable for sensitive/code fields
<Input type="text" autoComplete="off" spellCheck={false} />

// Disable spellcheck for technical fields
<Input type="text" spellCheck={false} />  // IP addresses, URLs, code
```

## Keyboard Submission

```tsx
// Single-line inputs: Enter submits
<Input
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      form.handleSubmit(onSubmit)();
    }
  }}
/>

// Textareas: Cmd/Ctrl+Enter submits
<Textarea
  onKeyDown={(e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      form.handleSubmit(onSubmit)();
    }
  }}
/>
```

**Display hints:**

```tsx
// Show keyboard shortcut in button
<Button type="submit">
  Save
  <kbd className="ml-2 text-xs opacity-60">⌘↵</kbd>
</Button>
```

## Button States

```tsx
// Disable during submission
<Button type="submit" disabled={form.formState.isSubmitting}>
  {form.formState.isSubmitting ? 'Saving...' : 'Save'}
</Button>

// Never disable cancel
<Button type="button" variant="outline" onClick={onCancel}>
  Cancel
</Button>
```

**Patterns:**

- Disable submit during async operation
- Never disable cancel (user escape hatch)
- Show loading state in button text
- Re-enable on error

## Checkboxes & Controls

```tsx
// Clickable label (no dead zones)
<label className="flex items-center gap-2 cursor-pointer">
  <Checkbox id="terms" />
  <span className="text-sm">Accept terms</span>
</label>

// Or use proper htmlFor
<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <label htmlFor="terms" className="text-sm cursor-pointer">
    Accept terms
  </label>
</div>
```

**Dead zone anti-pattern:**

```tsx
// DON'T: Gap between checkbox and label is unclickable
<div className="flex items-center gap-2">
  <Checkbox />
  <span>Text</span> // Not clickable!
</div>
```

## Error Handling

**Colocate errors with fields:**

```tsx
<Field data-invalid={fieldState.invalid}>
  <FieldLabel>Email</FieldLabel>
  <Input aria-invalid={fieldState.invalid} />
  {fieldState.error && <FieldError errors={[fieldState.error]} />}
</Field>
```

**ARIA for screen readers:**

```tsx
<Input aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} />;
{
  error && <FieldError id={`${id}-error`} errors={[error]} />;
}
```

**Form-level errors:**

```tsx
{
  form.formState.errors.root && (
    <Alert tone="danger">
      <AlertDescription>{form.formState.errors.root.message}</AlertDescription>
    </Alert>
  );
}
```

## Dialog Reset Anti-Pattern

**Never use both patterns together:**

```tsx
// DON'T: useEffect reset AND onOpenChange reset race
useEffect(() => {
  if (open) form.reset();
}, [open]);

<Dialog onOpenChange={(open) => {
  if (!open) form.reset();  // Races with useEffect!
}}>

// DO: Pick ONE reset strategy
// Option 1: Reset on open
useEffect(() => {
  if (open) form.reset();
}, [open]);

// Option 2: Reset on close
<Dialog onOpenChange={(open) => {
  if (!open) form.reset();
}}>
```
