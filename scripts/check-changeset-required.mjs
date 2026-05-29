/* global console, process */

import { execFileSync } from 'node:child_process';

const baseRef = process.env.BASE_SHA ?? process.argv[2] ?? 'origin/main';
const headRef = process.env.HEAD_SHA ?? process.argv[3] ?? 'HEAD';

const packageVisiblePatterns = [
  /^src\//,
  /^bin\//,
  /^docs\//,
  /^skills\//,
  /^README\.md$/,
  /^AI\.md$/,
  /^llms\.txt$/,
  /^package\.json$/,
];

function git(args) {
  return execFileSync('git', args, { encoding: 'utf8' });
}

function isChangeset(path) {
  return /^\.changeset\/[^/]+\.md$/.test(path) && path !== '.changeset/README.md';
}

function isPackageVisible(path) {
  return packageVisiblePatterns.some((pattern) => pattern.test(path));
}

function parseDiffLine(line) {
  const [status, ...paths] = line.split('\t');
  return {
    status,
    path: paths.at(-1),
  };
}

function isVersionPrChange(change) {
  if (change.path === 'package.json' || change.path === 'CHANGELOG.md' || change.path === 'bun.lock') {
    return true;
  }

  return isChangeset(change.path) && change.status.startsWith('D');
}

const diffOutput = git(['diff', '--name-status', `${baseRef}...${headRef}`]).trim();
const changes = diffOutput ? diffOutput.split('\n').map(parseDiffLine) : [];
const packageVisibleChanges = changes.filter((change) => isPackageVisible(change.path));
const changesetChanges = changes.filter((change) => isChangeset(change.path));
const hasChangeset = changesetChanges.some((change) => !change.status.startsWith('D'));
const isVersionPr =
  changes.some((change) => change.path === 'package.json') &&
  changes.some((change) => change.path === 'CHANGELOG.md') &&
  changesetChanges.some((change) => change.status.startsWith('D')) &&
  changes.every(isVersionPrChange);

if (packageVisibleChanges.length === 0) {
  console.log('No package-visible changes found. Changeset not required.');
  process.exit(0);
}

if (hasChangeset) {
  console.log('Package-visible changes include a changeset.');
  process.exit(0);
}

if (isVersionPr) {
  console.log('Version PR detected. Changeset already consumed.');
  process.exit(0);
}

console.error('Package-visible changes require a changeset.');
console.error('Run `bun run changeset` and commit the generated .changeset/*.md file.');
console.error('Package-visible files changed:');
for (const change of packageVisibleChanges) {
  console.error(`- ${change.path}`);
}
process.exit(1);
