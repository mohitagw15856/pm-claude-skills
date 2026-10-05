---
name: kr-severance-pay
description: "Use when asked 퇴직금 계산해 줘, 퇴직금 얼마 받을 수 있어, 평균임금 어떻게 계산해, 퇴직연금 DB형 DC형 차이, IRP로 퇴직금 받아야 해, 퇴직금을 안 줘요, or how is severance pay calculated in Korea. Produces an eligibility check, a step-by-step 퇴직금 calculation from the person's own figures (평균임금, 계속근로기간, bonuses and leave pay), how their 퇴직연금 type changes what they receive, the payment deadline and IRP rules, tax on leaving, and what to do if it is unpaid, every legal figure marked to confirm."
version: 1.0.0
---

# Korea Severance Pay (퇴직금)

Under 근로자퇴직급여 보장법, an employee in Korea who has worked one year or more is owed a retirement benefit on leaving, whether they resign or are dismissed. The calculation looks simple but the inputs trip people up: which three months count, whether bonuses and unused leave pay go in, and whether the company runs 퇴직금 or a DB or DC 퇴직연금. This skill works through the person's own numbers, explains the result and says what to do if the money does not arrive.

Write in Korean unless the person asks for English or Chinese. Statutory conditions, deadlines and tax rules change and have exceptions; mark every legal figure and rule to confirm with 고용노동부 (고객상담센터 1350), the company's 퇴직연금 provider or a 공인노무사. This is information, not legal or tax advice; for disputes or unusual contracts suggest a 노무사.

## Required Inputs

Ask for these if not provided:
- **Dates**: start date and last working day (퇴직일 is the day after the last working day; confirm)
- **Working hours**: average weekly contracted hours (short-hours workers may be excluded; confirm the threshold)
- **Pay for the last three months**: basic pay, fixed allowances, overtime, and the number of calendar days in that period
- **Bonuses and leave**: annual 상여금 paid in the last year, 연차수당 paid for unused leave
- **Retirement scheme**: 퇴직금, DB형, DC형, or unknown; any 중간정산 already received
- **Age and an IRP account**, and whether the contract or payslips show anything unusual (퇴직금 included in salary, 포괄임금 contracts)

## Output Structure

### 1. Eligibility
Continuous service of one year or more and weekly hours at or above the threshold (confirm), with how gaps, probation, and contract renewals count towards 계속근로기간.

### 2. The calculation
| Step | Figure | Source |
1일 평균임금 = (last three months' wages + annual 상여금 × 3/12 + 연차수당 × 3/12) ÷ calendar days in those three months; compare with 1일 통상임금 and use the higher (confirm). 퇴직금 = 1일 평균임금 × 30 × (재직일수 ÷ 365). Shown line by line with the person's numbers; missing figures are left as blanks, never guessed.

### 3. Your 퇴직연금 type
What changes under DB형 (the formula above, paid by the provider), DC형 (the balance of the employer's contributions and returns, not the formula; check for unpaid contributions), and plain 퇴직금. Any 중간정산 already paid is subtracted from the service period.

### 4. Payment, IRP and tax
The payment deadline after leaving and whether it can be extended by agreement (confirm), the rule that the benefit is generally paid into an IRP account with its exceptions (confirm age and other conditions), and how 퇴직소득세 is withheld, with the tax advantage of taking it later as a pension (confirm).

### 5. If it is not paid
A polite written request first, then a 진정 to the local 고용노동부 office or online, the delay interest that applies (confirm), the time limit for wage claims (confirm), and the free help available (노동부 상담, 대한법률구조공단).

## Programmatic Helper

```bash
python3 skills/kr-severance-pay/scripts/kr_severance.py --start 2023-03-02 --leave 2026-05-02 --wages-3m 9600000 --annual-bonus 12800000
python3 skills/kr-severance-pay/scripts/kr_severance.py --start 2023-03-02 --leave 2026-05-02 --wages-3m 9600000 --ordinary-daily 120000 --json
```

The leaving date (퇴직일) is the day after the last day worked. Standard library only.

## Quality Checks

- [ ] Every legal threshold, deadline, rate and exception is marked to confirm with 고용노동부 or a 노무사
- [ ] The calculation shows each step with the person's own figures, and no figure is invented
- [ ] Bonuses and 연차수당 are included or excluded with the reason stated
- [ ] The scheme type (퇴직금, DB, DC) is identified before any amount is given
- [ ] The output says it is information, not legal or tax advice

## Anti-Patterns

- **Using the last month's pay times twelve.** 평균임금 uses the last three months by calendar days, plus bonus and leave shares.
- **Applying the formula to a DC형 account.** DC pays the accumulated balance; check contributions instead.
- **Accepting "퇴직금 is included in your monthly pay".** Such arrangements are generally invalid; flag it for a 노무사 to confirm.
- **Waiting too long to claim.** Wage claims expire; note the deadline early.

## Example Trigger Phrases

- "3년 2개월 다니고 퇴사해요. 월급 320만원, 상여 연 400% 받으면 퇴직금 얼마예요?"
- "회사가 DC형 퇴직연금이래요. 퇴직금 계산이 다른가요?"
- "퇴사한 지 한 달인데 퇴직금을 안 줘요. 어떻게 해야 해요?"
- "How is severance calculated in Korea? I worked 18 months at 30 hours a week."
