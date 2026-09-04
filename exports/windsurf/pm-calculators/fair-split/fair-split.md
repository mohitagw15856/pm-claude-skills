---
trigger: model_decision
description: "Divide things that cannot be divided — an inherited house, a dissolved partnership, the furniture after a breakup — using sealed-bid fair division (Knaster), computed by the bundled script so everyone ends provably above their own fair share. Use when asked to split an estate fairly, divide assets between siblings or ex-partners, who gets the house and what do they owe the others, or handle unequal shares. Produces the sealed-bid procedure, the computed allocation with exact cash transfers, the per-person fairness proof, and the presentation script. Math for the family meeting; not legal advice."
---

# Fair Split

The house cannot be cut in three, everyone valued it differently, and the sibling who wants it least still resents the one who got it — that is how estates turn into estrangements. Sealed-bid fair division (the Knaster procedure) fixes the structural problem: each person privately states what every item is worth *to them*, each item goes to whoever values it most, and cash transfers rebalance so that every single person ends up — by their own numbers — with more than their fair share. The person who wanted nothing gets paid; the person who got the house pays for the privilege at their own valuation. The bundled script does the arithmetic exactly, supports unequal entitlements (a 50/25/25 will, a 60/40 partnership), and proves the outcome to each participant in their own terms.

## What This Skill Produces

- **The procedure to run** — how to collect sealed valuations so they are honest: privately, simultaneously, before anyone knows the mechanism rewards sincerity
- **The computed allocation** — who gets each item and the exact cash each person pays or receives, from the script
- **The proof of fairness, per person** — each participant shown ending above *their own* valuation of their fair share, which is the sentence that ends arguments
- **The presentation script** — how to explain the result to people who are grieving, angry, or both
- **The edge-case handling** — the item someone cannot afford to win, the sentimental object, the participant who refuses to play

## Required Inputs

Ask for these if not provided:
- **The people and their shares** — who is dividing, and the entitlements (equal by default; a will or partnership agreement may set them unequal)
- **The items** — everything indivisible worth listing; small stuff can be bundled into lots
- **The valuations** — each person's private value for every item; if not yet collected, the skill's first output is the collection procedure, because *how* they are collected determines whether they are honest
- **The constraints** — anyone cash-poor (winning the house means paying the others — can they?), any item with a legal restriction, any participant acting for someone else

## Framework: Sealed Bids, Highest Valuer Wins, Cash Rebalances

1. **Collect valuations sealed and simultaneous.** The mechanism only rewards honesty if nobody bids in reaction to anyone else. Each person answers privately: *what is this worth to you, in money, knowing you might have to pay that*. The framing matters — it is not a guess at market price, it is their personal price.
2. **Run the script — the arithmetic is not negotiable, which is its gift.**
   ```
   python3 scripts/fair_split.py --input split.json          # table
   python3 scripts/fair_split.py --input split.json --json   # for further processing
   python3 scripts/fair_split.py --demo                      # worked three-way estate example
   ```
   Each item goes to its highest valuer; each person's fair share is their entitlement weight times their own total valuation; the surplus the assignment creates is shared back by weight; cash transfers settle the difference and provably sum to zero.
3. **Present each person their own proof.** "By the numbers *you* gave, your fair share was X — you ended with X plus Y." Fairness argued from the other side's numbers convinces nobody; fairness proven from their own numbers has nothing left to argue with.
4. **Handle the cash-poor winner before running it.** Winning the big asset means paying real money to the others. If that is impossible, options: sell the asset and split proceeds (list it at everyone's-bid as reserve), a payment plan the others accept, or exclude it from the procedure and handle it separately.
5. **Respect the sentimental override.** The mechanism prices sentiment honestly — the person who bids high on the photo albums *pays* for them, which is usually right. But an item everyone agrees belongs to one person should be gifted before the procedure, not run through it.
6. **The refuser.** Someone who won't participate can be represented by market valuations with their consent, or the procedure runs on the subset who will — but a division imposed on a non-participant is not fair division, and the skill says so.

## Output Format

### Fair split: [what is being divided] · [n] people · [date]

**Entitlements:** [name: %] · **Items:** [count] · **Valuations collected:** [sealed/simultaneous — or the collection procedure to run first]

**The allocation** (from `fair_split.py`)
| Person | Share | Items won | Cash (+receives/−pays) | Ends with (own valuation) | Above own fair share by |
|---|---|---|---|---|---|

**The proof, per person:** [one sentence each, in their own numbers]

**Flags:** [cash-poor winner and the options · sentimental pre-gifts made · non-participants and how handled]

**Presenting it:** [the script — lead with the guarantee, show each their own proof, the arithmetic-is-neutral framing]

> Math for the family meeting, not legal advice. Estates in probate, tax consequences of transfers, and jointly-owned property have legal machinery this procedure does not replace — run the numbers, then run the result past the professional handling the estate.

## Quality Checks
- [ ] Valuations were (or will be) collected sealed and simultaneous, and the output says why
- [ ] The script's transfers sum to zero and every person ends above their own fair share
- [ ] Unequal entitlements, if any, are reflected in the weights, not bolted on after
- [ ] The cash-poor-winner check ran before the result was presented
- [ ] Each person's proof uses their own valuations only
- [ ] Legal-machinery boundaries are flagged

## Anti-Patterns
- **Collecting bids in the open.** One overheard number corrupts every later one, and the honesty guarantee dies.
- **Explaining fairness with the aggregate.** Each person cares about their own numbers; prove it person by person.
- **Running the un-runnable item.** If nobody can pay for the house, the procedure just formalises a crisis — handle liquidity first.
- **Pricing what should be gifted.** The mechanism is for contested value, not for making a sister buy her own childhood letters.
- **Presenting the output as a verdict.** It is a proposal with unusually good properties; adults still get to say no.
- **Using it to steamroll a grieving refuser.** Consent to the mechanism is part of the mechanism.
