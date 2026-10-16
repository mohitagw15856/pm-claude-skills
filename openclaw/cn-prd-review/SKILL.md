---
name: cn-prd-review
description: "Prepare for and run a product requirements review (需求评审 / PRD 评审会) the way Chinese internet teams do it: a pre-read the engineers, testers and designers can challenge, the questions each role will ask, the meeting run sheet and a written conclusion (通过 / 有条件通过 / 不通过). Use when asked 帮我准备需求评审, PRD 评审会怎么开, 评审前检查一下我的 PRD, 研发会问什么问题, or prepare my requirements review in Chinese. Produces a readiness check of the PRD, a role-by-role question bank with answer points, a 60-minute run sheet, and the review minutes template with the conclusion and follow-ups."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/cn-prd-review.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# PRD Review (需求评审)

In many Chinese internet companies a feature does not enter development until it passes a requirements review: the product manager presents the PRD, and engineering (研发), testing (测试), design (设计) and operations (运营) challenge it. Reviews fail for predictable reasons: unclear scope, missing edge cases, no tracking plan, or a schedule nobody agreed to. This skill checks the PRD before the meeting, rehearses the questions and runs the meeting to a written conclusion.

Write in Simplified Chinese unless asked otherwise. To write the PRD itself, see `prd-template`.

## What This Skill Produces

- **A readiness check** of the PRD against what reviewers look for, with gaps to fix before the meeting
- **A question bank by role** (研发, 测试, 设计, 运营, 数据) with answer points
- **A run sheet** for a 60-minute review
- **Minutes (评审纪要)** with the conclusion, open questions, owners and dates

## Required Inputs

Ask for these if not provided:
- **The PRD** or a summary of it
- **Who attends**: which roles, and who decides
- **The release target** and any fixed dates
- **Known disagreements** or risks the PM already expects

## Framework

1. **Readiness check (评审前自查).** The PRD should cover: 背景与目标 (with a measurable goal), 用户与场景, 需求范围 (in scope and explicitly out of scope), 功能说明 (flows, states, rules), 异常与边界 (errors, empty states, permissions, limits), 数据埋点 (events and the metric each serves), 非功能需求 (performance, security, compliance), 上线计划 (gradual release, rollback) and 待定问题. Mark each present, partial or missing.
2. **Question bank by role.**
   - 研发: "这个规则的边界是什么？", "历史数据怎么处理？", "并发 / 性能要求是多少？", "依赖哪些团队的接口？"
   - 测试: "异常流程有哪些？", "验收标准是什么？", "兼容哪些端和版本？"
   - 设计: "交互稿覆盖了哪些状态？", "空状态和错误提示怎么写？"
   - 运营 / 数据: "怎么衡量效果？", "埋点谁来验收？", "上线后多久复盘？"
3. **Run sheet (60 minutes).** 5 min background and goal; 20 min walkthrough of flows; 20 min questions by role; 10 min scope and schedule; 5 min conclusion read back aloud.
4. **Conclusion.** One of 通过 (enters scheduling), 有条件通过 (enters scheduling once named items are fixed by a date) or 不通过 (re-review needed), with the reason.
5. **Minutes the same day.** Decisions, open questions with owners and dates, and any scope changes.

## Output Format

### 评审前自查
| 模块 | 状态（齐全 / 部分 / 缺失） | 需要补充 |

### 预计问题清单
| 角色 | 问题 | 回答要点 | 需要提前准备的材料 |

### 评审会议程（60 分钟）
| 时间 | 环节 | 负责人 |

### 评审纪要
- **结论**：通过 / 有条件通过 / 不通过（原因）
- **已确认**：[决定]
- **待解决**：| 问题 | 负责人 | 截止时间 |
- **范围变化**：[新增 / 删减]
- **下一步**：[排期、技术评审、二次评审]

## Quality Checks

- [ ] Every PRD module is marked present, partial or missing, with what to add
- [ ] The question bank covers every role attending
- [ ] Out-of-scope items are stated, not implied
- [ ] Every tracking event is tied to a metric in the goal
- [ ] The conclusion is one of the three outcomes, with a reason
- [ ] Every open question has an owner and a date

## Anti-Patterns

- **Reading the PRD aloud for 50 minutes.** Send it a day ahead; use the meeting for questions.
- **"细节后面再定".** Undefined rules become arguments in development. Name them as open questions with owners.
- **No tracking plan.** Without 埋点 the feature cannot be judged after launch.
- **Leaving without a conclusion.** A review with no written outcome will be re-argued.

## Example Trigger Phrases

- "明天需求评审，帮我看看 PRD 还缺什么。"
- "研发和测试一般会问什么问题？帮我准备一下。"
- "Prepare me for a PRD review with a Chinese engineering team."
- "帮我写这次评审会的纪要，结论是有条件通过。"
