---
name: cn-social-insurance-explainer
description: "Explain China's social insurance and housing fund (五险一金) for a specific person and city: what each part covers, what they and their employer pay, how the contribution base works, and what happens when they change job, city or leave work. Use when asked 五险一金是什么, 社保怎么交, 公积金怎么提取, 换工作社保断了怎么办, 社保基数, or explain Chinese social insurance. Produces a plain explanation for their situation, a contribution calculation using their city's current rates, and a checklist for job changes, moving city, unemployment or freelancing. Not financial advice."
version: 1.0.0
---

# China Social Insurance Explainer (五险一金)

Social insurance and the housing fund take a large share of every payslip in mainland China, yet most people are unsure what they pay for, whether their employer pays on the right base, or what happens when they change job or city. This skill explains it for the person's own situation, calculates contributions with their city's current figures, and lists what to do at each change.

Write the output in Simplified Chinese unless asked otherwise.

## What This Skill Produces

- **A plain explanation** of each part and what it covers, for this person
- **A contribution calculation**: employee and employer shares on their base, with the city's rates
- **A base check**: whether the base looks right for their wage
- **Change checklists**: changing job, moving city, unemployment, freelancing or going abroad

## Required Inputs

Ask for these if not provided:
- **City** where contributions are paid
- **Monthly wage**, and the contribution base shown on the payslip or in the app
- **Situation**: employed, changing job, moving city, unemployed, flexible employment (灵活就业), going abroad
- **The city's current rates and base limits**, from the local social insurance bureau or app. If the person cannot find them, give typical ranges labelled as typical

## Framework

The five insurances and one fund:
- **养老保险 (pension)**: retirement income; years of contribution matter
- **医疗保险 (medical)**: medical costs; part goes to a personal account
- **失业保险 (unemployment)**: benefit if unemployed involuntarily and contributed long enough
- **工伤保险 (work injury)**: paid by the employer only
- **生育保险 (maternity)**: now merged with medical insurance in most places
- **住房公积金 (housing fund)**: savings for housing, usable for purchase, mortgage, rent and some other cases, matched by the employer

How the base works:
- The base is normally the previous year's average monthly wage, bounded by a floor and a ceiling set by the city (commonly 60% and 300% of the local average wage).
- Typical employee rates: pension 8%, medical about 2%, unemployment about 0.5%, housing fund 5% to 12%. Employer rates are higher. **Rates vary by city and year; use the person's city's published figures.**

Checks:
- A base well below the actual wage, without the person's knowledge, is a common problem and lowers future benefits.
- A gap in contributions can affect medical cover and eligibility for things like home purchase or school places in some cities.

## Output Format

### 五险一金说明：[城市]，[情况]

**一、每一项是什么、对我有什么用**

**二、缴费计算**（使用 [城市] [年份] 的费率与基数，来源：[来源]）
| 项目 | 基数 | 个人比例 | 个人缴纳 | 单位比例 | 单位缴纳 |

**三、基数是否正常**：判断与理由

**四、我的情况下要做什么**（换工作 / 换城市 / 失业 / 灵活就业 / 出国）清单

**五、长辈版**（可选：当问题是为父母或临近退休的人问的，例如养老金领取、领取资格认证、补缴）
One action per step, numbered 第一步, 第二步 (no more than eight); short sentences; no jargon (explain 缴费年限, 认证 and 待遇 in everyday words); what to bring and where to go or what to press; and a last line: 有不明白的，先别转账、别签字，打电话给 [家人] 或 12333 社保服务热线 (需核实). For handling a parent's errands end to end, see `cn-help-parents-admin`.

End verbatim: *"以上为一般性说明，不构成财务或法律意见。费率、基数和政策以当地社保和公积金管理部门最新公布为准。"*

## Quality Checks
- [ ] Rates used are the person's city's figures with a source, or clearly labelled as typical
- [ ] Employee and employer shares are both shown
- [ ] The base is compared with the actual wage
- [ ] The checklist matches the person's situation
- [ ] The disclaimer appears verbatim
- [ ] If a 长辈版 is included, it uses one action per step, plain words and a call-for-help line

## Anti-Patterns
- **Using one city's rates for another.** Rates and bases are local.
- **Treating typical figures as current.** They change yearly.
- **Ignoring a low base.** It is the most common way contributions are underpaid.
- **Advising someone to stop contributing** without explaining the consequences.

## Example Trigger Phrases
- "五险一金到底是什么？我在深圳，月薪两万。"
- "换工作中间断了一个月社保有影响吗？"
- "公积金怎么提取出来付房租？"
- "Explain Chinese social insurance for my situation."
