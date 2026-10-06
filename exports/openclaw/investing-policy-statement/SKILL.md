---
name: investing-policy-statement
description: "Draft a personal investing policy statement (IPS) — the rules someone sets for their own investing. Use when asked to define an investment strategy, set a target asset allocation, or write rules to avoid panic-driven decisions. Produces a structured IPS: goals, risk tolerance, target allocation, contribution & rebalancing rules, and what NOT to do. Educational, not regulated financial advice."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/investing-policy-statement.html
metadata:
  {
    "openclaw": { "emoji": "💵" }
  }
---

# Investing Policy Statement Skill

The biggest investing mistakes are behavioural — panic-selling, chasing, tinkering. A personal **Investing
Policy Statement** is the rulebook you write while calm, to follow when you're not. This skill drafts one:
goals, risk tolerance, a target asset allocation, and the contribution/rebalancing rules that keep you on
track. It's educational and generic — **not** personalized financial advice or a recommendation of specific
securities.

## Required Inputs

Ask for these only if they aren't already provided:

- **Goals & time horizon** — what the money is for and when it's needed (retirement in 25y, house in 5y).
- **Risk tolerance** — how they'd react to a 30% drop; capacity for loss; experience level.
- **Current situation** — roughly what's invested where, monthly amount to invest, account types available.
- **Constraints / values** — liquidity needs, ESG preferences, things to avoid.

## Output Format

### Investing Policy Statement — [name]

**1. Purpose & goals** — what this portfolio is for, time horizon, target.

**2. Risk tolerance & capacity** — a plain-language statement of how much volatility is acceptable and why.

**3. Target asset allocation** — broad asset classes with target % and a tolerance band (illustrative example, to adapt):

| Asset class | Target % | Rebalance band |
|---|---|---|
| Equities (broad, diversified) | % | ±5% |
| Bonds / fixed income | % | ±5% |
| Cash / short-term | % | ±5% |

**4. Contribution rules** — how much, how often, automated; the order of accounts to fill (e.g. employer-match first, then tax-advantaged).

**5. Rebalancing rules** — when (calendar or band-triggered) and how.

**6. What I will NOT do** — the behavioural guardrails (no panic-selling in a downturn, no performance-chasing, no market-timing, no single-stock gambles beyond X% of the portfolio).

**7. Review cadence** — when to revisit the IPS itself (e.g. annually or on a major life change).

**Disclaimer** — generic and educational; not individualized advice; consider a licensed fiduciary for personal recommendations.

## Quality Checks

- [ ] Allocation is tied to the stated goals, horizon, and risk tolerance — not generic
- [ ] Allocation percentages sum to 100% and include rebalancing bands
- [ ] Contribution and rebalancing rules are concrete (amount, frequency, trigger)
- [ ] The "will NOT do" guardrails address real behavioural traps
- [ ] Diversification is the default; no specific ticker/security recommendations
- [ ] The educational / not-advice nature is stated

## Anti-Patterns

- [ ] Do not recommend specific stocks, funds by ticker, or "hot" assets — stay at the asset-class level
- [ ] Do not set an allocation that ignores the stated time horizon (e.g. all-equities for money needed next year)
- [ ] Do not omit the behavioural guardrails — they're the point of an IPS
- [ ] Do not imply guaranteed returns or market-timing works
- [ ] Do not present this as personalized financial advice

## Based On

The Investment Policy Statement framework (goals, risk, allocation, rules) used by advisors and DIY investors.

## Example Trigger Phrases

- "Define an investment strategy."
- "Set a target asset allocation."
- "Write rules to avoid panic-driven decisions."
