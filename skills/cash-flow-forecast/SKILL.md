---
name: cash-flow-forecast
description: "Build a short-term (13-week) cash flow forecast to see if you can cover what's due. Use when asked to build a cash flow forecast, a 13-week cash flow, a cash projection, or to plan around a cash crunch. Produces a week-by-week forecast structure — opening cash, expected inflows, scheduled outflows, net movement, and closing/low-point — with the formulas and a worked example, plus the levers if cash goes tight. Not financial advice."
---

# Cash Flow Forecast Skill

Profit is an opinion; cash is a fact — and businesses fail by running out of it even while "profitable". A
short-term (commonly **13-week**) cash flow forecast shows, week by week, whether money coming in covers money
going out, and *when* the tightest point hits. This skill builds that forecast's structure and math so you can
see trouble early and act.

> **Note:** this is a planning aid, **not financial, investment, or accounting advice**. It structures a forecast
> from figures you provide and projects from your assumptions; it does not guarantee outcomes. Confirm material
> decisions with a qualified accountant/advisor. Never invent actual balances or amounts.

## Working from a brief

Given "build me a 13-week cash flow", **produce the full structure anyway** — lay out the model with the
formulas and a **worked example using placeholder figures** *(replace with your numbers)*. Use the real numbers
where the user gave them; never fabricate a starting balance or a result.

## Required Inputs

Ask for these only if they aren't already provided (else use labelled placeholders):

- **Starting cash** — current bank balance (the opening position).
- **Inflows** — expected receipts and their timing (customer payments, with realistic collection timing, not invoice date).
- **Outflows** — scheduled payments and timing (payroll, rent, suppliers, loan repayments, tax, subscriptions).
- **Horizon & purpose** — 13 weeks (default) or other, and what decision it informs (a crunch, a hire, a raise).

## Output Format

### 13-Week Cash Flow Forecast: [business]

- **How it works** — the model in one line: `Closing cash = Opening cash + Inflows − Outflows`, run week over week (each week's closing is the next week's opening).
- **Forecast table** — a week-by-week layout (template + a worked example with placeholder figures):

| Week | Opening cash | Inflows | Outflows | Net | Closing cash |
|---|---|---|---|---|---|

  Break inflows/outflows into their main lines (receipts; payroll, rent, suppliers, tax…) so it's actionable.
- **Key read-outs** — the **lowest cash point** and which week it hits, weeks that go negative (the warning), and total net movement over the horizon.
- **Assumptions** — collection timing, what's committed vs. expected, and anything to confirm — stated explicitly (the forecast is only as good as these).
- **If cash goes tight — levers** — accelerate receivables, delay/stagger payables, cut/defer discretionary spend, draw on credit, or raise — with the trade-offs.

Mark all placeholder figures *(replace with your numbers)*.

## Quality Checks

- [ ] Built on cash *timing* (when money actually moves), not invoice/accrual dates
- [ ] The week-over-week roll-forward is correct (closing → next opening) and the math is shown
- [ ] The lowest cash point and any negative weeks are surfaced clearly
- [ ] Assumptions (collection timing, committed vs. expected) are explicit
- [ ] Numbers are real where provided and placeholders elsewhere — nothing invented
- [ ] Practical levers are offered for a tight-cash scenario with trade-offs

## Anti-Patterns

- [ ] Do not use invoice dates for inflows — model when cash is actually expected to land
- [ ] Do not invent a starting balance or amounts — use the user's figures or labelled placeholders
- [ ] Do not hide the assumptions — a forecast without them is false precision
- [ ] Do not bury the low point — the whole purpose is to see the crunch coming
- [ ] Do not present projections as guarantees or as financial advice

## Based On

Cash management practice — short-horizon (13-week) cash flow forecasting on payment timing, low-point analysis, explicit assumptions, and liquidity levers.
