/* global console, process */

import { execFileSync, spawnSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';

const args = parseArgs(process.argv.slice(2));
const branchName = args.branch ?? `chore/version-packages-${timestamp()}`;

function parseArgs(argv) {
  const parsed = {
    branch: undefined,
    skipCheck: false,
    noPr: false,
    draft: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '--skip-check') {
      parsed.skipCheck = true;
      continue;
    }

    if (arg === '--no-pr') {
      parsed.noPr = true;
      continue;
    }

    if (arg === '--draft') {
      parsed.draft = true;
      continue;
    }

    if (arg === '--branch') {
      const value = argv[index + 1];
      if (!value) {
        fail('Missing value for --branch.');
      }
      parsed.branch = value;
      index += 1;
      continue;
    }

    if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    }

    fail(`Unknown argument: ${arg}`);
  }

  return parsed;
}

function timestamp() {
  return new Date().toISOString().replace(/[-:TZ.]/g, '').slice(0, 14);
}

function printHelp() {
  console.log(`Prepare a Salt version PR from pending changesets.

Usage:
  bun run prepare-release [--branch <name>] [--skip-check] [--no-pr] [--draft]

Options:
  --branch <name>  Version branch name. Defaults to chore/version-packages-<timestamp>.
  --skip-check     Skip bun run check before committing.
  --no-pr          Commit locally, but do not push or create a PR.
  --draft          Create the GitHub PR as a draft.
`);
}

function fail(message) {
  console.error(`Error: ${message}`);
  process.exit(1);
}

function run(command, commandArgs, options = {}) {
  console.log(`$ ${[command, ...commandArgs].join(' ')}`);
  const result = spawnSync(command, commandArgs, {
    stdio: 'inherit',
    ...options,
  });

  if (result.status !== 0) {
    fail(`${command} ${commandArgs.join(' ')} failed.`);
  }
}

function capture(command, commandArgs, options = {}) {
  return execFileSync(command, commandArgs, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    ...options,
  }).trim();
}

function ensureCleanWorktree() {
  const status = capture('git', ['status', '--porcelain']);
  if (status) {
    fail(`Worktree must be clean before preparing a release.\n${status}`);
  }
}

function ensureBranchAvailable(branch) {
  const localBranches = capture('git', ['branch', '--list', branch]);
  if (localBranches) {
    fail(`Local branch already exists: ${branch}`);
  }

  const remoteRef = capture('git', ['ls-remote', '--heads', 'origin', branch]);
  if (remoteRef) {
    fail(`Remote branch already exists: origin/${branch}`);
  }
}

function ensureGhReady() {
  if (args.noPr) {
    return;
  }

  run('gh', ['auth', 'status']);
}

function pendingChangesets() {
  return readdirSync('.changeset')
    .filter((fileName) => fileName.endsWith('.md') && fileName !== 'README.md')
    .sort();
}

function packageVersion() {
  const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
  return packageJson.version;
}

function createPr(version) {
  const prArgs = [
    'pr',
    'create',
    '--base',
    'main',
    '--head',
    branchName,
    '--title',
    'chore: version packages',
    '--body',
    [
      '## Summary',
      `- version @tenex-eng/salt to ${version}`,
      '- consume pending changesets into CHANGELOG.md',
      '',
      '## Verification',
      args.skipCheck ? '- not run (--skip-check)' : '- bun run check',
    ].join('\n'),
  ];

  if (args.draft) {
    prArgs.push('--draft');
  }

  console.log(`$ gh ${prArgs.join(' ')}`);
  const prUrl = capture('gh', prArgs);
  console.log(prUrl);
  return prUrl;
}

ensureCleanWorktree();
ensureGhReady();
run('git', ['fetch', 'origin', 'main', '--tags']);
run('git', ['switch', 'main']);
run('git', ['pull', '--ff-only', 'origin', 'main']);
ensureCleanWorktree();
ensureBranchAvailable(branchName);

const changesets = pendingChangesets();
if (changesets.length === 0) {
  console.log('No pending changesets on main. Nothing to version.');
  process.exit(0);
}

console.log('Pending changesets:');
for (const changeset of changesets) {
  console.log(`- .changeset/${changeset}`);
}

run('git', ['switch', '-c', branchName]);
run('bun', ['run', 'version-packages']);

if (!args.skipCheck) {
  run('bun', ['run', 'check']);
}

const generatedStatus = capture('git', ['status', '--porcelain']);
if (!generatedStatus) {
  fail('version-packages produced no changes.');
}

run('git', ['add', 'package.json', 'CHANGELOG.md', '.changeset']);
run('git', ['commit', '-m', 'chore: version packages']);

const version = packageVersion();

if (args.noPr) {
  console.log(`Prepared ${branchName} for @tenex-eng/salt@${version}.`);
  console.log('Push and open a PR when ready.');
  process.exit(0);
}

run('git', ['push', '-u', 'origin', branchName]);
const prUrl = createPr(version);

console.log('\nNext steps:');
console.log(`1. Watch PR checks: gh pr checks ${prUrl} --watch`);
console.log(`2. Merge the version PR when green: gh pr merge ${prUrl} --squash`);
console.log('3. Watch the Release workflow on main and confirm Publish succeeds.');
