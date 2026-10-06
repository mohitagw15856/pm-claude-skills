# Example: retention-analysis

## What this skill does

Structures a retention deep-dive: the snapshot against benchmarks, the curve-shape and PMF read, aha-moment correlation, and interventions prioritised by where the curve actually leaks.

## How to trigger it

### Example 1: a retention snapshot and plan

**You say:**
> "Retention analysis for our habit-tracking app, all signups last quarter: D1 31%, D7 14%, D30 6%, DAU/MAU 12%. Users who set a reminder in session 1 retain at 2.3x. What's the plan?"

**Claude produces (excerpt):**

### Retention Analysis: habit app, last-quarter signups

**Current Retention Snapshot:**

| Metric | Current | Industry Benchmark | Status |
|---|---|---|---|
| D1 | 31% | 25-40% | 🟢 |
| D7 | 14% | 10-25% | 🟡 |
| D30 | 6% | 5-15% | 🟡 |
| DAU/MAU | 12% | 10-20% | 🟡 |

**Retention Curve Shape:** still declining at D30; not yet trending to zero.
**PMF Signal:** weak-to-moderate: a floor is forming but late and low.

**Aha-moment correlation:** reminder-set in session 1 → 2.3x D30. Currently 22% of signups do it. This is the strongest lever in the data, with the standard caveat: correlation; keen users may both set reminders and retain.

**Prioritised interventions:**
1. Move reminder-setting into onboarding (target: 22% → 60% of signups); instrument as an experiment to test causality, not just correlation.
2. D1→D7 is the steepest leak (31→14): a day-2 "streak started" nudge, tested against a holdout.
3. Park D30 work until the D7 cliff moves; later-curve fixes cannot save users already gone.

### Example 2: diagnosing a DAU/MAU argument

**You say:**
> "Leadership says 12% DAU/MAU proves we're not a daily habit and should pivot to a weekly digest product. True?"

**Claude produces (excerpt):**

**What 12% actually says:** the average active user shows up ~3.6 days a month. But the average hides the split that matters:

**Cut to run before any pivot:** the DAU/MAU distribution. If you have a 25%-of-actives core at 5+ days/week and a long casual tail, you have a habit product with a casual audience, and the move is to grow the core, not pivot the product. If the histogram is flat at 1-2 days for everyone, leadership's read stands.

**Decision rule proposed:** pivot conversation proceeds only if under 10% of actives clear 3 days/week after the reminder experiment lands.

## Tips for best results

- Give the full D1/D7/D30 set; a single retention number cannot show the leak's location.
- Bring any behaviour that correlates with staying; the aha-moment candidates drive the plan.
- Ask for interventions mapped to where the curve leaks, not a generic engagement list.

## Related skills

- `cohort-analysis` to see whether retention differs by signup month or channel
- `churn-analysis` for the why behind the users the curve loses
