---
name: cn-customs-docs
description: "Use when asked 出口报关需要什么单证, 报关资料清单, 申报要素怎么填, 报关单和发票对不上, 出口退税需要的单证, 进口清关资料, or prepare customs documents for an export or import shipment in mainland China. Produces a document checklist for this shipment (报关单 data, 商业发票, 装箱单, 合同, 委托书, licences and certificates), a cross-document consistency check, the 申报要素 to prepare for the HS code, inspection and licence flags, the timeline with the customs broker, and the records to keep for the export rebate, all marked to confirm with the broker and customs."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/cn-customs-docs.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Customs Documents (报关单证清单)

Most delays at Chinese customs come from documents: an invoice that does not match the packing list, a missing 申报要素, a product that needed a licence or inspection, or a declaration under the wrong HS code. Errors can mean held cargo, storage charges, a lost export rebate or penalties. This skill lists what this shipment needs, checks the documents agree with each other, and prepares the questions for the customs broker (报关行).

Write in Simplified Chinese unless asked otherwise. Customs requirements, HS classification, licences and inspection lists change, and the final classification and declaration are the responsibility of the declarant; everything here is marked 需核实 and must be confirmed with a licensed customs broker, the 中国国际贸易单一窗口 and customs (海关). Not legal or customs advice; for HS classification disputes, ask the broker about a 预裁定 (advance ruling). For the quotation and Incoterm choice, see `cn-trade-quotation`; for L/C documents, `cn-letter-of-credit-check`.

## Required Inputs

Ask for these if not provided, otherwise infer and label the assumption:
- **Direction**: export or import; general trade (一般贸易), processing trade, cross-border e-commerce or other
- **Goods**: description, material, use, brand, model, HS code if known, quantity and units, value
- **Parties**: the exporter or importer of record and its customs registration, the consignee, the broker
- **Shipment**: mode, ports, container or LCL, Incoterm, planned dates
- **Documents already prepared**: contract, invoice, packing list, any certificates
- **Special features**: batteries, chemicals, food, wood packaging, dual-use items, brands (知识产权 risk), samples

## Output Structure

### 1. 本票货需要的单证
| 单证 | 是否需要 | 由谁提供 | 状态 | 备注（需核实）|
- 报关单 data (prepared by the broker through 单一窗口)
- 商业发票, 装箱单, 贸易合同
- 代理报关委托书 and the electronic authorisation
- 提单 or 订舱确认
- Licences where the goods require them (出口许可证, 两用物项 licence)
- Inspection and quarantine certificates where required (now handled by customs since the 2018 merger of inspection into customs, 需核实)
- 原产地证 if the buyer needs preferential duty under an FTA (the importing side's rules apply)
- Dangerous goods documents (MSDS, packaging certificate) for batteries or chemicals
- Wood packaging fumigation or IPPC mark

### 2. 单证一致性检查
| 字段 | 合同 | 发票 | 装箱单 | 报关资料 | 是否一致 |
Names, addresses, goods descriptions, quantities and units, net and gross weights, values and currency, Incoterm, marks and numbers, container numbers. Flags any mismatch.

### 3. 申报要素准备（需核实）
For the HS code: the declaration elements customs requires (品名, 用途, 材质, 品牌类型, 出口享惠情况, 型号 and so on), with the person's answers filled in and gaps flagged. A reminder that the broker confirms the code and elements.

### 4. 监管与风险提示
Whether the goods may need a licence, inspection, a dangerous goods route, or a brand authorisation (知识产权 checks at the border); the consequence of a wrong declaration (held cargo, rebate loss, penalties).

### 5. 时间线
| 节点 | 时间 | 负责人 |
Documents to the broker, declaration, inspection if any, release, cut-off for loading.

### 6. 出口退税留存资料（出口时）
The records to keep: the export declaration data, invoices, contract, logistics documents, and the timeline for declaring the rebate, all to confirm with the tax bureau and the company's accountant.

## Quality Checks

- [ ] The checklist is specific to the goods, direction and trade mode
- [ ] Cross-document fields are compared and mismatches flagged
- [ ] 申报要素 are listed for the HS code with gaps flagged
- [ ] Licence, inspection, dangerous goods and IP flags are considered
- [ ] Every requirement is marked 需核实 with the broker or customs named
- [ ] The output states that the declarant and broker are responsible for the final declaration

## Anti-Patterns

- **Picking the HS code with the lowest duty or highest rebate.** Classification follows the goods, not the outcome; misdeclaration has penalties.
- **Invoice and packing list prepared by different people without a check.** Mismatches are the commonest delay.
- **Undervaluing to save duty.** It is a customs offence and can follow the company.
- **Brand goods without authorisation.** Border IP checks can seize them.
- **Leaving documents to the cut-off day.** Inspection or a query can take days.

## Example Trigger Phrases

- "我们第一次出口锂电池移动电源到美国，报关要准备哪些资料？"
- "发票和装箱单的毛重对不上，报关会有问题吗？"
- "这个产品的申报要素怎么填？HS 编码是 8516.79。"
- "出口退税需要留存哪些单证？"
- "List the customs documents for exporting furniture from China."
