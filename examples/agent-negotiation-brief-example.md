# Example: Agent Negotiation Brief

## What this skill does
Brief an AI agent that will negotiate for you with another party's agent or a person (a refund, a price, a meeting time, a contract term): your goal, your opening, your limits, your walk-away point, what it must never reveal, and when it must come back to you.

## How to trigger it

### Example 1: A refund with an airline's chat agent
**You say:**
> "Brief my agent to get a refund for a cancelled flight: £312. I'd accept vouchers only if they're worth at least £400 and never expire."

**Claude produces (excerpt):**

**Aim for:** a cash refund of £312 to the original card. **Accept at least:** vouchers worth £400 or more with no expiry. **Walk away when:** they offer only vouchers under £400 or with an expiry; report back.

| Step | Offer or concession | Only in return for |
|---|---|---|
| Open | Full cash refund, citing the cancellation | none |
| 2 | Consider vouchers | a value of £400+ and no expiry, in writing |

**Never reveal:** that you would accept vouchers, until they refuse cash twice.
**Come back to me before:** accepting anything, or if they ask for a signature.

---

### Example 2: From a one-line request
**You say:**
> "Brief my agent to negotiate a refund for me"

**Claude produces (excerpt):** the full output with sensible defaults marked [inferred], and the questions that would sharpen it at the end.

## Tips for best results
- Give one or two concrete facts (an amount, a date, a name); the defaults get much tighter
- Read the "Assumptions and gaps" lines first; they are where the output is guessing
- Keep the result somewhere your agent can read it every time

## Related skills
- `tool-permission-review`: what the agent can technically do
- `approval-policy-designer`: what it may do alone
- `salary-negotiation`: when you negotiate yourself
