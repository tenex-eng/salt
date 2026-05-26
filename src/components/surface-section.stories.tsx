import type { Meta, StoryObj } from '@storybook/react';
import { SurfaceSection } from './surface-section';
import { Separator } from './separator';
import { Input } from './input';
import { Label } from './label';
import { Button } from './button';
import { Badge } from './badge';
import { ShieldCheck } from 'lucide-react';

const meta: Meta<typeof SurfaceSection> = {
  title: 'Components/SurfaceSection',
  component: SurfaceSection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default inline elevated section — one tier above the page canvas. Applies
 * `surface-secondary-mode` so descendant intents (border, muted, input, …)
 * resolve to the tier automatically.
 */
export const Default: Story = {
  render: () => (
    <div className="mx-auto max-w-2xl space-y-4">
      <p className="text-sm text-muted-foreground">Page canvas copy outside the surface.</p>
      <SurfaceSection>
        <h3 className="font-semibold">Section title</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Content inside the surface. Descendants inherit secondary tier values.
        </p>
      </SurfaceSection>
    </div>
  ),
};

/**
 * Matches the False Positive Analysis pattern from the Intelligence Hub —
 * a titled section with badge treatments and body copy.
 */
export const FalsePositiveAnalysis: Story = {
  render: () => (
    <div className="mx-auto max-w-3xl space-y-4">
      <SurfaceSection>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold">False Positive Analysis</h3>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <span>TRUE POSITIVE</span>
            <span>94%</span>
          </div>
        </div>
        <p className="mt-3 text-sm">
          Context assessment: EDR detected a suspicious macro execution followed by network activity
          matching known C2 patterns. Threat intelligence confirms the destination IP as malicious
          with 87.2% historical true-positive rate.
        </p>
      </SurfaceSection>
    </div>
  ),
};

/**
 * Descendant components — Separator, Input, plain `border` — resolve their
 * colors through the section's mode. The divider reads visibly against the
 * section's bg, and the input's border matches the secondary tier.
 */
export const WithDescendants: Story = {
  render: () => (
    <div className="mx-auto max-w-md">
      <SurfaceSection>
        <h3 className="font-semibold">Descendants resolve through the mode</h3>
        <Separator className="my-3" />
        <div className="space-y-2">
          <Label htmlFor="query">Search</Label>
          <Input id="query" placeholder="Type to filter..." />
        </div>
        <div className="mt-3 flex items-center gap-2">
          <Badge>default</Badge>
          <Badge variant="outline">outline</Badge>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" size="sm">
            Cancel
          </Button>
          <Button size="sm">Apply</Button>
        </div>
      </SurfaceSection>
    </div>
  ),
};

/**
 * The primitive accepts `as` to override the HTML element while keeping the
 * surface styling.
 */
export const AsArticle: Story = {
  render: () => (
    <div className="mx-auto max-w-2xl">
      <SurfaceSection as="article">
        <h3 className="font-semibold">Rendered as &lt;article&gt;</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Override the element with the <code>as</code> prop when semantic HTML matters.
        </p>
      </SurfaceSection>
    </div>
  ),
};
