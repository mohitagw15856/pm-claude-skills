---
name: bid-tender-review
description: "Analyse a construction bid or tender package for scope gaps, risk-shifting exclusions, unit-rate red flags, and front-loading in the schedule of values. Use when asked to review a bid, level bids, check a tender for gaps, compare sub quotes, or vet a schedule of values before award. Produces a structured bid review with a gap register, exclusion risk table, pricing red flags, and an award recommendation with pre-award clarifications."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/bid-tender-review.html
metadata:
  {
    "openclaw": { "emoji": "🏗" }
  }
---

# Bid / Tender Review Skill

A low bid is only cheap if the scope is actually in it. This skill runs the review an experienced estimator or owner's rep would run before award: reconcile the bid against the bid documents, hunt the exclusions and qualifications that quietly shift risk back to the buyer, test unit rates against sanity ranges, and check the schedule of values for front-loading. The goal is a levelled, apples-to-apples view and a written list of what to clarify **before** signing — not after mobilisation.

## What This Skill Produces

- A **scope gap register** — items in the bid documents but missing, excluded, or ambiguous in the bid
- An **exclusions & qualifications risk table** — each one classified by who ends up holding the risk
- **Pricing red flags** — outlier unit rates, unbalanced line items, allowances hiding real cost
- A **front-loading check** on the schedule of values
- An **award recommendation** with pre-award clarification questions (RFI-to-bidder list)

## Required Inputs

Ask for these if not provided; if working from a thin brief, proceed and label every assumption `[assumed]`:

- **The bid/quote itself** (pricing, exclusions, qualifications, allowances, schedule of values if given)
- **Scope of work / bid documents** — drawings list, spec sections, or at least a scope narrative
- **Contract form and delivery method** (lump sum, GMP, unit price, design-build) — it changes what "excluded" means
- **Competing bids** (optional, for levelling) and the engineer's/internal estimate if one exists
- **Project specifics that drive cost**: site access, phasing, working hours, bonding/insurance requirements

## Review Framework

Work through four passes, in order:

**1. Scope reconciliation.** Walk the bid against the documents section by section. Classify every mismatch: *Missing* (silent — the most dangerous), *Excluded* (stated), *Qualified* (included "provided that…"), *Allowance* (a number, not a commitment). Flag anything priced "by others" with no other on the job to catch it.

**2. Exclusion risk shift.** For each exclusion/qualification, state plainly who carries the risk if it bites, and rate it:

| Rating | Meaning |
|---|---|
| **Deal-breaker** | Shifts a core contract risk (e.g. excludes rock/dewatering on a deep excavation, excludes tie-ins) |
| **Negotiate** | Common but movable — escalation caps, limited warranty, "design assist not design" |
| **Accept** | Standard trade practice (e.g. excludes permits the GC always pulls) |

**3. Unit-rate and balance check.** Flag rates far off the field of other bids or the estimate (>±20% is a look; >±40% is a flag). Watch for **unbalanced bidding**: high rates on early or likely-to-grow quantities, low rates on items likely to be deleted.

**4. Front-loading detection.** In the schedule of values, compare early-activity values (mobilisation, GCs, submittals, excavation) to their real cost. Mobilisation >3–5% of contract value, or the first 20% of schedule carrying >30% of value, means the bidder is financing the job with your money — a cash-flow and default-risk signal, and painful if you ever terminate for convenience.

## Output Format

### Bid Review: [Project] — [Bidder]

**1. Summary & recommendation** — award / award with clarifications / reject, in three sentences.
**2. Scope gap register** — table: | # | Item | Bid docs ref | Status (Missing/Excluded/Qualified/Allowance) | Cost exposure ($ or [to price]) |
**3. Exclusions & qualifications risk table** — | Exclusion | Who holds the risk | Rating | Recommended action |
**4. Pricing red flags** — outlier rates, unbalanced items, allowance adequacy; note levelled comparison if multiple bids.
**5. Schedule of values / front-loading check** — findings and requested corrections.
**6. Pre-award clarifications** — numbered questions to issue to the bidder, each answerable yes/no or with a price.

## Quality Checks

- [ ] Every exclusion and qualification in the bid appears in the risk table — none skipped as boilerplate
- [ ] Each scope gap cites where the work lives in the bid documents (spec section / drawing)
- [ ] Cost exposure is estimated or explicitly marked `[to price]` — never silently ignored
- [ ] Front-loading check compares SoV values to real early-work cost, not just percentages in isolation
- [ ] Recommendation is conditional on the clarification list, and every clarification is answerable before award

## Anti-Patterns

- [ ] Do not pick the low bid on price alone — level scope first; a $200k gap eats a $150k spread
- [ ] Do not treat "excluded" and "not mentioned" as the same — silence in a bid is a claim waiting to happen
- [ ] Do not accept allowances as pricing — an allowance is the bidder's guess spent with your money
- [ ] Do not wave through mobilisation and general-conditions front-loading as "normal" without checking it against cost
- [ ] Do not resolve ambiguity in the bidder's favour by assumption — put it on the pre-award clarification list in writing

## Example Trigger Phrases

- "Review a bid."
- "Check a tender for gaps."
- "Compare sub quotes."
- "Vet a schedule of values before award."
