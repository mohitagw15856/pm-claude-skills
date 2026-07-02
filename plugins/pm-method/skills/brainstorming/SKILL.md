---
name: brainstorming
description: "Run a real brainstorm — divergent generation without judgment, then convergent selection with explicit criteria — instead of listing ten obvious ideas and calling it creativity. Use when asked to brainstorm, generate ideas or options, explore a solution space, or name something. Produces a genuinely wide option set (including the weird tail), then a shortlist selected against named criteria with the rejects preserved."
---

# Brainstorming Skill

Asked to brainstorm, a model produces ten reasonable ideas that any competent person would list — which is retrieval, not ideation. Real brainstorming has two phases with a wall between them: **diverge** (volume, no judgment, deliberately weird) then **converge** (explicit criteria, honest scoring). This skill enforces the wall.

## What This Skill Produces

- A **divergent set**: 20-40 ideas spanning distinct strategies, not ten variants of one idea
- A **convergent shortlist**: 3-5 selected against criteria named *before* scoring
- The **reject ledger**: what was set aside and why — half the value, always preserved

## Required Inputs

Ask for (if not already provided):
- **The problem or prompt**, and what an idea must accomplish to count
- **Constraints that are real** (budget/tech/brand) vs assumed — challenge one assumed constraint deliberately
- **What's been tried or rejected already** (avoids retreading; also reveals the requester's hidden criteria)

## Divergent Phase (no judgment permitted)

1. **Quota past the obvious.** The first 8-10 ideas are what anyone would say — produce them fast to exhaust them, then keep going; ideas 15-30 are where non-obvious lives.
2. **Rotate strategies, don't rephrase.** Generate down distinct axes, a few ideas per axis:
   - **Inversion** — what would make the problem *worse*? Reverse each answer
   - **Extremes** — the $0 version; the $10M version; the version shipping tomorrow
   - **Transplant** — how does a hospital / game studio / street market solve the equivalent?
   - **Constraint removal** — if [assumed constraint] vanished, what becomes possible?
   - **Actor shift** — the user solves it themselves / the community solves it / it never occurs at all (prevention)
   - **Combination** — force-merge two earlier ideas
3. **Keep the weird tail.** 20% of the set should make the requester slightly uncomfortable. A brainstorm with no bad ideas didn't explore the edges — the weird ones exist to stretch the space, and occasionally to win.
4. **No evaluative language in this phase.** Not even "(probably impractical)". Judgment leaks kill volume.

## Convergent Phase (judgment, but named)

5. **Write criteria before looking back at the list.** 3-4 max, from the requester's actual situation (impact, feasibility-this-quarter, differentiation, reversibility…). Criteria chosen after re-reading the list get reverse-engineered to bless a favourite.
6. **Score coarsely** (✅/➖/❌ per criterion). False precision on creative options is theatre.
7. **Shortlist 3-5 with one line each on why.** Include one *wildcard* — highest-variance, criteria-marginal — labelled as such.
8. **Preserve the rejects with reasons.** "Rejected: needs a partnership we don't have (yet)" is a future idea with a trigger condition; a deleted reject is a repeated brainstorm next quarter.

## Output Format

### Brainstorm: [prompt]

**Divergent set ([n] ideas, by strategy):** [grouped list — no judgments attached]

**Criteria (named before selection):** 1) … 2) … 3) …

| Shortlisted | [C1] | [C2] | [C3] | Why it made it |
|---|---|---|---|---|
*(3-5 rows, incl. 🃏 one wildcard)*

**Reject ledger:** [idea → the criterion it failed → what would revive it]

## Quality Checks

- [ ] ≥20 ideas spanning ≥5 distinct strategies — not variants of two ideas
- [ ] The weird tail exists (ideas that risk sounding silly)
- [ ] Zero evaluative language in the divergent set
- [ ] Criteria were stated before scoring, and trace to the requester's situation
- [ ] Rejects preserved with revival conditions

## Anti-Patterns

- [ ] Do not judge while generating — one "(unrealistic)" mid-list collapses the whole divergent phase
- [ ] Do not produce ten polished-obvious ideas and stop — that's a search result, not a brainstorm
- [ ] Do not let the criteria appear after the list has been read — that's rationalising a favourite
- [ ] Do not delete the rejects — the ledger is half the artifact
- [ ] Do not ship the shortlist without the wildcard — a fully-safe shortlist means the exercise removed everything it was for
