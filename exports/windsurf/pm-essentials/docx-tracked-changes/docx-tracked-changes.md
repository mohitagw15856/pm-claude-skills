---
trigger: model_decision
description: "Produce properly-formatted tracked changes for a Word document. Use when asked to redline a document, suggest edits to a contract or document, create tracked changes for review, or mark up a document with proposed revisions. Produces a complete redline with insertions, deletions, and margin comments that can be applied to the source document. Best used with Claude Opus 4.7 or newer for reliable tracked changes handling."
---

# Word Doc Tracked Changes Skill

Produces properly-structured tracked changes for a Word document — insertions, deletions, replacements, and margin comments formatted so they can be applied directly to the source document. Built to leverage Opus 4.7 improvements in .docx redlining and tracked changes generation.

## Required Inputs

Ask the user for these if not provided:
- **The document** (paste the text or upload the .docx)
- **Review type** (legal review / copy edit / substantive rewrite / compliance check / plain English rewrite)
- **Review scope** (full document / specific sections / specific clause type)
- **Reviewer role** (author / manager / legal counsel / subject matter expert)

## Output Structure

### 1. Redline Summary

**Document:** [Name or identifier]
**Review type:** [As stated]
**Reviewer:** [Role]
**Total changes:** [Insertions: N / Deletions: N / Comments: N]
**Overall assessment:** [1-2 sentences — is this document close to final, or does it need substantial revision?]

### 2. Top-Level Changes

Changes that affect the meaning or structure of the document:

**Change N — [Section or paragraph reference]**
- Original: "[Exact original text]"
- Suggested: "[Proposed new text]"
- Reason: [Why this change — substantive/legal/clarity]

### 3. Line-by-Line Tracked Changes

For each paragraph that needs changes, format as:

**[Paragraph reference — e.g. "Section 3, Paragraph 2"]**

Original:
> [Exact original paragraph]

Tracked changes:
> [Same paragraph with deletions marked as ~~strikethrough~~ and insertions marked as **bold**]

Clean version:
> [Final clean text after applying changes]

### 4. Margin Comments

Comments that flag issues without proposing a specific wording change:

**Comment N — [Location]**
"[Comment text — written as the reviewer would write it. Direct, specific, actionable.]"

Comments are for things like:
- "This clause conflicts with Section 7 — please reconcile"
- "Missing definition of [term] used throughout"
- "Confirm figure with finance team"

### 5. Stylistic Edits

Line-level stylistic changes (if scope includes copy editing):

| Location | Before | After | Reason |
|---|---|---|---|
| Para 3 | [Text] | [Text] | [Readability/grammar/consistency] |

### 6. Pattern Flags

Issues that repeat across the document:

**[Pattern — e.g. "Passive voice overuse"]**
- Instances: [count]
- Examples: [2-3 specific locations]
- Suggested approach: [How to address]

### 7. Review Completeness

| Review dimension | Covered |
|---|---|
| Grammar and syntax | Yes / No |
| Clarity and readability | Yes / No |
| Substantive accuracy | Yes / No / N/A |
| Compliance/legal check | Yes / No / N/A |
| Consistency with referenced documents | Yes / No / N/A |

### 8. How to Apply These Changes

Instructions for applying the redline:

**In Microsoft Word:**
1. Enable Track Changes (Review tab → Track Changes)
2. Apply the changes from Section 3 in order
3. Add comments from Section 4 using Review → New Comment
4. Send the redlined document back to the reviewer

**In Google Docs:**
1. Switch to Suggesting mode (top right pencil icon)
2. Apply the changes from Section 3
3. Add comments using the comment button in the margin

## Quality Checks
- [ ] Every tracked change has the original text preserved exactly
- [ ] Substantive changes are separated from stylistic changes
- [ ] Comments are written as the reviewer would write them, not meta-commentary
- [ ] Pattern issues identified separately from individual changes
- [ ] Application instructions match the target platform

## Anti-Patterns

- [ ] Do not paraphrase original text when creating tracked deletions — the original text must be preserved exactly, character for character, or the tracked change cannot be reviewed against source
- [ ] Do not mix substantive changes with stylistic edits in the same section — reviewers need to approve substantive changes at a different threshold than copy edits
- [ ] Do not write margin comments as meta-commentary about the review process ("This section needs work") — comments must be actionable instructions the author can act on
- [ ] Do not flag every imperfect sentence as a change — over-redlining trains authors to accept changes without reading, which defeats the purpose of tracked review
- [ ] Do not produce a redline without a summary of top-level changes — reviewers read the summary first and use it to decide which changes to scrutinise in detail

## Example Trigger Phrases
- "Redline this contract"
- "Create tracked changes for this document"
- "Mark up this document with proposed edits"
- "Review this and suggest changes in tracked changes format"
- "Give me a redline version of this draft"

## Why This Works Better on Opus 4.7
Tracked changes require the model to preserve source text exactly while suggesting alternatives — earlier models would paraphrase the original or lose track of which text was original vs suggested. Opus 4.7 improvements specifically target this workflow.
