---
name: policy-renewal-review
description: "Run a pre-renewal review of an insurance programme: scan coverage gaps against current operations, test limit adequacy against inflation and exposure growth, read the claims experience into pricing expectations, frame market alternatives, and arm the broker negotiation. Use when asked to prepare for a policy renewal, review cover before renewal, check if limits are still adequate, or build renewal negotiation points. Produces a structured renewal review with gap findings, limit assessment, pricing outlook, and negotiation points."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/policy-renewal-review.html
metadata:
  {
    "openclaw": { "emoji": "🛡" }
  }
---

# Policy Renewal Review Skill

Renewals fail quietly: the business changed, the policy didn't, and the gap surfaces at claim time. This skill runs the pre-renewal discipline — does the cover still match the operations, are the limits still real money, what will the claims record do to price, and what should the broker push for.

## What This Skill Produces

- A coverage-gap scan: current operations vs current wording
- A limit-adequacy assessment against inflation and exposure growth
- A claims-experience read with its likely pricing impact
- Market-alternatives framing (remarket, restructure, retain more, hold)
- A prioritised list of broker negotiation points

## Required Inputs

Ask for missing items; where the user has only partial data, proceed with labelled assumptions `[assumed — verify at renewal]`:

- **Current policy summary** — lines, limits, deductibles, key exclusions, premium
- **What changed in the business** — revenue, headcount, locations, products, M&A, new contracts, digital/cyber footprint
- **Claims experience** — losses this period and prior years, open reserves
- **Renewal timeline and incumbent signals** (rate guidance, appetite noises), if known

## Review Framework

**1. Coverage-gap scan.** Walk the change list against the wording: new locations declared? new products within the liability trigger? revenue/BI values updated? contractual insurance requirements from new customers met? acquisitions endorsed on? For each change: covered as-is / needs endorsement / needs new line. A change nobody declared is the classic gap — ask explicitly "what's new that the insurer doesn't know about?"

**2. Limit adequacy.** Test limits against today's numbers, not purchase-date numbers: property sums insured vs current rebuild costs (flag if not indexed for 2+ years — construction inflation compounds); business-interruption sum vs current gross profit and a realistic indemnity period (12 months is rarely enough for full rebuild + market recovery — test 18–24); liability limits vs largest contract requirement and plausible worst case. Flag underinsurance-average/coinsurance exposure where declared values lag.

**3. Claims-experience read.** Compute the period and multi-year loss ratio if figures allow. Framing bands: a sustained loss ratio well below ~40% is negotiating leverage; ~40–60% is neutral; above ~60–70% expect rate pressure, deductible push, or restrictions — prepare the "what we fixed" story for every significant loss (root cause + remediation), because a loss with a fix narrative prices better than an unexplained one.

**4. Market alternatives.** Frame honestly: remarket (leverage, but costs incumbent goodwill and only credible if you'd move), restructure (higher deductibles/captive-like retention to trade premium for volatility), reduce cover consciously, or hold. Note market-cycle context if known `[to confirm with broker]`.

**5. Negotiation points.** Rank by value at stake: the gaps to close, the limits to raise, the restrictive clauses to remove, the rate ask — each with the supporting fact.

## Output Format

### Renewal review: [insured / programme / renewal date]

**1. Business changes since last renewal** — bullet list, each tagged covered / endorsement needed / new cover needed.
**2. Limit adequacy** — table: cover | current limit | adequacy test | verdict (adequate / raise / review).
**3. Claims experience & pricing outlook** — loss ratio, large-loss fix narratives, expected market response.
**4. Options** — hold / negotiate / restructure / remarket, with trade-offs.
**5. Broker negotiation points** — ranked, each with its supporting fact and target outcome.
**6. Timeline** — actions and dates working back from renewal.

End with: *"This review is analytical support, not a coverage or placement determination. Final decisions follow your organisation's policy and the advice of your licensed broker/adviser and applicable regulation."*

## Quality Checks

- [ ] Every declared business change has a covered/endorse/new-cover tag
- [ ] Limit tests use current values (rebuild cost, current gross profit), not stale declared values
- [ ] BI indemnity period is explicitly tested, not assumed at 12 months
- [ ] Every significant loss has a fix narrative attached for the negotiation
- [ ] Negotiation points are ranked by value at stake, each with a supporting fact
- [ ] Assumptions are labelled `[assumed — verify at renewal]`

## Anti-Patterns

- [ ] Do not roll limits forward unexamined — indexation drift is the most common renewal failure
- [ ] Do not treat remarketing as a free negotiating card — recommend it only if the insured would credibly move
- [ ] Do not present the claims record without remediation narratives — unexplained losses price worst
- [ ] Do not recommend deductible increases without stating the retained-volatility trade-off in money terms
- [ ] Do not invent market rate movements — label market context `[to confirm with broker]`

## Example Trigger Phrases

- "Prepare for a policy renewal."
- "Review cover before renewal."
- "Check if limits are still adequate."
- "Build renewal negotiation points."
