---
name: used-car-decoder
description: "Decode a used-car listing before you drive an hour to see it — what the seller's phrasing is hiding, the history-check items that matter, a test-drive and inspection checklist ordered by cost-of-miss, the questions that make evasive sellers visible, and the walk-away signs ranked 🔴🟡🟢. Use when someone says 'is this car listing legit', 'what should I check on a used car', 'decode this ad', or is about to buy their first car. Produces a listing decode, the viewing checklist, and the negotiation frame. Not a mechanic — and it says which checks need one."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/used-car-decoder.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Used Car Decoder Skill

A used-car listing is a document written by someone who knows the car's
problems, for someone who doesn't. The dialect is learnable: "selling for a
friend" (distance from liability), "drives well for its age" (adjusted
expectations), "minor cosmetic damage" (photographed from the good side),
"no test drives without deposit" (walk away now). This skill decodes the
ad the way [[lease-decoder]] reads a lease — severity-ranked, money math
attached — then arms the viewing: the checks a non-mechanic can actually
do, the questions that surface evasion, and the honest boundary: which
findings mean *pay a professional for an inspection* and which mean leave.

## What This Skill Produces

- A **listing decode**: phrase-by-phrase, 🔴🟡🟢, with what each hedge
  typically means and the question that tests it
- The **before-you-travel checks**: history/title verification items
  (accident/write-off status, finance owing, mileage consistency, recalls)
  — each flagged as country-specific-verify-locally with what to search,
  since registries differ everywhere
- A **viewing & test-drive checklist** ordered by cost-of-miss: the
  cold-start, the panel-gap walk, fluids, tires including the spare-match,
  electronics sweep, the specific listen-fors on the drive
- **Seller questions** that make evasion visible ("why selling?", "what
  would you fix next?", "can I take it for a pre-purchase inspection?" —
  the last one is the real test: honest sellers say yes)
- The **money frame**: comps from sold prices, what each found flaw is
  worth in negotiation, and the walk-away list where no price is right

## Required Inputs

Ask for (if not already provided):
- The listing text and photos described, plus price and the car
  (make/model/year/mileage)
- The buyer: first car or fifteenth, mechanical comfort level, who else
  might inspect with them
- Budget truth: the price ceiling *including* the first-year surprises
  buffer (insurance, immediate maintenance)
- Country — for the verify-local flags on history checks and paperwork
  (this skill never asserts registry procedures)

## Framework

1. **Decode the ad's dialect.** Flag the classic hedges: liability
   distance ("for a friend/relative") · condition adjectives doing heavy
   lifting ("well for its age", "usual marks") · photo tells (no
   full-front shot, wet-car photos hiding paint, interior only) ·
   urgency pressure ("first to see will buy") · the deposit-before-
   viewing 🔴s. Each flag gets its test question, not just suspicion.
2. **Never travel before the paper checks.** Mileage across ads/photos
   consistent? History check run (accident, write-off category,
   outstanding finance — finance owing can follow the CAR, not the
   seller, in many places: 🔴 verify locally)? Recalls outstanding?
   Seller matches the registered keeper? All flagged with what-to-search
   terms, none asserted as universal procedure.
3. **Inspect in cost-of-miss order.** Ask for a *cold* start (pre-warmed
   engines are a tell) → head-gasket-adjacent signs (mayonnaise under
   the oil cap, white smoke — described plainly for a novice) → panel
   gaps and paint-tone walk (accident repair) → tires including
   date-codes and the spare (uneven wear = alignment or worse) →
   electronics sweep (every window, warning-light theater: which lights
   come on at ignition and *go off*) → the drive: straight-line braking,
   full-lock turns, a listen with the radio OFF.
4. **Let the questions do the work.** The pre-purchase-inspection ask is
   the sorting hat: "can my mechanic look at it?" — yes means proceed,
   any version of no means the listing decoded itself. "What would you
   fix next?" beats "any problems?" — everyone answers the second with
   "nothing."
5. **Frame the money before the feelings.** Sold-price comps (not asking
   prices) set the anchor; each finding gets its rough repair-cost class
   (small/medium/engine-money — classes, not fake precise quotes) as
   negotiation material. The walk-away list is absolute: finance owing
   unresolved, write-off category undisclosed, no-inspection sellers,
   mileage that doesn't add up. And the standing rule: the deposit
   buffer for year-one surprises is part of the budget, not optional.

## Output Format

```
## Listing decode
| Phrase / tell | Reading | 🔴🟡🟢 | Test question |

## Before you travel (verify-local items)
[ ] History check (search: …) [ ] Finance owing [ ] Mileage consistency
[ ] Recalls [ ] Seller = keeper — each with country-flag

## At the viewing (cost-of-miss order)
[The checklist with novice-friendly descriptions of each sign]

## Ask the seller
[The questions + what evasive answers look like]

## The money frame
[Comp anchor · findings → negotiation classes · the walk-away list ·
the year-one buffer line]

⚠ A pre-purchase inspection by a mechanic beats every checklist here for
engine/transmission health — budget for one on any car you're serious about.
```

## Quality Checks

- [ ] Every decoded phrase quotes the actual listing — no generic
      suspicion without a receipt
- [ ] All registry/history/paperwork items carry verify-local flags with
      search terms, never asserted procedure
- [ ] The checklist is executable by the stated mechanical comfort level;
      pro-inspection items say so
- [ ] Repair costs appear as classes, never invented precise quotes
- [ ] The walk-away list is present and absolute — items where
      negotiation is explicitly the wrong response

## Anti-Patterns

- [ ] Do not diagnose remotely — signs and their severity class, yes;
      "that's definitely the clutch," no
- [ ] Do not assert country procedures (title transfer, history
      registers, deposit law) — flag and route
- [ ] Do not let a good price override the walk-away list anywhere in
      the framing
- [ ] Do not write the seller as an enemy — most are honest; the decode
      exists to identify which kind is across the table
- [ ] Do not skip the pre-purchase-inspection recommendation because the
      buyer is excited

## Related

[[mechanic-quote-decoder]] for after you own it; [[car-lease-decoder]]
for the leasing route; [[car-tco]] for what this car really costs per
year; [[franklin-decision-ledger]] when it's down to two cars.

## Example Trigger Phrases

- "Is this car listing legit?"
- "What should I check on a used car?"
- "Decode this ad."
