# Worked Example — Closing Disclosure Decoder

A gold-standard run of this skill: a CD three days before closing, compared against the Loan Estimate, with $585 of over-tolerance increases found and scripted for the day-one lender call.

## The brief

Whitney closes on a condo Thursday; the Closing Disclosure arrived Monday morning (review clock ends Wednesday). Loan: $288,000 at 6.375% fixed, unchanged since the rate lock. Her Loan Estimate showed: origination/underwriting $1,495 total; appraisal $650; title services (lender-selected) $1,180; recording $185; transfer tax $1,440; prepaid escrow 3 months. The CD now shows: origination $1,495 **plus a new "processing fee" $495 and "doc prep" $250**; appraisal $650; title services $1,340; recording $240; transfer tax $1,440; escrow now 4 months ($1,132 line); per-diem interest $381 (12 days); cash to close $31,417. Nothing about her loan changed — same rate, same amount, no program switch. She's mostly upset about the cash-to-close being "way higher than the estimate."

## The output

### Closing Disclosure Decode: [condo] — closing Thursday, review clock ends Wednesday

**Verdict:** Call the lender today about 3 items — $745 of new lender fees in a zero-tolerance category and a title-services increase to check — and stop worrying about the two big lines that moved, because they're your own money arriving early.

**Sections A–J, decoded** (the lines that matter)

| Line | Plain English | Triage |
|---|---|---|
| A: origination $1,495 | Unchanged from LE | ✓ real, fixed, matches |
| A: **processing $495 + doc prep $250 (new)** | Lender fees that did not exist on the LE — same work, new names | **challenge now** |
| B: appraisal $650 | Matches LE | ✓ |
| B: title services $1,340 (was $1,180) | Lender-selected provider — increase belongs to a limited-tolerance bucket | check the bucket math |
| E: recording $240 (was $185) | Government filing — same limited-tolerance bucket | check with title line |
| E: transfer tax $1,440 | Unchanged; zero-tolerance category anyway | ✓ |
| F/G: per-diem interest $381 + escrow 4 months | **Your money moving early, not fees** — interest for your 12 pre-payment days; escrow is your account being funded | ✓ decode, don't fight |

**Changed since the Loan Estimate**

| Fee | LE | CD | Δ | Tolerance tier | Your move |
|---|---|---|---|---|---|
| Processing + doc prep | $0 | $745 | +$745 | Lender fees — zero tolerance | Challenge: correct or document a changed circumstance (none exists — loan unchanged) |
| Title services | $1,180 | $1,340 | +$160 | Limited aggregate bucket | Compute the bucket |
| Recording | $185 | $240 | +$55 | Same bucket | +$215 aggregate on ~$1,365 base ≈ 15.7% — above the typical aggregate allowance; the excess is challengeable |
| Escrow months, per-diem | — | — | — | No tolerance (prepaids float) | None — this is the cash-to-close "increase," and it's your money |

**The challenge list** — ranked by recovery odds:
1. "The CD adds a $495 processing fee and $250 doc prep fee that don't appear on my Loan Estimate. Those are lender charges in the zero-tolerance category, and nothing about the loan changed — please remove them or send the changed-circumstance documentation." *(Odds: strong — new lender fees with no changed circumstance are the textbook refundable case.)*
2. "Title services plus recording rose $215 over the Loan Estimate — that looks above the aggregate allowance for that bucket. Please confirm the tolerance math and cure the excess." *(Odds: good, smaller dollars.)*
3. Note, not challenge: "Confirm the escrow cushion months are per the standard calculation." *(Prepaids float; this is hygiene.)*

**Cash to close, reconciled:** their $31,417 = down payment + costs − deposit + prepaids: recomputed to $31,417 ✓ — the "way higher" feeling is $1,513 of escrow/per-diem (your money) plus the $745 that challenge #1 exists to remove.

*"This is a plain-language reading, not legal or lending advice — disclosure and tolerance rules vary by jurisdiction and loan type; confirm anything load-bearing with your closing attorney or settlement agent before signing."*

## Why it's shaped this way

- **The tolerance tiers do all the work** — the decode's power move is sorting the $745 of new lender fees into the zero-tolerance category where, absent a changed circumstance, the increase is the lender's problem; that's framework rule 1 converting anger into a refund.
- **Prepaids got decoded as her money, deliberately and early** — the largest cash-to-close movers (escrow months, per-diem interest) are not costs, and per the anti-patterns, misdirected outrage at them would burn credibility the real challenges need.
- **The limited-tolerance bucket is computed, not asserted** — title + recording increases are aggregated against their base before claiming an excess, because bucket math is how that tier actually works, and a wrong claim invites a correct rebuttal.
- **Challenge scripts quote line, amount, and category** — "please correct or document the changed circumstance" is the sentence with regulatory teeth; "these fees seem high" is the sentence with none.
- **The verdict schedules the call for day one** — the three-day clock is stated in the header and the framework is explicit that the review period is for reviewing; Wednesday-night discoveries are Thursday-morning concessions to whoever wants the closing to just happen.
- **Cash-to-close is independently recomputed** — it reconciled here, which is itself reported (✓), because the check matters most on the rare day it doesn't.
- **Tolerance rules stay jurisdiction-flagged** — the decode says "typical aggregate allowance" and routes final authority to the settlement agent, per the don't-present-as-universal-law anti-pattern.
