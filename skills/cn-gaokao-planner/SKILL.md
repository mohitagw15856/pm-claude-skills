---
name: cn-gaokao-planner
description: "Help a student and family plan university applications after the 高考 (gaokao): use the student's provincial rank rather than raw score, build a 冲 / 稳 / 保 (reach, match, safe) list from official historical admission data, check subject requirements under the new gaokao, and weigh major against university. Use when asked 帮我填高考志愿, 志愿怎么填, 冲稳保怎么排, 这个分数能上什么学校, or plan gaokao applications. Produces a structured application list with the reasoning for each choice, a risk check of the whole list, and the questions to settle as a family. Never guarantees admission."
version: 1.0.0
---

# Gaokao Application Planner (高考志愿)

Choosing universities after the gaokao is one of the biggest decisions a Chinese family makes, under time pressure and with a lot of paid advice of mixed quality. The method that works is well understood: plan by provincial rank, not score; build a list of reach, match and safe choices from official data; check subject requirements; and decide between a better university and a preferred major on purpose. This skill applies that method with the family's data.

Write the output in Simplified Chinese unless asked otherwise.

## What This Skill Produces

- **The student's position**: rank, the comparable rank in previous years, and what it means
- **A 冲 / 稳 / 保 list**: each choice with past admission ranks, the margin, and the reason
- **A subject-requirement check** under the province's gaokao model
- **A risk check** of the whole list: gaps, clustering, adjustment (调剂) exposure
- **Family questions**: the trade-offs to settle before submitting

## Required Inputs

Ask for these if not provided:
- **Province**, year, and the gaokao model there (traditional, 3+3, or 3+1+2)
- **Score and provincial rank (位次)**, and the subjects taken
- **Batch** and the number of choices allowed in that province
- **Preferences**: majors, cities, distance from home, cost, public versus private, postgraduate plans
- **Historical admission data**: from the provincial education examination authority's official publications or the university's admissions site. If the family has none, say what to download, and do not invent numbers

## Framework

1. **Use rank, not score.** Scores move with paper difficulty; ranks are comparable across years. Convert the student's rank to the equivalent score in each of the last three years using the official 一分一段表.
2. **Read past data by rank.** For each candidate university and major group, list the lowest admitted rank in each of the last three years.
3. **Band the choices:**
   - **冲 (reach)**: past lowest rank slightly better than the student's
   - **稳 (match)**: past lowest rank close to the student's
   - **保 (safe)**: past lowest rank clearly below the student's, in every recent year
   A typical spread is about a fifth reach, half match, the rest safe; adjust to the number of choices allowed.
4. **Check requirements**: required subjects, physical requirements for some majors, single-subject score thresholds, language for foreign-language majors.
5. **Adjustment (服从调剂)**: explain the risk of being moved to an unwanted major, and of being rejected (退档) if adjustment is refused.
6. **University or major**: make the family decide on purpose which matters more, and order choices accordingly.

## Output Format

### 高考志愿规划：[省份] [年份]，位次 [位次]

**一、位次分析**：等效分数（近三年）与含义

**二、志愿表**
| 序号 | 类别 冲/稳/保 | 院校 / 专业组 | 近三年最低位次 | 与本人位次差 | 选科要求 | 理由 |

**三、整体风险检查**：梯度是否合理、是否扎堆、调剂风险

**四、家庭需要商量的问题**

End verbatim: *"以上为基于历史数据的规划建议，不保证录取。请以省教育考试院和高校当年公布的招生计划与政策为准，并在截止前核对所有信息。"*

## Quality Checks
- [ ] Planning uses rank, with past ranks from official sources named
- [ ] Every choice has three years of data or is flagged as having less
- [ ] Safe choices are safe in every recent year, not on average
- [ ] Subject requirements are checked for every choice
- [ ] No admission is promised; the disclaimer appears verbatim

## Anti-Patterns
- **Planning by raw score.**
- **Inventing admission data.** Every rank comes from an official source the family can check.
- **A list with no safe choices**, or all choices clustered in one band.
- **Ignoring adjustment risk.** It decides outcomes for many students.
- **Promising admission.** No one can.

## Example Trigger Phrases
- "我在河南，今年考了 610 分，位次 2 万左右，帮我填志愿。"
- "冲稳保怎么排比较合理？"
- "想学计算机，选好学校还是好专业？"
- "Help us plan gaokao university applications."
