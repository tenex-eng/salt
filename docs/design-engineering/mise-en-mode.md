# Mise en Mode

Salt's token architecture follows the Mise en Mode idea: separate what an element is for from how it is expressed in a context.

## Intents

Intent tokens describe purpose.

| Purpose | Covers |
| --- | --- |
| surface | non-interactive containers |
| action | interactive command elements |
| control | form inputs |
| text | type hierarchy |

Intents use purpose, priority, and property: `--surface-primary-bg`, `--action-secondary-border`, `--control-fg`.

## Priority

Priority is relative importance:

- `primary`: most disruptive / highest emphasis.
- `secondary`: temporarily elevated / medium emphasis.
- `auxiliary`: default / most common.

Primary does not mean default. Auxiliary is usually default.

## Expressions

An expression changes how an element communicates without changing its purpose. A destructive action is still an action; it expresses danger.

Salt implements expressions as `tone` + `appearance`.

## Modes

A mode is a scoped set of token values. Light and dark are modes. Surface tiers are also modes:

- `.surface-primary-mode`: dialogs, sheets, alert dialogs.
- `.surface-secondary-mode`: popovers, dropdowns, tooltips, hover cards.
- auxiliary: default page/card/input context.

Modes nest through CSS custom property inheritance.

## Avoid token proliferation

Do not add component tokens (`--modal-bg`) or domain tokens (`--severity-critical-bg`) when intent or expression tokens cover the need.
