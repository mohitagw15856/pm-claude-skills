---
aliases: ["Whiteboard To Spec"]
tags: [pm-skills, skill]
skill: whiteboard-to-spec
description: "Turn photos of a whiteboard, sticky-note wall, or napkin sketch into a structured spec the team can execute. Use when given whiteboard photos after a workshop, sketch images of a flow or architecture, or asked to 'write up what we drew'. Produces a structured write-up — decisions, flows, open questions, owners — that preserves everything on the board and flags what was ambiguous. Requires image input."
---

# Whiteboard To Spec Skill

The whiteboard is where teams decide; the photo of it is where decisions go to die. This skill reads the photo like the person who was in the room — arrows, crossings-out, shorthand, spatial grouping — and produces the write-up that should have been made that afternoon.

## What This Skill Produces

- A **faithful transcription** of everything legible on the board, organised by its spatial grouping
- The **structured spec**: decisions made, flows/diagrams redrawn as text or Mermaid, options considered (including crossed-out ones — rejections are decisions), open questions
- An **ambiguity ledger**: what couldn't be read or could mean two things, flagged instead of guessed

## Required Inputs

- **The image(s)** — one or more photos of the board/wall/sketch. If none is attached, ask for it; never proceed on a verbal description alone.
- **Context** (ask if missing): what was the session about, who attended, what decision it served

## Reading Method

1. **Transcribe first, interpret second.** Pass one lists what is physically on the board, region by region (top-left, centre…), including arrows, boxes, colours, underlines, and crossings-out. Do not skip marginalia — the small note at the edge is often the real decision.
2. **Honour the visual grammar.** Boxes = entities/steps; arrows = flow or causality (note direction); crossed-out = considered and rejected (keep it, labelled as rejected); circled/starred/underlined = emphasis; separate clusters = separate topics; a "?" = the room didn't agree.
3. **Redraw, don't describe.** Flows and architectures become Mermaid diagrams or ordered steps, not paragraphs about arrows.
4. **Never invent legibility.** Unreadable text becomes `[illegible — looks like "…"]` in the ambiguity ledger. A wrong guess presented confidently poisons the whole spec.
5. **Multiple photos:** establish overlap first (same board, different angles vs. different boards) and merge without duplicating.

## Output Format

### Board write-up: [session topic] — [date]

**What the board says (transcription by region):**
[region] — [contents, verbatim where legible]

**Decisions on the board:**
| # | Decision | Evidence on the board | Confidence |
|---|---|---|---|
| | | [e.g. "circled, arrow from both options"] | high / read-between-lines |

**Flows / structures (redrawn):**
```mermaid
[the diagram the board was drawing]
```

**Considered and rejected:** [crossed-out items, with what replaced them]

**Open questions from the board:** [every "?", disagreement marker, or dangling arrow]

**Ambiguity ledger:** [illegible or two-way-readable items — for the room to resolve]

**Suggested next step:** [the one action the board implies, e.g. "confirm decision #2 with the two owners named"]

## Quality Checks

- [ ] Every legible element on the board appears somewhere in the write-up — nothing silently dropped
- [ ] Crossed-out content is preserved as "rejected", not omitted
- [ ] Diagrams are redrawn as Mermaid/steps, not prose descriptions of arrows
- [ ] Every uncertain reading is in the ambiguity ledger, not presented as fact
- [ ] Decisions carry their on-board evidence, so a sceptic can check the photo

## Anti-Patterns

- [ ] Do not proceed without an image — this skill reads boards, it doesn't imagine them
- [ ] Do not "clean up" the room's thinking into what it should have decided — transcribe what it did decide
- [ ] Do not guess illegible words silently — a confident wrong guess is worse than a flagged gap
- [ ] Do not ignore spatial grouping — merging two separate clusters into one list destroys the meaning
- [ ] Do not drop the marginalia — initials, dates, and edge notes are often owners and deadlines

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text — replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}
