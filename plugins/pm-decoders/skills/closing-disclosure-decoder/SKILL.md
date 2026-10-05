---
name: closing-disclosure-decoder
description: "Decode a mortgage Closing Disclosure line by line — which fees are real, which are shoppable or junk, and what changed since the Loan Estimate. Use when asked to decode my closing disclosure, review my closing costs, why did my costs go up, or which fees can I negotiate. Produces a section-by-section decode, the Loan-Estimate comparison with tolerance flags, the challenge list with scripts, and the cash-to-close verification."
---

# Closing Disclosure Decoder Skill

The Closing Disclosure arrives three days before the biggest purchase of your life, formatted to discourage reading. This skill reads it: every section in plain English, every fee sorted into real / shoppable / challenge, and — the part with teeth — the comparison against the Loan Estimate, where regulated tolerance rules make some increases the lender's problem, not yours.

## What This Skill Produces

- **Section decode** — A through J in plain English, the three-day clock stated
- **Fee triage** — real and fixed / shoppable-too-late-but-note-it / challenge-now, with amounts
- **The LE comparison** — what moved since the Loan Estimate, tolerance category per change
- **Challenge scripts** — exact wording for the lender call, ranked by recovery odds
- **Cash-to-close check** — the bottom line reconciled against your own math

## Required Inputs

Ask for these only if not provided:
- **The Closing Disclosure** (page-by-page paste or the figures)
- **The Loan Estimate** — the comparison is the leverage; without it, decode-only and say so
- **Closing date** — the three-business-day review clock
- **Anything that changed** — rate lock, loan amount, program — legitimate changes reset some tolerances

## Framework

1. **The tolerance tiers do the work:** some fee categories can't increase at all from the LE (lender fees, transfer taxes), some by a limited amount in aggregate (recording, required-provider services), some float freely (prepaids, per-diem interest). Sort every increase into its tier — over-tolerance increases are typically refundable at or after closing. Flag with *"tolerance rules per applicable regulation — verify jurisdiction specifics."*
2. **Junk-fee pattern list:** processing + underwriting + application fees stacked (same work, three names), courier/email fees, padded "doc prep," title add-ons never requested. Challenge with the script, not with anger.
3. **Prepaids aren't fees:** escrow, insurance, per-diem interest are your money moving early — decode them as such so the outrage lands only on actual costs.
4. **The math check:** loan amount + closing costs − deposits/credits = cash to close. Recompute it; transposition errors at closing are rarer than folklore says but catastrophic when real.
5. **Three days is enough** if used: the review clock exists precisely for this reading — schedule the lender call for day one.

## Output Format

### Closing Disclosure Decode: [property] — closing [date], review clock ends [date]
**Verdict:** clean / call the lender today about [n] items / discrepancy needs resolution before signing

**Sections A–J, decoded** [table: line · plain English · triage]
**Changed since the Loan Estimate** | Fee | LE | CD | Δ | Tolerance tier | Your move |
**The challenge list** — ranked, with scripts ("Line B-4 increased $310 beyond the Loan Estimate; that category has zero tolerance — please correct or document the changed circumstance.")
**Cash to close, reconciled:** [their number] vs [computed] — [match/discrepancy]

End verbatim: *"This is a plain-language reading, not legal or lending advice — disclosure and tolerance rules vary by jurisdiction and loan type; confirm anything load-bearing with your closing attorney or settlement agent before signing."*

## Quality Checks

- [ ] Every LE→CD increase is assigned a tolerance tier
- [ ] Prepaids are decoded as your-money-moving, separate from fees
- [ ] Challenge scripts quote line numbers and amounts
- [ ] Cash-to-close is independently recomputed
- [ ] The three-day clock dates appear in the header
- [ ] The disclaimer appears verbatim

## Anti-Patterns

- [ ] Do not rage at the total — the leverage lives line-by-line in the tolerance tiers
- [ ] Do not treat prepaid escrow as a junk fee — misdirected outrage burns the real challenges
- [ ] Do not accept "that's standard" on stacked processing fees — standard is not a tolerance category
- [ ] Do not let the clock expire politely — the review period is for reviewing; day one, not day three
- [ ] Do not present tolerance rules as universal law — flag jurisdiction/loan-type variation and refer to the settlement agent

## Example Trigger Phrases

- "Decode my closing disclosure."
- "Review my closing costs."
- "Why did my costs go up?"
- "Which fees can I negotiate?"
