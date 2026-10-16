---
name: desk-research-sprint
description: "Run a timeboxed desk-research sprint that ends with an answer instead of forty tabs — the question decomposition, the source plan by question type, the capture discipline that prevents re-reading, and the stop rule that beats completionism. Use when asked research this market/tool/topic by Friday, I have two hours to get smart on X, structure my desk research, or I keep researching and never concluding. Produces the decomposed questions, the source plan, the capture format, and the timeboxed synthesis with confidence labels."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/desk-research-sprint.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Desk Research Sprint Skill

Unstructured research expands to fill all available time and ends with tabs instead of answers — because "research X" was never converted into questions that can be *done*. The sprint fixes the shape: decompose into 3–5 answerable questions (each with what-good-enough-looks-like), plan sources by question type (market numbers, user sentiment, and technical claims live in different places), capture findings in one running doc *at reading time* (re-reading is the silent time-thief), and obey the stop rule — the timebox ends, the synthesis gets written from whatever's captured, gaps labeled honestly.

## What This Skill Produces

- **The question set** — the vague topic decomposed into 3–5 answerable questions with good-enough bars
- **The source plan** — per question: where answers of that type actually live, and the [source-triangulation](../source-triangulation/SKILL.md) depth it deserves
- **The capture doc** — one running format: finding → source → confidence → which question it feeds
- **The synthesis** — the answers at their earned confidence, the gaps named, the next-sprint questions if any

## Required Inputs

Ask for these if not provided:
- **The real question behind the topic** — "research the CRM market" hides "which three CRMs should we demo?" — the decision the research feeds defines done ([what-to-ask](../what-to-ask/SKILL.md) energy, applied to research)
- **The timebox** — two hours and two days are different sprints; the question count and depth budget follow
- **What's already known** — prior research, existing beliefs to test (stated as hypotheses, so confirmation bias gets a fence)
- **The output's destination** — a recommendation memo? A brief for the boss? The synthesis writes toward its reader from the start

## Framework: The Sprint Rules

1. **Decompose to answerable:** each question passes two tests — *could a finding settle it?* and *what does good-enough look like?* ("rough market size ±50% is fine" vs. "need the actual pricing tiers"). Questions without a good-enough bar recruit completionism; the bar is the permission to stop.
2. **Sources by question type:** market numbers → industry reports, filings, the triangulation discipline · user sentiment → review sites, forums, communities (read for patterns, not anecdotes) · technical claims → docs and changelogs over marketing pages · pricing → the vendor's page plus the forum thread about what it *actually* costs. Typed source plans kill the generic-search spiral.
3. **Capture at reading time, once:** every useful finding goes into the running doc *as it's read* — one line: the finding, the link, the confidence flag, the question it feeds. The alternative (read now, harvest later) reads everything twice and harvests half; the capture doc is also the synthesis's raw material, pre-sorted.
4. **The timebox allocates, the stop rule enforces:** budget across questions up front (the decision-critical ones get double), and when a question's good-enough bar is met — *stop researching it*, even mid-interesting-article. At timebox end, synthesis happens with what exists; "one more source" is the lie completionism tells.
5. **Synthesize with confidence labels:** each question answered at its earned level ("Q2: roughly $4–6B, single-sourced, fine for our purpose · Q4: couldn't verify — flagging as the open risk") — the labeled gap is a *finding*, and pretending coverage is the sprint's cardinal sin. The last section: what a second sprint would chase, if the decision warrants one.

## Output Format

# Research Sprint: [topic] → [the decision it feeds] · timebox: [T]

## The Questions
| # | Question | Good-enough bar | Time budget |
|---|---|---|---|

## Source Plan
[Per question: the typed sources + triangulation depth]

## The Capture Doc (running)
[Finding · source · confidence · feeds-Q# — one line each, written at read-time]

## Synthesis
[Per question: the answer at earned confidence · the labeled gaps · the recommendation if the destination wants one · next-sprint questions]

## Quality Checks

- [ ] Every question has a good-enough bar set before searching
- [ ] Sources were planned by question type, not generic-searched
- [ ] Findings were captured at read-time into the one doc
- [ ] Questions stopped at their bars; the timebox ended the sprint
- [ ] Gaps are labeled as findings, never papered over

## Anti-Patterns

- [ ] Do not research a topic — decompose to questions or inherit forty tabs
- [ ] Do not read without capturing — the second read is the sprint's biggest hidden cost
- [ ] Do not keep researching past the bar — good-enough was defined for exactly this moment
- [ ] Do not present echoed sources as confirmation — the triangulation rules ride along
- [ ] Do not end without the synthesis — captured-but-unsynthesized research is tabs with better formatting

## Example Trigger Phrases

- "Research this market/tool/topic by Friday."
- "I have two hours to get smart on X."
- "Structure my desk research."
- "I keep researching and never concluding."
