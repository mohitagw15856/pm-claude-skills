# Example: cn-5s-audit

## What this skill does

Builds a 5S or 6S audit for a specific area: scored criteria per S, a scoring guide with photo rules, a red-tag list, a corrective-action tracker with owners and dates, and an auditor rota. Serious safety hazards are escalated, not only scored.

## How to trigger it

### Example 1: an injection moulding workshop

**You say:**
> "帮我做一份注塑车间 6S 检查表，车间有 12 台注塑机、模具架和原料干燥区，问题是模具乱放、地上有油、通道经常被物料堵住。每周查一次，要有评分标准和整改跟踪表。"

**Claude produces (excerpt):**

**一、检查表（节选）**
| 类别 | 序号 | 检查项目 | 合格标准 | 分值 |
|---|---|---|---|---|
| 整顿 | 2-1 | 模具存放 | 模具放在模具架指定库位，库位有标识，与模具清单一致 | 5 |
| 整顿 | 2-2 | 通道 | 黄线内通道无物料占用，宽度不小于标识宽度 | 5 |
| 清扫 | 3-1 | 机台油污 | 机台下方无积油；漏油点已挂牌并报修 | 5 |
| 安全 | 6-1 | 消防通道 | 消防通道和灭火器前无遮挡 | 5（发现遮挡立即整改并上报安全员） |

**二、评分规则**：每项 0 至 5 分；5 分完全符合，3 分有一处不符合，0 分普遍不符合；每次扣分附一张照片。

**四、整改跟踪表**
| 问题 | 位置 | 责任人 | 整改措施 | 期限 | 复查日期 | 状态 |
|---|---|---|---|---|---|---|
| 3 套模具放在地面 | 7 号机旁 | 模具组长 | 归还模具架并补标识 | 10/16 | 10/17 | 未关闭 |

## Tips for best results

- Describe the area's layout and recurring problems.
- Share any customer audit checklist you must match.
- Track closure rate, not just the score.

## Related skills

- `cn-sop-writer` for station standards
- `cn-8d-report` when a finding causes a quality problem
