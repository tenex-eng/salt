# Tonal Categories

The Tenex Color Palette uses the Universal Color Palette standard (Kevin Muldoon, 2024). Each scale has 23 weights from 000 (white) to 999 (black). Weight = (100 - CIE L*) x 10.

## The Five Categories

### Highlights (000, 025, 050)

Auxiliary surfaces in light mode. Foreground content in dark mode. These are the lightest values — the default canvas that everything else sits on.

- 000 is pure white (L* 100)
- 025 and 050 carry the faintest tint of the scale's hue
- Use for: surface auxiliary bg (light), surface fg (dark), control bg (light)

### 1/4 Tones (100, 150, 200, 250, 300, 350)

Borders and structural lines. **Not for surfaces, text, or icons.** These sit in the perceptual gap between surface colors and readable content — visible enough to create structure but not enough to carry meaning.

- Use for: surface borders, control borders, action secondary borders, dividers, separators
- Do not use for: surface bg (too dark), fg content (insufficient contrast)

### Mid-Tones (400, 450, 500, 550, 600)

The lowest tonal value appropriate for icons and foreground content. This is where content becomes reliably readable.

- **500 passes WCAG 4.5:1 contrast on both pure white (000) and pure black (999)**
- **550 passes 4.5:1 on all Highlights (000, 025, 050)**
- Use for: action primary bg, action auxiliary fg, icons, secondary fg content

### 3/4 Tones (650, 700, 750, 800, 850, 900)

Primary and secondary fg content — headlines, body copy. High contrast against highlight surfaces.

- Use for: surface fg (light), action primary fg, control fg (light), headings, body text
- In dark mode, these weights serve as elevated surface bg (progressively lighter = closer to viewer per the Mise en Mode surface elevation model)

### Shadows (950, 999)

Auxiliary surfaces in dark mode. Highest contrast fg content in light mode.

- 999 is pure black (L* 0) — reserved for the neutral scale only
- 950 is the practical darkest value for chromatic scales
- Use for: surface auxiliary bg (dark), surface fg (light), action primary fg

## Cross-Category Contrast

The tonal categories are designed so that pairing content from one category with surfaces from another guarantees accessible contrast:

| Fg content (from) | Surface (on) | Contrast |
|---|---|---|
| Mid-Tones (500+) | Highlights (000-050) | WCAG 4.5:1 AA pass |
| 3/4 Tones (650+) | Highlights (000-050) | WCAG 7:1 AAA pass |
| Highlights (000-050) | 3/4 Tones (650+) | WCAG 7:1 AAA pass |
| Mid-Tones (500) | Shadows (999) | WCAG 4.5:1 AA pass |

## One Scale, Both Modes

A single scale covers the full lightness range. Light mode uses Highlights for surface bg and 3/4 Tones/Shadows for fg. Dark mode inverts: Shadows for surface bg and Highlights for fg. No separate "dark" scales needed — the same scale serves both modes.

## Chroma Varies by Hue

Scales are perceptually uniform in **lightness**, but chroma at the same weight differs across scales. Yellow peaks in chroma at high lightness (Highlights), while red and purple peak at mid-lightness (Mid-Tones). This is a property of how hues behave in oklch, not a deficiency.
