# Handoff: remaining quality work

**For the next Claude Code session (web or terminal).** When the maintainer says "continue", read this file and finish the tasks below **in order, one pull request per task**. Tick each box in this file as you go. Once every box is ticked, delete this file and remove the pointer to it from `CLAUDE.md` in the last pull request.

Written 2026-10-06. Library at that point: **1,285 skills across 152 bundles, v82.0.0 released.**

## Already done (do not redo)

- v82.0.0 released (#331): npm 82.0.0, PyPI 0.54.0, verified by `node scripts/release-verify.mjs`.
- #332: the README counts were corrected, and `scripts/check-drift.mjs` now reads the Chinese, Traditional and Korean READMEs and every `docs/readme-assets/*.svg`.
- #333: new README banner (`scripts/build-banner.mjs`) and `web/docs-assets/social-preview.png`.
- #334, quality item 6: the 45 declared near-duplicate pairs carry "Not quite this? Use `x` when …" lines, and `skill-dupes --check` enforces them.
- #335, quality item 5: every live skill has `## Example Trigger Phrases`, including localized sections in 108 translations.

## Task 1: confirm main is green after #335

#335 changed 10,719 files. Above a few thousand files, GitHub stops matching path filters, so **SkillCheck, Skill Security Audit, the smoke tests, web weight and conformance did not run on the pull request**. They passed locally and run on push to main.

- [x] Check them on main:

  **Done 2026-10-06, at b9ea3211c.** The five path-filtered workflows did not run on the push either (the merge was over the path-filter file limit; the commit got only the mirrors and the generated-artifacts check), and none of them has workflow_dispatch, so they were run locally at that commit instead. Results: skillcheck-test pass, SkillCheck all 1,285 valid, skill-dupes clean, Skill Security Audit 0 high (22 known medium), conformance badge current, web weight within budget. The web smoke suite cannot run in this sandbox (its proxy's TLS certificate makes Chromium fail every CDN load); it passed on CI at the parent commit a07d46e3e, and #335 changed no page code. Two notes: Deploy Skill Playground also skipped #335, so the live playground is one commit behind until the next merge that touches its paths (Task 2 will); dispatching workflows needs more than this session's credential (403).

  ```bash
  gh run list --branch main --limit 25 --json name,conclusion,headSha
  ```

  If any failed, read the log (`gh run view <id> --log-failed`) and fix forward in a small pull request.

## Task 2: quality item 4, examples for the 100 most-used skills

**Done 2026-10-06, merged in #337 (squash, 7bdc24d5b).** 100 examples written and merged in five committed batches of 20, selected by the four signals below (58 production-tier, 23 README/start, 4 trending, 15 flagship-bundle) with the full list recorded in the pull request body. Chinese-language skills (cn-weekly-report, cn-civil-exam-interview, cn-severance-calculator) are in Simplified Chinese; the decoder examples keep their verbatim disclaimers with the em dash normalised to a semicolon to satisfy the no-em-dash rule. Gates per batch and at the end: em-dash grep 0 on new files, npm run check exit 0, skill audit 0 high (22 known medium). The PR touched only examples/, so the path-filtered checks did not run on it; Deploy Skill Playground also did not trigger (its paths exclude examples/), so the playground remains one commit behind until Task 3's merge.

**Goal:** people judge a skill by its output, but only 45 skills have `examples/<skill>-example.md`. Bring that to the 100 most-used skills.

**Choosing the 100:** usage analytics are empty (`web/skill-stats.json` is a placeholder until `GOATCOUNTER_TOKEN` is set). Use these signals, in this order, and stop at 100 skills **without** an existing example:

1. the 58 `production`-tier skills (`web/skills-index.json`, field `tier`)
2. skills named in the README "Featured bundles" and "Without a skill vs. with one" sections, and in `docs/start/*.md`
3. skills listed in `web/trending.json` on the `trending-data` branch
4. the flagship skills of the biggest bundles (pm-essentials, pm-decoders, pm-jobsearch, pm-money, pm-china-work, pm-china-life)

Record the final list in the pull request body.

**Format:** copy the structure of `examples/kr-work-report-example.md` exactly:

- `# Example: <skill>`
- `## What this skill does` (one or two sentences)
- `## How to trigger it`, with two scenarios. Each has **You say:** (a realistic request with real-looking details) and **Claude produces (excerpt):** (10 to 25 lines that follow the skill's Output Structure and use concrete numbers).
- `## Tips for best results` (three bullets)
- `## Related skills` (two or three, with one line each on when to use them instead)

**Rules for the content:**

- Read each skill's `SKILL.md` before writing its example; the excerpt must follow its output template.
- Keep the skill's own disclaimers in legal, tax, medical and money examples.
- Use invented people and companies only; put placeholders in square brackets.
- British English, no em dashes (use commas, colons or full stops). Chinese, Korean and Japanese skills get examples in their own language.

**Process:**

- Write the examples in batches of about 20.
- After each batch, run the gates (below) and commit.
- Open one pull request for all 100 (or two, if the diff gets large).

**Checks for this task:**

- `npm run check` (`check-drift`, `check-eval-coverage` and the samples build read `examples/`)
- `node scripts/skill-audit.mjs` (`npm run check` does not run it)
- `grep -c "—" examples/*.md` must be 0 for the new files

## Task 3: README restructure

**Goal:** the README is 767 lines, 16 sections and 88 images. Cut it to **about 250 lines**. Move everything removed into docs; delete nothing. Trim `README.zh-CN.md` the same way.

**Target structure for `README.md`:**

1. Banner (already at the top), a one-line pitch, badges and nav links. The H1 must **not** contain a skill count.
2. **Install in 30 seconds:** three lines (Claude Code `/plugin`, `npx pm-claude-skills add` for any tool, and the npmmirror line for mainland China).
3. **One demo:** the before-and-after animation (`docs/readme-assets/before-after*.svg`).
4. **Pick your path:** the six cards as the single starting point. Move the funnel, the Mermaid chart, the quiz and the quest log into `docs/start/README.md` and link to it.
5. **Featured bundles:** about eight, each with a "try saying" line.
6. **中文用户:** five lines and a link to `README.zh-CN.md`. Move the long Chinese section's content to the Chinese README, which already has most of it.
7. **What's new:** the latest two releases only. Older rows live in `CHANGELOG.md`.
8. **Trust and quality (new):** an honest summary. Recompute every number before writing it.
   - what CI checks on every change (SkillCheck, security audit, duplicate check, drift check, translation parity, injection suite)
   - how many skills have eval cases (389 of 1,285 on 2026-10-06)
   - how many have measured scores (28)
   - the human-review status (0 of 155 high-stakes skills reviewed, and how to help)
9. **Contributing:** the contributor wall, the levels card, the all-contributors table and the star chart.

**Where the removed sections go:**

| Section | New home |
|---|---|
| "See it" gallery | `docs/SHOWCASE.md` (it exists; add a gallery section) |
| "The skills" catalogue list | `SKILLS.md` already has it; just link |
| "Framework: Severity Scale" | `docs/severity-scale.md` |
| Live skill-of-the-day and stats cards | keep one small row near the top at most |

**Constraints:**

- **Keep these passing:**
  - `node scripts/check-readme-live.mjs` (every live image the README links must be produced by `scripts/build-readme-live.mjs`)
  - `node scripts/check-drift.mjs`
  - `node scripts/build-banner.mjs --check`
  - `node scripts/build-contributors.mjs --check` (the `ALL-CONTRIBUTORS-LIST` markers must stay in `README.md`)
  - `node scripts/build-readme-onboarding.mjs --check`
- **Gitee and GitCode:** `.github/workflows/mirror-gitee.yml` and `mirror-gitcode.yml` make README.zh-CN.md the front page there and rewrite links in README.md, README.zh-TW.md and README.ko.md. Keep relative links working.
- **Visual check:** after pushing, screenshot the rendered README on GitHub (dark and light) with Playwright and look at it before merging.

## How this repo works (read before any change)

- **main is protected:** pull requests only. Work on a branch, open a PR with `gh pr create -F <file>`, wait for checks, then squash-merge with `gh pr merge --squash --delete-branch`.
- **Commit messages:**
  - no backticks (the shell runs them)
  - write the message to a file and run `git commit -F <file>`
  - end every commit with a blank line, then `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`
  - end every PR body with `🤖 Generated with [Claude Code](https://claude.com/claude-code)`
- **Style:** British English. No em dashes in new content. The library URL is exactly https://github.com/mohitagw15856/pm-claude-skills.
- **After editing any `skills/**/SKILL.md`, rerun the generators, in this order:**
  1. `node web/build-skills.mjs`
  2. `scripts/build-skills-md.mjs`
  3. `build-disambiguation.mjs`
  4. `build-exports.mjs`
  5. `build-conformance-badge.mjs`
  6. `integrations/jev/build-index.mjs`
  7. `build-docs.mjs`
  8. `build-samples.mjs`
  9. `build-workflows.mjs`
  10. `build-tech-tree.mjs`
  11. `build-dify-templates.mjs`
  12. `build-listing-prompt.mjs`
  13. `build-zh-pinyin.mjs` (needs `pinyin-pro`: run `npm i --prefix /tmp/py pinyin-pro`, then set `PINYIN_MODULE_DIR=/tmp/py/node_modules`)

  Then `cp data/risk-tiers.json web/risk-tiers.json`. Copy any changed skill into its bundle copies under `plugins/*/skills/<name>/`.
- **Gates:**
  - Run `npm run check`. Its last step fails on uncommitted regenerated files: commit them and run it again.
  - Also run `node scripts/skill-audit.mjs`. It is **not** part of `npm run check`, and it fails on quoted injection phrases such as "ignore previous instructions" anywhere in `skills/**`.
- **Translations:** every `## ` heading added to an English skill must also be added to its translations in `skills-i18n/<lang>/` (`tests/i18n-parity.mjs` checks this). Chinese text in skills-i18n uses “” or 「」, not straight quotes (`scripts/check-zh-typography.mjs`).
- **Large diffs:** a pull request over a few thousand files skips the path-filtered CI. Confirm those workflows on main after merging (see Task 1).
- **Maintainer preferences:**
  - Work one task at a time.
  - Do not use subagents unless asked.
  - Keep replies short.
  - Do not release a new version unless asked.
