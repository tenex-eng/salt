import { cn } from '../lib/utils';

interface NumberedPreProps {
  code: string;
  className?: string;
}

export function NumberedPre({ code, className }: NumberedPreProps) {
  const lines = code.split('\n');
  const gutterWidth = `${String(lines.length).length + 1}ch`;

  return (
    <pre className={cn('w-full font-mono text-xs', className)}>
      {lines.map((line, i) => (
        <div key={i} className="flex">
          <span
            className="shrink-0 pr-4 text-right text-muted-foreground/50 select-none"
            style={{ minWidth: gutterWidth }}
          >
            {i + 1}
          </span>
          <span className="min-w-0 flex-1 break-all whitespace-pre-wrap">{line || '\u00A0'}</span>
        </div>
      ))}
    </pre>
  );
}
