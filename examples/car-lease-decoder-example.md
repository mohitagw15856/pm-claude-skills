# Example: car-lease-decoder

## What this skill does

Decodes a car lease offer into real numbers: the money factor converted to APR, the lease equation reconciled against the quoted payment, the trap list with dollar exposure, and the negotiation points dealers expect to concede.

## How to trigger it

### Example 1: "is this lease deal good?"

**You say:**
> "Decode this lease: $429/month, 36 months, 10k miles/year, $2,500 drive-off. Cap cost $38,900, residual $23,340, money factor 0.00325, $0.25/mile over, $450 disposition fee. I actually drive about 14k a year."

**Claude produces (excerpt):**

### Lease Decode: [vehicle], 36mo/10k

**The two numbers:** effective APR **7.8%** (0.00325 × 2400) · total lease cost **≈ $21,370** ($429 × 36 + $2,500 drive-off + $450 disposition + **$3,000 projected mileage charges**)

**The equation, reconciled:** depreciation ($38,900 − $23,340 = $15,560) + rent charge (($38,900 + $23,340) × 0.00325 × 36 ≈ $7,282) = $22,842 ÷ 36 ≈ $634/month before tax; their $429 implies the drive-off and possibly a rebate are buying down the payment. Ask for the worksheet; the equation should reconcile to the dollar, and a gap is a question.

**Trap table**

| Trap | The line | Your exposure | The ask |
|---|---|---|---|
| Mileage tier | 10k allowance vs your real 14k | 12,000 extra miles × $0.25 = **$3,000** | price the 15k tier now; buying miles upfront is always cheaper than paying at return |
| MF markup | 0.00325 quoted | if the captive published ~0.00245, the markup costs ~$1,100 over term | "what's the buy rate?"; markup is dealer profit and negotiable |
| Disposition | $450 at return | $450 | waived if you lease or buy from them again; ask for it in writing |
| Wear standards | "excessive wear" undefined | unknowable | ask for the lessor's published wear guide before signing |

**Negotiation points:** cap cost first and alone ("What payment do you want?" is the trap question; the answer is a cap-cost number); then the MF against the buy rate; then the mileage tier. In that order, because each later number is computed from the earlier ones.

**Lease vs buy pointer:** at 7.8% effective and your mileage, buying used or financing new at a credit-union rate deserves one honest comparison before signing; full maths via `car-tco`.

*This is a plain-language reading, not financial advice; lease structures and taxes vary by jurisdiction; confirm anything load-bearing before signing.*

### Example 2: the "same payment, better deal" check

**You say:**
> "Dealer came back: same $429/month but now $3,900 drive-off and 'we threw in the maintenance package'. Better?"

**Claude produces (excerpt):**

**No; it is $1,400 worse wearing a gift bow.** Total cost rose from ~$21,370 to ~$22,770; the payment stayed still while the drive-off absorbed the increase, which is the standard move when a customer watches only the monthly number. The maintenance package's retail value is real but typically under $800 for the term. Counter on the decoded numbers: "total lease cost went up $1,400; let's talk cap cost and the buy-rate money factor instead."

*This is a plain-language reading, not financial advice; lease structures and taxes vary by jurisdiction; confirm anything load-bearing before signing.*

## Tips for best results

- Get the cap cost, residual and money factor in writing; a payment quote without them cannot be decoded.
- State your real annual mileage; the cheapest-looking tier is often the most expensive line in the deal.
- Compare total lease cost between offers, never monthly payments; the payment is the easiest number to decorate.

## Related skills

- `auto-repair-estimate-decoder` for the service-bay side of car ownership
- `lease-decoder` for residential leases; same scepticism, different traps
