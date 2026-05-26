import type { Meta } from '@storybook/react-vite';

const meta: Meta = { title: 'Foundations/Tokens' };
export default meta;

const base = ['background', 'foreground', 'primary', 'secondary', 'muted', 'accent', 'destructive', 'border'];
const severities = ['critical', 'high', 'medium', 'low'];

export function BaseTokens() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {base.map(token => (
        <div key={token} className="rounded-lg border bg-card p-3 text-card-foreground">
          <div className={`mb-2 h-16 rounded-md bg-${token}`} />
          <code className="text-sm">{token}</code>
        </div>
      ))}
    </div>
  );
}

export function SecuritySeverityTokens() {
  return (
    <div className="grid gap-3">
      {severities.map(severity => (
        <div
          key={severity}
          className={`rounded-lg border p-4 bg-severity-${severity}-bg text-severity-${severity}-text border-severity-${severity}-border`}
        >
          <div className="font-semibold capitalize">{severity}</div>
          <code className="text-xs">bg/text/border-severity-{severity}</code>
        </div>
      ))}
    </div>
  );
}
