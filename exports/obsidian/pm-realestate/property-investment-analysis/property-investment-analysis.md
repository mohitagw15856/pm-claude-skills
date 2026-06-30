---
aliases: ["Property Investment Analysis"]
tags: [pm-skills, skill]
skill: property-investment-analysis
description: "Analyze a rental / investment property's returns — cash flow, cap rate, cash-on-cash, ROI. Use when asked to analyze a rental property, evaluate a real-estate investment, run the numbers on an investment property, or compute cap rate / cash-on-cash. Produces an investment analysis — income and expenses, NOI, cap rate, monthly cash flow, cash-on-cash return, and a verdict against the investor's criteria — with formulas and a worked example. Not financial advice."
---

# Property Investment Analysis Skill

A rental looks good until you run the real numbers — vacancy, maintenance, management, and debt service decide
whether it actually cash-flows. This skill structures the analysis with the metrics investors actually use
(**NOI, cap rate, cash-on-cash, cash flow**), shows the formulas and a worked example, and gives a verdict
against the investor's target — so a deal is judged on math, not optimism.

> **Note:** this is an analysis aid, **not financial, investment, tax, or legal advice**, and it does not
> guarantee returns. It computes from the figures and assumptions you provide; verify numbers and decisions with
> a qualified professional. Use real figures where given; never fabricate income/expenses — mark placeholders.

## Working from a brief

Given a price and rent, **run the analysis anyway** — structure it with the standard metrics and a worked
example, using realistic placeholder assumptions for any missing operating cost *(replace with your numbers)*
(vacancy %, maintenance, management, taxes, insurance). Show the formulas. Never present invented figures as
real.

## Required Inputs

Ask for these only if they aren't already provided (else use labelled placeholders):

- **Purchase** — price, closing costs, expected rehab, and the financing (down payment, rate, term) if leveraged.
- **Income** — monthly rent (and any other income), and a realistic vacancy assumption.
- **Operating expenses** — taxes, insurance, maintenance, management, HOA, utilities, capex reserve.
- **Investor criteria** — target cash-on-cash / cap rate / monthly cash flow, and the strategy (buy-and-hold, etc.).

## Output Format

### Investment Analysis: [property]

- **How the numbers work** — the formulas up front: `NOI = annual income − operating expenses (excl. debt)`; `Cap rate = NOI / price`; `Cash flow = NOI − debt service`; `Cash-on-cash = annual cash flow / cash invested`.
- **Income** — gross rent, vacancy allowance, effective income.
- **Operating expenses** — itemised (taxes, insurance, maintenance, management, reserves…), with placeholders flagged.
- **Returns** — a clean summary with the worked numbers:

| Metric | Value |
|---|---|
| NOI (annual) | … |
| Cap rate | …% |
| Monthly cash flow | … |
| Cash invested | … |
| Cash-on-cash return | …% |

- **Verdict** — does it meet the investor's criteria? The strengths, the risks, and the assumptions it hinges on (rent, vacancy, capex).
- **Sensitivity** — how the verdict shifts if rent is lower or vacancy/expenses higher (a quick downside check).

Mark all placeholder figures *(replace with your numbers)*.

## Quality Checks

- [ ] Uses real metrics (NOI, cap rate, cash flow, cash-on-cash) with the formulas shown
- [ ] Operating expenses include the often-forgotten ones (vacancy, maintenance, management, capex reserves)
- [ ] Debt service is separated from operating expenses (NOI excludes it; cash flow includes it)
- [ ] Returns are computed from the inputs, not invented; placeholders are flagged
- [ ] The verdict is judged against the investor's stated criteria
- [ ] A downside/sensitivity check is included

## Anti-Patterns

- [ ] Do not omit vacancy, maintenance, management, and capex — that's how a "good" deal becomes a money pit
- [ ] Do not fold debt service into operating expenses — it breaks NOI and cap rate
- [ ] Do not invent operating costs as fact — use the user's figures or labelled placeholders
- [ ] Do not present one optimistic scenario — show the downside sensitivity
- [ ] Do not give investment advice or guarantee returns — analyse and point to a professional

## Based On

Real-estate investment analysis practice — NOI/cap-rate/cash-on-cash modelling, full operating-expense accounting, and downside sensitivity.

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text — replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}
