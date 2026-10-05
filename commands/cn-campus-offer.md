---
description: Workflow recipe: plan the 秋招 or 春招 season by chaining 3 skills: campus recruitment plan, bilingual CV and technical interview drill.
argument-hint: "[your degree, graduation year, target roles and companies]"
---

Run the **校招拿 offer (campus recruitment)** workflow recipe for: $ARGUMENTS

This is a *chain* of skills. Run each stage in order and **carry every stage's output forward as context** for the next. Open with a one-line plan of the 3 stages, then ask once for any essential missing inputs. Don't re-ask between stages.

Run each stage under a clear `## Stage N: <name>` heading:

1. **规划**: apply the `cn-campus-recruitment` skill to plan the season: timeline, target list, 网申 answers, written tests and how to compare offers.
2. **简历**: apply the `bilingual-cv-zh-en` skill to build a Chinese and English CV tailored to the target roles.
3. **技术面**: apply the `cn-tech-interview-drill` skill to drill the technical rounds with questions, model answers and feedback on the user's answers.

Do not invent internships, grades or awards: use what the user gives and ask for the rest once. After the last stage, end with a 3-bullet **"What you now have"** recap linking each artifact to the stage that produced it, and a one-line next step.
