# Forms

Forms should be semantic, accessible, and predictable.

## Field structure

Use Salt field primitives for labels, descriptions, errors, and grouped fields.

```tsx
<Field data-invalid={fieldState.invalid}>
  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
  <Input id={field.name} aria-invalid={fieldState.invalid} {...field} />
  {fieldState.error && <FieldError errors={[fieldState.error]} />}
</Field>
```

## Spacing

- Section gap: `gap-6`
- Field gap: `gap-3`
- Micro gap: `gap-1`
- Prefer `flex gap-*` over `space-y-*`.

## Inputs

- Use semantic input types: `email`, `tel`, `url`, `number` + `inputMode`.
- Keep input font size at 16px+ to avoid iOS zoom.
- Use `autoComplete` for user data.
- Disable `spellCheck` for technical fields.

## Submission

- Disable submit during async submission.
- Never disable cancel.
- Show clear loading text in the submit button.
- Single-line Enter can submit; textareas should use Cmd/Ctrl+Enter when shortcut submit is needed.

## Errors

Colocate field errors with fields and wire ARIA.

```tsx
<Input aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} />
{error && <FieldError id={`${id}-error`} errors={[error]} />}
```

Use `Alert tone="danger"` for form-level errors.
