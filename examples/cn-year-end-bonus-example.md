# Example: cn-year-end-bonus

## What this skill does

Explains how a mainland China year-end bonus is likely calculated from the person's documents, compares the tax options, drafts written questions for HR, and sets out the steps if a bonus is withheld after resignation. Every rule is marked to confirm; it is not tax or legal advice.

## How to trigger it

### Example 1: estimate, tax and leaving before payout

**You say:**
> "我月薪 2 万，合同写了 13 薪，另外有绩效年终奖，公司说系数 0.9，我绩效 B+ 对应 1.2，基数 2 个月。我打算明年 1 月离职，年终奖 3 月发。大概能拿多少，怎么交税，离职了还能拿吗？"

**Claude produces (excerpt):**

**一、你的奖金有两部分**
| 类型 | 依据 | 含义 |
|---|---|---|
| 13 薪 | 劳动合同（请提供条款原文） | 更接近固定工资，离职时是否折算看条款写法 |
| 绩效年终奖 | 公司奖金制度（请向 HR 索取书面版本） | 按系数计算，有"发放日在职"条件的可能 |

**二、估算（假设，需核实）**
绩效年终奖 = 20,000 × 2 × 0.9 × 1.2 = **43,200 元**；13 薪 = 20,000 元。

**三、个税对比（需核实，以个人所得税 App 年度汇算为准）**
| 方案 | 计算 | 应纳税额 |
|---|---|---|
| 单独计税 | 43,200 ÷ 12 = 3,600，适用 10%；43,200 × 10% − 210 | 4,110 元 |
| 并入综合所得 | 取决于你全年其他收入和专项附加扣除 | 汇算时两种方式都试算 |

注意临界点：年终奖如果在 36,000 元左右，多拿一点可能税后反而更少。

**四、离职后能不能拿（需核实，不构成法律意见）**
- 先看制度里有没有"发放日在职"的条件，以及制度是否经过民主程序并向员工公示。
- 最高人民法院指导性案例 183 号认为：劳动者已工作完整个年度、合同解除非因劳动者过错时，仅以发放日不在职为由不发年终奖，法院不予支持。具体结果取决于事实和当地实践。
- 建议：离职前书面询问 HR，保存合同、制度、工资条、绩效结果。

**发给 HR 的消息：**
> 您好，想确认一下今年年终奖的几件事：1. 适用哪份奖金制度，能否发我一份书面版本？2. 我的个人系数和公司系数分别是多少？3. 若 1 月离职，3 月发放的年终奖如何处理？4. 采用单独计税还是并入综合所得？谢谢！

## Tips for best results

- Share the actual clauses from the contract and the bonus policy.
- Include your other annual income for a real tax comparison.
- Confirm current tax rules with the local tax office before relying on any figure.

## Related skills

- `cn-severance-calculator` if the contract is ending with compensation
- `cn-iit-reconciliation` for the annual tax reconciliation
- `cn-labour-contract-decoder` to read the contract clauses
