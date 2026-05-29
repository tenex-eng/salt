/* global console, process */

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, extname, join, normalize } from 'node:path';

const aiDocs = ['AI.md', 'llms.txt', 'docs/ai.md', 'docs/ai/index.md'];
const validationRoots = ['AI.md', 'llms.txt', 'README.md', 'docs', 'skills', 'bin'];
const textExtensions = new Set(['.md', '.mdx', '.txt', '.mjs', '.js', '.ts', '.tsx']);
const localLinkPattern = /\[[^\]]+\]\(([^)]+)\)/g;
const stalePackageName = '@tenex' + '/salt';
const stalePackagePattern = new RegExp(`${stalePackageName}\\b`, 'g');
const malformedSaltImportPattern = /from\s+['"](@tenex-eng\/salt[^/'"\s]+)['"]/g;
const missing = [];
const drift = [];

function collectTextFiles(path) {
  if (!existsSync(path)) {
    return [];
  }

  const stats = statSync(path);
  if (stats.isFile()) {
    return textExtensions.has(extname(path)) ? [path] : [];
  }

  return readdirSync(path, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git') {
      return [];
    }

    return collectTextFiles(join(path, entry.name));
  });
}

function lineForOffset(text, offset) {
  return text.slice(0, offset).split('\n').length;
}

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

for (const file of [...new Set(validationRoots.flatMap(collectTextFiles))]) {
  const contents = readFileSync(file, 'utf8');

  for (const match of contents.matchAll(stalePackagePattern)) {
    drift.push(`${file}:${lineForOffset(contents, match.index)} stale package name ${stalePackageName}`);
  }

  for (const match of contents.matchAll(malformedSaltImportPattern)) {
    drift.push(`${file}:${lineForOffset(contents, match.index)} malformed Salt import ${match[1]}`);
  }
}

if (missing.length > 0 || drift.length > 0) {
  console.error('AI docs validation failed.');
  if (missing.length > 0) {
    console.error('Missing files or unresolved local links:');
    for (const item of missing) {
      console.error(`- ${item}`);
    }
  }
  if (drift.length > 0) {
    console.error('Package-name or import drift:');
    for (const item of drift) {
      console.error(`- ${item}`);
    }
  }
  process.exit(1);
}

console.log('AI docs exist, local links resolve, and Salt package/import examples are valid.');
