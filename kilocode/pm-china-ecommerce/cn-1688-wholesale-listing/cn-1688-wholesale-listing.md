# 1688 批发 Listing

A 1688 buyer is a shop owner, a trader or a purchasing agent. They do not want lifestyle copy. They want to know whether the factory is real, what the price is at their quantity, how fast it ships, and whether their logo can go on it. This skill writes the listing to answer those questions on the page so that enquiries arrive already qualified.

Write in Simplified Chinese.

## What This Skill Produces

- A title built for purchaser search terms
- A tiered price table (阶梯价) with the minimum order quantity (起批量)
- A supply-capability block: factory, capacity, lead time, certifications
- A detail page outline for wholesale buyers
- Terms for 混批, 一件代发, 定制 and OEM or ODM
- An enquiry reply template and a compliance check

## Required Inputs

Ask for these if not provided:

- Product, category, specifications, materials, variants
- Seller type: 源头工厂, 贸易商 or 品牌商, and any 实力商家 or 诚信通 status
- Cost, target margin and the quantities at which price can drop
- 起批量, whether mixed batches are allowed, stock on hand and monthly capacity
- Lead time for stock and for custom orders, shipping origin and logistics
- Customisation offered: logo, packaging, colour, mould, minimum for each
- Dropshipping terms, if offered
- Certificates and test reports held
- Target buyers: 电商卖家, 实体店, 外贸, 团购, 礼品定制

## Framework

1. **Title.** 核心品类词 + 属性 + 用途或渠道词 (跨境, 电商爆款, 礼品定制) + 供应方式词 (厂家直销, 一件代发, 可定制). Use only terms that are true.
2. **Price ladder.** Three tiers are typical. Each step should be a real saving tied to a real cost break. State whether tax invoices (专票 or 普票) and freight are included.
3. **Supply capability.** Factory area, staff, lines, monthly output, years in the category, main customers by type, quality control steps, certificates. Photographs of the workshop and warehouse do more than adjectives.
4. **Detail page order for wholesale.** 规格与参数表, 价格与起批, 实拍与细节, 工厂与产能, 定制流程与打样, 包装与装箱规格, 物流与交期, 售后与质保, 合作案例.
5. **Customisation terms.** Minimum per option, sample fee and whether it is refunded on order, sample lead time, artwork format, mould cost and ownership.
6. **Dropshipping.** Per-piece price, handling time, packaging neutrality (no factory price slip), returns handling, supported platforms.
7. **Trade terms.** Payment method, deposit and balance for custom work, invoice type, inspection, returns for quality problems.
8. **Compliance.** No false factory claims, no brand names without authorisation, no 极限词, and accurate certificates for regulated goods.

## Output Format

### 1688 Listing：[产品]

**标题**：[标题]（[字数] 字）

**价格与起批**
| 数量 | 单价 | 说明 |
|---|---|---|

含税与运费：[说明]。混批：[规则]。

**供应能力**
| 项目 | 内容 |
|---|---|
| 工厂与产能 | |
| 现货与交期 | |
| 质检与资质 | |

**详情页结构**
| 模块 | 内容要点 |
|---|---|

**定制与打样**：[起订量、打样费、周期、文件格式]
**一件代发**：[单价、发货时效、包装、退换]
**交易条款**：[付款、发票、验货、售后]

**询盘回复模板**
> [问清数量、用途、是否定制、交期，再报价。]

**合规检查**：[品牌授权、资质、用词]

**Assumptions and gaps**
- [假设的成本、产能或交期]
- [买家最可能追问而页面未回答的问题]

## Quality Checks

- [ ] The title uses purchaser terms and makes no false supply claim
- [ ] The price ladder has real steps and states tax and freight
- [ ] Capacity and lead time are numbers, not adjectives
- [ ] Customisation terms give a minimum, a sample fee and a lead time
- [ ] Dropshipping terms cover packaging neutrality and returns
- [ ] Every certificate mentioned is one the seller holds

## Anti-Patterns

- **Do not write consumer lifestyle copy** for a wholesale buyer.
- **Do not claim 源头工厂 for a trading company.**
- **Do not set a price ladder with meaningless differences.**
- **Do not promise lead times the factory cannot keep.**
- **Do not show other brands' logos** in sample images without authorisation.

## Example Trigger Phrases

- "帮我写保温杯的 1688 标题和阶梯价，我们是永康的工厂。"
- "一件代发的条款怎么写才能吸引抖音卖家？"
- "写一个 1688 详情页结构，突出我们能做 OEM。"
- "Write a 1688 listing for custom tote bags with a 500-piece minimum."

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/cn-1688-wholesale-listing.html

<!-- pm-claude-skills v84.0.0 | skill: cn-1688-wholesale-listing | source: skills/cn-1688-wholesale-listing/SKILL.md | sha256: f90ccc882c81a06424f19c48a00ccc235a1f0b716bb348b63a1c91b330418db5 | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
