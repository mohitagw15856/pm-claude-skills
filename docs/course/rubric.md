# Grading rubric

Every assignment uses these four shared criteria. Each week adds two or three criteria for its artefact (see the week's file). Score each criterion 0 to 4, then scale to the assignment's weight.

## Shared criteria

| Criterion | 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| **Brief quality** | No brief, or a one-line request. | Names the task only. | Task and audience, but key facts missing. | Task, audience, facts and constraints; the skill had what it needed. | As 3, plus the student anticipated what the skill would ask for and answered it up front. |
| **Judgement (the redline)** | Output submitted unedited. | Cosmetic edits only. | Fixes some errors; misses at least one invented fact or unsupported number. | Catches every invented fact and unsupported claim; cuts what does not serve the reader. | As 3, plus changes a conclusion or a decision for a stated reason the AI did not see. |
| **Professional quality** | Not usable at work. | Usable after major rework. | Usable with a manager's edits. | Ready to send to its audience. | A senior practitioner would hold it up as an example. |
| **Reflection** | Missing. | Describes what happened. | Names what the draft got wrong. | Explains why it went wrong (brief, skill or model) and what they would change. | As 3, plus a transferable lesson about working with AI. |

A submission that scores 0 or 1 on Judgement cannot score above 2 overall on Professional quality: polish without scrutiny is not the skill being taught.

## Tools that support marking (all free)

None of these produce the grade. They give students feedback before they submit and give markers a consistent first pass.

| Tool | What it checks | How |
|---|---|---|
| [Grade your work](https://mohitagw15856.github.io/pm-claude-skills/grade.html) | A rubric score, ranked gaps and a redline for PRDs, OKRs, roadmaps, executive updates and more. | In the browser, using the in-browser model, a free Gemini key or local Ollama. Students attach the result to their submission as formative evidence. |
| `scripts/grade-output.mjs` | AI tells, filler, effort words, reading level and templated shape, against [prose-style.md](../prose-style.md). | `node scripts/grade-output.mjs final.md` from a clone. Deterministic and offline. `--max-tells 3` makes it a pass/fail gate. |
| SkillCheck | A SKILL.md's frontmatter, trigger clause, structure and placeholders (week 8). | `npx pm-claude-skills skillcheck --dir ./my-skill --strict` |
| `scripts/local-eval.mjs` | Runs a skill's eval case on a local model and scores it with the library's rubric (week 8, optional). | `node scripts/local-eval.mjs --model llama3.1:8b --skills <name>` with Ollama running. Fully offline. |

## Moderation

- Second-mark a sample of 10% across the range, and every fail.
- Markers compare the kept output with the final artefact. The difference between them is what is being marked under Judgement.
- If a student's final artefact is identical to the kept output, Judgement is 0 regardless of quality.
