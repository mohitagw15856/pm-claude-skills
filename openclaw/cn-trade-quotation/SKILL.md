---
name: cn-trade-quotation
description: "Use when asked 做一份外贸报价单, FOB 和 CIF 怎么报价, 出口报价核算, 报价怎么算利润, 退税怎么算进报价, quotation sheet for an export order, or price an export quotation from China. Produces a cost build-up from the factory price through export tax rebate, domestic logistics, port charges, freight and insurance to each Incoterms 2020 term, a quotation sheet in English with a Chinese summary, quantity tiers, validity and exchange-rate assumptions, payment terms and the risk each term puts on the seller, with rates marked to confirm."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/cn-trade-quotation.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Export Quotation (外贸报价单与成本核算)

An export quotation looks like one number but contains a dozen: the purchase or production cost, the VAT export rebate (出口退税), inland transport, port and customs charges, ocean or air freight, insurance, bank charges, the exchange rate and the margin, all shifting with the Incoterm. Sales teams often quote FOB and CIF from a rule of thumb and discover the loss after shipment. This skill builds the price from the costs and produces a quotation the buyer can compare.

Write the quotation in English with a Chinese cost sheet (成本核算表) and explanations in Simplified Chinese unless asked otherwise. Incoterms 2020 are an ICC publication; the summaries here are for orientation. Rebate rates, freight, surcharges and exchange rates change; every rate is marked 需核实 and should be confirmed with the tax bureau's rebate rate lookup, the freight forwarder and the bank. Not tax or legal advice. For the reply email around the quotation, see `cn-inquiry-reply`; for a tradesperson's job quote, `trade-quote-builder` is the separate skill.

## Required Inputs

Ask for these if not provided, otherwise infer and label the assumption:
- **Product**: HS code if known, unit, purchase price including VAT (含税采购价) or production cost, VAT rate and rebate rate
- **Order**: quantity tiers, packing (units per carton, carton size and weight), containers or cubic metres
- **Logistics**: factory location, port of loading, destination port or place, quotes from the forwarder (inland, port charges, freight, surcharges)
- **Terms requested**: FOB, CFR, CIF, FCA, CIP, DAP, DDP or several
- **Money**: target margin, exchange rate assumption, payment terms (T/T deposit, L/C, D/P), bank charges
- **Validity**: how long the price must hold

## Output Structure

### 1. 成本核算表（人民币）
| 项目 | 计算 | 金额 |
- 含税采购价
- 出口退税 = 含税采购价 ÷ (1 + 增值税率) × 退税率 (需核实 the rate for this HS code)
- 实际成本 = 含税采购价 − 退税额
- 国内费用: inland transport, 报关 and inspection fees, port and terminal charges, document fees, bank charges
- 出口成本 = 实际成本 + 国内费用
- 利润
Each figure from the person's inputs or a forwarder quote; assumptions labelled.

### 2. 各术语报价推导（Incoterms 2020，需核实）
| 术语 | 卖方承担到哪里 | 加上的费用 | 单价（USD）|
- **FOB / FCA**: export cost plus margin, converted at the exchange rate
- **CFR / CPT**: plus main carriage freight
- **CIF / CIP**: plus insurance (commonly on 110 per cent of the CIF value; CIF requires at least Institute Cargo Clauses (C) cover, CIP at least (A) under Incoterms 2020, 需核实)
- **DAP / DPU / DDP**: plus destination costs, and for DDP the import duties and taxes, which the seller should quote only with a confirmed import cost
Show the formula, especially that CIF = (FOB + freight) ÷ (1 − 110% × insurance rate).

### 3. 数量阶梯
Prices for two or three quantity tiers, showing how fixed costs spread.

### 4. 报价单（英文）
Header (seller, buyer, date, quotation number), item table (description, specification, HS code, unit price by term, MOQ, packing), Incoterm with the named place (for example "FOB Ningbo, Incoterms 2020"), lead time, payment terms, validity, exchange rate basis, what is excluded, and a signature block.

### 5. 中文摘要与风险
For the sales manager: margin at each term, the risks the seller carries under each (freight increases, DDP import tax, currency), and the walk-away price.

## Quality Checks

- [ ] Every cost has a source or is labelled as an assumption
- [ ] The rebate calculation uses the VAT and rebate rates for the HS code, marked 需核实
- [ ] Each Incoterm includes exactly the costs the seller bears for it, with the named place stated
- [ ] Validity and exchange-rate assumptions are on the quotation
- [ ] DDP is only quoted with confirmed import duties and taxes
- [ ] The margin and walk-away price are visible internally but not on the buyer's copy

## Anti-Patterns

- **CIF as FOB plus a guess.** Get a freight quote and calculate insurance properly.
- **No validity date.** Freight and exchange rates move; an open quote is a free option for the buyer.
- **"FOB" with no port or Incoterms version.** Always name the place and "Incoterms 2020".
- **Forgetting the rebate or counting it twice.** Rebate depends on the HS code and on correct export declaration.
- **Quoting DDP blind.** Import duties and VAT can wipe out the margin.

## Example Trigger Phrases

- "含税采购价 50 元，增值税 13%，退税率 13%，一个 40 尺柜装 5000 件，帮我算 FOB 宁波和 CIF 汉堡报价。"
- "客户要 DDP 报价到美国，要注意什么？"
- "帮我做一份英文报价单，有三个数量档。"
- "FOB 和 FCA 有什么区别？我们走集装箱该用哪个？"
- "Build an export quotation with a cost build-up for several Incoterms."
