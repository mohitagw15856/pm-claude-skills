---
name: "Get your security deposit back — the move-out documentation "
description: "Get your security deposit back — the move-out documentation that wins disputes before they start, the itemized-deduction challenge, the demand-letter ladder, and the small-claims decision point. Use when asked how do I get my deposit back, my landlord is keeping my deposit, dispute these deposit deductions, or write a deposit demand letter. Produces the move-out evidence protocol, the deduction-by-deduction challenge with the wear-and-tear line drawn, the escalation ladder with letters, and the small-claims prep sheet."
---

# Security Deposit Recovery Skill

Deposit disputes are won at move-out, weeks before the landlord decides anything: the tenant with timestamped photos of every wall, a completed walkthrough, and a forwarding address in writing collects; the tenant with memories negotiates. This skill runs both phases — the evidence protocol while there's still access, and the challenge-and-escalate ladder when deductions arrive — anchored on the distinction that decides almost every dispute: normal wear and tear (the landlord's cost of doing business, in most jurisdictions not deductible) versus damage (yours).

## What This Skill Produces

- **The move-out protocol** — the photo/video sweep, the walkthrough ask, the cleaning-receipts file, the forwarding-address letter
- **The deduction challenge** — each claimed deduction sorted wear-vs-damage-vs-unsubstantiated, with the response
- **The escalation ladder** — the itemization request, the demand letter, and the deadline math (jurisdiction-flagged)
- **The small-claims prep sheet** — when the amount justifies it, what to bring, and how these hearings actually go

## Required Inputs

Ask for these if not provided:
- **The phase** — still in the unit (run the protocol — the highest-value case), moved out awaiting the deposit, or holding an itemized deduction list (the challenge case)
- **The paper so far** — lease clauses on the deposit, move-in inspection report if one exists (its absence is itself useful), photos from move-in and move-out, any communication
- **The numbers** — deposit amount, deductions claimed, time elapsed since move-out (return deadlines are jurisdiction-specific and often short — the clock may already be the tenant's best argument)
- **The landlord shape** — individual owner vs. property management company; the ladder's tone is identical, but companies respond to process and owners to specifics

## Framework: The Wear-vs-Damage Rules

1. **The line, drawn concretely:** faded paint, minor scuffs, worn carpet paths, small nail holes = wear (time did it — generally not deductible). Stains, burns, holes, broken fixtures, unapproved paint = damage (an event did it). Grout dulling is wear; a cracked tile is damage. Every deduction gets sorted against this line, with the jurisdiction-varies flag on the edge cases.
2. **Depreciation applies to damage too:** a landlord charging full replacement for 8-year-old carpet a stain killed is charging for an upgrade — useful-life proration is the standard counter, and the challenge letter makes it with arithmetic.
3. **Evidence beats adjectives:** the move-out sweep is systematic — every room, every wall, inside appliances, meters, timestamped, backed up off-phone. The paired move-in photos (or the landlord's missing move-in report, where one was required) frame every later argument.
4. **Procedure is a weapon that cuts both ways:** deadlines to return or itemize, receipts requirements, forwarding-address rules — jurisdiction-specific, often tenant-favorable, sometimes with multiplied damages for bad-faith withholding. The letters cite the *categories* of these rules with verify-locally flags; blown deadlines get cited by elapsed days.
5. **The ladder escalates on schedule, not on anger:** (a) written itemization-and-receipts request, (b) the challenge letter — deduction-by-deduction, evidence attached, amount demanded, deadline given, next step named, (c) the formal demand letter that reads like the small-claims filing it becomes, (d) small-claims — designed for exactly these amounts, no lawyer expected, and the prep sheet is mostly the evidence file already built.

## Output Format

# Deposit Recovery: [amount] — phase: [protocol / awaiting / challenging]

## [Phase 1] Move-Out Protocol
[The sweep checklist by room · the walkthrough request wording · receipts to keep · the forwarding-address letter, dated]

## The Deduction Challenge
| Claimed deduction | Amount | Wear / damage / unsubstantiated | The response (with depreciation math where it applies) |
|---|---|---|---|

## The Ladder
[Each rung with its letter drafted verbatim, its deadline, and the elapsed-time citation where the clock has run · the multiplied-damages category flagged verify-locally]

## Small-Claims Prep (if it gets there)
[The economics (filing cost vs. amount) · the evidence binder order · how the hearing runs · the settle-on-the-courthouse-steps pattern to expect]

> Deposit deadlines, deduction rules, and penalty provisions are jurisdiction-specific — verify the local specifics before citing exact numbers; the letters here cite rule categories for exactly that reason. Not legal advice.

## Quality Checks

- [ ] Every deduction is sorted wear/damage/unsubstantiated with reasoning, not lumped
- [ ] Depreciation math appears wherever full-replacement is charged on aged items
- [ ] Letters escalate in firmness while staying courtroom-readable throughout
- [ ] Jurisdiction-specific rules appear as flagged categories, never asserted numbers
- [ ] The small-claims section includes the honest economics, not just the how-to

## Anti-Patterns

- [ ] Do not concede wear-and-tear items to seem reasonable — that line is the whole dispute
- [ ] Do not write angry — every letter is Exhibit A; the facts carry the heat
- [ ] Do not cite specific statutes or day-counts as fact — categories with verify-locally flags
- [ ] Do not skip the itemization request rung — many withholdings collapse at the first ask for receipts
- [ ] Do not let sunk anger drive the small-claims call — the prep sheet's first line is the arithmetic
