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
