# Spacing and Layout

Use a constrained spacing scale.

## Spacing grid

| Utility | Use |
| --- | --- |
| `gap-1` | tight icon/text, badge clusters |
| `gap-1.5` | checkbox/radio internals |
| `gap-2` | related controls |
| `gap-3` | fields and list items |
| `gap-4` | cards/section content |
| `gap-6` | major section separation |
| `gap-7` | page-level separation |

Avoid arbitrary spacing and rarely-used one-off gaps.

## Density

| Density | Use | Typical sizing |
| --- | --- | --- |
| High | tables, queues, dashboards | `gap-2`, `p-2`, `h-8`, `text-sm` |
| Medium | forms, detail views, dialogs | `gap-3/4`, `p-4`, `h-9` |
| Low | onboarding, empty states | `gap-6`, `p-6/8`, `h-10/11` |

## Layout shift

- Reserve image dimensions.
- Give icons and avatars explicit sizes.
- Match skeletons to final content.
- Avoid hover states that change font weight or dimensions.

## Flex/grid

Prefer `flex gap-*` over `space-x/y-*`; gap handles conditional children more predictably.

```tsx
<div className="flex flex-wrap items-center justify-between gap-2" />
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3" />
```
