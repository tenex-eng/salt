#!/usr/bin/env node
/* global console, process */

import { existsSync, mkdirSync, rmSync, cpSync, lstatSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const skillName = 'salt-design-system';

export function findRepositoryRoot(startDirectory = process.cwd()) {
  let current = resolve(startDirectory);

  while (true) {
    if (existsSync(join(current, '.git'))) {
      return current;
    }

    const parent = dirname(current);
    if (parent === current) {
      return null;
    }

    current = parent;
  }
}

export function installSaltDesignSystemSkill({
  cwd = process.cwd(),
  packageRoot = dirname(dirname(fileURLToPath(import.meta.url))),
} = {}) {
  const repoRoot = findRepositoryRoot(cwd);
  if (!repoRoot) {
    throw new Error('No repository root found. Run this command inside a Git repository.');
  }

  const source = join(packageRoot, 'skills', skillName);
  if (!existsSync(source)) {
    throw new Error(`Package skill not found: ${source}`);
  }

  const skillsRoot = join(repoRoot, '.agents', 'skills');
  const destination = join(skillsRoot, skillName);

  mkdirSync(skillsRoot, { recursive: true });
  rmSync(destination, { recursive: true, force: true });
  cpSync(source, destination, { recursive: true, dereference: false });

  if (lstatSync(destination).isSymbolicLink()) {
    throw new Error(`Installed skill must be a copied directory, not a symlink: ${destination}`);
  }

  return { repoRoot, destination };
}

function main() {
  try {
    const { repoRoot, destination } = installSaltDesignSystemSkill();
    console.log(`Installed ${skillName} skill to ${destination}`);
    console.log('Next steps:');
    console.log(`- Ensure your agent loads skills from ${repoRoot}/.agents/skills`);
    console.log(`- Use ${skillName} when building React UI with @tenex-eng/salt`);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
