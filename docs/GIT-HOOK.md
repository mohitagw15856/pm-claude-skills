# The pre-commit hook

A pull request that fails SkillCheck or the skill audit costs a round trip and an Actions run. The hook runs the same checks on the files you are about to commit, and only those, so the first push is green and CI minutes are spent on merges rather than typos.

```bash
npx pm-claude-skills githook install     # writes .git/hooks/pre-commit (or into core.hooksPath)
npx pm-claude-skills githook remove      # takes the block out again; anything else in the hook stays
npx pm-claude-skills githook run         # what the hook runs, by hand
```

Install appends a marked block to an existing `pre-commit` rather than replacing it, and respects `git config core.hooksPath` (Husky, Lefthook and friends).

## What it checks

| Staged file | Check |
|---|---|
| any `SKILL.md` | SkillCheck in strict mode on the changed skills; inside this repository also `scripts/skill-audit.mjs` (prompt-injection and override phrases) |
| `schemas/**` | `scripts/check-skill-schemas.mjs` and `scripts/check-pipelines.mjs` |
| `pipelines/**` | `scripts/check-pipelines.mjs` |
| `evals/adversarial/**`, or an agent-native skill | `scripts/check-adversarial.mjs` |

Nothing staged in those groups means the hook does nothing and the commit proceeds. The repository-specific checks run only when the commit is inside a checkout of this library (they look for `scripts/skill-audit.mjs` and `skills/`); in any other repository the hook validates SKILL.md files with SkillCheck alone, which makes it useful for your own skills too.

The whole run takes a few seconds. Skip it once with `git commit --no-verify`.
