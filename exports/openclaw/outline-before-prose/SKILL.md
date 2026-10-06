---
name: outline-before-prose
description: "Outline documents before drafting them — the argument skeleton that gets alignment cheaply, the one-line-per-section discipline, and the review-the-outline step that saves rewriting the prose. Use when asked help me start this document, outline before I write, why do my docs get rewritten from scratch in review, or get sign-off before drafting. Produces the outline with each section's claim (not topic), the reader-and-decision header, the outline review step, and the expansion rules."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/outline-before-prose.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Outline Before Prose Skill

Documents get rewritten in review because the *structure* was wrong — and structure feedback arrived after two days of prose polishing. The outline-first discipline moves that feedback to hour one: a skeleton where every section is a one-line *claim* (not a topic), a header naming the reader and the decision, and a five-minute outline review with the key stakeholder before any paragraphs exist. Prose expands an approved outline in one pass; prose written first defends itself against restructuring forever.

## What This Skill Produces

- **The header** — reader, the decision/action the doc exists to produce, and the length budget
- **The claim outline** — each section as the sentence it will argue, in order, with the evidence it will carry noted
- **The outline review step** — who sees the skeleton, what question they're asked, before drafting starts
- **The expansion rules** — how the approved outline becomes prose without growing new sections in the dark

## Required Inputs

Ask for these if not provided:
- **The doc's job** — what the reader should *do* after reading (approve, decide, follow, stop worrying); docs without a job become tours
- **The reader, specifically** — their context level and their likely objection; the outline argues to someone
- **The material** — what's known, what evidence exists, the conclusion if one is already honest — outlines organize material; they don't survive its absence
- **The reviewer** — whose restructuring would hurt most later; that's who reviews the outline now

## Framework: The Skeleton Rules

1. **Sections are claims, not topics:** "Performance" is a topic; "The latency regression comes from the new retry logic" is a claim — a claim outline can be *disagreed with* at outline stage, which is the entire point. If a section's claim can't be written, the thinking isn't done, and prose would have hidden that for two more days.
2. **The header is the contract:** reader + the decision + length budget, written first. Every outline decision gets tested against it — a section that doesn't move the named reader toward the named decision is cut *now*, at one line of sunk cost.
3. **Order is the argument:** claims sequenced so each earns the next — context → the problem's cost → the proposal → the evidence → the risks conceded → the ask. Reordering at outline stage is drag-and-drop; at prose stage it's surgery with transitions.
4. **The outline review asks one question:** "if the sections argue these claims with this evidence, does the doc work for you?" — five minutes, the reviewer who'd otherwise restructure in review. Their edits land on one page, and the expensive rewrite dies unborn. (This is the [executive-summary](../executive-summary/SKILL.md) discipline applied one stage earlier.)
5. **Expansion is faithful or renegotiated:** drafting fills sections without spawning new ones; material that demands a new section goes back through the header test (and the reviewer, if it changes the shape). The outline travels at the doc's top during drafting — becoming the TOC, or the exec summary's skeleton, at ship time.

## Output Format

# Outline: [doc] — for [reader] to [decision] · budget: [length]

## The Skeleton
1. **[Section claim, as a sentence]** — evidence: [what carries it]
2. …
[Ordered as the argument · cuts noted: "considered and dropped: X (fails the header test)"]

## The Review Step
[Who · the one question · scheduled before drafting]

## Expansion Rules
[Fill-don't-spawn · the renegotiation trigger · the outline's afterlife as TOC/summary]

## Quality Checks

- [ ] Every section is a disagreeable claim, not a topic word
- [ ] The header names reader, decision, and budget — and every section passed its test
- [ ] Order makes each claim set up the next
- [ ] The outline reviewer is the person whose late restructuring would cost most
- [ ] Drafting rules prevent silent new sections

## Anti-Patterns

- [ ] Do not outline in topics — "Background / Analysis / Conclusion" postpones every real decision to prose
- [ ] Do not draft while outlining — pretty sentences at skeleton stage are premature attachment
- [ ] Do not skip the review because the outline "is obvious" — obvious outlines take five minutes to confirm and two days to rewrite
- [ ] Do not defend outline structure at prose review — that conversation was available cheaper earlier; have it earlier
- [ ] Do not outline without the material — a skeleton of unknowns is a research plan wearing a doc's clothes, and should be named as one

## Example Trigger Phrases

- "Help me start this document."
- "Outline before I write."
- "Why do my docs get rewritten from scratch in review?"
- "Get sign-off before drafting."
