import type { Meta, StoryObj } from '@storybook/react';
import { Badge, type BadgeAppearance, type BadgeTone } from './badge';
import { cn } from '../lib/utils';

const TONES: BadgeTone[] = ['neutral', 'info', 'success', 'caution', 'warning', 'danger'];
const APPEARANCES: BadgeAppearance[] = ['subtle', 'outline', 'solid', 'ghost'];
type ToneOption = BadgeTone | 'none';
const TONE_OPTIONS: ToneOption[] = ['none', ...TONES];

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'success', 'ghost'],
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
      description: 'Visual treatment.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BrandDefault: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {APPEARANCES.map(appearance => (
        <Badge key={appearance} appearance={appearance}>
          {appearance}
        </Badge>
      ))}
    </div>
  ),
};

export const ToneSubtle: Story = {
  args: { tone: 'danger', appearance: 'subtle', children: 'Critical' },
};

export const ToneOutline: Story = {
  args: { tone: 'warning', appearance: 'outline', children: 'High' },
};

export const ToneSolid: Story = {
  args: { tone: 'caution', appearance: 'solid', children: 'Medium' },
};

export const ToneGhost: Story = {
  args: { tone: 'info', appearance: 'ghost', children: 'Info' },
};

export const AllTones: Story = {
  args: {
    tone: undefined,
    appearance: 'solid',
    children: 'Badge',
  },
  render: (args: { tone?: BadgeTone; appearance?: BadgeAppearance; children?: string }) => (
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
          Selected: tone=&quot;{args.tone ?? 'none'}&quot; appearance=&quot;{args.appearance ?? 'solid'}&quot;
        </p>
        <Badge tone={args.tone} appearance={args.appearance}>
          {args.children}
        </Badge>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-bold text-foreground">Full Matrix</h3>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-foreground/10 text-left">
              <th className="py-2 pr-4 font-semibold text-muted-foreground" />
              {APPEARANCES.map(appearance => (
                <th key={appearance} className="py-2 pr-4 font-semibold text-muted-foreground capitalize">
                  {appearance}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TONE_OPTIONS.map(option => {
              const isNone = option === 'none';
              const tone = isNone ? undefined : option;
              return (
                <tr
                  key={option}
                  className={cn('border-b border-foreground/5', isNone && 'border-b-2 border-foreground/10')}
                >
                  <td className="py-3 pr-4 font-medium text-foreground capitalize">
                    {isNone ? 'none (brand)' : option}
                  </td>
                  {APPEARANCES.map(appearance => (
                    <td key={appearance} className="py-3 pr-4">
                      <Badge tone={tone} appearance={appearance}>
                        {isNone ? 'Default' : option.charAt(0).toUpperCase() + option.slice(1)}
                      </Badge>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  ),
};

type Severity = 'critical' | 'high' | 'medium' | 'low';

const SEVERITY_TONE = {
  critical: 'danger',
  high: 'warning',
  medium: 'caution',
  low: 'neutral',
} satisfies Record<Severity, BadgeTone>;

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
          Salt does not ship severity, priority, status, or security-specific badge APIs. Consumers own those terms and map them to Salt expressions.
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
      <div className="flex flex-wrap gap-2">
        {(['critical', 'high', 'medium', 'low'] as Severity[]).map(severity => (
          <Badge key={severity} tone={SEVERITY_TONE[severity]} appearance="subtle">
            {severity}
          </Badge>
        ))}
      </div>
    </div>
  ),
};

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="ghost">Ghost</Badge>
    </div>
  ),
};
