---
trigger: model_decision
description: "Build a freight rate that covers the cost of actually running the load — the per-mile economics, the deadhead and detention nobody prices, and the accessorials that decide whether the lane is profitable. Use when asked to quote a freight rate, price a lane, work out cost per mile, decide whether to accept a load, or explain why a lane is losing money. Produces the fully-loaded cost per mile, the lane economics including empty miles, the accessorial schedule, the break-even and target rate, and the accept-or-decline recommendation."
---

# Freight Rate Quote

Lanes lose money on the miles nobody billed for. The rate looks fine on the loaded leg, then deadhead, detention, and a reload that took two days turn a profitable quote into a loss. This builds the rate from a real cost per mile, prices the empty and waiting time honestly, and produces a number that either covers the load or tells you to decline it.

## What This Skill Produces

- **Fully-loaded cost per mile** — fixed and variable, including the costs usually left out
- **Lane economics** — loaded and empty miles, transit time, and the realistic reload position at destination
- **The accessorial schedule** — detention, layover, extra stops, and the terms that make them collectable
- **Break-even and target rate** — the floor, the target, and the margin between them
- **The accept-or-decline call** — with the reasoning, including when a below-target rate is still correct
- **The sensitivity view** — what happens to the margin if fuel, detention, or the reload assumption moves

## Required Inputs

Ask for these if not provided:
- **The lane** — origin, destination, distance, and frequency
- **The load** — weight, commodity, equipment type, and any special requirements
- **Your cost base** — fixed costs per vehicle, and variable costs per mile
- **The reload position** — what typically comes out of the destination market, and how long it takes to find
- **The terms** — payment days, detention terms, fuel surcharge basis, and who the customer is

## Framework: Cost Per Mile, Then Every Mile You Actually Drive

1. **Build cost per mile from both halves.** Fixed costs — payments, insurance, licensing, overhead — divided by realistic annual miles, plus variable costs: fuel, tyres, maintenance, driver pay per mile.
2. **Use realistic annual miles.** Optimistic utilisation is the single most common error in fleet costing; it understates fixed cost per mile across the whole business.
3. **Price the deadhead.** Empty miles to pick up and away from delivery are real miles. A rate quoted on loaded miles alone is a rate quoted on a fiction.
4. **Price the time, not just the distance.** A 400-mile run that consumes two days because of a difficult delivery window costs more than an 800-mile run that flows.
5. **Assume detention will happen and make it collectable.** Detention priced but not documented is detention not paid. The terms and the evidence requirement matter more than the rate.
6. **Weigh the reload.** A good rate into a dead market is worse than a modest rate into a strong one. Total round-trip revenue per day is the honest measure.
7. **Know your floor and say no below it.** A lane run below break-even to keep a truck moving loses money faster than a parked truck.

## Deeper Material

- **[`references/worked-example.md`](references/worked-example.md)** — a Manchester–Aberdeen round that looks excellent per loaded mile and merely acceptable per day. Read it when the shape of a good output is unclear, or to calibrate how specific the entries should be.

## Output Format

### Rate quote: [lane] · [equipment] · [date]

**Cost per mile**
| Fixed (annual) | Amount |  | Variable (per mile) | Amount |
|---|---|---|---|---|
| Payments/depreciation | | | Fuel | |
| Insurance | | | Tyres | |
| Licensing/permits | | | Maintenance | |
| Overhead allocation | | | Driver pay | |
| **Total fixed** | | | **Total variable** | |
Realistic annual miles: [n] → fixed per mile [amount] → **fully-loaded cost per mile [amount]**

**Lane economics**
| | Miles | Cost |
|---|---|---|
| Deadhead to origin | | |
| Loaded | | |
| Deadhead from destination (to reload) | | |
| **Total** | | |
Transit time: [days] · Reload position at destination: [strong / weak — typical wait [n] days]

**Accessorials**
| Item | Rate | Terms | Evidence required |
|---|---|---|---|
| Detention | [rate after n hours] | | [signed timestamps] |
| Layover | | | |
| Extra stop | | | |
| Fuel surcharge | [basis] | | |

**Rates:** break-even [amount] · target at [n]% margin [amount] · **quoted [amount]** · per loaded mile [amount] · **revenue per day [amount]**

**Recommendation:** ☐ Accept ☐ Accept with conditions ☐ Decline — [reasoning]

**Sensitivity:** fuel +[n]% → margin [effect] · detention 4h unpaid → margin [effect] · reload takes +1 day → margin [effect]

> A costing framework only. Rates, fuel surcharges, detention terms and accessorial practice vary by market, contract and jurisdiction, and some lanes carry regulatory or licensing requirements affecting cost. Verify your own cost base and contract terms before quoting.

## Quality Checks
- [ ] Cost per mile includes both fixed and variable, with overhead allocated
- [ ] Annual miles are realistic rather than optimistic
- [ ] Deadhead miles at both ends are included in the lane cost
- [ ] Time cost is considered, not just distance
- [ ] Detention terms specify the evidence needed to collect
- [ ] The reload position at destination is factored into the decision
- [ ] Break-even is stated and the recommendation respects it
- [ ] Sensitivity to fuel, detention and reload delay is shown

## Anti-Patterns
- **Quoting on loaded miles only.** The empty miles are the ones that lose the money.
- **Optimistic utilisation.** Understates fixed cost per mile across every quote you make.
- **Ignoring the destination market.** A great rate into a dead area is a bad load.
- **Detention with no evidence requirement.** Priced, billed, disputed, written off.
- **Forgetting overhead.** Dispatch, admin and premises are real and must be carried.
- **Running below break-even to keep the truck busy.** Loses money faster than parking it.
- **Pricing distance and ignoring time.** Short difficult runs can cost more than long easy ones.

## Example Trigger Phrases
- "Quote a rate for a lane from Manchester to Glasgow"
- "What is our actual cost per mile?"
- "Should we take this load at this rate?"
- "Why is this lane losing money?"
- "How do I price detention so we actually get paid?"
