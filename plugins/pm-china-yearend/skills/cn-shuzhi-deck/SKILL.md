---
name: cn-shuzhi-deck
description: "Use when asked 帮我做述职 PPT, 述职 PPT 大纲, 年终述职怎么讲, 10 分钟述职讲稿, 述职 PPT 每页写什么, or turn a written year-end review into a 述职 presentation. Produces a slide-by-slide 述职 PPT outline with a conclusion-first headline per slide (结论先行), the chart or visual for each, a timed speaking script (讲稿) that fits the slot, a one-slide version for a short slot, and a rehearsal and Q&A checklist. For writing the review itself use cn-year-end-review; for a promotion to the next level use cn-promotion-defence."
version: 1.0.0
---

# 述职 PPT Builder (述职 PPT 大纲与讲稿)

A written 年终总结 and a 述职 presentation are different jobs. The document can hold every result; the presentation has ten or fifteen minutes in front of a leader or a panel who are hearing several people in a row. Slides that copy the document, run over time or bury the main result on slide nine are the common failures. This skill turns the content into a deck outline and a speaking script that fit the slot and lead with what the audience must remember.

Write in Simplified Chinese unless asked otherwise. The skill builds the outline and the script, not the visual design; the person's company template takes priority over the structure below.

## Required Inputs

Ask for these if not provided, otherwise infer and label the assumption:
- **The content**: the written 年终总结 or 述职报告, or notes with results and numbers (if there is none yet, run `cn-year-end-review` first)
- **The slot**: minutes to speak and minutes for questions (for example 10 + 5)
- **The audience**: direct manager, skip-level, a 述职 panel, or the whole team
- **The purpose**: annual rating, a probation review (转正述职), a mid-year review, or a team-lead 述职 covering a team
- **The company template or required sections**, if any
- **Rating context**, if known: the scale and what is at stake

## Output Structure

### 1. 时间预算 (time budget)
| 部分 | 页数 | 时长 | 要点 |
Speaking pace about 200 to 250 Chinese characters a minute; one content slide per 60 to 90 seconds. If the content does not fit, cut slides, never speed up.

### 2. 逐页大纲 (slide-by-slide outline)
For each slide:
- **标题即结论**: the headline states the finding ("会员体系上线，付费用户达到 2 万"), not the topic ("会员项目")
- **主体内容**: three bullets at most, each with a number or an artefact
- **图表建议**: the chart type and what it compares (target against actual, before and after, trend)
- **讲稿**: what to say, with the time in seconds

A typical ten-minute deck:
1. 封面 (name, role, period) and a one-line summary of the year
2. 年度目标完成总览: every goal, target, actual, completion rate, in one table
3. to 5. 重点成果 one to three: STAR, with the business impact
6. 能力成长 or 团队建设 (for a team lead)
7. 不足与改进: one real lesson and what changes
8. 明年规划: goals and how they are measured (for detail, `cn-next-year-plan`)
9. 需要的支持
Appendix slides (备用页) hold data the panel may ask for; they are not presented.

### 3. 一页版 (one-slide version)
For a three-minute slot or a pre-read: the year in one slide, with results, one lesson and next year's focus.

### 4. 彩排清单与问答准备 (rehearsal and Q&A)
- Timed rehearsal twice, aloud
- The first 30 seconds memorised
- Likely questions with short answers, each pointing to an appendix slide
- Missed goals explained before anyone asks

## Quality Checks

- [ ] The deck fits the slot at the stated pace, with the time per slide shown
- [ ] Every content slide headline is a conclusion, not a topic
- [ ] Every goal from the start of the year appears on the overview slide, met or not
- [ ] Every number traces back to the person's content; nothing is invented or rounded up
- [ ] "我" and "团队" are kept distinct
- [ ] The most important result appears in the first three minutes

## Anti-Patterns

- **Pasting the document onto slides.** Dense text slides make the panel read instead of listen.
- **A chronological diary (流水账).** Order by importance, not by month.
- **Saving the best for last.** Panels decide early; lead with the main result.
- **Running over time.** It reads as poor judgement; cut slides instead.
- **Hiding missed goals.** The reviewer already has the list.
- **Jargon instead of results.** "打通链路，形成闭环" says nothing; see `cn-jargon-translator`.

## Example Trigger Phrases

- "下周年终述职，10 分钟讲 5 分钟问答，帮我把年终总结变成 PPT 大纲和讲稿。"
- "转正述职 PPT 每页写什么？"
- "我是带 6 个人的组长，团队述职怎么讲？"
- "述职只有 3 分钟，帮我压缩成一页。"
- "Turn my year-end review into a 述职 deck outline with a speaking script."
