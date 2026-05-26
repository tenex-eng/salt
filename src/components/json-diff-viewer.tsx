'use client';

import React from 'react';
import { cn } from '../lib/utils';
import { DISPLAY_LIMITS } from './json-diff-limits';

const DIFF_COLORS = {
  added: {
    background: 'bg-green-100 dark:bg-green-950/30',
    text: 'text-green-700 dark:text-green-300',
    rounded: 'rounded px-1',
  },
  removed: {
    background: 'bg-red-100 dark:bg-red-950/30',
    text: 'text-red-700 dark:text-red-300',
    rounded: 'rounded px-1',
  },
  unchanged: {
    text: 'text-muted-foreground',
  },
} as const;

interface JsonDiffViewerProps {
  current: unknown;
  compare?: unknown;
  className?: string;
  maxDepth?: number;
}

export function JsonDiffViewer({
  current,
  compare,
  className,
  maxDepth = DISPLAY_LIMITS.jsonNestingDepth,
}: JsonDiffViewerProps) {
  const diffContent = !compare ? (
    <JsonViewer data={current} />
  ) : (
    <DiffRenderer current={current} compare={compare} maxDepth={maxDepth} />
  );

  return (
    <div className={cn('rounded-md bg-gray-50 p-4 dark:bg-gray-900', className)}>
      <pre className="text-xs break-words whitespace-pre-wrap">{diffContent}</pre>
    </div>
  );
}

// Simple JSON viewer for non-diff mode
function JsonViewer({ data }: { data: unknown }) {
  if (data === null || data === undefined) {
    return <span className="text-xs text-muted-foreground">null</span>;
  }

  return <>{JSON.stringify(data, null, 2)}</>;
}

// Main diff renderer component
function DiffRenderer({
  current,
  compare,
  maxDepth,
  depth = 0,
}: {
  current: unknown;
  compare: unknown;
  maxDepth: number;
  depth?: number;
}) {
  if (depth > maxDepth) {
    return <span className="text-xs text-muted-foreground">...</span>;
  }

  // Handle null/undefined
  if (current === null || current === undefined) {
    if (compare === null || compare === undefined) {
      return <span className="font-mono text-xs text-muted-foreground">null</span>;
    }
    return (
      <span
        className={cn(
          'font-mono text-xs',
          DIFF_COLORS.added.background,
          DIFF_COLORS.added.text,
          DIFF_COLORS.added.rounded
        )}
      >
        null
      </span>
    );
  }

  // Handle primitives
  if (typeof current !== 'object') {
    return <PrimitiveDiff current={current} compare={compare} />;
  }

  // Handle arrays
  if (Array.isArray(current)) {
    return (
      <ArrayDiff
        current={current}
        compare={Array.isArray(compare) ? compare : []}
        depth={depth}
        maxDepth={maxDepth}
      />
    );
  }

  // Handle objects
  return (
    <ObjectDiff
      current={(current as Record<string, unknown>) || {}}
      compare={(compare as Record<string, unknown>) || {}}
      depth={depth}
      maxDepth={maxDepth}
    />
  );
}

// Primitive value diff
function PrimitiveDiff({ current, compare }: { current: unknown; compare: unknown }) {
  const currentStr = JSON.stringify(current);
  const compareStr = JSON.stringify(compare);

  if (currentStr === compareStr) {
    return <span className="font-mono text-xs">{currentStr}</span>;
  }

  if (compare !== undefined && currentStr !== compareStr) {
    return (
      <>
        <span
          className={cn(
            'font-mono text-xs',
            DIFF_COLORS.removed.background,
            DIFF_COLORS.removed.text,
            DIFF_COLORS.removed.rounded
          )}
        >
          {compareStr}
        </span>
        {' → '}
        <span
          className={cn(
            'font-mono text-xs',
            DIFF_COLORS.added.background,
            DIFF_COLORS.added.text,
            DIFF_COLORS.added.rounded
          )}
        >
          {currentStr}
        </span>
      </>
    );
  }

  return (
    <span
      className={cn(
        'font-mono text-xs',
        DIFF_COLORS.added.background,
        DIFF_COLORS.added.text,
        DIFF_COLORS.added.rounded
      )}
    >
      {currentStr}
    </span>
  );
}

// Array diff
function ArrayDiff({
  current,
  compare,
  depth,
  maxDepth,
}: {
  current: unknown[];
  compare: unknown[];
  depth: number;
  maxDepth: number;
}) {
  if (current.length === 0) {
    return <span className="font-mono text-xs">[]</span>;
  }

  const indent = '  '.repeat(depth);
  const nextIndent = '  '.repeat(depth + 1);

  return (
    <>
      <span className="font-mono text-xs">[</span>
      {current.map((currentItem, index) => {
        const compareItem = index < compare.length ? compare[index] : undefined;
        const isLast = index === current.length - 1;

        return (
          <React.Fragment key={index}>
            {'\n'}
            <span className="font-mono text-xs">{nextIndent}</span>
            <DiffRenderer
              current={currentItem}
              compare={compareItem}
              depth={depth + 1}
              maxDepth={maxDepth}
            />
            {!isLast && <span className="font-mono text-xs">,</span>}
          </React.Fragment>
        );
      })}
      {'\n'}
      <span className="font-mono text-xs">{indent}]</span>
    </>
  );
}

// Object diff
function ObjectDiff({
  current,
  compare,
  depth,
  maxDepth,
}: {
  current: Record<string, unknown>;
  compare: Record<string, unknown>;
  depth: number;
  maxDepth: number;
}) {
  const indent = '  '.repeat(depth);
  const nextIndent = '  '.repeat(depth + 1);

  // Safely handle null/undefined objects
  const safeCurrentKeys = current ? Object.keys(current) : [];
  const safeCompareKeys = compare ? Object.keys(compare) : [];

  const addedKeys = safeCurrentKeys.filter(k => !compare || !(k in compare));
  const removedKeys = safeCompareKeys.filter(k => !current || !(k in current));
  const commonKeys = safeCurrentKeys.filter(k => compare && k in compare);

  // Sort keys for consistent display
  const sortedCurrentKeys = [...commonKeys, ...addedKeys].sort();
  const sortedRemovedKeys = removedKeys.sort();

  if (sortedCurrentKeys.length === 0 && sortedRemovedKeys.length === 0) {
    return <span className="font-mono text-xs">{'{}'}</span>;
  }

  return (
    <>
      <span className="font-mono text-xs">{'{'}</span>

      {/* Render current/modified keys */}
      {sortedCurrentKeys.map((key, index) => {
        const currentValue = current?.[key];
        const compareValue = compare?.[key];
        const hasChanged =
          compare &&
          key in compare &&
          JSON.stringify(currentValue) !== JSON.stringify(compareValue);
        const isNew = !compare || !(key in compare);
        const isLast = index === sortedCurrentKeys.length - 1 && sortedRemovedKeys.length === 0;

        return (
          <ObjectKey
            key={key}
            keyName={key}
            currentValue={currentValue}
            compareValue={compareValue}
            hasChanged={hasChanged}
            isNew={isNew}
            isLast={isLast}
            depth={depth}
            maxDepth={maxDepth}
            indent={nextIndent}
          />
        );
      })}

      {/* Render removed keys */}
      {sortedRemovedKeys.map((key, index) => {
        const isLast = index === sortedRemovedKeys.length - 1;
        return (
          <RemovedKey
            key={`removed-${key}`}
            keyName={key}
            value={compare?.[key]}
            isLast={isLast}
            indent={nextIndent}
          />
        );
      })}

      {'\n'}
      <span className="font-mono text-xs">
        {indent}
        {'}'}
      </span>
    </>
  );
}

// Object key renderer
function ObjectKey({
  keyName,
  currentValue,
  compareValue,
  hasChanged,
  isNew,
  isLast,
  depth,
  maxDepth,
  indent,
}: {
  keyName: string;
  currentValue: unknown;
  compareValue: unknown;
  hasChanged: boolean;
  isNew: boolean;
  isLast: boolean;
  depth: number;
  maxDepth: number;
  indent: string;
}) {
  const isComplex = currentValue !== null && typeof currentValue === 'object';

  return (
    <React.Fragment>
      {'\n'}
      <span className="font-mono text-xs">{indent}</span>
      <span
        className={cn('font-mono text-xs', hasChanged || isNew ? '' : DIFF_COLORS.unchanged.text)}
      >
        &quot;{keyName}&quot;:{' '}
      </span>
      {isComplex ? (
        <DiffRenderer
          current={currentValue}
          compare={compareValue}
          depth={depth + 1}
          maxDepth={maxDepth}
        />
      ) : (
        <ValueDiff
          currentValue={currentValue}
          compareValue={compareValue}
          hasChanged={hasChanged}
          isNew={isNew}
        />
      )}
      {!isLast && <span className="font-mono text-xs">,</span>}
    </React.Fragment>
  );
}

// Value diff for simple values
function ValueDiff({
  currentValue,
  compareValue,
  hasChanged,
  isNew,
}: {
  currentValue: unknown;
  compareValue: unknown;
  hasChanged: boolean;
  isNew: boolean;
}) {
  if (hasChanged && compareValue !== undefined) {
    return (
      <>
        <span
          className={cn(
            'font-mono text-xs',
            DIFF_COLORS.removed.background,
            DIFF_COLORS.removed.text,
            DIFF_COLORS.removed.rounded
          )}
        >
          {JSON.stringify(compareValue)}
        </span>
        <span className="font-mono text-xs"> → </span>
        <span
          className={cn(
            'font-mono text-xs',
            DIFF_COLORS.added.background,
            DIFF_COLORS.added.text,
            DIFF_COLORS.added.rounded
          )}
        >
          {JSON.stringify(currentValue)}
        </span>
      </>
    );
  }

  return (
    <span
      className={cn(
        'font-mono text-xs',
        isNew
          ? cn(DIFF_COLORS.added.background, DIFF_COLORS.added.text, DIFF_COLORS.added.rounded)
          : ''
      )}
    >
      {JSON.stringify(currentValue)}
    </span>
  );
}

// Removed key renderer
function RemovedKey({
  keyName,
  value,
  isLast,
  indent,
}: {
  keyName: string;
  value: unknown;
  isLast: boolean;
  indent: string;
}) {
  return (
    <React.Fragment>
      {'\n'}
      <span className="font-mono text-xs">{indent}</span>
      <span
        className={cn(
          'font-mono text-xs',
          DIFF_COLORS.removed.background,
          DIFF_COLORS.removed.text,
          DIFF_COLORS.removed.rounded
        )}
      >
        &quot;{keyName}&quot;: {JSON.stringify(value)}
      </span>
      {!isLast && <span className="font-mono text-xs">,</span>}
    </React.Fragment>
  );
}
