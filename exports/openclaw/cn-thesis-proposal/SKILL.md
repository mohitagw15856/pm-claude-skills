---
name: cn-thesis-proposal
description: "Use when asked 帮我写开题报告, 开题答辩怎么准备, 文献综述怎么写, 技术路线图, 研究内容和创新点, or write a thesis proposal for a Chinese university. Produces a 开题报告 in the section order Chinese universities use (选题背景与意义, 国内外研究现状, 研究内容与目标, 研究方法与技术路线, 创新点, 研究基础, 进度安排, 预期成果, 参考文献), a literature review plan, a technical route diagram in text, and the questions the 开题答辩 panel is likely to ask."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/cn-thesis-proposal.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Thesis Proposal (开题报告)

Before writing a bachelor's, master's or doctoral thesis in China, students submit a 开题报告 and defend it in front of a panel. Panels reject proposals for the same reasons: a topic too broad to finish, a literature review that lists papers without synthesis, research questions that do not match the methods, and a schedule with no slack. This skill builds a proposal that is narrow enough to finish and argued well enough to pass.

Write in Simplified Chinese unless asked otherwise. The university's own template and word limits override this structure. Never invent references: every citation must come from the student's own reading or a source they confirm.

## Required Inputs

Ask for these if not provided:
- **Degree level** (本科, 硕士, 博士), discipline and the university's template, if any
- **Topic idea**, and the supervisor's guidance
- **Papers already read**, with full details, or the databases the student can use (CNKI 知网, Wanfang, Web of Science)
- **Data, equipment or field access** the student actually has
- **Deadlines**: proposal defence, mid-term check, submission

## Output Structure

### 1. Topic narrowing
Turn the idea into a researchable question: object, variable or problem, method, scope (place, period, sample). Offer two narrower versions and say which is safer to finish in time.

### 2. The 开题报告
- **一、选题背景与意义**: the problem, why it matters now, theoretical and practical significance
- **二、国内外研究现状**: grouped by theme, not paper by paper; ends with the gap this study fills
- **三、研究内容与目标**: three to five research contents that answer the question
- **四、研究方法与技术路线**: methods mapped to each content; the technical route as numbered steps (a text version of the 技术路线图)
- **五、创新点**: one to three, each specific and defensible
- **六、研究基础与条件**: what the student already has
- **七、进度安排**: a table by month with milestones and a buffer
- **八、预期成果**
- **九、参考文献**: GB/T 7714 format; see `cn-citation-gbt7714`

### 3. Literature review plan
Search terms in Chinese and English, databases, inclusion criteria, and a reading matrix: | 文献 | 研究问题 | 方法 | 结论 | 与本研究的关系 |

### 4. Defence preparation
The likely panel questions with answer points: why this topic, is the scope feasible, why this method, what is new, what if the data is not available.

## Quality Checks

- [ ] The research question names an object, a method and a scope
- [ ] Every research content is matched to a method in section four
- [ ] The literature review is grouped by theme and ends with a stated gap
- [ ] Every innovation point is specific enough to be checked
- [ ] The schedule has a buffer before each university deadline
- [ ] No reference is invented; unconfirmed sources are marked 待核实

## Anti-Patterns

- **A topic the size of a field.** "人工智能在教育中的应用" cannot be finished; narrow it.
- **A list of abstracts as a review.** Synthesis by theme is what panels look for.
- **Innovation by adjective.** "首次系统研究" claims need evidence that nobody has done it.
- **Fabricated citations.** Panels check; a fake reference can fail the whole proposal.

## Example Trigger Phrases

- "帮我写硕士开题报告，题目是短视频对大学生消费行为的影响。"
- "开题答辩老师会问什么？帮我准备。"
- "我的文献综述像流水账，帮我按主题重新组织。"
- "Help me write a Chinese university thesis proposal."
