# Accessibility

Touch devices, keyboard navigation, ARIA, and focus management.

## Table of Contents

- [Touch Devices](#touch-devices)
- [Keyboard Navigation](#keyboard-navigation)
- [ARIA Essentials](#aria-essentials)
- [Focus States](#focus-states)
- [Reduced Motion](#reduced-motion)
- [Time-Limited Actions](#time-limited-actions)
- [Tooltips](#tooltips)
- [Color Contrast](#color-contrast)
- [Screen Reader Testing](#screen-reader-testing)

## Touch Devices

**44px minimum tap targets:**

```tsx
// Minimum touch target size
<button className="min-h-11 min-w-11">  // 44px
<a className="p-3">  // Padding expands hit area

// Icon buttons need explicit sizing
<Button size="icon" className="size-11">
  <SearchIcon className="size-4" />
</Button>
```

**Touch action for custom gestures:**

```tsx
// Disable browser gestures on draggable
<div className="touch-none">  // Disable all touch actions
<div className="touch-pan-y">  // Allow vertical scroll only
<div className="touch-manipulation">  // Disable double-tap zoom
```

**Disable hover on touch:**

```tsx
// Only apply hover styles on hover-capable devices
<button className="
  bg-primary
  [@media(hover:hover)]:hover:bg-primary/90
">
```

Or in CSS:

```css
@media (hover: hover) {
  .button:hover {
    background: var(--primary-hover);
  }
}
```

## Keyboard Navigation

**Tab order:**

```tsx
// Natural order follows DOM
// Only use tabIndex for:
tabIndex={0}   // Make non-interactive element focusable
tabIndex={-1}  // Programmatically focusable, not in tab order

// Never use positive tabIndex (breaks expectations)
// tabIndex={1}  // DON'T
```

**Scroll into view:**

```tsx
// Focus an element and scroll it into view
element.focus({ preventScroll: false });

// Or use scrollIntoView for more control
element.scrollIntoView({
  behavior: 'smooth',
  block: 'nearest',
});
```

**Focus management in modals:**

```tsx
// Radix handles this, but for custom:
// 1. Trap focus inside modal
// 2. Focus first focusable element on open
// 3. Return focus to trigger on close

const triggerRef = useRef<HTMLButtonElement>(null);

// On close
triggerRef.current?.focus();
```

**Skip links:**

```tsx
// At page top for keyboard users
<a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4">
  Skip to main content
</a>

// Target
<main id="main-content" tabIndex={-1}>
```

## ARIA Essentials

**Icon buttons need labels:**

```tsx
// Option 1: aria-label
<Button size="icon" aria-label="Search">
  <SearchIcon />
</Button>

// Option 2: sr-only text
<Button size="icon">
  <SearchIcon />
  <span className="sr-only">Search</span>
</Button>

// Option 3: Tooltip (provides both hover and accessibility)
<Tooltip>
  <TooltipTrigger asChild>
    <Button size="icon">
      <SearchIcon />
    </Button>
  </TooltipTrigger>
  <TooltipContent>Search</TooltipContent>
</Tooltip>
```

**Role attributes:**

```tsx
// For custom interactive elements
<div role="button" tabIndex={0} onKeyDown={handleKeyDown}>

// For landmark regions
<nav role="navigation">
<main role="main">
<aside role="complementary">
```

**Live regions:**

```tsx
// Announce dynamic content
<div role="status" aria-live="polite">
  {statusMessage}  // Screen reader announces changes
</div>

// Urgent announcements
<div role="alert" aria-live="assertive">
  {errorMessage}
</div>
```

## Focus States

**Visible focus:**

```tsx
// Default Tailwind focus ring
<button className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">

// focus-visible vs focus:
// focus-visible: Only shows for keyboard navigation
// focus: Shows for all focus (including mouse clicks)
```

**Focus outline colors:**

```tsx
// Match semantic context
<button className="focus-visible:ring-primary">  // Primary actions
<button className="focus-visible:ring-destructive">  // Destructive actions
```

**Don't remove focus styles:**

```tsx
// DON'T
<button className="focus:outline-none">

// DO: Replace with visible alternative
<button className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
```

## Reduced Motion

See [animations.md](animations.md) for details.

```tsx
// Always provide escape hatch
<div className="animate-pulse motion-reduce:animate-none">
```

## Time-Limited Actions

**Pause on tab switch:**

```tsx
// Auto-dismiss toasts should pause when tab loses focus
useEffect(() => {
  const handleVisibilityChange = () => {
    if (document.hidden) {
      pauseTimer();
    } else {
      resumeTimer();
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);
  return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
}, []);
```

**Provide manual dismiss:**

```tsx
// Always allow users to dismiss manually
<Toast>
  <ToastContent>{message}</ToastContent>
  <ToastClose /> // Always include
</Toast>
```

## Tooltips

**Delay prevents accidental triggers:**

```tsx
<TooltipProvider delayDuration={300}>  // 300ms default delay
```

**Sequential warm state:**

```tsx
// After first tooltip, subsequent ones show immediately
<TooltipProvider skipDelayDuration={300}>{/* Tooltips here share warm state */}</TooltipProvider>
```

**Submenu safe zones:**

```tsx
// Radix handles this, but concept:
// When moving mouse from trigger to submenu,
// provide safe triangle/corridor to prevent accidental close
```

## Color Contrast

**Minimum contrast ratios (WCAG 2.1):**
| Content | Ratio | Notes |
|---------|-------|-------|
| Normal text | 4.5:1 | Body copy, labels |
| Large text (18px+ or 14px+ bold) | 3:1 | Headings |
| UI components | 3:1 | Borders, icons |
| Graphical objects | 3:1 | Charts, diagrams |

**Don't rely on color alone:**

```tsx
// DON'T: Color-only indicator
<span className="text-red-500">Error</span>

// DO: Color + icon/text
<span className="text-destructive">
  <AlertIcon className="inline size-4" />
  Error
</span>
```

## Screen Reader Testing

**Quick checks:**

1. Navigate with Tab key only
2. Use VoiceOver (Mac): Cmd+F5
3. Check heading structure: VoiceOver rotor (VO+U)
4. Verify form labels are announced
5. Check dynamic content is announced

**Common issues:**

- Missing button/link labels
- Images without alt text
- Form inputs without labels
- Dynamic content not announced
- Focus not managed in modals
