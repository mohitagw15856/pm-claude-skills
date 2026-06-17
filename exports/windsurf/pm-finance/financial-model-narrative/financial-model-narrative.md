---
trigger: model_decision
description: "Turn financial model outputs into a clear written narrative. Use when asked to write a financial narrative, explain a financial model, summarise a P&L, or translate spreadsheet numbers into a board-ready story. Produces an executive narrative with key insights, drivers, and forward-looking commentary."
---

# Financial Model Narrative Skill

Turns financial model outputs into a clear, structured written narrative suitable for board packs, investor updates, or management reporting.

## Required Inputs
- **Financial data** (paste key figures: revenue, costs, margins, EBITDA, cash)
- **Period covered** (month / quarter / annual / multi-year)
- **Audience** (board / investors / management / bank / internal)
- **Key message** (what is the headline story?)
- **Actuals vs budget / prior period?** (comparison context)

## Output Structure

### 1. Headline Summary
3-5 sentences. The financial story in plain English. Lead with the most important insight — not "revenue was X" but what that figure means.

### 2. Revenue
- Performance vs prior period / budget
- Key drivers: what caused the movement
- Risks or opportunities in the revenue line

### 3. Costs and Margins
- Gross margin: % and trend
- Key cost movements and why
- EBITDA performance and drivers
- One-off items clearly flagged

### 4. Cash and Balance Sheet
- Cash position and movement
- Runway (for startups)
- Key working capital movements

### 5. Variance Analysis
For each significant variance:

**[Line item] — Over/Under by [amount]**
- **Cause:** [Plain English explanation]
- **Permanent or temporary?** One-time / Structural
- **Action being taken:** [If applicable]

### 6. Forward-Looking Commentary
- Expected next period
- Key risks to forecast
- Key opportunities
- Any reforecast or guidance change

## Writing Rules
- Never just restate a number — always explain what it means
- Flag variances over 10% automatically
- Use past tense for actuals, conditional for forecast
- One insight per paragraph

## Quality Checks

- [ ] Headline summary leads with meaning, not just the number
- [ ] Every significant variance has a cause, permanence, and action
- [ ] Forward-looking commentary includes specific risks and opportunities
- [ ] Audience-appropriate language (board vs investor vs management)
- [ ] One-off items clearly distinguished from recurring items

## Anti-Patterns

- [ ] Do not list numbers without explaining what is driving them — narrative must go beyond restating the figures
- [ ] Do not mix one-off items with recurring performance without clearly distinguishing them
- [ ] Do not write the same level of detail for all line items — focus depth on the items that matter most
- [ ] Do not omit forward-looking commentary — a narrative without outlook is incomplete for board or investor audiences
- [ ] Do not use technical accounting language without translation — the audience is executives, not accountants

## Example Trigger Phrases
- "Write a financial narrative for these results: [paste numbers]"
- "Turn this P&L into a board narrative"
- "Write the finance section of our board pack"
- "Explain these financial results in plain English"
