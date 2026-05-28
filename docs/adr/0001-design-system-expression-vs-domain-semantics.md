# Salt separates design-system expression from application domain semantics

Salt core standardizes on generic interface language such as `tone` and `appearance`; application terms such as severity, priority, case status, and system health belong in consuming apps. Consuming apps should map their domain language to Salt expressions through app-owned adapters rather than relying on Salt-provided domain tokens or security-specific style layers.

## Considered Options

- Keep security/severity/priority tokens in Salt core for convenience.
- Ship a security-specific Salt style layer.
- Remove domain tokens from Salt core and keep only generic expression tokens.

## Consequences

Salt remains domain-neutral before broad consumption. Apps own mappings like `critical -> danger` and can define their own domain wrappers where useful. Existing legacy component props such as `variant` may remain temporarily while Nucleus migrates, but new Salt APIs should prefer `tone` and `appearance`.
