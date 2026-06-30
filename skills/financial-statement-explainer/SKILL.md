---
name: financial-statement-explainer
description: "Explain a financial statement (P&L, balance sheet, or cash flow) in plain English. Use when asked to explain a P&L / income statement, a balance sheet, a cash flow statement, or to make financials understandable to a non-finance reader. Produces a plain-language walkthrough — what each section means, the line items that matter, the key ratios, and the story the numbers tell — so a non-accountant can read and act on it. Not financial advice."
---

# Financial Statement Explainer Skill

Financial statements are precise but opaque to most people. This skill translates a P&L, balance sheet, or cash
flow into **plain English** — what each part means, which numbers actually matter, and the story they tell about
the business — so a founder, manager, or operator can read their own financials and make decisions.

> **Note:** this is an educational explainer, **not financial, investment, tax, or accounting advice**. It
> explains figures the user provides; it does not audit them or recommend financial decisions. Verify numbers
> and any decisions with a qualified accountant/advisor. Never invent figures.

## Working from a brief

Given a statement (or a few key numbers), **explain it anyway** — walk through the structure and interpret the
figures provided. Where a number isn't given, explain *what to look for* rather than inventing it. Never
fabricate amounts or compute ratios from numbers you weren't given.

## Required Inputs

Ask for these only if they aren't already provided (else explain generally / mark unknown):

- **The statement** — which one (P&L / balance sheet / cash flow), the figures, and the period.
- **The reader** — who needs to understand it and why (a founder, a manager, an investor conversation).
- **The question behind it** — what they're trying to learn (Are we profitable? Can we make payroll? Why is cash tight?).
- **Context** — business type/stage, if it helps interpret what's normal.

## Output Format

### [Statement] Explained

- **What this statement tells you** — one or two lines on what this statement is *for* (P&L = profitability over a period; balance sheet = what you own/owe at a point; cash flow = where cash actually moved).
- **Section-by-section** — walk the structure in plain terms, using the provided numbers:
  - **P&L:** revenue → COGS → gross profit/margin → operating expenses → operating income → net income; what each step means.
  - **Balance sheet:** assets, liabilities, equity; the accounting equation; what current vs. long-term means.
  - **Cash flow:** operating, investing, financing; why profit ≠ cash.
- **The numbers that matter** — the few line items and **ratios** worth watching for this reader (e.g. gross margin, burn, current ratio, runway) — with the formula and the figure if the inputs were given.
- **The story** — what the statement is saying overall (healthy/strained, improving/declining, where to look).
- **Watch-outs & next questions** — what looks notable and what to ask an accountant.

## Quality Checks

- [ ] Plain language — every term is explained, no unglossed jargon
- [ ] Interpretation uses only the figures provided; missing data is flagged, not invented
- [ ] The few ratios/numbers that matter for this reader are highlighted with their meaning
- [ ] It answers the reader's underlying question, not just describes the rows
- [ ] The "profit vs. cash" distinction is made clear where relevant
- [ ] Frames as education with a prompt to verify with a professional — not financial advice

## Anti-Patterns

- [ ] Do not invent figures or compute ratios from numbers you weren't given
- [ ] Do not drown the reader in every line — surface what matters for their question
- [ ] Do not give investment/financial *advice* — explain, and point decisions to a professional
- [ ] Do not assume accounting literacy — define terms as you go
- [ ] Do not conflate profit and cash — they're different and the reader needs to know why

## Based On

Financial-literacy practice — plain-language statement walkthroughs (P&L, balance sheet, cash flow), the ratios that matter, and the profit-vs-cash distinction.
