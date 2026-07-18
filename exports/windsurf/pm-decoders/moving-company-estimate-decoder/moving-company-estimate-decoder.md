---
trigger: model_decision
description: "Decode a moving company estimate — binding vs non-binding, the weight and cubic-feet games, valuation vs insurance, and the red flags that precede hostage-load stories. Use when someone asks 'is this moving quote legit', 'decode my moving estimate', 'binding vs non-binding estimate', or 'how do I avoid moving scams'. Produces an estimate-type decode with what-you'll-actually-pay scenarios, ranked red flags, the valuation decode, and the questions that separate real movers from brokers."
---

# Moving Company Estimate Decoder Skill

The moving industry has a specialty: quotes that grow between signing and delivery, enforced by the fact that they have your stuff. The whole game is in three distinctions most customers never learn — binding vs. non-binding estimates, mover vs. broker, and "valuation" vs. insurance. This skill decodes the estimate against those three, prices the realistic worst case, and flags the patterns (lowball-then-reweigh, cubic-feet pricing, big deposits) that show up in every hostage-load story.

## What This Skill Produces

- The estimate-type decode: binding / binding-not-to-exceed / non-binding — and what each means for the final bill
- The realistic-total scenarios: quoted vs. likely vs. worst-case, with the mechanisms that move the number
- Ranked red flags against the known-scam patterns
- The valuation decode (that "$0.60 per pound" line, explained on their actual goods) and the verification checklist

## Required Inputs

Ask for these only if they aren't already provided:

- **The estimate/contract text** — including the fine print pages; the type of estimate is sometimes only in the fine print.
- **The move shape** — local vs. long-distance/interstate (very different regulatory pictures — flag interstate specifics as verify-with-regulator), inventory scale, dates.
- **How the estimate was made** — in-home/video survey vs. phone/online guess: a non-surveyed estimate is structurally a lowball.
- **What's known about the company** — name as quoted; the mover-vs-broker question gets a verification step regardless.

## Framework: Severity Scale

- 🔴 **Walk-away or fix-before-signing territory** — non-binding estimates on long-distance moves (the reweigh is where the number grows — ask for binding-not-to-exceed), pricing by cubic feet instead of weight on interstate moves (volume is unauditable and famously inflatable), large deposits (reputable movers typically take payment at delivery — a big up-front deposit is the pattern's opening move), no in-home/video survey behind a firm-sounding number, the paperwork naming a different company than the one quoted (broker handoff — you don't know who's showing up), "we'll do the inventory on moving day."
- 🟡 **Clarify before signing** — accessorial fees left open (stairs, long-carry, shuttle — get them priced now), delivery *window* vs. date and the per-day delay terms, storage-in-transit pricing if dates might slip, the released-value valuation default (that's the $0.60/lb line — compute it: a 10-lb laptop = $6) vs. full-value protection pricing.
- 🟢 **Standard** — surveyed estimate, binding-not-to-exceed, payment at delivery, itemized accessorials, clear valuation options; a clean quote deserves the label.

Always compute the **valuation reality**: released value on their heaviest-cheap and lightest-expensive items (the sofa is overprotected; the laptop is worth $6), and the full-value-protection premium as the actual insurance decision. Verification checklist regardless of severity: regulator registration lookup for interstate movers (name the *type* of lookup, flag as jurisdiction-specific), the same-company-name check across quote/contract/truck, and recent reviews *under the exact legal name*.

## Output Format

### Moving Estimate Decode: [route, date — company as quoted]

**1. The verdict** — estimate type, the realistic total range, and the single most important fix (usually: convert to binding-not-to-exceed or walk).

**2. The scenarios** — quoted / likely / worst-case, each with the mechanism that gets the bill there.

**3. Decode table**

| Term | What the document says | What it means at delivery | Severity |
|---|---|---|---|

**4. 🚩 Red flags, ranked** — quoted text, the scam-pattern it matches, the fix or the walk-away call.

**5. The valuation decision** — released value computed on their goods vs. full-value protection cost; framed as the one genuine insurance choice in the document.

**6. Verification checklist + questions** — registration lookup, name-match check, survey request, deposit terms, accessorial pricing in writing.

End the artifact with, verbatim: *"This is a plain-language reading, not legal/financial advice — laws vary by jurisdiction; confirm anything load-bearing with a qualified professional."*

## Quality Checks

- [ ] The estimate type is identified and its bill-at-delivery consequence stated first
- [ ] Scenarios include the mechanism, not just the number
- [ ] Released-value valuation is computed on the user's actual items
- [ ] Interstate-specific rules are flagged verify-with-regulator, not asserted
- [ ] The broker-vs-mover question gets a verification step even when nothing looks wrong
- [ ] The disclaimer line appears verbatim in the artifact

## Anti-Patterns

- [ ] Do not treat all movers as scammers — the industry's honest majority is exactly why the pattern-matching works; decode, don't panic
- [ ] Do not accept "binding" verbally — the word must be on the document with a total
- [ ] Do not let cubic-feet pricing pass on a long-distance move without its flag
- [ ] Do not confuse valuation with insurance — the document does that on purpose; undo it
- [ ] Do not skip the name-match check — the quote, contract, and truck naming three companies is the whole story in one detail

## Based On

Consumer-side moving-contract review — estimate-type triage, scam-pattern matching, valuation math, verification sequencing.
