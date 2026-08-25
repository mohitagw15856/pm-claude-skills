# Certified agent runs

The [conformance README](../README.md) tells adopters to PR their run here. Until
now this directory did not exist, so the documented path led nowhere — the
program was designed and never opened.

## What to submit

One directory named for your agent, containing exactly:

```
conformance/certified/<agent-name>/
  run.json          {"agent": "...", "version": "...", "model": "...", "date": "YYYY-MM-DD", "runner": "..."}
  <task-id>.md      one file per task in ../tasks.json — the raw, unedited response
```

Nothing else. No summaries, no commentary, no edited output — the point of the
submission is that it can be re-verified, and an edited transcript cannot be.

## What happens then

The **Conformance check** workflow re-runs `conformance/verify.mjs` against your
files on the pull request. It is the same verifier you ran locally, so there are
no surprises: 5/5 merges, anything less fails with the reasons per task.

Once merged you are listed in the conformance README and may use the badge:

```markdown
![SkillSpec Conformant](https://img.shields.io/badge/SkillSpec-Conformant_Agent-8a2be2)
```

## Before you submit

```bash
node conformance/verify.mjs conformance/certified/<agent-name>/
```

A submission that does not pass locally will not pass in CI, and the failure
output names which of the five tasks fell over and why.

## Honest scope

The v1 checks are lexical and structural. They catch the failure modes that
actually matter — forcing a skill where none applies, ignoring the required
structure, skipping self-verification, fabricating rather than refusing — but a
pass means *conformant*, not *excellent*. The suite versions with the spec.
