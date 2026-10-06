# Example: cohort-curve-model

## What this skill does

Fits a power curve to real cohort retention numbers and computes, rather than estimates, lifetime periods and LTV, including a spreadsheet with live formulas via its bundled zero-dependency script.

## How to trigger it

### Example 1: LTV from six months of retention

**You say:**
> "Our cohort retention is 100, 58, 44, 38, 34, 31, 29 by month. ARPU is £12. What LTV does that imply over 24 months?"

**Claude produces (excerpt):**

**The fit** (from `scripts/cohort_model.py`):
- a = 0.597, b = 0.412, R² = 0.994, observed tail floor ≈ 29%
- b in the 0.5 band: clear flattening, a habit is forming; this curve accumulates a base rather than leaking out.

**The projection:** fitted follows observed within 1 point through month 6, then projects 27% at M12 and 24% at M24 (projection beyond month 6 is model, not measurement).

**The money:**
- Lifetime periods over 24 months: Σ fitted retention ≈ 9.8
- LTV = £12 × 9.8 ≈ **£118 per user**

**Workbook written:** `cohorts.xlsx` with a Model sheet where editing the ARPU cell recalculates LTV live.

### Example 2: a leaky curve, caught honestly

**You say:**
> "Same question for: 100, 34, 18, 11, 8. ARPU £7."

**Claude produces (excerpt):**

**The fit:** a = 0.34, b = 1.21, R² = 0.987.

**Read it plainly:** b > 1 is a leaky bucket; the curve never flattens to a retained base. Lifetime periods ≈ 1.9, LTV ≈ **£13**, and most of that is month zero.

**The caveat that matters most:** do not build acquisition economics on this LTV; fix month-1 retention first. At this shape, a 10-point M1 improvement moves LTV more than any ARPU change.

## Tips for best results

- Give the raw retention series starting at 100 (or absolute users), and the ARPU; the script does the rest.
- Say the horizon you plan against (12, 24, 36 periods); LTV is meaningless without it.
- Distrust the projection if R² is below 0.9; the skill will say so, listen to it.

## Related skills

- `cohort-analysis` to structure the retention table this skill consumes
- `runway-monte-carlo` to feed the computed LTV into cash-runway scenarios
