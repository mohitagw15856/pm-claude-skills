---
name: cn-extracurricular-plan
description: "Use when asked 兴趣班怎么选, 孩子报几个兴趣班合适, 课外班规划, 双减后还能报什么班, 寒暑假怎么安排, 预付费培训退费, or plan a child's out-of-school activities in mainland China. Produces a weekly timetable that protects sleep, homework and free play, a choice framework (the child's interest, purpose, cost, travel), a term budget, a check of each class against the 双减 rules on academic training and prepaid fees, contract questions to ask a provider, and a review point to drop what is not working, with rules marked to confirm locally."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/cn-extracurricular-plan.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Extracurricular Planner (兴趣班与课外安排)

After 双减, academic tutoring for school-age children was restricted, and many families moved to sports, arts and science classes, sometimes five or six a week. The result is often a child with no free time, parents driving across the city every evening, and a large prepaid card at a provider that may close. This skill builds a schedule and a budget that fit the child and the family, checks each class against the rules, and sets a point to review.

Write in Simplified Chinese unless asked otherwise. The 双减 framework (the 2021 意见 on reducing homework and off-campus training burdens for compulsory-education students) restricts academic subject training for school-age children, especially on weekends and holidays, and local rules govern prepaid fees and fund supervision. Details and enforcement vary by city and change over time; every rule here is marked 需核实 and should be checked with the local 教育局 or 市场监管 notices. This is planning help, not legal advice.

## Required Inputs

Ask for these if not provided, otherwise infer and label the assumption:
- **Child**: age, grade, interests (what they ask to do, not only what parents want), energy and sleep needs
- **Current week**: school hours, homework time, current classes and their times and places
- **Purpose of each class**: fun, health, a skill, a 特长 for school entry, childcare
- **Budget**: monthly or per term; any prepaid cards already bought
- **Logistics**: who drives, travel time, siblings
- **Season**: term time, 寒假 or 暑假

## Output Structure

### 1. 一周时间表
| 时间 | 周一 | 周二 | 周三 | 周四 | 周五 | 周六 | 周日 |
School, homework, classes, travel, free play and family time, with bedtime protected (the skill uses the national guidance of about 10 hours of sleep for primary pupils and 9 for junior high, 需核实). Flag days that are overloaded.

### 2. 每个兴趣班的评估
| 班 | 孩子喜欢吗 | 目的 | 每月费用 | 路程 | 保留/调整/暂停 |
A short reason for each recommendation; at most one or two new classes at a time.

### 3. 双减合规检查（需核实）
For each class: is it academic subject training (学科类) or non-academic (体育, 文艺, 科技); is the timing allowed for school-age children; is the provider licensed (办学许可证) and listed on the local platform; is the prepaid amount within local limits (many cities cap prepayment at 3 months or a set number of lessons) and under fund supervision (资金监管). Flag anything that looks non-compliant without accusing the provider.

### 4. 学期预算
| 项目 | 每月 | 学期合计 |
Fees, materials, exams or grading (考级) costs, travel. Compare with the budget.

### 5. 签约前要问的问题
Refund policy and how refunds are calculated, what happens if the provider moves or closes, whether payment goes to a supervised account, trial lesson, teacher qualifications, class size. Advice to pay in small instalments and keep the contract and receipts.

### 6. 复盘点
A date (for example after 8 weeks) and three questions to decide whether to continue: does the child still want to go, is there progress, is the family coping.

## Quality Checks

- [ ] Sleep, homework and unstructured time are protected in the timetable
- [ ] Each class has a stated purpose and the child's view is included
- [ ] Every 双减 and prepaid rule is marked 需核实 with where to check
- [ ] The budget covers the whole term including hidden costs
- [ ] Prepayment risk is addressed with specific questions
- [ ] A review date is set

## Anti-Patterns

- **Booking classes because other families do.** Start with the child and the purpose.
- **Large prepaid cards.** Providers close; pay in small amounts within local limits.
- **Filling every evening.** Free play and rest are part of development.
- **Disguised academic tutoring.** A "思维课" that is really school maths may breach local rules and put fees at risk.
- **Never stopping anything.** Review and drop what is not working.

## Example Trigger Phrases

- "孩子二年级，现在报了钢琴、游泳、编程、美术，太多了吗？帮我排一下。"
- "双减以后周末还能上英语课吗？"
- "暑假两个月怎么安排，预算 1 万。"
- "培训机构让一次性交两年学费有优惠，靠谱吗？"
- "Plan my child's after-school activities in China within the double reduction rules."
