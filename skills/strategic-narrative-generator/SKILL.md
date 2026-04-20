---
name: strategic-narrative-generator
description: "Generate the strategic story connecting a product roadmap to company goals in a form non-technical stakeholders can repeat. Use when asked to explain the roadmap, present strategy to leadership or the board, write the why behind the roadmap, create a narrative for all-hands, or make the roadmap tell a story. Produces a themed narrative with executive summary, progression arc, hard-question preparation, and what's-not-on-the-roadmap section."
---

# Strategic Narrative Generator Skill

Turn a prioritised initiative list into a strategic narrative — the story that explains not just what you're building but why, why now, and why this sequence.

## Required Inputs

Ask the user for these if not provided:
- **Prioritised initiative list** (with rough timelines)
- **Current OKRs or strategic priorities** (1-3)
- **Audience** (board, leadership team, all-hands, investors)
- **Competitive or market context** (optional but improves output significantly)

## Process
1. Identify 2-3 natural strategic themes from the initiative list
2. For each theme: articulate the problem, the customer it serves, and the metric it moves
3. Build the progression narrative: how does Q1 set up Q2? How does H1 set up H2?
4. Write executive summary in under 100 words (the version someone can repeat)
5. Anticipate the 3 hardest questions a sceptical board member would ask — draft answers
6. Identify what's NOT on the roadmap and why
7. **Validate** — Confirm every initiative maps to a theme. If an initiative is orphaned, either create a theme for it or flag it as a narrative gap.

## Output Structure

### Product Strategy Narrative: [Period]

**The One-Paragraph Context:**
[Market moment + key challenge + our response — for the CFO, not the engineer]

**Strategic Theme 1: [Name]**
- The problem: [customer pain in plain language]
- Our response: [initiatives in this theme]
- The metric it moves: [specific and measurable]
- Why now: [timing rationale]

**Strategic Theme 2: [Name]**
[Same structure]

**The Progression Story:**
[How each quarter sets up the next — this is the narrative arc]

**Executive Summary (under 100 words — shareable):**
[Version someone can quote at a board meeting]

**Questions to Prepare For:**
1. [Hard question] → [Prepared answer]
2. [Hard question] → [Prepared answer]
3. [Hard question] → [Prepared answer]

**What's Not on the Roadmap (and Why):**
[2-3 items — shows strategic discipline, not just prioritisation]

## Tone
- Write for a CFO, not an engineer
- Lead with outcomes, not features
- Every sentence should answer "so what?"
- Avoid jargon — if you can't say it plainly, the strategy isn't clear enough yet

## Quality Checks

- [ ] Executive summary is under 100 words and can stand alone
- [ ] Every initiative in the input maps to a strategic theme
- [ ] Each theme has a specific, measurable metric (not "improve engagement")
- [ ] Progression story shows causal links between quarters, not just chronological listing
- [ ] "Not on the roadmap" section includes at least 2 items with clear rationale
