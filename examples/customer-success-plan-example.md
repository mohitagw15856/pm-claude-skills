# Example: customer-success-plan

## What this skill does

Builds a joint success plan for one account: the customer's business goals in their words, milestones with owners on both sides, success metrics and a 90-to-180-day roadmap.

## How to trigger it

### Example 1: a new enterprise onboarding

**You say:**
> "Success plan for [Account], 400-seat logistics firm, 12-month contract starting [date]. Their goal: cut invoice-processing time 40%. Champion is their finance ops lead; sponsor is the CFO. Rollout: AP team first, then two depots."

**Claude produces (excerpt):**

# Customer Success Plan: [Account]

**Contract term:** [start] → [renewal]
**Customer champion:** [Name], Finance Ops Lead | **Sponsor:** [Name], CFO

## 1. Partnership Objectives

[Account] processes ~3,200 supplier invoices a month across head office and two depots, largely by email and re-keying. Success at contract end is a 40% cut in processing time with no increase in payment errors.

**Primary business goal:** invoice processing time down 40% (baseline: 11 min/invoice, target: 6.6)
**Success statement (customer's words):** "[quote from champion, captured at kickoff]"

## 2. Success Metrics

| Metric | Baseline | 90-day target | Contract-end target |
|---|---|---|---|
| Minutes per invoice | 11 | 8.5 | 6.6 |
| % invoices auto-matched | 0% | 45% | 70% |
| Active AP users | 0 of 14 | 14 of 14 | 14 + both depots |

## 3. Milestones

| Milestone | Owner | Date |
|---|---|---|
| AP team live, historical data imported | [CSM] + [their IT] | day 21 |
| First monthly value review with baseline vs actual | [CSM] | day 45 |
| Depot 1 rollout go/no-go, gated on 45% auto-match | joint | day 90 |

### Example 2: refreshing a drifting plan

**You say:**
> "Mid-year check: auto-match is 52% but only 9 of 14 AP users are active and the depots haven't started. Update the plan honestly."

**Claude produces (excerpt):**

**Status:** Under review. Value metric on track; adoption is the risk.

**Revised next 90 days:**
1. Five inactive users: champion to pair each with an active user for one cycle (root cause from tickets: fear of mis-keying tax codes)
2. Depot rollout re-gated on 12 of 14 active, not on auto-match (already met)
3. Added risk: champion is 100% of internal training capacity; ask: name a deputy

**Note for the renewal narrative:** time per invoice already down 29%; quantify that in the CFO's terms (≈ [X] hours/month) at the next sponsor review.

## Tips for best results

- Capture the customer's goal as a number with a baseline, or the plan cannot prove anything later.
- Give every milestone one owner on each side; joint ownership means no ownership.
- Revisit at 90 days and rewrite honestly; a stale success plan is renewal risk in disguise.

## Related skills

- `cs-health-scorecard` to score the account against this plan as it runs
- `qbr-deck` to present the plan's results at the quarterly review
