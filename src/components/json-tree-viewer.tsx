/**
 * JsonTreeViewer - Interactive expand/collapse JSON tree viewer
 *
 * Renders any JSON-compatible value as a navigable tree with:
 * - Auto-expand first 2 nesting levels
 * - Type-specific color coding (strings, numbers, booleans, keys)
 * - Chevron toggle for objects and arrays
 * - Memoized to prevent unnecessary re-renders
 */

'use client';

import { useState, memo } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

export const JsonTreeViewer = memo(function JsonTreeViewer({
  data,
  level = 0,
  /** When true, skip the outer `{` wrapper and render top-level keys directly. */
  root = false,
}: {
  data: unknown;
  level?: number;
  root?: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(level < 2); // Auto-expand first 2 levels

  if (data === null || data === undefined) {
    return <span className="text-muted-foreground">null</span>;
  }

  if (typeof data === 'string') {
    return <span className="text-green-600 dark:text-green-400">&quot;{data}&quot;</span>;
  }

  if (typeof data === 'number' || typeof data === 'boolean') {
    return <span className="text-blue-600 dark:text-blue-400">{String(data)}</span>;
  }

  if (Array.isArray(data)) {
    if (data.length === 0) {
      return <span className="text-muted-foreground">[]</span>;
    }

    return (
      <div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-left hover:text-foreground"
        >
          {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
          <span className="text-muted-foreground">[{data.length}]</span>
        </button>
        {isExpanded && (
          <div className="ml-4 space-y-1 border-l pl-2">
            {data.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-xs text-muted-foreground">{idx}:</span>
                <div className="flex-1">
                  <JsonTreeViewer data={item} level={level + 1} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (typeof data === 'object') {
    const entries = Object.entries(data);
    if (entries.length === 0) {
      return <span className="text-muted-foreground">{'{}'}</span>;
    }

    // Root mode: render keys directly without the outer { } wrapper
    if (root) {
      return (
        <div className="space-y-1">
          {entries.map(([key, value]) => (
            <div key={key} className="flex items-start gap-2">
              <span className="font-medium text-purple-600 dark:text-purple-400">
                &quot;{key}&quot;:
              </span>
              <div className="flex-1">
                <JsonTreeViewer data={value} level={level + 1} />
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-left hover:text-foreground"
        >
          {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
          <span className="text-muted-foreground">{'{'}</span>
        </button>
        {isExpanded && (
          <div className="ml-4 space-y-1 border-l pl-2">
            {entries.map(([key, value]) => (
              <div key={key} className="flex items-start gap-2">
                <span className="font-medium text-purple-600 dark:text-purple-400">
                  &quot;{key}&quot;:
                </span>
                <div className="flex-1">
                  <JsonTreeViewer data={value} level={level + 1} />
                </div>
              </div>
            ))}
          </div>
        )}
        {isExpanded && <span className="text-muted-foreground">{'}'}</span>}
      </div>
    );
  }

  return <span className="text-muted-foreground">{String(data)}</span>;
});
