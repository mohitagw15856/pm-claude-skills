# Week 8: Write your own skill (capstone)

## Learning outcomes

- Turn a repeatable piece of professional work into a skill: a trigger, required inputs, a framework, an output format and quality checks.
- Validate it with SkillCheck and test it on realistic inputs.
- Explain where it fails.

## Skills and tools used

- `writing-great-skills`: how to write a skill that triggers reliably and produces consistent output.
- SkillCheck: `npx pm-claude-skills skillcheck --dir ./my-skill --strict`
- Optional, fully offline: `node scripts/local-eval.mjs --model llama3.1:8b --skills <name>` with Ollama, from a clone of the repository.

## In-class exercise (60 minutes)

1. **Pick the job (10 min).** Each student picks a task from weeks 1 to 7 they would do again at work, such as the F/A/I check from week 3 or the quote check from week 2.
2. **Draft (30 min).** Use `writing-great-skills` to draft a SKILL.md: a description that starts with when to use it, required inputs, the framework, an exact output format, binary quality checks, and three trigger phrases.
3. **Validate (20 min).** Run SkillCheck. Fix every error. Swap skills with a partner and run each other's on the Larder case.

## Capstone (25%)

Submit:

1. The skill folder (`my-skill/SKILL.md`, and any reference files).
2. The SkillCheck output, passing with `--strict`.
3. Three test runs on different inputs, including one the skill should handle badly, with outputs.
4. A reflection of 400 to 600 words: what the skill does, where it fails, what you changed after the tests, and how you would know if it got worse.

**Criteria (0 to 4 each, alongside the shared Brief and Reflection criteria):**

| Criterion | What a 4 looks like |
|---|---|
| Trigger and scope | The description says when to use it and when not to; a reader can tell it apart from the nearest existing skill. |
| Output contract | The output format is exact enough that two runs on the same input have the same sections in the same order. |
| Quality checks | Each check is binary and would catch a real failure seen in the test runs. |
| Honest testing | The failing test is real, and the reflection explains the failure rather than hiding it. |

Strong capstones can be contributed to the library: see [CONTRIBUTING.md](../../CONTRIBUTING.md). Contribution is optional and never affects the grade.

## Instructor note

The best capstones encode a check, not a document: "find invented quotes in a synthesis" is a better skill than "write a synthesis", because the library already has the second one. Steer students towards the judgement habits the module taught. Before contributions, ask students to search the library with `npx pm-claude-skills find "<what it does>"` so they do not duplicate an existing skill.
