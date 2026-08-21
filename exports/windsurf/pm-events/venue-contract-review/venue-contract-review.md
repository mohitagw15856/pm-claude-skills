---
trigger: model_decision
description: "Read a venue contract for the clauses that actually cost money — the minimum spend, the cancellation ladder, the attrition clause, and everything the hire fee does not include. Use when asked to review a venue contract, check a venue agreement before signing, negotiate venue terms, or understand a cancellation or minimum-spend clause. Produces the commercial summary, the flagged clauses ranked by exposure, the what-is-not-included list, the negotiation asks in priority order, and the questions to put in writing. Not legal advice; have a lawyer review before signing."
---

# Venue Contract Review

Venue contracts are priced in the exclusions. The hire fee is the headline; the money is in minimum spend, the cancellation ladder, attrition, mandatory suppliers, and the six things you assumed were included. This reads for exposure rather than for legality — what could this contract cost that the quoted fee does not show, and which three clauses are worth spending negotiating capital on.

## What This Skill Produces

- **The commercial summary** — what is actually being committed to, in money and dates
- **Flagged clauses ranked by exposure** — worst-case cost of each, not just its presence
- **What is not included** — the list that turns a hire fee into a real budget line
- **Negotiation asks in priority order** — because you will not win all of them, and some matter far more
- **Questions to put in writing** — the ambiguities that must be resolved before signature, not after
- **The decision points calendar** — cancellation tiers, guarantee deadlines, and final-numbers dates

## Required Inputs

Ask for these if not provided:
- **The contract or proposal** — the full document including annexes and the fine print
- **The event** — date, expected headcount, format, and how firm the numbers are
- **What you were told verbally** — sales conversations often contain promises the contract does not
- **Your constraints** — budget ceiling, whether the date could move, and how certain attendance is
- **Comparable options** — whether you have an alternative venue, which determines your leverage

## Framework: Price the Downside, Not the Headline

1. **Find the total commitment, not the hire fee.** Hire plus minimum spend plus mandatory services plus service charge and tax is the real number.
2. **Map the cancellation ladder to a calendar.** At what date does cancelling cost 25%, 50%, 100%? Put those dates in the diary — they are the real decision points.
3. **Read the attrition clause carefully.** If you contract for 200 and 150 attend, what do you pay? This is where events lose money quietly.
4. **List everything not included.** Tables, linen, power, cleaning, security, AV, corkage, overtime, get-out. Each is a budget line the fee implies you do not need.
5. **Check the mandatory suppliers.** In-house AV or catering with no competitive alternative is a pricing position, and it needs testing before signature.
6. **Look for the asymmetries.** Their right to relocate you, to change the room, to cancel — versus yours. Force majeure and access-time guarantees matter more after recent years.
7. **Prioritise three asks.** Cancellation terms, attrition percentage, and the biggest exclusion. Trading everything at once wins nothing.

## Output Format

### Venue contract review: [venue] · [event] · [date]

**Commercial summary:** hire [amount] · minimum spend [amount] · mandatory services [amount] · service charge [%] · tax [%] · **total commitment [amount]**

**Exposure ranking**
| Clause | What it says | Worst case | Exposure |
|---|---|---|---|
| Cancellation | [terms] | [amount] | High |
| Attrition | [terms] | [amount if numbers drop] | |
| Minimum spend | [terms] | [shortfall payable] | |
| Overtime / curfew | [rate] | [amount] | |

**Decision calendar**
| Date | What happens | Cost of cancelling after this |
|---|---|---|
| [date] | [tier change / final numbers due / deposit] | [amount] |

**Not included** — [each item, with estimated cost to source separately]

**Mandatory suppliers:** [who, for what, whether rates are fixed, whether alternatives are permitted]

**Asymmetries:** [their rights vs yours — relocation, cancellation, force majeure, access times]

**Negotiation asks** — in priority order
1. [ask] — [why it matters most] — [fallback position]
2. [ask] — [rationale] — [fallback]
3. [ask] — [rationale] — [fallback]

**Put in writing before signing:** [the ambiguities and the verbal promises that need to appear in the document]

> Not legal advice. This identifies commercial exposure; it does not assess enforceability, and contract law varies by jurisdiction. Have a qualified lawyer review any significant venue contract before signature.

## Quality Checks
- [ ] Total commitment is calculated, not just the hire fee
- [ ] Cancellation tiers are converted into diary dates
- [ ] The attrition clause is modelled against a realistic headcount drop
- [ ] Everything not included is listed with an estimated separate cost
- [ ] Mandatory suppliers and whether alternatives are permitted are identified
- [ ] Rights are compared in both directions, not only the venue's obligations
- [ ] Negotiation asks are prioritised to three, each with a fallback

## Anti-Patterns
- **Reading the hire fee as the cost.** It is the smallest number in the document.
- **Skipping the attrition clause.** The quietest way an event loses money.
- **Not diarising the cancellation tiers.** The decision date passes unnoticed and the option disappears.
- **Assuming tables, power and cleaning are included.** They frequently are not.
- **Relying on what the salesperson said.** If it is not in the contract, it does not exist.
- **Negotiating twelve points.** Signals no priorities and wins nothing.
- **Signing without legal review on a material contract.** This skill is not a lawyer.

## Example Trigger Phrases
- "Review this venue contract before I sign it"
- "What does this attrition clause actually mean?"
- "What is not included in this venue hire fee?"
- "How do I negotiate better cancellation terms?"
- "Is this minimum spend reasonable for 200 guests?"
