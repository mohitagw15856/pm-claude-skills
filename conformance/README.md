# 🎖 SkillSpec Agent Conformance — certify that your agent uses skills *correctly*

SkillBench tests models. This suite tests **agents and frameworks**: does your agent discover the right skill, decline to force one where none applies, follow the skill's structure, verify against its quality checks, and honour its anti-patterns (including refusing fabrication)?

## Run it (10 minutes, your stack, your model)
1. Install the library into your agent (`npx pm-claude-skills add …` or MCP).
2. Give your agent each prompt from [`tasks.json`](tasks.json); save each raw response to `results/<task-id>.md`.
3. `node conformance/verify.mjs results/` — 5/5 = conformant.

The five tasks test: **discovery** · **restraint** (the negative case most agents fail) · **structure adherence** · **quality-check self-verification** · **anti-pattern adherence** (the honesty-gate refusal).

## Get certified (listed + badge)
PR your run to [`conformance/certified/<agent-name>/`](certified/README.md) containing: the 5 result files, `run.json` (`{agent, version, model, date, runner}`), and nothing else. The **Conformance check** workflow re-runs `verify.mjs` against your files on the PR — the same verifier you ran locally, so no surprises. Merged = listed below with the **SkillSpec Conformant Agent** badge for your README:

```markdown
![SkillSpec Conformant](https://img.shields.io/badge/SkillSpec-Conformant_Agent-8a2be2)
```

## Certified agents
| Agent | Version | Model used | Date |
|---|---|---|---|
| *(be first)* | | | |

Honest scope: v1 checks are lexical/structural — they catch the failure modes that matter (forcing skills, ignoring structure, fabricating) but a passing grade is "conformant," not "excellent." The suite versions like the spec.
