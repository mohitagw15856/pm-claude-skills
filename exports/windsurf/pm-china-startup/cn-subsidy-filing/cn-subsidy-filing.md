---
trigger: model_decision
description: "Find and file for government support available to a small company in China: map the policies that fit the company, check eligibility, prepare the materials, track deadlines, and keep the records that survive a later inspection. Use when asked 公司能申请哪些补贴, 政府补贴怎么申报, 稳岗补贴, 研发费用加计扣除怎么享受, 创业补贴申请, 政策兑现怎么办, or what subsidies can my Chinese company claim. Produces a policy map by department, an eligibility table, a materials checklist per item, a filing calendar, a record-keeping plan and warnings about intermediaries and false claims. Not legal or tax advice."
---

# 补贴与政策申报

Support for small companies in China is spread across departments and levels of government: tax incentives that are claimed in the return, employment and social insurance subsidies, science and technology funds, district rent and talent schemes. Most small firms miss them because nobody is assigned to look, or lose them because the paperwork was not kept. This skill builds the list, the calendar and the files. Policies are local and change every year, so the skill names policy types and where to look, and never invents an amount.

Write in Simplified Chinese.

## What This Skill Produces

- A policy map by department and level, matched to the company
- An eligibility table: condition, the company's position, evidence
- A materials checklist for each item worth pursuing
- A filing calendar
- A record-keeping plan for inspections and audits
- Warnings: intermediaries, false declarations, obligations attached to money received

## Required Inputs

Ask for these if not provided:

- City and district, registration date, industry
- Staff numbers, social insurance participation, recent hires (graduates, unemployed, disabled workers, veterans)
- Revenue, tax paid and research spending
- Qualifications held: 科技型中小企业, 高新技术企业, 专精特新, software enterprise
- Intellectual property, standards, certifications
- Premises: leased or owned, in a park or incubator
- Loans and financing
- Policies already claimed

## Framework

1. **Two kinds of support.**
   - **Claimed in the tax return** (no application or a simple filing): small low-profit enterprise income tax relief, VAT relief for small-scale taxpayers, additional deduction of research expenses, accelerated depreciation, relief on certain local levies.
   - **Applied for** through a department: funds, subsidies, rewards and interest subsidies.
2. **Where to look, by department.**
   - 税务: the tax incentives above.
   - 人社: job-stabilisation refunds, social insurance subsidies for hiring target groups, training subsidies, start-up subsidies and guaranteed start-up loans with interest subsidy.
   - 科技: registration as a technology-based SME, research funding, rewards on first recognition as a high-tech enterprise, innovation vouchers.
   - 工信: specialised SME rewards, digital transformation and equipment upgrade support.
   - 市场监管 and 知识产权: patent and trademark funding, standards rewards.
   - 商务: exhibition and export support.
   - 区、街道、园区: rent, fit-out, talent housing and local contribution rewards.
   - The city or district 政策兑现 or 惠企政策 platform lists what is open.
3. **Eligibility as tests.** Turn each policy's conditions into yes or no checks against the company.
4. **Value against effort.** Rank by expected amount, probability and work required. Small firms should pursue a few, properly.
5. **Materials.** Licence, tax and social insurance payment proofs, audited or filed financial statements, contracts, invoices, staff lists, certificates, bank details, commitment letters.
6. **Calendar.** Many funds open once a year for a short window. Tax incentives follow the filing calendar. Enter both.
7. **Records.** Keep the full file for each claim for the period the policy requires: what was declared, the evidence, how the money was used. Special-purpose funds must be spent and accounted for as stated.
8. **Obligations and risks.** Some grants require the company to stay in the district or meet targets, with repayment otherwise. False declarations to obtain funds can be a criminal matter. Intermediaries charging a percentage and promising approval are a risk; the company remains responsible for what is filed in its name.

## Output Format

### 政策申报计划：[公司]，[城市/区]

**政策地图**
| 部门 | 政策类型 | 是否可能适用 | 查询渠道 |
|---|---|---|---|

**适用性判断**
| 政策 | 条件 | 公司现状 | 证据 | 结论 |
|---|---|---|---|---|

**优先级**
| 政策 | 预期价值 | 把握 | 工作量 | 排序 |
|---|---|---|---|---|

**材料清单（按政策）**
- **[政策]**：[材料]

**申报日历**
| 时间 | 事项 | 负责人 |
|---|---|---|

**留存档案**：[每项申报应留存的文件与年限]

**注意**
- 金额、条件和窗口期以当地当年文件为准
- 资金须按申报用途使用并单独核算
- 警惕"包过"中介和虚假材料

**Assumptions and gaps**
- [假设的地方政策]
- [需要到政策平台核实的事项]

*准备参考，不构成法律或税务意见。*

## Quality Checks

- [ ] Tax incentives and application-based funds are separated
- [ ] Each policy has a place to verify it
- [ ] No subsidy amount is stated that the user did not supply
- [ ] The plan ranks items and limits the number pursued
- [ ] Record-keeping and use-of-funds obligations are covered
- [ ] The false-declaration and intermediary warnings appear

## Anti-Patterns

- **Do not invent amounts or deadlines.**
- **Do not list every national policy** without checking whether the district runs it.
- **Do not suggest adjusting figures to qualify.**
- **Do not ignore conditions attached to the money.**
- **Do not recommend paying an intermediary a success fee** without stating the risks.

## Example Trigger Phrases

- "我们是深圳一家 20 人的软件公司，能申请哪些补贴？"
- "研发费用加计扣除怎么享受，要留哪些资料？"
- "招了三个应届生，有没有社保补贴？"
- "帮我做一个全年的政策申报日历。"

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/cn-subsidy-filing.html

<!-- pm-claude-skills v84.0.0 | skill: cn-subsidy-filing | source: skills/cn-subsidy-filing/SKILL.md | sha256: 19d8e4c35c8f6e3329e62bd6cce886fdd2cb08ddc4bfd0f0234f2086cfe0059b | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
