# Components

Component primitives, composition patterns, and state handling for Salt UI.

## Table of Contents

- [shadcn/ui Foundation](#shadcnui-foundation)
- [Compound Components](#compound-components)
- [Props API Conventions](#props-api-conventions)
- [Loading States](#loading-states)
- [Empty States](#empty-states)
- [Anti-Patterns](#anti-patterns)

## Primitive Foundation

Salt includes accessible primitives, many adapted from shadcn/ui. APIs evolve faster than LLM training data — never assume an API from memory.

### Discovering primitives

The canonical sources are the filesystem and Storybook, not this skill:

- `*.stories.tsx` alongside each component — approved usage and variants
- https://ui.shadcn.com — upstream reference when patching a primitive

Before building anything, search Storybook or read existing component stories. If uncertain about a current API, read the source or the stories — they are the source of truth.

## Compound Components

Use compound components for complex UI that shares state:

```tsx
// Dialog compound pattern
<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    {/* Content */}
    <DialogFooter>
      <Button variant="outline" onClick={() => setOpen(false)}>
        Cancel
      </Button>
      <Button onClick={handleConfirm}>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

**Dialog patterns:**

- Primary action on right, cancel on left
- Use `AlertDialog` for destructive confirmations
- Never nest dialogs

**Card compound pattern:**

```tsx
<Card>
  <CardHeader>
    <CardTitle>Section Title</CardTitle>
    <CardDescription>Optional description</CardDescription>
  </CardHeader>
  <CardContent>{/* Main content */}</CardContent>
  <CardFooter>{/* Actions */}</CardFooter>
</Card>
```

## Props API Conventions

**Naming:**

- Boolean props: `isOpen`, `isLoading`, `hasError` (prefix with is/has)
- Event handlers: `onOpenChange`, `onSelect`, `onSubmit` (prefix with on)
- Render props: `renderItem`, `renderEmpty` (prefix with render)

**asChild pattern:**

```tsx
// Render as different element while keeping behavior
<Button asChild>
  <a href="/link">Link styled as button</a>
</Button>
```

## Loading States

**Always use Skeleton, never spinners:**

```tsx
// Match the shape of actual content
<div className="flex flex-col gap-3">
  <Skeleton className="h-8 w-1/3" />      {/* Title placeholder */}
  <Skeleton className="h-4 w-full" />     {/* Description line 1 */}
  <Skeleton className="h-4 w-2/3" />      {/* Description line 2 */}
</div>

// Card skeleton
<Card>
  <CardHeader>
    <Skeleton className="h-6 w-1/2" />
  </CardHeader>
  <CardContent className="flex flex-col gap-2">
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-3/4" />
  </CardContent>
</Card>
```

**Rules:**

- Match dimensions of real content to prevent layout shift
- Use `shimmer` animation (already configured)
- Group related skeletons with same spacing as real content

## Empty States

Use the Empty component system:

```tsx
<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <FileQuestion className="size-12 text-muted-foreground" />
    </EmptyMedia>
    <EmptyTitle>No results found</EmptyTitle>
    <EmptyDescription>Try adjusting your filters or creating a new item</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button>Create item</Button>
  </EmptyContent>
</Empty>
```

**When to show empty states:**

- Zero results from a search/filter
- First-time user with no data
- After bulk deletion

## Anti-Patterns

```tsx
// DON'T: Custom card-like div
<div className="rounded-lg border bg-card p-4 shadow-sm">

// DO: Use Card component
<Card>
  <CardContent className="pt-4">

// DON'T: Override base styles inline
<Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8">

// DO: Use variants
<Button variant="default" size="lg">

// DON'T: Mix CardHeader with manual padding
<CardHeader className="p-6">

// DO: Use consistent structure
<CardHeader>
```
