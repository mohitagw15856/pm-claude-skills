# RICE Scoring Worksheet — [backlog / quarter]

> Fill one row per initiative *with the evidence columns*, then compute. The evidence columns are the point of the worksheet — a score you can't source is a guess wearing a number.

**Planning period:** [quarter] · **Primary metric impact refers to:** [the metric] · **Scored by:** [names] · **Date:** [date]

## Scoring table

| Initiative | Reach /qtr | Reach source | Impact (0.25-3) | Impact rationale | Confidence | Evidence for C | Effort (pm) | Effort source | RICE |
|---|---|---|---|---|---|---|---|---|---|
| | | | | | | | | | |
| | | | | | | | | | |

**Compute:** `python3 scripts/rice_calculator.py initiatives.json` (or CSV: `name,reach,impact,confidence,effort`).

## Calibration reminders (from references/estimate-calibration.md)

- Reach = users who hit the touched surface this period, not all users.
- At most 1-2 items in a 10-item list score impact 3. If a third of the list is ≥2, re-anchor.
- Confidence: 100% = measured, 80% = half-measured, 50% = reasoning only (the honest default).
- Effort is cross-functional and engineering has seen it — else cap confidence at 80%.

## After computing

**Surprise check:** does the top item surprise anyone who knows this backlog? If yes, which estimate is doing it? → [note]

**Sensitivity check (top 3):** would impact −1 step or effort ×2 reorder them? → [fragile / robust]

**Ties (within ~15%):** [items] — sequenced by [dependency / strategic reason] instead of score.

**Decision:**
| Rank | Initiative | Sequenced because | Owner |
|---|---|---|---|

**Data gaps to close before next scoring:** [what measurement would most improve these estimates]
