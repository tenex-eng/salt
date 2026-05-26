'use client';

import React, { useState } from 'react';
import { Search, ChevronDown, X, Check } from 'lucide-react';
import { Button } from './';
import { Input } from './';
import { Popover, PopoverContent, PopoverTrigger } from './';
import { cn } from '../lib/utils';

export interface MultiSelectOption<T = string> {
  value: T;
  label: string;
  searchableText?: string;
}

interface MultiSelectDropdownProps<T = string> {
  placeholder: string;
  options: MultiSelectOption<T>[];
  selected: T[];
  onChange: (values: T[]) => void;
  showClearButton?: boolean;
  className?: string;
  buttonClassName?: string;
  width?: number;
  contentWidth?: number;
  maxHeight?: number;
  renderOption?: (option: MultiSelectOption<T>, isSelected: boolean) => React.ReactNode;
  disableSearch?: boolean;
  /** Callback when search input changes - use for server-side search */
  onSearchChange?: (search: string) => void;
  /** If true, skips client-side filtering (use when doing server-side search) */
  disableClientFilter?: boolean;
  /** Override the button label entirely (replaces placeholder + count) */
  buttonLabel?: string;
}

export function MultiSelectDropdown<T = string>({
  placeholder,
  options,
  selected,
  onChange,
  showClearButton = true,
  className,
  buttonClassName,
  width = 180,
  contentWidth,
  maxHeight = 300,
  renderOption,
  disableSearch = false,
  onSearchChange,
  disableClientFilter = false,
  buttonLabel,
}: MultiSelectDropdownProps<T>) {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Handle search change with optional callback for server-side search
  const handleSearchChange = (value: string) => {
    setSearch(value);
    onSearchChange?.(value);
  };

  // Options are already in MultiSelectOption format
  const normalizedOptions = options;

  // Filter options based on search (skip if using server-side search)
  const filteredOptions = (() => {
    if (disableClientFilter || !search) return normalizedOptions;

    const searchLower = search.toLowerCase();
    return normalizedOptions.filter(option => {
      const searchText = option.searchableText || option.label.toLowerCase();
      return searchText.includes(searchLower);
    });
  })();

  const handleSelect = (value: T) => {
    const currentSelected = selected.findIndex(v => v === value) >= 0;
    if (currentSelected) {
      onChange(selected.filter(v => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onChange([]);
    setSearch('');
  };

  const isValueSelected = (value: T) => selected.findIndex(v => v === value) >= 0;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <div className="relative">
        {showClearButton && selected.length > 0 && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 right-1 z-10 h-4 w-4 -translate-y-1/2 transform rounded-full p-0 opacity-70 hover:bg-accent-foreground/10 hover:opacity-100"
            onClick={handleClear}
            title={`Clear ${placeholder.toLowerCase()} selections`}
          >
            <X className="h-3 w-3" />
          </Button>
        )}

        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              'h-9 justify-between px-2 pr-2',
              selected.length > 0 && 'bg-accent',
              buttonClassName
            )}
            style={{ width: `${width}px` }}
            aria-expanded={isOpen}
            role="combobox"
          >
            <span className="flex w-full items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                {buttonLabel ?? placeholder}
                {!buttonLabel && selected.length > 0 && (
                  <span className="text-xs text-muted-foreground">({selected.length})</span>
                )}
              </span>
              {(buttonLabel ? true : selected.length === 0) && (
                <span className="ml-2 flex w-4 justify-center">
                  <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                </span>
              )}
            </span>
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className={cn('pointer-events-auto p-0', className)}
          style={{
            width: contentWidth !== undefined ? `${contentWidth}px` : 'auto',
            minWidth: `${width}px`,
            zIndex: 60,
          }}
          align="start"
          onOpenAutoFocus={e => {
            // Prevent focusing the first button, keep focus on search input if present
            e.preventDefault();
          }}
        >
          {!disableSearch && (
            <div className="border-b p-2">
              <div className="relative">
                <Search className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={search}
                  onChange={e => handleSearchChange(e.target.value)}
                  className="h-8 border-0 pl-8 text-sm shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  onClick={e => e.stopPropagation()}
                />
              </div>
            </div>
          )}
          <div
            className="overflow-y-auto"
            style={{ maxHeight: `${maxHeight}px` }}
            onWheel={e => e.stopPropagation()}
          >
            <div className="flex flex-col px-2 py-1">
              {filteredOptions.length === 0 ? (
                <p className="py-6 text-center text-sm text-muted-foreground">No results found.</p>
              ) : (
                filteredOptions.map(option => (
                  <Button
                    key={String(option.value)}
                    variant="ghost"
                    className={cn(
                      'mb-1 h-auto min-h-8 w-full items-start justify-start px-2 py-1.5 text-left',
                      isValueSelected(option.value) && 'bg-accent'
                    )}
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleSelect(option.value);
                    }}
                  >
                    {renderOption ? (
                      renderOption(option, isValueSelected(option.value))
                    ) : (
                      <span className="flex items-center gap-2">
                        {isValueSelected(option.value) && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                        <span className="text-sm">{option.label}</span>
                      </span>
                    )}
                  </Button>
                ))
              )}
            </div>
          </div>
        </PopoverContent>
      </div>
    </Popover>
  );
}
