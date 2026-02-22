---
name: strategic-narrative-generator
description: Generates the strategic story connecting your roadmap to company 
goals in a form non-technical stakeholders can repeat. Use when user needs to 
"explain the roadmap", "present strategy to leadership or the board", "write the 
why behind the roadmap", "create a narrative for all-hands", or "make the 
roadmap tell a story".
metadata:
  author: Mohit Aggarwal
  version: 1.0.0
  category: roadmapping
  tags: [strategy, roadmap, executive-communication, narrative]
  documentation: https://github.com/mohitagw15856/pm-claude-skills
---
# Strategic Narrative Generator Skill

## Purpose
Turn a prioritised initiative list into a strategic narrative — the story that 
explains not just what you're building but why, why now, and why this sequence. 
The kind of narrative a board member can repeat back correctly after one hearing.

## Required Inputs
- Prioritised initiative list (with rough timelines)
- Current OKRs or strategic priorities (1-3)
- Competitive or market context (optional but improves output significantly)

## Process
1. Read the initiative list and identify 2-3 natural strategic themes
2. For each theme: articulate the problem it addresses, the customer it serves, 
   and the metric it moves
3. Build the progression narrative: how does Q1 set up Q2? How does H1 set up H2?
4. Write executive summary in under 100 words (the version someone can repeat)
5. Anticipate the 3 hardest questions a sceptical board member would ask — 
   and draft answers
6. Identify what's NOT on the roadmap and why (this builds credibility)

## Output Format

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

## Tone Rules
- Write for a CFO, not an engineer
- Lead with outcomes, not features
- Every sentence should answer "so what?"
- Avoid jargon — if you can't say it plainly, the strategy isn't clear enough yet
