# Example: cn-trade-quotation

## What this skill does

Builds an export price from the purchase cost through the VAT rebate, domestic costs, freight and insurance to each Incoterms 2020 term, and produces an English quotation sheet with a Chinese cost sheet. Rates are marked to confirm.

## How to trigger it

### Example 1: FOB Ningbo and CIF Hamburg

**You say:**
> "含税采购价每件 50 元，增值税 13%，退税率 13%，纸箱每箱 20 件，一个 40 尺高柜装 5000 件。国内拖车和报关等费用 4500 元每柜，宁波到汉堡海运 2800 美元每柜，保险费率 0.3%，汇率按 7.1，目标利润 12%。帮我算 FOB 宁波和 CIF 汉堡单价，再做一份英文报价单。"

**Claude produces (excerpt):**

**一、成本核算表（每件，人民币）**
| 项目 | 计算 | 金额 |
|---|---|---|
| 含税采购价 | | 50.00 |
| 出口退税 | 50 ÷ 1.13 × 13%（退税率需核实） | 5.75 |
| 实际成本 | 50 − 5.75 | 44.25 |
| 国内费用 | 4500 ÷ 5000 | 0.90 |
| 出口成本 | | 45.15 |
| 含 12% 利润的 FOB 价 | 45.15 ÷ (1 − 12%) | 51.31 |

**二、各术语报价（汇率 7.1，需核实）**
| 术语 | 加上的费用 | 单价（USD）|
|---|---|---|
| FOB Ningbo | | 51.31 ÷ 7.1 = 7.23 |
| CFR Hamburg | 海运 2800 ÷ 5000 = 0.56 | 7.79 |
| CIF Hamburg | (7.79) ÷ (1 − 110% × 0.3%) | 7.81 |

**报价单（英文）要点**：Unit price USD 7.23 FOB Ningbo, Incoterms 2020; USD 7.81 CIF Hamburg, Incoterms 2020; MOQ one 40HQ (5,000 pcs); validity 15 days; prices based on USD 1 = CNY 7.1; payment 30% T/T deposit, 70% against copy of B/L.

## Tips for best results

- Give the HS code so the rebate rate can be checked.
- Use a real forwarder quote for freight.
- Put a validity date and exchange-rate basis on every quotation.

## Related skills

- `cn-inquiry-reply` for the email around the quotation
- `cn-customs-docs` for the export documents
- `trade-quote-builder` for a tradesperson's job quote
