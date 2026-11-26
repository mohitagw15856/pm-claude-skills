# Long-term support (LTS) skills

Most skills in this library keep improving: a better framework, a sharper quality check, a new section. That is good for someone trying a skill today and bad for a team that built a process, a training course or an agent on it last spring and now finds the output has changed shape.

An **LTS skill** is a promise that the skill will not change under you for a year.

## What LTS means

| | LTS skill | Every other skill |
|---|---|---|
| **SKILL.md** | Frozen. Its SHA-256 is recorded in [`data/lts.json`](../data/lts.json). | Changes whenever it gets better. |
| **Support** | About 12 months from the start of the line (`since` to `until`). | Until it is deprecated. |
| **Changes allowed** | Fixes only: a factual error, a broken example, a security or safety problem, a typo that changes meaning. Each fix is recorded as a revision with a note. | Anything that passes review. |
| **Not allowed** | New sections, renamed headings, a different output format, new required inputs, rewording for style. | |
| **Name** | Never deprecated during the line. | May be deprecated (see [DEPRECATION.md](DEPRECATION.md)). |

The hash covers `SKILL.md` only. Helper scripts in a skill folder follow the normal rules, but a change that alters what the skill produces counts as a change to the skill and is not allowed during the line.

## The current line

Line **2026.10** runs from **2026-10-23** to **2027-10-23**. It holds 20 production-tier skills that cover the core of product work: PRDs, user stories, prioritisation, sprint planning, OKRs, metrics, experiments, assumptions, competition and win-loss, go-to-market, pricing, churn and cohorts, account health, runway, incidents, roadmaps and stakeholder communication. The full list, with pins, is in [`data/lts.json`](../data/lts.json).

A skill joins a line only if it is in the production tier (see [TIERS.md](../TIERS.md) and `skill-tiers.json`), has an eval case in `evals/cases.json` (the check enforces both), and has been stable for at least one release.

## How a fix is made

1. Change the skill's `SKILL.md` and its bundle copy under `plugins/*/skills/<name>/` as usual.
2. Record the fix in the same pull request:

   ```bash
   node scripts/lts-pin.mjs --revise <skill> --note "What was wrong and what changed"
   ```

   This adds a revision (date, new SHA-256, note) and moves the skill's pin to the new hash. The original pin stays in `pinned`, so the full history is visible.
3. `tests/checks/lts.mjs` runs inside `npm run check`. It fails if an LTS skill's `SKILL.md` no longer matches its pin, or if a pin moved without a revision note.

A reviewer should refuse a revision whose note describes an improvement rather than a fix. Improvements wait for the next line.

## Deprecation and LTS

Deprecation uses the existing `deprecated:` and `supersededBy:` frontmatter described in [DEPRECATION.md](DEPRECATION.md). For LTS skills:

- An LTS skill is **not deprecated during its line**. If a better skill appears, it is linked with `supersededBy` only after the line ends.
- When a line ends, each skill either carries over into the next line with a fresh pin, or leaves LTS. A skill that leaves can then follow the normal deprecation path, and its name keeps resolving as DEPRECATION.md promises.
- `tests/checks/lts.mjs` refuses a deprecated skill in the current line, so the two cannot drift apart.

## Pinning a skill

**With the CLI.** `--lts` installs only skills from the LTS line, and refuses to install anything if a bundled `SKILL.md` does not match its pin:

```bash
npx pm-claude-skills add --agent claude --skills prd-template,user-story-writer --lts
```

Add an exact package version for a fully reproducible install, so a later release cannot change what you get (`--lts` ships in the first release after 83.2.0):

```bash
npx pm-claude-skills@<version> add --agent claude --skills prd-template --lts
```

**By hand.** Compare the file you installed with its pin:

```bash
shasum -a 256 ~/.claude/skills/prd-template/SKILL.md
# compare with "sha256" for prd-template in data/lts.json
```

**In an agent or a pipeline.** Fetch `SKILL.md` from a tagged release rather than `main`, check its SHA-256 against `data/lts.json` from the same tag, and refuse it on a mismatch.

## For maintainers

```bash
node scripts/lts-pin.mjs --status          # does every LTS skill still match its pin?
node scripts/lts-pin.mjs --add <skill>     # add a skill to the current line
node scripts/lts-pin.mjs --revise <skill> --note "..."
```

Starting a new line: copy the file's skills that carry over, reset `pinned` and `sha256` to today's hashes, clear `revisions`, set a new `line`, `since` and `until` (about 12 months apart; the check enforces 11 to 13), and announce it in the release notes.
