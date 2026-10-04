---
name: cn-next-year-plan
description: "Use when asked 帮我定明年的个人 OKR, 写个人发展计划, IDP 怎么写, 明年目标怎么跟老板对齐, 个人 KPI 怎么定, 年初定目标, or plan next year's personal goals at a Chinese employer. Produces personal OKR or KPI drafts aligned upward to the team's goals with baselines, an individual development plan (个人发展计划) built on the 70-20-10 split, quarterly milestones and check-ins, and a script for the goal-setting conversation with the manager. For team or company OKRs use okr-builder; for reviewing the year just ended use cn-year-end-review."
version: 1.0.0
---

# Next Year's OKR and Development Plan (明年个人 OKR 与个人发展计划)

At the start of the year most people at Chinese companies set personal goals in a form (OKR on Feishu or DingTalk, or a KPI sheet) and many also write a 个人发展计划 (IDP). The goals usually get copied from the manager's list, the KRs cannot be measured, and the development plan says "提升沟通能力" with nothing behind it. A year later these become the yardstick for the 年终总结. This skill drafts personal goals that connect to the team's, can be measured, and pair with a development plan the person can actually follow.

Write in Simplified Chinese unless asked otherwise. Follow the company's form and rating rules where they differ from this structure.

## Required Inputs

Ask for these if not provided, otherwise infer and label the assumption:
- **The team's or manager's goals** for next year (上级 OKR / KPI), or the direction they have stated
- **The person's role and level**, and the level they want next
- **This year's results**, briefly, or the 年终总结 (from `cn-year-end-review`)
- **The system**: OKR (often not tied directly to rating) or KPI (scored), and the scoring scale
- **Development wishes**: skills to build, a promotion target, a move to a new area
- **Constraints**: headcount, budget, known reorganisations

## Output Structure

### 1. 目标对齐图 (alignment)
| 上级目标 | 我的 O | 我的贡献方式 |
Every personal Objective links to a team goal, or is marked as a personal development goal.

### 2. 个人 OKR 或 KPI 草稿
Two or three Objectives at most, each with two to four KRs:
| O | KR | 基线 | 目标值 | 衡量方式 / 数据来源 | 挑战程度 |
- KRs are results, not tasks: "新用户 7 日留存从 32% 提升到 38%" rather than "上线新手引导"
- Each KR has a baseline and a data source; where the baseline is unknown, the first task is to measure it
- For KPI systems: the weight and the scoring rule for each item, and a check that the person can influence it

### 3. 个人发展计划 (IDP)
| 能力 | 为什么（对应目标或晋升要求） | 70% 实践 | 20% 向人学习 | 10% 课程阅读 | 检验方式 | 时间 |
One or two capabilities, each tied to a goal or to the next level's requirements (see `cn-level-mapper` for level expectations), with a concrete project, a named mentor or partner, and a way to show progress.

### 4. 季度里程碑与检查点 (quarterly milestones)
| 季度 | 里程碑 | 检查方式 |
Plus a reminder to log evidence monthly, so the next 年终总结 is written from records.

### 5. 与上级的目标沟通 (the goal-setting conversation)
A short script: the proposed goals, the resources needed, what will be dropped to make room, and the question "到年底什么样的结果算超出预期？". Agree the success definition in writing after the meeting.

## Quality Checks

- [ ] Every Objective links to a team goal or is marked as development
- [ ] Every KR is measurable, with a baseline (or a task to measure it) and a data source
- [ ] No more than three Objectives
- [ ] The IDP names a project, a person and a check, not only a course
- [ ] The plan states what will be stopped or deprioritised
- [ ] No baseline or target number was invented

## Anti-Patterns

- **Tasks dressed as KRs.** "完成 X 功能" is an activity; the KR is what it changes.
- **Copying the manager's goals word for word.** Show the person's own contribution.
- **Ten goals.** Nobody can focus on ten.
- **An IDP that is a reading list.** Most growth comes from work assignments.
- **Setting goals and never looking again.** Quarterly check-ins keep the year-end review honest.
- **Jargon goals** such as "打造闭环、沉淀方法论". See `cn-jargon-translator`.

## Example Trigger Phrases

- "老板的 OKR 是提升付费转化，帮我写我自己的明年 OKR。"
- "明年想从 P6 升 P7，帮我写个人发展计划。"
- "公司用 KPI 考核，帮我定明年 KPI 和权重。"
- "年初目标沟通前，我该怎么跟老板谈？"
- "Help me set next year's personal OKRs and a development plan for my Chinese employer."
