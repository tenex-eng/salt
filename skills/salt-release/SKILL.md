---
name: salt-release
description: >-
  Automates Salt releases with the repo prepare-release script and GitHub Actions checks. Use when the user says they merged changes to main and wants to cut, prepare, publish, or verify a Salt release.
---

# Salt Release

Use this skill to turn merged changesets on `main` into a published `@tenex-eng/salt` release.

## Guardrails

- Read `docs/RELEASING.md` first.
- Start from a clean worktree; stop if user/other-agent changes are present.
- Do not run `bun run release` locally unless the user explicitly asks for local publishing.
- The helper opens a version PR; merging that PR triggers publishing in CI.
- If the user asked for an end-to-end release, merge the version PR after checks pass. Otherwise stop at the PR.

## Workflow

1. Sync and inspect main:

   ```bash
   git status --short --branch
   git fetch origin main --tags
   gh run list --workflow Release --branch main --limit 5
   ```

2. Check the latest `Release` run for the merged `main` commit.
   - If queued/in progress: wait.
   - If failed: inspect logs, fix or report.
   - Expected pre-version result: success with pending changesets and `Publish` skipped.

3. Prepare the version PR:

   ```bash
   bun run prepare-release
   ```

   The script creates a timestamped `chore/version-packages-*` branch, runs `version-packages`, runs `bun run check`, commits, pushes, and opens the PR.

4. Watch PR checks:

   ```bash
   gh pr checks --watch
   ```

5. If the user authorized end-to-end release, merge the version PR when green:

   ```bash
   gh pr merge <pr> --squash
   ```

6. Watch publish on `main`:

   ```bash
   gh run list --workflow Release --branch main --limit 5
   gh run view <run-id>
   ```

7. Verify final artifacts:

   ```bash
   gh release list --limit 5
   git ls-remote --tags origin 'v*'
   ```

Confirm the expected package/version was published and a matching `vX.Y.Z` tag/release exists.

## Recovery

- No pending changesets: report that there is nothing to version.
- PR check failure: inspect logs, fix on the version branch, rerun checks.
- Publish failure: inspect Release logs; do not retry locally unless explicitly instructed.
