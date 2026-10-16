---
name: demand-forecast-review
description: "Interrogate a demand forecast before the business commits supply and inventory to it. Use when asked to review a demand plan, challenge a forecast, check forecast accuracy, decompose baseline vs uplift, or find hockey sticks in the numbers. Produces a forecast credibility review with baseline/uplift decomposition, MAPE and bias history, hockey-stick flags, an assumption register, and consensus-vs-statistical divergence analysis."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/demand-forecast-review.html
metadata:
  {
    "openclaw": { "emoji": "📦" }
  }
---

# Demand Forecast Review Skill

Every unit of forecast becomes purchase orders, capacity commitments, and inventory. This skill interrogates a forecast the way a supply planner must: separate the defensible baseline from hopeful uplift, confront the forecast with its own accuracy history, hunt for hockey sticks, and register every assumption so that when the number misses, you know which belief broke.

## What This Skill Produces

- A baseline vs. uplift decomposition (statistical base + named uplift layers)
- Forecast accuracy history: MAPE and bias, with what they imply for buffering
- Hockey-stick and pattern-anomaly flags
- An assumption register with owner, evidence strength, and expiry
- Consensus vs. statistical divergence flags with a burden-of-proof call
- An overall credibility verdict: plan to it / plan to it with buffers / send back

## Required Inputs

Ask for these if not provided:
- **The forecast** — by product/family and period, over the horizon under review
- **History** — actuals for the trailing 12+ months; prior forecasts vs. actuals if available (for MAPE/bias)
- **Uplift drivers** — promotions, launches, new customers, pipeline deals baked into the number
- **Who built it** — statistical, sales-driven, consensus; and what changed since last cycle
- **Decision at stake** — what the forecast will commit (buy, build, capacity) and its lead time

With no accuracy history, review structure and assumptions and state plainly: `[accuracy unknown — treat forecast as unvalidated]`. Never present conclusions as if history existed.

## Interrogation Framework

**1. Decompose baseline vs. uplift.** Baseline = what history alone supports (trend + seasonality). Everything above it is an uplift layer that must be named: which promotion, which customer, which launch. Compute uplift share of total — above ~30% uplift, the forecast is a sales plan wearing a forecast's clothes, and each layer needs its own evidence.

**2. Confront accuracy history.**

| Metric | Read it as | Action threshold |
|---|---|---|
| MAPE (lag matched to decision lead time) | Noise level | >30% at family level: forecast can't carry item-level commitments |
| Bias (signed error, running) | Systematic lean | Same sign 3+ consecutive periods: correct the input, don't buffer around it |

Persistent over-forecast bias means excess inventory is being manufactured upstream; persistent under-forecast means service failures are planned in. Name which one this forecast has.

**3. Hunt hockey sticks.** Flag: quarter-end/year-end spikes with no order-book support; growth rates that jump beyond trailing actuals precisely when the plan needs them to; a ramp that has slipped right by one quarter in each successive cycle (the sliding hockey stick — the strongest sell-back signal there is).

**4. Register assumptions.** Every uplift and step-change gets a row: assumption, owner, evidence (order book / customer commitment / pipeline / hope), the period when reality will confirm or kill it, and the volume at stake if it fails.

**5. Flag consensus vs. statistical divergence.** Where consensus overrides the statistical line by >10%, the override carries the burden of proof. Check the track record: have past overrides beaten the stat model? If overrides historically added error, recommend planning supply to the statistical line and treating the delta as upside to option, not to stock.

## Output Format

### Forecast Review: [scope / cycle]

**1. Verdict** — plan to it / plan with stated buffers / send back for rework, and the one-paragraph why.

**2. Decomposition** — table: Period | Baseline | Uplift layer(s) | Total | Uplift %.

**3. Accuracy history** — MAPE and bias at the decision lag, trend, and the buffering implication.

**4. Flags** — hockey sticks, sliding ramps, anomalies vs. history, each with the volume at stake.

**5. Assumption register** — Assumption | Owner | Evidence strength (committed / probable / speculative) | Confirms by | Units at stake.

**6. Divergence analysis** — consensus vs. statistical by family; where overrides exceed 10%, the recommendation on which line supply should plan to.

**7. Questions for the demand owner** — the 3–5 questions that must be answered before commitment.

## Quality Checks

- [ ] Baseline and uplift separated, with uplift % computed and every layer named
- [ ] Accuracy metrics computed at the lag matching the commitment lead time — or absence declared
- [ ] Bias reported as signed and directional, not folded into MAPE
- [ ] Every hockey-stick flag cites the pattern evidence (order book, prior-cycle slippage)
- [ ] Every speculative assumption has an owner and a confirm-by date
- [ ] Verdict states what supply should actually plan to, not just critique

## Anti-Patterns

- [ ] Do not present a forecast without its historical accuracy — a number with no track record is a guess with a spreadsheet
- [ ] Do not treat persistent bias as noise to buffer — a lean that repeats is an input error to fix at source
- [ ] Do not let uplift hide inside the baseline — unnamed uplift is unaccountable uplift
- [ ] Do not accept "the ramp moved right but the year is intact" without flagging it — sliding ramps rarely land
- [ ] Do not judge accuracy at aggregate level for item-level buys — mix error is where the money is lost
- [ ] Do not soften the verdict to keep the S&OP meeting comfortable — supply commits real cash to this number

## Example Trigger Phrases

- "Review a demand plan."
- "Challenge a forecast."
- "Check forecast accuracy."
- "Find hockey sticks in the numbers."
