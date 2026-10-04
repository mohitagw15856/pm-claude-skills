---
name: cn-severance-calculator
description: "Estimate economic compensation (经济补偿金) when employment ends in mainland China: N, N+1 or 2N under the Labour Contract Law, with the high-earner cap, the part-year rule and the questions that decide which case applies. Use when asked 我被裁员了能拿多少补偿, N+1 怎么算, 经济补偿金计算, 违法解除 2N, or how much severance am I owed in China. Produces the scenario that likely applies and why, the calculation shown step by step, what to check before signing anything, and where to get it confirmed. Not legal advice."
version: 1.0.0
---

# China Severance Calculator (经济补偿金)

When a job ends in mainland China, the amount owed depends on how it ended, how long the person worked, what they earned, and the city. People often accept less than they are owed because they do not know which case applies or how the cap works. This skill works out the likely case, shows the calculation, and lists what to check before signing a termination agreement.

Write the output in Simplified Chinese unless asked otherwise. For decoding a severance agreement outside China, see `severance-agreement-decoder`.

## What This Skill Produces

- **The likely scenario**: N, N+1 or 2N, with the article and the facts it depends on
- **The calculation**, step by step: years counted, monthly base, cap check, total
- **A before-you-sign list**: what else may be owed (unused leave, unpaid wages, bonus, social insurance)
- **Where to confirm**: the local labour arbitration commission or a labour lawyer

## Required Inputs

Ask for these if not provided:
- **Start date and last day of service**
- **Average monthly wage** over the last 12 months, before tax, including regular bonuses and allowances
- **How the employment is ending**: who proposed it, the reason given, whether 30 days' written notice was given
- **City of the workplace**, and its published average monthly wage if the person earns a lot
- **Any agreement** they have been asked to sign

## Framework: Which Case Applies

| How it ended | Usually | Article |
|---|---|---|
| Employer proposes, both agree to end | N | 36, 46 |
| Employer ends it for incapacity or a major change of circumstances (Art. 40), with 30 days' notice | N | 40, 46 |
| As above, without 30 days' notice | N + 1 | 40 |
| Economic layoff (Art. 41) | N | 41, 46 |
| Fixed-term contract not renewed by the employer, or renewed on worse terms the employee refuses | N | 46 |
| Employee resigns because the employer failed its duties (unpaid wages, no social insurance) | N | 38, 46 |
| Unlawful termination by the employer | 2N | 48, 87 |
| Employee resigns for personal reasons | Usually nothing | |

Calculation (Art. 47):
- **Years**: one month's wage per full year. A part year of six months or more counts as one year; less than six months counts as half.
- **Monthly base**: the average monthly wage over the 12 months before the end.
- **Cap**: if the average exceeds three times the city's published average monthly wage, the base is three times that figure and years are capped at 12.
- **The +1**: one month's wage in lieu of notice. Which month's wage is used varies by locality.

Flags to raise:
- Service before 1 January 2008 may be calculated differently.
- Pregnancy, maternity, occupational illness, medical treatment periods and some long-service cases restrict termination; if any apply, the termination itself may be unlawful.
- Compensation is separate from unpaid wages, unused annual leave pay and bonus already earned.

## Programmatic Helper

```bash
python3 skills/cn-severance-calculator/scripts/cn_severance.py --start 2018-03-01 --end 2026-09-30 --avg-wage 25000 --scenario n
python3 skills/cn-severance-calculator/scripts/cn_severance.py --start 2018-03-01 --end 2026-09-30 --avg-wage 25000 \
    --scenario n_plus_1 --last-month-wage 26000 --local-avg 12000
```

The end date counts as a day worked. Standard library only.

## Output Format

### 经济补偿金估算：[姓名]

**一、适用情形**：[N / N+1 / 2N]，依据 [条款]，因为 [事实]。如有不确定的事实，列出。

**二、计算过程**
| 项目 | 数值 | 说明 |
| 工作年限 | ... | 起止日期，折算规则 |
| 月工资基数 | ... | 12 个月平均；是否封顶 |
| N | ... | |
| +1 / ×2 | ... | |
| 合计 | ... | |

**三、签字前请确认**
- 未付工资、未休年假工资、已发生的奖金、社保公积金缴纳情况
- 协议中是否有放弃其他权利的条款

**四、去哪里确认**：当地劳动人事争议仲裁委员会，或劳动法律师

End verbatim: *"以上为估算，不构成法律意见。各地规定和裁判口径不同，签署任何协议前请向当地劳动仲裁机构或劳动法律师确认。"*

## Quality Checks
- [ ] The scenario is tied to an article and to the facts given
- [ ] Years counted follow the six-month rule, and the end date counts as worked
- [ ] The cap is checked when the city's average wage is known, and flagged when it is not
- [ ] Other amounts owed are listed separately from compensation
- [ ] The disclaimer appears verbatim

## Anti-Patterns
- **Assuming N+1 by default.** The +1 applies to one specific case.
- **Using base salary only** when bonuses and allowances form part of the wage.
- **Skipping the protected-period check.** It can turn N into 2N.
- **Advising the person to sign.** Calculate, list what to check, and point to confirmation.

## Example Trigger Phrases
- "公司要裁我，工作 6 年半，月薪 3 万，能拿多少补偿？"
- "N+1 到底怎么算？"
- "公司没提前通知就辞退我，是不是违法解除？"
- "How much severance am I owed in Shanghai?"
