---
name: ng-pension-rsa-guide
description: "Guide a Nigerian worker through their Retirement Savings Account: checking that contributions are remitted, choosing or changing a pension fund administrator, the fund types by age, voluntary contributions, access after job loss, using part of the balance towards a home, and the options at retirement. Use when asked how do I check my pension, my employer is not remitting pension, how do I change my PFA, can I withdraw 25 percent of my pension, or what happens to my RSA when I retire. Produces a status check, the steps for the person's goal, the documents needed, the choices at retirement compared, and a complaint route. Not financial advice."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/ng-pension-rsa-guide.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Nigerian Pension RSA Guide

Under Nigeria's contributory pension scheme every employee has a Retirement Savings Account with an administrator they choose, and it follows them between jobs. The common problems are employers who deduct and do not remit, accounts opened and forgotten, and confusion about when money can be taken out. This skill explains the account and the steps for each goal. Rules and percentages are set by the pension regulator and must be verified before acting. It is not financial advice.

## What This Skill Produces

- A status check: is the account active, are contributions arriving, is the data correct?
- Step-by-step guidance for the person's goal
- A document list
- A comparison of retirement options
- An escalation route when an employer or administrator does not act

## Required Inputs

Ask for these if not provided:

- Goal: check remittance, open an account, change administrator, make voluntary contributions, access funds after job loss, home ownership, retirement, or a claim for a deceased relative
- Age and employment status
- Whether the person knows their account number (PIN) and administrator
- Employer sector and size
- Months of contributions missing, if any
- For retirement or job loss: date of exit and age at exit

## Framework

1. **The basics.** Minimum contributions are 8 percent from the employee and 10 percent from the employer, on monthly emoluments. The employer must remit within days of paying salaries. The account belongs to the employee.
2. **Check remittance.** Use the administrator's app, statement or SMS alerts and compare with payslips. Gaps are raised with the employer in writing, then with the administrator, then with the regulator.
3. **Data matters.** Name, date of birth and national identity number must match across records. Mismatches delay every later claim, so fix them early through the data recapture process.
4. **Changing administrator.** A transfer window allows a move between administrators, limited in frequency. The new administrator handles the request.
5. **Fund types.** Balances are invested in funds by age band, from higher-growth for younger contributors to conservative for retirees, with an option to request the next more aggressive fund within limits.
6. **Voluntary contributions.** Additional contributions are allowed, with rules on how soon and how much can be withdrawn and on tax treatment.
7. **Job loss before retirement age.** After a waiting period of some months without new employment, a person under the retirement threshold may access a set share of the balance. The rest stays invested.
8. **Home ownership.** Contributors who meet conditions may apply a share of the balance as equity towards a residential mortgage.
9. **Retirement.** At the qualifying age or on retirement under the terms of employment: a lump sum, provided the remainder funds a pension; then either programmed withdrawal from the administrator or a life annuity from an insurer. Compare income level, how long it lasts, what dependants receive, and flexibility.
10. **Death.** Named next of kin or the estate claims with probate or letters of administration.
11. **Escalation.** Employer, then administrator, then the pension regulator's consumer protection channel.

## Output Format

### RSA plan: [goal]

**Status**
| Check | Finding | Action |
|---|---|---|
| Account number and administrator known | | |
| Contributions match payslips | | |
| Personal data consistent | | |

**Steps**
1. [step, who acts, what to bring]

**Documents:** [list]

**Retirement options (if relevant)**
| | Programmed withdrawal | Annuity |
|---|---|---|
| Who pays | Administrator | Insurer |
| Income | Recalculated over time | Fixed by contract |
| If you die early | Balance to beneficiaries | Depends on guarantee period |
| Flexibility | Can change later | Largely fixed |

**If nothing happens:** [escalation with what to include in the complaint]

**Verify before acting:** [percentages, waiting periods, age thresholds] with the administrator or the regulator.

**Assumptions and gaps**
- [What was assumed about age or status]
- [The record that needs checking first]

*Guidance for preparation, not financial advice.*

## Quality Checks

- [ ] The plan starts with a status check
- [ ] Steps name who acts and what to bring
- [ ] Any percentage or waiting period is marked for verification
- [ ] Retirement options are compared without recommending a product
- [ ] An escalation route is given

## Anti-Patterns

- **Do not recommend a specific administrator or insurer.**
- **Do not state withdrawal percentages as guaranteed.**
- **Do not suggest paying an agent to "fast-track" a claim.** That is a common fraud.
- **Do not ignore data mismatches.**
- **Do not treat voluntary contributions as freely withdrawable** without checking the rule.

## Example Trigger Phrases

- "How do I confirm my employer is actually paying my pension?"
- "I lost my job five months ago at 38. Can I take part of my pension?"
- "Programmed withdrawal or annuity: what is the difference?"
- "I have two RSA accounts from two jobs. What do I do?"

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/ng-pension-rsa-guide.html

<!-- pm-claude-skills v84.0.0 | skill: ng-pension-rsa-guide | source: skills/ng-pension-rsa-guide/SKILL.md | sha256: d56079b620a3b20d4922963c9cc1781e20c46f427caad257c4a7f9f1aaa4cb8e | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
