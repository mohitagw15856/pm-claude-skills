---
name: hk-mpf-explainer
description: "Use when asked 強積金點計, 強積金幾時可以攞, 轉強積金計劃, 僱主有冇供強積金, 自願供款扣稅, eMPF 點用, or understand Hong Kong's Mandatory Provident Fund (MPF). Produces how contributions work for the person's income, checks on whether the employer contributed correctly, the withdrawal routes and their conditions, the options for moving accrued benefits, the tax-deductible voluntary contribution rules, and a fund-choice framework without recommending funds."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/hk-mpf-explainer.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Hong Kong MPF Explainer (強積金)

Most people working in Hong Kong belong to the Mandatory Provident Fund, and most never look at it until they change jobs, retire or leave Hong Kong. Money is lost to unchecked employer errors, idle preserved accounts and high-fee funds chosen by default. This skill explains the person's MPF in plain terms, checks the contributions, and sets out their options.

Write in Traditional Chinese (Hong Kong usage) unless the person asks for English or Simplified Chinese. Contribution limits, withdrawal rules and the eMPF platform are set by the MPFA and the law; confirm current figures on the MPFA website before acting. This is information, not investment advice.

## Required Inputs

Ask for these if not provided:
- **Employment**: employee or self-employed, monthly relevant income, employer and start date
- **Accounts**: contribution account, personal accounts from earlier jobs, any tax-deductible voluntary contribution (TVC) account
- **Age**, and plans to retire early or leave Hong Kong permanently
- **Recent statements**, if the person has them
- **Question**: checking contributions, withdrawal, consolidating, choosing funds, or saving tax

## Output Structure

### 1. How your contributions work
Mandatory contributions from employer and employee as a share of relevant income, with the minimum and maximum relevant income levels (confirm current figures with the MPFA), and how they apply to the person's income.

### 2. Contribution check
| Month | Relevant income | Employer should pay | Employee should pay | On statement | Match? |
And what to do if it does not match: ask the employer, then the trustee, then the MPFA.

### 3. Withdrawal routes
| Route | Conditions (confirm) | Documents |
Reaching 65; early retirement at 60; permanent departure from Hong Kong (once in a lifetime); total incapacity; terminal illness; small balance; and death. Note that the use of MPF to offset severance and long service payments was abolished from 1 May 2025 for contributions after that date (confirm how transitional rules apply to the person).

### 4. Moving and consolidating
The employee choice arrangement for moving the employee's own contributions, consolidating personal accounts from old jobs into one, and what the eMPF platform changes (confirm the platform's coverage of the person's scheme).

### 5. Saving tax with voluntary contributions
How TVC and qualifying deferred annuity premiums share an annual deduction cap (confirm the current cap), and when it is worth using.

### 6. Fund-choice framework
Fees (fund expense ratio), risk level against the person's horizon, the default investment strategy (DIS) as a low-fee option, without naming a fund to buy.

## Programmatic Helper

```bash
python3 skills/hk-mpf-explainer/scripts/mpf.py --income 40000
python3 skills/hk-mpf-explainer/scripts/mpf.py --income 25000 --months 12
```

Mandatory contributions for both sides and the yearly tax-deductible amount. Standard library only.

## Quality Checks

- [ ] Every limit, cap and date is marked to confirm with the MPFA
- [ ] The contribution check compares statements month by month where statements are given
- [ ] Withdrawal routes list conditions and documents
- [ ] The offsetting abolition is mentioned where severance or long service payment is relevant
- [ ] No specific fund is recommended
- [ ] The output states it is not investment advice

## Anti-Patterns

- **Leaving old accounts scattered.** Several small accounts each carry fees and get forgotten.
- **Never checking contributions.** Employer errors and late payments happen.
- **Choosing funds by past returns alone.** Fees and risk matter over decades.
- **Assuming departure means instant cash.** Permanent departure has conditions and a once-only rule.

## Example Trigger Phrases

- "我月入 25000，強積金每月應該供幾多？"
- "我移民離開香港，強積金點樣提早攞？"
- "舊公司嘅強積金戶口點整合？"
- "Explain my Hong Kong MPF and how to save tax with voluntary contributions."
