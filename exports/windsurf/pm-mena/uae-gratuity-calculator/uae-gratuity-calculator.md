---
trigger: model_decision
description: "Estimate end-of-service gratuity for a private-sector employee in the United Arab Emirates and check a final settlement: service length, basic wage, the 21-day and 30-day tiers, the two-year cap, unpaid leave, and the other amounts due on leaving. Use when asked how much gratuity will I get, calculate my end of service in Dubai, check my final settlement, مكافأة نهاية الخدمة كم, or what am I owed when I resign in the UAE. Produces the gratuity estimate with each step shown, the other final dues to check, the documents to collect, and what to do if the amount is disputed. Distinct from in-gratuity-calculator, which covers India."
---

# UAE Gratuity Calculator

End-of-service gratuity is often the largest single payment an expatriate worker receives, and it is calculated on basic wage, not the total package. Disputes come from that distinction, from unpaid leave, and from old rules people still quote. This skill shows the arithmetic step by step under the federal labour law for the private sector and lists what else belongs in a final settlement. It is an estimate for preparation, not legal advice. Free zones with their own regimes, and schemes that replace gratuity, are flagged for checking.

## What This Skill Produces

- A gratuity estimate with every step of the calculation visible
- The assumptions that drive the figure: basic wage, service days, unpaid leave
- A final-settlement checklist: unpaid salary, leave balance, notice pay, repatriation ticket, deductions
- The documents to collect before the last day
- The route for a dispute

## Required Inputs

Ask for these if not provided:

- Start date and last working day
- Last basic wage per month (not the total with allowances), as stated in the contract or the registered contract
- Days of unpaid leave or unauthorised absence during service
- Where the employer is licensed: mainland, or a free zone with its own employment rules
- Whether the employer has enrolled the employee in a savings scheme that replaces gratuity
- Nationality: UAE and other GCC nationals are generally covered by pension arrangements instead
- Reason for leaving and whether notice was served
- Any loans or advances owed to the employer

## Framework: The Calculation

1. **Eligibility.** At least one year of continuous service. Under one year, no gratuity is due.
2. **Service length.** Count from start date to last working day, then subtract unpaid leave days. Part-years count pro rata once the first year is complete.
3. **Daily basic wage.** Monthly basic wage divided by 30.
4. **Tier one.** 21 days' basic wage for each of the first five years.
5. **Tier two.** 30 days' basic wage for each year beyond five.
6. **Cap.** The total cannot exceed two years' wage.
7. **Reason for leaving.** Under the current federal law the entitlement no longer reduces on resignation. Older reduction tables circulate online and belong to the repealed law. Tell the user to confirm that nothing in their situation falls under transitional or free-zone rules.
8. **Deductions.** Amounts owed to the employer may be deducted within legal limits.
9. **Timing.** Final dues are payable within a short statutory period after the contract ends; ask the user to verify the current period.

Show the working: years in tier one times 21 times daily wage, plus years in tier two times 30 times daily wage, compared with the cap.

## Output Format

### Gratuity estimate

**Inputs used:** start [date], end [date], unpaid leave [days], basic wage [amount] per month, jurisdiction [mainland / free zone].

| Step | Working | Result |
|---|---|---|
| Service counted | [days] minus [unpaid days] | [years and days] |
| Daily basic wage | [monthly] / 30 | |
| First five years | [years] x 21 x [daily] | |
| Beyond five years | [years] x 30 x [daily] | |
| Total before cap | | |
| Cap (two years' wage) | | |
| **Estimated gratuity** | | |

**Also check in the final settlement**
- [ ] Salary to the last day and any unpaid overtime
- [ ] Payment for accrued, untaken annual leave
- [ ] Notice pay, in either direction
- [ ] Repatriation ticket, if the contract or law provides for it
- [ ] Deductions itemised and within the legal limit

**Collect before you leave:** contract and any amendments, payslips or bank credits, leave records, the settlement statement, experience letter, visa cancellation papers.

**If the figure is disputed:** raise it in writing with the employer, then file a complaint with the labour ministry (or the free zone authority). Do not sign a settlement stating that all dues are received until they are.

**Assumptions and gaps**
- [Basic wage or dates assumed]
- [Whether a free zone regime or savings scheme changes the result]

*An estimate from the figures supplied. Verify against the current federal labour law and executive regulations, or with the ministry or a licensed adviser.*

## Quality Checks

- [ ] The calculation uses basic wage, and says so
- [ ] Unpaid leave is subtracted from service
- [ ] Both tiers and the cap are shown as separate steps
- [ ] Free zone and savings-scheme exceptions are flagged
- [ ] The output does not apply the repealed resignation reductions
- [ ] The estimate is labelled as an estimate with a verification line

## Anti-Patterns

- **Do not calculate on total salary including allowances.**
- **Do not apply the old one-third and two-thirds resignation reductions** as current law.
- **Do not assume mainland rules for a free zone employer** with its own regime.
- **Do not present the figure as a guaranteed entitlement.**
- **Do not advise signing a full-and-final release** before payment is received.

## Example Trigger Phrases

- "I worked in Dubai for seven years and three months on a basic of 8,000. What is my gratuity?"
- "I resigned after four years. Do I lose part of my end of service?"
- "Check this final settlement statement from my employer."
- "كم مكافأة نهاية الخدمة بعد ست سنوات؟"

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/uae-gratuity-calculator.html

<!-- pm-claude-skills v84.0.0 | skill: uae-gratuity-calculator | source: skills/uae-gratuity-calculator/SKILL.md | sha256: 529394c9da733612e8f80e214eb02bab354f9e157158f842cfd6160918534538 | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
