---
name: cn-5s-audit
description: "Use when asked 5S 检查表, 6S 管理, 现场管理检查, 5S 评分标准, 车间 6S 稽核, 做一份 5S 推行计划, or design a 5S or 6S audit for a workshop, warehouse or office in a Chinese factory. Produces an audit checklist for the area with scored criteria for 整理, 整顿, 清扫, 清洁, 素养 (and 安全 for 6S), a scoring guide with photo evidence rules, a results summary and red-tag list, a corrective-action tracker with owners and dates, and an audit rota, in Chinese."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/cn-5s-audit.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# 5S / 6S Audit (5S / 6S 检查表)

5S (and 6S, which adds safety) is the base of shop-floor management in Chinese factories, and the audit is how it is kept alive. Too many checklists are generic, scored by mood, and end in a ranking poster with no follow-up. This skill builds a checklist for the actual area, with criteria an auditor can score consistently, and a tracker that turns findings into fixes.

Write in Simplified Chinese unless asked otherwise. Safety items in 6S support but do not replace the plant's legal safety obligations and risk assessments under the 安全生产法 and local rules (需核实); serious hazards found in an audit go to the safety officer immediately, not into next week's score.

## Required Inputs

Ask for these if not provided, otherwise infer and label the assumption:
- **Area**: machining, assembly, injection moulding, warehouse, lab, office, canteen; layout and main equipment
- **5S or 6S** (or 7S with 节约), and the plant's existing standard if any
- **Problems seen**: clutter, missing tools, oil leaks, blocked aisles, unlabeled materials, expired chemicals
- **Audit practice**: frequency, auditors, how scores are used (ranking, bonus, improvement)
- **Customer audits coming**, if the audit must match a customer's checklist

## Output Structure

### 1. 检查表
| 类别 | 序号 | 检查项目 | 合格标准 | 分值 | 得分 | 照片/备注 |
Five to eight items per S, written for this area, each with an observable standard:
- **整理 (Sort)**: only items needed for current work; red-tag area used; no personal items at stations
- **整顿 (Set in order)**: fixed, labelled locations; shadow boards for tools; floor markings for WIP, defects and aisles; FIFO for materials
- **清扫 (Shine)**: equipment, floor and benches clean; leaks found and reported; cleaning includes inspection
- **清洁 (Standardise)**: the standards are visible (photos of the right state); cleaning schedules followed
- **素养 (Sustain)**: people follow the rules without reminders; previous findings closed
- **安全 (Safety, 6S)**: PPE worn; guards in place; fire exits and extinguishers clear and checked; chemicals labelled and stored correctly

### 2. 评分规则
A 0 to 3 or 0 to 5 scale with a description of each level, rules for photo evidence (one photo per deduction), and how to handle a serious safety finding (stop and report, not just a deduction).

### 3. 检查结果汇总与红牌清单
Score by S, the top five findings with photos referenced, and the red-tag list (item, location, decision: dispose, relocate, keep).

### 4. 整改跟踪表
| 问题 | 位置 | 责任人 | 整改措施 | 期限 | 复查日期 | 状态 |
Each finding has an owner and a date, and a re-check.

### 5. 稽核排班与推行建议
Rota of auditors (cross-department), frequency, and how to use the scores: trend over time and closure rate, not public shaming. For a new rollout, a short phased plan: 整理 and 整顿 first, a model area (样板区), then expansion.

## Quality Checks

- [ ] Checklist items are specific to the area and observable
- [ ] Each score level has a written description
- [ ] Findings have photos, owners, deadlines and a re-check date
- [ ] Serious safety hazards are escalated, not only scored
- [ ] Closure rate is tracked, not just the score
- [ ] The rota uses auditors from other departments

## Anti-Patterns

- **A generic checklist.** "现场整洁" cannot be scored consistently; say what clean looks like here.
- **Cleaning the day before the audit.** Unannounced audits and closure tracking stop this.
- **Scores as punishment.** People hide problems; reward closure and improvement.
- **Red tags with no decision.** The red-tag area becomes a new storeroom.
- **6S safety as a tick box.** A blocked fire exit needs action today.

## Example Trigger Phrases

- "帮我做一份注塑车间 6S 检查表，带评分标准。"
- "仓库 5S 检查老是走过场，怎么改？"
- "下个月客户来审厂，帮我准备 5S 自查。"
- "我们刚开始推行 5S，第一个月做什么？"
- "Create a 5S audit checklist for a Chinese assembly line."
