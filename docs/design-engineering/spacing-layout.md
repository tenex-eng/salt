# Spacing & Layout

Spacing grid, density levels, z-index scale, and layout shift prevention.

## Table of Contents

- [Spacing Grid](#spacing-grid)
- [Padding Patterns](#padding-patterns)
- [Density Levels](#density-levels)
- [Height System](#height-system)
- [Z-Index Scale](#z-index-scale)
- [Safe Areas](#safe-areas)
- [Layout Shift Prevention](#layout-shift-prevention)
- [Grid Patterns](#grid-patterns)
- [Flexbox Patterns](#flexbox-patterns)

## Spacing Grid

Salt uses a constrained spacing scale:

```
gap-1   (4px)   — Tight grouping (icon + text, badge clusters)
gap-1.5 (6px)   — Checkbox/radio groups
gap-2   (8px)   — Related items (button + icon, form field internals)
gap-3   (12px)  — Form field groups, list items
gap-4   (16px)  — Section padding, card content
gap-6   (24px)  — Major section separation
gap-7   (28px)  — Page-level section breaks
```

**Anti-patterns:**

- Don't use arbitrary values (`gap-[13px]`)
- Don't mix spacing scales (`gap-5` rarely used)
- Don't pad and margin the same element—pick one

## Padding Patterns

```tsx
// Cards/sections
<Card className="p-4">  // or p-6 for more breathing room

// Compact elements
<div className="p-2">  // or p-3

// Interactive elements — match height system
<button className="h-9 px-4">  // not p-arbitrary
```

## Density Levels

**UI density = value / (time + space)**

| Level      | Use Case                                    | Spacing                  | Component Size           |
| ---------- | ------------------------------------------- | ------------------------ | ------------------------ |
| **High**   | Data tables, dashboards, frequent-use tools | `gap-2`, `p-2`, `py-1.5` | `h-8`, `text-sm`         |
| **Medium** | Standard views, forms, detail pages         | `gap-3`–`gap-4`, `p-4`   | `h-9`, `text-base`       |
| **Low**    | Onboarding, marketing, empty states         | `gap-6`, `p-6`–`p-8`     | `h-10`–`h-11`, `text-lg` |

### When to Use Each

**High density** — Experienced users, frequent tasks:

- Alert queues (analysts scan hundreds)
- Data tables with many columns
- Dashboards with multiple widgets

**Medium density** — Default for most interfaces:

- Case detail views
- Configuration forms
- Standard dialogs
- Page headers and navigation bars

**Low density** — Comprehension and focus:

- First-time setup wizards
- Empty states encouraging action
- Destructive action confirmations

## Height System

Consistent heights by density level:

| Density    | Buttons       | Inputs | Table Rows    | Icons               |
| ---------- | ------------- | ------ | ------------- | ------------------- |
| **High**   | `h-7`–`h-8`   | `h-8`  | `h-9`–`h-10`  | `size-3.5`–`size-4` |
| **Medium** | `h-9`         | `h-9`  | `h-11`–`h-12` | `size-4`–`size-5`   |
| **Low**    | `h-10`–`h-11` | `h-10` | `h-14`+       | `size-5`–`size-6`   |

## Z-Index Scale

Fixed scale prevents z-index wars:

```tsx
// Base content
className = 'z-0'; // Default stacking

// Elevated elements
className = 'z-10'; // Dropdowns, tooltips (within flow)
className = 'z-20'; // Sticky headers, fixed sidebars
className = 'z-30'; // Modals, sheets, dialogs
className = 'z-40'; // Notifications, toasts
className = 'z-50'; // Critical overlays (loading screens)
```

**Isolation pattern:**

```tsx
// Create new stacking context to contain z-index
<div className="isolate">{/* z-index values here won't escape */}</div>
```

## Safe Areas

Handle device notches and system UI:

```tsx
// Bottom safe area (iPhone home indicator)
<div className="pb-[env(safe-area-inset-bottom)]">

// All sides
<div className="p-[env(safe-area-inset-top)] pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)]">
```

**When needed:**

- Fixed bottom bars
- Full-bleed content
- Mobile-first layouts

## Layout Shift Prevention

Cumulative Layout Shift (CLS) hurts UX. Prevent it:

**Hardcoded dimensions:**

```tsx
// Images — always specify dimensions
<Image width={400} height={300} alt="..." />

// Avatars — fixed size
<Avatar className="size-10">

// Icons — explicit size
<CheckIcon className="size-4" />
```

**Skeleton sizing:**

```tsx
// Match real content dimensions exactly
<Skeleton className="h-8 w-1/3" />  // Same as title
<Skeleton className="h-4 w-full" /> // Same as text line
```

**Prevent font flash:**

```tsx
// Use font-display: swap in @font-face
// Or use system fonts as fallback with similar metrics
```

**Avoid:**

- Content that pushes layout on load
- Async content without reserved space
- Dynamic heights without constraints

## Grid Patterns

```tsx
// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// Auto-fill responsive
<div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">

// Sidebar + main layout
<div className="grid grid-cols-[240px_1fr] gap-6">
```

## Flexbox Patterns

```tsx
// Space between with wrap
<div className="flex flex-wrap items-center justify-between gap-2">

// Center content
<div className="flex items-center justify-center min-h-screen">

// Stack with gap
<div className="flex flex-col gap-4">
```

**Avoid `space-x-*` and `space-y-*` utilities.** Prefer `flex gap-*` instead.

`space-x/y` uses `:not(:first-child)` selectors which break with conditional rendering, are less explicit, and harder to maintain. `flex gap` is more predictable and works consistently with dynamic content.

**Avoid:**

```tsx
// ❌ space-y breaks with conditional children
<SheetHeader className="space-y-1">
  <SheetTitle>Title</SheetTitle>
  {description && <SheetDescription>{description}</SheetDescription>}
</SheetHeader>

// ❌ space-x requires wrapper divs
<div className="flex items-center space-x-2">
  <RadioGroupItem />
  <Label>Option</Label>
</div>
```

**Prefer:**

```tsx
// ✅ flex flex-col gap works with any children
<SheetHeader className="flex flex-col gap-1">
  <SheetTitle>Title</SheetTitle>
  {description && <SheetDescription>{description}</SheetDescription>}
</SheetHeader>

// ✅ flex gap is explicit and direct
<div className="flex items-center gap-2">
  <RadioGroupItem />
  <Label>Option</Label>
</div>
```
