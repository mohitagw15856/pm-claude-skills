---
trigger: model_decision
description: "Convert a git log, commit list, or release notes into a polished, user-facing changelog. Use when writing release notes, generating a CHANGELOG.md entry, or documenting what changed in a version. Produces a structured changelog section with version header, categorised changes, and migration notes."
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
- **Previous version behaviour** (optional — paste the previous changelog entry or describe what is changing; needed for accurate "Changed" entries)
- **Scope** (whole product / specific package or module — e.g. "payments SDK only", "iOS app", "all services")

## Output Format

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

---

> **Skill guidance — do not include the following section in the delivered changelog:**

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
- [ ] No entries start with past-tense verbs (no "Added", "Fixed", "Removed" — use "Add", "Fix", "Remove")
- [ ] Every breaking change entry includes a specific migration action (not just "update your code")

## Anti-Patterns

- [ ] Do not include implementation details in changelog entries — users need to know what changed for them, not how the code was refactored internally
- [ ] Do not list every micro-commit as a separate entry — related commits should be grouped into one user-facing change
- [ ] Do not omit the migration path for breaking changes — a breaking change entry without a specific migration action forces users to read the source code
- [ ] Do not include empty sections — a "### Fixed" section with no entries signals the template was filled in carelessly
- [ ] Do not write breaking changes in the same casual tone as minor additions — breaking changes must be visually prominent and call out migration requirements explicitly

## Usage Examples
- "Write a changelog for version [X]" + [paste commits]
- "Generate release notes from these commits"
- "Turn this git log into a CHANGELOG entry"
- "Write the CHANGELOG.md update for this release"
- "What changed in this release?" + [paste commit list]
