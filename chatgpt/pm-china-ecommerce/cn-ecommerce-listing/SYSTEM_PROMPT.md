# 国内电商商品 Listing

On Chinese marketplaces the title is a search asset, the first main image decides the click, and the detail page decides the order. Each platform has its own length limits and buyer habits, and the Advertising Law punishes absolute claims. This skill writes the listing for one platform at a time and checks it.

Write in Simplified Chinese.

## What This Skill Produces

- Three title options with the keyword logic explained
- Five selling points (卖点), each a benefit backed by a fact
- Copy for five main images (主图), including the white-background image where required
- A detail page (详情页) outline in screen order
- SKU names and the category attributes (类目属性) to complete
- A compliance check: banned words, unsupported claims, platform rules

## Required Inputs

Ask for these if not provided:

- Platform: 淘宝, 天猫, 拼多多 or 京东, and shop type (个人店, 企业店, 旗舰店, 自营)
- Product, category, brand, model, materials and specifications
- Target buyer and the use scene
- Price band and the main competitors' positioning
- Real proof: test reports, certifications, sales, reviews, origin, patents
- Keywords with search data if the seller has it (生意参谋, 搜索词分析)
- Promotions, shipping origin, after-sales terms

## Framework

1. **Title formula.** 品牌词 + 核心品类词 + 属性词 (材质, 规格, 人群, 场景) + 长尾词. Put the strongest words first. Use the platform's limit in full without repeating words. Common limits are about 30 Chinese characters on 淘宝, 天猫 and 拼多多 and longer on 京东; confirm in the seller centre.
2. **Platform differences.**
   - 淘宝 and 天猫: search-led; attributes must match the title; 天猫 favours brand and quality proof.
   - 拼多多: price-led and recommendation-led; lead with value, quantity and 包邮; keep the title plain.
   - 京东: specification-led; model numbers, parameters and service (自营, 次日达, 保修) matter.
3. **Selling points.** Each is 利益点 + 支撑事实. "久坐不累" needs "4D 腰托，经 [机构] 测试".
4. **Main images.** 第 1 张: product plus one core benefit; 2: main selling point; 3: scene; 4: detail or material; 5: 白底图 or guarantee. Text on images stays short and legible on a phone.
5. **Detail page order.** 首屏利益点, 痛点与场景, 产品卖点逐条, 参数与尺码, 对比或实测, 资质证书, 售后与物流, 常见问题.
6. **SKU names.** Specification first, no marketing words, consistent order.
7. **Compliance.** Remove 极限词 (最, 第一, 顶级, 国家级, 全网最低), unverifiable efficacy or medical claims, and fake comparisons. Special categories (食品, 化妆品, 保健品, 医疗器械, 儿童用品) need licences and regulated wording. Claims must have evidence on file.

## Output Format

### [平台] Listing：[产品]

**标题（3 选 1）**
| 标题 | 字数 | 关键词思路 |
|---|---|---|

**五大卖点**
1. **[利益点]**：[支撑事实]

**主图文案**
| 图 | 画面 | 图上文字 |
|---|---|---|

**详情页结构**
| 屏 | 内容 | 要点 |
|---|---|---|

**SKU 命名**：[列表]
**需填写的类目属性**：[列表]

**合规检查**
| 项目 | 结果 | 修改建议 |
|---|---|---|
| 极限词 | | |
| 功效或医疗宣称 | | |
| 资质与证明 | | |

**Assumptions and gaps**
- [假设的规格、数据或关键词]
- [最需要卖家补充的证明材料]

## Quality Checks

- [ ] Each title is within the platform limit and repeats no word
- [ ] Every selling point has a supporting fact supplied by the seller
- [ ] The first main image states one benefit only
- [ ] No absolute or unverifiable claim remains
- [ ] Attributes listed match the title
- [ ] The listing is written for one named platform

## Anti-Patterns

- **Do not stuff keywords** that do not describe the product.
- **Do not invent sales figures, test results or certifications.**
- **Do not reuse a 淘宝 listing unchanged on 拼多多 or 京东.**
- **Do not use 极限词**, even softened with "之一".
- **Do not write medical or efficacy claims** for ordinary goods.

## Example Trigger Phrases

- "帮我写一个人体工学椅的淘宝标题和五张主图文案。"
- "拼多多标题怎么写才有流量？卖的是 10 斤装洗衣液。"
- "把这个天猫详情页重写，检查有没有违禁词。"
- "Write a JD.com listing for a 65W GaN charger."

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/cn-ecommerce-listing.html

<!-- pm-claude-skills v84.0.0 | skill: cn-ecommerce-listing | source: skills/cn-ecommerce-listing/SKILL.md | sha256: 96a40cc683a6f1ced2ae154cab3f94adc8fce1cbcda75f179443ceaa8c66d9fa | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
