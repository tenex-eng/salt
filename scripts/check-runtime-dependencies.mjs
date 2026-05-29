/* global console, process */

import { readFileSync } from 'node:fs';

const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
const runtimeDependencies = packageJson.dependencies ?? {};
const peerDependencies = packageJson.peerDependencies ?? {};
const devDependencies = packageJson.devDependencies ?? {};
const failures = [];

const devOnlyPackages = [
  '@hookform/resolvers',
  '@radix-ui/react-visually-hidden',
  '@tanstack/hotkeys',
  'embla-carousel-react',
  'input-otp',
  'react-hook-form',
  'recharts',
  'vaul',
  'zod',
];

const peerRuntimePackages = [
  '@tanstack/react-hotkeys',
  'date-fns',
  'next-themes',
  'react',
  'react-day-picker',
  'react-dom',
  'sonner',
];

for (const name of devOnlyPackages) {
  if (runtimeDependencies[name] || peerDependencies[name]) {
    failures.push(`${name} must stay dev-only`);
  }
  if (!devDependencies[name]) {
    failures.push(`${name} should remain available for docs/stories/tests as a devDependency`);
  }
}

for (const name of peerRuntimePackages) {
  if (!peerDependencies[name]) {
    failures.push(`${name} must be declared as a peer dependency`);
  }
  if (name !== 'react' && name !== 'react-dom' && !devDependencies[name]) {
    failures.push(`${name} peer must also be a devDependency for local build/test`);
  }
}

if (runtimeDependencies['next-themes'] || runtimeDependencies.sonner || runtimeDependencies['react-day-picker']) {
  failures.push('contextful/provider-sensitive public component packages must not be bundled runtime dependencies');
}

if (packageJson.peerDependenciesMeta?.['next-themes']?.optional !== true) {
  failures.push('next-themes peer must be optional because Toaster has DOM .dark fallback');
}

if (failures.length > 0) {
  console.error('Runtime dependency contract validation failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Runtime dependency contract is classified intentionally.');
