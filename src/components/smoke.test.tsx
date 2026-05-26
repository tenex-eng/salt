import { render, screen } from '@testing-library/react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardContent,
  Checkbox,
  Input,
  Label,
  Progress,
  Skeleton,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Textarea,
} from '../index';

describe('primitive smoke tests', () => {
  it('renders common display primitives', () => {
    render(
      <>
        <Badge>Badge</Badge>
        <Card><CardContent>Card body</CardContent></Card>
        <Alert><AlertTitle>Notice</AlertTitle><AlertDescription>Details</AlertDescription></Alert>
        <Avatar><AvatarFallback>FS</AvatarFallback></Avatar>
        <Skeleton aria-label="Loading" />
      </>
    );

    expect(screen.getByText('Badge')).toBeInTheDocument();
    expect(screen.getByText('Card body')).toBeInTheDocument();
    expect(screen.getByText('Notice')).toBeInTheDocument();
    expect(screen.getByText('FS')).toBeInTheDocument();
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  it('renders common form primitives with accessible names', () => {
    render(
      <>
        <Label htmlFor="name">Name</Label>
        <Input id="name" />
        <Textarea aria-label="Notes" />
        <Button>Save</Button>
        <Checkbox aria-label="Enable alerts" />
        <Switch aria-label="Enable notifications" />
      </>
    );

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Notes')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    expect(screen.getByLabelText('Enable alerts')).toBeInTheDocument();
    expect(screen.getByLabelText('Enable notifications')).toBeInTheDocument();
  });

  it('renders data primitives', () => {
    render(
      <>
        <Progress value={50} aria-label="Progress" />
        <Table>
          <TableHeader><TableRow><TableHead>Name</TableHead></TableRow></TableHeader>
          <TableBody><TableRow><TableCell>Alert</TableCell></TableRow></TableBody>
        </Table>
      </>
    );

    expect(screen.getByLabelText('Progress')).toBeInTheDocument();
    expect(screen.getByText('Alert')).toBeInTheDocument();
  });
});
