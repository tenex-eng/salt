import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertDescription, AlertTitle } from './alert';
import type { Appearance, Tone } from './tone';
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { cn } from '../lib/utils';

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
      description: 'Semantic tone. Omit for brand default.',
    },
    appearance: {
      control: 'select',
      options: APPEARANCES,
      description: 'Visual treatment. Defaults to "subtle" for alerts.',
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

export const BrandDefault: Story = {
  render: () => (
    <div className="space-y-4">
      {APPEARANCES.map(appearance => (
        <Alert key={appearance} appearance={appearance}>
          <Info />
          <AlertTitle>{appearance}</AlertTitle>
          <AlertDescription>Brand default alert with {appearance} appearance.</AlertDescription>
        </Alert>
      ))}
    </div>
  ),
};

export const ToneDanger: Story = {
  render: () => (
    <Alert tone="danger" appearance="subtle">
      <AlertCircle />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Something went wrong. Please try again or contact support.</AlertDescription>
    </Alert>
  ),
};

export const ToneWarning: Story = {
  render: () => (
    <Alert tone="warning" appearance="subtle">
      <AlertTriangle />
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>This action cannot be undone. Please proceed with caution.</AlertDescription>
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
      description: 'Semantic tone — omit for brand default',
    },
    appearance: {
      control: 'select',
      options: APPEARANCES,
      description: 'Visual treatment',
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

    function DemoAlert({ tone, appearance, title }: { tone?: Tone; appearance: Appearance; title: string }) {
      return (
        <Alert tone={tone} appearance={appearance}>
          {withIcon && <Info />}
          <AlertTitle>{title}</AlertTitle>
          {withDesc && <AlertDescription>Supporting description text for this alert.</AlertDescription>}
        </Alert>
      );
    }

    return (
      <div className="space-y-8 bg-background p-6">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-foreground">All Tones</h2>
          <p className="max-w-2xl text-xs text-muted-foreground">
            Use <strong>tone</strong> for generic semantic intent and <strong>appearance</strong> for
            visual treatment. Set tone to empty for the brand default.
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
            Selected: tone=&quot;{args.tone ?? 'none'}&quot; appearance=&quot;{args.appearance ?? 'subtle'}&quot;
            icon={withIcon ? 'yes' : 'no'} description={withDesc ? 'yes' : 'no'}
          </p>
          <DemoAlert tone={args.tone} appearance={args.appearance ?? 'subtle'} title="Preview" />
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-foreground">Full Matrix</h3>
          {TONE_OPTIONS.map(option => {
            const isNone = option === 'none';
            const tone = isNone ? undefined : option;
            const label = isNone ? 'Default' : option.charAt(0).toUpperCase() + option.slice(1);
            return (
              <div key={option} className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground capitalize">
                  {isNone ? 'none (brand)' : option}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {APPEARANCES.map(appearance => (
                    <DemoAlert key={appearance} tone={tone} appearance={appearance} title={`${label} / ${appearance}`} />
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

type Severity = 'critical' | 'high' | 'medium' | 'low';

const SEVERITY_TONE = {
  critical: 'danger',
  high: 'warning',
  medium: 'caution',
  low: 'neutral',
} satisfies Record<Severity, Tone>;

export const ConsumerDomainMapping: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Domain terms belong in consuming apps. Map app-specific language to Salt tone/appearance, then render generic Salt components.',
      },
    },
  },
  render: () => (
    <div className="space-y-4 bg-background p-6">
      <div className="space-y-1">
        <h2 className="text-lg font-bold text-foreground">Consumer Domain Mapping</h2>
        <p className="max-w-2xl text-xs text-muted-foreground">
          Salt does not ship severity, priority, status, or security-specific alert APIs. Consumers own those terms and map them to Salt expressions.
        </p>
      </div>
      <pre className="rounded-lg border bg-muted p-3 text-xs text-foreground">
        {`const SEVERITY_TONE = {
  critical: 'danger',
  high: 'warning',
  medium: 'caution',
  low: 'neutral',
} satisfies Record<Severity, Tone>;`}
      </pre>
      <div className="space-y-2">
        {(['critical', 'high', 'medium', 'low'] as Severity[]).map(severity => (
          <Alert key={severity} tone={SEVERITY_TONE[severity]} appearance="subtle">
            <Info />
            <AlertTitle>{severity}</AlertTitle>
            <AlertDescription>Mapped from app-owned severity to Salt tone.</AlertDescription>
          </Alert>
        ))}
      </div>
    </div>
  ),
};

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
      <AlertDescription>Something went wrong. Please try again or contact support.</AlertDescription>
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
