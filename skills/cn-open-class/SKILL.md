---
name: cn-open-class
description: "Use when asked 公开课怎么准备, 帮我写说课稿, 优质课比赛, 评优课, 教研课, 汇报课, 青年教师赛课, 试讲, or prepare an observed lesson in a Chinese school. Produces a 公开课 preparation pack in Chinese: a 说课稿 (说教材, 说学情, 说教学目标, 说重难点, 说教法学法, 说教学过程, 说板书) timed to the required length, the lesson's highlights (亮点) and how observers will see them, a rehearsal and 磨课 plan, contingency plans, and answers to likely 评课 questions."
version: 1.0.0
---

# Open Class and Lesson Talk (公开课准备与说课稿)

公开课, 优质课 competitions and 教研课 are how teachers are seen by colleagues, the 教研组 and sometimes the district. They come with two linked tasks: teaching a lesson in front of observers, and the 说课, a short talk explaining the design and the reasons behind it. This skill prepares both, and the rehearsals in between.

Write in Simplified Chinese unless asked otherwise. Competition rules (length of the 说课, whether slides are allowed, scoring criteria) vary by district and event; the pack is built to the rules the teacher provides, and anything assumed is marked 需核实. For the full lesson plan itself, use `cn-lesson-plan` first and build from it.

## Required Inputs

Ask for these if not provided, otherwise infer and label the assumption:
- **Subject, grade, textbook edition and lesson**
- **Occasion**: 校内公开课, 区级优质课, 教研课, 汇报课, 招聘试讲, 无生上课
- **Rules**: 说课 length (often 10 to 15 minutes), lesson length, slides allowed, scoring criteria
- **The lesson design** (or a draft 教案), and what the teacher wants to show (a method, a 核心素养 focus, 大单元 design, technology use)
- **Class**: their own class or a borrowed one (借班上课), and how well the teacher knows them
- **Timeline**: days until the class, and how many rehearsals are possible

## Output Structure

### 1. 说课稿（按规定时长，标注分钟）
- **说教材**: the lesson's place in the unit and the curriculum standard (需核实)
- **说学情**: what students know and where they struggle
- **说教学目标**: tied to the subject's 核心素养
- **说教学重难点**: and how the design addresses the 难点
- **说教法学法**: the methods and why they suit this content and these students
- **说教学过程**: each stage with its design intent (设计意图), not just the steps
- **说板书设计**: the board and what it shows
- **说教学反思或特色**: one or two honest points
Written to be spoken: short sentences, signposts ("接下来我说一说…"), and timings that add up.

### 2. 本课亮点
Two or three highlights and the moment in the lesson where observers will see each one. A highlight must be visible in student activity, not only in the slides.

### 3. 磨课计划
| 轮次 | 日期 | 形式 | 关注点 | 请谁听 |
At least two rehearsals: one with colleagues to test timing and questions, one full run. After each, a short list of what changed.

### 4. 应急预案
What to do if students are silent, the technology fails, an activity runs over, or a student gives an unexpected answer; for 借班上课, a short warm-up to build rapport.

### 5. 评课可能的问题与回应
Five likely questions from the 评委 or 教研组 (why this method, how you know students met the objective, what you would change) with honest answers.

## Quality Checks

- [ ] The 说课 fits the required time, with timings marked
- [ ] 说教学过程 gives the design intent for each stage, not only the steps
- [ ] Each highlight is visible in student activity
- [ ] There is a rehearsal plan with dates and at least two runs
- [ ] Contingencies cover silence, technology and timing
- [ ] Competition rules and standard references are marked to confirm

## Anti-Patterns

- **A performance lesson.** Rehearsing answers with students beforehand is obvious to observers and unfair to the class.
- **Slides doing the teaching.** Observers look for student thinking, not animations.
- **A 说课 that repeats the 教案.** It should explain why, not only what.
- **Too many activities.** Observed lessons run long; plan for less.
- **Ignoring the scoring criteria.** Build to them, honestly.

## Example Trigger Phrases

- "下周区里优质课比赛，初一英语，帮我写 15 分钟说课稿。"
- "公开课怎么准备？我是新老师，第一次上校级公开课。"
- "借班上课，课前怎么跟学生快速熟悉？"
- "评课老师可能会问什么？帮我准备回答。"
- "Help me prepare an observed lesson and lesson talk for a Chinese school competition."
