---
description: Workflow recipe: turn a year of Chinese workplace notes into a promotion case by chaining 5 skills: 周报, 复盘, 年终总结, 述职 and 晋升答辩.
argument-hint: "[your level, target level and this year's notes]"
---

Run the **职场晋升线 (Chinese workplace: report to promotion)** workflow recipe for: $ARGUMENTS

This is a *chain* of skills. Run each stage in order and **carry every stage's output forward as context** for the next. Open with a one-line plan of the 5 stages, then ask once for any essential missing inputs. Don't re-ask between stages.

Run each stage under a clear `## Stage N: <name>` heading:

1. **周报**: apply the `cn-weekly-report` skill to turn the raw notes into 周报 that lead with results and numbers, flag risks early and state next steps.
2. **复盘**: apply the `cn-fupan` skill to run a 复盘 on the year's biggest project: goals against results, causes, the lessons that transfer.
3. **年终总结**: apply the `cn-year-end-review` skill to write the 年终总结, achievements ranked by impact with numbers, honest problems and next year's measurable plan.
4. **述职**: apply the `cn-shuzhi-deck` skill to outline the 述职 deck page by page with a timed script built from the review.
5. **晋升答辩**: apply the `cn-promotion-defence` skill to map the evidence against the target level, name the gaps, and rehearse the committee's hardest questions.

Write in Simplified Chinese unless the user asks otherwise. Do not invent numbers, projects or titles: work with what is given and mark assumptions. After the last stage, end with a 5-bullet **"What you now have"** recap linking each artifact to the stage that produced it, and a one-line next step.
