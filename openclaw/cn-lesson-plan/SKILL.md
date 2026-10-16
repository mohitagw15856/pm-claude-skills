---
name: cn-lesson-plan
description: "Use when asked 帮我写教案, 写一份新课标教案, 教学设计, 单元教学设计, 大单元教案, or a lesson plan in the format Chinese schools expect. Produces a complete 教案 in Chinese with 教材分析, 学情分析, 教学目标 tied to the subject's 核心素养, 教学重难点, 教学方法, a timed 教学过程 with teacher and student activity, 板书设计, layered 作业设计 within the 双减 time limits, and 教学反思 prompts, with curriculum references marked to confirm against the current 课程标准."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/cn-lesson-plan.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Chinese Lesson Plan (教案 / 教学设计)

Chinese schools expect a lesson plan in a recognisable format: textbook analysis, learner analysis, objectives framed by the subject's core competencies (核心素养), key and difficult points, a timed teaching process, the board design and the homework. Teachers write many of these each term, often for inspection or a lesson-plan check (教案检查). This skill turns a topic and a class into a complete 教案 the teacher can adapt, not a generic template.

Write in Simplified Chinese unless asked otherwise. Curriculum standards are revised; this skill frames objectives in the language of 《义务教育课程方案和课程标准（2022 年版）》 and the 普通高中课程标准 (2017 年版 2020 年修订), but every reference to a standard, a 学业要求 or a textbook unit is marked 需核实: the teacher confirms it against the current standard and the edition of the textbook their school uses. For a general, non-Chinese lesson plan use `lesson-plan` or `teaching-lesson-plan` instead.

## Required Inputs

Ask for these if not provided, otherwise infer and label the assumption:
- **Subject, grade and textbook edition** (for example 人教版 七年级 数学 上册), unit and lesson title
- **Lesson type**: 新授课, 复习课, 习题课, 实验课, 讲评课, or one lesson in a 大单元 sequence
- **Class profile**: size, prior knowledge, common errors last time, any students who need support
- **Time**: usually 40 or 45 minutes; number of lessons for this topic
- **Resources**: multimedia, lab equipment, worksheets, the school's required template if any
- **Purpose**: daily teaching, 教案检查, 公开课 (see `cn-open-class` for the 说课稿), or a competition

## Output Structure

### 一、教材分析
Where the lesson sits in the unit and the year, what came before and what it prepares for, and the textbook's intent for this section. One short paragraph.

### 二、学情分析
What these students already know and can do, the likely misconceptions, and what interests them. Use the teacher's own observations; mark any assumption.

### 三、教学目标（对应学科核心素养，需核实）
Three to four objectives, each observable and checkable by the end of the lesson, and each tagged to the subject's 核心素养 (for example 数学：抽象能力、运算能力、推理能力; 语文：文化自信、语言运用、思维能力、审美创造). Write them as what students will be able to do, not what the teacher will cover.

### 四、教学重点与难点
- **重点**: the core content every student must master
- **难点**: where students usually struggle, and why
- **突破方法**: how this lesson addresses the 难点

### 五、教学方法与准备
Methods (情境导入, 问题驱动, 小组合作, 实验探究, 讲练结合) chosen for this content, with the materials list.

### 六、教学过程（按分钟）
| 环节 | 时间 | 教师活动 | 学生活动 | 设计意图 |
Typical flow: 情境导入 → 新知探究 → 例题精讲或活动 → 巩固练习（分层）→ 课堂小结 → 布置作业. Include the key questions the teacher will ask word for word, expected student answers, and a check for understanding before moving on. Times add up to the lesson length.

### 七、板书设计
A text layout of the board: title, the main structure on the left, examples or student work on the right. Keep it simple enough to copy.

### 八、作业设计（分层，符合双减时长要求，需核实）
- **基础题**: everyone, short
- **提高题**: most students
- **拓展题（选做）**: an open or practical task
Estimate the time for each; keep the total within the school's daily limit (under the 双减 guidance, no written homework in grades 1 and 2, about 60 minutes a day in grades 3 to 6 and about 90 minutes in junior high, across all subjects; confirm the school's own rule).

### 九、教学反思（课后填写）
Three prompts: did students meet each objective and how do I know; where did time go; what I will change next lesson.

## Quality Checks

- [ ] Every objective is observable and tied to a named 核心素养
- [ ] The 重点 and 难点 differ, and the 难点 has a method to address it
- [ ] The process is timed and the times add up to the lesson length
- [ ] Key questions are written out, with a check for understanding
- [ ] Homework is layered and its time is estimated
- [ ] Curriculum and textbook references are marked 需核实

## Anti-Patterns

- **Objectives copied from the teacher's book.** "了解""掌握" with no observable outcome cannot be checked.
- **A process with no student activity column.** The lesson becomes a lecture plan.
- **One homework set for everyone.** Layering is expected and protects time.
- **Quoting the standard from memory as exact.** Confirm the wording against the current 课程标准.
- **A board plan that copies the slides.** The board should show the structure students take away.

## Example Trigger Phrases

- "帮我写一份人教版七年级数学《有理数的加法》新授课教案，45 分钟。"
- "写一份初二语文《背影》的教学设计，要体现核心素养。"
- "大单元教学设计怎么写？我教小学四年级科学。"
- "教案检查要用，帮我把这几行笔记整理成完整教案。"
- "Write a Chinese-format lesson plan for grade 5 English."
