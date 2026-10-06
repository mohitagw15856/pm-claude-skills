# Example: cs-health-scorecard

## What this skill does

Scores one account's health across adoption, engagement, outcomes, support and commercial dimensions, producing a weighted RAG score, the key risks and the actions that would move it.

## How to trigger it

### Example 1: scoring before a renewal

**You say:**
> "Health scorecard for [Account]: £95k ARR, renews in 90 days. 70% of licences active weekly, champion left last month, 2 open P2 tickets, they hit their rollout milestone, no exec sponsor meeting in 6 months."

**Claude produces (excerpt):**

# Customer Health Scorecard: [Account]

**ARR:** £95,000 | **Days to renewal:** 90
**Overall health:** Amber, 64/100

## Health Score Summary

| Dimension | Score (1-5) | Weight | Weighted | Trend |
|---|---|---|---|---|
| Product Adoption | 4 | 30% | 24 | → |
| Engagement | 2 | 20% | 8 | ↓ |
| Outcomes | 4 | 20% | 16 | ↑ |
| Support Health | 3 | 15% | 9 | → |
| Commercial | 2 | 15% | 7 | ↓ |
| **Total** | | | **64/100** | |

## Key Risks
1. **Champion vacancy** (Engagement 2): the person who ran your business case has gone; no successor identified.
2. **Exec sponsor dormant** 6 months: renewals above £75k at this account historically require sponsor sign-off.

## Recommended Actions
| Action | Owner | By |
|---|---|---|
| Identify and enable successor champion from the 12 weekly power users | [CSM] | 2 weeks |
| Outcomes review meeting with the sponsor, led by the rollout milestone result | [CSM + AE] | 30 days before renewal |

### Example 2: the same account, 60 days later

**You say:**
> "Re-score: new champion identified and trained, sponsor meeting booked, one P2 closed, weekly active steady at 72%."

**Claude produces (excerpt):**

**Overall health:** Green, 78/100 (Engagement 2→4, Support 3→4).

**Watch item:** the score now depends on one person again; the succession risk that bit you is structural. Add a second trained admin as a standing objective, not a crisis response.

## Tips for best results

- Give evidence per dimension, even rough: a number beats an adjective in every row.
- Name the renewal date first; weights mean different things at 300 days and at 30.
- Re-score on a cadence; trend arrows carry more signal than any single score.

## Related skills

- `cs-escalation-brief` when a Red dimension needs executive help now
- `renewal-playbook` to turn an Amber score into a renewal motion
