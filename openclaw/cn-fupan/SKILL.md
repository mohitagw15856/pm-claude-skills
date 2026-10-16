---
name: cn-fupan
description: "Run a 复盘 (fupan), the structured project review widely used in Chinese companies: review the goal, assess the result, analyse why, and draw rules for next time, with a blame-free tone and owned actions. Use when asked 帮我做复盘, 项目复盘, 活动复盘, 复盘会怎么开, or a fupan or retrospective in Chinese. Produces the 复盘 document in Chinese with goal versus result, root causes split into controllable and uncontrollable, lessons stated as reusable rules, and an action list with owners and dates, plus a meeting agenda."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/cn-fupan.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# 复盘 (Fupan)

复盘 comes from Go players replaying a game to learn from it. In Chinese companies it is the standard way to review a project, a campaign or a launch, whatever the outcome. Its four steps are well known: 回顾目标, 评估结果, 分析原因, 总结规律. The value is in the last step, turning one experience into a rule the team can reuse. This skill runs all four and keeps the tone blame-free.

Write the output in Simplified Chinese unless asked otherwise. For an incident postmortem, see `incident-postmortem`; for a sprint retrospective, see `retro-analysis`.

## What This Skill Produces

- **The 复盘 document** in the four standard steps
- **Root causes**, split into controllable and uncontrollable
- **Lessons as rules**: each stated so the team can apply it next time
- **Actions** with owners and dates
- **A meeting agenda** if the 复盘 is held as a group session

## Required Inputs

Ask for these if not provided:
- **What is being reviewed**: project, campaign, launch, quarter
- **The original goal**, with the numbers set at the start
- **The actual result**, with the same numbers
- **The timeline and key decisions**
- **Who took part**, and whether this is for a group meeting or an individual review

## Framework

1. **回顾目标 (review the goal)**: what was the goal, exactly, and how was success defined at the time? If the goal was vague, say so; that is itself a finding.
2. **评估结果 (assess the result)**: actual against target, metric by metric. Highlights (亮点) and shortfalls (不足), both with evidence.
3. **分析原因 (analyse why)**: for each big gap or success, ask "why" until reaching a cause the team could act on. Split into:
   - **主观 / 可控**: decisions, process, preparation
   - **客观 / 不可控**: market, policy, external events. Name them, then move on; dwelling here teaches nothing.
4. **总结规律 (draw the rules)**: each lesson as a rule: "当 [situation] 时，应该 [action]，因为 [reason]". A good rule would change a future decision.
5. **行动计划**: what changes now, with an owner and a date.

Tone: discuss decisions and systems, not people. "评审环节缺少数据验证" rather than "某某没有看数据".

## Output Format

### 复盘：[项目 / 活动名称]｜[日期]

**一、回顾目标**
| 目标 | 当初的衡量标准 | 目标值 |

**二、评估结果**
| 指标 | 目标值 | 实际值 | 完成率 | 说明 |
- 亮点：...
- 不足：...

**三、分析原因**
| 现象 | 根本原因 | 主观可控 / 客观不可控 |

**四、总结规律**
1. 当 [情况] 时，应该 [做法]，因为 [原因]。

**五、行动计划**
| 行动 | 负责人 | 完成时间 |

**附：复盘会议议程**（如需要，60 分钟）

## Quality Checks
- [ ] The original goal is stated with its original numbers
- [ ] Every large gap has a root cause that is actionable
- [ ] Controllable and uncontrollable causes are separated
- [ ] Every lesson is phrased as a reusable rule
- [ ] Every action has an owner and a date
- [ ] No individual is blamed by name

## Anti-Patterns
- **只复盘失败.** Successes hide lessons too; review them the same way.
- **Stopping at "客观原因".** If every cause is external, the team learns nothing.
- **Lessons as slogans** ("加强沟通"). A rule says when and what to do.
- **Blame.** It ends honest discussion at the next 复盘.

## Example Trigger Phrases
- "帮我做一下双十一活动的复盘。"
- "项目延期了，帮我写复盘报告。"
- "复盘会怎么开？给我一个议程。"
- "Run a fupan on our product launch, in Chinese."
