---
name: kpi-tracker-design
description: "Design a KPI tracker that drives decisions instead of decorating them — the few-metrics discipline (5–9, each with an owner and a so-what), targets with honest baselines, the trend-first layout, and the review ritual where the tracker actually gets used. Use when asked set up KPI tracking for the team, build a metrics dashboard in sheets, which numbers should we track, or our dashboard exists but nobody acts on it. Produces the metric selection with kill-list, the tracker structure, the target-setting notes, and the review ritual."
---

# KPI Tracker Design Skill

KPI trackers fail by addition: every meeting adds a metric, none subtracts, and within two quarters the tracker is a wall of numbers nobody reads — motion without instrumentation. The working tracker is small (5–9 metrics, each with an owner and a written so-what), trend-first (a number without its history is a Rorschach test), honestly baselined before targets exist, and — the part that decides everything — *attached to a ritual* where someone reads it aloud and decisions reference it. The tracker is the artifact; the ritual is the product.

## What This Skill Produces

- **The metric selection** — 5–9 survivors of the so-what test, each: definition, source, owner, cadence — plus the kill-list of metrics deliberately not tracked, with reasons
- **The tracker structure** — metric × period grid, trend columns/sparklines, target and threshold lines
- **The target notes** — baseline-first discipline: track before targeting; targets with owners and reasons, not round numbers
- **The review ritual** — where, when, who reads it, and the metric-in-every-decision norm

## Required Inputs

Ask for these if not provided:
- **The decisions the tracker should feed** — metrics follow decisions; "what would we do differently if this number moved?" is the selection filter, and it needs the team's real decision list
- **The candidate metrics and their sources** — what's measurable today vs. requiring new instrumentation (day-one tracker uses today's sources; the wishlist is a separate roadmap)
- **The audience and cadence** — team-weekly vs. leadership-monthly are different trackers (grain, commentary, tone) — pick one; hybrids serve neither
- **Existing baselines** — history where it exists; where it doesn't, the no-targets-for-a-month rule applies

## Framework: The Design Rules

1. **The so-what test selects:** every candidate metric answers "if this moved 20%, what would we do?" — no answer, no slot. The kill-list (tracked-nowhere metrics with their reasons) is half the design's value: it's the documented defense against the wall-of-numbers drift.
2. **5–9, owned, defined:** each metric has one owner (who explains its movement, not who's blamed), a written definition (the numerator/denominator argument happens once, at design time — not monthly), and a stated source. Undefined metrics generate the two-truths meeting.
3. **Trend-first layout:** every metric shows its last 6–12 periods (sparkline or mini-column), not just current-vs-target — direction and volatility are the actual information; a red 87% that's been climbing for four months is a different fact than a red 87% in freefall.
4. **Baseline before target:** new metrics run target-less for 3–4 periods (you can't set honest targets on unmeasured behavior); then targets get set with a reason and an owner, at attention-worthy thresholds — the [budget-tracker-design](../budget-tracker-design/SKILL.md) signal discipline applies: red must mean something.
5. **The ritual is the product:** a standing slot (the weekly's first ten minutes) where the owner-of-the-moment reads the tracker aloud — one sentence per moved metric — and any proposal in the meeting gets the "which metric does this move?" question. Trackers without rituals decay into decoration in six weeks, on schedule.

## Output Format

# KPI Tracker: [team] — feeds: [the decisions]

## The Metrics (5–9)
| Metric | Definition (num/denom) | Source | Owner | Cadence |
|---|---|---|---|---|

## The Kill-List
[Deliberately untracked: metric → reason — the wall-of-numbers defense]

## Structure & Targets
[Grid + trend columns · baseline-first schedule for new metrics · targets with owner + reason + threshold]

## The Ritual
[The slot · the read-aloud norm (one sentence per mover) · the which-metric-does-this-move question · quarterly metric review: add/kill with the so-what test]

## Quality Checks

- [ ] Every metric passed the so-what test against a real decision
- [ ] Count is 5–9; the kill-list exists with reasons
- [ ] Definitions settle the numerator/denominator argument in writing
- [ ] Trends are visible per metric — no naked current-values
- [ ] The ritual has a slot, a reader, and the decision-linkage norm

## Anti-Patterns

- [ ] Do not track what you can't act on — interesting is not a criterion; decidable is
- [ ] Do not exceed nine — the tenth metric costs attention from the first nine
- [ ] Do not set targets on unbaselined metrics — round-number targets on unknown behavior are theater
- [ ] Do not show numbers without trends — a value with no history is a mood
- [ ] Do not build the tracker without booking the ritual — undecorated walls beat decorated ones

## Example Trigger Phrases

- "Set up KPI tracking for the team."
- "Build a metrics dashboard in sheets."
- "Which numbers should we track?"
- "Our dashboard exists but nobody acts on it."
