---
name: cn-home-school-comms
description: "Use when asked 怎么给老师发消息, 跟班主任沟通, 孩子在学校被欺负怎么跟老师说, 对老师的做法有意见, 请假怎么写, 家长群里怎么说话, or write a message from a parent to a teacher in China. Produces a ready-to-send WeChat or note message in Chinese, polite and specific, for the situation (asking, leave, a concern, a disagreement, bullying, thanks), a calmer version if the parent is upset, what to say if the teacher calls back, the escalation path if it is not resolved, and 家长群 etiquette."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/cn-home-school-comms.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Home-School Messages (家校沟通)

Most contact between Chinese parents and teachers happens on WeChat, in private messages and in the class group (家长群). Parents worry about sounding rude, about the teacher treating their child differently, or about a message read the wrong way. When there is a real problem (bullying, an unfair punishment, too much homework) they either stay silent or send an angry message at midnight. This skill writes the message that gets the issue solved and keeps the relationship.

Write in Simplified Chinese unless asked otherwise. For a teacher writing to parents, use `parent-communication` instead. Where a child's safety is at risk (injury, bullying, abuse), the skill puts safety and the school's formal procedure first.

## Required Inputs

Ask for these if not provided, otherwise infer and label the assumption:
- **Who**: the 班主任, a subject teacher, or the school; how well the parent knows them
- **Situation**: 请假, a question about homework or grades, the child's mood or a friendship issue, a concern about a teacher's action, bullying, an injury, thanks, a request (seat, health need)
- **Facts**: what happened, when, what the child said, any evidence (photos, messages), what the parent has already done
- **What the parent wants**: information, a meeting, a change, an apology, or just to inform
- **The parent's state**: calm or upset (the skill drafts a cooler version first if upset)
- **Channel**: WeChat private message, phone, a note, or the 家长群

## Output Structure

### 1. 可以直接发的消息
A message of 100 to 200 characters that:
- **Greets and identifies** ("王老师您好，我是三班李明的妈妈。")
- **States the facts** briefly, separating what the child said from what is known
- **Asks one clear thing** (了解情况, 约时间沟通, 请老师关注)
- **Closes politely** and gives a time the parent is free
Sent at a reasonable hour (the skill reminds the parent not to send late at night).

### 2. 如果你现在很生气
A calmer rewrite, and a note on what to remove (accusations, threats, comparisons with other children) and why.

### 3. 老师回电时可以这样说
Three or four lines to open the call, questions to ask, and how to agree next steps ("那我们约定下周五再沟通一次，可以吗？").

### 4. 如果没有解决
A step-by-step escalation path: the 班主任 → 年级组长 → 德育处 or 教务处 → 校长 → the district 教育局 (for example the 12345 hotline where the issue is not resolved at school), with the advice to keep a record at each step. For bullying, the school's 学生欺凌防治 procedure and when to involve the police or a doctor.

### 5. 家长群礼仪
Do not discuss one child's problem in the group, do not flood it with thanks, reply only when asked, and move disagreements to a private message.

## Quality Checks

- [ ] The message is polite, specific and asks for one clear thing
- [ ] What the child said is separated from verified facts
- [ ] There are no threats, accusations or comparisons with other children
- [ ] Safety issues come first and name the formal procedure
- [ ] The escalation path is proportionate and stepwise
- [ ] Private matters are kept out of the 家长群

## Anti-Patterns

- **Messaging in anger.** Draft, wait, then send the calm version.
- **Raising a complaint in the 家长群.** It embarrasses the teacher and other families.
- **Taking the child's account as complete.** Ask the teacher what they saw first.
- **Going straight to the 教育局.** Start with the teacher unless safety requires otherwise.
- **Gifts or red envelopes to get attention.** Many schools ban them; it does not solve the issue.

## Example Trigger Phrases

- "孩子说被同学推倒了，膝盖擦伤，怎么跟班主任说？"
- "老师罚孩子抄写 20 遍，我觉得太多了，怎么提意见不得罪老师？"
- "明天孩子要请假去医院，帮我写一条请假消息。"
- "家长群里有家长指责老师，我该不该说话？"
- "Help me write a polite WeChat message to my child's teacher in Chinese."
