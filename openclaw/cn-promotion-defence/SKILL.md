---
name: cn-promotion-defence
description: "Prepare a promotion defence (晋升答辩) for a level-based promotion process common at Chinese technology companies: the materials, the presentation structure, the evidence for the next level, and a rehearsal of the committee's questions. Use when asked 帮我准备晋升答辩, 晋升述职, 晋升 PPT, how do I prepare for my promotion committee, or 答辩问题. Produces a level-gap analysis against the target level's criteria, the defence presentation outline in Chinese, a timed talk track, and a question bank with answer points, then a mock committee round."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/cn-promotion-defence.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Promotion Defence (晋升答辩)

At many Chinese technology companies, promotion to a higher level means a defence in front of a committee: a short presentation, then pointed questions. The committee is judging one thing: does this person already work at the next level? This skill builds the case against the target level's criteria, structures the talk, and rehearses the questions.

Write the materials in Simplified Chinese unless asked otherwise. For promotion packets in English, see `promotion-packet`; for a simulated committee, see `the-promotion-committee`.

## What This Skill Produces

- **A level-gap analysis**: the target level's criteria, the person's evidence for each, and the gaps
- **The presentation outline** (答辩 PPT), slide by slide
- **A timed talk track** for the allotted time
- **A question bank**: likely committee questions with answer points
- **A mock round**: the committee's questions, asked one at a time, with feedback

## Required Inputs

Ask for these if not provided:
- **Current and target level**, and the company's level criteria (职级标准) if available
- **Time allowed** for the presentation and the questions
- **The person's work** in the period: projects, role, results, technical or business depth
- **Committee make-up**, if known: cross-team, senior technical, business leaders

## Framework

1. **Map to the criteria.** Typical dimensions: 专业能力 (depth), 业务影响 (impact), 复杂度 (scope and difficulty), 影响力 (influence beyond the team), 人才培养 (developing others). For each, place one or two pieces of evidence.
2. **Pick two or three signature projects.** The committee remembers few things. For each: the problem and why it was hard, the person's own decisions, the result in numbers, and what it shows about the next level.
3. **Structure the talk:**
   - 个人概况 (one slide): role, scope, period
   - 核心成果 (one slide): the results in one view
   - 重点项目 × 2 or 3 (one or two slides each): challenge, approach, my role, result, reflection
   - 能力体现 (one slide): evidence against the next level's criteria
   - 不足与规划 (one slide): an honest gap and the plan
4. **Time it.** Roughly one minute per slide; leave the questions their full time.
5. **Rehearse questions.** The usual lines: "你个人的贡献是什么？", "为什么这样设计？有没有其他方案？", "如果重来你会怎么做？", "这件事对业务的影响如何衡量？", "你离下一级还差什么？"

## Output Format

### 晋升答辩准备：[姓名]，[当前职级] → [目标职级]

**一、职级差距分析**
| 维度 | 目标职级要求 | 我的证据 | 强度 | 差距 |

**二、答辩 PPT 大纲**（逐页：标题、要点、配图建议）

**三、讲稿**（按时间分段）

**四、问题库**
| 可能的问题 | 回答要点 | 支撑证据 |

**五、模拟答辩**：逐个提问，等待回答后给出反馈

## Quality Checks
- [ ] Every criterion of the target level has evidence or an honest gap
- [ ] Each signature project states the person's own decisions, separately from the team's
- [ ] The talk fits the time allowed
- [ ] The question bank includes "你个人的贡献" and "还差什么"
- [ ] No result was invented or inflated

## Anti-Patterns
- **Describing the project, not the person.** The committee is promoting a person.
- **Too many projects.** Two or three told well beat six skimmed.
- **Defensiveness** under questioning. Acknowledge, then answer.
- **Hiding gaps.** Naming one, with a plan, reads as next-level self-awareness.

## Example Trigger Phrases
- "帮我准备晋升答辩，从 P6 到 P7，20 分钟。"
- "写晋升答辩 PPT 的大纲。"
- "模拟一下晋升委员会会问我什么问题。"
- "Help me prepare my promotion defence for a Chinese tech company."
