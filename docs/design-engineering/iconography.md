# Iconography

When and how to use icons in Salt. Icons are optional; clarity is not.

**Reference:** [Icons Are Not Enough](https://tonsky.me/blog/tahoe-icons/) — Nikita Prokopov

## Table of Contents

- [Goals](#goals)
- [Default Stance: Text-First](#default-stance-text-first)
- [Icon Patterns](#icon-patterns)
- [The Icon Gate](#the-icon-gate)
- [Labeling Rules](#labeling-rules)
- [Consistency Rules](#consistency-rules)
- [Anti-Patterns](#anti-patterns)

## Goals

Use iconography to:

- **Improve scanning speed** — find the right thing faster
- **Reduce errors** — prevent clicking the wrong action
- **Increase comprehension** — make meaning more obvious
- **Maintain consistency** — users learn and reuse patterns

If an icon doesn't advance at least one goal, don't add it.

## Default Stance: Text-First

- **Menus and lists**: text-only by default
- **Buttons**: text-only or text+icon
- **Toolbars**: icons can work, but labels preferred unless space truly constrained

**When icons are worth it:**

- Represent a visual/spatial outcome (layout, alignment, view modes)
- Mark high-signal state or status items
- Indicate state (on/off, enabled/disabled, encrypted)
- Already standardized and broadly learned (close ×, chevrons)

## Icon Patterns

**Icon + visible label (preferred):**

```tsx
<Button>
  <PlusIcon className="size-4" />
  Create Case
</Button>

<DropdownMenuItem>
  <TrashIcon className="size-4" />
  Delete
</DropdownMenuItem>
```

**Icon-only (when space constrained):**

```tsx
// Must have aria-label + tooltip
<Tooltip>
  <TooltipTrigger asChild>
    <Button size="icon" aria-label="Search">
      <SearchIcon className="size-4" />
    </Button>
  </TooltipTrigger>
  <TooltipContent>Search</TooltipContent>
</Tooltip>
```

**Tone-expressive icons:**

Lucide icons render with `stroke="currentColor"`, so they inherit the parent's CSS `color`. `Badge` and `Alert` set that color inline from the active tone (via `toneStyle()` in `src/components/tone.ts`), which means an unstyled icon inside either component picks up the tone's foreground automatically. Don't add a text-color utility (`text-foreground`, `text-muted-foreground`) to the icon — it overrides the inherited tone. When an icon is standalone (no tone-aware parent), reach for a tone foreground utility — never domain classes like `alert-critical-icon`.

```tsx
// Icon inherits from parent expression
<Badge tone="danger" appearance="solid">
  <ShieldAlertIcon className="size-4" />
  Critical
</Badge>

// Standalone icon: use the tone foreground directly
<AlertTriangleIcon className="size-4 text-warning-fg" />
<InfoIcon className="size-4 text-info-fg" />
```

Domain values map to tones in consuming-app logic — never hardcode a domain concept on an icon.

**Icon sizing:**

```tsx
// Dense UI (tables, compact buttons)
<Icon className="size-4" />  // 16px

// Standard UI
<Icon className="size-5" />  // 20px

// Toolbars, emphasis
<Icon className="size-6" />  // 24px
```

## The Icon Gate

Before adding an icon, verify:

| Check         | Question                                                  |
| ------------- | --------------------------------------------------------- |
| Necessity     | What user problem does it solve? (not just "looks nicer") |
| Metaphor      | Is it familiar and literal? First-time user understands?  |
| Uniqueness    | Used for exactly one meaning in the product?              |
| Labeling      | Has visible text label? If icon-only, why?                |
| Legibility    | Readable at target size in dense UI?                      |
| Consistency   | Matches existing icons? Paired actions have paired icons? |
| Accessibility | Has accessible name? Meets contrast + 44px target?        |

## Labeling Rules

- Buttons, menu items, navigation should be **text-labeled**
- Tooltips are additive; they don't replace visible labels

**Icon-only allowed only if:**

- Space is genuinely constrained
- Icon is standard and commonly understood
- Control has tooltip + `aria-label` + clear active state

## Consistency Rules

**One icon = one meaning:**

If magnifying glass means "Investigate," it cannot also mean "Search" or "Zoom."

**States must be systematic:**

```tsx
// Positive/enabled
<ShieldCheckIcon />

// Warning/attention
<ShieldAlertIcon />

// Disabled/blocked
<ShieldOffIcon />  // or with slash overlay
```

**Opposites should look like opposites:**

```tsx
// Paired actions
<CircleSlashIcon />  // Block
<CheckIcon />        // Allow

// Not: random unrelated symbols
```

## Anti-Patterns

```tsx
// DON'T: Icon for every menu item
<DropdownMenuItem>
  <HomeIcon className="size-4" />
  Dashboard
</DropdownMenuItem>
<DropdownMenuItem>
  <SettingsIcon className="size-4" />
  Settings
</DropdownMenuItem>
<DropdownMenuItem>
  <UserIcon className="size-4" />
  Profile
</DropdownMenuItem>
// Visual noise; slower scanning

// DO: Text-only menus, icons only for high-signal items
<DropdownMenuItem>Dashboard</DropdownMenuItem>
<DropdownMenuItem>Settings</DropdownMenuItem>
<DropdownMenuItem>Profile</DropdownMenuItem>

// DON'T: Icon-only without accessible name
<Button size="icon">
  <SearchIcon />
</Button>

// DO: Always include aria-label
<Button size="icon" aria-label="Search">
  <SearchIcon className="size-4" />
</Button>

// DON'T: Same icon, different meanings
<MagnifyingGlassIcon />  // "Search"
<MagnifyingGlassIcon />  // "Zoom in"
<MagnifyingGlassIcon />  // "Investigate"

// DO: One icon = one meaning
<MagnifyingGlassIcon />  // Always "Investigate"
<ZoomInIcon />           // For zoom
<SearchIcon />           // For search (if different from investigate)

// DON'T: Icons on action items to "balance" checkbox indent
<DropdownMenuItem>
  <HistoryIcon className="size-4" />
  History
</DropdownMenuItem>
<DropdownMenuSeparator />
<DropdownMenuCheckboxItem checked>Lock</DropdownMenuCheckboxItem>
// Alignment is a spacing concern, not an iconography concern.
// Use `inset` (pl-8) to match checkbox item indent, not filler icons.

// DO: Text-only action items with `inset` alongside checkbox items
<DropdownMenuItem inset>History</DropdownMenuItem>
<DropdownMenuItem inset>Regenerate Report</DropdownMenuItem>
<DropdownMenuSeparator />
<DropdownMenuCheckboxItem checked>Lock</DropdownMenuCheckboxItem>

// DON'T: Decorative icons with no purpose
<Card>
  <SparklesIcon className="size-8 text-primary" />
  <CardTitle>Welcome!</CardTitle>
</Card>

// DO: Icons that convey meaning
<Card>
  <ShieldCheckIcon className="size-8 text-success-fg" />
  <CardTitle>All Systems Secure</CardTitle>
</Card>
```
