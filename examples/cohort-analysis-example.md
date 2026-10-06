# Example: cohort-analysis

## What this skill does

Structures a cohort analysis for retention, LTV or behaviour: cohort definitions, the retention table, what the curves say, and prioritised interventions, with the methodology stated so results are defensible.

## How to trigger it

### Example 1: monthly retention cohorts

**You say:**
> "Set up a cohort analysis for our note-taking app. Entry is first sign-up, retention event is opening the app, monthly cohorts since January, I have the event table."

**Claude produces (excerpt):**

# Cohort Analysis: [App name] retention

**Analysis goal:** Retention
**Cohort definition:** acquisition month (calendar month of first sign-up)
**Observation window:** 6 months
**Primary metric:** % of cohort with at least one app-open in month N

## 1. Cohort Definitions

| Cohort | Period | Size | Description |
|---|---|---|---|
| Jan | Jan [year] | 2,140 | First sign-up in Jan, all channels |
| Feb | Feb [year] | 2,610 | As above |

**Cohort logic:**
- **Entry event:** first sign-up
- **Churn definition:** no app-open for 30 consecutive days
- **Exclusions:** internal test accounts; cohorts under 300 users flagged and excluded from trend claims

## 2. Retention Table (fill from your event table)

| Cohort | M0 | M1 | M2 | M3 |
|---|---|---|---|---|
| Jan | 100% | [x]% | [x]% | [x]% |

**Read it diagonally for product changes, horizontally for cohort quality.**

### Example 2: interpreting the filled table

**You say:**
> "Filled in: Jan 100/41/33/30/29/28, Apr cohort 100/52/44/41. April onward looks better. Why might that be?"

**Claude produces (excerpt):**

**Reading:** Jan flattens near 28%, a real retained base. April is 10 to 11 points higher at every age, which is a cohort-quality or onboarding change, not seasonality (the lift persists at M3, seasonal bumps fade).

**Check before celebrating:** did acquisition mix change in April ([channel] share), and did the [onboarding change] ship in late March? If both, split April by channel to attribute.

**Intervention shortlist:** 1) ship whatever March changed to older cohorts' re-engagement flow; 2) shift spend toward the channel carrying the lift; 3) set the M1 target at 50% now that it is proven attainable.

## Tips for best results

- Define entry and churn events precisely before pulling data; most cohort fights are definition fights.
- Keep the observation window shorter than your data, or the last cells are projection, not observation.
- Never compare cohorts of wildly different sizes without flagging it.

## Related skills

- `cohort-curve-model` when you want a fitted curve and computed LTV from the retention numbers
- `churn-analysis` for the reasons behind the leak rather than its shape
