---
name: tw-labour-standards
description: "Use when asked 加班費怎麼算, 特休有幾天, 被資遣可以拿多少, 預告期間是多久, 勞退 6% 雇主有沒有提繳, 這樣合法嗎 勞基法, or check work terms against Taiwan's Labor Standards Act (勞動基準法). Produces a check of the person's situation against the Act (wages and the minimum wage, working hours and overtime pay, annual leave, notice and severance under the new pension system, pension contributions), worked calculations from their own figures, what to ask the employer, and where to complain (地方勞工局 and 1955), each figure marked to confirm."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/tw-labour-standards.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Taiwan Labour Standards (勞動基準法)

Taiwan's Labor Standards Act sets the floor for wages, hours, overtime, leave, notice and severance, and the Labor Pension Act requires employers to contribute to a personal pension account. Workers lose money to miscounted overtime, unpaid annual leave and severance calculated on the wrong average wage. This skill checks the person's situation against the Act and works out what they are owed from their own figures.

Write in Traditional Chinese (Taiwan usage) unless asked otherwise. The minimum wage is adjusted most years and rules are amended; confirm figures with the Ministry of Labor (勞動部) or the 1955 hotline. This is information, not legal advice.

## Required Inputs

Ask for these if not provided:
- **Situation**: overtime, leave, dismissal or redundancy, resignation, pension, wage deductions
- **Employment details**: start date, monthly wage and allowances, normal hours, shift pattern
- **What happened**, with dates and any written notice
- **Pension system**: new system (勞退新制, since July 2005) or old, and the contribution shown in the person's account
- **Industry**, since some sectors have special working-hour arrangements

## Output Structure

### 1. What the Act says about this
Plain explanation of the relevant rules, for example:
- Overtime on a working day: the first two hours at no less than one and one third of the hourly wage, the next two at no less than one and two thirds
- Annual leave by length of service: three days after six months, seven after one year, ten after two, fourteen after three, fifteen after five, then one more day a year after ten years up to thirty
- Notice before dismissal for business reasons: ten days for three months to a year of service, twenty days for one to three years, thirty days for three years or more
- Severance under the new pension system: half a month's average wage per year of service, up to six months
- Pension: employer contributes at least 6% of the monthly wage to the worker's personal account
All marked to confirm against the current Act.

### 2. Worked calculation
From the person's figures only, with each step shown:
| Item | Calculation | Amount |

### 3. What to ask the employer
Specific, polite requests in Traditional Chinese, citing the article.

### 4. If it is not resolved
The local labour bureau (地方勞工局) for a complaint or mediation (勞資爭議調解), the 1955 hotline, and keeping evidence (pay slips, clock records, messages).

## Quality Checks

- [ ] Every rule and figure is marked to confirm against the current Act and minimum wage
- [ ] Calculations use only the person's figures, with each step shown
- [ ] Severance uses the right pension system for the person
- [ ] The employer request cites the relevant article
- [ ] Escalation routes include the local labour bureau and mediation
- [ ] The output states it is not legal advice

## Anti-Patterns

- **Using the base wage only.** Regular allowances can count toward average wage.
- **Assuming last year's minimum wage.** It changes most years.
- **Signing a resignation when dismissed.** It can cost severance and unemployment benefits.
- **No evidence.** Clock records and pay slips decide disputes.

## Example Trigger Phrases

- "我在公司三年半，被資遣可以拿多少資遣費？"
- "平日加班 3 小時，加班費怎麼算？"
- "老闆說特休不能排，合法嗎？"
- "Check my Taiwan job terms against the Labor Standards Act."
