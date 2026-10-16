---
name: cross-examine-me
description: "Stress-test a decision or claim through a sharp, fair Q&A — the questions a good lawyer or skeptical friend would ask before you commit. Use when asked to cross-examine me, ask me hard questions about this, interrogate my plan, or make me defend this. Produces a sequenced line of probing questions (from clarifying to challenging to the killer question), space to answer, and a debrief on where your answers were strong, evasive, or exposed a gap — so weaknesses surface in private before they surface in public."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/cross-examine-me.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Cross-Examine Me

The fastest way to find the weak point in a decision is to be questioned about it by someone sharp. This runs that cross-examination: a sequence of questions that starts by clarifying, moves to challenging, and builds to the one question you least want to answer — then debriefs where you held up and where you cracked. Better to face it here than in the meeting, the pitch, or the argument.

## What This Skill Produces

- **A question sequence** — clarifying questions first, then challenging ones, building to the killer question
- **Room to answer** — it asks, you respond (interactively, or it models likely weak answers)
- **The debrief** — where your answers were solid, where they were evasive or hand-wavy, and where a real gap got exposed
- **The question to prepare for** — the one you struggled with, which others will ask too

## Required Inputs

Ask for these if not provided:
- **The decision or claim** — what's being examined
- **The context** — where you'll have to defend it (a meeting, an investor, yourself)
- **Your reasoning** — your current case for it
- **How hard to push** — gentle rehearsal or hostile grilling

## Framework: Clarify, Challenge, Corner

1. **Start by clarifying.** Open questions establish what's actually being claimed and pin down vagueness — you can't examine mush.
2. **Escalate to challenge.** Move to the questions that test the reasoning, the evidence, and the assumptions.
3. **Build to the killer question.** Sequence toward the single hardest question — the one whose honest answer most threatens the position.
4. **Make them answer.** Don't answer for them where interaction is possible; the value is in them articulating (or failing to).
5. **Debrief honestly.** Say where the answers were strong, where they dodged, and where a gap opened — and flag the question to prepare a real answer for.

## Output Format

### Cross-examining: [the decision/claim] · for [context]

**Clarifying**
1. [question] 2. [question]

**Challenging**
3. [question] 4. [question]

**The killer question**
5. [the one you least want to answer]

*(Answer each — or I'll model the likely weak answers.)*

**Debrief:** strong where [x] · evasive/weak where [y] · gap exposed at [z].
**Prepare a real answer for:** [the question that got you].

## Quality Checks
- [ ] Questions are sequenced clarify → challenge → killer
- [ ] They genuinely probe the reasoning and assumptions
- [ ] The person is made to answer (not answered for, where interactive)
- [ ] The debrief honestly flags evasions and gaps
- [ ] It identifies the hardest question to prepare for

## Anti-Patterns
- **Softball questions** that are easy to answer.
- **Jumping to the killer question** with no build-up.
- **Answering for the person** and skipping the value.
- **A debrief that's all reassurance** and no exposed gaps.

## Example Trigger Phrases
- "Cross-examine me on my decision to change careers."
- "Ask me hard questions about this business plan."
- "Interrogate my argument before I present it."
- "Make me defend this — what would a skeptic ask?"
- "Grill me on whether this is a good idea."
