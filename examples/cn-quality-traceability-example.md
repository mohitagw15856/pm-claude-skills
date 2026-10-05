# Example: cn-quality-traceability

## What this skill does

Designs product and batch traceability: target questions and response times, trace units and coding, data to capture at each step, forward and backward trace paths as concrete queries, record retention, a mock recall drill and a phased rollout. Industry rules are marked to confirm.

## How to trigger it

### Example 1: a wiring harness maker without an MES

**You say:**
> "我们做汽车线束，每天 3000 件，现在用纸质流程卡和 ERP，没有 MES。上次客户投诉，我们花了三天才查清影响哪些批次。客户要求追溯到每批原材料。帮我设计追溯方案和召回演练。"

**Claude produces (excerpt):**

**一、追溯目标**
- 给定客户投诉的线束序列号，2 小时内查到所用端子、导线批次和压接设备
- 给定一个可疑导线批次，4 小时内列出所有成品批次和发货客户

**二、编码规则**：产品代码 + 产线 + 日期 + 班次 + 3 位流水号，例如 WH21-L2-20261012-N-037，二维码标签贴在扎带标牌上。

**三、各工序采集数据（节选）**
| 工序 | 采集内容 | 方式 | 记录位置 |
|---|---|---|---|
| 来料 | 供应商批号、检验结果 | 扫码入库 | ERP |
| 切线压接 | 工单号、导线批号、端子批号、压接机编号、拉力测试值 | 流程卡 + 扫码 | Excel，二期接 MES |
| 包装 | 成品序列号与箱号对应 | 扫码 | ERP |

**主要差距**：导线批号与工单没有关联，这是上次花三天的原因。第一阶段在流程卡上增加导线和端子批号栏，并在班后录入。

**六、召回演练**：情景为"导线批次 W-0915 绝缘层不良"，计时开始到列出全部受影响成品和客户，目标 4 小时，每年至少一次。

## Tips for best results

- Describe the process flow and current systems honestly.
- Say how long the last real trace took.
- Confirm industry and customer requirements with your quality team.

## Related skills

- `cn-8d-report` when a complaint arrives
- `cn-sop-writer` to add data capture to work instructions
