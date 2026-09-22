# Route-bench — which router finds the right skill?

Generated 2026-09-22 by `skillbench/route-bench.mjs`. Ground truth: `evals/cases.json` (one curated ask per skill). A route is **top-1** when the router's pick is the case's skill, **top-3** when it is among the pick and the two alternatives.

| Method | Cases | Top-1 | Top-3 | Median ms | Model calls / route |
|---|---:|---:|---:|---:|---:|
| keyword | 267 | 51.7% | 65.2% | 10 | 0 |

## Sample misses

**keyword**
- wanted `rice-prioritisation`, got `onboarding-copy`
- wanted `prd-template`, got `referral-program-design`
- wanted `cs-health-scorecard`, got `last-30-days-research`
- wanted `executive-summary`, got `onboarding-copy`
- wanted `competitive-analysis`, got `run-an-agent-team`
- wanted `roadmap-narrative`, got `agent-readiness-audit`
- wanted `okr-builder`, got `care-team-coordinator`
- wanted `go-to-market`, got `marketplace-listing-optimizer`
- wanted `churn-analysis`, got `saas-metrics`
- wanted `ab-test-planner`, got `pricing-strategy`

Cost basis for the model rows: published input price per million tokens × tokens per route (pack criteria ≈ 6k, skill criteria ≈ 4–25k). Latency is end-to-end from this machine. Re-run with `JEV_API_KEY` set to fill the model rows; the keyword row is the floor every router must beat.
