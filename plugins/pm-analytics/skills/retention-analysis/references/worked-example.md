# Worked Example — Retention Analysis Skill

A gold-standard run of this skill: a "retention is fine-ish" blended curve pulled apart into one healthy segment and one segment with no product-market fit at all.

## The brief

Repwell — a fictional consumer strength-training app ($9.99/mo premium, freemium base) — has a board question after D30 retention drifted down two quarters in a row: "Is this an onboarding problem or a product problem?" New signups run ~40k/month, roughly 55% organic and 45% paid social (broad "fitness" lookalike audiences). PM Sofia Reyes has event data for the Feb–Apr 2026 signup cohorts (n = 118,400: 65,100 organic, 53,300 paid social), onboarding goal-selection answers, and no churned-user interviews yet. Growth's OKR is 50k signups/month by Q4.

## The output

### Retention Analysis — Repwell New Users (Feb–Apr 2026 Cohorts) — 8 June 2026

**Question:** Is Repwell's declining D30 retention an onboarding problem or a product-market fit problem?
**Period Analysed:** Signups 1 Feb – 30 Apr 2026 (n = 118,400), activity observed through 7 June
**Segment:** All new users, split organic (55%) vs paid social (45%)

---

**Current Retention Snapshot:**

| Metric | Current | Industry Benchmark | Status |
|---|---|---|---|
| D1 Retention | 34% | 25–40% | 🟢 |
| D7 Retention | 16% | 10–25% | 🟡 |
| D30 Retention | 7.0% | 5–15% | 🟡 |
| DAU/MAU | 14% | 10–20% typical | 🟡 |

**Retention Curve Shape:** The blended curve *appears* to flatten near D45 at ~6% — but this is an artefact of averaging. Segmented: **organic flattens** between D30 and D60 at 10.5–11%; **paid social is still declining** at D60 (0.9%) and is trending to zero.

**PMF Signal:** Strong for the organic segment (curve flattens; DAU/MAU 19%). **Absent for the paid-social segment** (curve trends to zero; DAU/MAU 4% — below the 5% line where this stops being a retention-tactics conversation and becomes a product-market fit conversation for that acquisition source).

Segment detail (blended figures above reconcile: e.g. D30 = 0.55 × 11% + 0.45 × 2.1% ≈ 7.0%):

| Segment | D1 | D7 | D30 |
|---|---|---|---|
| Organic | 41% | 22% | 11% |
| Paid social | 25.4% | 8.7% | 2.1% |

---

**Root Cause Hypotheses:**

| Hypothesis | Evidence | Confidence | Test |
|---|---|---|---|
| Paid-social targeting acquires weight-loss intent into a strength-only app | 61% of paid signups select "lose weight" as their onboarding goal vs 24% of organic; Repwell has no cardio or nutrition content | H | 10 interviews with churned paid-social users; swap creative to strength-intent messaging and compare cohort D7 |
| D2–D7 churn is driven by no scheduled next workout | 78% of users who churn between D2 and D7 never created a training plan; plan-creators retain D7 at ~3× the rate | M | A/B: force plan selection at end of first workout |
| Day-3 premium prompt causes the D3 churn spike | Churn does spike D3–D4 — but the same spike exists in January cohorts, before the prompt shipped | L (largely ruled out) | Holdout cohort without the prompt to close it out |

**"Aha Moment" Correlation:**
Users who **log 3 workouts in their first 7 days** (12% of signups) retain at **31% D30 vs 3.7%** for those who don't — an 8.4× gap (weighted: 0.12 × 31% + 0.88 × 3.7% ≈ 7.0%, matching the blended figure). The gap is upstream, not in-product: 18.1% of organic signups hit the threshold vs 4.6% of paid — mismatched intent never starts workout 2, no matter what the UI does.

---

**Recommended Interventions:**

| Intervention | Target Drop | Expected Lift | Effort | Priority |
|---|---|---|---|---|
| Shift paid-social spend from broad "fitness" lookalikes to strength-intent audiences and creative ("first pull-up", "5×5 progress"), measured on cohort D7 not CPI | D30 | +2–3pp blended D30 (basis: closing half the intent-mix gap between paid and organic) | M | 1 |
| Force training-plan selection at the end of the first completed workout (currently optional, 22% uptake) | D7 | +3pp D7 among plan-less users, per the 3× plan-creator gap — treat as hypothesis until the A/B reads | S | 2 |
| Push notification on the user's scheduled programme day (not generic re-engagement blasts) | D7/D30 | +1–2pp D30; sized from plan-creators' existing return pattern | S | 3 |

**Honest tension to surface for the board:** cutting bad paid traffic will lift the retention *percentage* without retaining a single additional human — and Growth's 50k-signups OKR currently depends on that channel. The right frame is cost per D30-retained user by channel, not signups or blended retention.

**Qualitative gap:** no churned-user interviews exist yet. Before intervention 1 is locked, run 10 interviews with churned paid-social users and 5 with churned organic users — the goal-selection data says *who* mismatches, only interviews say *why* they thought Repwell was for them.

**Monitoring Plan:**
- Metric to track: weekly-cohort D7 retention by acquisition channel; training-plan creation rate in first session
- Review cadence: Weekly
- Alert threshold: paid-social cohort D7 < 7% or organic cohort D7 < 20% → investigate immediately; plan-creation rate target ≥ 35% post-experiment

---

## Why it's shaped this way

- **The curve is segmented before it is diagnosed** — the anti-patterns forbid analysing retention without cohort splits because "aggregate retention curves hide cohort-specific patterns"; here the blended 7% D30 literally averaged a healthy 11% and a doomed 2.1% into a misleading "fine-ish."
- **Flattening vs trending-to-zero is named explicitly, per segment** — the fundamentals section demands the PMF-vs-onboarding distinction be made explicitly; the answer to the board's question is "both, in different segments," which only the shape diagnosis can show.
- **Paid social's 4% DAU/MAU is escalated to a PMF conversation, not a tactics list** — the skill draws a hard line at 5% DAU/MAU, so the output refuses to propose onboarding tweaks for a segment that was never going to retain.
- **The aha-moment correlation is quantified on both sides of the split (31% vs 3.7%) and reconciled back to the blended number** — the output format requires "users who [X] retain at [X%] vs [Y%]," and the reconciliation makes the arithmetic auditable rather than decorative.
- **No intervention says "improve onboarding"** — each names the specific step (plan selection at end of first workout), the target drop point, and the basis for the lift estimate, per the guideline banning vague onboarding advice and the quality check requiring specificity.
- **Churned-user interviews are recommended before committing spend, not after** — Step 4 of the investigation framework says "never skip this"; the goal-selection data is treated as who-evidence, not why-evidence.
- **The monitoring plan carries numeric alert thresholds per channel** — the anti-pattern bans alerts without a stated trigger level; "watch retention weekly" alone would fail the checklist.
- **The intervention that flatters the metric is flagged as revenue-relevant** — killing paid traffic improves the ratio while cannibalising the growth target, so the output reframes to cost per retained user instead of letting the board celebrate a denominator trick.
