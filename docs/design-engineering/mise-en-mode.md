# Mise en Mode

Theory reference for the intent-based color token architecture adopted from Donnie D'Amato's *Mise en Mode* (2024). This document defines the framework's vocabulary and principles. For project-specific implementation details, see [colors.md](colors.md).

## Core Premise

Design tokens should separate **structure** (what an element is for) from **expression** (how it looks in a given context). A button's purpose is stable — it's an interactive element where the user executes a command. How that button is styled varies by context: light mode, dark mode, promotional treatment, error state. The structure doesn't change when the expression changes.

> "We want the element to have a purpose before we give it a mode. The mode is meant to create a new expression for the element that was placed there for an unrelated and generic reason."

## Design Tokens as Intents

An intent token conveys design intention within the experience. It holds designers accountable for design decisions — if a designer cannot describe the user-centered intent behind an object, the object isn't important to the user experience.

> "Thinking about a design token in this way is a powerful paradigm shift because it holds designers accountable for design decisions."

Intents are constructed from three parts: **purpose**, **priority**, and **property**.

### Purpose

What kind of UI element is this? Purpose targets the generic existence of the visual element.

| Purpose | Covers | Key insight |
|---|---|---|
| **surface** | Non-interactive containers | Priority = elevation (primary = modal, secondary = popover, auxiliary = page bg) |
| **action** | Interactive elements | Priority = visual weight (primary = CTA, secondary = outline, auxiliary = ghost) |
| **control** | Form inputs | No priority — all inputs share equal visual treatment |
| **text** | Typography | Priority = prominence (primary = headlines, secondary = body, auxiliary = fine print) |

> "The goal should be to generalize the tokens to cover multiple components and their similar styles."

### Priority

How important is this element relative to its siblings?

| Priority | Meaning |
|---|---|
| **primary** | Most disruptive; demands attention |
| **secondary** | Temporarily elevated, dismissible |
| **auxiliary** | Default canvas; most common |

The most common treatment is auxiliary, not primary. Primary is the most disruptive, not the most frequent. "Primary" does not mean "brand color" — a primary surface is a modal, a primary action is the main CTA. The brand color is the value assigned to the primary action in the current mode.

> "What is considered the default is separate from the purpose and priority found in the experience. It should be identified as the most used treatment."

### Property

What visual attribute does the token control?

- **bg** — background color
- **fg** — foreground/text color
- **border** — border color
- For text purpose: **fontSize**, **fontWeight**, **fontFamily**, **lineHeight**

Text is unique — its properties are font metrics, not colors. Text color belongs to the surface the text sits on, not the text intent. Color applies to icons and other glyphs too, making it a container concern.

## Expressions

> "An expression takes an existing representation of the experience and alters its presentation to express a new idea or message."

An expression is like wallpaper in a room — the construction and purpose of the room remain the same, but the wallpaper conveys a new feeling. The critical insight: **you don't switch to different tokens, you change the values the existing tokens represent.**

```css
/* Traditional approach: new tokens per state */
input { border: 1px solid var(--control_borderColor); }
input.is-critical { border: 1px solid var(--control_critical_borderColor); }

/* Mise en Mode: same token, new value in scope */
:root { --control_borderColor: gray; }
.is-critical { --control_borderColor: red; }
input { border: 1px solid var(--control_borderColor); }
```

> "There is no such thing as a destructive button, only a button expressing the idea of destruction."

This eliminates token proliferation. Every new expression doesn't require new tokens — it requires new values for existing tokens within a scope.

### Tones as Expressions

Tones are a fixed vocabulary of expressions that communicate sentiment. Each tone is a complete set of values for the expression palette properties (subtle bg, foreground, border, solid bg, solid foreground). When a tone is applied, it overrides the default values for that scope.

Tones are the design system's shared vocabulary. Domain concepts (severity, priority, health) are not tones — they map to tones through business logic. This separation means:

1. Changing which tone a domain value maps to is a product decision, not a design system change.
2. Every new domain concept funnels through the same fixed set of tones rather than spawning its own color system.
3. "Danger" is universal; "severity-critical" is domain jargon.

### Appearance as Priority

The visual weight of an expression corresponds to the priority dimension. A subtle badge (tinted background) is less disruptive than a solid badge (filled background). This maps to the intent framework's primary/secondary/auxiliary hierarchy applied to how prominently the expression renders.

## Modes

A mode is a complete collection of values for all intents that creates a new expression. Light mode and dark mode are the most obvious examples — the same intents get different values.

> "Instead of going through an exercise in token naming, the exercise is now curating where this expression will be used in our experiences."

Modes separate responsibilities:
- **UX designers** decide where expressions are placed in the composition
- **UI designers** curate the values within each mode
- **Design systems** maintain the intent structure and facilitate the decisions

> "A design systems team merely facilitates the decision."

### Mode-ception

Modes nest. A page can have Mode A, a modal inside it Mode B, a promotional section inside that Mode C. Each nested mode re-curates the intent set within its scope. When a mode is removed, descendants fall back through the ancestor chain until a mode supplies a value — what the book calls "parent mode caring for any missing children."

CSS custom property inheritance is this mechanism. A mode is just a CSS class (or `@utility`) that redeclares the relevant `--*` intents. Any descendant resolving a token looks up the scope chain and picks up the closest definition.

For project-specific implementation — how we translate this into our Tailwind v4 stack with `.surface-{tier}-mode` class rules, plus the Tailwind-specific gotchas around `@theme` alias resolution and `@utility` filtering — see [colors.md](colors.md#surface-modes--mem-translation).

### Critical Modes

Some modes should be preloaded — the default brand expression should always be ready. Other modes (promotional treatments, seasonal themes) can be loaded on demand.

> "The mode which represents the default brand expression should be on the list."

The brand is the default mode — the base expression that exists before any override is applied. It is not a tone or a special expression. It is simply what you see when no expression has been applied.

## Avoiding Token Proliferation

### No Component Tokens

Component tokens (`--modal-bg`, `--button-primary-bg`) create an explosion as the library grows. Intents generalize across components — a surface-primary intent covers modals, alert banners, and any future high-priority container without naming any of them.

### No Inverse Tokens

Creating `--foo-inverse` for dark-on-light sections duplicates the entire token set. The intent architecture avoids this — because intents describe purpose rather than specific colors, the same tokens work in any mode. A dark section applies dark mode intent values; every component inside already has coverage.

### No Interaction Tokens

Don't create tokens for hover, focus, active, or dragging states. Hover affects half of users (touch devices). Focus should be left to browser/Radix defaults. Active states use minor visual adjustments. Selected states are expressions (apply a tone), not interactions.

> "If the experience can have a default presentation which could be enhanced due to some factor — can I wallpaper this room? — it is an expression."

## Figure Tokens

The one exception to "no component tokens." Figure elements are regions that share the same purpose but must be visually distinguished: chart segments, syntax highlighting, anonymous avatars. These use ranked ordinal tokens (`--dataviz-1st`, `--dataviz-2nd`) because the color signals **identity** (which region) rather than **meaning** (good/bad).

> "Just because something is first doesn't immediately convey the highest importance."

## Overgeneralization Warning

It's tempting to reduce everything to surfaces. But overgeneralization forces modes to carry purpose information that should be structural. An element should have a purpose before it gets a mode.

> "We don't want to give an element meaning by supplying a mode, we want the element to have a purpose before we give it a mode."
