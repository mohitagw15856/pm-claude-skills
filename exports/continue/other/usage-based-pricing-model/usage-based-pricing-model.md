---
name: "Design a usage-based pricing scheme that scales revenue with"
description: "Design a usage-based pricing scheme that scales revenue with value without scaring customers away — the metric that tracks value, tiers with included volume, and the guardrails that prevent bill shock. Use when asked to design usage-based or metered pricing, move from seats to consumption, price an API or AI product per unit, or handle customers afraid of variable bills. Produces the value-metric selection, the tier structure with included volumes and overage rates, the bill-shock guardrails, revenue modelling at usage percentiles, and the migration plan from the current model."
---

# Usage-Based Pricing Model

Usage pricing done right means revenue grows when the customer's value grows. Done wrong it means a customer opens an invoice ten times last month's, screenshots it, and churns publicly. The difference is rarely the rate — it is whether the metric tracks value the customer recognises, and whether the guardrails make the worst-case bill survivable. This designs both, and models the revenue before you commit.

## What This Skill Produces

- **The value-metric decision** — the unit you charge for, tested against the four criteria that separate a good meter from a resented one
- **The tier structure** — included volumes, overage rates, and the flat platform fee that stabilises revenue
- **Bill-shock guardrails** — caps, alerts, forgiveness policies, and the commit-and-drawdown option for predictability-hungry buyers
- **Revenue modelling** — projected revenue at the P10/P50/P90 of the actual usage distribution, not at the average
- **The degenerate-case check** — who wins and who loses at the extremes of the usage curve, before a customer finds out for you
- **A migration plan** — how existing customers move from the current model without a revolt

## Required Inputs

Ask for these if not provided:
- **The product and what "usage" means in it** — API calls, seats, tokens, GB, transactions, jobs, minutes
- **The usage distribution** — real percentiles across current customers if they exist (P10/P50/P90/P99), or honest estimates
- **The cost structure** — marginal cost per unit of usage, so the floor is known
- **The current model and its problem** — what pricing exists today and what is breaking (leaving money on big accounts, scaring small ones, misaligned with value)
- **The buyer** — who approves the bill, and how much variance their budget process tolerates

## Framework: Metric, Tiers, Guardrails, Model

1. **Choose the metric against four tests.** (a) It rises when the customer gets more value; (b) the customer can predict and control it; (c) you can meter it accurately and explain the meter; (d) it does not punish behaviour you want (charging per user punishes adoption; charging per API call punishes integration depth). Most usage-pricing failures are metric failures, not rate failures.
2. **Anchor with a platform fee.** A flat base with included volume stabilises your revenue and their budget. Pure per-unit pricing makes every invoice a re-decision.
3. **Set tiers on the real distribution.** Included volumes sit at natural breakpoints in the usage percentiles — not round numbers. The tier a customer lands in should feel like a description of them, not a trap.
4. **Price overage as a bridge, not a fine.** Overage slightly above the effective in-tier rate nudges upgrades; overage at multiples of it reads as punishment and produces the screenshot.
5. **Build the guardrails before launch.** Spend alerts at thresholds the customer sets, a soft cap or auto-upgrade at tier boundaries, first-incident forgiveness for a runaway bill, and an annual commit-with-drawdown for buyers who need a fixed number. The guardrails are the product's answer to "what's the worst that happens?" — have one.
6. **Model revenue at the percentiles.** Run the proposed scheme against P10/P50/P90 usage. Average-based modelling hides that the top decile funds everything and the bottom quartile may cost more to bill than it pays.
7. **Check the degenerate cases.** The customer at 100× median usage, the one at near-zero, the one whose usage spikes 20× for one day. Decide the policy for each now, in writing.

## Output Format

### Usage pricing model: [product] · [date] · v[n]

**Value metric:** [unit] · **Why:** [the four tests, answered in one line each]
**Rejected metrics:** [alternative — which test it failed]

**Tier structure**
| Tier | Platform fee | Included volume | Overage rate | Lands who |
|---|---|---|---|---|
| [name] | [amount]/mo | [n units] | [rate]/unit | [the percentile band this describes] |

**Effective rate curve:** at P10 usage [rate/unit] · P50 [rate] · P90 [rate] — [flag any point where a heavier user pays a *higher* effective rate, which inverts the volume expectation]

**Guardrails**
- Alerts: [customer-set thresholds, default on at n% of included volume]
- Cap behaviour: [hard stop / soft cap with auto-upgrade / uncapped with alert]
- Forgiveness: [first-incident policy for runaway usage, stated before it happens]
- Predictability option: [annual commit with drawdown / fixed tier with true-up]

**Revenue model**
| Scenario | Customers | Revenue/mo | vs current model |
|---|---|---|---|
| P10 usage | | | |
| P50 usage | | | |
| P90 usage | | | |
**Margin floor:** marginal cost [x]/unit against lowest effective rate [y]/unit → [safe / underwater at tier n]

**Degenerate cases:** [100× median: policy] · [near-zero: policy] · [20× one-day spike: policy]

**Migration:** [grandfathering window · mapping from old plans · the message, led by who gets cheaper] · **Expected revolt risk:** [which segment pays more, by how much, and the offer that softens it]

## Quality Checks
- [ ] The metric passes all four tests, and rejected alternatives are recorded with the failing test
- [ ] Tiers are placed on the real usage distribution, not round numbers
- [ ] The effective rate falls (or holds) as usage grows — no inversion where heavy users pay more per unit
- [ ] Every guardrail exists in the design before launch, not as a support policy invented after the first incident
- [ ] Revenue is modelled at percentiles, with the current model as the comparison column
- [ ] The margin floor is checked against the lowest effective rate
- [ ] The three degenerate cases have written policies
- [ ] The migration names who pays more and what they are offered

## Anti-Patterns
- **Choosing the meterable metric over the valuable one.** You can meter API calls precisely; if value lives in outcomes, the customer resents every call.
- **Pricing on the average customer.** The usage distribution is heavy-tailed; the average customer barely exists.
- **Overage as a fine.** Overage at 5× the in-tier rate produces the invoice screenshot that becomes your pricing page's reputation.
- **No answer to "what's the worst case?"** A buyer who cannot bound the bill will not sign, and the one who does not ask will churn when it happens.
- **Punishing adoption.** Per-seat metering on a collaboration product taxes the behaviour that retains the account.
- **Launching without the forgiveness policy.** The first runaway bill is a certainty; deciding the response during the incident guarantees it goes badly.
- **Migrating everyone at once with a price rise buried inside.** The model change takes the blame for the increase, and both die together.

## Example Trigger Phrases
- "Design usage-based pricing for our API"
- "We want to move from per-seat to consumption pricing"
- "How do we price our AI product per token without bill shock?"
- "Customers are afraid of variable bills — what guardrails do we need?"
- "Model what usage pricing would do to our revenue"
