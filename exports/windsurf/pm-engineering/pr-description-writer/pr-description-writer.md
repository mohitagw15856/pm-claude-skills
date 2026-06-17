---
trigger: model_decision
description: "Write a clear, structured pull request description from a git diff, branch summary, or commit list. Use when asked to write a PR description, draft a pull request, or document code changes. Produces a description with summary, motivation, changes made, testing steps, and reviewer guidance."
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
- **Target branch** (e.g. main / develop / release/2.4 — affects risk framing and reviewer guidance)
- **Linked issue or ticket** (e.g. JIRA-1234, GitHub #567 — or "none")

## Output Format

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
[If no visual change and no API contract change: omit this section entirely — do not leave it as a placeholder]

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
- [ ] Title starts with a valid type prefix (feat / fix / refactor / chore / deps / config / hotfix) and is under 72 characters
- [ ] Testing steps are reproducible by someone unfamiliar with the code
- [ ] For high-risk PRs, Reviewer Notes flags at least one specific area of concern or deliberate trade-off; for low-risk PRs, Reviewer Notes is either omitted or kept to one line

## Anti-Patterns

- [ ] Do not write a description that only restates what changed — explain why the change was made
- [ ] Do not skip the testing steps — reviewers need to know how to verify the change works
- [ ] Do not omit the reviewer notes for high-risk PRs — flag deliberate trade-offs and areas needing careful review
- [ ] Do not describe implementation details that are obvious from the diff — add context that the diff cannot convey
- [ ] Do not produce a single paragraph — structure with headers so reviewers can navigate to what they need

## Usage Examples
- "Write a PR description for these changes" + [paste diff or description]
- "Draft a pull request for [feature]"
- "I need a PR description — here's what I changed"
- "Summarise these commits into a PR description"
- "Write the PR body for this branch"
