# Worked Example — Cohort Analysis Skill

A gold-standard run of this skill: six monthly cohorts, one of which wrecks the headline trend for reasons that have nothing to do with the product — and an LTV story that argues against the retention dashboard.

## The brief

ChairTime — a fictional UK SaaS that handles appointment booking for independent salons and barbershops — charges a single £29/month plan. Head of Product Amara Diallo wants two questions answered: is the onboarding work of the last year actually showing up in retention, and should the April 2025 paid Facebook campaign (CAC £96/signup, 890 signups vs a normal ~400–500 organic month) be rerun? Cohorts: signup month, Jan–Jun 2025, observed through 31 March 2026. Retention event: the salon processed ≥1 client booking through ChairTime in the month. Schema supplied: Postgres, `accounts(account_id, created_at, acquisition_channel)` and `bookings(id, account_id, booked_at)`.

## The output

### Cohort Analysis: ChairTime — Salon Booking Platform

**Analysis goal:** Retention improvement (primary), with LTV comparison to settle the paid-campaign rerun decision
**Cohort definition:** Calendar month of account creation (`accounts.created_at`), Jan–Jun 2025
**Observation window:** Through 31 March 2026 (Jan–Mar cohorts have a full 12 observed periods; Apr–Jun do not — flagged below)
**Primary metric:** Monthly retention = account processed ≥1 client booking in the period (a login without a booking does **not** count as retained)
**Data source:** `accounts`, `bookings` tables (Postgres); Stripe billing export for revenue
**Date prepared:** 6 April 2026

---

#### 1. Cohort Definitions

| Cohort | Period | Size | Description |
|---|---|---|---|
| Jan 2025 | Jan | 420 | Organic (search, word of mouth, app-store) |
| Feb 2025 | Feb | 385 | Organic |
| Mar 2025 | Mar | 410 | Organic |
| Apr 2025 | Apr | 890 | **Paid Facebook campaign month** — 100% of incremental volume paid |
| May 2025 | May | 505 | Organic (campaign ended 30 Apr) |
| Jun 2025 | Jun | 468 | Organic |

**Cohort logic:**
- **Entry event:** first account creation; one account, one cohort — accounts are assigned by `created_at` month only, so membership is mutually exclusive
- **Exit / churn definition:** subscription cancelled, or no processed booking for 60 consecutive days
- **Exclusions:** 41 internal/demo accounts; the Dec 2025 pilot with a 38-location salon chain (below the 200-account minimum cohort size — excluded from all trend conclusions)

> All six analysed cohorts are ≥385 accounts, above the 200-account reliability threshold.

---

#### 2. Retention Curve

**How to read:** each cell = % of the cohort that processed ≥1 booking in period N after signup. Period 0 = 100% by definition.

| Cohort | P0 | P1 | P2 | P3 | P6 | P12 |
|---|---|---|---|---|---|---|
| Jan 2025 (420) | 100% | 74% | 63% | 58% | 52% | 49% |
| Feb 2025 (385) | 100% | 75% | 64% | 59% | 53% | 50% |
| Mar 2025 (410) | 100% | 76% | 65% | 60% | 54% | 51% |
| Apr 2025 (890) | 100% | **61%** | **44%** | **37%** | **31%** | — *(not yet observed)* |
| May 2025 (505) | 100% | 77% | 66% | 61% | 55% | — |
| Jun 2025 (468) | 100% | 78% | 67% | 62% | 56% | — |
| Trend, newest organic (Jun) vs oldest (Jan) | — | ↑ 4 pp | ↑ 4 pp | ↑ 4 pp | ↑ 4 pp | — |

**Retention plateau:** organic cohorts flatten from P6 onward, losing only ~3 pp between P6 and P12 (Jan: 52% → 49%), settling at ≈ 50%. The Apr paid cohort has *not* plateaued by P6 with the same slope — it stabilises lower, around 28–31%, based on its observed P7–P11 months.

**Key observations:**
- The largest single-period drop for every cohort is P0 → P1 (organic: 22–26 pp; paid: 39 pp). The first month — before a salon has moved its client book over — is the churn moment.
- The Apr cohort is the outlier in every column, but it is an **acquisition-mix effect, not a product regression**: May and Jun (organic) resume and extend the improving trend. A naive monthly dashboard showed "retention collapsed in April" — it did not; the denominator changed.
- Organic P3 retention has moved 58% → 62% oldest-to-newest, roughly +1 pp per cohort.

**Retention chart** — one line per cohort, period on x-axis:

```chart
{
  "type": "line",
  "title": "Retention by cohort (%)",
  "labels": ["P0", "P1", "P2", "P3", "P6"],
  "series": [
    { "name": "Jan 2025", "data": [100, 74, 63, 58, 52] },
    { "name": "Feb 2025", "data": [100, 75, 64, 59, 53] },
    { "name": "Mar 2025", "data": [100, 76, 65, 60, 54] },
    { "name": "Apr 2025 (paid)", "data": [100, 61, 44, 37, 31] },
    { "name": "May 2025", "data": [100, 77, 66, 61, 55] },
    { "name": "Jun 2025", "data": [100, 78, 67, 62, 56] }
  ]
}
```

---

#### 3. LTV Projection

**ARPU per period:** £29.00 — single monthly plan, observed from the Stripe billing export; no plan tiers, no expansion revenue, so every LTV difference below is pure retention
**Retention curve used:** Jan–Mar 2025 cohorts blended, weighted by cohort size (n = 1,215) — these are the only organic cohorts with 12 fully observed billing months. Blended milestones: P1 75% (912/1,215), P2 64%, P3 59%, P6 53% (643/1,215), P12 50%.

Cumulative LTV computed from all 12 observed monthly retention values; milestone rows shown:

| Period | Retained % | Revenue per retained user | Cumulative LTV |
|---|---|---|---|
| Month 1 (P0) | 100% | £29 | £29 |
| Month 4 (P3) | 59% | £29 | £86 |
| Month 7 (P6) | 53% | £29 | £134 |
| Month 12 (P11) | 50.5% | £29 | £209 |

**Blended LTV at 12M:** £209 — Jan–Mar 2025 cohorts, size-weighted; the Apr paid cohort is deliberately excluded from this baseline and shown separately below.

**LTV by segment:**

| Segment | LTV (12M) | vs Blended baseline | Key driver of difference |
|---|---|---|---|
| Organic (Jan–Mar) | £209 | baseline | — |
| Paid (Apr campaign) | £140 | −33% | Activation rate 34% vs 58%; P1 61% vs 75% — identical ARPU, so the gap is entirely retention |

**The decision this feeds:** paid LTV £140 against CAC £96 is +£44 net per account, payback in month 7. The campaign is *margin-positive and retention-dilutive at the same time*. Killing it makes the retention dashboard prettier while cannibalising profitable growth — see Recommendation 3.

---

#### 4. Behavioural Segmentation

Segments defined by first-30-day booking behaviour (Jan–Mar cohorts, n = 1,215). Mutually exclusive, collectively exhaustive: 316 + 462 + 255 + 182 = 1,215.

| Segment | Definition | % of cohort | Retention (P6) | LTV (12M) |
|---|---|---|---|---|
| **Power users** | ≥20 processed bookings in first 30 days | 26% (316) | 84% | £304 |
| **Casual users** | 5–19 bookings in first 30 days | 38% (462) | 65% | £247 |
| **Dormant** | 1–4 bookings in first 30 days | 21% (255) | 26% | £128 |
| **Never activated** | 0 processed bookings | 15% (182) | 7% | £60 |

Cross-check: segment-weighted P6 = (265 + 300 + 66 + 13) / 1,215 ≈ 53% and segment-weighted LTV ≈ £209 — both tie back to sections 2–3.

**Activation threshold (the "aha moment"):** processing **≥5 client bookings within 14 days** of signup. 58% of the Jan–Mar population hits it and retains at **76% P6 vs 21%** for those who don't (0.58 × 76% + 0.42 × 21% ≈ 53%, consistent with the blended curve). For the Apr paid cohort, only 34% hit the threshold — the campaign's problem is *who it acquired*, upstream of the product.

---

#### 5. Leading Indicators of Churn

| Signal | Lead time before churn | Correlation strength | Recommended intervention |
|---|---|---|---|
| Weekly booking volume down >40% for 2 consecutive weeks | ~4 weeks | Strong — preceded 68% of churned accounts in the Jan–Mar cohorts | Automated win-back email + CS call for accounts above £29×6 tenure value |
| Calendar sync disconnected and not restored within 7 days | ~6 weeks | Moderate — observed | In-app reconnect prompt; human outreach for Power-segment accounts |
| Automated client SMS reminders toggled off | ~5 weeks | [Hypothesis — not yet validated] | Do not build an intervention yet; run survival analysis on the reminders flag first |

> The third signal is theoretical: the toggle-off event correlates with churn in anecdote only. It is listed because CS believes in it, and flagged because the data does not yet.

---

#### 6. Cohort Comparison: Trend Over Time

Organic cohorts only — Apr 2025 excluded from the verdict because its deviation is acquisition mix, not product change.

| Metric | Jan 2025 (oldest) | Jun 2025 (newest) | Change | Notes |
|---|---|---|---|---|
| P1 retention | 74% | 78% | ↑ 4 pp | Steady ~1 pp per cohort |
| P3 retention | 58% | 62% | ↑ 4 pp | Same slope |
| Activation rate (≥5 bookings in 14 days) | 55% | 61% | ↑ 6 pp | |
| Avg. sessions, first 30 days | 11.2 | 12.6 | ↑ | |

**Verdict:** newer organic cohorts are genuinely better — but the improvement is a steady ~1 pp per cohort that **predates** the guided calendar-import wizard (shipped 28 April 2025). May and Jun continue the pre-existing slope rather than breaking above it, so the wizard cannot claim the trend. No clean causal attribution is available from cohort data alone; a 10% onboarding holdback test is the honest way to size the wizard's contribution. We state this rather than inventing a causal story.

---

#### 7. Recommendations

| # | Recommendation | Anchored to finding | Target segment | Expected impact | Effort | Priority |
|---|---|---|---|---|---|---|
| 1 | In-product "first 5 bookings" checklist with client-book CSV import, triggered when an account has 1–4 bookings by day 10 | §4 — Dormant segment: 21% of cohort, P6 26% vs 65% for Casual | Dormant | +1.5–2 pp blended P6 (basis: moving 1 in 5 Dormant accounts over the §4 activation threshold ≈ 51 accounts × 39 pp P6 gap) | Med | P1 |
| 2 | Booking-volume-drop alert (>40%, 2 consecutive weeks) wired to a CS win-back play | §5 — signal preceded 68% of churn with ~4 weeks of lead time | All retained accounts | Cannot be sized from current data — run a 90-day pilot with a holdout before claiming a number | Low | P1 |
| 3 | Rerun the paid campaign **only** with strength-of-fit targeting (multi-chair salons, existing booking-tool switchers) and a budget gate on cohort activation rate ≥45% at day 14 | §3 + §6 — paid LTV £140 vs CAC £96 is +£44/account, but the cohort dilutes headline retention and added ~19% to support volume | Paid acquisition | Rerun as-is: repeat of Apr economics; with targeting gate, unknown — the gate exists to find out cheaply | Med | P2 |

> Recommendation 3 is a finance decision wearing a retention costume: the honest framing is that the campaign makes money and makes the dashboard worse. Presenting only the retention view would push the team to kill £44/account of margin.

---

#### 8. SQL Reference

Adapted to the supplied schema (Postgres):

```sql
-- Monthly retention by signup cohort: retained = ≥1 processed booking in the period
SELECT
  date_trunc('month', a.created_at)                                 AS cohort_month,
  date_trunc('month', b.booked_at)                                  AS activity_month,
  (extract(year  from age(b.booked_at, a.created_at)) * 12
   + extract(month from age(b.booked_at, a.created_at)))::int       AS period,
  count(DISTINCT b.account_id)                                      AS retained_accounts,
  max(cs.cohort_size)                                               AS cohort_size,
  round(count(DISTINCT b.account_id) * 100.0
        / nullif(max(cs.cohort_size), 0), 1)                        AS retention_rate
FROM accounts a
JOIN bookings b  ON b.account_id = a.account_id
JOIN (
  SELECT date_trunc('month', created_at) AS cohort_month, count(*) AS cohort_size
  FROM accounts
  WHERE created_at >= '2025-01-01'
  GROUP BY 1
) cs ON cs.cohort_month = date_trunc('month', a.created_at)
WHERE a.created_at >= '2025-01-01'
GROUP BY 1, 2, 3
ORDER BY 1, 3;
```

Exclude the 41 internal accounts via your `accounts` flag column before running in production.

---

## Why it's shaped this way

- **Retention is defined as a processed booking, not a login** — the anti-pattern "conflating login with retention" is the one that would flatter these numbers most, since salons often log in to browse without transacting; the metric definition line makes the choice explicit up front.
- **The Apr paid cohort is quarantined from every trend statement but never hidden** — cohorts must be mutually exclusive and comparable; blending 890 paid signups into the organic trend produced the false "retention collapsed in April" headline the analysis exists to correct.
- **LTV uses only observed billing data (£29 flat, 12 fully observed months for Jan–Mar) and says so** — the anti-pattern bans assumed ARPU; the single-plan structure is called out precisely because it means LTV gaps are pure retention, which is the load-bearing fact in the campaign decision.
- **The Dec pilot cohort (38 accounts) is excluded by the minimum-size rule**, per the quality check that undersized cohorts get flagged and kept out of trend conclusions — 38 salons from one chain is an anecdote wearing a percentage.
- **Recommendation 2 refuses to state a lift number** — the anti-pattern "fabricating lift estimates" demands "if impact cannot be estimated from data, say so and recommend a test"; the pilot-with-holdout *is* the recommendation.
- **The wizard gets no credit for the trend** — section 6's template instructs "if no causal explanation is available, state that — do not invent one"; the +1 pp/cohort slope predating the ship date is exactly the pattern that tempts teams into false attribution.
- **Every recommendation cites its section and finding** ("§4 — Dormant segment"), per the rule that generic advice that could apply to any product must be cut — and the arithmetic behind each impact estimate (51 accounts × 39 pp) is shown so it can be checked by hand.
- **The SMS-reminders churn signal is shipped as [Hypothesis — not yet validated]** rather than dressed up with an invented correlation, per the section-5 data requirement — CS conviction is recorded as conviction, not as evidence.
