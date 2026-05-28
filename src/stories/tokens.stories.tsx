import type { Meta } from '@storybook/react-vite';

const meta: Meta = { title: 'Foundations/Tokens' };
export default meta;

const base = ['background', 'foreground', 'primary', 'secondary', 'muted', 'accent', 'destructive', 'border'];
const tones = ['neutral', 'info', 'success', 'caution', 'warning', 'danger'];

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

export function ToneTokens() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {tones.map(tone => (
        <div key={tone} className={`rounded-lg border p-4 bg-${tone}-subtle text-${tone}-fg border-${tone}-border`}>
          <div className="font-semibold capitalize">{tone}</div>
          <code className="text-xs">bg/text/border-{tone}</code>
        </div>
      ))}
    </div>
  );
}
