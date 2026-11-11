---
name: zhihu-answer
description: "Write an answer for Zhihu (知乎): the conclusion in the first lines, the author's standing to answer, a structured argument with evidence and sources, a worked example, the limits of the answer, and disclosure of any interest. Use when asked 写知乎回答, 知乎高赞回答怎么写, 这个问题怎么答, 知乎专栏文章, 写一篇干货回答, or write a Zhihu answer. Produces an opening that answers the question, a credibility line, a structured body, a short version for the preview, a disclosure and compliance check, and notes on what would change the answer. Distinct from xiaohongshu-note (experience-led) and wechat-article."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/zhihu-answer.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# 知乎回答

Zhihu readers arrive with a question and judge an answer by whether it settles it. The preview shows only the first lines, so the answer must begin there. Credibility comes from stated experience and checkable sources, and the audience is quick to spot soft advertising. This skill writes an answer that is useful to someone who reads only the opening and convincing to someone who reads to the end.

Write in Simplified Chinese.

## What This Skill Produces

- An opening of two or three lines that answers the question
- A credibility line: why this author can answer
- A structured body with evidence, sources and one worked example
- The limits: when the answer does not apply
- A preview-length version
- A disclosure and compliance check

## Required Inputs

Ask for these if not provided:

- The exact question, and any description under it
- The author's relevant background and what they are willing to state publicly
- The author's position and the reasoning behind it
- Evidence: data, sources, cases, personal experience
- Whether the author has any commercial interest in the topic or products mentioned
- Desired length and whether it is an answer, an article (专栏) or an idea (想法)

## Framework

1. **Answer first.** The first sentence gives the conclusion. For "is X worth it" questions, say yes, no or it depends on what, then the condition.
2. **Standing.** One line on why the author knows: years in the field, a role, a project, or first-hand experience. No inflated titles.
3. **Structure.** Three to five numbered points or short sections with plain subheadings. Each point: claim, reason, evidence.
4. **Evidence.** Name the source and year for data. Distinguish personal experience from general fact. Link or cite where possible.
5. **One worked example.** A real case, a calculation or a before and after. This is what readers save.
6. **Address the strongest objection.** State it fairly and answer it.
7. **Limits.** Say for whom or when the answer does not hold.
8. **Close.** A two-line summary or a decision rule. No request for likes.
9. **Disclosure.** State any interest (利益相关) at the top or bottom. Recommendations with affiliate links must follow the platform's commercial content rules.
10. **Professional topics.** Medical, legal and financial answers carry a note that they are general information, and avoid individual advice.
11. **Tone.** Direct and reasoned. No sarcasm aimed at the asker.

## Output Format

### 知乎回答：[问题]

**预览版（前 3 行）**
> [结论与关键条件]

**正文**
> [利益相关或身份说明]
>
> [结论]
>
> **一、[要点]**
> [理由与证据]
>
> **二、[要点]**
> [理由与证据]
>
> **举个例子**
> [案例或计算]
>
> **可能的反对意见**
> [回应]
>
> **什么情况下不适用**
> [说明]
>
> **总结**
> [两句话]

**来源**：[列表]

**合规与披露检查**
| 项目 | 结果 |
|---|---|
| 利益相关已声明 | |
| 数据有来源 | |
| 专业类内容有提示 | |

**Assumptions and gaps**
- [假设的背景或数据]
- [会改变结论的信息]

## Quality Checks

- [ ] The first sentence answers the question
- [ ] The credibility line is specific and true
- [ ] Every data point names a source
- [ ] There is one worked example
- [ ] The strongest objection is addressed
- [ ] Any interest is disclosed

## Anti-Patterns

- **Do not open with "谢邀" and a story before the answer.**
- **Do not claim credentials the author does not hold.**
- **Do not present opinion as data.**
- **Do not hide a product recommendation as neutral advice.**
- **Do not give individual medical, legal or investment advice.**

## Example Trigger Phrases

- "帮我写一个知乎回答：'30 岁转行做产品经理还来得及吗？'"
- "这篇回答开头太慢，帮我改成先说结论。"
- "我是从业 8 年的会计，怎么回答'小公司要不要请代账'？"
- "Write a Zhihu answer on whether a home NAS is worth buying."

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/zhihu-answer.html

<!-- pm-claude-skills v84.0.0 | skill: zhihu-answer | source: skills/zhihu-answer/SKILL.md | sha256: 1743950ec0f41e0a52ade0717b979183a150a9d647eac0283186f286376235a5 | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
