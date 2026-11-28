---
applyTo: "**"
description: "Summarise a company's earnings release and call transcript the user supplies: what was reported against what was guided, what changed in the outlook, what management emphasised and avoided, and the questions analysts pressed on. Use when asked to summarise this earnings call, what changed this quarter, what did management say about guidance, pull the key numbers from this release, or compare this quarter's call with the last one. Produces a one-screen summary with sourced figures, a changes table, notable quotes with speaker and context, and open questions. It is not investment advice."
---

# Earnings Call Summary Skill

An earnings call is partly information and partly presentation. The useful reading separates the two: the figures as reported, the change against what the company itself said last time, and the gap between what management chose to talk about and what analysts kept asking. This skill does that from the release and transcript the user pastes in. It does not fetch market reactions, consensus estimates or prices, and it does not say whether to buy or sell. To build a full thesis from annual figures, use `equity-research-note`.

> **Not quite this?** Use `equity-research-note` for a full view of the business with cases and valuation, and `annual-report-tutor` to learn how to read an annual report.

## What This Skill Produces

- **A one-screen summary**: the quarter in five lines
- **A figures table**: reported numbers with the comparison the company gives (prior year, prior quarter, its own guidance)
- **A changes table**: what is different from last quarter in outlook, tone or disclosure
- **Quotes that matter**, with speaker and the question that prompted them
- **Pressed questions**: topics analysts returned to, and whether they were answered
- **Open questions** to carry into the next quarter

## Required Inputs

Ask for these if not provided:
- **The earnings release and the call transcript**, pasted or attached
- **The previous quarter's release or guidance**, if a comparison is wanted
- **What the reader cares about**: a particular segment, margin, cash, a product, guidance
- **The reporting date**, so the summary is labelled with it

Quote figures exactly as the document gives them, with the unit and period. If a number is not in the supplied material, write "not in the material". Never add a consensus estimate, a share price move or a figure from memory.

## Framework: Reported, Changed, Unsaid

1. **Start with the company's own yardstick.** Compare results with the guidance the company gave before, if supplied. That is the fairest test and it needs no outside data.
2. **Pull the figures with their labels.** Revenue, margin, earnings, cash flow, segment lines, the company's key operating measures. Keep reported and adjusted figures side by side and name the adjustments.
3. **Find what changed.** Guidance raised, held, cut or withdrawn. A measure that is no longer disclosed. A new measure introduced. Wording that moved from confident to careful.
4. **Separate prepared remarks from answers.** Prepared remarks show what management wants heard. The question session shows what analysts doubt.
5. **Track the pressed questions.** Note any topic raised by more than one analyst, and whether the answer gave a figure, a direction or neither.
6. **Quote carefully.** Short, exact, with the speaker's role. Give enough context that the quote cannot be misread.
7. **End with what to watch.** Specific items that the next report will confirm or contradict.

## Output Format

# Earnings Summary: [company] · [period] · reported [date]

*From the release and transcript supplied by the reader. Not investment advice and not a recommendation to buy or sell.*

## In Five Lines
[The quarter, the outlook, the main change, the main doubt, what to watch]

## Figures
| Measure | Reported | Comparison given | Against own guidance |
|---------|----------|------------------|----------------------|

## What Changed Since Last Quarter
| Area | Before | Now | Source in the material |
|------|--------|-----|------------------------|

## Quotes That Matter
> "[exact words]" ([role], in answer to [topic])

## What Analysts Pressed On
| Topic | Asked by how many | Answered with |
|-------|-------------------|---------------|

## Not in the Material
[Figures or comparisons the reader may expect that were not supplied]

## To Watch Next Quarter
[Specific, checkable items]

## Quality Checks

- [ ] Every figure appears in the supplied material with its unit and period
- [ ] Reported and adjusted figures are both shown where the company gives both
- [ ] Guidance changes are stated as raised, held, cut or withdrawn, with the source line
- [ ] Quotes are exact and attributed to a role
- [ ] No consensus numbers, price moves or outside data were added
- [ ] The disclaimer and reporting date are at the top

## Anti-Patterns

- [ ] Do not describe the market's reaction unless the user supplied it
- [ ] Do not paraphrase a quote and present it in quotation marks
- [ ] Do not call a quarter a beat or a miss against estimates that were not supplied
- [ ] Do not repeat management's framing as your own assessment
- [ ] Do not give a view on whether to buy or sell

## Example Trigger Phrases

- "Summarise this earnings call."
- "What changed in guidance this quarter?"
- "Pull the key numbers from this release."
- "What did analysts keep asking about?"

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/earnings-call-summary.html

<!-- pm-claude-skills v84.1.0 | skill: earnings-call-summary | source: skills/earnings-call-summary/SKILL.md | sha256: 67b19c7b9d15bcdb3b2a31b1fa2f8d990c3347242446e8aa19e374521394cc9a | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
