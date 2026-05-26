import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertTitle, AlertDescription } from './alert';
import type { Tone, Appearance } from './tone';
import { AlertCircle, CheckCircle2, Info, AlertTriangle, Shield, ShieldAlert } from 'lucide-react';

const TONES: Tone[] = ['neutral', 'info', 'success', 'caution', 'warning', 'danger'];
const APPEARANCES: Appearance[] = ['subtle', 'outline', 'solid', 'ghost'];
type ToneOption = Tone | 'none';
const TONE_OPTIONS: ToneOption[] = ['none', ...TONES];

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive'],
      description: 'Deprecated — use tone + appearance instead',
    },
    tone: {
      control: 'select',
      options: [undefined, ...TONES],
      description: 'Semantic tone (expression/mode). Omit for brand default (cyan).',
    },
    appearance: {
      control: 'select',
      options: APPEARANCES,
      description: 'Visual weight (priority). Defaults to "subtle" for alerts.',
    },
  },
  decorators: [
    Story => (
      <div className="w-[450px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/* ─── Tone + Appearance stories ─── */

/** Brand default (no tone) in all 4 appearances. */
export const BrandDefault: Story = {
  render: () => (
    <div className="space-y-4">
      {APPEARANCES.map(a => (
        <Alert key={a} appearance={a}>
          <Info />
          <AlertTitle>{a}</AlertTitle>
          <AlertDescription>Brand default alert with {a} appearance.</AlertDescription>
        </Alert>
      ))}
    </div>
  ),
};

/** Common tone examples with icons. */
export const ToneDanger: Story = {
  render: () => (
    <Alert tone="danger" appearance="subtle">
      <AlertCircle />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Something went wrong. Please try again or contact support.
      </AlertDescription>
    </Alert>
  ),
};

export const ToneWarning: Story = {
  render: () => (
    <Alert tone="warning" appearance="subtle">
      <AlertTriangle />
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>
        This action cannot be undone. Please proceed with caution.
      </AlertDescription>
    </Alert>
  ),
};

export const ToneSuccess: Story = {
  render: () => (
    <Alert tone="success" appearance="subtle">
      <CheckCircle2 />
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>Your changes have been saved successfully.</AlertDescription>
    </Alert>
  ),
};

export const ToneInfo: Story = {
  render: () => (
    <Alert tone="info" appearance="subtle">
      <Info />
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>This is a helpful informational alert.</AlertDescription>
    </Alert>
  ),
};

/** Interactive explorer: 7 tones x 4 appearances with content toggles. */
export const AllTones: Story = {
  args: {
    tone: undefined,
    appearance: 'subtle',
    showIcon: true,
    showDescription: true,
  },
  argTypes: {
    tone: {
      control: 'select',
      options: [undefined, ...TONES],
      description: 'Semantic tone — omit for brand default (cyan)',
    },
    appearance: {
      control: 'select',
      options: APPEARANCES,
      description: 'Visual weight (priority)',
    },
    showIcon: {
      control: 'boolean',
      description: 'Show leading icon',
    },
    showDescription: {
      control: 'boolean',
      description: 'Show description text',
    },
  },
  decorators: [
    Story => (
      <div className="w-[700px]">
        <Story />
      </div>
    ),
  ],
  render: (args: {
    tone?: Tone;
    appearance?: Appearance;
    showIcon?: boolean;
    showDescription?: boolean;
  }) => {
    const withIcon = args.showIcon ?? true;
    const withDesc = args.showDescription ?? true;

    function DemoAlert({
      tone,
      appearance,
      title,
    }: {
      tone?: Tone;
      appearance: Appearance;
      title: string;
    }) {
      return (
        <Alert tone={tone} appearance={appearance}>
          {withIcon && <Info />}
          <AlertTitle>{title}</AlertTitle>
          {withDesc && (
            <AlertDescription>Supporting description text for this alert.</AlertDescription>
          )}
        </Alert>
      );
    }

    return (
      <div className="space-y-8 bg-background p-6">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-foreground">All Tones</h2>
          <p className="max-w-2xl text-xs text-muted-foreground">
            Use the controls to change <strong>tone</strong>, <strong>appearance</strong>,{' '}
            <strong>icon</strong>, and <strong>description</strong> visibility. The entire matrix
            updates to reflect the current content toggles. Toggle light/dark to see both modes.
          </p>
        </div>

        {/* Selected combination */}
        <div className="space-y-2">
          <p className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
            Selected: tone=&quot;{args.tone ?? 'none'}&quot; appearance=&quot;
            {args.appearance ?? 'subtle'}&quot; icon={withIcon ? 'yes' : 'no'} description=
            {withDesc ? 'yes' : 'no'}
          </p>
          <DemoAlert tone={args.tone} appearance={args.appearance ?? 'subtle'} title="Preview" />
        </div>

        {/* Full matrix */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-foreground">Full Matrix</h3>
          {TONE_OPTIONS.map(t => {
            const isNone = t === 'none';
            const tone = isNone ? undefined : t;
            const label = isNone ? 'Default' : t.charAt(0).toUpperCase() + t.slice(1);
            return (
              <div key={t} className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground capitalize">
                  {isNone ? (
                    <>
                      none{' '}
                      <span className="text-[10px] font-normal text-muted-foreground">(brand)</span>
                    </>
                  ) : (
                    t
                  )}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {APPEARANCES.map(a => (
                    <DemoAlert key={a} tone={tone} appearance={a} title={`${label} / ${a}`} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
};

/* ─── Migration Guide ─── */

interface MigrationRow {
  label: string;
  context: string;
  tone: Tone;
  appearance: Appearance;
  icon: React.ReactNode;
  current: React.ReactNode;
}

function MigrationTable({ title, rows }: { title: string; rows: MigrationRow[] }) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-bold text-foreground">{title}</h3>
      <table className="w-full">
        <thead>
          <tr className="border-b border-foreground/10 text-left text-xs">
            <th className="py-1.5 pr-4 font-semibold text-muted-foreground">Pattern</th>
            <th className="py-1.5 pr-4 font-semibold text-muted-foreground">Current</th>
            <th className="py-1.5 pr-4 font-semibold text-muted-foreground">Recommended</th>
            <th className="py-1.5 font-semibold text-muted-foreground">Tone / Appearance</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.label} className="border-b border-foreground/5">
              <td className="py-2 pr-4 text-xs">
                <div className="font-medium text-foreground">{row.label}</div>
                <div className="text-[10px] text-muted-foreground">{row.context}</div>
              </td>
              <td className="py-2 pr-4">{row.current}</td>
              <td className="py-2 pr-4">
                <Alert tone={row.tone} appearance={row.appearance}>
                  {row.icon}
                  <AlertTitle>{row.label}</AlertTitle>
                </Alert>
              </td>
              <td className="py-2 font-mono text-xs text-muted-foreground">
                {row.tone} / {row.appearance}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Current vs recommended for every Alert usage pattern in the app. */
export const MigrationGuide: Story = {
  decorators: [
    Story => (
      <div className="w-[900px]">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="space-y-10 bg-background p-6">
      <div className="space-y-1">
        <h2 className="text-lg font-bold text-foreground">Alert Migration Guide</h2>
        <p className="max-w-2xl text-xs text-muted-foreground">
          Every Alert usage pattern in the app compared against tone + appearance. Current alerts
          use either <code>variant=&quot;destructive&quot;</code> or{' '}
          <code>variant=&quot;default&quot;</code> with className color hacks. Toggle light/dark to
          compare.
        </p>
      </div>

      <MigrationTable
        title="Error states (54 usages → danger/subtle)"
        rows={[
          {
            label: 'API / load failure',
            context: 'Failed to load data, something went wrong',
            tone: 'danger',
            appearance: 'subtle',
            icon: <AlertCircle />,
            current: (
              <Alert variant="destructive">
                <AlertCircle />
                <AlertTitle>Failed to load</AlertTitle>
              </Alert>
            ),
          },
          {
            label: 'Access denied',
            context: 'Permission / admin guard blocks',
            tone: 'danger',
            appearance: 'subtle',
            icon: <ShieldAlert />,
            current: (
              <Alert variant="destructive">
                <Shield />
                <AlertTitle>Access Denied</AlertTitle>
              </Alert>
            ),
          },
          {
            label: 'Validation error',
            context: 'Form / import validation failures',
            tone: 'danger',
            appearance: 'subtle',
            icon: <AlertCircle />,
            current: (
              <Alert variant="destructive">
                <AlertCircle />
                <AlertTitle>Validation Failed</AlertTitle>
              </Alert>
            ),
          },
        ]}
      />

      <MigrationTable
        title="Warning states (15 usages → warning/subtle)"
        rows={[
          {
            label: 'Tenant selection required',
            context: 'Settings, integrations, alert grouping pages',
            tone: 'warning',
            appearance: 'subtle',
            icon: <AlertTriangle />,
            current: (
              <Alert className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20">
                <AlertCircle />
                <AlertTitle>Select a tenant</AlertTitle>
              </Alert>
            ),
          },
          {
            label: 'Import warnings',
            context: 'Entity import with non-blocking warnings',
            tone: 'warning',
            appearance: 'subtle',
            icon: <AlertTriangle />,
            current: (
              <Alert>
                <AlertTriangle />
                <AlertTitle>Warnings found</AlertTitle>
              </Alert>
            ),
          },
          {
            label: 'Policy review caution',
            context: 'Entity policies, global rules',
            tone: 'warning',
            appearance: 'subtle',
            icon: <AlertTriangle />,
            current: (
              <Alert className="border-orange-200 bg-orange-50 dark:border-orange-800/30 dark:bg-orange-950/20">
                <AlertTriangle />
                <AlertTitle>Review required</AlertTitle>
              </Alert>
            ),
          },
        ]}
      />

      <MigrationTable
        title="Informational states (42 usages → info/subtle)"
        rows={[
          {
            label: 'No tenant selected',
            context: 'Neutral prompt to select a tenant',
            tone: 'info',
            appearance: 'subtle',
            icon: <Info />,
            current: (
              <Alert>
                <AlertCircle />
                <AlertTitle>No tenant selected</AlertTitle>
              </Alert>
            ),
          },
          {
            label: 'Feature explanation',
            context: 'Exclusion rules, credential rotation info',
            tone: 'info',
            appearance: 'subtle',
            icon: <Info />,
            current: (
              <Alert className="border-blue-200 bg-blue-50">
                <Info />
                <AlertTitle>How exclusions work</AlertTitle>
              </Alert>
            ),
          },
          {
            label: 'Analysis note',
            context: 'Intelligence Hub, case insights',
            tone: 'info',
            appearance: 'subtle',
            icon: <Info />,
            current: (
              <Alert>
                <Info />
                <AlertTitle>Analysis Note</AlertTitle>
              </Alert>
            ),
          },
        ]}
      />

      <MigrationTable
        title="Success states (10 usages → success/subtle)"
        rows={[
          {
            label: 'Import complete',
            context: 'Entity import finished successfully',
            tone: 'success',
            appearance: 'subtle',
            icon: <CheckCircle2 />,
            current: (
              <Alert>
                <CheckCircle2 />
                <AlertTitle>Import complete</AlertTitle>
              </Alert>
            ),
          },
          {
            label: 'Validation passed',
            context: 'Workflow YAML valid, form validation success',
            tone: 'success',
            appearance: 'subtle',
            icon: <CheckCircle2 />,
            current: (
              <Alert className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950">
                <CheckCircle2 />
                <AlertTitle>Valid</AlertTitle>
              </Alert>
            ),
          },
        ]}
      />
    </div>
  ),
};

/* ─── Legacy variant stories (deprecated, kept for backward compat) ─── */

export const Default: Story = {
  render: () => (
    <Alert>
      <Info />
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>This is a default alert with some helpful information.</AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive">
      <AlertCircle />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Something went wrong. Please try again or contact support.
      </AlertDescription>
    </Alert>
  ),
};

export const Success: Story = {
  render: () => (
    <Alert className="border-green-500/50 text-green-600 dark:text-green-400 [&>svg]:text-green-600 dark:[&>svg]:text-green-400">
      <CheckCircle2 />
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>Your changes have been saved successfully.</AlertDescription>
    </Alert>
  ),
};

export const Warning: Story = {
  render: () => (
    <Alert className="border-yellow-500/50 text-yellow-600 dark:text-yellow-400 [&>svg]:text-yellow-600 dark:[&>svg]:text-yellow-400">
      <AlertTriangle />
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>
        This action cannot be undone. Please proceed with caution.
      </AlertDescription>
    </Alert>
  ),
};

export const WithoutIcon: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
    </Alert>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert>
        <Info />
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>This is the default alert variant.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertCircle />
        <AlertTitle>Destructive</AlertTitle>
        <AlertDescription>This is the destructive alert variant.</AlertDescription>
      </Alert>
    </div>
  ),
};
