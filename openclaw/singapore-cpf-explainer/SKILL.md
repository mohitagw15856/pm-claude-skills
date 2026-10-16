---
name: singapore-cpf-explainer
description: "Use when asked how CPF works, how much CPF my employer should pay, what happens to my CPF at 55, can I use CPF for my HDB flat, should I top up my CPF, or 公积金怎么算 in Singapore. Produces how the person's CPF contributions are split across the accounts, a contribution check against payslips, what changes at 55 and 65, the housing, top-up and withdrawal options with their trade-offs, and the figures to confirm with the CPF Board."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/singapore-cpf-explainer.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Singapore CPF Explainer

The Central Provident Fund is most Singaporeans' and permanent residents' biggest asset after their home, and it touches housing, healthcare and retirement at once. People lose out by never checking their employer's contributions, by using CPF for housing without seeing the retirement cost, and by missing top-ups that earn tax relief and higher interest. This skill explains the person's CPF plainly, checks the numbers they give, and lays out their options.

Write in English unless the person asks for Chinese (新加坡华文, Simplified script) or Malay. Contribution rates, wage ceilings, retirement sums and interest rates change; mark every figure to confirm on cpf.gov.sg. This is information, not financial advice.

## Required Inputs

Ask for these if not provided:
- **Status**: Singapore citizen or permanent resident (and which year of PR), employee or self-employed
- **Age** and **monthly wages** (ordinary wages, plus any bonus)
- **Account balances** in the Ordinary, Special (or Retirement) and MediSave Accounts, if known
- **Housing**: HDB or private, loan from HDB or a bank, how much CPF already used
- **Question**: checking contributions, housing, retirement at 55 or 65, topping up, or withdrawing

## Output Structure

### 1. How your contributions work
Employer and employee contribution rates for the person's age band and status, the ordinary wage ceiling and the annual salary ceiling (confirm current figures), and how each month's contribution is allocated across the Ordinary, Special or Retirement, and MediSave Accounts.

### 2. Contribution check
| Month | Wages | Employer should pay | Employee should pay | On CPF statement | Match? |
If anything does not match: ask HR first, then report late or missing contributions to the CPF Board.

### 3. Housing: what using CPF really costs
How much the person can use for the flat, the accrued interest that must be refunded to the account on sale, and the retirement income given up by using Ordinary Account savings now.

### 4. At 55 and at 65
The Retirement Account formed at 55, the retirement sums (basic, full, enhanced; confirm current amounts), what can be withdrawn at 55, and CPF LIFE payouts from the payout eligibility age, with the plan options.

### 5. Topping up
Cash top-ups and transfers into the Special, Retirement or MediSave Account, the tax relief cap (confirm), the higher interest, and the catch: money topped up is locked for retirement.

### 6. What to do next
Three concrete actions in order, each with where to do it (the CPF website or app with Singpass).

## Quality Checks

- [ ] Every rate, ceiling, sum and age is marked to confirm with the CPF Board
- [ ] The contribution check uses the person's own wages, month by month where given
- [ ] Housing use states the accrued-interest refund and the retirement trade-off
- [ ] Top-up advice states that the money is locked for retirement
- [ ] No investment product is recommended
- [ ] The output says it is information, not financial advice

## Anti-Patterns

- **Treating CPF as an employer perk.** It is part of the person's pay; missing contributions are worth chasing.
- **Using the maximum CPF for housing by default.** It can leave retirement short.
- **Topping up money that may be needed soon.** Top-ups cannot come back out early.
- **Quoting last year's rates as fact.** Rates and ceilings are revised regularly.

## Example Trigger Phrases

- "My employer's CPF contribution looks low. Can you check it against my payslip?"
- "I'm turning 55 next year. What happens to my CPF?"
- "Should I use CPF or cash for my HDB down payment?"
- "新加坡公积金怎么算？我每个月应该存多少？"
