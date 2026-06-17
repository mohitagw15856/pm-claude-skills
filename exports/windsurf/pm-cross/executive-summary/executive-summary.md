---
trigger: model_decision
description: "Write an executive summary for any document, report, or proposal. Use when asked to write an executive summary, management summary, briefing paper, or one-pager for senior stakeholders. Produces a structured summary that busy executives can read in under 3 minutes and act on."
---

# Executive Summary Skill

Writes executive summaries that busy decision-makers actually read — front-loaded with conclusions, structured for skimming, ruthless about what to include.

## Required Inputs
- **Source document or topic** (paste or describe)
- **Audience** (CEO / board / investor / minister / client / committee)
- **Decision or action needed** (what should the reader do after reading?)
- **Length limit** (1 page / 2 pages / 500 words)
- **Format** (formal report / slide / email / briefing paper)

## Core Principle

An executive summary is NOT a summary of the document. It is a standalone document that:
- States the conclusion upfront — not at the end
- Contains only what the reader needs to make a decision
- Can be understood without reading anything else
- Recommends a specific action

## Output Structure

---

### [Title]
**Executive Summary**
*Prepared for: [Audience] | Date: [Date] | Author: [Name]*

---

**Bottom line up front:**
[The most important thing. The recommendation or finding. 2-3 sentences. A reader who only reads this should know what you are asking or telling them.]

---

**Background (why this matters):**
[2-3 sentences. Minimum context to understand the bottom line. Not the history — just what the reader needs now.]

---

**Key findings / analysis:**
- **[Finding 1]:** [One sentence — specific and evidence-based]
- **[Finding 2]:** [One sentence]
- **[Finding 3]:** [One sentence]

---

**Options considered:** (include only if a decision is being presented)

| Option | Benefit | Risk | Recommendation |
|---|---|---|---|
| [Option A] | [Benefit] | [Risk] | Recommended |
| [Option B] | [Benefit] | [Risk] | Not recommended |

---

**Recommendation:**
[Specific. "We recommend [action] because [reason]. This will [outcome]." Not "we suggest consideration of options."]

---

**Immediate next steps:**
- [Action 1 — specific, with owner and date]
- [Action 2]

---

**Risks of inaction:** [What happens if the reader does nothing]

**Full report:** [Reference to where the full document can be found]

---

## Adapting for Different Audiences

**CEO/MD:** Lead with financial or strategic impact. 1 page. Make the decision binary. Ask in sentence one.
**Board:** Lead with governance or risk. Frame against organisational objectives. State specifically what you need from them.
**Investor:** Lead with return or opportunity. Specific numbers. 1 page. Anticipate "why now."
**Minister/senior public sector:** Lead with public benefit or policy alignment. Include cost-benefit framing.
**Client:** Lead with their problem. Show you understand before presenting recommendation.

## Quality Checks

- [ ] Bottom line in first 3 sentences
- [ ] Standalone — no need to read full document
- [ ] Recommendation is specific
- [ ] Fits length limit
- [ ] Written for audience priorities not author priorities
- [ ] Next steps have owners and dates

## Anti-Patterns

- [ ] Do not summarise the document chronologically — an executive summary that follows the structure of the source document is not an executive summary, it is an abstract
- [ ] Do not bury the recommendation at the end — executives read the first paragraph and skim the rest; the ask must be in sentence one or two
- [ ] Do not use the same summary for different audiences — a CEO and a board member have different decision contexts and require different framing
- [ ] Do not include background that the reader already knows — every sentence of background must earn its place by making the bottom line more actionable
- [ ] Do not leave the "risks of inaction" section vague — a summary that does not quantify what happens if the reader does nothing removes the urgency needed for a decision

## Example Trigger Phrases
- "Write an executive summary of this report: [paste]"
- "Summarise this document for the board: [paste]"
- "Create a one-pager from this proposal for the CEO"
- "Turn these findings into an exec summary"
