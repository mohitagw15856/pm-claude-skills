# Example: Agent Spending Mandate

## What this skill does
Write a spending mandate that lets an AI agent buy things for you within strict limits: what it may buy, from whom, up to how much per purchase and in total, until when, and what needs your yes.

## How to trigger it

### Example 1: Weekly groceries
**You say:**
> "Let my agent do the weekly online shop at Tesco or Ocado, about £90, mostly the same list."

**Claude produces (excerpt):**

**May buy:** groceries and household basics from your usual list **from:** Tesco or Ocado only.
**Limits:** £110 per order, one order a week, £440 in total, including delivery, until 30 November.
**Always ask me first:** substitutions over £5 more than the original, anything alcoholic, any delivery pass or subscription, any new item over £10.
**Never:** gift cards, new accounts, changing the saved card or address.

---

### Example 2: From a one-line request
**You say:**
> "Let my agent buy groceries up to £80 a week"

**Claude produces (excerpt):** the full output with sensible defaults marked [inferred], and the questions that would sharpen it at the end.

## Tips for best results
- Give one or two concrete facts (an amount, a date, a name); the defaults get much tighter
- Read the "Assumptions and gaps" lines first; they are where the output is guessing
- Keep the result somewhere your agent can read it every time

## Related skills
- `approval-policy-designer`: everything else the agent may do
- `agent-kill-switch-plan`: how to stop it fast
- `subscription-audit`: find what's already being charged
