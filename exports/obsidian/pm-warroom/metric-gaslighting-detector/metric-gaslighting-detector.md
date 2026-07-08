---
aliases: ["Metric Gaslighting Detector"]
tags: [pm-skills, skill]
skill: metric-gaslighting-detector
description: "Find out how a dashboard, KPI report, or metrics slide is lying to you — before you repeat its story in a bigger room. Use when numbers feel too tidy, a narrative rests on one chart, or you inherited metrics you didn't define. Produces a deception audit: every metric graded for the eleven classic distortions (denominator games, survivorship, y-axis crimes, cherry-picked windows…), the story the data would tell under honest framing, and the three questions to ask the metric's owner."
---

# Metric Gaslighting Detector

Dashboards rarely contain false numbers. They contain true numbers arranged to create false beliefs. This skill audits the *arrangement* — the eleven standard distortions through which honest data becomes dishonest narrative.

## Required Inputs

- **The metrics artifact** — the dashboard description, KPI table, chart, or the numbers with their labels exactly as presented. Include axis ranges, time windows, and any annotations; the lie usually lives there.
- **The claim being made with it** (if any) — "churn is under control", "the launch worked". The audit tests the *claim-data* connection, not the data alone.

## The Eleven Distortions

1. **Denominator games** — the base changed ("of active users" quietly became "of weekly active")
2. **Survivorship framing** — measuring only what remained (retention of cohorts that didn't churn early)
3. **Y-axis crimes** — truncated baselines, dual axes, log scales without labels
4. **The cherry window** — the date range that starts at the trough or ends before the drop
5. **Mix-shift laundering** — the aggregate improved because composition changed, not performance
6. **Ratio without magnitude** — "+40%!" concealing 5→7
7. **The vanity proxy** — measuring what moves instead of what matters (signups for activation)
8. **Goodhart's ghost** — the metric improved because it became a target, and the gamed behaviour is visible elsewhere
9. **Smoothing to silence** — rolling averages wide enough to bury the event being asked about
10. **The missing counterfactual** — "up 20% since launch" with no baseline trend (it was up 25% before)
11. **Significance theatre** — differences within noise presented as movement ("ticked up to 4.6 from 4.5, n=41")

## Output Format

1. **The audit table** — metric | distortion(s) detected | severity (🔴 changes the conclusion / 🟡 shades it / 🟢 clean) | the honest version of that number's sentence.
2. **The honest retelling** (≤150 words) — what this data says under fair framing. Sometimes the story survives; say so — the detector earns trust by clearing metrics too.
3. **Three questions for the owner** — specific, answerable, non-accusatory ("what was the trend in the 8 weeks before launch?"), ordered by how much the answer would change the conclusion.
4. **The one chart to request** — the single re-cut (full window, fixed denominator, split by segment) that would settle the biggest 🔴.

## Quality Checks

- [ ] Every 🔴 names the specific mechanism and what the conclusion becomes without it — "misleading" alone is not a finding
- [ ] At least one metric is graded 🟢 or the audit admits the artifact gave nothing to clear — all-guilty audits read as motivated
- [ ] The honest retelling uses only the numbers present — the detector doesn't smuggle in its own speculation
- [ ] Questions are answerable from data the owner plausibly has, and none contain an accusation
- [ ] Distortion names from the list are used consistently so repeated audits build a shared vocabulary

## Anti-Patterns

- [ ] Do not accuse people of lying — the framing is "what belief does this arrangement create vs what the data supports"; most gaslighting dashboards are self-deception forwarded
- [ ] Do not grade a metric 🔴 for a distortion that doesn't change the decision at hand — severity is about consequences, not purity
- [ ] Do not demand data that doesn't exist as a gotcha — the three questions must be realistically answerable
- [ ] Do not rewrite the numbers — the honest retelling reframes; it never adjusts figures
- [ ] Do not skip auditing metrics that support conclusions you like — run the eleven on the favourable ones first

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text — replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}
