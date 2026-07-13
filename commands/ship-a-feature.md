---
description: Workflow recipe — take a feature idea from fuzzy brief to launch plan by chaining 5 skills.
argument-hint: "[the feature idea or problem]"
---

Run the **Ship a Feature** workflow recipe for: $ARGUMENTS

This is a *chain* of skills. Run each stage in order and **carry every stage's output forward as context** for the next — that shared context is the whole point. Open with a one-line plan of the 5 stages, then ask once for any essential missing inputs (target user, the problem, a rough success metric). Don't re-ask between stages.

Run each stage under a clear `## Stage N — <name>` heading:

1. **Frame the problem** — apply the `ambiguity-resolver` skill to turn the raw idea into a sharp problem statement and scoped boundaries.
2. **Spec it** — apply the `prd-template` skill, using the framed problem, to produce a PRD with goals/non-goals, requirements, and success metrics.
3. **Prioritise it** — apply the `rice-prioritisation` skill to score this work (reach, impact, confidence, effort) so its priority is defensible.
4. **Place it on the roadmap** — apply the `roadmap-narrative` skill to position the work and tell the story around it.
5. **Plan the launch** — apply the `go-to-market` skill to produce audience, messaging, channels, and a launch timeline.

Do not invent metrics, dates, or facts — note assumptions instead. After the last stage, end with a 5-bullet **"What you now have"** recap linking each artifact to the stage that produced it.
