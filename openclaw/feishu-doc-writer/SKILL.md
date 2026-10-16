---
name: feishu-doc-writer
description: "Write a document for Feishu / Lark Docs (飞书文档) in the shape Feishu readers expect: a summary callout at the top, headed sections that work with the outline panel, task lists with @owners and dates, and tables that survive paste. Use when asked 写一份飞书文档, 帮我整理成飞书文档格式, 飞书方案文档, write this up for Feishu or Lark, or turn my notes into a Feishu doc. Produces paste-ready Markdown that Feishu converts on import, a 高亮块 summary, an owner-and-date task list, and a short message to share the doc in a Feishu group."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/feishu-doc-writer.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Feishu Doc Writer (飞书文档)

Feishu (Lark outside China) is where many Chinese teams write plans, reviews and meeting notes, and its readers skim: they read the summary block, jump through the outline panel, and check the task list for their name. This skill turns notes or a rough draft into a document built for that reading pattern, in Markdown that Feishu converts cleanly when pasted or imported.

Write in Simplified Chinese unless asked for English or Traditional Chinese.

## What This Skill Produces

- **The document** as paste-ready Markdown: H1 title, H2 / H3 sections, tables, task lists
- **A summary callout (高亮块)** at the top: conclusion, decision needed, deadline
- **A task list** with `@owner` placeholders and dates, ready to convert to Feishu tasks
- **A share message** (two or three lines) for the Feishu group, with the decision asked for

## Required Inputs

Ask for these if not provided:
- **The material**: notes, a draft, meeting minutes or bullet points
- **Document type**: 方案 (proposal), 会议纪要 (minutes), 复盘 (review), 需求文档 (requirements), 周报 (report) or other
- **Readers**: own team, cross-team, or leadership
- **Owners and dates** for any actions, or permission to leave `@待定` placeholders
- **Team template**, if the space already has one; follow it over this structure

## Framework

1. **Conclusion first.** The 高亮块 states the conclusion, the one decision needed and the deadline. A reader who stops there should still act correctly.
2. **Outline-friendly headings.** Feishu builds the outline (目录) from headings, so each H2 names its content ("二、方案对比", not "二、其他"). Keep to two levels.
3. **Tables for comparison, lists for steps.** Feishu tables paste well from Markdown pipe tables; avoid merged cells, which do not survive conversion.
4. **Actions as task lists.** Write `- [ ] 事项 @负责人 截止：MM-DD`. After pasting, the reader can convert each line into a Feishu task and assign it.
5. **Link, do not paste.** Reference other docs, sheets (飞书表格) and Base (多维表格) by link rather than copying their content, so there is one source of truth.
6. **Plain-text fallbacks.** Callouts, @mentions and embedded cards do not exist in Markdown. Mark them with a clear convention (`> 💡` for a callout, `@姓名` for a mention) and list in the share notes what to convert after pasting.

## Output Format

```markdown
# [文档标题]

> 💡 **结论**：[一句话]
> **需要决策**：[什么事，由谁决定]　**截止**：[日期]

## 一、背景
## 二、[核心内容，按文档类型命名]
| 方案 | 优点 | 缺点 | 成本 | 建议 |
## 三、风险与待定问题
## 四、行动项
- [ ] [事项] @[负责人] 截止：[MM-DD]
## 附：相关文档
- [文档名](链接)
```

Then:
- **粘贴后需要处理**: the callout lines to convert into a 高亮块, the @mentions to replace with real people, the task lines to convert into Feishu tasks
- **群消息**: two or three lines with the conclusion, the decision asked for and the doc link placeholder

## Quality Checks

- [ ] The first block states the conclusion, the decision needed and a deadline
- [ ] Every H2 heading names its content; none reads "其他" or "补充"
- [ ] Every action line has an owner (or `@待定`) and a date
- [ ] Tables have no merged cells and one header row
- [ ] No fact, figure or name appears that the person did not provide
- [ ] The paste notes list every element that needs converting after import

## Anti-Patterns

- **A wall of text with no headings.** Feishu readers navigate by the outline; without headings they cannot.
- **The conclusion at the bottom.** Leadership reads the top block and the task list, often nothing else.
- **Copying a spreadsheet into the doc.** Link the 飞书表格 so numbers stay current.
- **Inventing owners.** Leave `@待定` and flag it rather than guessing who does what.

## Example Trigger Phrases

- "帮我把这份会议记录整理成飞书文档。"
- "写一份飞书方案文档，比较这三个方案，领导要做决定。"
- "Turn these notes into a Lark doc for the cross-team review."
- "把复盘内容整理成飞书格式，行动项要能转成任务。"
