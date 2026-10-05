# Example: cn-extracurricular-plan

## What this skill does

Builds a week that protects sleep, homework and free play, evaluates each class by the child's interest, purpose, cost and travel, checks classes and prepaid fees against the 双减 rules (marked to confirm), and sets a review date.

## How to trigger it

### Example 1: five classes and a late bedtime

**You say:**
> "女儿二年级，现在每周有钢琴、游泳、编程、美术、英语外教五个班，晚上常常九点半才睡。预算每月 3000 元。帮我重新排一下，并检查这些班在双减下有没有问题，机构让一次性交一年学费要不要交？"

**Claude produces (excerpt):**

**二、每个兴趣班的评估**
| 班 | 孩子喜欢吗 | 目的 | 每月费用 | 路程 | 建议 |
|---|---|---|---|---|---|
| 钢琴 | 喜欢 | 爱好 | 800 | 10 分钟 | 保留 |
| 游泳 | 很喜欢 | 健康、安全技能 | 600 | 20 分钟 | 保留 |
| 编程 | 一般 | 家长希望 | 700 | 35 分钟 | 学期末暂停 |
| 美术 | 喜欢 | 爱好 | 500 | 10 分钟 | 保留 |
| 英语外教 | 一般 | 英语 | 900 | 30 分钟 | 调整，见下 |

**三、双减合规检查（需核实）**
- 英语外教课如按学校英语内容授课，可能属于学科类培训，义务教育阶段学生在周末和节假日上此类课程受到限制。请向当地教育局核实机构资质和上课时间是否合规。
- 一次性交一年学费：很多城市规定预收费不得超过 3 个月或一定课时，并要求资金监管。建议不要一次交一年。

**一周安排**：周三、周五晚上不排课，保证 21 点前上床（小学生约 10 小时睡眠，需核实）。总费用调整后每月 2700 元，在预算内。

**复盘点**：8 周后问三个问题：她还想去吗？有进步吗？全家吃得消吗？

## Tips for best results

- Include what the child says about each class.
- Give travel times and who drives.
- Bring any contract before paying a large prepaid amount.

## Related skills

- `cn-homework-helper-parent` for the homework part of the evening
- `cn-school-entry` if a class is meant for school entry
