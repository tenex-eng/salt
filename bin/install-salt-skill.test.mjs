import { mkdtempSync, mkdirSync, readFileSync, symlinkSync, existsSync, lstatSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { findRepositoryRoot, installSaltDesignSystemSkill } from './install-salt-skill.mjs';

function createFixture() {
  const root = mkdtempSync(join(tmpdir(), 'salt-skill-installer-'));
  const repo = join(root, 'consumer');
  const nested = join(repo, 'apps', 'web');
  const packageRoot = join(root, 'package');
  const skillRoot = join(packageRoot, 'skills', 'salt-design-system');

  mkdirSync(join(repo, '.git'), { recursive: true });
  mkdirSync(nested, { recursive: true });
  mkdirSync(skillRoot, { recursive: true });
  return { root, repo, nested, packageRoot, skillRoot };
}

describe('findRepositoryRoot', () => {
  it('finds the nearest parent with .git', () => {
    const { repo, nested } = createFixture();

    expect(findRepositoryRoot(nested)).toBe(repo);
  });

  it('returns null outside a repository', () => {
    const root = mkdtempSync(join(tmpdir(), 'salt-no-repo-'));

    expect(findRepositoryRoot(root)).toBeNull();
  });
});

describe('installSaltDesignSystemSkill', () => {
  it('copies the full package skill into the active skill location', () => {
    const { repo, nested, packageRoot, skillRoot } = createFixture();
    mkdirSync(join(skillRoot, 'rules'), { recursive: true });
    writeFileSync(join(skillRoot, 'SKILL.md'), '# Salt skill v1');
    writeFileSync(join(skillRoot, 'rules', 'composition.md'), '# Composition');

    const result = installSaltDesignSystemSkill({ cwd: nested, packageRoot });

    expect(result.repoRoot).toBe(repo);
    expect(readFileSync(join(repo, '.agents', 'skills', 'salt-design-system', 'SKILL.md'), 'utf8')).toBe('# Salt skill v1');
    expect(readFileSync(join(repo, '.agents', 'skills', 'salt-design-system', 'rules', 'composition.md'), 'utf8')).toBe('# Composition');
    expect(lstatSync(join(repo, '.agents', 'skills', 'salt-design-system')).isSymbolicLink()).toBe(false);
  });

  it('reruns predictably by refreshing the existing active skill copy', () => {
    const { repo, nested, packageRoot, skillRoot } = createFixture();
    mkdirSync(join(repo, '.agents', 'skills', 'salt-design-system', 'stale'), { recursive: true });
    writeFileSync(join(skillRoot, 'SKILL.md'), '# Salt skill v2');

    installSaltDesignSystemSkill({ cwd: nested, packageRoot });

    expect(existsSync(join(repo, '.agents', 'skills', 'salt-design-system', 'stale'))).toBe(false);
    expect(readFileSync(join(repo, '.agents', 'skills', 'salt-design-system', 'SKILL.md'), 'utf8')).toBe('# Salt skill v2');
  });

  it('replaces an existing symlink with a copied directory', () => {
    const { repo, nested, packageRoot, skillRoot } = createFixture();
    const destination = join(repo, '.agents', 'skills', 'salt-design-system');
    mkdirSync(join(repo, '.agents', 'skills'), { recursive: true });
    symlinkSync(skillRoot, destination, 'dir');
    writeFileSync(join(skillRoot, 'SKILL.md'), '# Salt skill');

    installSaltDesignSystemSkill({ cwd: nested, packageRoot });

    expect(lstatSync(destination).isSymbolicLink()).toBe(false);
    expect(readFileSync(join(destination, 'SKILL.md'), 'utf8')).toBe('# Salt skill');
  });

  it('fails clearly when no repository root is found', () => {
    const root = mkdtempSync(join(tmpdir(), 'salt-no-repo-'));

    expect(() => installSaltDesignSystemSkill({ cwd: root, packageRoot: root })).toThrow('No repository root found');
  });
});
