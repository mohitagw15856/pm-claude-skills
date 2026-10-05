# Example: cn-8d-report

## What this skill does

Writes a bilingual 8D report for a customer complaint from D0 to D8: a 5W2H problem statement, dated containment with quantities, occurrence and escape root causes with evidence, verified corrective actions, prevention through PFMEA, control plan and SOP, and closure criteria.

## How to trigger it

### Example 1: sink marks on an injection-moulded clip

**You say:**
> "客户（汽车零部件 Tier 1）投诉我们的注塑卡扣有缩痕导致装配松动，这批 2000 件，在客户产线发现 35 件不良。批次 20261008-A，当时更换过一批原料，夜班保压时间被调低过。客户要求 24 小时内回 D3，五天内完整 8D，中英文。帮我写。"

**Claude produces (excerpt):**

**D2 问题描述 / Problem description**
客户产线在 10 月 10 日装配时发现卡扣（料号 CL-2041，批次 20261008-A）表面缩痕，导致装配松动，2000 件中不良 35 件（1.75%）。规格要求：卡扣配合面无可见缩痕，保持力 ≥ 25 N；实测不良件 18 至 21 N。
Customer found sink marks on clip CL-2041, lot 20261008-A, on 10 October; 35 of 2,000 pcs (1.75%) failed retention force (spec ≥ 25 N, actual 18 to 21 N).

**D3 临时措施 / Containment**
| 位置 | 数量 | 检查方法 | 结果 | 负责人 | 完成日期 |
|---|---|---|---|---|---|
| 客户处 | 1965 | 100% 目检 + 抽检保持力 | 待完成 | 质量部张工 | 10/12 |
| 在途 | 3000 | 拦截返厂全检 | 待完成 | 物流部 | 10/13 |
| 仓库 | 4500 | 100% 目检 | 待完成 | 质量部 | 10/12 |
合格品从批次 20261012 起贴绿色"已检"标签。

**D4 根本原因 / Root cause**
- 发生原因：夜班保压时间由 6 秒被调至 4 秒（已验证：用 4 秒参数复现缩痕）；为何能调：工艺参数无锁定权限。
- 流出原因：首件和巡检只做外观目检，未检保持力（已验证）。

**D5 纠正措施**：注塑机参数加密码锁定，仅工艺工程师可改；新批次原料增加首件保持力测试。不使用"加强培训"作为主要措施。

## Tips for best results

- Give lot numbers, dates and every change around the time.
- Include test data that verifies the cause.
- Attach the customer's template if they have one.

## Related skills

- `rma-failure-analysis` for many field returns across failure modes
- `cn-sop-writer` to update the work instruction in D7
- `cn-quality-traceability` to find every affected lot faster
