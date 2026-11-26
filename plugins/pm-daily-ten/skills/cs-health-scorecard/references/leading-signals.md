# Health Signals That Lead (Instead of Eulogise)

Most account health scores are lagging — they turn red when the account is already gone. The craft is weighting signals by *lead time*: how many days before churn does each one move?

## The signal hierarchy by lead time

| Signal | Typical lead | Notes |
|---|---|---|
| **Champion departure/silence** | 90-180 days | The single most predictive event nobody instruments; track your named contacts' engagement, not just the account's |
| **Breadth contraction** | 90-120 days | Seats active, teams using, features touched — shrinking breadth precedes shrinking usage |
| **Login/value-action frequency dip** | 60-90 days | vs the ACCOUNT'S OWN baseline, not the global average — a weekly-cadence account at weekly is fine; a daily account gone weekly is on fire |
| **Support tone shift** | 60-90 days | Volume matters less than register: "how do I…" (engaged) vs "why does it…" (frustrated) vs silence after complaints (gone) |
| **Renewal-adjacent behaviours** | 30-60 days | Data exports, permission audits, "just checking on our contract terms" |
| NPS/CSAT scores | weak, noisy | Use verbatims as colour, never as the number that drives the score |

## The quiet-account problem

The deadliest churn files zero tickets. Any scorecard where "no support contact" adds health points is scoring abandonment as satisfaction. Silence + usage decline = the reddest signal there is; weight it so.

## Baselining per account

Every frequency signal is relative to the account's own steady state (first 90 days post-onboarding, or trailing 6-month median). Global thresholds mislabel every naturally-light-usage segment as dying and every heavy segment's decline as fine.

## Score mechanics that stay honest

- Weights sum visibly; every dimension shows its raw value alongside the weighted contribution (a hidden blend is unauditable)
- The score never overrides a red flag: champion-left forces at-risk regardless of the blended number — some signals are gates, not addends
- Back-test annually: run the current formula against last year's churned accounts. What % were red 90 days out? That number IS the scorecard's worth; below ~60%, redesign rather than re-weight.
