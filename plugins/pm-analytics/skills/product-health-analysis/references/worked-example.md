# Worked Example — Product Health Analysis

A gold-standard run of this skill: a month of mixed dashboard signals turned into a health verdict a leadership team can act on — including the uncomfortable finding that the "best" metric is the problem.

## The brief

Lanewise — a fictional supply-chain SaaS — sells dock-scheduling and carrier-visibility software to mid-market manufacturers. 1,140 active accounts. In March 2026 the team launched self-serve signup alongside the existing sales-led motion; May is the second full month of blended data. The growth lead is celebrating a record acquisition month, but the PM, Ines Vidal, has noticed churn ticking up and wants a monthly health report for the June leadership review. Targets come from the 2026 OKRs. Period: May 2026, whole product.

## The output

### Product Health Report — May 2026 (Lanewise, whole product)

**Overall Health:** 🔴 Action Required

| Metric | Current | Target | vs. Last Period | Status |
|--------|---------|--------|-----------------|--------|
| New accounts (Acquisition) | 212 | 150 | +64% | 🟡 |
| Onboarding completion, 14-day (Activation) | 31% | 55% | −27pts | 🔴 |
| Time to first scheduled dock slot (Activation) | 9.2 days | 4.0 days | +5.1 days | 🔴 |
| DAU/MAU (Engagement) | 24% | 30% | −3pts | 🟡 |
| Carrier-portal adoption (Engagement) | 41% | 40% | +2pts | 🟢 |
| D30 retention (Retention) | 71% | 85% | −15pts | 🔴 |
| Monthly logo churn (Retention) | 2.9% | 2.0% | +1.1pts | 🔴 |

**Key Observations:**

- We signed up more new accounts in May than any month in company history — and that is the root of the problem, not the good news. Self-serve accounts now make up 61% of new signups, and only 12% of them complete onboarding, against 61% for sales-led accounts. The blended 31% activation figure is two opposite stories averaged together.
- Acquisition is marked 🟡 despite beating target by 64%, because the 150/month target was set before self-serve existed and says nothing about account quality. Hitting it with accounts that never activate is not health.
- The D30 retention drop (86% → 71%) is not a May event. It is April's activation collapse arriving on schedule: the accounts that failed to schedule a dock slot in their first two weeks of April are the ones churning at day 30 in May. Sales-led D30 retention is unchanged at 87%.
- Carrier-portal adoption (41%) is genuinely good news, and it matters commercially: accounts using the carrier portal churn at 0.9%/month versus 4.6% for accounts that never open it.
- Engagement (DAU/MAU 24%) is drifting down mechanically as low-intent self-serve accounts enter the denominator — established accounts' usage is flat. Watch, don't panic.

**Areas Requiring Investigation:**

1. **Self-serve activation (12% completion).** Hypothesis: onboarding was designed for CSM-led setup — step 2 asks for a carrier data import that sales-led customers get done *for* them, and self-serve users hit it alone on day one. Diagnostic: funnel step breakdown of the 186 May self-serve signups plus 5 session recordings of users abandoning at the import step. Owner: onboarding squad, by June 12.
2. **D30 retention → activation linkage.** Hypothesis: retention is fully explained by the activation gap, not by a separate product problem. Diagnostic: cohort D30 retention split by "completed onboarding vs. not" — if completed-onboarding retention holds at ~85% across both motions, retention needs no separate fix. Owner: data analyst (R. Okonjo), by June 10.
3. **Churn concentration.** Hypothesis: the churn uptick to 2.9% is concentrated in accounts that never adopted the carrier portal. Diagnostic: cross-tab of May churned accounts by portal adoption and acquisition motion; if confirmed, portal adoption becomes the activation milestone we push in onboarding. Owner: Ines Vidal, by June 12.

**Recommended Actions:**

- **Redefine the acquisition target as "activated accounts/month" (proposal: 90)** — Growth lead (M. Tan), proposal to June leadership review. Stops rewarding volume that churns.
- **Ship a self-serve import path or a "skip import, use sample data" branch in onboarding step 2** — Onboarding squad, scoped by June 19, contingent on investigation #1 confirming the drop-off step.
- **Hold retention work until investigation #2 reports** — if retention is downstream of activation, a separate retention initiative would treat the symptom. Decision owner: Ines Vidal, June 13.

## Why it's shaped this way

- **Acquisition is 🟡 while 64% over target** — the anti-patterns forbid flagging a metric healthy "just because it is above the target — check if the target itself is meaningful"; the report says outright that the target predates self-serve and proposes replacing it.
- **Every blended number is split by motion (self-serve vs. sales-led)** — the anti-patterns ban single aggregates because "averages hide opposing trends"; the 31% activation figure is shown to be 12% and 61% averaged, which is the report's central finding.
- **The retention drop is explained by a correlation, not just flagged** — Process step 3 asks whether "a drop in activation explain[s] a retention dip 2 weeks later"; here April's activation collapse is named as the cause of May's D30 dip, and investigation #2 exists to confirm it before anyone funds a retention project.
- **Each flagged metric carries a hypothesis and a diagnostic, not just a delta** — the quality checks require "a root cause hypothesis, not just 'it dropped'"; even the DAU/MAU drift gets a mechanical explanation (denominator dilution) and an explicit "watch, don't panic."
- **Every action has a named owner and a date** — Process step 6 validates that "every recommended action has a specific owner or team"; the third action is deliberately a *decision to wait*, gated on evidence, rather than reflexive work.
- **Observations read as plain English** — per Process step 4 and the quality checks, there is no query language or funnel jargon; "April's activation collapse arriving on schedule" is a sentence a CFO can repeat.
- **The 🔴 overall rating is justified against a record acquisition month** — the quality checks demand the overall rating be "justified with specific evidence"; churn and retention misses outweigh a vanity acquisition beat, and the report says why.
