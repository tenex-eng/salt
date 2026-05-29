/* global console, process */

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { basename, join } from 'node:path';

const componentDir = 'src/components';
const excluded = new Set([
  'color-scales.data.ts',
  'index.ts',
  'json-diff-limits.ts',
  'tone.ts',
]);

const runtimeComponents = readdirSync(componentDir)
  .filter((file) => (file.endsWith('.tsx') || file.endsWith('.ts')) && !file.includes('.stories.') && !file.includes('.test.') && !excluded.has(file))
  .map((file) => basename(file).replace(/\.(tsx|ts)$/, ''))
  .sort();

const rootIndex = readFileSync('src/index.ts', 'utf8');
const componentIndex = readFileSync('src/components/index.ts', 'utf8');
const missing = [];

for (const component of runtimeComponents) {
  const exportLine = `export * from './components/${component}';`;
  const componentExportLine = `export * from './${component}';`;

  if (!rootIndex.includes(exportLine)) {
    missing.push(`src/index.ts missing ${exportLine}`);
  }

  if (!componentIndex.includes(componentExportLine)) {
    missing.push(`src/components/index.ts missing ${componentExportLine}`);
  }
}

for (const required of [
  "export { toneStyle } from './components/tone';",
  "export type { Appearance, Tone } from './components/tone';",
]) {
  if (!rootIndex.includes(required)) {
    missing.push(`src/index.ts missing ${required}`);
  }
}

if (rootIndex.includes('BRAND_CLASSES') || componentIndex.includes('BRAND_CLASSES')) {
  missing.push('BRAND_CLASSES must remain private');
}

const declarationsPath = 'dist/index.d.ts';
if (!existsSync(declarationsPath)) {
  missing.push(`${declarationsPath} missing; run build before public-surface check`);
} else {
  const declarations = readFileSync(declarationsPath, 'utf8');
  for (const symbol of ['Sidebar', 'Toaster', 'Tone', 'Appearance', 'toneStyle']) {
    if (!declarations.includes(symbol)) {
      missing.push(`${declarationsPath} missing ${symbol}`);
    }
  }

  if (declarations.includes('BRAND_CLASSES')) {
    missing.push(`${declarationsPath} must not export BRAND_CLASSES`);
  }
}

if (missing.length > 0) {
  console.error('Public surface validation failed:');
  for (const item of missing) {
    console.error(`- ${item}`);
  }
  process.exit(1);
}

console.log(`Public surface exports ${runtimeComponents.length} runtime components and expression helpers.`);
