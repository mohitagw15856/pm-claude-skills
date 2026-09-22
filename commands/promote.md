---
description: The promote loop — scan your transcripts for what you keep asking, pick a pattern, draft the skill, test its triggers, publish the release package.
argument-hint: "[path to Claude Code transcripts or a claude.ai export; optional: the pattern to promote]"
---

Run the **promote loop** for: $ARGUMENTS

This is a *chain* of four skills with one decision in the middle and one confirmation at the end. Carry every stage's output forward as context. Open with a one-line plan, then ask once for anything essential that is missing (where the transcripts are; which bundle a promoted skill should join).

Run each stage under a clear `## Stage N — <name>` heading:

1. **Scan** — apply the `promoter-scan` skill to the transcripts: run `scripts/promoter_scan.py` on the path, then present the ranked report of recurring patterns with redacted examples and a promotability score. **Stop and ask the user which pattern to promote** (offer the top three with the one-line reason each). Do not continue until they choose.
2. **Draft** — apply the `promoter-draft` skill to the chosen pattern: write `skills/<name>/SKILL.md` in the library's format with three worked examples generalised from the user's prompts, the collision check against existing skills, and the bundle stanza. Show the description first, then the file.
3. **Test** — apply the `promoter-test` skill: write `evals.json` with positives, near-miss negatives and goldens, run `scripts/promoter_test.py`, report precision and recall, rewrite the description and re-run if precision is below 0.8. Add the case to `evals/cases.json`.
4. **Publish** — apply the `promoter-publish` skill: produce the full release package (wiring, generators, count, gates, version, CHANGELOG, commands). **Ask "Confirm to push?" once, and only run the git and release commands after a yes.**

Close with the **release note** (three lines) and the one thing the user should watch after the release: the CI run and the playground picking up the new skill.
