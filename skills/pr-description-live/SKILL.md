---
name: pr-description-live
description: "Write a PR description grounded in the REAL diff — read the branch's actual changes via the GitHub connector, not a template the user fills in. Use when asked to write my PR description, describe this pull request, draft the PR body from my branch, or document these changes in Cowork. Reads the commits and diff via the GitHub connector, derives what changed and why from the code itself, and produces a PR-description artifact (summary, changes, testing, risk) ready to paste — matching the repo's PR template if one exists."
---

# PR Description (Live)

A good PR description is written *from the diff*, not from memory — memory forgets the file you touched at 2am. In Claude Cowork this skill reads the *actual* changes on the branch and writes the description grounded in them, so the reviewer gets an accurate map of what moved and why.

## What This Skill Produces

- **The PR description** — summary, the changes grouped by area, how it was tested, and the risk/rollout — all derived from the real diff
- **Template-matched output** — if the repo has a PR template, the body fills its sections; otherwise a clean default
- **The reviewer's map** — the one or two files/decisions that deserve the closest look

## Required Inputs

Ask for these if not provided:
- **The branch/PR** — the branch name or PR number, and the base it targets
- **The why** — the issue/ticket or one line of intent (the diff shows *what*, not always *why*)
- **Audience** — internal team vs open-source contributors — tone and detail follow

## Framework: A Description a Reviewer Trusts

1. **Summary** — what this PR does and why, in two or three lines.
2. **Changes, grouped** — by area/feature, not a raw file list; each with its purpose.
3. **Testing** — what was run/added and what a reviewer should verify.
4. **Risk & rollout** — what could break, migrations, flags, and how to back out.
5. **Reviewer's attention** — the load-bearing change to look at first.

## Execution (Cowork)

1. **Read the diff** — via the GitHub connector, fetch the branch's commits and the full diff against base. Read the actual changes, not just commit messages.
2. **Derive the story** — from the diff, work out what changed by area and infer intent; combine with the user's stated *why*. Flag anything the diff does that the stated intent doesn't explain.
3. **Match the template** — check for `.github/pull_request_template.md`; if present, fill its sections; else use the default structure above.
4. **Write the description** — grounded in the diff, no invented changes; call out migrations, new deps, and breaking changes found in the code.
5. **Emit the artifact** — the ready-to-paste body; offer to set it on the PR via the connector, but only on request.

Guardrails: describe only what the diff actually contains — never list a change that isn't there; surface diff-vs-intent mismatches instead of hiding them; don't push/update the PR without explicit approval; if the connector is unauthorised, work from a pasted diff and say the branch couldn't be read.

## Output Format

A **PR Description** (or the repo template, filled):

### Summary
what & why — 2–3 lines

### Changes
- **[area]** — what changed and why

### Testing
- what was run/added · what the reviewer should verify

### Risk & rollout
- breaking changes / migrations / flags / back-out

### Look here first
- [file/decision] — why it's load-bearing

## Quality Checks
- [ ] Every listed change appears in the actual diff
- [ ] Changes the diff makes that intent didn't explain are flagged
- [ ] Migrations / new deps / breaking changes from the code are called out
- [ ] The repo's PR template is used when present
- [ ] Nothing was pushed to the PR without approval

## Anti-Patterns
- **Describing intended changes** that aren't in the diff.
- **A raw file list** instead of grouped, purposeful changes.
- **Ignoring the repo's PR template.**
- **Silently updating the PR** without being asked.

## Example Trigger Phrases
- "Write the PR description from my branch in Cowork."
- "Describe this pull request from the actual diff."
- "Draft the PR body against main and match our template."
- "Document these changes for reviewers — read the diff first."
