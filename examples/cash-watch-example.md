# Example: Cash Watch

## What this skill does
Set up a proactive agent to watch a small business's cash every day across Stripe, QuickBooks or Xero and the bank feed: today's cash position, money due in and out this week, failed payments, new disputes and the runway line, with clear rules for what interrupts you and what waits for the morning brief.

## How to trigger it

### Example 1: A café group on Stripe and Xero
**You say:**
> "Set up a cash watch for my two cafés. Stripe for card payments, Xero for accounts, bank feed from Starling. Payroll on the 25th, about £11,200."

**Claude produces (excerpt):**

| Line | Value | Source and time |
|---|---|---|
| Cash today | £18,450 | Starling feed via Xero, 07:00 |
| Due in this week | £3,120 | Stripe payouts scheduled |
| Due out this week | £5,900 | Xero bills due by Friday |
| Overdue over 14 days | £640 (2 catering invoices) | Xero |
| Runway | 7.5 weeks | cash ÷ average weekly fixed costs, last 8 weeks |

**Interrupt me when:** a dispute or chargeback opens; payroll funding on the 24th is short; cash drops below £15,000 [inferred: six weeks of fixed costs].

---

### Example 2: From a one-line brief
**You say:**
> "Have my agent keep an eye on my cash every morning"

**Claude produces (excerpt):** the full watch with default thresholds marked [inferred], the morning brief lines, the interrupt rules, and three questions that would sharpen it.

## Tips for best results
- Give one real number (usual daily volume, a floor, a lead time) and the thresholds stop being guesses
- Start with interrupts off for a week; read the brief lines, then switch on only the interrupts you missed
- Pair with `interrupt-rules` so this watch shares one alert policy with everything else

## Related skills
- `morning-brief-designer`: where these lines sit in the brief
- `interrupt-rules`: the shared alert policy
- `approval-policy-designer`: what the agent may do alone
