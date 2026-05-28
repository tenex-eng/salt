/* global console, process */

import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const requiredBin = 'salt-install-skill';
const requiredFiles = [
  'AI.md',
  'docs/ai.md',
  'bin/install-salt-skill.mjs',
  'skills/salt-design-system/SKILL.md',
];

const output = execFileSync('npm', ['pack', '--dry-run', '--json'], {
  encoding: 'utf8',
});

const [packResult] = JSON.parse(output);
const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
const packedFiles = new Set(packResult.files.map((file) => file.path));
const missingFiles = requiredFiles.filter((file) => !packedFiles.has(file));
const binTarget = packageJson.bin?.[requiredBin]?.replace(/^\.\//, '');

if (!binTarget) {
  missingFiles.push(`package.json bin.${requiredBin}`);
} else if (!packedFiles.has(binTarget)) {
  missingFiles.push(`package.json bin.${requiredBin} -> ${binTarget}`);
}

if (missingFiles.length > 0) {
  console.error('Missing required files or binary exposure from published package:');
  for (const file of missingFiles) {
    console.error(`- ${file}`);
  }
  process.exit(1);
}

console.log('Required files and binary exposure are included in published package.');
