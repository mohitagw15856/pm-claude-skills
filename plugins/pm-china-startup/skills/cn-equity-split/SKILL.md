---
name: cn-equity-split
description: "Design a founder equity split and its protective terms for a start-up in China: who gets how much and why, control thresholds, vesting and buy-back, the option pool and holding platform, and the terms to put in a founders' agreement. Use when asked 股权怎么分, 合伙人股权分配, 创始人持股比例, 期权池留多少, 合伙人退出股权怎么办, or how should co-founders split equity in China. Produces a contribution assessment, a proposed split with the reasoning, a control analysis, vesting and exit terms, a cap table before and after a first round, and a list of questions for a lawyer. Not legal advice."
version: 1.0.0
---

# 创始人股权分配

Most equity disputes in Chinese start-ups begin with a split made at dinner: equal shares between friends, no vesting, and nothing written about what happens when someone leaves. This skill works through contribution, control and exit before the registration form is filled in. It prepares the commercial terms; the documents themselves need a lawyer.

Write in Simplified Chinese.

## What This Skill Produces

- A contribution assessment for each founder
- A proposed split with the reasoning, and one alternative
- A control analysis against the statutory voting thresholds
- Vesting, buy-back and departure terms
- An option pool and holding-platform plan
- A cap table now and after a first financing round
- Questions to take to a lawyer

## Required Inputs

Ask for these if not provided:

- Founders: role, full-time or part-time, and when each joined
- What each brings: idea, capital, technology, industry resources, customers, time
- Cash each is putting in and salary each will draw
- Who is the chief executive and final decision-maker
- Plans for outside investment and expected timing
- Early employees who should receive options
- Any existing registration or verbal promises already made

## Framework

1. **Assess contribution on several factors.** Founding idea and leadership, full-time commitment, cash, core technology or product, market and sales resources, past sunk work. Weight them for this business. Future commitment counts for more than past ideas.
2. **Avoid the structures that deadlock.** Equal splits (50/50, 33/33/33) and a founder team where nobody holds a clear majority of founder votes. One person should lead.
3. **Control thresholds under company law** (limited company, default rules, verify):
   - Above two thirds of voting rights: can pass special resolutions such as amending the articles, changing registered capital, merger or dissolution.
   - Above one half: ordinary resolutions.
   - Above one third: can block special resolutions.
   The articles of association can separate voting rights from economic shares; state where that is used.
4. **Vesting.** Founder shares vest over time, commonly four years with a one-year cliff, so that a founder who leaves early does not keep the whole stake.
5. **Departure.** Unvested shares return at cost or nominal price. Vested shares are subject to a buy-back right at an agreed formula. Distinguish leaving by choice, dismissal for cause, incapacity and death.
6. **Capital contributors who do not work in the business.** Treat as investors with a smaller share at a valuation, not as equal partners.
7. **Option pool.** Reserve a pool, often around ten to twenty percent before the first round, held through a limited partnership (有限合伙持股平台) with the lead founder as general partner so that voting stays concentrated.
8. **Dilution.** Model the first round: new investors' share and the pool dilute everyone pro rata unless agreed otherwise.
9. **Write it down.** A founders' agreement and articles that match it: roles, vesting, buy-back, decision rules, non-compete, intellectual property assignment, deadlock resolution.
10. **Risks to flag.** Nominee holdings (代持), verbal promises, shares registered to a spouse or relative, and tax on transfers.

## Output Format

### 股权方案：[公司]

**贡献评估**
| 创始人 | 角色 | 全职 | 出资 | 技术或产品 | 资源 | 综合评估 |
|---|---|---|---|---|---|---|

**建议方案**
| 持有人 | 比例 | 理由 |
|---|---|---|

**备选方案**：[一句话说明与取舍]

**控制权分析**
| 事项 | 所需表决权 | 谁能决定 |
|---|---|---|

**成熟与退出**
| 条款 | 建议 |
|---|---|
| 成熟期与 cliff | |
| 未成熟股权处理 | |
| 已成熟股权回购价格 | |
| 过错离职 | |

**期权池与持股平台**：[比例、形式、GP]

**股权结构表**
| 持有人 | 现在 | 天使轮后（假设出让 [x]%） |
|---|---|---|

**请律师确认**
1. [问题]

**Assumptions and gaps**
- [假设的融资比例或角色]
- [尚未谈清的口头承诺]

*商业条款建议，不构成法律意见。协议和章程请由律师起草。*

## Quality Checks

- [ ] No equal split is proposed without a tie-break mechanism
- [ ] One founder holds clear leadership of founder votes
- [ ] Vesting and departure terms are specified
- [ ] The control table uses the statutory thresholds and marks them for verification
- [ ] The cap table shows dilution after a round
- [ ] Nominee and verbal arrangements are flagged

## Anti-Patterns

- **Do not split equally to avoid an awkward conversation.**
- **Do not give a part-time adviser or a cash-only contributor a founder-sized stake.**
- **Do not issue all shares outright with no vesting.**
- **Do not ignore the gap between registered shares and what was promised verbally.**
- **Do not draft binding legal clauses.** Describe the terms and refer to a lawyer.

## Example Trigger Phrases

- "三个合伙人，一个出钱一个出技术一个全职运营，股权怎么分？"
- "我们现在是 50/50，有什么风险，怎么改？"
- "期权池应该留多少，放在谁名下？"
- "合伙人干了半年要走，他的股份怎么处理？"

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/cn-equity-split.html
