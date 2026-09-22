# Route-bench — which router finds the right skill?

Generated 2026-09-22 by `skillbench/route-bench.mjs`. Ground truth: `evals/cases.json` (one curated ask per skill). A route is **top-1** when the router's pick is the case's skill, **top-3** when it is among the pick and the two alternatives.

| Method | Cases | Top-1 | Top-3 | Median ms | Model calls / route |
|---|---:|---:|---:|---:|---:|
| keyword | 271 | 50.9% | 64.2% | 9 | 0 |
| worker · adapter:claude-haiku-4-5 (not Jev) | 271 | 62.4% | 64.9% | 2420 | 2 |

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

**worker · adapter:claude-haiku-4-5**
- wanted `prd-template`, got `referral-program`
- wanted `cs-health-scorecard`, got `churn-analysis`
- wanted `executive-summary`, got `ab-test-readout`
- wanted `competitive-analysis`, got `competitor-teardown`
- wanted `roadmap-narrative`, got `strategic-narrative-generator`
- wanted `okr-builder`, got `metric-tree-builder`
- wanted `go-to-market`, got `go-to-market-planner`
- wanted `assumption-mapper`, got `assumption-audit`
- wanted `resume`, got `metric-tree-builder`
- wanted `prompt-optimizer`, got `ai-agent-reliability`

**Read the adapter row honestly.** It is the same two-stage pack → skill routing answered by `claude-haiku-4-5` through the hosted worker (TypeSafe signups are closed and both gateways want a card, so no Jev row yet). It beats the keyword floor by 11.5 points on top-1 at ~2.4 s a route; top-3 barely moves because the adapter lists at most 8 options. A Jev row goes in the moment a credential exists: `JEV_API_KEY=… node skillbench/route-bench.mjs --write`.

Cost basis for the model rows: published input price per million tokens × tokens per route (pack criteria ≈ 6k, skill criteria ≈ 4–25k). Latency is end-to-end from this machine. Re-run with `JEV_API_KEY` set to fill the model rows; the keyword row is the floor every router must beat.
