# Salt

Salt is Tenex's React design system. It provides generic interface language and reusable components while leaving application domain semantics to consuming apps.

## Language

**Tone**:
A generic semantic color intent for UI communication.
_Avoid_: Severity, priority, status

**Appearance**:
A generic visual treatment that controls emphasis within a component.
_Avoid_: Variant, severity style

**Domain adapter**:
Application-owned mapping from domain language to Salt's generic interface language.
_Avoid_: Salt security layer, core severity tokens

**Salt consumer**:
Any application or agent that uses Salt to build application interfaces.
_Avoid_: Salt maintainer

**Agent legibility**:
The degree to which Salt can be discovered, understood, and used correctly by coding agents from package-shipped context.
_Avoid_: Anti-hallucination rules, error prevention checklist

**Salt design-system skill**:
A package-shipped agent skill that teaches consuming apps how to build interfaces with Salt.
_Avoid_: Salt consumer skill, Nucleus design-engineering skill, app-specific skill

**Active skill copy**:
The consumer-owned copy of a package skill installed under `.agents/skills/` and linked to tool-specific skill locations as needed.
_Avoid_: Package skill source, direct node_modules skill

**App design-extension skill**:
A consuming-app-owned skill for product-specific components that follow Salt's design language without belonging to Salt core.
_Avoid_: Salt consumer skill, design system skill

**Product-specific component**:
A component owned by a consuming app because it expresses that product's interface needs, domain, or workflow.
_Avoid_: Salt primitive

**Promotion candidate**:
A product-specific component that may move into Salt because a small team judges it useful across apps.
_Avoid_: Automatic extraction, one-off component

## Relationships

- A **Domain adapter** maps application terms to **Tone** and **Appearance**.
- **Tone** and **Appearance** belong to Salt core.
- Legacy variant props may remain temporarily while existing consumers migrate.
- Domain terms such as severity, priority, case status, and system health belong to consuming applications.

## Example dialogue

> **Dev:** "Should Salt expose a critical severity badge?"
> **Domain expert:** "No — the app maps critical severity to a danger tone and renders Salt's Badge."

## Flagged ambiguities

- "security layer" was considered for Salt domain tokens; resolved: security semantics belong in consuming apps unless a future shared domain package is justified.
