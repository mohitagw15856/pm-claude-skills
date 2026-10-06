# Example: benefits-decoder

## What this skill does

Decodes an employment benefits package into real money: benefit-by-benefit values with the fine print named, ranked red flags (cliffs, clawbacks, "discretionary" bonuses, unlimited-PTO economics), the arithmetic shown, and the questions to get answered in writing before signing.

## How to trigger it

### Example 1: "is this offer good?"

**You say:**
> "Decode this offer's benefits: $130k base, 'target bonus 15% (discretionary)', $60k equity over 4 years with 1-year cliff, 401k match 50% of first 6%, health plan with $3,500 deductible / $7,000 OOP max, 'unlimited PTO', $10k signing bonus repayable if I leave within 24 months."

**Claude produces (excerpt):**

### Benefits Decode: [company] offer

**1. The verdict:** realistically worth **$145-160k/year** depending on the bonus actually paying (assumptions below). Two things to resolve before signing: the bonus's payment conditions in writing, and the signing-bonus clawback's "within 24 months" trigger (does a layoff count?).

**2. Benefit-by-benefit decode (excerpt)**

| Benefit | What the document says | What it really means | Severity |
|---|---|---|---|
| Bonus "15% target (discretionary)" | up to $19.5k | a target, not a promise; ask for the last 2 years' average payout | 🟡 |
| Equity $60k/4yr, 1-yr cliff | $15k/year at stated valuation | leave at month 11 = $0; valuation-dependent `[to confirm]` | 🔴 |
| Signing bonus clawback | repay if leaving < 24 months | you owe $10k gross after paying tax on it; check if "leaving" includes being laid off | 🔴 |
| Unlimited PTO | "take what you need" | no accrued payout at exit; at ~$500/day that forfeits $5-7k a conventional plan would pay | 🟡 |
| Health plan | $3,500 ded / $7,000 OOP | worst-case year costs you $7,000 + premiums, whatever the brochure says | 🟡 |

**4. The math section (excerpt):** match = 50% × 6% × $130k = **$3,900/year** (check the match's own vesting); equity cliff scenario stated above; a bad health year is $7,000, which belongs in your emergency-fund maths, not the brochure's.

**5. Questions for HR (get in writing):** bonus payout history and whether payment requires being "employed on payment date"; does the clawback survive involuntary termination; the equity plan document itself (post-exit exercise window especially); match vesting schedule.

**6. What's negotiable:** the one-time items; signing bonus size, the clawback's layoff carve-out, and equity, far more than the plans themselves.

*This is a plain-language reading, not legal/financial advice; laws vary by jurisdiction; confirm anything load-bearing with a qualified professional.*

### Example 2: comparing against the current job

**You say:**
> "My current job: $138k base, 10% bonus that has paid in full for 3 years, 5 weeks accrued PTO, pension-style 8% employer contribution. The new offer above pays more base. Which is richer?"

**Claude produces (excerpt):**

**The totals, like for like:** current ≈ $138k + $13.8k (bonus with a payment history, so counted near face) + $11k retirement + accrued-PTO exit value ≈ **$165k+ and low-variance**. New offer ≈ $145-160k with the bonus unproven, the equity cliff unvested, and a clawback adding downside. The new offer's *base* headline wins; the package likely loses by $5-15k with more variance. The honest framing for the negotiation: "the total package is behind my current one; here's the arithmetic" is the strongest possible counter, because it is checkable.

*This is a plain-language reading, not legal/financial advice; laws vary by jurisdiction; confirm anything load-bearing with a qualified professional.*

## Tips for best results

- Paste the actual wording, especially around bonus and clawbacks; "discretionary" and "target" are doing legal work.
- Say your expected tenure; cliffs, clawbacks and vesting only price against a real horizon.
- Get the flagged answers in writing before signing, not after; afterwards they are favours.

## Related skills

- `salary-negotiation` to act on the decode in the offer conversation
- `401k-plan-decoder` for the deep version of the retirement plan line
