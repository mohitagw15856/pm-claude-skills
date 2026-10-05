---
name: cn-parent-meeting
description: "Use when asked 帮我写家长会发言稿, 家长会PPT大纲, 班主任家长会讲话, 期中家长会, 新生家长会, 毕业班家长会, or prepare a parent meeting as a Chinese teacher. Produces a parent-meeting pack in Chinese: an agenda, a timed speech for the 班主任 or subject teacher with class data presented without ranking individual students, a slide outline, specific requests to parents, a one-page handout, answers to likely questions, and a follow-up message for the parents' WeChat group."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/cn-parent-meeting.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Parent Meeting Pack (家长会发言稿与材料)

A 家长会 is often the only time a teacher speaks to every family at once. Parents come anxious about grades; the teacher has twenty minutes to show the class is in good hands, give a fair picture of progress, and ask for specific help at home. The common failures are reading out rankings, a long list of complaints, and vague requests like "请家长多配合". This skill prepares the whole meeting.

Write in Simplified Chinese unless asked otherwise. Under the 双减 guidance and many local rules, schools should not publish or rank individual students' scores; the pack presents class-level data and leaves individual results for private conversations. Confirm the school's own rules (需核实).

## Required Inputs

Ask for these if not provided, otherwise infer and label the assumption:
- **Role**: 班主任 or subject teacher; grade; class size
- **Meeting type**: 新生家长会, 期中, 期末, 毕业班 (中考 or 高考 year), or a special topic
- **Time available** and whether other teachers speak too
- **Class data**: averages or distributions by subject, trends, attendance, activities and achievements (no names in rankings)
- **Concerns**: homework completion, phone use, sleep, reading, safety, anything specific to this class
- **Format**: in person, online, or both; whether slides are used

## Output Structure

### 1. 会议议程
| 时间 | 内容 | 发言人 |
Including arrival, the teacher's talk, subject teachers, Q&A and individual conversations.

### 2. 发言稿（按分钟标注）
- **开场 (1 to 2 minutes)**: thanks, and one concrete good moment from the class
- **班级整体情况**: class-level data, trends and what is going well, with examples of effort, not just scores
- **需要关注的问题**: two or three issues, each with what school is doing about it
- **请家长配合的具体事项**: three requests, each specific and doable (for example 每天睡前 20 分钟亲子阅读, 作业时手机放在客厅), not "多关心孩子"
- **后续安排**: key dates, exams, activities
- **结尾**: a sincere closing line
Mark where to pause for slides. Keep the tone warm and respectful; parents are partners, not subordinates.

### 3. PPT 大纲
Slide by slide, one idea per slide, with photos of class life suggested where allowed.

### 4. 家长手册（一页）
Key dates, the class's contact rules (when and how to reach the teacher), homework expectations, and the three requests.

### 5. 家长可能问的问题与回答
Five to eight likely questions (分班, 排名, 补课, 作业量, 手机, 升学) with calm, accurate answers, and which questions to take offline.

### 6. 会后群消息
A short message for the 家长群 summarising the meeting, without any individual student's information.

## Quality Checks

- [ ] No individual student is named in rankings or criticism
- [ ] Data is class-level and paired with what the school is doing
- [ ] Every request to parents is specific and doable at home
- [ ] The speech fits the time, with timings marked
- [ ] Likely questions have prepared answers
- [ ] Ranking and publication rules are marked to confirm with the school

## Anti-Patterns

- **Reading out rankings.** It humiliates families and may breach the school's rules.
- **A list of complaints.** Parents leave defensive, not motivated.
- **"请家长多配合".** Say exactly what you need.
- **Discussing one child in front of everyone.** Save it for a private talk.
- **Running over time.** Parents have taken time off work; respect it.

## Example Trigger Phrases

- "帮我写一份初三上学期期中家长会班主任发言稿，20 分钟。"
- "一年级新生家长会，我要讲些什么？"
- "家长会 PPT 大纲和会后发在家长群的通知。"
- "家长会上家长问为什么不公布排名，怎么回答？"
- "Prepare a parent meeting speech for a Chinese secondary class."
