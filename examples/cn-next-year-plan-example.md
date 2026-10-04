# Example: cn-next-year-plan

## What this skill does

Drafts personal OKRs or KPIs for next year that link to the team's goals, an individual development plan (个人发展计划) on the 70-20-10 split, quarterly milestones, and a script for agreeing the goals with the manager.

## How to trigger it

### Example 1: a product manager aiming for promotion

**You say:**
> "老板明年的 OKR 是付费转化率从 4% 提升到 6%，我是负责会员页的 P6 产品经理，想两年内升 P7。帮我写明年个人 OKR 和个人发展计划，再给一个跟老板谈目标的话术。"

**Claude produces (excerpt):**

**目标对齐**
| 上级目标 | 我的 O | 我的贡献方式 |
|---|---|---|
| 付费转化率 4% 到 6% | O1：让会员页成为付费转化的主要入口 | 会员页改版与实验 |
| （发展目标） | O2：具备独立负责一条业务线的能力 | 主导一个跨团队项目 |

**个人 OKR 草稿**
| O | KR | 基线 | 目标值 | 数据来源 |
|---|---|---|---|---|
| O1 | 会员页访问到付费转化率 | 2.8%（请核实） | 3.8% | 数据看板 |
| O1 | 完成至少 6 个 A/B 实验，3 个全量上线 | 0 | 6 / 3 | 实验平台 |
| O2 | 主导"续费提醒"项目上线，覆盖全部会员 | 未开始 | Q3 上线 | 项目记录 |

**个人发展计划**
| 能力 | 为什么 | 70% 实践 | 20% 向人学习 | 10% 课程阅读 | 检验方式 |
|---|---|---|---|---|---|
| 业务分析与决策 | P7 要求独立定义问题 | 负责续费项目全流程 | 每月与数据负责人复盘一次 | 一门实验设计课程 | Q4 项目复盘获上级认可 |

**和老板谈目标的话术：**
> "这是我对明年的目标草稿，O1 直接支撑转化率目标。要做到 3.8%，我需要一名前端支持实验。为了腾出时间，我建议把会员积分改版延后到下半年。您觉得到年底什么样的结果算超出预期？"

## Tips for best results

- Bring the manager's goals, even in rough form.
- Say whether the company scores KPIs or uses OKRs for direction.
- Log evidence monthly so the year-end review writes itself.

## Related skills

- `okr-builder` for team or company OKRs
- `cn-year-end-review` for the year just ended
- `cn-level-mapper` for what the next level expects
