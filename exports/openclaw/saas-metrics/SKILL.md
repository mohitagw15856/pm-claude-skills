---
name: saas-metrics
description: "Compute the core SaaS metrics — MRR/ARR, growth, NRR/GRR, churn, quick ratio, magic number — from your numbers. Use when asked to calculate SaaS metrics, MRR/ARR, net revenue retention, the quick ratio, or to build a SaaS metrics snapshot for a board/investor update. Produces a computed metrics dashboard with each value, its benchmark, and a one-line read on what it means."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/saas-metrics.html
metadata:
  {
    "openclaw": { "emoji": "🧮" }
  }
---

# SaaS Metrics Skill

Investors and boards judge a SaaS business on a standard metric set — and getting the definitions
right matters as much as the numbers. This skill computes MRR/ARR, growth, net and gross revenue
retention, churn, the quick ratio, and the magic number from your movement data, each with its
benchmark and a plain read — so a board update or investor snapshot is correct and defensible.

## Required Inputs

Ask for these only if they aren't already provided:

- **Starting MRR** and the month's movement: **new**, **expansion**, **contraction**, **churned** MRR.
- **Customer counts** (start, churned) if you want logo churn too.
- **S&M spend** (prior period) if you want the magic number.
- Or just paste what you have — the skill computes what the inputs allow and flags the rest.

## Output Format

### SaaS Metrics: [company], [period]

A computed dashboard (use the helper script):

| Metric | Value | Benchmark | Read |
|---|---|---|---|
| MRR / ARR | | | |
| MRR growth % | | | |
| **Net Revenue Retention** | | ≥ 100% (great ≥ 110%) | |
| Gross Revenue Retention | | ≥ 90% | |
| Revenue churn % | | | |
| **Quick ratio** ((new+exp)/(churn+contr)) | | ≥ 4 strong | |
| Magic number (if S&M given) | | ≥ 0.75 efficient | |

**What it says** — 2–3 lines: the health story the numbers tell, and the one metric to fix first.

**Definitions used** — state each formula explicitly (NRR *excludes* new customers; GRR caps at 100%), so the numbers are comparable and audit-proof.

## Programmatic Helper

`scripts/saas_metrics.py` (stdlib only) computes the set from the MRR movement:

```bash
# in.json: {"starting_mrr":100000,"new":12000,"expansion":6000,"contraction":2000,"churned":4000,"sm_spend_prior":40000}
python3 scripts/saas_metrics.py in.json
python3 scripts/saas_metrics.py in.json --json
```

## Quality Checks

- [ ] NRR excludes new MRR (it measures the existing base only) — the most-botched definition
- [ ] GRR is capped at 100% (it can't exceed retention of what you had)
- [ ] Each metric is shown against its standard benchmark
- [ ] The formulas used are stated, so the numbers are comparable across reports
- [ ] Metrics that can't be computed from the given inputs are flagged, not guessed

## Anti-Patterns

- [ ] Do not include new customers in NRR — that's a different (and misleadingly flattering) number
- [ ] Do not mix monthly and annual figures without converting — label MRR vs ARR clearly
- [ ] Do not report a metric without its definition — "120% retention" is meaningless without the formula
- [ ] Do not vanity-pick metrics — show churn and contraction alongside the growth numbers
- [ ] Do not present computed values to false precision — round sensibly and flag assumptions

## Based On

Standard SaaS metrics definitions (Bessemer / a16z / KeyBanc) — NRR/GRR, quick ratio, magic number.

## Example Trigger Phrases

- "Calculate our SaaS metrics."
- "Work out MRR and ARR."
- "What's our net revenue retention?"
- "Build a SaaS metrics snapshot for the board."
