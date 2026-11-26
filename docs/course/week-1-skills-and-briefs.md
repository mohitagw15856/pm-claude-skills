# Week 1: Skills, prompts and the brief

## Learning outcomes

- Explain the difference between a prompt, a skill, an MCP server and a subagent, and when each fits.
- Find a fitting skill for a described task.
- Write a brief that gives a skill the facts, audience and constraints it needs.

## Skills and pages used

- `ambiguity-resolver`: turns a vague ask into a one-page problem statement.
- [Skills vs MCP vs subagents vs prompts](https://mohitagw15856.github.io/pm-claude-skills/learn.html) and [Agent Skills vs prompts vs custom GPTs](https://mohitagw15856.github.io/pm-claude-skills/compare.html) for the input session.
- [Find a skill](https://mohitagw15856.github.io/pm-claude-skills/find.html) and the [Skill router](https://mohitagw15856.github.io/pm-claude-skills/router.html).

## In-class exercise (60 minutes)

1. **Plain prompt (15 min).** In pairs, ask the model: "Our retention is dropping, what should we do?" with the Larder facts from the [syllabus](syllabus.md#case-company). Save the answer.
2. **Skill (20 min).** Run `ambiguity-resolver` on the same facts. Compare the two outputs side by side: which one asks better questions, which one commits to a scope, which one invents numbers?
3. **Brief surgery (25 min).** Each pair rewrites their brief to add one missing fact, the audience (the founders) and one constraint (a two-week deadline). Run it again. Three pairs show what changed and why.

## Graded assignment A1: problem brief (5%)

Use `ambiguity-resolver` to produce a one-page problem brief for Larder's retention fall, addressed to the founders. Submit the four parts listed in the [syllabus](syllabus.md#assessment).

**Week-specific criteria (0 to 4 each):**

| Criterion | What a 4 looks like |
|---|---|
| Reframing | The brief separates the founders' proposed solution (the smart shopping list) from the problem, and states the problem without assuming the answer. |
| Scope | Clear in-scope and out-of-scope lines, and a research plan that fits the two-week constraint. |

## Instructor note

Students often think the first lesson is "skills are better than prompts". The better lesson is that the brief matters more than either: a skill with a thin brief still produces a confident, generic page. Show a deliberately thin brief run through the skill so they see it. Keep the comparison outputs from this session; week 7 returns to them when discussing flattering agreement.
