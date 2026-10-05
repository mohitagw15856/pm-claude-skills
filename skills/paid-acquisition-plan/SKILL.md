---
name: paid-acquisition-plan
description: "Plan a paid acquisition / performance marketing program with unit economics that work. Use when asked to plan paid media, allocate an ad budget across channels, set CAC/LTV targets, or structure a creative-testing program. Produces a paid acquisition plan — economic guardrails (CAC/LTV/payback), channel allocation, account & campaign structure, a creative testing plan, the measurement approach, and scale/kill rules."
---

# Paid Acquisition Plan Skill

Paid acquisition is buying customers — it only works if you buy them for less than they're worth, and
most plans skip that math. This skill starts from the unit economics (CAC ceiling from LTV and payback),
then allocates budget, structures testing, and sets the rules for when to scale a channel and when to kill it.

## Required Inputs

Ask for these only if they aren't already provided:

- **Economics** — average revenue/LTV per customer, gross margin, and acceptable payback period.
- **Current state** — channels running, current CAC and volume (or that you're starting cold).
- **Budget & goal** — monthly budget and the target (new customers, pipeline, signups).
- **Offer & assets** — what you're advertising and the creative/landing pages available.

## Output Format

### Paid Acquisition Plan: [product]

**1. Economic guardrails** — derive the **max allowable CAC** from LTV × margin ÷ payback target; state the target ROAS and the blended CAC ceiling. Every channel decision flows from this.

**2. Channel allocation** — a table; weight toward intent and proven channels, reserve a test budget for new ones.

| Channel | Role (intent vs. demand-gen) | Budget % | Target CAC | Why |
|---|---|---|---|---|

**3. Account & campaign structure** — how campaigns/ad sets are organised (by intent, audience, or product), and the budgeting method (e.g. consolidated vs. granular).

**4. Creative testing plan** — the testing cadence, what varies (hook, format, offer, audience), how many concepts per cycle, and the decision rule for a winner. Creative is the biggest lever in modern paid — treat it as the experiment.

**5. Measurement** — conversion tracking, the attribution approach **and its limits**, incrementality testing (geo holdout / lift) for channels that claim credit they didn't earn.

**6. Scale & kill rules** — the metric thresholds to increase budget on a winner and to cut a loser, and how fast to move (avoid thrashing the learning phase).

## Quality Checks

- [ ] A max-allowable CAC is derived from LTV, margin, and payback — not picked arbitrarily
- [ ] Budget is weighted toward intent/proven channels with a fenced test budget for new bets
- [ ] Creative testing has an explicit cadence and a winner decision rule
- [ ] Attribution limits are acknowledged and incrementality testing is planned for big-spend channels
- [ ] Explicit scale and kill thresholds exist, so decisions aren't emotional

## Anti-Patterns

- [ ] Do not set budgets before deriving the CAC ceiling from unit economics — spending you can't recoup is just buying revenue at a loss
- [ ] Do not trust platform-reported conversions as truth — every channel over-claims; verify with incrementality
- [ ] Do not under-invest in creative testing — in modern paid, creative beats targeting as the primary lever
- [ ] Do not scale a winner or kill a loser inside the learning phase — let it gather signal first
- [ ] Do not spread a small budget across many channels — concentrate until a channel proves out

## Based On

Performance-marketing practice — LTV/CAC and payback economics, incrementality testing, and creative-led experimentation.

## Example Trigger Phrases

- "Plan paid media."
- "Allocate an ad budget across channels."
- "Set CAC/LTV targets."
- "Structure a creative-testing program."
