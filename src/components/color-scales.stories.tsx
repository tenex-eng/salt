import type { Meta, StoryObj } from '@storybook/react';
import {
  COLOR_SCALES,
  WEIGHTS,
  TARGETS,
  TONAL_GROUPS,
  INTENT_TOKENS,
  TONE_GROUPS,
  TONE_TOKENS,
  type ColorScale,
  type Swatch,
  type IntentToken,
  type IntentCategory,
  type Tone,
  type ToneToken,
} from './color-scales.data';

/**
 * Tenex Color Palette — Universal Color Palette standard.
 *
 * 9 oklch scales (23 weights each).
 * Weight = (100 - CIE L*) x 10. Each weight maps to a tonal category:
 *
 * - Highlights (000-050): surfaces in light mode, shadow tones in dark mode
 * - 1/4 Tones (100-350): borders and divider lines, not for backgrounds, text, or icons
 * - Mid-Tones (400-600): lowest tonal value for icons and text; 500 passes WCAG 4.5:1
 *   on pure white and black; typically used as button backgrounds
 * - 3/4 Tones (650-900): text treatments such as headlines and body copy
 * - Shadows (950-999): deepest backgrounds in dark mode, highest contrast text
 */
const meta: Meta = {
  title: 'Foundations/Color Scales',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

const GRID_COLS = `repeat(${WEIGHTS.length}, minmax(0, 1fr))`;

function textColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#ffffff';
}

function TonalGuide() {
  return (
    <div className="min-w-max space-y-1.5">
      <div className="grid gap-1" style={{ gridTemplateColumns: GRID_COLS }}>
        {TONAL_GROUPS.map(group => (
          <div
            key={group.label}
            className="text-center"
            style={{ gridColumn: `${group.start + 1} / ${group.end + 2}` }}
          >
            <div className="text-[11px] font-semibold text-foreground/80">{group.label}</div>
            <div className="mt-0.5 h-1.5 border-x border-t border-foreground/50" />
          </div>
        ))}
      </div>
      <div className="grid" style={{ gridTemplateColumns: GRID_COLS }}>
        {TARGETS.map((value, index) => (
          <div
            key={`${value}-${index}`}
            className="text-center text-[9px] text-muted-foreground/70 tabular-nums"
          >
            L*{value}
          </div>
        ))}
      </div>
      <div className="grid" style={{ gridTemplateColumns: GRID_COLS }}>
        {WEIGHTS.map(weight => (
          <div
            key={weight}
            className="text-center text-[10px] font-semibold text-muted-foreground tabular-nums"
          >
            {weight}
          </div>
        ))}
      </div>
    </div>
  );
}

function SwatchCell({ swatch }: { swatch: Swatch }) {
  const fg = textColor(swatch.hex);

  return (
    <div className="flex flex-col items-stretch gap-0">
      <div
        className="flex h-14 flex-col justify-between rounded-sm px-1.5 py-1"
        style={{
          background: swatch.oklch,
          color: fg,
          boxShadow: `inset 0 0 0 1px ${fg === '#000000' ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.12)'}`,
        }}
      >
        <div className="flex items-start justify-between">
          <span className="text-[10px] font-semibold tabular-nums">{swatch.weight}</span>
          {swatch.outOfSrgb && (
            <span
              className="text-[8px] leading-none font-bold"
              title="Out of sRGB gamut — requires wide-gamut display"
            >
              P3
            </span>
          )}
        </div>
        <span className="text-[8px] tabular-nums opacity-80">{swatch.hex}</span>
      </div>
    </div>
  );
}

function ScaleRow({ scale }: { scale: ColorScale }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline gap-2">
        <h3 className="text-sm font-semibold text-foreground capitalize">{scale.name}</h3>
        <span className="text-[10px] text-muted-foreground">
          {scale.swatches.filter(s => s.outOfSrgb).length > 0 && (
            <>{scale.swatches.filter(s => s.outOfSrgb).length} P3 swatches</>
          )}
        </span>
      </div>
      <div className="grid gap-0.5" style={{ gridTemplateColumns: GRID_COLS }}>
        {WEIGHTS.map(weight => {
          const swatch = scale.swatches.find(s => s.weight === weight);
          return swatch ? <SwatchCell key={weight} swatch={swatch} /> : <div key={weight} />;
        })}
      </div>
    </div>
  );
}
const CATEGORY_LABELS: Record<IntentCategory, { title: string; description: string }> = {
  surface: {
    title: 'Surface',
    description:
      'Non-interactive containers by elevation. Primary = modals (most disruptive), Secondary = popovers (temporary), Auxiliary = page background (default canvas).',
  },
  action: {
    title: 'Action',
    description:
      'Interactive elements by visual weight. Primary = CTA buttons, Secondary = outline/muted buttons, Auxiliary = ghost/link buttons.',
  },
  control: {
    title: 'Control',
    description: 'Form inputs — no priority tiers. All inputs share equal visual treatment.',
  },
};

const CATEGORY_ORDER: IntentCategory[] = ['surface', 'action', 'control'];

function resolveTokenColor(ref: string): { oklch: string; hex: string } | null {
  if (ref === 'transparent') return null;
  const [scaleName, weight] = ref.split('-');
  const scale = COLOR_SCALES.find(s => s.name === scaleName);
  if (!scale) return null;
  const swatch = scale.swatches.find(s => s.weight === weight);
  if (!swatch) return null;
  return { oklch: swatch.oklch, hex: swatch.hex };
}

const CHECKER_BG = 'repeating-conic-gradient(#d4d4d4 0% 25%, transparent 0% 50%) 0 0 / 12px 12px';

function IntentColorBox({ ref: colorRef, label }: { ref: string; label: string }) {
  const resolved = resolveTokenColor(colorRef);
  const isTransparent = !resolved;

  return (
    <div className="flex flex-col items-center gap-0.5">
      <div
        className="h-10 w-10 rounded-sm"
        style={{
          background: isTransparent ? CHECKER_BG : resolved.oklch,
          boxShadow: isTransparent
            ? 'inset 0 0 0 1px rgba(128,128,128,0.3)'
            : `inset 0 0 0 1px ${textColor(resolved.hex) === '#000000' ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.12)'}`,
        }}
        title={colorRef}
      />
      <span className="text-[9px] text-muted-foreground">{label}</span>
    </div>
  );
}

function IntentSwatch({ token }: { token: IntentToken }) {
  return (
    <div className="flex gap-3 rounded border border-foreground/10 p-3">
      <div className="flex shrink-0 gap-2">
        <IntentColorBox ref={token.light} label="light" />
        <IntentColorBox ref={token.dark} label="dark" />
      </div>
      <div className="min-w-0 space-y-0.5">
        <p className="text-xs font-semibold text-foreground">{token.name}</p>
        <p className="text-[11px] text-muted-foreground">{token.description}</p>
        <p className="font-mono text-[10px] text-muted-foreground/70">
          {token.light} / {token.dark}
        </p>
      </div>
    </div>
  );
}

function IntentCategorySection({ category }: { category: IntentCategory }) {
  const tokens = INTENT_TOKENS.filter(t => t.category === category);
  const label = CATEGORY_LABELS[category];

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <h3 className="text-sm font-bold text-foreground">{label.title}</h3>
        <p className="text-xs text-muted-foreground">{label.description}</p>
      </div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
        {tokens.map(token => (
          <IntentSwatch key={token.name} token={token} />
        ))}
      </div>
    </div>
  );
}

/** All 9 color scales with tonal category reference header. */
export const AllScales: Story = {
  render: () => (
    <div className="space-y-6 overflow-x-auto bg-background p-6">
      <div className="space-y-1">
        <h2 className="text-lg font-bold text-foreground">Tenex Color Palette</h2>
        <p className="text-xs text-muted-foreground">
          Universal Color Palette standard. 23 perceptually uniform oklch weights per scale.
          Swatches marked <strong>P3</strong> exceed sRGB gamut.
        </p>
      </div>
      <div className="min-w-[1200px] space-y-5">
        <TonalGuide />
        {COLOR_SCALES.map(scale => (
          <ScaleRow key={scale.name} scale={scale} />
        ))}
      </div>
    </div>
  ),
};

/** 21 intent tokens grouped by purpose (surface, action, control). */
export const Intents: Story = {
  render: () => (
    <div className="space-y-8 bg-background p-6">
      <div className="space-y-1">
        <h2 className="text-lg font-bold text-foreground">Intent Tokens</h2>
        <p className="text-xs text-muted-foreground">
          21 color intents following Mise en Mode. Components reference intents by
          purpose/priority/property. Modes supply values from the Tenex Color Palette. Toggle
          light/dark to see values change.
        </p>
      </div>
      {CATEGORY_ORDER.map(category => (
        <IntentCategorySection key={category} category={category} />
      ))}
    </div>
  ),
};

/* ─── Tone Expression Palette Story ─── */

const PROPERTY_LABELS: Record<string, string> = {
  subtle: 'Subtle bg',
  fg: 'Foreground',
  border: 'Border',
  solid: 'Solid bg',
  'solid-fg': 'On solid',
};

function ToneColorBox({ token, mode }: { token: ToneToken; mode: 'light' | 'dark' }) {
  const ref = mode === 'light' ? token.light : token.dark;
  const resolved = resolveTokenColor(ref);
  const isTransparent = !resolved;

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="h-12 w-full rounded-sm"
        style={{
          background: isTransparent ? CHECKER_BG : resolved.oklch,
          boxShadow: isTransparent
            ? 'inset 0 0 0 1px rgba(128,128,128,0.3)'
            : `inset 0 0 0 1px ${textColor(resolved.hex) === '#000000' ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.12)'}`,
        }}
        title={`${token.cssVar} → ${ref}`}
      />
      <span className="text-[9px] text-muted-foreground">{ref}</span>
    </div>
  );
}

function ToneSampleBadges({ tone }: { tone: Tone }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium"
        style={{
          background: `var(--${tone}-subtle)`,
          color: `var(--${tone}-fg)`,
        }}
      >
        Subtle
      </span>
      <span
        className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium"
        style={{
          borderColor: `var(--${tone}-border)`,
          color: `var(--${tone}-fg)`,
          background: 'transparent',
        }}
      >
        Outline
      </span>
      <span
        className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium"
        style={{
          background: `var(--${tone}-solid)`,
          color: `var(--${tone}-solid-fg)`,
        }}
      >
        Solid
      </span>
    </div>
  );
}

function ToneSection({ tone }: { tone: Tone }) {
  const group = TONE_GROUPS.find(g => g.tone === tone);
  const tokens = TONE_TOKENS.filter(t => t.tone === tone);

  if (!group) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between">
        <div className="space-y-0.5">
          <h3 className="text-sm font-bold text-foreground">{group.label}</h3>
          <p className="text-xs text-muted-foreground">
            {group.description} &mdash; <span className="font-mono">{group.hue}</span> scale
          </p>
        </div>
        <ToneSampleBadges tone={tone} />
      </div>
      <div className="grid grid-cols-5 gap-3">
        {tokens.map(token => (
          <div key={token.cssVar} className="space-y-1.5">
            <p className="text-[11px] font-semibold text-foreground">
              {PROPERTY_LABELS[token.property] ?? token.property}
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              <div>
                <p className="mb-0.5 text-[9px] font-medium text-muted-foreground">Light</p>
                <ToneColorBox token={token} mode="light" />
              </div>
              <div>
                <p className="mb-0.5 text-[9px] font-medium text-muted-foreground">Dark</p>
                <ToneColorBox token={token} mode="dark" />
              </div>
            </div>
            <p className="font-mono text-[9px] text-muted-foreground/70">{token.cssVar}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const TONE_ORDER: Tone[] = ['danger', 'warning', 'caution', 'success', 'info', 'neutral'];

const TONE_FG_SAMPLES: { tone: Tone; example: string }[] = [
  { tone: 'danger', example: 'Critical anomaly detected' },
  { tone: 'warning', example: 'Significant anomaly detected' },
  { tone: 'caution', example: 'Elevated activity' },
  { tone: 'success', example: 'All checks passed' },
  { tone: 'info', example: 'Investigation in progress' },
  { tone: 'neutral', example: 'Within normal range' },
];

/** Text foreground colors for each tone — use `text-{tone}-fg` utility classes. */
export const TextForeground: Story = {
  render: () => (
    <div className="space-y-8 bg-background p-6">
      <div className="space-y-1">
        <h2 className="text-lg font-bold text-foreground">Tone Text Foreground</h2>
        <p className="max-w-2xl text-xs text-muted-foreground">
          Each tone provides a <code className="font-mono">text-{'{tone}'}-fg</code> utility class
          for coloring inline text. These resolve to 600-weight in light mode and 400-weight in dark
          mode for consistent legibility. Toggle light/dark to verify contrast.
        </p>
      </div>

      <div className="space-y-4">
        {TONE_FG_SAMPLES.map(({ tone, example }) => (
          <div key={tone} className="flex items-baseline gap-4">
            <code className="w-36 shrink-0 font-mono text-xs text-muted-foreground">
              text-{tone}-fg
            </code>
            <span className="text-sm" style={{ color: `var(--${tone}-fg)` }}>
              {example}
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-3 rounded border border-foreground/10 p-4">
        <h3 className="text-xs font-bold text-foreground">Inline Usage</h3>
        <p className="text-sm text-foreground">
          Alert Velocity Ratio:{' '}
          <span className="font-semibold text-warning-fg">Significant anomaly detected</span>
        </p>
        <p className="text-sm text-foreground">
          Case Pipeline: <span className="font-semibold text-success-fg">All checks passed</span>
        </p>
        <p className="text-sm text-foreground">
          Enrichment Status:{' '}
          <span className="font-semibold text-danger-fg">Critical anomaly detected</span>
        </p>
      </div>
    </div>
  ),
};

/** 6 canonical tone expressions ordered warm → cool. */
export const Tones: Story = {
  render: () => (
    <div className="space-y-8 bg-background p-6">
      <div className="space-y-1">
        <h2 className="text-lg font-bold text-foreground">Tone Expressions</h2>
        <p className="max-w-2xl text-xs text-muted-foreground">
          6 canonical tones &times; 5 properties = 30 expression palette tokens. Tones communicate
          sentiment &mdash; ordered from warm (highest intensity) to cool (lowest intensity). Domain
          concepts like severity, case status, and system health map to tones through business logic
          utilities &mdash; never through dedicated tokens. Toggle light/dark to see values change.
        </p>
      </div>

      <div className="space-y-6">
        {TONE_ORDER.map(tone => (
          <ToneSection key={tone} tone={tone} />
        ))}
      </div>

      <div className="rounded border border-foreground/10 p-4">
        <h3 className="mb-2 text-xs font-bold text-foreground">Domain &rarr; Tone Mapping</h3>
        <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-xs text-muted-foreground md:grid-cols-4">
          <div>
            <p className="font-semibold text-foreground">Severity</p>
            <p>Critical &rarr; danger</p>
            <p>High &rarr; warning</p>
            <p>Medium &rarr; caution</p>
            <p>Low &rarr; neutral</p>
          </div>
          <div>
            <p className="font-semibold text-foreground">Case Status</p>
            <p>Open &rarr; info</p>
            <p>In Progress &rarr; warning</p>
            <p>Resolved &rarr; success</p>
            <p>Closed &rarr; neutral</p>
          </div>
          <div>
            <p className="font-semibold text-foreground">System Health</p>
            <p>Healthy &rarr; success</p>
            <p>Degraded &rarr; warning</p>
            <p>Unhealthy &rarr; danger</p>
            <p>Unknown &rarr; neutral</p>
          </div>
          <div>
            <p className="font-semibold text-foreground">Actions</p>
            <p>Destructive &rarr; danger</p>
            <p>Confirm &rarr; success</p>
            <p>Review &rarr; warning</p>
          </div>
        </div>
      </div>
    </div>
  ),
};
