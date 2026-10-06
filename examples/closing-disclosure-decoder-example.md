# Example: closing-disclosure-decoder

## What this skill does

Decodes a mortgage Closing Disclosure line by line: which fees are real, shoppable or junk, what changed since the Loan Estimate with tolerance-tier flags, challenge scripts for the lender call, and the cash-to-close arithmetic recomputed.

## How to trigger it

### Example 1: "why did my costs go up?"

**You say:**
> "Decode my closing disclosure against the Loan Estimate [both pasted]. Closing is Thursday. Cash to close went from $31,400 to $34,150 and I don't know why."

**Claude produces (excerpt):**

### Closing Disclosure Decode: [property], closing Thursday, review clock ends [date]
**Verdict:** call the lender today about 2 items; the rest of the increase is real but explainable.

**Changed since the Loan Estimate**

| Fee | LE | CD | Δ | Tolerance tier | Your move |
|---|---|---|---|---|---|
| B-4 Underwriting fee | $995 | $1,305 | +$310 | zero tolerance | challenge; refundable if uncorrected |
| B-6 "Doc prep" | (not on LE) | $250 | +$250 | zero tolerance (new lender fee) | challenge; it appeared from nowhere |
| C-1 Title services | $1,850 | $1,975 | +$125 | 10% aggregate | within tolerance; no move |
| F/G Prepaids & escrow | $3,900 | $5,460 | +$1,560 | floats freely | not a fee; see below |
| Per-diem interest | $410 | $915 | +$505 | floats | closing date moved; arithmetic, not mischief |

**The decode of the $2,750:** $560 of it is genuinely challengeable (B-4, B-6); ~$2,065 is prepaids and per-diem, which are your own money moving early into escrow, not costs; $125 is within its tolerance band. The outrage budget belongs on the $560. [Tolerance rules per applicable regulation; verify jurisdiction specifics.]

**The challenge list, with script:** "Line B-4 increased $310 beyond the Loan Estimate and B-6 is a new lender fee; both sit in the zero-tolerance category. Please correct them or document the changed circumstance that permits the increase." Say it on day one of the three-day window, in writing.

**Cash to close, reconciled:** their $34,150 vs computed $34,150: matches. The increase is explained; it was never a maths error, it was two fees and a moved date.

*This is a plain-language reading, not legal or lending advice; disclosure and tolerance rules vary by jurisdiction and loan type; confirm anything load-bearing with your closing attorney or settlement agent before signing.*

### Example 2: the junk-fee stack

**You say:**
> "Different lender, section B lists: application fee $495, processing fee $695, underwriting fee $925, 'e-doc delivery' $95. Normal?"

**Claude produces (excerpt):**

**The pattern:** application + processing + underwriting is the same work wearing three names, $2,115 where competitive lenders charge one origination-type fee; and $95 to email documents prices a PDF like a courier. None of this is illegal; all of it is negotiable, and the leverage moment is *before* you commit, not at the CD stage. The script: "Lenders I'm comparing quote a single origination fee; can you consolidate B-1 through B-3 or match $[competitor total]?" If the loan is already at CD stage, the zero-tolerance comparison against your LE is the remaining lever.

*This is a plain-language reading, not legal or lending advice; disclosure and tolerance rules vary by jurisdiction and loan type; confirm anything load-bearing with your closing attorney or settlement agent before signing.*

## Tips for best results

- Provide both documents; the CD only reveals its increases next to the LE.
- Make the lender call on day one of the review window; the three days are enough only if used.
- Keep prepaids out of the grievance list; escrow is your money early, and mixing it in weakens the real challenges.

## Related skills

- `lease-decoder` for the renting equivalent of this reading
- `benefits-decoder` for the same fine-print treatment on an employment offer
