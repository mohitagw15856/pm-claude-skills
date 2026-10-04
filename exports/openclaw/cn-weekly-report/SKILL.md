---
name: cn-weekly-report
description: "Write a Chinese workplace weekly or monthly report (周报 / 月报) for a manager: results with numbers, progress against goals, risks raised early, next week's plan and the support needed, in the structure Chinese managers expect. Use when asked 帮我写周报, 写月报, 整理本周工作, weekly report in Chinese, or turn my notes into a 周报. Produces the report in Chinese with 本周完成, 关键数据, 问题与风险, 下周计划 and 需要的支持, plus a one-line summary for chat apps."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/cn-weekly-report.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Chinese Weekly Report (周报)

In many Chinese workplaces the weekly report is how a manager sees your work, and often how they remember it at review time. The common failures are a list of activities with no results, risks hidden until they are problems, and a plan with no dates. This skill turns rough notes into a report that shows outcomes, raises risks early, and asks for help clearly.

Write the output in Simplified Chinese unless the person asks for English or Traditional Chinese.

## What This Skill Produces

- **The report (周报 or 月报)** in the five-part structure below
- **A one-line summary** for WeChat, DingTalk or Feishu, where the report is often shared
- **A risk flag** at the top if something needs the manager's decision this week

## Required Inputs

Ask for these if not provided:
- **This week's notes**: what was done, in any form
- **The goals or OKR / KPI** the work serves, if the team uses them
- **Last week's plan**, so progress can be compared
- **The reader**: direct manager, skip-level, or a cross-team group
- **The team's template**, if one exists; follow it over this structure

## Framework

1. **本周完成 (done this week)**: outcomes, not activities. "完成支付页改版上线，转化率从 3.1% 提升到 3.6%" rather than "做了支付页". Link each item to a goal.
2. **关键数据 (key numbers)**: the two to four metrics the manager tracks, with last week's figure for comparison.
3. **问题与风险 (issues and risks)**: each with impact, the proposed solution, and the decision needed. Raise it now, not next week.
4. **下周计划 (next week)**: each item with an owner and a date. Mark carry-overs from last week honestly.
5. **需要的支持 (support needed)**: specific asks, with who and by when.

Style:
- Short lines, numbered items, numbers wherever the person has them.
- Lead with the most important item, not the first thing done.
- Use plain business Chinese. Avoid filler such as "持续推进中" without a result or a date.

## Output Format

### 周报：[姓名]｜[日期范围]

**⚠️ 需要决策**（如有）：[一句话]

**一、本周完成**
1. [成果]（对应目标：[目标]）

**二、关键数据**
| 指标 | 本周 | 上周 | 变化 |

**三、问题与风险**
| 问题 | 影响 | 建议方案 | 需要谁决策 |

**四、下周计划**
| 事项 | 负责人 | 完成时间 | 备注（顺延 / 新增） |

**五、需要的支持**
- [具体请求，找谁，何时之前]

**一句话版本**（用于群聊）：[...]

## Quality Checks
- [ ] Every 本周完成 item states a result, and a number where the person gave one
- [ ] Every risk has an impact, a proposal and a named decision-maker
- [ ] Every 下周计划 item has an owner and a date
- [ ] Carry-overs from last week are marked as 顺延
- [ ] No number appears that the person did not provide

## Anti-Patterns
- **流水账 (a diary of activities).** Managers read results.
- **Hiding a slipping item** until it is late. A risk raised early is a plan; raised late, it is a surprise.
- **Vague plans.** "推进 A 项目" with no date commits to nothing.
- **Inflating numbers** to look busy. Weekly figures are easy to check.

## Example Trigger Phrases
- "帮我把这些笔记整理成周报。"
- "写一份给老板的月报，突出数据。"
- "本周工作有点乱，帮我写周报，下周有个风险要提。"
- "Write my weekly report in Chinese for my manager."
