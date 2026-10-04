---
name: cn-civil-exam-essay
description: "Practise the essay paper (申论) of the Chinese civil service examination (国考 / 省考): work a question from the given materials (给定资料), find the scoring points (要点), draft an answer in the expected format, and mark it the way examiners do. Use when asked 申论怎么写, 帮我批改申论, 归纳概括题怎么答, 申论大作文, 公文写作题, or practise the shenlun paper. Produces a question-type diagnosis, the points extracted from the materials with their source paragraphs, a model answer within the word limit, a marking of the person's own answer against the points, and a practice plan."
version: 1.0.0
---

# Civil Service Essay (申论)

申论 is the written paper of the Chinese civil service examination. It is not free writing: candidates read a set of given materials and answer questions whose marks come mainly from finding and organising the right points from those materials. Candidates lose marks by writing opinions the materials do not support, missing points, or overrunning the word limit. This skill teaches the method on real practice questions and marks answers against the points.

Write in Simplified Chinese. This skill is a study aid; it does not predict exam questions or guarantee a score, and official materials from the examining authority take precedence.

## What This Skill Produces

- **Question-type diagnosis**: which of the common types the question is, and what that type rewards
- **Points from the materials (要点)**: each with the paragraph it comes from
- **A model answer** in the expected format and within the word limit
- **Marking of the person's answer**: points hit, missed and unsupported, with a rough score band
- **A practice plan** for the weak question types

## Required Inputs

Ask for these if not provided:
- **The question** and its **word limit**
- **The given materials** (给定资料), or the relevant paragraphs
- **The person's own answer**, if they want it marked
- **Exam level**: 国考 (副省级 or 地市级) or a provincial exam, since emphasis differs
- **Time left** before the exam, for the practice plan

## Framework

1. **Identify the type.** The common types are 归纳概括 (summarise), 综合分析 (analyse a view, a phenomenon or a term), 提出对策 (propose measures), 贯彻执行 (practical writing such as a speech, notice or report) and 文章写作 (the long essay). Each has its own structure.
2. **Read the question for its limits.** Who is writing, to whom, about what, and in how many words. A 贯彻执行 question names a document type; the format is part of the marks.
3. **Extract the points.** Go paragraph by paragraph, take the phrases that answer the question, merge duplicates, and keep the materials' own wording where it is precise. Note the source paragraph for each.
4. **Organise, then write.** Group points under clear headings or numbered items. For the long essay: a clear thesis (总论点), three sub-arguments (分论点) drawn from the materials, examples, and a conclusion that returns to the thesis.
5. **Mark against the points.** Score by points found, accuracy of wording, structure and language; deduct for unsupported opinion and for exceeding the word limit.

## Output Format

### 题型判断
[题型]：这类题主要考查 [...]，答题结构是 [...]

### 要点提取
| 序号 | 要点 | 来源（资料第几段） |

### 参考答案（[字数] 字以内）
[答案]

### 批改（如提供了作答）
| 要点 | 是否答到 | 说明 |
- 无依据的观点：[...]
- 字数：[实际字数] / [限制]
- 大致档次：一类 / 二类 / 三类 / 四类，理由：[...]

### 练习建议
[薄弱题型、每周练习安排、复盘方法]

## Quality Checks

- [ ] The question type is named and its structure stated
- [ ] Every point cites the paragraph of the materials it comes from
- [ ] The model answer stays within the word limit
- [ ] No point in the model answer lacks support in the materials
- [ ] For 贯彻执行 questions, the named document format is followed
- [ ] The score band is labelled a rough estimate

## Anti-Patterns

- **Writing from general knowledge.** Marks come from the materials.
- **Copying whole sentences.** Extract and condense; long quotes waste the word limit.
- **Ignoring the writer's identity** in a 贯彻执行 question. A speech by a 街道干部 and a report to leadership read differently.
- **Promising a score.** Marking standards vary by exam and year.

## Example Trigger Phrases

- "帮我批改这道申论归纳概括题，资料和我的答案都在这里。"
- "申论大作文怎么搭框架？用这份资料练一篇。"
- "这道贯彻执行题要写倡议书，格式是什么？"
- "Help me practise the shenlun paper for the national civil service exam."
