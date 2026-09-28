# Skill releases

Most people want the latest version of a skill, and `npx pm-claude-skills add` gives them that. Some teams need the opposite: the exact text they reviewed and approved, unchanged until they decide to move. A skill release is that frozen copy.

## What a release is

```
skill-releases/
  prd-template/
    releases.json        the list, oldest first
    1.0.0/               the frozen copy
      SKILL.md
      references/
      templates/
```

Each entry in `releases.json` records the version, the date, a note on what changed, the number of files and a hash of the frozen copy. A frozen copy is never edited. If it changes, CI fails.

## Released skills

Run `node scripts/skill-release.mjs list` for the current table. The first five are the flagship skills in pm-essentials: `prd-template`, `meeting-notes`, `stakeholder-update`, `user-research-synthesis` and `competitive-analysis`.

## Pinning a release

Copy the frozen folder into your assistant's skills folder. For Claude Code, from a clone of the library:

```bash
cp -R skill-releases/prd-template/1.0.0 ~/.claude/skills/prd-template
```

Without a clone, the frozen `SKILL.md` has a stable address:

```
https://raw.githubusercontent.com/mohitagw15856/pm-claude-skills/main/skill-releases/prd-template/1.0.0/SKILL.md
```

To confirm what you have, compare the `version:` line in the frontmatter with `releases.json`.

## Cutting a release

```bash
node scripts/skill-release.mjs cut prd-template --version 1.1.0 --notes "Adds the open questions section"
node scripts/build-exports.mjs && node web/build-skills.mjs
```

`cut` does three things: it writes `version:` into the skill's frontmatter in `skills/` and in every bundle copy under `plugins/`, it freezes a copy, and it adds the entry to `releases.json`. It refuses a version that is not newer than the last one, and it never overwrites a release.

Use the version number to tell people what kind of change it is:

| Change | Bump | Example |
|---|---|---|
| Output structure or required inputs changed | Major | 1.4.0 to 2.0.0 |
| A section, check or reference added | Minor | 1.4.0 to 1.5.0 |
| Wording or a typo | Patch | 1.4.0 to 1.4.1 |

## The check

```bash
node scripts/skill-release.mjs --check            # what CI runs
node scripts/skill-release.mjs --check --strict   # unreleased edits fail too
```

| Finding | Result |
|---|---|
| A frozen copy was changed | Error |
| Versions out of order, or a copy missing | Error |
| The live skill was edited since its last release | Warning. Cut a release when the change is ready |

Library: https://github.com/mohitagw15856/pm-claude-skills
