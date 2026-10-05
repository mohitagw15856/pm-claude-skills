---
name: cn-term-comments
description: "Use when asked 帮我写期末评语, 学生评语, 班主任评语, 综合素质评价评语, 素质报告单评语, or write end-of-term comments for a class in China. Produces individual comments in Chinese, warm and specific to each student, in the second person, built from the teacher's notes: a real strength with an example, one growth area framed as a next step, and encouragement, with no labels, no comparison between students and no repeated stock phrases across the class."
version: 1.0.0
---

# End-of-Term Comments (期末评语)

Every term a 班主任 writes forty or fifty comments for the 素质报告单 or the 综合素质评价, usually in one evening. The result is often the same three sentences with the name changed, or worse, labels that stay with a child ("调皮", "反应慢"). Parents and students read these closely. This skill turns a few notes per student into comments that sound like the teacher knows the child.

Write in Simplified Chinese unless asked otherwise. Comments in an official 综合素质评价 system may have a length limit or required fields; follow the school's format (需核实).

## Required Inputs

Ask for these if not provided, otherwise infer and label the assumption:
- **Grade and term**, and where the comment goes (素质报告单, 综合素质评价, 家长会, a personal note)
- **Length** per comment (for example 80 to 150 characters) and voice (second person "你" is standard)
- **For each student** (a name or initial and a few notes): one thing they did well with an example, one area to grow, interests, any change during the term
- **Tone**: warm and plain; poetic openings only if the teacher wants them
- **Anything to avoid**: family circumstances, health, behaviour handled privately

## Output Structure

### 1. 每位学生的评语
For each student, a comment that:
- **Opens with a specific moment or strength** ("运动会上你主动给同学递水" is better than "你热爱集体")
- **Names one growth area as a next step**, in hopeful language ("如果下学期每天坚持读 20 分钟课外书，你的作文会更有内容"), never a label
- **Ends with encouragement** tied to that child
Use the second person, keep within the length, and vary sentence patterns across the class.

### 2. 措辞替换表
| 不建议 | 建议 |
Labels and their alternatives, for example 调皮 → 精力充沛，下学期试着把精力用在…; 内向 → 安静认真，期待在课堂上听到你的声音; 粗心 → 做完后检查一遍会更好.

### 3. 自查清单
Duplicates flagged: any sentence used for more than two students, and any student whose comment has no specific example (ask the teacher for one).

## Quality Checks

- [ ] Each comment has a specific example the teacher supplied
- [ ] Growth areas are phrased as next steps, not labels or judgements
- [ ] No comparison with other students and no mention of rank or score position
- [ ] No sensitive information (family, health, private discipline)
- [ ] No stock sentence repeats across more than two students
- [ ] Length and format match the school's requirement

## Anti-Patterns

- **Labels.** "调皮""懒""笨" follow a child; describe behaviour and a next step.
- **The same comment with a new name.** Parents compare comments; generic praise reads as indifference.
- **Inventing examples.** If the notes have none, ask; do not make up a story.
- **Grades in the comment.** The score is elsewhere; the comment is about the person.
- **Flowery openings with no content.** "你像一颗星星" without a real detail is empty.

## Example Trigger Phrases

- "帮我写 45 个四年级学生的期末评语，每人 100 字左右，我给你每个人的关键词。"
- "这个孩子上课爱说话但很热心，评语怎么写不伤他？"
- "综合素质评价里的班主任评语怎么写？"
- "把这些评语改得不那么千篇一律。"
- "Write end-of-term report comments in Chinese for my class."
