import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './table';
import { Badge } from './badge';
import { Checkbox } from './checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from './pagination';
import { Skeleton } from './skeleton';
import { SortableHeader, type SortDirection } from './tables/SortableHeader';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const invoices = [
  { invoice: 'INV001', status: 'Paid', method: 'Credit Card', amount: '$250.00' },
  { invoice: 'INV002', status: 'Pending', method: 'PayPal', amount: '$150.00' },
  { invoice: 'INV003', status: 'Unpaid', method: 'Bank Transfer', amount: '$350.00' },
  { invoice: 'INV004', status: 'Paid', method: 'Credit Card', amount: '$450.00' },
  { invoice: 'INV005', status: 'Paid', method: 'PayPal', amount: '$550.00' },
];

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map(invoice => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.status}</TableCell>
            <TableCell>{invoice.method}</TableCell>
            <TableCell className="text-right">{invoice.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$1,750.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

const alerts = [
  {
    id: 'ALT-001',
    title: 'Suspicious Login',
    severity: 'Critical',
    status: 'Open',
    created: '2024-01-15',
  },
  {
    id: 'ALT-002',
    title: 'Malware Detected',
    severity: 'High',
    status: 'In Progress',
    created: '2024-01-14',
  },
  {
    id: 'ALT-003',
    title: 'Port Scan',
    severity: 'Medium',
    status: 'Open',
    created: '2024-01-14',
  },
  {
    id: 'ALT-004',
    title: 'Failed Auth',
    severity: 'Low',
    status: 'Resolved',
    created: '2024-01-13',
  },
  {
    id: 'ALT-005',
    title: 'Unusual Traffic',
    severity: 'High',
    status: 'Open',
    created: '2024-01-13',
  },
];

export const AlertsTable: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Alert ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Severity</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {alerts.map(alert => (
          <TableRow key={alert.id}>
            <TableCell className="font-mono text-sm">{alert.id}</TableCell>
            <TableCell className="font-medium">{alert.title}</TableCell>
            <TableCell>
              <Badge
                variant={
                  alert.severity === 'Critical'
                    ? 'destructive'
                    : alert.severity === 'High'
                      ? 'default'
                      : alert.severity === 'Medium'
                        ? 'secondary'
                        : 'outline'
                }
              >
                {alert.severity}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge variant="outline">{alert.status}</Badge>
            </TableCell>
            <TableCell className="text-right">{alert.created}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const WithSelection: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">
            <Checkbox />
          </TableHead>
          <TableHead>Case ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Assignee</TableHead>
          <TableHead className="text-right">Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[
          {
            id: 'CASE-001',
            title: 'Phishing Investigation',
            assignee: 'John A.',
            created: 'Jan 15',
          },
          { id: 'CASE-002', title: 'Malware Analysis', assignee: 'Jane S.', created: 'Jan 14' },
          { id: 'CASE-003', title: 'Data Breach', assignee: 'Bob I.', created: 'Jan 13' },
        ].map(c => (
          <TableRow key={c.id}>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell className="font-mono text-sm">{c.id}</TableCell>
            <TableCell className="font-medium">{c.title}</TableCell>
            <TableCell>{c.assignee}</TableCell>
            <TableCell className="text-right">{c.created}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const Striped: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Event</TableHead>
          <TableHead>Source</TableHead>
          <TableHead className="text-right">Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 6 }).map((_, i) => (
          <TableRow key={i} className={i % 2 === 0 ? 'bg-muted/50' : ''}>
            <TableCell className="font-mono text-sm">EVT-{1000 + i}</TableCell>
            <TableCell>Network Connection</TableCell>
            <TableCell>192.168.1.{100 + i}</TableCell>
            <TableCell className="text-right">12:3{i}:00</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const Empty: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={3} className="h-24 text-center">
            No results found.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

/**
 * Sticky header with 1px bottom border when scrolled.
 * Uses the same pattern as CaseListTable: `sticky top-0 z-30` + inset box-shadow.
 */
export const StickyHeader: Story = {
  render: () => (
    <div className="h-[250px] overflow-auto rounded-md border">
      <Table>
        <TableHeader className="sticky top-0 z-30 bg-background shadow-[inset_0_-1px_0_var(--color-border)]">
          <TableRow>
            <TableHead>Alert ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead className="text-right">Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 20 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell className="font-mono text-sm">
                ALT-{String(i + 1).padStart(3, '0')}
              </TableCell>
              <TableCell>Suspicious Activity #{i + 1}</TableCell>
              <TableCell>
                <Badge
                  variant={i % 3 === 0 ? 'destructive' : i % 3 === 1 ? 'default' : 'secondary'}
                >
                  {i % 3 === 0 ? 'Critical' : i % 3 === 1 ? 'High' : 'Medium'}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                2024-01-{String(15 - (i % 15)).padStart(2, '0')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};

/**
 * SortableHeader component — reusable across all tables.
 * Shows three states: unsorted (up-down), ascending (up), descending (down).
 */
export const SortableHeaders: Story = {
  render: function SortableHeadersStory() {
    const [sorting, setSorting] = useState<{ id: string; direction: SortDirection }>({
      id: 'priority',
      direction: 'desc',
    });

    const toggle = (id: string) => {
      setSorting(prev => {
        if (prev.id !== id) return { id, direction: 'asc' };
        if (prev.direction === 'asc') return { id, direction: 'desc' };
        if (prev.direction === 'desc') return { id: '', direction: false };
        return { id, direction: 'asc' };
      });
    };

    const dir = (id: string): SortDirection => (sorting.id === id ? sorting.direction : false);

    const data = [
      { id: 1, title: 'Phishing Investigation', priority: 92, status: 'Open', created: 'Jan 15' },
      { id: 2, title: 'Malware Analysis', priority: 78, status: 'In Progress', created: 'Jan 14' },
      { id: 3, title: 'Data Exfiltration', priority: 95, status: 'Open', created: 'Jan 13' },
      { id: 4, title: 'Brute Force Attempt', priority: 45, status: 'Resolved', created: 'Jan 12' },
      { id: 5, title: 'Lateral Movement', priority: 88, status: 'Open', created: 'Jan 11' },
    ];

    const sorted = [...data].sort((a, b) => {
      if (!sorting.direction || !sorting.id) return 0;
      const key = sorting.id as keyof typeof a;
      const mult = sorting.direction === 'asc' ? 1 : -1;
      return a[key] < b[key] ? -1 * mult : a[key] > b[key] ? 1 * mult : 0;
    });

    return (
      <Table>
        <TableHeader className="sticky top-0 z-30 bg-background shadow-[inset_0_-1px_0_var(--color-border)]">
          <TableRow>
            <TableHead>
              <SortableHeader
                title="Priority"
                sortDirection={dir('priority')}
                onClick={() => toggle('priority')}
              />
            </TableHead>
            <TableHead>
              <SortableHeader
                title="Title"
                sortDirection={dir('title')}
                onClick={() => toggle('title')}
              />
            </TableHead>
            <TableHead>
              <SortableHeader
                title="Status"
                sortDirection={dir('status')}
                onClick={() => toggle('status')}
              />
            </TableHead>
            <TableHead>
              <SortableHeader
                title="Created"
                sortDirection={dir('created')}
                onClick={() => toggle('created')}
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map(row => (
            <TableRow key={row.id}>
              <TableCell className="font-medium">{row.priority}</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>
                <Badge variant="outline">{row.status}</Badge>
              </TableCell>
              <TableCell>{row.created}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

/**
 * Pagination footer pattern: "Showing X to Y of Z" + page size select + page controls.
 * Matches the CaseListTable pagination layout.
 */
export const WithPagination: Story = {
  render: function PaginationStory() {
    const totalItems = 237;
    const [pageSize, setPageSize] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(totalItems / pageSize);
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalItems);

    const data = Array.from({ length: pageSize }).map((_, i) => ({
      id: `CASE-${String(start + i).padStart(3, '0')}`,
      title: `Investigation #${start + i}`,
      status: i % 3 === 0 ? 'Open' : i % 3 === 1 ? 'In Progress' : 'Resolved',
      priority: ((start + i) * 17 + 3) % 100,
    }));

    return (
      <div className="flex flex-col gap-4">
        <Table>
          <TableHeader className="sticky top-0 z-30 bg-background shadow-[inset_0_-1px_0_var(--color-border)]">
            <TableRow>
              <TableHead>Case ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Priority</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map(row => (
              <TableRow key={row.id}>
                <TableCell className="font-mono text-sm">{row.id}</TableCell>
                <TableCell className="font-medium">{row.title}</TableCell>
                <TableCell>
                  <Badge variant="outline">{row.status}</Badge>
                </TableCell>
                <TableCell className="text-right">{row.priority}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination footer */}
        <div className="flex items-center justify-between px-2">
          <p className="text-sm text-muted-foreground">
            Showing {start} to {end} of {totalItems} cases
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Per page</span>
              <Select
                value={String(pageSize)}
                onValueChange={v => {
                  setPageSize(Number(v));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="75">75</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    aria-disabled={currentPage === 1}
                    className={
                      currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'
                    }
                  />
                </PaginationItem>
                {currentPage > 2 && (
                  <PaginationItem>
                    <PaginationLink onClick={() => setCurrentPage(1)} className="cursor-pointer">
                      1
                    </PaginationLink>
                  </PaginationItem>
                )}
                {currentPage > 3 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => setCurrentPage(currentPage - 1)}
                      className="cursor-pointer"
                    >
                      {currentPage - 1}
                    </PaginationLink>
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationLink isActive>{currentPage}</PaginationLink>
                </PaginationItem>
                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => setCurrentPage(currentPage + 1)}
                      className="cursor-pointer"
                    >
                      {currentPage + 1}
                    </PaginationLink>
                  </PaginationItem>
                )}
                {currentPage < totalPages - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                {currentPage < totalPages - 1 && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => setCurrentPage(totalPages)}
                      className="cursor-pointer"
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    aria-disabled={currentPage === totalPages}
                    className={
                      currentPage === totalPages
                        ? 'pointer-events-none opacity-50'
                        : 'cursor-pointer'
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    );
  },
};

/** Skeleton loading state for table rows. */
export const SkeletonLoading: Story = {
  render: () => (
    <Table>
      <TableHeader className="sticky top-0 z-30 bg-background shadow-[inset_0_-1px_0_var(--color-border)]">
        <TableRow>
          <TableHead>Priority</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 5 }).map((_, i) => (
          <TableRow key={i}>
            <TableCell>
              <Skeleton className="h-5 w-10" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-48" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-20" />
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="ml-auto h-5 w-16" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};
