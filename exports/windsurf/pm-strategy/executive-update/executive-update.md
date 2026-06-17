---
trigger: model_decision
description: "Transform detailed product updates into concise executive briefings. Use when asked to write an executive update, leadership update, product update for the exec team, or a C-suite product briefing. Produces a structured 250-word briefing with headline, key metrics, progress, risks, decisions needed, and next steps."
---

# Executive Update Skill

Produce a stakeholder update that busy executives will actually read — structured around what they care about: decisions, risks, and numbers.

## Required Inputs

Ask the user for these if not provided:
- **Product update or notes** (raw input to transform — even bullet points work)
- **Audience** (CEO, board, specific exec, or general leadership)
- **Period** (this week / sprint / month / quarter)
- **Key metrics** (what numbers matter to this audience)

## Executive Communication Principles
- Lead with the headline, not the context
- Every update should answer: "So what does this mean for the business?"
- Flag decisions needed clearly — don't bury asks in paragraphs
- Be honest about risks — executives hate surprises more than bad news

## Process
1. Read the full product update provided
2. Identify: key metric movements, decisions required, risks to flag, wins to celebrate
3. Write in reverse pyramid style — most important first
4. Limit to 250 words maximum for the main body
5. Add a "Decisions Needed" section with clear options and your recommendation
6. **Validate** — Confirm every decision needed has a specific option and recommendation (not just "TBD"), and every risk has a mitigation or watch plan

## Output Structure

### Product Update — [Date / Sprint / Month]
**Headline:** [One sentence on the most important thing]

**By the Numbers:**
- [Metric 1]: [value] ([vs. target / last period])
- [Metric 2]: [value] ([vs. target / last period])
- [Metric 3]: [value] ([vs. target / last period])

**Progress This Period:**
[3-4 bullet points, outcome-focused not activity-focused]

**Risks & Watch Items:**
[2-3 bullets — be direct, include mitigation]

**Decisions Needed:**
1. [Decision] — Options: [A] or [B] — Recommendation: [your view] — Needed by: [date]

**What's Next:**
[2-3 bullets on next period priorities]

## Quality Checks

- [ ] Whole update is under 250 words (if not, cut ruthlessly)
- [ ] Every metric includes a comparison point (vs. target or last period)
- [ ] Every risk has a mitigation or watch action
- [ ] Every decision needed has at least two options and a recommendation
- [ ] Written for a CFO or CEO — no jargon, all outcomes

## Anti-Patterns

- [ ] Do not lead with context or background — executives read the headline first; bury the important thing below two sentences of setup and they will miss it
- [ ] Do not present metrics without a comparison point — a number without context (vs. target, vs. last period) cannot be interpreted and will prompt follow-up questions
- [ ] Do not soften or spin risks — executives rely on these updates to make resource and escalation decisions; sanitised risk sections destroy the update's utility
- [ ] Do not present a "Decisions Needed" item without a recommendation — asking an executive to decide without your view forces them to do the analytical work the PM should have done
- [ ] Do not exceed 250 words in the main body — length signals the author has not done the compression work; every word over 250 reduces the chance the update is read
