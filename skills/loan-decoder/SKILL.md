---
name: loan-decoder
description: "Decode a personal, auto, or mortgage loan offer into what it really costs and where the traps are. Use when someone asks 'is this loan a good deal', 'decode my loan offer', 'what am I signing', or 'what will this mortgage actually cost me'. Produces a total-cost-of-loan number, APR vs advertised-rate reconciliation, ranked red flags (prepayment penalties, junk fees, rate-reset exposure), and the three questions that most change the deal."
---

# Loan Decoder Skill

Loan paperwork is built around the number they want you to see (the monthly payment) and several
they'd rather you didn't. This skill computes what you'll actually pay in total, then ranks
everything in the offer that can quietly move that number against you.

## What This Skill Produces

- The total-cost-of-loan number: everything paid over the life, and total interest + fees
- APR vs. advertised rate, reconciled — where the gap comes from
- Ranked red flags: prepayment penalties, junk fees, variable-rate reset exposure, add-ons
- The three questions that most change this specific deal, plus what's negotiable

## Required Inputs

Ask for these only if they aren't already provided:

- **The offer document text** — loan estimate, term sheet, or contract. With partial paperwork, decode what's there and list the numbers still needed (APR, fee itemization, penalty terms).
- **Loan basics if not in the text** — amount, rate, term, fixed or variable.
- **Their plan** — how long they'll keep the loan/asset, and whether they might pay early.

## Framework: Severity Scale

- 🔴 **Can cost you real money** — prepayment penalties (quote the formula, compute an example), precomputed interest / Rule of 78s, mandatory add-ons folded into principal (credit insurance, warranties, GAP), balloon payments, variable-rate exposure without caps, rate markups.
- 🟡 **Unusual — push back** — junk fees (doc/processing/admin fees beyond genuine third-party costs), mandatory arbitration, cross-collateralization, late-fee stacking.
- 🟢 **Standard** — ordinary origination structure, genuine third-party costs (appraisal, recording); label them so the reader can relax.

Always show the arithmetic:
1. **Total cost of loan** = all payments + all lender-kept fees; show monthly × months + fees and the interest subtotal.
2. **APR vs. advertised rate** — explain the gap as fees expressed as a rate; if APR isn't stated, flag it, don't estimate silently.
3. **Variable-rate reset framing** — index + margin, caps, and the payment at the caps. Frame as exposure ("payment can go from X to Y"), not prediction.
4. **Early-exit math** — the cost of paying off in the user's stated timeframe, penalty applied.

## Output Format

### Loan Decode: [loan type, amount]

**1. The verdict** — take it / negotiate these terms first / shop elsewhere, with the total-cost number up front.

**2. The real numbers** — total cost, total interest, total fees, APR vs. advertised rate with the gap explained; worst-case reset payment if variable.

**3. Decode table**

| Term / fee | What the document says | What it means for you | Severity |
|---|---|---|---|

**4. 🚩 Red flags, ranked** — the quoted line, its dollar cost under a realistic scenario, and the fix to ask for.

**5. The three questions that most change the deal** — specific to this offer (e.g. "What's the rate without the add-ons?", "Is there a prepayment penalty, in writing?", "Which fees are yours vs. third-party?").

**6. What's negotiable** — rate, fees, add-ons, penalty removal — and which lever moves the total most.

End the artifact with, verbatim: *"This is a plain-language reading, not legal/financial advice — laws vary by jurisdiction; confirm anything load-bearing with a qualified professional."*

## Quality Checks

- [ ] Total-cost-of-loan is computed with visible arithmetic, not asserted
- [ ] APR vs. advertised rate is reconciled or explicitly flagged as missing
- [ ] Variable-rate exposure is shown as concrete payment amounts at the caps
- [ ] Every red flag quotes the document and prices the harm in dollars
- [ ] Missing numbers are listed as `[to confirm]`, never estimated silently
- [ ] The disclaimer line appears verbatim in the artifact

## Anti-Patterns

- [ ] Do not invent terms, rates, or fees that aren't in the document
- [ ] Do not soften a red flag to seem balanced — a prepayment penalty is a cost, name it
- [ ] Do not present jurisdiction-dependent lending rules as universal
- [ ] Do not compare against "typical market rates" as fact — frame comparisons as ranges to verify
- [ ] Do not let the monthly payment carry the verdict — total cost is the headline

## Based On

Borrower-side loan review practice — total-cost math, APR reconciliation, fee auditing, reset-scenario framing.
