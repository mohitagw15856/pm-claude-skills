# Example: cn-customs-docs

## What this skill does

Lists the customs documents a shipment needs, checks the documents agree with each other, prepares the 申报要素 for the HS code, flags licence, inspection, dangerous goods and IP risks, and lists the records to keep for the export rebate. Everything is marked to confirm with the broker.

## How to trigger it

### Example 1: Bluetooth speakers with lithium batteries to the US

**You say:**
> "我们第一次一般贸易出口一批蓝牙音箱到美国，内置锂电池，海运整柜，FOB 深圳。现在有合同、发票和装箱单。帮我列出报关需要的单证，检查要注意的监管问题，以及出口退税要留存哪些资料。"

**Claude produces (excerpt):**

**一、本票货需要的单证（需核实）**
| 单证 | 是否需要 | 由谁提供 | 备注 |
|---|---|---|---|
| 商业发票、装箱单、合同 | 是 | 我方 | 三者数量、品名、金额须一致 |
| 代理报关委托书 | 是 | 我方签署 | 通过单一窗口电子委托 |
| 锂电池运输相关文件（如 MSDS、UN38.3 测试报告、危包证明） | 很可能需要 | 电池或成品供应商 | 向货代和船公司确认是否按危险品申报 |
| 品牌授权 | 如为他人品牌 | 品牌方 | 避免知识产权查扣 |

**二、单证一致性检查**
| 字段 | 合同 | 发票 | 装箱单 | 是否一致 |
|---|---|---|---|---|
| 数量 | 3000 台 | 3000 台 | 2950 台 | 不一致，需核对 |

**三、申报要素（以报关行确认的 HS 编码为准）**：品名、用途、品牌类型、出口享惠情况、型号、是否含电池等，缺项已标出。

**六、出口退税留存资料**：报关单数据、合同、发票、物流单据，保存期限和申报时间向税务局和公司会计核实。

## Tips for best results

- Describe the goods fully: material, use, brand, battery.
- Send the invoice and packing list together for the consistency check.
- Let the licensed broker confirm the HS code.

## Related skills

- `cn-trade-quotation` for the price and Incoterm
- `cn-letter-of-credit-check` for L/C documents
