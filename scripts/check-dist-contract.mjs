/* global console, process */

import { readFileSync } from 'node:fs';

const failures = [];
const standaloneCss = readFileSync('dist/styles.css', 'utf8');
const tailwindCss = readFileSync('dist/tailwind.css', 'utf8');
const baseCss = readFileSync('dist/base.css', 'utf8');
const tailwindIntegrationCss = `${tailwindCss}\n${baseCss}`;

function addFailure(message) {
  failures.push(message);
}

function assertIncludes(source, needle, message) {
  if (!source.includes(needle)) {
    addFailure(message);
  }
}

function getRuleBody(css, selector) {
  const ruleStart = css.indexOf(`${selector} {`);

  if (ruleStart === -1) {
    return '';
  }

  const bodyStart = css.indexOf('{', ruleStart) + 1;
  let depth = 1;

  for (let index = bodyStart; index < css.length; index += 1) {
    const char = css[index];

    if (char === '{') {
      depth += 1;
    }

    if (char === '}') {
      depth -= 1;
    }

    if (depth === 0) {
      return css.slice(bodyStart, index);
    }
  }

  return '';
}

function assertNoCompilerDirectivesInStandaloneCss() {
  if (/@(?:import|theme|source|custom-variant|utility)\b/.test(standaloneCss)) {
    addFailure('dist/styles.css must be compiled CSS with no Tailwind compiler directives');
  }
}

function assertStandaloneUtilityCoverage() {
  for (const utility of [
    '.inline-flex',
    '.rounded-md',
    '.bg-primary',
    '.text-primary-foreground',
    '.font-heading',
  ]) {
    assertIncludes(standaloneCss, utility, `dist/styles.css missing rendered utility proof ${utility}`);
  }
}

function assertTailwindIntegrationShape() {
  if (tailwindCss.includes('@import "tailwindcss"') || tailwindCss.includes("@import 'tailwindcss'")) {
    addFailure('dist/tailwind.css must not import tailwindcss; consumers own the single Tailwind import');
  }

  for (const directive of [
    "@source '../**/*.{ts,tsx}'",
    "@import './base.css'",
    '@theme',
    '@custom-variant dark',
    '@keyframes accordion-down',
  ]) {
    assertIncludes(tailwindIntegrationCss, directive, `dist/tailwind.css missing Tailwind integration proof ${directive}`);
  }
}

function assertScopedAliasCoverage() {
  /*
    Tailwind v4 utilities read --color-* vars. Because those aliases can resolve
    at the root and inherit as concrete values, every runtime mode scope must
    re-declare aliases alongside raw intent tokens. This catches dark-mode and
    surface-mode regressions in the published CSS contract.
  */
  const scopedAliasChecks = {
    '.dark': [
      '--color-background: var(--surface-auxiliary-bg);',
      '--color-foreground: var(--surface-auxiliary-fg);',
      '--color-popover: var(--surface-secondary-bg);',
      '--color-muted-foreground: hsl(var(--muted-foreground));',
      '--color-accent-foreground: hsl(var(--accent-foreground));',
    ],
    '.surface-primary-mode': [
      '--color-background: var(--surface-primary-bg);',
      '--color-foreground: var(--surface-primary-fg);',
      '--color-muted: var(--surface-primary-subtle);',
      '--color-muted-foreground: var(--neutral-fg);',
      '--color-accent-foreground: var(--surface-primary-fg);',
    ],
    '.surface-secondary-mode': [
      '--color-background: var(--surface-secondary-bg);',
      '--color-foreground: var(--surface-secondary-fg);',
      '--color-muted: var(--surface-secondary-subtle);',
      '--color-muted-foreground: var(--neutral-fg);',
      '--color-accent-foreground: var(--surface-secondary-fg);',
    ],
  };

  for (const [scope, aliases] of Object.entries(scopedAliasChecks)) {
    const scopeBody = getRuleBody(baseCss, scope);

    for (const alias of aliases) {
      assertIncludes(scopeBody, alias, `dist/base.css ${scope} missing scoped alias ${alias}`);
    }
  }
}

assertNoCompilerDirectivesInStandaloneCss();
assertStandaloneUtilityCoverage();
assertTailwindIntegrationShape();
assertScopedAliasCoverage();

if (failures.length > 0) {
  console.error('Dist CSS contract validation failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Dist CSS contract supports standalone CSS and Tailwind v4 integration CSS.');
