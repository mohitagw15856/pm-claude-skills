---
name: changelog-generator
description: "Convert a git log, commit list, or release notes into a polished, user-facing changelog. Use when writing release notes, generating a CHANGELOG.md entry, or documenting what changed in a version. Produces a structured changelog section with version header, categorised changes, and migration notes. Optimised for Opus 4.7 and newer models."
---

# Changelog Generator Skill

Converts raw git commits, a diff summary, or developer release notes into a polished changelog entry — categorised, user-facing, and following Keep a Changelog conventions.

## Required Inputs

Ask for these if not provided:
- **Commits or release notes** (paste `git log --oneline`, raw commit messages, or a description of what changed)
- **Version number** (e.g. 2.4.0, v1.0.0-beta.2)
- **Release date** (or "today")
- **Audience** (developers using an API / end users of a product / internal team — affects language)
- **Any breaking changes** (flag these explicitly if known)

## Output Structure

Follow [Keep a Changelog](https://keepachangelog.com) format:

---

## [X.Y.Z] — YYYY-MM-DD

### Breaking Changes ⚠️
[Only include if there are breaking changes]
- **[Breaking change]:** [What changed and what it breaks]
- **Migration required:** [Specific action the user must take]

### Added
- [New feature or capability, written from the user's perspective]
- [Another addition]

### Changed
- [Changed behaviour — what it did before vs. what it does now]
- [Performance improvement with measurable impact if known]

### Fixed
- [Bug fixed — describe what was broken, not the fix implementation]
- [Another fix]

### Deprecated
- [Deprecated thing] — use [replacement] instead. Will be removed in [version].

### Removed
- [Removed thing] — was deprecated in [version]

### Security
- [Security fix — describe the vulnerability class, not exploit details]

---

## Formatting Rules Applied

**Language:** Write for the reader, not the committer. "Add dark mode support" not "implement ThemeProvider with dark palette variant".

**Breaking changes:** Always call these out first with ⚠️. Include a migration path.

**Bug fixes:** Describe what was broken, not what was changed. "Fix crash when user has no profile picture" not "null-check avatar URL before rendering".

**Granularity:** Group related commits into one line. Don't list every micro-commit separately.

**Tone:** Active voice, imperative mood. "Add", "Fix", "Remove" — not "Added", "Fixed", "Removed".

**Empty sections:** Omit any section with no entries. Don't include empty `### Fixed` blocks.

## Quality Checks
- [ ] Breaking changes are at the top with migration instructions
- [ ] All entries are user-facing language (no internal variable names or implementation details)
- [ ] Related commits are grouped into single entries (not listed individually)
- [ ] Version and date header is correct
- [ ] Empty sections are omitted
- [ ] Tone is imperative mood throughout

## Example Trigger Phrases
- "Write a changelog for version [X]" + [paste commits]
- "Generate release notes from these commits"
- "Turn this git log into a CHANGELOG entry"
- "Write the CHANGELOG.md update for this release"
- "What changed in this release?" + [paste commit list]
