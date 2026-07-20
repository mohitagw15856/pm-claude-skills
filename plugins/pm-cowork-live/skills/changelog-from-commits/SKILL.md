---
name: changelog-from-commits
description: "Write a human changelog from the REAL commit history — read the actual commit range via the GitHub connector, not a template. Use when asked to write the changelog for this release, what changed since the last tag, draft release notes from my commits, or summarise this range for users in Cowork. Reads commits/PRs between two refs via the GitHub connector, groups them into user-facing changes (features / fixes / breaking), translates commit-speak into human benefit, and produces a changelog artifact ready for the release."
---

# Changelog from Commits (Live)

Users don't read commit messages, and they shouldn't have to. In Claude Cowork this skill reads the *real* commit range and turns it into a changelog written for the people who use the software — grouped, deduped, and translated from "refactor: extract helper" into what actually changed for them.

## What This Skill Produces

- **The changelog** — grouped into Added / Changed / Fixed / Breaking, each entry written as user-facing benefit, not commit-speak
- **The breaking-change callout** — migrations and removals pulled to the top with what to do
- **A changelog artifact** — Keep-a-Changelog style, ready to paste into `CHANGELOG.md` or a release

## Required Inputs

Ask for these if not provided:
- **The range** — from tag/ref to tag/ref (default: last tag → HEAD), and the repo
- **The audience** — end users, API consumers, or developers — translation depth follows
- **Version & date** — the release number and date for the heading

## Framework: Commits → Changelog

1. **Group by impact** — Added / Changed / Fixed / Breaking; drop internal-only churn (chore/ci/refactor) unless it changes behaviour.
2. **Translate** — every entry says what the *user* can now do or no longer suffers, not the implementation.
3. **Dedupe & merge** — many commits behind one feature become one line.
4. **Breaking first** — removals, renames, and migrations lead, with the upgrade step.
5. **Credit & links** — PR numbers/authors where it helps.

## Execution (Cowork)

1. **Read the range** — via the GitHub connector, list commits (and merged PRs) between the two refs, with messages, PR titles, and labels.
2. **Classify** — map each to Added/Changed/Fixed/Breaking; set aside pure-internal churn; detect breaking changes from `!`/`BREAKING CHANGE`/removed-public-API signals.
3. **Translate & merge** — collapse the commits behind each user-facing change into one benefit-led line; keep PR references.
4. **Order** — breaking first, then Added, Changed, Fixed.
5. **Emit the artifact** — the changelog block; offer to prepend it to `CHANGELOG.md` or attach to a release, only on request.

Guardrails: include only changes actually present in the range — never invent a feature; base "breaking" on real signals, not guesses; don't overstate impact; if the connector is unauthorised, work from a pasted `git log` and say the range couldn't be read live.

## Output Format

A **Changelog** block:

```
## [version] — date

### ⚠ Breaking
- what changed → what to do (#PR)

### Added
- user-facing capability (#PR)

### Changed
- what's different now (#PR)

### Fixed
- the problem that's gone (#PR)
```

## Quality Checks
- [ ] Every entry maps to a real commit/PR in the range
- [ ] Entries read as user benefit, not commit messages
- [ ] Breaking changes lead and include the migration step
- [ ] Internal-only churn was excluded (unless it changed behaviour)
- [ ] Multiple commits behind one feature are a single line

## Anti-Patterns
- **Pasting raw commit messages** as the changelog.
- **Inventing a feature** not in the range to round it out.
- **Burying a breaking change** in the middle of "Changed".
- **Listing every `chore:`/`refactor:`** that users never see.

## Example Trigger Phrases
- "Write the changelog since the last tag in Cowork."
- "Draft release notes from my commits for v2.0."
- "What changed for users between v1.4 and HEAD?"
- "Summarise this commit range as a human changelog."
