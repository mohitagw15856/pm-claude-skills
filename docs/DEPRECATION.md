# 🪦 Deprecation — how a skill leaves the library

The library has only ever grown. That is fine while it is small and becomes a
problem at four figures: duplicates accumulate, the catalogue gets harder to
search, and nobody dares delete anything because a skill name is a public API —
it is installed, exported to twelve platforms, pinned in `plugins/`, resolved by
the MCP server, and referenced from other skills.

So skills are **retired, not deleted.** This is the contract.

## The rule

> A published skill name never breaks. It can stop being recommended, stop
> appearing in the catalogue, and start pointing somewhere better — but
> `add`, `run`, and the MCP server must keep resolving it.

Deleting a folder is reserved for skills that were never in a release.

## The frontmatter

```yaml
---
name: debt-payoff-plan
description: "…"
deprecated: 2026-08-21
supersededBy: debt-payoff
---
```

| Field | Meaning |
|---|---|
| `deprecated:` | The ISO date the decision was made. Its presence is what marks the skill; the date is what ages it. |
| `supersededBy:` | The skill that does this job now. Required when one exists — a deprecation with nowhere to go is a deletion in disguise, and those need a discussion first. |

Both are optional frontmatter, so a deprecated skill still passes SkillCheck
unchanged. Nothing about the body has to change.

## What happens to a deprecated skill

| Surface | Behaviour |
|---|---|
| `npx pm-claude-skills add` / `run` | Still resolves. Prints a one-line notice naming the successor. |
| Catalogue & playground | Hidden from browse and search; the direct URL still works and shows the notice. |
| `exports/`, `tools-pkg/` | Still generated, so no downstream install breaks mid-version. |
| `plugins/` | Removed from the bundle at the next bundle build — bundles are curations, not addresses. |
| Duplicate detector | Excluded from `skill-dupes` pairing; a retired twin is not a duplicate. |

## The lifecycle

1. **Decide.** A duplicate found by `node scripts/skill-dupes.mjs`, a skill the
   library outgrew, or a job that turned out not to be recurring.
2. **Pick the survivor.** Keep the one with the better body, not the better
   name. Names are cheap to alias; judgment is expensive to rewrite.
3. **Port anything worth keeping** from the retiring skill into the survivor —
   an anti-pattern, a trigger phrase, a sharper input list. This is the step
   that makes a merge an improvement rather than a subtraction.
4. **Mark it** with `deprecated:` + `supersededBy:` and open the PR. The
   retiring skill's body stays as-is; the frontmatter is the whole change.
5. **Leave it.** Minimum four minor releases. There is no scheduled sweep — a
   tombstone costs a few KB and removing it costs somebody a broken install.

## When *not* to deprecate

Overlap is not duplication. These all look similar to a token comparison and are
all worth keeping separate:

- **Different audience for the same event** — `parent-conference-prep` (the
  teacher's side) and `parent-teacher-conference-prep` (the parent's side).
- **Domain specialisation** — `hiring-rubric` and `engineering-hiring-rubric`.
- **Connector-backed twins** — `<skill>` and `<skill>-live`, where the second
  reads real data instead of asking the user to paste it.
- **Adjacent stages of one process** — `insurance-claim` (file it) and
  `insurance-claim-appeal` (fight the denial).

If the two skills would give genuinely different advice to genuinely different
people, keep both and record the reason in
[`skill-dupes-allow.json`](../skill-dupes-allow.json) so the detector stops
asking.

## Reversing one

Delete the two frontmatter lines. That is the entire rollback, which is the
point of doing it this way.
