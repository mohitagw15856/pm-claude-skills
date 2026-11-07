---
name: in-gratuity-calculator
description: "Estimate gratuity under India's Payment of Gratuity Act when someone leaves a job: eligibility (the five-year rule and its exceptions), the 15/26 formula on last drawn basic plus dearness allowance, the half-year rounding rule, the tax-free ceiling and what to verify with the employer. Use when asked how much gratuity am I owed, mera gratuity kitna banega, is gratuity payable after 4 years 8 months, or to check an employer's gratuity figure. Produces a worked calculation, the eligibility verdict and a checklist of what to confirm before accepting the settlement."
version: 1.0.0
---

# Gratuity Calculator (India)

Gratuity is the one leaving payment most employees in India under-check. Employers sometimes use basic salary only when dearness allowance should count, round the years down instead of up, or treat a 4 years 10 months stint as ineligible. This skill estimates the figure from the person's own numbers, says plainly whether they qualify, and lists what to confirm before signing the full and final settlement. It is preparation, not legal or tax advice.

## What This Skill Produces

- An eligibility verdict with the reason (continuous service, the five-year rule and the exceptions for death, disablement and the high-court-recognised 4 years 240 days reading)
- A worked calculation using the statutory formula, with every input shown
- The tax treatment at a glance, with the figures marked as subject to the current notification
- A checklist of what to verify with the employer, the payslips and the Form I claim

## Required Inputs

Ask for (if not already provided), else infer and label as an assumption:
- Date of joining and last working day
- Last drawn monthly basic salary and dearness allowance (DA), if any
- Whether the employer is covered by the Payment of Gratuity Act (ten or more employees on any day in the past twelve months; most formal employers are)
- Reason for leaving: resignation, retirement, termination, death or disablement
- Any breaks in service (unpaid leave, strikes, layoffs) and whether they were authorised

## Framework: Eligibility and the Formula

1. **Continuous service.** Count the years and months from joining to the last day. Authorised leave, maternity leave and lawful layoffs count as service. Unauthorised absence usually does not.
2. **The five-year rule.** Gratuity is payable after five years of continuous service. The requirement is waived on death or disablement. Several high courts have read 4 years and 240 days in the fifth year as qualifying; state this as a position the person may rely on, not a certainty, and advise them to cite it in writing if the employer refuses.
3. **Rounding.** A part year of more than six months counts as a full year. 7 years 7 months is 8 years; 7 years 5 months is 7 years.
4. **The formula for covered establishments.** Gratuity = last drawn (basic + DA) x 15 / 26 x completed years. The 26 is working days in a month; the 15 is half a month's wages per year.
5. **Non-covered establishments.** Many pay by the same formula under their own policy, but the Act's formula does not bind them. Say which case applies.
6. **The ceiling.** The Act caps the statutory amount (the cap was raised to 20 lakh rupees in 2018; verify against the current notification). An employer may pay more under contract. The income tax exemption has its own limit, which must be checked against the current Finance Act and CBDT notification for the year of receipt.
7. **Timing.** The employer must pay within thirty days of it becoming due; interest applies after that. Claim on Form I if it is not paid.

## Output Format

### Gratuity estimate for [name or "you"]

**Service:** [joining date] to [last day] = [X years Y months], counted as **[N] completed years** (rounding rule applied).
**Eligibility:** [Eligible / Not eligible / Arguable under the 4 years 240 days reading], because [reason].

| Input | Value | Source |
|---|---|---|
| Last drawn basic | [amount] | [payslip month] |
| Dearness allowance | [amount or none] | [payslip month] |
| Completed years | [N] | computed |

**Statutory formula:** ([basic] + [DA]) x 15 / 26 x [N] = **[amount]** (illustrative; verify the inputs on the final payslip).

**Ceiling check:** [below the statutory cap / capped at the current limit, verify the notification in force on the last working day].
**Tax at a glance:** [exempt up to the current limit for non-government employees; the excess is taxable as salary; verify against the current Finance Act].

**Before you accept the F&F:**
- [ ] The employer used basic plus DA, not basic alone or gross
- [ ] The years were rounded up for any part year over six months
- [ ] Authorised leave was counted as service
- [ ] Payment date is within thirty days of leaving; interest if later
- [ ] If refused on the five-year rule with 4 years 240 days served, request the decision in writing and consider a Form I claim with the controlling authority

*This is an estimate for preparation. Confirm the figures with the employer's HR, the Act as currently notified, and a chartered accountant or lawyer for a disputed case.*

## Quality Checks

- [ ] Every number in the calculation traces to a stated input or a labelled assumption
- [ ] The rounding rule has been applied and shown, not assumed
- [ ] The eligibility verdict names the rule it rests on and flags the 4 years 240 days reading as arguable, not settled
- [ ] Every statutory figure (cap, tax limit) is marked as something to verify against the current notification
- [ ] The output tells the person what to confirm and with whom, and includes the preparation-not-advice line

## Anti-Patterns

- **Using gross salary.** Only basic plus DA goes into the formula. Allowances and bonuses do not.
- **Rounding years down.** Part years over six months round up.
- **Treating 4 years 8 months as a flat no.** Present the 240-day position and its limits.
- **Quoting a cap or tax limit as permanent.** Both change by notification.
- **Telling the person to sign.** Calculate, list what to check, and point to the controlling authority if it is refused.

## Example Trigger Phrases

- "I worked 7 years 7 months, basic 40,000 and DA 5,000. How much gratuity should I get?"
- "mera gratuity kitna banega 7 saal ke baad?"
- "Is gratuity payable if I resign after 4 years and 9 months?"
- "HR says my gratuity is 1.2 lakh. Check whether that is right."

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/in-gratuity-calculator.html
