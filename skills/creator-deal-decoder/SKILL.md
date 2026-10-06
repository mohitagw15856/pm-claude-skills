---
name: creator-deal-decoder
description: "Decode a brand deal or UGC contract before signing — usage rights, exclusivity windows, whitelisting, payment terms, and kill clauses ranked 🔴🟡🟢 by what they can cost a creator, plus the counter-ask email. Use when a creator says 'is this brand deal fair', 'what does perpetual usage mean', 'they sent me a contract', or 'should I sign this collab agreement'. Produces a clause-by-clause decode, a money-math check on the rate, and a ready-to-send negotiation email. Not legal advice."
---

# Creator Deal Decoder Skill

Creators sign their first brand contracts at nineteen, alone, excited, and
against a legal team. The expensive clauses are never the ones about the
deliverable — they're the quiet ones: *perpetual, worldwide, royalty-free
usage* (your face in their ads forever), *category exclusivity* (no other
skincare deals for 12 months, priced at one video), *whitelisting* (they run
ads from YOUR account), and payment net-60 with a revisions clause that makes
it net-forever. This skill decodes the document the way [[lease-decoder]]
decodes a lease: plain language, severity-ranked, money math shown — and ends
with the counter-ask email, because the first contract is a first offer.

## What This Skill Produces

- A **clause-by-clause decode** in plain language, ranked 🔴 (can cost real
  money or your channel) / 🟡 (negotiate) / 🟢 (standard)
- The **money math**: what the rate implies per deliverable *including* the
  exclusivity and usage you're actually selling — the rate is never just for
  the video
- A **counter-ask email**, polite and specific, with the 2–3 changes that
  matter most and fallback positions
- A **walk-away line**: the clause combination that makes this deal worse
  than no deal

## Required Inputs

Ask for (if not already provided):
- The contract text (paste it; decode only what's actually there)
- The creator's side: platform(s), audience size, typical rates if known,
  how much they want/need this deal
- The deliverables as they understand them, and the offered fee
- Any other income this could block (existing or hoped-for deals in the
  category)

## Framework: the six places creator money hides

Decode every clause, but hunt these specifically:

1. **Usage & licensing** — how long, where, and how they can use the content
   (and the creator's face/name). Organic social for 90 days is normal;
   *perpetual, all-media, royalty-free* is them buying an ad campaign for the
   price of a post. Paid usage beyond the original post is a separate,
   priced thing.
2. **Exclusivity** — category, scope, duration. Price it: months of blocked
   category deals × typical deal value = the real cost. A $2k deal with 12-month
   skincare exclusivity can be a $10k gift to the brand.
3. **Whitelisting / spark ads** — ads run from the creator's own handle,
   spending the creator's audience trust. Separately priced, time-boxed, with
   spend caps, or struck.
4. **Approvals & revisions** — unlimited revisions is unlimited unpaid work;
   cap the rounds. "Brand may reject at sole discretion" plus payment-on-
   approval is a kill clause wearing a process costume.
5. **Payment terms** — net-30 max for small creators, late fees named, deposit
   for first-time partners, and payment tied to *delivery*, not to brand
   approval or performance.
6. **Morality/termination clauses** — one-sided termination, clawbacks on
   posted content, vague "brings brand into disrepute" standards; flag the
   asymmetries (can the creator terminate too?).

## Output Format

```
## The deal in one line
[What they're actually buying for what price]

## Clause decode
| Clause (quoted) | Plain English | 🔴🟡🟢 | Why it matters here |

## The money math
[Fee vs what's being sold: deliverables + usage + exclusivity, priced out]

## The counter-ask email (ready to send)
[Warm open · the 2-3 asks with specific replacement language · fallbacks]

## Walk-away line
[The combination that makes this worse than no deal]

⚠ This is a decode, not legal advice — for deals with real money or long
exclusivity, a contract lawyer's hour is cheap insurance.
```

## Quality Checks

- [ ] Every 🔴 quotes the actual clause text — no flags without receipts
- [ ] Exclusivity and usage are *priced*, not just flagged — the money math
      is what turns "hm" into a counter-ask
- [ ] The counter-email asks for at most three changes, with replacement
      wording the brand can literally accept
- [ ] Standard-and-fine clauses are marked 🟢 — a decode that flags
      everything teaches nothing
- [ ] The not-legal-advice line is present and the lawyer threshold is
      concrete (real money, long exclusivity, IP transfer)

## Anti-Patterns

- [ ] Do not decode clauses that aren't in the pasted text — "usually these
      contracts also…" is labelled as a general note, never as this contract
- [ ] Do not advise signing or refusing outright — decode, price, counter;
      the creator decides
- [ ] Do not write the counter-email combative — brands walk from hostile
      counters and accept specific ones
- [ ] Do not let excitement discount the math; "great exposure" appears in
      the money math at its actual price: $0 unless evidenced

## Related

[[first-client-contract]] for freelance service contracts; [[influencer-brief]]
is the brand's side of this table; [[late-invoice-escalation]] when net-30
becomes net-never.

## Example Trigger Phrases

- "Is this brand deal fair?"
- "What does perpetual usage mean?"
- "Should I sign this collab agreement?"
