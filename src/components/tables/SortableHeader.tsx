import { ArrowDown, ArrowUp, ChevronsUpDown } from 'lucide-react';
import { Button } from '../button';

export type SortDirection = 'asc' | 'desc' | null;

export function SortableHeader({ children, direction, onSort }: { children: React.ReactNode; direction: SortDirection; onSort: () => void }) {
  const Icon = direction === 'asc' ? ArrowUp : direction === 'desc' ? ArrowDown : ChevronsUpDown;
  return (
    <Button variant="ghost" size="sm" className="h-8 px-2" onClick={onSort}>
      {children}
      <Icon className="ml-2 size-4" />
    </Button>
  );
}
