---
name: malaysia-epf-explainer
description: "Use when asked how EPF works, how much KWSP my employer should pay, what are Akaun Persaraan, Sejahtera and Fleksibel, when can I withdraw EPF, can I use EPF for my house, or 公积金怎么算 in Malaysia. Produces how the person's EPF contributions are split across the accounts, a contribution check against payslips, the withdrawal routes with their conditions, voluntary contribution options, and the figures to confirm with KWSP."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/malaysia-epf-explainer.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Malaysia EPF Explainer (KWSP)

The Employees Provident Fund is the main retirement savings for most private-sector workers in Malaysia. People lose out through unchecked employer contributions, through spending the flexible account early, and through not knowing which withdrawals are allowed before 55. This skill explains the person's EPF plainly, checks the numbers they give, and lays out their options.

Write in English unless the person asks for Malay or Chinese (马来西亚华文, Simplified script). Contribution rates, the account structure and withdrawal rules are set by KWSP and change; mark every figure to confirm on kwsp.gov.my. This is information, not financial advice.

## Required Inputs

Ask for these if not provided:
- **Status**: Malaysian, permanent resident or foreign worker; employee or self-employed
- **Age** and **monthly wages**, including any bonus or allowances
- **Account balances** if known, from the KWSP app (i-Akaun)
- **Question**: checking contributions, a withdrawal (housing, education, health, age 55 or 60), voluntary contributions, or moving abroad

## Output Structure

### 1. How your contributions work
Employee and employer contribution rates for the person's wage band, age and status (confirm current rates), and how each contribution is split across the accounts. Since 2024 the structure is Akaun Persaraan (retirement), Akaun Sejahtera (housing, education, health and similar) and Akaun Fleksibel (withdraw any time); confirm the current split.

### 2. Contribution check
| Month | Wages | Employer should pay | Employee should pay | In i-Akaun | Match? |
If anything does not match: ask HR first, then raise it with KWSP, which can act against employers who do not pay.

### 3. Withdrawal routes
| Purpose | Which account | Conditions (confirm) | Documents |
Housing, education, health, reaching 50, 55 and 60, leaving Malaysia permanently, incapacity, and the flexible account, with the cost of each: money withdrawn stops earning dividends.

### 4. Voluntary contributions
Self-contribution and top-ups, including i-Saraan for the self-employed where it applies, any government incentive (confirm), and the tax relief limit (confirm).

### 5. What to do next
Three concrete actions in order, each with where to do it (KWSP app, website or branch).

## Quality Checks

- [ ] Every rate, split, age and limit is marked to confirm with KWSP
- [ ] The contribution check uses the person's own wages, month by month where given
- [ ] Each withdrawal route names the account it comes from and its conditions
- [ ] The cost of early withdrawal (lost dividends, smaller retirement savings) is stated
- [ ] No investment product is recommended
- [ ] The output says it is information, not financial advice

## Anti-Patterns

- **Treating Akaun Fleksibel as spare cash.** It is still retirement money by default.
- **Never checking contributions.** Late or missing payments happen and can be recovered.
- **Withdrawing for housing without a plan for retirement.** The balance at 55 is what most people live on.
- **Quoting old account names or rates.** The structure changed in 2024; confirm what applies now.

## Example Trigger Phrases

- "Is my employer paying the right EPF amount? My salary is RM6,500."
- "What can I use Akaun Sejahtera for?"
- "I'm moving to Australia for good. Can I take out my EPF?"
- "马来西亚公积金怎么算？我可以提出来买房吗？"
