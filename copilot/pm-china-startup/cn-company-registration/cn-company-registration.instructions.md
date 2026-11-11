---
applyTo: "**"
description: "Plan the registration of a business in mainland China: choose between 个体工商户, 有限责任公司 and 合伙企业, prepare the name, address, business scope, registered capital and officers, follow the steps from name approval to bank account and tax registration, and set up the first-year compliance calendar. Use when asked 怎么注册公司, 注册公司流程和材料, 个体户还是公司, 注册资本写多少, 经营范围怎么写, or how do I set up a company in China. Produces an entity recommendation with reasons, a decision sheet for each registration field, a step list with documents, a first-year calendar for tax and annual reporting, and a list of risks to understand before signing. Not legal or tax advice."
---

# 公司注册

Registering a company in China is now quick. The decisions made on the form are what cause trouble later: registered capital that the shareholders must actually pay in, a legal representative who carries personal exposure, a business scope that blocks an invoice or a licence, an address that fails inspection. This skill prepares those decisions and the steps. Local practice differs by city and district, and company law and tax rules change, so each item is marked for confirmation with the local registration authority or an accountant.

Write in Simplified Chinese.

## What This Skill Produces

- An entity recommendation: 个体工商户, 有限责任公司 (including one-person companies) or 合伙企业, with reasons
- A decision sheet for name, address, business scope, registered capital, shareholders and officers
- The steps from name approval to opening for business, with documents
- A first-year compliance calendar
- A risk list in plain language

## Required Inputs

Ask for these if not provided:

- What the business does and how it will earn revenue
- Founders: how many, their roles, capital each will contribute, whether any holds another job
- City and district, and the address available (commercial lease, incubator, residential)
- Expected revenue in the first year and the kind of customers (individuals or companies needing 专票)
- Plans to raise investment, hire staff or apply for licences
- Whether the business falls into a licensed sector (food, education, medical, finance, internet content)

## Framework

1. **Entity choice.**
   - 个体工商户: simple, low cost, unlimited personal liability, cannot take equity investment.
   - 有限责任公司: liability limited to subscribed capital, can take investors and issue equity, more compliance.
   - 合伙企业: used for professional practices and holding platforms; general partners bear unlimited liability.
2. **Name.** 行政区划 + 字号 + 行业 + 组织形式. Prepare several 字号 and check for conflicts and trademark clashes.
3. **Address.** Must be a real, registrable address that matches local rules. Check whether the district accepts residential or clustered registration.
4. **Business scope.** Use the standard expressions from the official catalogue. Put the main business first. Sectors needing prior or post-registration approval are flagged.
5. **Registered capital.** Subscribed, but under the revised Company Law shareholders of a limited company must pay it in within a statutory period from establishment. Choose an amount the founders can fund; an inflated figure is a liability, not a sign of strength. Verify the current rule and transition arrangements.
6. **Officers.** 法定代表人, 执行董事或董事会, 监事 (or the alternatives the law now permits for small companies), 财务负责人. The legal representative carries personal consequences if the company defaults or breaches rules.
7. **Steps.** Name self-declaration, online filing of establishment documents, electronic signatures, business licence, company seals, bank basic account, tax registration and taxpayer type (小规模纳税人 or 一般纳税人), invoice set-up, social insurance and housing fund accounts.
8. **After registration.** Monthly or quarterly tax filings even with no revenue, bookkeeping, the annual report to the market regulator in the first half of each year, and annual income tax settlement.
9. **Risks.** Nominee shareholders and nominee legal representatives, lending the licence, mixing personal and company money, missed filings leading to the abnormal-operations list.

## Output Format

### 注册方案：[项目]

**建议的主体类型**：[类型]，理由：[三点]

**登记事项决策表**
| 事项 | 建议 | 理由 | 需确认 |
|---|---|---|---|
| 名称（备选 3 个） | | | |
| 住所 | | | |
| 经营范围 | | | |
| 注册资本与出资期限 | | | |
| 股东与出资比例 | | | |
| 法定代表人、董事、监事 | | | |
| 纳税人类型 | | | |

**办理步骤**
| 步骤 | 办理渠道 | 材料 | 预计时间 |
|---|---|---|---|

**第一年合规日历**
| 时间 | 事项 |
|---|---|

**需要了解的风险**
- [风险与后果]

**Assumptions and gaps**
- [假设的城市政策或业务范围]
- [最需要向登记机关或会计确认的问题]

*仅供准备参考，不构成法律或税务意见。各地办理要求不同，请以当地市场监管部门和税务机关为准。*

## Quality Checks

- [ ] The entity recommendation gives reasons tied to the founders' situation
- [ ] Registered capital advice mentions the pay-in obligation and marks it for verification
- [ ] Licensed sectors are flagged
- [ ] The step list ends with tax, invoices and social insurance set-up
- [ ] The calendar includes zero-revenue filings and the annual report
- [ ] Nominee arrangements are named as a risk

## Anti-Patterns

- **Do not recommend a large registered capital to look impressive.**
- **Do not invent business-scope wording.** Use the catalogue and tell the user to confirm.
- **Do not treat registration as the end.** Missed filings start the next month.
- **Do not advise using someone else's identity** as shareholder or legal representative.
- **Do not state local address rules as universal.**

## Example Trigger Phrases

- "两个人想在杭州开一家做小程序开发的公司，流程是什么？"
- "注册资本写 100 万还是 10 万？"
- "个体户和有限公司哪个更适合我开网店？"
- "经营范围怎么写才能开技术服务费的发票？"

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/cn-company-registration.html

<!-- pm-claude-skills v84.0.0 | skill: cn-company-registration | source: skills/cn-company-registration/SKILL.md | sha256: 2a3a6c054511a6fa134cf50ad93f6db23b921f8888497cbe7867e18c020275e6 | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
