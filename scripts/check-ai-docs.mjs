/* global console, process */

import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, normalize } from 'node:path';

const aiDocs = ['AI.md', 'docs/ai.md'];
const localLinkPattern = /\[[^\]]+\]\(([^)]+)\)/g;
const missing = [];

for (const file of aiDocs) {
  if (!existsSync(file)) {
    missing.push(file);
    continue;
  }

  const markdown = readFileSync(file, 'utf8');
  for (const match of markdown.matchAll(localLinkPattern)) {
    const href = match[1].trim();

    if (href.startsWith('http:') || href.startsWith('https:') || href.startsWith('#')) {
      continue;
    }

    const [pathWithoutHash] = href.split('#');
    if (!pathWithoutHash) {
      continue;
    }

    const target = normalize(join(dirname(file), decodeURI(pathWithoutHash)));
    if (!existsSync(target)) {
      missing.push(`${file} -> ${href}`);
    }
  }
}

if (missing.length > 0) {
  console.error('AI docs validation failed. Missing files or unresolved local links:');
  for (const item of missing) {
    console.error(`- ${item}`);
  }
  process.exit(1);
}

console.log('AI docs exist and local links resolve.');
