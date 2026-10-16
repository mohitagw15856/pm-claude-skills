---
name: net-worth-statement
description: "Produce a personal net-worth statement — assets minus liabilities — and a way to track it. Use when asked to calculate net worth, summarize finances, or set up net-worth tracking. Produces a categorized assets/liabilities statement, the net-worth figure, liquidity and debt ratios, and a tracking cadence. Educational, not regulated financial advice."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/net-worth-statement.html
metadata:
  {
    "openclaw": { "emoji": "💵" }
  }
---

# Net Worth Statement Skill

Net worth is the single best snapshot of financial health — and tracking its *trend* matters more than the
number. This skill turns someone's assets and debts into a clean **net-worth statement**, with a few useful
ratios and a simple way to track it over time. Educational, not personalized financial advice.

## Required Inputs

Ask for these only if they aren't already provided:

- **Assets** — cash/savings, investment & retirement accounts, property, vehicles, other valuables (current values).
- **Liabilities** — mortgage, car loans, student loans, credit cards, other debts (current balances).
- **Context** (optional) — age/stage and goal, so the read is meaningful.

## Output Format

### Net worth — [name] · as of [date]

**Assets**

| Asset | Type (liquid / invested / fixed) | Value |
|---|---|---|
| | | $ |
| **Total assets** | | **$** |

**Liabilities**

| Liability | Balance | Rate |
|---|---|---|
| | $ | % |
| **Total liabilities** | | **$** |

### Net worth: **$X** (assets − liabilities)

**Quick ratios**
- **Liquid assets:** $X (≈ N months of expenses, if known) — emergency-fund read.
- **Debt-to-asset ratio:** X% — lower is stronger.
- **Liquid vs. fixed vs. invested** split — is wealth accessible or locked up?

**Read** — one honest paragraph: what's strong, what's the biggest risk (e.g. concentration in one asset, high-rate debt, thin liquidity).

**Tracking** — record net worth monthly or quarterly; what to watch is the **trend line**, not any single month. A simple table to copy forward:

| Date | Assets | Liabilities | Net worth |
|---|---|---|---|

## Quality Checks

- [ ] Assets and liabilities are itemized and totaled; net worth = assets − liabilities
- [ ] Assets are tagged liquid / invested / fixed so accessibility is visible
- [ ] At least the debt-to-asset and liquidity reads are included
- [ ] The "read" names the single biggest strength and risk honestly
- [ ] A repeatable tracking cadence/table is provided

## Anti-Patterns

- [ ] Do not inflate asset values — use realistic current/market values, not purchase prices
- [ ] Do not omit liabilities or net them silently — show both sides
- [ ] Do not present a one-time number as the goal — emphasize the trend
- [ ] Do not ignore liquidity — high net worth that's all illiquid is a real risk worth flagging
- [ ] Do not present this as personalized financial advice

## Based On

Personal-finance net-worth accounting (assets − liabilities, liquidity & debt ratios, trend tracking).

## Example Trigger Phrases

- "Calculate net worth."
- "Summarize finances."
- "Set up net-worth tracking."
