---
name: release-notes-from-git-log
description: "Turn a git log into user-facing release notes grouped by feature and fix. Use when asked for release notes from this git log, a changelog entry from these commits, or to turn commits into release notes. Produces a grouped changelog with one line per change and a short headline."
version: 1.0.0
---

# Release Notes From Git Log

Commits are written for the people who made them; release notes are read by the people who did not. This skill turns the log into notes a user can act on: grouped, short, in plain language, with internal noise removed.

## What This Skill Produces
- A headline line for the release
- Changes grouped under Features, Fixes, and Changes, one line each, user-facing
- A migration note when anything needs action

## Required Inputs
Ask for these if not provided:
- The git log (or the commit list) since the last tag
- The version or tag name
- The audience: end users, developers, or both

## Framework: Group, Translate, Cut
1. Group by kind from the commit prefix or message: feat, fix, chore.
2. Translate each line from what changed to what the reader gains.
3. Cut chores, refactors and merges unless they change behaviour.

## Output Format
### v<version>: <headline>
**Features**
- ...
**Fixes**
- ...
**Changes**
- ...
Migration: <none, or the one step>

## Worked Examples
### Example 1: a small web app release
Input (abridged): 12 commits, three prefixed feat, six fix, three chore.
Output (abridged): a headline, three feature lines, six fix lines, no chores, migration: none.
### Example 2: a library with a breaking change
Input (abridged): a commit renaming a public function.
Output (abridged): the rename under Changes with the old and new name, and a one-line migration step.
### Example 3: a hotfix
Input (abridged): one fix commit.
Output (abridged): a single-line note with the headline "hotfix" and the fix.

## Quality Checks
- [ ] Every line says what the reader gains, not what the code did
- [ ] Chores and merges are gone unless they change behaviour
- [ ] Grouped, one line per change, short
- [ ] A migration note exists whenever something needs action

## Anti-Patterns
- **Pasting commit messages.** They are not notes.
- **Listing every commit.** Cut the noise.
- **Internal tone.** Ticket numbers and branch names do not belong.

## Example Trigger Phrases
- "Release notes from this git log."
- "Write the changelog entry from these commits."
