/* global console, process */

import { mkdirSync, copyFileSync, readFileSync, writeFileSync } from 'node:fs';
import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';

mkdirSync('dist', { recursive: true });

const standaloneInput = readFileSync('src/styles/standalone.css', 'utf8');
const result = await postcss([tailwindcss()]).process(standaloneInput, {
  from: 'src/styles/standalone.css',
  to: 'dist/styles.css',
});

writeFileSync('dist/styles.css', result.css);
copyFileSync('src/styles/tailwind.css', 'dist/tailwind.css');
copyFileSync('src/styles/base.css', 'dist/base.css');

if (/@(?:import|theme|source|custom-variant|utility)\b/.test(result.css)) {
  console.error('Standalone CSS contains Tailwind compiler directives.');
  process.exit(1);
}

console.log('Built standalone CSS and Tailwind integration CSS.');
