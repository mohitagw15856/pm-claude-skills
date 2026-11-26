# Example: Microloan Comparison

## What this skill does
Turns each loan offer into the same measures (money received, total repaid, real cost per year) and flags the risks that matter more than the rate.

## How to trigger it

### Example 1: Flat rate against reducing balance
**You say:**
> "Offer A: 10,000 for 12 months at 2% flat per month, 300 fee taken upfront. Offer B: 10,000 for 12 months at 30% a year on the reducing balance, no fee. Which is cheaper?"

**Claude produces:**
**1. What each loan really costs**
| | Offer A | Offer B |
|---|---|---|
| Money you receive | 9,700 | 10,000 |
| Interest | 2,400 (2% × 10,000 × 12) | about 1,700 |
| Total you repay | 12,400 | about 11,700 |
| Total cost | **2,700** | **about 1,700** |
| Approximate yearly rate | **about 50%** | 30% |

The "2% a month" offer costs far more: its interest is charged on the full 10,000 all year, even after you have repaid most of it, and the fee comes out of the money you receive. **Offer B is cheaper by about 1,000.**

---

### Example 2: A lending app
**You say:**
> "An app offers 3,000 for 14 days and I repay 3,450."

**Claude produces:**
You pay 450 to borrow 3,000 for two weeks. Repeated over a year, that is a cost of **over 300% a year** (approximate). Before accepting, check whether the app asks for access to your contacts or photos, and what happens if you are late: rollover fees can make the debt grow fast.

---

## Tips for best results
- Give every fee, and say whether interest is "flat" or on the balance
- Mention any compulsory savings or group guarantee
- Say what the loan is for and when that money comes in

## Related skills
- `loan-decoder`: read the terms of one loan agreement in detail
- `daily-cash-book`: the records a lender will ask for
