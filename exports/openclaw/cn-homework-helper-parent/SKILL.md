---
name: cn-homework-helper-parent
description: "Use when asked 孩子这道题不会怎么教, 辅导作业总发火, 怎么给孩子讲应用题, 陪写作业, 作业太多写到很晚, or help a parent guide (not do) a child's homework in China. Produces, for the specific question, an age-appropriate way to explain it with guiding questions in order, a hint ladder that stops before the answer, a similar practice item, what to do if the child is stuck or upset, and a homework routine, written for the parent in Chinese; it never hands over a finished answer for the child to copy."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/cn-homework-helper-parent.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Homework Guide for Parents (家长辅导作业)

"不写作业母慈子孝，一写作业鸡飞狗跳" is a national joke because it is true. Parents are asked to check and sign homework, often meet methods that differ from how they learned, and end up either shouting or doing the work themselves. This skill helps the parent explain one problem in a way that fits the child's age, with questions that lead the child to the answer, and a routine that makes evenings calmer.

Write for the parent in Simplified Chinese unless asked otherwise. The skill coaches the parent; it does not produce a finished answer for the child to copy, and it uses the method the school teaches where the parent can share it (for example the textbook's way of setting out a word problem). If homework regularly runs far over the school's limit, the skill suggests raising it with the teacher (see `cn-home-school-comms`).

## Required Inputs

Ask for these if not provided, otherwise infer and label the assumption:
- **Child's grade** and subject
- **The exact question** (text or photo), and the child's attempt if any
- **Where the child is stuck**: does not understand the question, does not know the method, made a calculation slip, or refuses
- **How the school teaches it**, if the parent knows (textbook edition, a worked example from class)
- **The evening**: how long homework is taking, the child's mood, the parent's patience level

## Output Structure

### 1. 先弄清楚卡在哪
Two or three quick questions the parent asks the child to find the real gap ("你能用自己的话说说题目在问什么吗？").

### 2. 用孩子听得懂的方式讲
An explanation pitched at the grade: concrete objects or drawing for lower primary (画线段图, 摆小棒), structured reasoning for upper primary and junior high. Uses the school's method where known; notes where the parent's own method (for example algebra for a primary problem) may confuse the child.

### 3. 提示阶梯（不直接给答案）
| 级别 | 家长说的话 |
Three to five hints, each a little more specific, stopping before the answer. The parent moves to the next hint only after a pause.

### 4. 再练一道
One similar question with different numbers or context, so the parent can check the child understood, with the answer for the parent only.

### 5. 孩子卡住或情绪上来时
What to say and do: take a break, praise the effort not the result, mark the question for the teacher, and stop if it is late. A line for the parent to use on themselves when frustrated.

### 6. 作业习惯
A short routine: a fixed time and place, phone away, the child plans the order, the parent checks at the end rather than sitting beside them throughout; adjusted for the grade.

## Quality Checks

- [ ] The explanation matches the child's grade and, where known, the school's method
- [ ] Hints lead to the answer without giving it away
- [ ] A practice item checks understanding
- [ ] Emotional and time limits are addressed
- [ ] The parent, not the child, receives the answer to the practice item
- [ ] No finished homework answer is provided for copying

## Anti-Patterns

- **Doing it for the child.** The homework is feedback for the teacher; a perfect copy hides the gap.
- **Teaching a different method.** It can confuse the child and conflict with class.
- **Explaining louder.** If the child does not understand, change the approach, not the volume.
- **Checking every line as they write.** Let them finish, then review together.
- **Pushing on past bedtime.** Mark it for the teacher and stop.

## Example Trigger Phrases

- "三年级应用题：一共有 48 个苹果，平均分给 6 个小朋友……孩子听不懂，我怎么讲？"
- "一辅导作业就吵架，有什么办法？"
- "初一的有理数减法，我自己都忘了怎么教。"
- "孩子每天作业写到十点，正常吗？"
- "How do I help my child with Chinese primary maths homework without giving the answer?"
