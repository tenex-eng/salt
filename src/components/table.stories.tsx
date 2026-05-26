import type { Meta } from '@storybook/react-vite';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table';

const meta: Meta = { title: 'Primitives/Table' };
export default meta;

export function Basic() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Endpoint alert</TableCell>
          <TableCell>Open</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
