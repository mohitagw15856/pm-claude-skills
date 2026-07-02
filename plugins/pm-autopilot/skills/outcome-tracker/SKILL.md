---
name: outcome-tracker
description: "Record the testable predictions inside a decision, then score them against reality later — so frameworks earn trust from outcomes, not vibes. Use when committing to a prioritisation, forecast, or plan (to log what it predicts), when asked to review what actually happened, or to compute how well-calibrated past RICE scores, forecasts, or bets have been. Produces a prediction record at decision time, and a calibration report with per-framework hit rates at review time."
---

# Outcome Tracker Skill

Every prioritisation, forecast, and launch plan makes predictions — then everyone forgets to check them. This skill closes the loop: extract the predictions at decision time, park them somewhere durable, and score them against reality on a schedule. Over time it answers the question no one can answer today: *which of our frameworks actually predict outcomes?*

## What This Skill Produces

- **At decision time:** a prediction record — each claim made falsifiable, with a metric, a direction/target, a check-by date, and a stated confidence
- **At review time:** an outcome scoring of due predictions (hit / miss / partial / unresolvable), with what was learned
- **On demand:** a calibration report — per-framework and per-confidence-band hit rates from the accumulated records

## Required Inputs

Ask for (if not already provided):
- **Mode** — record (new decision), review (score due predictions), or calibrate (analyse the history)
- **Record mode:** the decision artifact (RICE table, forecast, launch plan, OKR set) and where records live (a `predictions/` folder in the Brain, or a JSON/markdown file in the repo)
- **Review mode:** the stored predictions plus current metric values for the due ones
- **Calibrate mode:** the prediction history (the calculator below reads it as JSON)

## Making Claims Falsifiable (record mode)

Walk the artifact and force each implicit claim into this shape — a prediction that can't fill the row doesn't get recorded, it gets flagged as untestable:

| Field | Rule |
|---|---|
| `claim` | One sentence, future tense, about a measurable effect ("onboarding redesign lifts activation") |
| `metric` | The exact instrumented metric, with today's baseline |
| `predicted` | Direction + magnitude band ("+10-20% relative") — bands beat point estimates |
| `confidence` | 0.5–0.95, from the author, recorded before the outcome is knowable |
| `check_by` | The date the effect should be visible if real; also the review trigger |
| `framework` | What produced the claim (rice-prioritisation, gut call, sales-forecasting-model…) — this is what calibration is *about* |

Typical yields: a RICE table → one prediction per top-3 item (impact claims); a forecast → the quarter's number; a launch plan → its success metrics; an OKR set → each KR's target.

## Scoring (review mode)

For each prediction past its `check_by`: **hit** (actual within the predicted band), **partial** (right direction, wrong magnitude), **miss** (wrong direction or no effect), **unresolvable** (metric never instrumented, or confounded by a simultaneous change — record *why*; a pile of unresolvables is itself a finding about how the team instruments its bets). Never rescore or reinterpret the original claim to make it a hit — the record is append-only.

## Programmatic Helper

`scripts/outcome_calibration.py` (stdlib-only) computes the calibration report from a JSON array of prediction records:

```bash
python3 scripts/outcome_calibration.py predictions.json
echo '[{"framework":"rice-prioritisation","confidence":0.8,"outcome":"hit"}]' | python3 scripts/outcome_calibration.py -
```

It reports per-framework hit rates (hits + half-credit partials over resolved), per-confidence-band calibration (do 80%-confidence claims land ~80% of the time?), and flags overconfident bands. Use the computed numbers; don't estimate them.

## Brain Integration

If a [`professional-brain`](../professional-brain/SKILL.md) (`brain/`) exists, records live in `brain/predictions/<id>.md` (one file per prediction, fields as frontmatter, `[hunch]`/`[data]` provenance on the baseline) and review mode starts by listing files with `check_by` in the past. Pair with `schedule-recipe` to run review mode monthly — outcome tracking only works as a ritual, not an intention.

## Output Format

**Record mode:**
### Predictions registered: [decision] — [date]
| # | Claim | Metric (baseline) | Predicted | Confidence | Check by | Framework |
|---|---|---|---|---|---|---|
*Untestable claims flagged:* [claim → what instrumentation would make it testable]

**Review mode:**
### Outcome review — [date]
| # | Claim | Predicted | Actual | Outcome | Learning |
|---|---|---|---|---|---|
**Now due next:** [next check_by dates]

**Calibrate mode:** the calculator's report plus 2-3 sentences of interpretation — which framework has earned trust, where the team is overconfident, and the single instrumentation fix that would resolve the most unresolvables.

## Quality Checks

- [ ] Every recorded prediction has all six fields — no "improve activation" without a metric, band, and date
- [ ] Confidence was stated before the outcome was knowable, never backfilled
- [ ] Review scored every due prediction, including the embarrassing ones — no silent skips
- [ ] Unresolvables carry a reason, and the calibration report counts them separately from misses
- [ ] Calibration numbers come from the calculator, not estimation

## Anti-Patterns

- [ ] Do not reinterpret a claim after the fact so it scores as a hit — the original wording is the contract
- [ ] Do not record point estimates when the author thinks in ranges — bands are honest, points are theatre
- [ ] Do not let a framework take credit for hits and blame "execution" for misses — score the prediction as made
- [ ] Do not compute calibration on fewer than ~10 resolved predictions per framework — report "insufficient history" instead
- [ ] Do not skip recording because the decision feels obvious — obvious bets that miss are the most valuable calibration data
