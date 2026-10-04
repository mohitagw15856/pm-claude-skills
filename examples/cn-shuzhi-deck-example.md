# Example: cn-shuzhi-deck

## What this skill does

Turns a written year-end review, or notes with results, into a slide-by-slide 述职 PPT outline with conclusion-first headlines, chart suggestions and a timed speaking script that fits the slot.

## How to trigger it

### Example 1: a ten-minute annual 述职

**You say:**
> "下周年终述职，10 分钟讲 5 分钟问答，听众是部门总监。今年 OKR：留存从 32% 到 38%（实际 36%），上线会员体系（付费用户 2 万），带了两个新人。帮我做述职 PPT 大纲和讲稿。"

**Claude produces (excerpt):**

**时间预算**

| 部分 | 页数 | 时长 | 要点 |
|---|---|---|---|
| 开场与总览 | 2 | 2 分钟 | 一句话总结全年，目标完成表 |
| 重点成果 | 3 | 5 分钟 | 会员体系、留存、带新人 |
| 不足、规划、支持 | 3 | 3 分钟 | 留存差距的原因与明年计划 |

**第 2 页 标题：三项目标完成两项，留存提升 4 个百分点但未达 38%**
- 主体：目标完成表（目标、实际、完成率、证据）
- 图表：目标与实际的条形对比图
- 讲稿（60 秒）："今年我负责三项目标。会员体系按期上线，付费用户 2 万；两位新人都已独立负责模块。留存从 32% 提升到 36%，距离 38% 还差 2 个点，原因我在第 7 页说明……"

**第 3 页 标题：会员体系上线三个月，付费用户达到 2 万**
- 图表：付费用户月度趋势折线图
- 讲稿（90 秒）：背景、我的角色、结果、对业务的影响

**备用页：** 留存分渠道数据、会员转化漏斗（不主动讲，被问时展示）

**一页版：** 三项目标、两项完成；会员付费用户 2 万；留存差距的一条教训；明年聚焦付费转化。

## Tips for best results

- Bring the written review if you have one; the deck is built from it.
- Give the exact slot length and who is in the room.
- Rehearse aloud with a timer; cut slides rather than speak faster.

## Related skills

- `cn-year-end-review` to write the review first
- `cn-promotion-defence` for a promotion panel
- `cn-next-year-plan` for the 明年规划 slide in detail
