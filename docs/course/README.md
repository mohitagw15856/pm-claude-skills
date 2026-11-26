# AI-assisted product work with Agent Skills

An eight-week module for a university course or a product bootcamp. Students learn to do real product work with AI the way strong practitioners do: pick the right skill, give it a proper brief, judge what comes back, and take responsibility for the final document.

The module is free to teach. Every exercise runs on free routes, and no student or instructor needs a paid API key.

## Who it is for

- Final-year undergraduates or master's students in product, business, design or computing.
- Bootcamp cohorts training product managers, analysts or founders.
- Teams running an internal "AI at work" programme.

No coding is needed until week 8, and week 8 needs only a text editor.

## What students leave with

1. A portfolio of eight graded product artefacts (problem brief, research synthesis, PRD, prioritised plan, experiment plan, launch pack, AI risk review, and a skill they wrote), each with their own redline and reflection.
2. A working habit: brief, generate, critique, redline, decide.
3. The ability to say when an AI draft is wrong, and why.

## The weeks

| Week | Topic | Main skills |
|---|---|---|
| 1 | [Skills, prompts and the brief](week-1-skills-and-briefs.md) | ambiguity-resolver |
| 2 | [Discovery and research](week-2-discovery.md) | discovery-interview-guide, user-interview-synthesis, assumption-mapper |
| 3 | [Defining the product](week-3-defining.md) | prd-template, user-story-writer, job-story-mapper |
| 4 | [Priorities and goals](week-4-priorities-and-goals.md) | rice-prioritisation, okr-builder, metrics-framework |
| 5 | [Experiments and evidence](week-5-experiments-and-evidence.md) | ab-test-planner, cohort-analysis, retention-analysis |
| 6 | [Go to market and communication](week-6-go-to-market.md) | competitive-analysis, go-to-market, stakeholder-update, executive-summary |
| 7 | [Judgement about AI products](week-7-ai-judgement.md) | ai-product-canvas, ai-ethics-review, sycophancy-challenger, approval-policy-designer |
| 8 | [Write your own skill (capstone)](week-8-capstone.md) | writing-great-skills, SkillCheck |

The [syllabus](syllabus.md) has the schedule, assessment weights and policies. The [grading rubric](rubric.md) is shared by every assignment.

## Free routes for running skills

Pick one per cohort and keep it for the whole module, so results are comparable.

| Route | Cost | Set-up |
|---|---|---|
| [Playground](https://mohitagw15856.github.io/pm-claude-skills/), "In-browser" model | Free, no key, runs on the student's machine | A recent laptop and Chrome or Edge. Slower, and weaker on long documents. |
| Playground with a free Gemini key | Free tier | Each student creates their own key. Mind the provider's terms for coursework. |
| Ollama on a lab machine | Free | One install per machine; see [LOCAL-MODELS.md](../LOCAL-MODELS.md). |
| Claude.ai free plan, with a skill uploaded as a ZIP | Free tier | Use "Add to Claude" on a skill's page to download its ZIP, then upload it in claude.ai under Settings, Skills. |
| Claude Code or another agent, if the institution already licenses one | Institution's licence | `npx pm-claude-skills add --agent claude --skills prd-template,okr-builder` |

For a stable term, install from the [LTS line](../LTS.md): those skills are frozen for a year, so the handout you write in September still matches the skill in May. (`--lts` ships in the first release after 83.2.0.)

```bash
npx pm-claude-skills add --agent claude --skills prd-template,user-story-writer,okr-builder --lts
```

## Free tools for feedback

- **[Grade your work](https://mohitagw15856.github.io/pm-claude-skills/grade.html)** scores a draft against the rubric a senior practitioner uses and returns ranked gaps and a redline. It runs on the same free routes. Students use it for formative feedback before they submit.
- **Prose checks:** `node scripts/grade-output.mjs draft.md` (from a clone of the repository) flags AI tells, filler and reading level. It is deterministic and offline.
- **SkillCheck:** `npx pm-claude-skills skillcheck --dir ./my-skill` validates a student's own SKILL.md in week 8.
- **[Find a skill](https://mohitagw15856.github.io/pm-claude-skills/find.html)** and the [Academy](https://mohitagw15856.github.io/pm-claude-skills/academy.html) give self-study drills between sessions.

## Teaching principle

Students are graded on judgement, not on generation. Every submission has three parts: the brief they gave, the output they kept, and a redline with a short reflection on what they changed and why. An unedited AI output scores no higher than a 1 on the judgement criterion, however polished it looks.

## Licence

MIT, like the rest of the repository. Adapt it freely; a credit link back is appreciated.
