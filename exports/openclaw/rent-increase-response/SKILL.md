---
name: rent-increase-response
description: "Respond to a rent increase strategically — check its validity first, price your alternatives honestly, then negotiate with the leverage tenants forget they have (turnover costs the landlord more than a compromise). Use when asked my rent is going up what can I do, negotiate my rent increase, is this increase even legal, or should I stay or move. Produces the validity checklist, the stay-vs-move math, the negotiation letter with its trade menu, and the decision timeline against the notice period."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/rent-increase-response.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Rent Increase Response Skill

A rent increase letter looks like a decree; it's usually an opening position. Tenants systematically underprice their own leverage — turnover costs a landlord real money (vacancy, turnover work, listing, the risk of a worse tenant), which means a good tenant proposing a middle number with a longer lease is often genuinely the landlord's best offer. This skill runs the response in the only sensible order: validity (is this increase properly noticed, and lawful where caps exist — flagged, not assumed), then the honest stay-vs-move math, then the negotiation those numbers arm.

## What This Skill Produces

- **The validity checklist** — notice form and period, lease-term timing, and the rent-regulation question — as jurisdiction-flagged checks, because an invalid increase changes the entire conversation
- **The stay-vs-move ledger** — the increase's real annual cost vs. the full cost of moving, both sides computed
- **The negotiation letter** — the counter with its trade menu (term length, prepayment, self-managed wear items, timing)
- **The decision timeline** — the response schedule worked back from the notice deadline, so options stay open

## Required Inputs

Ask for these if not provided:
- **The increase** — current rent, proposed rent, effective date, how and when notice arrived, lease status (mid-term, renewal, month-to-month — mid-term increases are usually invalid on fixed leases; flag it)
- **The market read** — comparable listings in the building/area if known (the negotiation's ammunition; the skill structures the comp list to gather)
- **The tenant's record** — tenure, payment history, condition of the unit; the letter monetizes reliability
- **The alternatives, honestly** — willingness to actually move, and the constraints (school zones, commute, the fifth-floor piano); a bluff the tenant can't back has negative value

## Framework: The Leverage Rules

1. **Validity before strategy:** notice periods, required forms, and (where applicable) rent-stabilization caps are jurisdiction- and lease-specific — the checklist runs the categories with verify-locally flags. An improperly noticed or over-cap increase doesn't need negotiating; it needs a polite letter noting the defect and the correct process. Mid-lease increases on a fixed term are usually just… not a thing, unless the lease says so.
2. **Price the move honestly, both directions:** the increase's cost is (Δrent × 12); the move's cost is deposit float, movers, overlap rent, time, application fees, and the new place's own next increase — plus the non-financials. The landlord's side of the same math (vacancy weeks, turnover work, re-listing) is the negotiation's quiet engine: a $150 compromise is often cheaper for *both* parties than turnover. The ledger states both sides.
3. **Counter with comps and a trade, not a plea:** the letter is three moves — the record ("[N] years, on-time, unit well-kept"), the market ("comparable units at [comps]"), and the proposal with an exchange: the middle number *for* a 12–24-month term, or prepayment, or taking over minor upkeep. A counter that gives the landlord something to say yes to outperforms a complaint every time.
4. **Month-to-month is leverage in both hands:** the landlord can re-raise soon — but the tenant can leave on short notice, which is exactly the vacancy risk the landlord is pricing. A longer fixed term trades that mutual uncertainty away; it's the most valuable coin in the negotiation and costs a flexible tenant little.
5. **The timeline preserves options:** respond well before the effective date — early enough that if talks fail, the moving option is still real (viewings, applications, notice on the current place). A negotiation entered after the alternatives expired is a request.

## Output Format

# Rent Increase Response: [current] → [proposed] ([+X%]) — effective [date]

## Validity Check (before anything else)
| Check | Category rule | This case | Flag |
|---|---|---|---|
[Notice period/form · lease-term timing · regulation/cap question — each verify-locally]

## The Ledger
**Staying:** +[Δ×12]/yr · **Moving:** [itemized] · **Their side:** [vacancy + turnover estimate] → the zone where a deal beats both alternatives: [range]

## The Letter
[Verbatim: the record · the comps · the counter with its trade · warm close with the response-by date]

## The Timeline
[Today → letter → follow-up call → decision point → (if needed) housing search milestones → notice deadline on current lease]

> Rent-increase rules, caps, and notice requirements are jurisdiction-specific — verify the local categories before relying on them. Not legal advice.

## Quality Checks

- [ ] Validity runs first, as flagged categories, and an invalid increase reroutes the whole response
- [ ] The ledger prices both the tenant's move AND the landlord's turnover
- [ ] The counter contains a trade, not just a smaller number
- [ ] The timeline keeps the moving option alive through the negotiation
- [ ] The bluff check happened — nothing in the letter threatens what the tenant won't do

## Anti-Patterns

- [ ] Do not negotiate an invalid increase — note the defect politely and let process reset the table
- [ ] Do not counter with hardship alone — sympathy is not a rate; records, comps, and trades are
- [ ] Do not threaten to move while unwilling to — landlords price bluffs quickly and permanently
- [ ] Do not assert caps or notice periods as numbers — categories with verify-locally flags
- [ ] Do not let the effective date arrive mid-negotiation — the timeline exists because leverage has an expiry
