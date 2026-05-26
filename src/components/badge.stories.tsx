import type { Meta, StoryObj } from '@storybook/react';
import { Badge, type BadgeTone, type BadgeAppearance } from './badge';
import { cn } from '../lib/utils';
const CasePriority = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 } as const;

const getPriorityUiConfig = (priority: number) => ({
  label:
    priority === CasePriority.CRITICAL
      ? 'Critical'
      : priority === CasePriority.HIGH
        ? 'High'
        : priority === CasePriority.MEDIUM
          ? 'Medium'
          : 'Low',
});

const getCasePriorityColorClass = (priority: number) =>
  priority === CasePriority.CRITICAL
    ? 'border-danger-border bg-danger-subtle text-danger-fg'
    : priority === CasePriority.HIGH
      ? 'border-warning-border bg-warning-subtle text-warning-fg'
      : priority === CasePriority.MEDIUM
        ? 'border-caution-border bg-caution-subtle text-caution-fg'
        : 'border-info-border bg-info-subtle text-info-fg';

const getSeverityColor = (severity: string) =>
  severity.toLowerCase() === 'critical'
    ? 'border-danger-border bg-danger-subtle text-danger-fg'
    : severity.toLowerCase() === 'high'
      ? 'border-warning-border bg-warning-subtle text-warning-fg'
      : severity.toLowerCase() === 'medium'
        ? 'border-caution-border bg-caution-subtle text-caution-fg'
        : 'border-info-border bg-info-subtle text-info-fg';

const HVT_TIER_CRITICAL = 'critical';
const HVT_TIER_HIGH = 'high';
const HVT_TIER_MEDIUM = 'medium';
const HVT_TIER_LOW = 'low';
const HVT_TIER_LABELS = { critical: 'Critical', high: 'High', medium: 'Medium', low: 'Low' } as const;
const HVT_TIER_BADGE_STYLES = {
  critical: 'border-danger-border bg-danger-subtle text-danger-fg',
  high: 'border-warning-border bg-warning-subtle text-warning-fg',
  medium: 'border-caution-border bg-caution-subtle text-caution-fg',
  low: 'border-info-border bg-info-subtle text-info-fg',
} as const;

type IntegrationSyncStatus = 'success' | 'pending' | 'failed' | 'unspecified';
const getSyncStatusLabel = (status: IntegrationSyncStatus) =>
  status === 'success' ? 'Synced' : status === 'pending' ? 'Pending' : status === 'failed' ? 'Failed' : 'Unknown';
const getSyncStatusColor = (status: IntegrationSyncStatus) =>
  status === 'success'
    ? 'border-success-border bg-success-subtle text-success-fg'
    : status === 'pending'
      ? 'border-caution-border bg-caution-subtle text-caution-fg'
      : status === 'failed'
        ? 'border-danger-border bg-danger-subtle text-danger-fg'
        : 'border-neutral-border bg-neutral-subtle text-neutral-fg';

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
      description: 'Semantic tone (expression/mode). Omit for brand default (cyan).',
    },
    appearance: {
      control: 'select',
      options: APPEARANCES,
      description: 'Visual weight (priority).',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/* ─── Tone + Appearance stories ─── */

/** Brand default (no tone) in all 4 appearances. */
export const BrandDefault: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {APPEARANCES.map(a => (
        <Badge key={a} appearance={a}>
          {a}
        </Badge>
      ))}
    </div>
  ),
};

/** Single tone example for each appearance. */
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

/** Interactive explorer: 7 tones (including brand) x 4 appearances. Toggle light/dark to compare. */
export const AllTones: Story = {
  args: {
    tone: undefined,
    appearance: 'solid',
    children: 'Badge',
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
    children: {
      control: 'text',
      description: 'Badge text',
    },
  },
  render: (args: { tone?: BadgeTone; appearance?: BadgeAppearance; children?: string }) => (
    <div className="space-y-8 bg-background p-6">
      <div className="space-y-1">
        <h2 className="text-lg font-bold text-foreground">All Tones</h2>
        <p className="max-w-2xl text-xs text-muted-foreground">
          Use the controls to change <strong>tone</strong> (expression/mode) and{' '}
          <strong>appearance</strong> (visual weight) independently. Set tone to empty for the brand
          default &mdash; the base action intent with no expressive override. Toggle light/dark to
          see both modes.
        </p>
      </div>

      {/* Selected combination */}
      <div className="space-y-2">
        <p className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
          Selected: tone=&quot;{args.tone ?? 'none'}&quot; appearance=&quot;
          {args.appearance ?? 'solid'}&quot;
        </p>
        <Badge tone={args.tone} appearance={args.appearance}>
          {args.children}
        </Badge>
      </div>

      {/* Full matrix */}
      <div className="space-y-2">
        <h3 className="text-sm font-bold text-foreground">Full Matrix</h3>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-foreground/10 text-left">
              <th className="py-2 pr-4 font-semibold text-muted-foreground" />
              {APPEARANCES.map(a => (
                <th key={a} className="py-2 pr-4 font-semibold text-muted-foreground capitalize">
                  {a}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TONE_OPTIONS.map(t => {
              const isNone = t === 'none';
              const tone = isNone ? undefined : t;
              return (
                <tr
                  key={t}
                  className={cn(
                    'border-b border-foreground/5',
                    isNone && 'border-b-2 border-foreground/10'
                  )}
                >
                  <td className="py-3 pr-4 font-medium text-foreground capitalize">
                    {isNone ? (
                      <span>
                        none{' '}
                        <span className="text-[10px] font-normal text-muted-foreground">
                          (brand)
                        </span>
                      </span>
                    ) : (
                      t
                    )}
                  </td>
                  {APPEARANCES.map(a => (
                    <td key={a} className="py-3 pr-4">
                      <Badge tone={tone} appearance={a}>
                        {isNone ? 'Default' : t.charAt(0).toUpperCase() + t.slice(1)}
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

/* ─── Migration Guide ─── */

// Copied verbatim from ActionExecutionResultCard.tsx (not exported)
const soarStatusColors: Record<string, string> = {
  success: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  error: 'bg-red-500/10 text-red-600 border-red-500/20',
  warning: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  info: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
};

// Copied verbatim from EntityDetailView.tsx (not exported)
function getPermissionColor(permission: string): string {
  switch (permission) {
    case 'allow':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'deny':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    default:
      return '';
  }
}

interface MigrationRow {
  label: string;
  tone: BadgeTone;
  appearance: BadgeAppearance;
  current: React.ReactNode;
}

function MigrationTable({
  title,
  source,
  rows,
}: {
  title: string;
  source: string;
  rows: MigrationRow[];
}) {
  return (
    <div className="space-y-2">
      <div>
        <h3 className="text-sm font-bold text-foreground">{title}</h3>
        <p className="font-mono text-[10px] text-muted-foreground">{source}</p>
      </div>
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-foreground/10 text-left">
            <th className="py-1.5 pr-4 font-semibold text-muted-foreground">Level</th>
            <th className="py-1.5 pr-4 font-semibold text-muted-foreground">Current</th>
            <th className="py-1.5 pr-4 font-semibold text-muted-foreground">Recommended</th>
            <th className="py-1.5 font-semibold text-muted-foreground">Tone / Appearance</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.label} className="border-b border-foreground/5">
              <td className="py-2 pr-4 font-medium text-foreground">{row.label}</td>
              <td className="py-2 pr-4">{row.current}</td>
              <td className="py-2 pr-4">
                <Badge tone={row.tone} appearance={row.appearance}>
                  {row.label}
                </Badge>
              </td>
              <td className="py-2 font-mono text-muted-foreground">
                {row.tone} / {row.appearance}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Every badge color system in the app compared against tone + appearance. */
export const MigrationGuide: Story = {
  render: () => (
    <div className="space-y-10 bg-background p-6">
      <div className="space-y-1">
        <h2 className="text-lg font-bold text-foreground">Migration Guide</h2>
        <p className="max-w-2xl text-xs text-muted-foreground">
          Every badge color system in the app compared against the 6 canonical tone tokens. Current
          badges are rendered with the real Badge component and the exact classes/functions from
          source. Toggle light/dark to compare.
        </p>
      </div>

      {/* 1. CaseListTable priority */}
      <MigrationTable
        title="CaseListTable Priority"
        source="CaseListTable/constants.ts -> getCasePriorityColorClass()"
        rows={[CasePriority.CRITICAL, CasePriority.HIGH, CasePriority.MEDIUM, CasePriority.LOW].map(
          p => {
            const info = getPriorityUiConfig(p);
            const tone: BadgeTone =
              p === CasePriority.CRITICAL
                ? 'danger'
                : p === CasePriority.HIGH
                  ? 'warning'
                  : p === CasePriority.MEDIUM
                    ? 'caution'
                    : 'neutral';
            return {
              label: info.label,
              tone,
              appearance: 'subtle' as BadgeAppearance,
              current: (
                <Badge
                  variant="outline"
                  className={cn('rounded-full font-mono', getCasePriorityColorClass(p))}
                >
                  {info.label}
                </Badge>
              ),
            };
          }
        )}
      />

      {/* 2. AlertCard severity */}
      <MigrationTable
        title="AlertCard Severity"
        source="AlertCard.tsx → getSeverityColor()"
        rows={(['Critical', 'High', 'Medium', 'Low'] as const).map(label => {
          const tone: BadgeTone =
            label === 'Critical'
              ? 'danger'
              : label === 'High'
                ? 'warning'
                : label === 'Medium'
                  ? 'caution'
                  : 'neutral';
          return {
            label,
            tone,
            appearance: 'subtle' as BadgeAppearance,
            current: (
              <Badge variant="outline" className={cn('inline-flex gap-1', getSeverityColor(label))}>
                {label}
              </Badge>
            ),
          };
        })}
      />

      {/* 3. Entity HVT tier */}
      <MigrationTable
        title="Entity HVT Tier"
        source="entities/types.ts → HVT_TIER_BADGE_STYLES"
        rows={[HVT_TIER_CRITICAL, HVT_TIER_HIGH, HVT_TIER_MEDIUM, HVT_TIER_LOW].map(tier => {
          const tone: BadgeTone =
            tier === HVT_TIER_CRITICAL
              ? 'danger'
              : tier === HVT_TIER_HIGH
                ? 'warning'
                : tier === HVT_TIER_MEDIUM
                  ? 'caution'
                  : 'neutral';
          return {
            label: HVT_TIER_LABELS[tier],
            tone,
            appearance: 'subtle' as BadgeAppearance,
            current: (
              <Badge variant="outline" className={HVT_TIER_BADGE_STYLES[tier]}>
                {HVT_TIER_LABELS[tier]}
              </Badge>
            ),
          };
        })}
      />

      {/* 4. Integration sync status */}
      <MigrationTable
        title="Integration Sync Status"
        source="integrations/types.ts → getSyncStatusColor()"
        rows={(['success', 'pending', 'failed', 'unspecified'] as IntegrationSyncStatus[]).map(
          status => {
            const tone: BadgeTone =
              status === 'success'
                ? 'success'
                : status === 'pending'
                  ? 'warning'
                  : status === 'failed'
                    ? 'danger'
                    : 'neutral';
            return {
              label: getSyncStatusLabel(status),
              tone,
              appearance: 'subtle' as BadgeAppearance,
              current: (
                <Badge className={cn('text-xs', getSyncStatusColor(status))}>
                  {getSyncStatusLabel(status)}
                </Badge>
              ),
            };
          }
        )}
      />

      {/* 6. SOAR action status */}
      <MigrationTable
        title="SOAR Action Result"
        source="ActionExecutionResultCard.tsx → statusColors"
        rows={(['success', 'error', 'warning', 'info'] as const).map(status => {
          const tone: BadgeTone =
            status === 'success'
              ? 'success'
              : status === 'error'
                ? 'danger'
                : status === 'warning'
                  ? 'warning'
                  : 'info';
          return {
            label: status.charAt(0).toUpperCase() + status.slice(1),
            tone,
            appearance: 'subtle' as BadgeAppearance,
            current: (
              <Badge variant="outline" className={cn('h-5 text-xs', soarStatusColors[status])}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>
            ),
          };
        })}
      />

      {/* 7. Entity permission */}
      <MigrationTable
        title="Entity Permission"
        source="EntityDetailView.tsx → getPermissionColor()"
        rows={(['allow', 'deny'] as const).map(perm => {
          const tone: BadgeTone = perm === 'allow' ? 'success' : 'danger';
          return {
            label: perm.charAt(0).toUpperCase() + perm.slice(1),
            tone,
            appearance: 'subtle' as BadgeAppearance,
            current: (
              <Badge className={cn('text-xs', getPermissionColor(perm))}>
                {perm.charAt(0).toUpperCase() + perm.slice(1)}
              </Badge>
            ),
          };
        })}
      />
    </div>
  ),
};

/* ─── Legacy variant stories (deprecated, kept for backward compat) ─── */

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
