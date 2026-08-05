---
name: money-priorities-order
description: "Decide where your next dollar should go — the order to tackle emergency fund, high-interest debt, retirement match, and saving/investing — so you stop guessing and build momentum. Use when asked what should I do with my money first, pay off debt or save, where to put extra money, or help me prioritize my finances. Produces a personalized order-of-operations for your situation, the reasoning for each step, where you are on the ladder and the next concrete move, and honest flags on the judgment calls. Educational — not financial advice."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/money-priorities-order.html
metadata:
  {
    "openclaw": { "emoji": "💵" }
  }
---

# Money Priorities Order

Most money stress isn't "how do I budget" — it's "I have some money (or some slack), what do I do with it *first*?" Pay debt or save? Invest or build a cushion? This lays out a sensible order of operations for your situation, shows where you currently sit on that ladder, and names the single next move — so you act with a plan instead of guilt and guessing.

## What This Skill Produces

- **A personalized order of operations** — the sequence (starter emergency buffer → employer match → high-interest debt → full emergency fund → tax-advantaged investing → goals), adjusted to your reality
- **The why for each step** — the logic (e.g. free match beats almost everything; high-interest debt beats most investing returns)
- **Where you are now** — which rung you're on and what's already handled
- **The next concrete move** — one clear action, not the whole ladder at once
- **The judgment calls** — where reasonable people differ (e.g. small debts for momentum vs. highest-rate first) flagged honestly

## Required Inputs

Ask for these if not provided:
- **Debts** — types, balances, and interest rates (rates are the key input)
- **Savings** — any emergency fund, and how stable your income/expenses are
- **Retirement** — access to an employer match or tax-advantaged accounts, and current contributions
- **The slack** — roughly how much extra per month, or a lump sum
- **Goals & context** — near-term goals, dependents, job stability, region

## Framework: Highest-Value Dollar First

1. **Start with a small buffer.** A modest starter emergency fund first prevents new debt from the next surprise — before aggressive payoff or investing.
2. **Grab free money.** Capture any employer retirement match up to the limit — an instant return that beats paying down most debt.
3. **Kill high-interest debt.** Above the match, high-interest debt (cards) usually beats investing — a guaranteed return equal to the rate.
4. **Build the full cushion.** Grow the emergency fund to a few months of expenses, sized to income stability and dependents.
5. **Then invest and fund goals.** Tax-advantaged investing and specific goals come after the foundation — and lower-interest debt can run alongside.
6. **Flag the human calls.** Snowball (smallest balance for momentum) vs. avalanche (highest rate for math), and risk tolerance, are personal — present the trade-off, don't dictate.

## Output Format

### Money priorities: extra ~[amount] · debts [rates] · match? [y/n]

**Your order of operations**
1. [step — status: done/in progress/next]
2. [step]
… (tailored ladder)

**Where you are:** [rung], with [what's handled].
**Your next move:** [one concrete action with the amount].
**Judgment call:** [e.g. snowball vs avalanche — the trade-off, your call].

> Educational, not financial advice. This is a general framework; your rates, stability, and goals drive it — consider a fee-only advisor for big decisions.

## Quality Checks
- [ ] Order is personalized to the person's debts/rates, match, and buffer
- [ ] Explains the reasoning for each step (match, interest rates)
- [ ] Identifies where they currently are on the ladder
- [ ] Gives one concrete next move, not the whole list
- [ ] Flags the genuine judgment calls (snowball vs avalanche, risk)
- [ ] States it isn't financial advice

## Anti-Patterns
- **A rigid one-size ladder** ignoring their rates and stability.
- **Skipping the employer match** — leaving free money.
- **"Invest everything"** while high-interest debt compounds.
- **No starter buffer** — one surprise restarts the debt cycle.
- **Dictating snowball vs avalanche** instead of showing the trade-off.

## Example Trigger Phrases
- "Should I pay off my credit card or build savings first?"
- "I have $500 extra a month — where should it go?"
- "What should I do with my money first? I'm overwhelmed."
- "Pay down my student loan or invest?"
- "Help me prioritize: debt, emergency fund, or retirement?"
