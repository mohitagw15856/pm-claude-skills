# Example: cn-letter-of-credit-check

## What this skill does

Reviews a letter of credit against the contract (审证), flags soft clauses with amendment wording, and checks the documents before presentation (审单) with the relevant UCP 600 articles, all marked to confirm with the bank. Not legal or banking advice.

## How to trigger it

### Example 1: a sight L/C with a soft clause

**You say:**
> "收到一份即期信用证：金额 USD 86,000，无溢短装；最迟装运日 2026 年 11 月 30 日，有效期 12 月 5 日，到期地点在开证行所在国；46A 要求全套清洁已装船提单、商业发票三份、装箱单、CIF 保险单 110%；47A 写着 inspection certificate signed by applicant's representative required。合同是 CIF 汉堡。帮我审证，找出风险和要改证的地方。"

**Claude produces (excerpt):**

**一、条款审核（节选）**
| 字段 | 内容 | 与合同是否一致 | 风险 | 建议 |
|---|---|---|---|---|
| 31D 有效期与地点 | 12 月 5 日，开证行所在国 | 合同未约定 | 单据须在 12 月 5 日前到达国外银行，邮寄时间风险大 | 改为在中国到期 |
| 44C 最迟装运日 | 11 月 30 日 | 一致 | 若 30 日装运，只剩 5 天交单 | 延长有效期至装运后 21 天 |
| 48 交单期 | 未写 | | 按 UCP 600 第 14 条 c 款，装运后 21 天内且不晚于有效期（需核实） | 明确写入 |

**二、软条款**
47A："inspection certificate signed by applicant's representative required"。出具这份证书取决于买方，买方不签字就无法交单。建议改为由第三方检验机构出具，或删除此条。

**三、改证要求（可直接发给客户）**
> Please amend the L/C as follows: 1. Expiry place: China. 2. Expiry date: 21 days after the latest shipment date. 3. Delete the requirement for an inspection certificate signed by the applicant's representative, or replace it with a certificate issued by an independent inspection company.

以上引用的 UCP 600 条款需与通知行单证部门核实，信用证条款优先于惯例。

## Tips for best results

- Paste the full MT700 text, not a summary.
- Have the sales contract next to it.
- Ask for amendments before production, not after shipment.

## Related skills

- `cn-trade-quotation` for the price and Incoterm behind the L/C
- `cn-customs-docs` for the export declaration
