/* global console, process */

import { readFileSync } from 'node:fs';

const failures = [];
const standalone = readFileSync('dist/styles.css', 'utf8');
const tailwind = readFileSync('dist/tailwind.css', 'utf8');
const base = readFileSync('dist/base.css', 'utf8');
const tailwindIntegration = `${tailwind}\n${base}`;
const declarations = readFileSync('dist/index.d.ts', 'utf8');

if (/@(?:import|theme|source|custom-variant|utility)\b/.test(standalone)) {
  failures.push('dist/styles.css must be standalone compiled CSS with no Tailwind compiler directives');
}

for (const needle of ['.inline-flex', '.rounded-md', '.bg-primary', '.text-primary-foreground']) {
  if (!standalone.includes(needle)) {
    failures.push(`dist/styles.css missing rendered utility proof ${needle}`);
  }
}

if (tailwind.includes('@import "tailwindcss"') || tailwind.includes("@import 'tailwindcss'")) {
  failures.push('dist/tailwind.css must not import tailwindcss; consumers own the single Tailwind import');
}

for (const needle of ["@source '../**/*.{ts,tsx}'", "@import './base.css'", '@theme', '@custom-variant dark', '@keyframes accordion-down']) {
  if (!tailwindIntegration.includes(needle)) {
    failures.push(`dist/tailwind.css missing Tailwind integration proof ${needle}`);
  }
}

if (!declarations.includes('Button')) {
  failures.push('dist/index.d.ts missing component declaration proof Button');
}

if (failures.length > 0) {
  console.error('CSS contract validation failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('CSS contract supports standalone CSS and Tailwind v4 integration CSS.');
