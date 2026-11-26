# Worked Example — Churn Analysis

## The brief

Harborline sells warehouse-operations SaaS to 3PLs and e-commerce brands. FY2025: started the year with 480 customers and $9.6M ARR; 42 accounts churned, taking $684K ARR with them; expansions added $912K over the same period. Exit surveys came back from 16 of the 42 (38%), CSM notes exist for the rest. The CRO wants "the real churn story, not the dashboard number" before renewal-season planning.

## The output

---

# Churn Analysis: Harborline — Full Customer Base
**Period:** 1 Jan 2025 — 31 Dec 2025
**Prepared by:** M. Osei, RevOps | **Date:** 12 Jan 2026

---

## Headline Numbers

| Metric | Value |
|---|---|
| Customers at start of period | 480 |
| Customers churned | 42 |
| **Customer churn rate** | **8.8%** |
| ARR at start of period | $9.60M |
| ARR lost to churn | $684K |
| **Revenue churn rate (gross)** | **7.1%** |
| ARR from expansions (same period) | $912K |
| **Net revenue retention (NRR)** | **102.4%** |

**Benchmark context:**
- Customer churn rate: 8.8% vs. ~10% typical for SMB-heavy B2B SaaS — slightly better than benchmark, but the mix hides a problem (see segments).
- NRR: 102.4% — expansion is just offsetting churn. Above water, but a $228K net gain on a $9.6M base is treading, not compounding.

---

## Churn Breakdown by Category

| Category | Customers | % of churn | ARR lost |
|---|---|---|---|
| Voluntary — avoidable | 24 | 57% | $462K |
| Voluntary — unavoidable | 11 | 26% | $156K |
| Involuntary | 7 | 17% | $66K |
| **Total** | **42** | **100%** | **$684K** |

**Avoidable churn as % of total churn:** 57% — this is the number we can actually influence. The 11 unavoidable losses (two acquisitions, six budget shutdowns of the warehouse function, three company closures) do not belong in the intervention plan.

---

## Churn Reasons — Avoidable Churn Only

| Reason | Count | % of avoidable churn | ARR lost | Representative quote |
|---|---|---|---|---|
| No multi-warehouse support | 9 | 37% | $219K | "We opened a second site in March and had to run it on spreadsheets." |
| Onboarding stalled — never reached live operations | 7 | 29% | $118K | "Four months in, we were still reconciling manually. We stopped believing." |
| Champion left, account unmanaged after | 5 | 21% | $95K | "Our ops lead who chose Harborline moved on; nobody here knew why we had it." |
| Support responsiveness on peak-season issues | 3 | 13% | $30K | "A Black Friday ticket sat for 30 hours." |

**Theme synthesis:** Avoidable churn clusters into two themes: a product ceiling (multi-warehouse, 37% of avoidable ARR) that growing customers hit at exactly the moment they become most valuable, and value-realisation failures (onboarding + champion loss, 50% combined) where the product was never the problem — the account just never got, or lost, its internal reason to exist.

---

## Churn by Segment

### By Tier

| Tier | Churn rate | vs. Overall | Notes |
|---|---|---|---|
| Enterprise (38 accts) | 2.6% | −6.2pp | 1 loss — acquisition |
| Mid-Market (156 accts) | 5.8% | −3.0pp | Product-gap losses concentrate here |
| SMB (286 accts) | 11.2% | +2.4pp | Onboarding and involuntary losses concentrate here |

### By Cohort (Acquisition Year)

| Cohort | Churn rate | Notes |
|---|---|---|
| 2022 and earlier | 4.1% | Survivors are sticky |
| 2023 | 8.3% | |
| 2024 | 12.6% | Worst cohort — acquired during the self-serve push, lightest onboarding |

**Key pattern:** The 2024 SMB cohort is the epicentre: acquired with a low-touch motion, onboarded without a check-in, and churning inside year one. The headline 8.8% is calm; this cell is not.

---

## Timing Analysis

- **Average contract length before churn:** 14 months
- **Highest-risk moment:** Months 3–6 — trial enthusiasm has faded, but live operations (the actual value moment) haven't started for stalled accounts
- **Churn timing distribution:**

| When churn occurred | % of churned accounts |
|---|---|
| 0–3 months | 17% |
| 3–6 months | 31% |
| 6–12 months | 24% |
| 12+ months | 28% |

---

## Early Warning Signals

| Signal | Lead time before churn | How to detect |
|---|---|---|
| No live warehouse connected by day 45 | ~3 months | Onboarding pipeline report |
| Weekly active operators < 3 | ~8 weeks | Usage dashboard threshold alert |
| Champion contact goes dark (no login, no email reply ×3) | ~10 weeks | CRM activity flag |
| Second physical site added without a plan conversation | ~4 months | CSM account-review checklist |

---

## Intervention Recommendations

| Intervention | Addresses | Est. churn reduction | Effort | Owner |
|---|---|---|---|---|
| 30/60/90-day onboarding gates with human check-in for SMB (no account "graduates" without live ops) | Onboarding stalls | ~5 accounts / $85K ARR | Med | CS |
| Multi-warehouse tier on the roadmap with a bridge offer (manual multi-site config + roadmap letter) for accounts opening site #2 | Product ceiling | ~4 accounts / $95K ARR | High | Product |
| Champion-change playbook: detect departure, re-onboard the successor within 30 days | Champion loss | ~3 accounts / $55K ARR | Low | CS |

**Priority call:** The champion-change playbook — lowest effort, immediately deployable, and it protects the *existing* base this quarter while the product ceiling fix (the bigger prize) takes two quarters to ship.

## What We Don't Know (Data Gaps)

- Exit survey response rate is 38% — reasons for 26 of 42 accounts rest on CSM notes, which skew toward relationship explanations over product ones
- No usage telemetry for the 2023-and-earlier cohort (instrumented in Jan 2024) — early-warning thresholds are calibrated on newer accounts only
- Involuntary churn (7 accounts) has no dunning data — we can't yet say how many were recoverable payment failures

---

## Why it's shaped this way

- **The denominator is the starting cohort (480), not year-end count** — the skill's anti-pattern list bans the flattering version of the math.
- **NRR sits beside gross churn in the headline table** because 7.1% gross alone would look healthy while the base quietly treads water; 102.4% tells the truer story.
- **Interventions target only the avoidable 57%** — the acquisitions and shutdowns are reported, then excluded, exactly as the category table demands.
- **Every intervention row names the reason it addresses** — the skill bans recommendations without a root-cause match, so "improve product marketing"-style orphans don't appear.
- **The segment section leads with the over-indexing cell (2024 SMB cohort)**, not tier averages — averages are what the anti-patterns call out as hiding the pattern.
- **The priority call picks the low-effort playbook over the big product fix** — a realistic tension: the largest ARR driver is *not* the first move, and the report says why.
- **Data gaps admit the 38% survey response rate up front**, per the anti-pattern about exit-survey self-selection — the reasons table is presented as evidence, not gospel.
