---
description: Workflow recipe — review a design end-to-end, ending in measured numbers rather than adjectives, by chaining 4 skills.
argument-hint: "[the design: a URL, a Figma link, a screenshot, or a token file — plus who it's for and what it has to do]"
---

Run the **Design Review** workflow recipe for: $ARGUMENTS

This is a *chain* of skills. Run each stage in order and **carry every stage's output forward as context** for the next. Open with a one-line plan of the 4 stages, then ask once for essential missing inputs (the actual hex values or a URL, the target WCAG level, whether it will ever be printed, who signs off). Don't re-ask between stages.

**Before stage 2, measure.** A design review that assesses contrast by eye is an opinion with a standards reference attached. If you have a URL or hex values, run these first and carry the numbers through every stage:

```bash
npx --yes notugly spec <url>                        # palette, type scale, radii — what it is made of
npx --yes notugly onepager <url> --out review.html  # every pairing, with the nearest passing colour
npx --yes notugly vision <url>                      # colours that merge for colour-blind viewers
```

Deterministic, zero dependencies, **no model call**. If you only have a screenshot, say so explicitly in the output — an inferred ratio is not a finding.

Run each stage under a clear `## Stage N — <name>` heading:

1. **React honestly** — apply the `design-critique` skill: what the design is trying to do, where it succeeds, and where intent and execution diverge. Do this *before* the measurements so the critique is about the design rather than about its contrast ratios.
2. **Measure what can be measured** — apply the `accessibility-audit` skill, filling every contrast row from the `notugly` output above rather than assessing it. Flag explicitly which findings are computed and which are judgement.
3. **Check the system behind it** — apply the `design-system-audit` skill: is this a one-off, or does it reveal a token problem? Run `npx notugly tokens <file>` if a token file exists; it names failing pairs semantically (`color.text.danger on surface.default is 2.99:1`), which turns a vague note into a bug with an owner.
4. **Hand it over** — apply the `design-handoff-brief` skill: the decisions, the measured values, and the open questions, in the form an engineer can build from.

Close with a **one-page verdict**: the three things to fix before ship, the measured evidence for each, and the split between *find-and-replace* fixes and fixes that need a design decision. That split is the whole reason this recipe exists — "twelve accessibility issues" gets deferred; "nine are a find-and-replace and three need Priya to pick a colour" gets scheduled.
