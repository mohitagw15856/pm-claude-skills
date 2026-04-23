---
name: pr-description-writer
description: "Write a clear, structured pull request description from a git diff, branch summary, or commit list. Use when asked to write a PR description, draft a pull request, or document code changes. Produces a description with summary, motivation, changes made, testing steps, and reviewer guidance. Optimised for Opus 4.7 and newer models."
---

# PR Description Writer Skill

Writes structured, reviewer-friendly pull request descriptions from a diff, commit list, or informal notes. Covers the what, why, and how-to-review so reviewers can start immediately.

## Required Inputs

Ask for these if not provided:
- **What changed** (paste a git diff, `git log --oneline`, or describe the changes in plain English)
- **Why it was changed** (the problem being solved or feature being added)
- **How to test it** (any specific steps a reviewer needs to verify it works)
- **Risk level** (low / medium / high — affects how much reviewer guidance to include)
- **PR type** (feature / bug fix / refactor / dependency upgrade / config change / hotfix)

## Output Structure

### Title
A clear, imperative-mood title under 72 characters:
`[type]: [concise description of what changed]`

Examples:
- `feat: add rate limiting to the public API`
- `fix: resolve race condition in session expiry`
- `refactor: extract payment logic into PaymentService`

### Summary
2–3 sentences covering:
- What this PR does (the change)
- Why it was needed (the problem or goal)
- The approach taken (at a high level)

### Changes Made
Bullet list of specific changes — one bullet per logical change, not per file:
- Added [X] to handle [Y]
- Refactored [A] to reduce [B]
- Removed [C] as it was replaced by [D]
- Updated [E] to fix [F]

### Screenshots / Demo
[If UI change: include before/after screenshots or a screen recording]
[If API change: include example request/response]
[If no visual change: this section can be omitted]

### How to Test
Step-by-step instructions a reviewer can follow:
1. [Setup step if needed]
2. [Action to take]
3. [What to verify]
4. [Edge case to check]

Include any specific commands, test data, or environment flags needed.

### Testing Checklist
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Edge cases covered
- [ ] Manual testing completed
- [ ] No regressions in existing tests

### Reviewer Notes
Flag anything that warrants extra attention:
- Areas of uncertainty where a second opinion is welcome
- Deliberate trade-offs made (and why)
- Out-of-scope items noticed but not addressed
- Dependencies on other PRs (link them)

### Related
- Closes #[issue number] (if applicable)
- Related to #[PR/issue number]

## Quality Checks
- [ ] Title is imperative mood and under 72 characters
- [ ] Summary explains what AND why (not just what)
- [ ] Changes list describes logical changes (not file-by-file changes)
- [ ] Testing steps are reproducible by someone unfamiliar with the code
- [ ] Risk-appropriate reviewer guidance is included

## Example Trigger Phrases
- "Write a PR description for these changes" + [paste diff or description]
- "Draft a pull request for [feature]"
- "I need a PR description — here's what I changed"
- "Summarise these commits into a PR description"
- "Write the PR body for this branch"
