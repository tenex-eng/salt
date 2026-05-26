'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { Badge } from './';
import { cn } from '../lib/utils';

export interface TokenInputProps {
  /** Current token values (must be unique — duplicates are rejected on add) */
  values: string[];
  /** Called when tokens change */
  onChange: (values: string[]) => void;
  /** Placeholder shown when no tokens and input is empty */
  placeholder?: string;
  /** Maximum number of tokens allowed */
  maxTags?: number;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Additional class names for the container */
  className?: string;
  /** Error state styling */
  'aria-invalid'?: boolean;
  /** HTML id forwarded to the inner input (for label association) */
  id?: string;
  /** Optional transform applied before adding a token. Return null to reject. */
  transformToken?: (raw: string) => string | null;
}

function TokenBadge({
  value,
  disabled,
  onRemove,
}: {
  value: string;
  disabled: boolean;
  onRemove: () => void;
}) {
  return (
    <Badge variant="secondary" className="gap-1 pr-1">
      {value}
      {!disabled && (
        <button
          type="button"
          className="ml-0.5 rounded-full p-0.5 hover:bg-muted-foreground/20 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:outline-none"
          onClick={e => {
            e.stopPropagation();
            onRemove();
          }}
          aria-label={`Remove ${value}`}
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </Badge>
  );
}

/**
 * A token/chip input for collecting a list of unique string values.
 *
 * - Type a value and press **Enter** or **,** to add it
 * - Press **Backspace** on an empty input to remove the last token
 * - Paste comma/semicolon/newline-separated values to bulk-add
 * - Click the **X** on a token to remove it
 * - Typed text is committed automatically on blur
 */
function TokenInput({
  values,
  onChange,
  placeholder = 'Add...',
  maxTags,
  disabled = false,
  className,
  'aria-invalid': ariaInvalid,
  id,
  transformToken,
}: TokenInputProps) {
  const [inputValue, setInputValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const normalizeToken = (raw: string): string | null => {
    const trimmed = raw.trim();
    if (!trimmed) return null;
    return transformToken ? transformToken(trimmed) : trimmed;
  };

  const addToken = (raw: string) => {
    const token = normalizeToken(raw);
    if (!token || values.includes(token)) return;
    if (maxTags !== undefined && values.length >= maxTags) return;
    onChange([...values, token]);
    setInputValue('');
  };

  const removeToken = (index: number) => {
    if (disabled) return;
    onChange(values.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addToken(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && values.length > 0) {
      removeToken(values.length - 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData('text');
    if (!/[,;\n]/.test(text)) return;
    e.preventDefault();
    const existing = new Set(values);
    const unique = text
      .split(/[,;\n]+/)
      .map(s => normalizeToken(s))
      .filter((t): t is string => t !== null)
      .filter(t => !existing.has(t) && existing.add(t));
    const budget = maxTags === undefined ? unique.length : maxTags - values.length;
    onChange([...values, ...unique.slice(0, budget)]);
    setInputValue('');
  };

  return (
    <div
      role="group"
      className={cn(
        'flex min-h-9 w-full flex-wrap items-center gap-1.5 rounded-md border border-input bg-transparent px-3 py-1.5 text-sm shadow-xs transition-[color,box-shadow] outline-none dark:bg-input/30',
        'focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50',
        ariaInvalid && 'border-destructive ring-destructive/20 dark:ring-destructive/40',
        disabled && 'pointer-events-none cursor-not-allowed opacity-50',
        className
      )}
      onClick={() => inputRef.current?.focus()}
    >
      {values.map((value, index) => (
        <TokenBadge
          key={value}
          value={value}
          disabled={disabled}
          onRemove={() => removeToken(index)}
        />
      ))}
      <input
        ref={inputRef}
        id={id}
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onBlur={() => {
          if (inputValue.trim()) addToken(inputValue);
        }}
        placeholder={values.length === 0 ? placeholder : undefined}
        disabled={disabled}
        className="min-w-[80px] flex-1 bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
      />
    </div>
  );
}

export { TokenInput };
