---
trigger: model_decision
description: "Prepare a 高新技术企业 (High and New Technology Enterprise) recognition application in China: test the company against the recognition conditions, estimate the innovation-capability score, plan the intellectual property, research expense and revenue evidence, and build the application timeline. Use when asked 高新技术企业认定条件, 高企申报材料, 我们公司能申请高企吗, 研发费用占比怎么算, 高企评分怎么打, or prepare our High-Tech Enterprise application. Produces a conditions table with a verdict on each, a score estimate by dimension, a gap list with actions, a materials checklist, a timeline and the post-recognition obligations. Not professional audit or tax advice."
---

# 高新技术企业认定申报

Recognition as a High and New Technology Enterprise brings a reduced enterprise income tax rate for three years and opens other support. It is assessed on documents: intellectual property, research project files, expense ledgers and audited figures. Companies fail on gaps that take a year to close, which is why the test should be run early. This skill checks eligibility and plans the evidence. Thresholds below follow the national recognition measures as commonly published; confirm them and the local filing windows with the provincial recognition office.

Write in Simplified Chinese.

## What This Skill Produces

- A conditions table with a verdict and the evidence for each condition
- An innovation-capability score estimate across the four dimensions
- A gap list with the action, owner and lead time
- A materials checklist
- A timeline keyed to the local filing batches
- Obligations after recognition and the risks of a weak application

## Required Inputs

Ask for these if not provided:

- Registration date, province and industry
- Main products or services and the technology behind them
- Intellectual property owned: type, number, how obtained, dates
- Staff total and the number engaged in research and technical work
- Revenue for the last three years and research expense for each
- Revenue from the products or services built on the core technology
- Research projects: number, records kept, results converted into products
- Net assets and revenue growth over three years
- Any serious safety, quality or environmental violation in the past year

## Framework: Recognition Conditions (verify)

1. **Age.** Registered for at least one year at application.
2. **Intellectual property.** Ownership of IP that plays a core supporting role in the main products or services, obtained by own research, transfer, donation or acquisition.
3. **Field.** The core technology falls within the catalogue of fields supported by the state.
4. **Research staff.** Personnel in research and related technical innovation make up at least ten percent of total staff.
5. **Research expense ratio** over the last three accounting years, against total sales revenue in the same period:
   - Latest-year revenue under 50 million yuan: at least 5 percent
   - 50 million to 200 million yuan: at least 4 percent
   - Above 200 million yuan: at least 3 percent
   A minimum share of the expense must be incurred in mainland China.
6. **High-tech revenue.** Revenue from high-tech products or services is at least 60 percent of total revenue in the latest year.
7. **Innovation capability.** A score above the pass mark on a 100-point scale: intellectual property (30), conversion of research results (30), research organisation and management (20), growth (20).
8. **Conduct.** No major safety, quality or serious environmental violation in the year before application.

**Scoring notes.** Category I IP (invention patents, among others) scores higher than Category II (utility models, software copyrights) and Category II can be used only once. Conversion scores depend on the number of results converted per year with evidence. Management scores look for project approval records, a research ledger, cooperation with institutions, and incentive and training systems. Growth uses net asset and revenue growth rates.

## Output Format

### 高企申报评估：[公司]

**认定条件**
| 条件 | 要求 | 现状 | 证据 | 结论 |
|---|---|---|---|---|

**创新能力评分预估**
| 维度 | 满分 | 预估 | 依据 | 提升办法 |
|---|---|---|---|---|
| 知识产权 | 30 | | | |
| 科技成果转化 | 30 | | | |
| 研发组织管理 | 20 | | | |
| 成长性 | 20 | | | |
| **合计** | 100 | | | |

**差距与行动**
| 差距 | 行动 | 负责人 | 所需时间 |
|---|---|---|---|

**材料清单**
- [ ] 认定申请书与营业执照
- [ ] 知识产权证书及与主要产品的对应说明
- [ ] 研发项目立项、过程与结题资料
- [ ] 科技成果转化证明
- [ ] 研发组织管理制度文件
- [ ] 近三年财务审计报告、研发费用专项审计报告
- [ ] 近一年高新技术产品（服务）收入专项审计报告
- [ ] 科技人员名单与社保证明
- [ ] 近三年纳税申报表

**时间表**
| 时间 | 事项 |
|---|---|

**认定后义务**：年度发展情况报表、重大变化报告、资料留存、到期重新认定。

**Assumptions and gaps**
- [假设的数据或分类]
- [对结论影响最大的未核实数字]

*评估与准备参考，不替代专项审计和主管部门的认定意见。条件和批次以当地认定机构公告为准。*

## Quality Checks

- [ ] All eight conditions have a verdict and evidence
- [ ] The research expense ratio uses three years and the right revenue tier
- [ ] The score estimate explains each dimension
- [ ] Gaps carry a realistic lead time, especially for IP
- [ ] The materials list includes both special audit reports
- [ ] Post-recognition obligations are stated

## Anti-Patterns

- **Do not count IP that is unrelated to the main products.**
- **Do not reclassify ordinary costs as research expense** to reach the ratio. Misreporting leads to cancellation and tax recovery.
- **Do not promise a score.** Experts decide.
- **Do not suggest buying patents at the last minute** as a fix without stating the risk.
- **Do not state local deadlines.** Ask or tell the user to check the provincial notice.

## Example Trigger Phrases

- "我们公司成立两年，有 6 个软著，能申请高企吗？"
- "研发费用占比怎么算？去年收入 3000 万。"
- "帮我估一下高企创新能力能打多少分。"
- "高企申报要准备哪些材料，什么时候开始？"

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/cn-high-tech-enterprise-application.html

<!-- pm-claude-skills v84.0.0 | skill: cn-high-tech-enterprise-application | source: skills/cn-high-tech-enterprise-application/SKILL.md | sha256: 5a90070ca5605be73bfe14b895409b99fa4a14cb8073106d65201424b35014b4 | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
