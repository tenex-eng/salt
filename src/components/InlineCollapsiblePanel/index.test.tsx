import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InlinePanelProvider, useInlinePanel, InlinePanel } from './index';

beforeEach(() => {
  localStorage.clear();
});

function TestToggle() {
  const { toggle } = useInlinePanel();
  return <button onClick={toggle}>toggle</button>;
}

function TestClose() {
  const { close } = useInlinePanel();
  return <button onClick={close}>close</button>;
}

function TestSetOpen({ value }: { value: boolean }) {
  const { setOpen } = useInlinePanel();
  return <button onClick={() => setOpen(value)}>setOpen</button>;
}

function TestOpenDisplay() {
  const { open } = useInlinePanel();
  return <span data-testid="open-state">{String(open)}</span>;
}

describe('InlinePanelProvider', () => {
  it('initializes open from localStorage when stored as 1', () => {
    localStorage.setItem('test-key', '1');
    render(
      <InlinePanelProvider storageKey="test-key">
        <TestOpenDisplay />
      </InlinePanelProvider>
    );
    expect(screen.getByTestId('open-state').textContent).toBe('true');
  });

  it('initializes closed from localStorage when stored as 0', () => {
    localStorage.setItem('test-key', '0');
    render(
      <InlinePanelProvider storageKey="test-key">
        <TestOpenDisplay />
      </InlinePanelProvider>
    );
    expect(screen.getByTestId('open-state').textContent).toBe('false');
  });

  it('defaults to closed when no localStorage value', () => {
    render(
      <InlinePanelProvider storageKey="test-key">
        <TestOpenDisplay />
      </InlinePanelProvider>
    );
    expect(screen.getByTestId('open-state').textContent).toBe('false');
  });

  it('uses defaultOpen when no localStorage value', () => {
    render(
      <InlinePanelProvider storageKey="test-key" defaultOpen>
        <TestOpenDisplay />
      </InlinePanelProvider>
    );
    expect(screen.getByTestId('open-state').textContent).toBe('true');
  });

  it('localStorage takes precedence over defaultOpen', () => {
    localStorage.setItem('test-key', '0');
    render(
      <InlinePanelProvider storageKey="test-key" defaultOpen>
        <TestOpenDisplay />
      </InlinePanelProvider>
    );
    expect(screen.getByTestId('open-state').textContent).toBe('false');
  });

  it('toggle flips open state', async () => {
    render(
      <InlinePanelProvider storageKey="test-key">
        <TestToggle />
        <TestOpenDisplay />
      </InlinePanelProvider>
    );
    expect(screen.getByTestId('open-state').textContent).toBe('false');
    await userEvent.click(screen.getByRole('button', { name: 'toggle' }));
    expect(screen.getByTestId('open-state').textContent).toBe('true');
    await userEvent.click(screen.getByRole('button', { name: 'toggle' }));
    expect(screen.getByTestId('open-state').textContent).toBe('false');
  });

  it('toggle persists state to localStorage', async () => {
    render(
      <InlinePanelProvider storageKey="test-key">
        <TestToggle />
      </InlinePanelProvider>
    );
    await userEvent.click(screen.getByRole('button', { name: 'toggle' }));
    expect(localStorage.getItem('test-key')).toBe('1');
    await userEvent.click(screen.getByRole('button', { name: 'toggle' }));
    expect(localStorage.getItem('test-key')).toBe('0');
  });

  it('close sets open to false', async () => {
    localStorage.setItem('test-key', '1');
    render(
      <InlinePanelProvider storageKey="test-key">
        <TestClose />
        <TestOpenDisplay />
      </InlinePanelProvider>
    );
    expect(screen.getByTestId('open-state').textContent).toBe('true');
    await userEvent.click(screen.getByRole('button', { name: 'close' }));
    expect(screen.getByTestId('open-state').textContent).toBe('false');
  });

  it('close persists false to localStorage', async () => {
    localStorage.setItem('test-key', '1');
    render(
      <InlinePanelProvider storageKey="test-key">
        <TestClose />
      </InlinePanelProvider>
    );
    await userEvent.click(screen.getByRole('button', { name: 'close' }));
    expect(localStorage.getItem('test-key')).toBe('0');
  });

  it('setOpen controls state directly', async () => {
    render(
      <InlinePanelProvider storageKey="test-key">
        <TestSetOpen value />
        <TestOpenDisplay />
      </InlinePanelProvider>
    );
    await userEvent.click(screen.getByRole('button', { name: 'setOpen' }));
    expect(screen.getByTestId('open-state').textContent).toBe('true');
  });
});

describe('useInlinePanel', () => {
  it('throws when used outside InlinePanelProvider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<TestOpenDisplay />)).toThrow(
      'useInlinePanel must be used within InlinePanelProvider'
    );
    consoleError.mockRestore();
  });
});

describe('InlinePanel', () => {
  it('renders children when open', () => {
    localStorage.setItem('test-key', '1');
    render(
      <InlinePanelProvider storageKey="test-key">
        <InlinePanel>panel content</InlinePanel>
      </InlinePanelProvider>
    );
    expect(screen.getByText('panel content')).toBeDefined();
  });

  it('renders children when closed (still in DOM, just zero width)', () => {
    render(
      <InlinePanelProvider storageKey="test-key">
        <InlinePanel>panel content</InlinePanel>
      </InlinePanelProvider>
    );
    expect(screen.getByText('panel content')).toBeDefined();
  });

  it('sets width to 0 on aside when closed', () => {
    render(
      <InlinePanelProvider storageKey="test-key">
        <InlinePanel>content</InlinePanel>
      </InlinePanelProvider>
    );
    expect(screen.getByRole('complementary')).toHaveStyle({ width: 0 });
  });

  it('sets width on aside when open', () => {
    localStorage.setItem('test-key', '1');
    render(
      <InlinePanelProvider storageKey="test-key">
        <InlinePanel>content</InlinePanel>
      </InlinePanelProvider>
    );
    expect(screen.getByRole('complementary')).toHaveStyle({ width: '24rem' });
  });

  it('uses custom width when provided', () => {
    localStorage.setItem('test-key', '1');
    render(
      <InlinePanelProvider storageKey="test-key">
        <InlinePanel width="32rem">content</InlinePanel>
      </InlinePanelProvider>
    );
    expect(screen.getByRole('complementary')).toHaveStyle({ width: '32rem' });
  });

  it('has aria-label Side panel', () => {
    render(
      <InlinePanelProvider storageKey="test-key">
        <InlinePanel>content</InlinePanel>
      </InlinePanelProvider>
    );
    expect(screen.getByRole('complementary', { name: 'Side panel' })).toBeDefined();
  });

  it('forwards className to aside element', () => {
    render(
      <InlinePanelProvider storageKey="test-key">
        <InlinePanel className="custom-class">content</InlinePanel>
      </InlinePanelProvider>
    );
    expect(screen.getByRole('complementary').className).toContain('custom-class');
  });

  it('toggles width when panel is toggled', async () => {
    render(
      <InlinePanelProvider storageKey="test-key">
        <TestToggle />
        <InlinePanel>content</InlinePanel>
      </InlinePanelProvider>
    );
    const aside = screen.getByRole('complementary');
    expect(aside).toHaveStyle({ width: 0 });
    await userEvent.click(screen.getByRole('button', { name: 'toggle' }));
    expect(aside).toHaveStyle({ width: '24rem' });
  });
});
