---
name: trade-quote-builder
description: "Build a trade quote that wins the job and protects the margin — materials and labor itemized, assumptions and exclusions stated, variations priced by rule, and the professional one-page layout customers trust. Use when a tradesperson says 'help me quote this job', 'I keep losing money on jobs', 'customer wants a price for X', or 'how do I quote a day rate vs fixed'. Produces a ready-to-send quote plus the internal costing sheet behind it."
---

# Trade Quote Builder Skill

Most trade quotes lose money in the writing, not the doing: labor guessed
optimistic, materials priced from memory, and — the killer — no exclusions
line, so "while you're here, could you also…" becomes free work. A
professional quote is two documents: the internal costing sheet (honest hours
× real rate + materials + margin) and the customer's one-pager (clear scope,
what's included, what isn't, how variations get priced). This skill builds
both, and it prices the *variation rule* in advance — because the profitable
jobs are the ones where "extra" was defined before it happened.

## What This Skill Produces

- The **internal costing sheet**: labor (tasks × honest hours × rate),
  materials with waste factor, plant/access costs, margin — the math the
  customer never sees but the price depends on
- The **customer quote**, one page: scope in plain words, itemized or
  fixed-price sections, inclusions, **exclusions** (the load-bearing
  paragraph), variation rule, validity window, payment terms pointer
- A **fixed-vs-day-rate recommendation** for this specific job with the
  reasoning (unknowns push day-rate; defined scope earns fixed)
- The **assumption flags**: what was priced sight-unseen and what a site
  visit must confirm

## Required Inputs

Ask for (if not already provided):
- The job as the customer described it, plus what the tradesperson saw/knows
  (photos described, site visit notes, access issues)
- Their real numbers: hourly/day rate they need (not the one they say when
  nervous), typical material suppliers, travel distance
- The unknowns: what can't be known until opened up (walls, boards, wiring)
- Local context: is this a price-sensitive job or a reputation job?

## Framework

1. **Cost the job backwards from the tasks.** Break the work into visible
   tasks, each with honest hours (add the forgotten ones: setup, protection,
   cleanup, disposal runs, the merchant trip). Optimism in hours is the #1
   margin leak — challenge any task estimated in round afternoons.
2. **Materials at today's prices + waste.** List materials with a waste
   factor (10–15% typical for boards/tiles; note it, don't hide it) and
   "prices held for X days" — supplier prices move; the validity window is
   protection, not decoration.
3. **Write the exclusions like they'll be tested.** They will. Standard set:
   anything not listed in scope · faults discovered once opened up (priced
   as variation) · moving furniture/other trades' work · parking/permits.
   Specific beats general: "excludes repairs to joists found rotten" wins
   arguments "excludes unforeseen work" loses.
4. **Price variations by rule, in the quote.** "Additional work agreed in
   writing at £X/hour + materials before it starts." This single line
   converts scope creep from a fight into a form.
5. **Layout for trust.** Business name/contact · scope · price (itemized or
   fixed with sections) · inclusions/exclusions · variation rule · validity
   · payment terms (see [[stage-payment-shield]]) · insurance/certification
   lines where the trade has them. Flag: certification claims must be real —
   never draft one the user didn't state.

## Output Format

```
## Internal costing (yours only)
| Task | Hours | Rate | Labor | ‖ Materials | Qty+waste | Cost |
Subtotals · margin % · price floor: [the number below which this job loses]

## The quote (send this)
[One page, structured as above, in plain confident language]

## Fixed vs day rate for THIS job
[Recommendation + why · which unknowns would flip it]

## Confirm before starting
[The sight-unseen assumptions a site visit must check]
```

## Quality Checks

- [ ] Every task's hours include setup/cleanup/disposal — the forgotten
      hours are named individually
- [ ] The exclusions section is specific to this job, not boilerplate alone
- [ ] The variation rule appears with a real rate and "in writing before it
      starts"
- [ ] The price floor is computed and stated internally — the user knows the
      number below which walking away wins
- [ ] No certifications, insurance, or guarantee claims invented — only what
      the user stated goes on the quote

## Anti-Patterns

- [ ] Do not price to win by shaving hours — the costing sheet is honest even
      when the final price discounts; know what the discount costs
- [ ] Do not bury exclusions in small print tone — they're customer-facing
      clarity, not gotchas
- [ ] Do not quote firm on sight-unseen unknowns; that's what assumption
      flags and variations are for
- [ ] Do not use legalistic language a homeowner distrusts — plain and firm
      wins jobs

## Related

[[stage-payment-shield]] for deposits and payment stages;
[[home-contractor-quote-decoder]] is the customer's side of this table —
write quotes that survive it; [[late-invoice-escalation]] for afterwards.

## Example Trigger Phrases

- "Help me quote this job."
- "I keep losing money on jobs."
- "How do I quote a day rate vs fixed?"
