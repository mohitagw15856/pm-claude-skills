# Example: product-health-analysis

## What this skill does

Reads product metrics against goals and produces a health report: RAG status, plain-English observations, root-cause hypotheses with suggested diagnostics, and prioritised actions.

## How to trigger it

### Example 1: a monthly health review

**You say:**
> "Health report for [month]: WAU 41,200 (target 45k, last month 42,800), activation 34% (target 40%, flat), NPS 46 (target 45), p95 latency 410ms (target 300ms, was 280ms), support tickets per 1k WAU up 22%."

**Claude produces (excerpt):**

### Product Health Report: [month]
**Overall Health:** 🟡 Watch

| Metric | Current | Target | vs. Last Period | Status |
|---|---|---|---|---|
| WAU | 41,200 | 45,000 | -3.7% | 🟡 |
| Activation | 34% | 40% | flat | 🟡 |
| NPS | 46 | 45 | +1 | 🟢 |
| p95 latency | 410ms | 300ms | +46% | 🔴 |
| Tickets per 1k WAU | +22% | stable | up | 🔴 |

**Key Observations:**
- The latency regression and the ticket rise moved together this month; they are probably one problem, not two.
- WAU decline is within noise for one month but breaks a six-month growth run; watch, do not panic.
- NPS holding while experience degrades suggests the regression is recent; sentiment lags.

**Areas Requiring Investigation:**
1. p95 latency: hypothesis: the [date] search release; diagnostic: latency split by endpoint before/after that deploy.
2. Ticket mix: hypothesis: performance complaints; diagnostic: tag share of "slow/loading" tickets this month vs last.

**Recommended Actions:** fix latency before touching activation; a slow product makes every activation experiment read worse than it is. Owner: [platform lead], this sprint.

### Example 2: a PMF signal check

**You say:**
> "Early-stage: 9 weeks of data, D30 retention 24% and flattening, 31% of actives use it 4+ days/week, organic signups now 38% of new users. Healthy?"

**Claude produces (excerpt):**

**Overall Health:** 🟢 On Track (for stage)

- A flattening D30 at 24% is a retained base forming; the curve shape matters more than the level at this stage.
- 4+ days/week for a third of actives is habitual-use territory for a workday tool.
- Rising organic share is the classic early word-of-mouth marker; instrument "how did you hear" now while it is askable.

**The one metric to add:** time-to-first-[core action]; your next constraint will be activation, and you currently cannot see it.

## Tips for best results

- Give last period and target for every metric; RAG without both is decoration.
- Mention every ship and incident in the window; attribution needs the change log.
- Ask for hypotheses with diagnostics, not conclusions; the report should start investigations, not end them.

## Related skills

- `data-analysis-standard` to run one of the flagged investigations to root cause
- `metrics-framework` if the report keeps arguing about which metrics matter
