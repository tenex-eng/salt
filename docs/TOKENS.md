# Tokens

Salt token layers:

1. Base semantic tokens: background, foreground, primary, muted, accent, destructive, border, input, ring.
2. Security semantic tokens: severity critical/high/medium/low background, text, border.
3. Component variants consume semantic utilities.

Import all styles:

```ts
import '@tenex/salt/styles.css';
```

Or layer imports:

```ts
import '@tenex/salt/styles/base.css';
import '@tenex/salt/styles/security.css';
```

Consumers may override CSS variables under `:root`, `.dark`, or tenant theme classes.
