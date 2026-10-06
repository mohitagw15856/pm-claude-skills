---
name: brief-from-pile
description: "Turn a folder of accumulated documents into one decision-ready brief — the skim-map pass over the pile, the extraction against the brief's actual questions, the conflict reconciliation when documents disagree, and the provenance trail back to sources. Use when asked read all this and tell me what matters, synthesize this folder for the new lead, turn these 20 docs into a brief, or what does all this material actually say. Produces the pile map, the question-driven extraction, the reconciled brief with per-claim sources, and the didn't-read honesty ledger."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/brief-from-pile.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Brief From Pile Skill

"Here's the folder — get up to speed and tell me what matters" is a real task with a bad default: reading everything start-to-finish, drowning evenly, and producing a summary of *documents* instead of an answer to *questions*. The pile discipline inverts it: define the brief's questions first (what does the reader need to decide or understand?), map the pile cheaply (what each doc is, its date, its likely contribution — the [repo-map](../repo-map/SKILL.md) philosophy applied to documents), read *against the questions* (deep where they're answered, skim where they're not), reconcile the disagreements between documents (piles always disagree — dates usually explain it), and keep the provenance trail, because a brief that can't say "per the Q3 postmortem" gets re-derived by the first skeptic.

## What This Skill Produces

- **The pile map** — every document: what it is, date, author-context, and its likely contribution to the questions
- **The extraction** — findings organized by the brief's questions (never by source document), each with its citation
- **The reconciliation** — where documents conflict: the resolution (usually recency or authority) or the honest open question
- **The brief + the honesty ledger** — the deliverable, plus what was skimmed/skipped and what the pile simply doesn't contain

## Required Inputs

Ask for these if not provided:
- **The pile** — the documents (or their contents); the map works on what's actually there
- **The reader and their questions** — who is this for and what must they decide/understand ("the new lead needs: state of the project, open risks, why past decisions were made") — without questions, the output is a book report
- **The pile's history, if known** — why these documents accumulated, which are drafts vs. finals ([doc-versioning-discipline](../doc-versioning-discipline/SKILL.md) status often missing — the map infers and flags)
- **The deadline and depth** — an afternoon's brief reads differently than a week's; the map allocates reading time by expected contribution

## Framework: The Pile Rules

1. **Questions before reading:** the brief's 3–5 questions get written first — they convert reading from absorption into *search*, and they're the only defense against the pile's own emphasis (piles over-represent whatever got documented most, which is rarely what matters most).
2. **Map cheaply, then allocate:** ten minutes of skimming headers/dates/intros produces the map; reading time then allocates by expected contribution — the two load-bearing docs get real reads, the six status updates get scans, the duplicates get one representative. Even coverage is the pile's trap.
3. **Extract to questions with citations:** every finding files under a question with its source pinned ("risk: the vendor contract auto-renews in Sept [Contract-notes.doc, p2]") — the citation trail is what makes the brief *checkable*, and checkable briefs end debates that summarized ones start ([citation-hygiene](../citation-hygiene/SKILL.md) internal rules).
4. **Reconcile conflicts explicitly:** piles disagree — the deck says launch in Q2, the memo says Q3. Resolution order: recency (was the older superseded?) → authority (whose call was it?) → if unresolvable, the conflict *is a finding* ("sources disagree on the launch date; the latest signal is Q3 [memo, June] but no decision record exists"). Silent averaging of conflicts is how briefs launder confusion into false confidence.
5. **The honesty ledger closes it:** what was read deeply, skimmed, skipped (with reasons), and — most valuable — *what the questions needed that the pile doesn't contain* ("nothing documents why vendor B was rejected — recommend asking [person]"). The gaps are findings; the [session-handoff](../session-handoff/SKILL.md) stranger-test applies: the reader should never need to ask what the ledger should have said.

## Output Format

# Brief: [pile] → for [reader] — their questions: [list]

## The Pile Map
| Doc | What it is | Date | Contribution | Read depth |
|---|---|---|---|---|

## The Brief (by question)
**Q1: […]** — [findings with citations] 
**Q2: […]** — […]
[Conflicts: the reconciliation or the open-question finding]

## The Honesty Ledger
[Read/skimmed/skipped · what the pile doesn't contain · the ask-a-human list]

## Quality Checks

- [ ] The questions were written before the reading started
- [ ] Reading depth followed the map's contribution estimates
- [ ] Every finding carries its document citation
- [ ] Conflicts were reconciled by stated logic or reported as findings
- [ ] The ledger names the gaps and the skips honestly

## Anti-Patterns

- [ ] Do not read evenly — the pile's volume distribution is not its importance distribution
- [ ] Do not organize the brief by document — the reader has questions, not a filing fetish
- [ ] Do not average conflicting sources — reconcile or report; blend is betrayal
- [ ] Do not cite nothing — an uncited brief is one skeptic away from being re-done
- [ ] Do not hide what wasn't read — the ledger converts a limitation into a map for the reader

## Example Trigger Phrases

- "Read all this and tell me what matters."
- "Synthesize this folder for the new lead."
- "Turn these 20 docs into a brief."
- "What does all this material actually say?"
