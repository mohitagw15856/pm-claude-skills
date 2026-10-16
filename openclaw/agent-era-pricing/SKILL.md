---
name: agent-era-pricing
description: "Redesign seat-based pricing for the agent era — when one human runs ten agents, per-seat models collapse. Use when agents are eroding seat counts, when asked to migrate to usage- or outcome-based pricing, to price an agent/API tier, or to defend revenue as customers automate their own usage. Produces a pricing migration plan: the new value metric, fences, agent-tier design, cannibalisation math, and a phased migration for existing customers. For general pricing and packaging strategy use pricing-strategy."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/agent-era-pricing.html
metadata:
  {
    "openclaw": { "emoji": "🦾" }
  }
---

# Agent Era Pricing Skill

Seat pricing quietly assumed the user was a human who logs in. Agents break the assumption from both sides: your customers need fewer seats (one operator, ten agents), and your product gets *more* usage than ever. This skill redesigns the model around a value metric that survives non-human users — without torching existing revenue on the way.

## What This Skill Produces

- A **value-metric decision**: what you charge for when seats stop proxying value
- **Agent-tier design**: how agent/API usage is packaged, fenced, and priced
- **Cannibalisation math**: what happens to current revenue under the new model, computed on real cohorts
- A **phased migration plan** for existing customers, with the grandfathering decision made explicitly

## Required Inputs

Ask for (if not already provided):
- **Current model**: plans, price points, seat definitions, current API/automation pricing if any
- **The evidence of pressure**: seat contraction, API traffic growth, customer asks, competitor moves
- **Unit economics**: cost to serve a seat vs an API call/agent action (rough is fine, labelled)
- **3-5 representative customer profiles** with seat counts and usage (the cannibalisation test set)

## Method

1. **Find the value metric that survives agents.** Test candidates against three questions: does it scale with the value the *customer* receives (not your costs)? · is it counted identically whether a human or agent drives it? · can the customer predict their bill? Strong candidates are usually *outcomes or work-objects* (invoices processed, tickets resolved, campaigns run, records enriched) — not raw API calls (unpredictable, punishes retries) and not seats (dying assumption).
2. **Price the human and the agent differently, deliberately.** The durable pattern is a hybrid: a **platform/human layer** (flat or few-seats — access, admin, support) plus a **work layer** priced on the value metric, agnostic to who did the work. Decide where agents authenticate: agent traffic on a user's token counted as that user's work, not as a "seat".
3. **Design the fences.** What separates tiers now that seats don't: volume bands on the value metric, rate/concurrency limits, SSO/audit/compliance (still human-org fences), model/automation quality tiers. Every fence must be *measurable* and *hard to game* — name the gaming vector for each and why it's acceptable.
4. **Run the cannibalisation math on real cohorts.** For each customer profile: current annual price vs new-model price at current usage, at 2× automation, at 5×. Sum to a revenue bridge. If the new model loses money on your best cohort, the metric or the bands are wrong — fix the model, don't hide the row.
5. **Phase the migration.** New customers first (cleanest signal) → opt-in for existing (with a calculator showing their number) → forced migration only with long notice and a cap ("no more than X% increase in year one"). Grandfathering is a *decision with a cost*, not a default: state what perpetual legacy plans cost in five years.
6. **Set the tripwires.** Which metrics reprice this model: value-metric inflation/deflation, gaming detected, agent share of traffic crossing thresholds. Pricing in the agent era is a program, not a project.

## Output Format

### Agent-Era Pricing Plan: [product]

**Diagnosis:** [the seat-erosion evidence, quantified]
**Value metric:** [chosen metric] — because [the three-question test, answered]. Rejected: [runner-up + why].

**The model**
| Layer | What's included | Priced on | Tiers/bands |
|---|---|---|---|
| Platform (humans) | | | |
| Work (human or agent) | | | |

**Fences:** [fence → what it separates → gaming vector → why acceptable]

**Cannibalisation bridge**
| Cohort | Today | New @ current usage | New @ 2× automation | Δ |
|---|---|---|---|---|

**Migration:** [phase → who → when → the cap/grandfather decision, stated]
**Tripwires:** [metric → threshold → action]

## Quality Checks

- [ ] The value metric passes all three tests (customer value · human/agent-agnostic · predictable)
- [ ] Cannibalisation is computed on the provided cohorts, not asserted — assumptions labelled
- [ ] Every fence names its gaming vector
- [ ] The migration includes an explicit grandfathering decision with its long-run cost
- [ ] Agent authentication/attribution is specified — whose usage is whose bill

## Anti-Patterns

- [ ] Do not price raw API calls as the value metric — unpredictable bills punish exactly the automation you want to encourage
- [ ] Do not bolt an "agent seat" onto seat pricing — an agent is not a discount human; the assumption is what broke
- [ ] Do not present only the happy cohort — the bridge shows the losers or it isn't math
- [ ] Do not force-migrate loyal customers without a year-one cap — churn from pricing anger costs more than the uplift
- [ ] Do not skip tripwires — a static price in a shifting usage regime is a slow leak in one direction or the other

## Example Trigger Phrases

- "Migrate to usage-."
- "Price an agent/API tier."
- "Defend revenue as customers automate their own usage."
