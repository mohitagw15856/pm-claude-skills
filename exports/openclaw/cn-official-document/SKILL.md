---
name: cn-official-document
description: "Use when asked 帮我写公文, 写一份请示, 写通知 / 报告 / 函 / 纪要, 公文格式怎么排, check this document against GB/T 9704, or draft an official document for a Chinese government body, public institution or state-owned enterprise. Produces a 公文 in the right document type with every required element in the order GB/T 9704-2012 sets, heading levels and numbering, a layout specification for Word or WPS, and a check of the type-specific rules such as one matter per 请示."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/cn-official-document.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Official Document (公文)

Government bodies, public institutions and state-owned enterprises in China write official documents to a national standard: the document type follows the 党政机关公文处理工作条例 (2012), and the layout follows GB/T 9704-2012 党政机关公文格式. Readers notice a wrong type, a missing element or a 请示 that asks for two things before they read the content. This skill picks the right type, drafts the text in the expected register, and lays it out to the standard.

Write in Simplified Chinese. The body's own house rules (some ministries and companies add their own) override the defaults here.

## Required Inputs

Ask for these if not provided:
- **Purpose**: what the document must achieve, and who sends it to whom (上级, 平级 or 下级)
- **The facts**: the matter, dates, figures, and any decision requested
- **Issuing body** and its 发文字号 prefix, if known
- **Attachments**, and who should receive copies (抄送)
- **House template**, if the organisation has one

## Output Structure

### 1. Document type check
State the type and why, choosing from the 15 types: 决议、决定、命令（令）、公报、公告、通告、意见、通知、通报、报告、请示、批复、议案、函、纪要. Flag common confusions: asking for approval is a 请示, not a 报告; between bodies with no reporting line use a 函; a 通告 is for the public, a 通知 for named recipients.

### 2. The document, in element order
Using placeholders where facts are missing:
- 版头: 份号 and 密级 if needed, 紧急程度, 发文机关标志, 发文字号 (for example 〔2026〕12号, with 六角括号), 签发人 for upward documents
- 主体: 标题 (发文机关 + 事由 + 文种), 主送机关, 正文, 附件说明, 发文机关署名, 成文日期 in Arabic numerals (2026年10月4日), 印章 position, 附注
- 版记: 抄送机关, 印发机关和印发日期
Body headings use the four standard levels: 一、 then （一） then 1. then （1）.

### 3. Layout specification
A table for Word or WPS: A4 paper; 标题 in 2号小标宋体; 正文 in 3号仿宋; level-one headings in 3号黑体, level-two in 3号楷体; about 22 lines a page and 28 characters a line; page numbers in 4号半角宋体 Arabic numerals with dashes on each side.

### 4. Type-specific checks
| Rule | Pass or fix |
|---|---|
| 请示: one matter per document, one 主送机关, ends with a request such as 妥否，请批示 | |
| 报告: contains no request for approval | |
| 函: polite register for an equal body, ends with 请予支持 or 特此函告 as fits | |
| 通知: states who must do what by when | |
| 纪要: records decisions with owners, not a transcript | |

## Quality Checks

- [ ] The document type is one of the 15 and matches the sender-recipient relationship
- [ ] Every required element is present in GB/T 9704 order, or marked as not applicable
- [ ] Headings use 一、（一）1.（1） and no other numbering
- [ ] The 成文日期 uses Arabic numerals and the 发文字号 uses 〔〕
- [ ] A 请示 contains exactly one request and a 报告 contains none
- [ ] No fact, figure or name appears that the user did not supply

## Anti-Patterns

- **报告 that asks for approval.** It will not be answered as a request; write a 请示.
- **Several requests in one 请示.** Split them, or the reply will cover only one.
- **Colloquial wording.** 公文 uses fixed openings and closings; casual phrasing reads as careless.
- **Inventing the 发文字号.** Leave a placeholder; numbers come from the issuing office's register.

## Example Trigger Phrases

- "帮我写一份请示，申请增加两个编制。"
- "这份通知的格式对吗？按 GB/T 9704 检查一下。"
- "写一份给兄弟单位的函，商请协助调研。"
- "Draft a Chinese official notice for our state-owned company."
