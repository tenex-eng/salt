/* global console, process */

import { execFileSync } from 'node:child_process';

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
const packedFiles = new Set(packResult.files.map((file) => file.path));
const missingFiles = requiredFiles.filter((file) => !packedFiles.has(file));

if (missingFiles.length > 0) {
  console.error('Missing required files from published package:');
  for (const file of missingFiles) {
    console.error(`- ${file}`);
  }
  process.exit(1);
}

console.log('Required files are included in published package.');
