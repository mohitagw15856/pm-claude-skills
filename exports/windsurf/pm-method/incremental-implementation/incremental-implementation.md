---
trigger: model_decision
description: "Build in small, individually-verified increments that each leave the system working — instead of big-bang changes that fail mysteriously at the end. Use when implementing multi-part features, refactoring anything load-bearing, making large mechanical changes, or when past work produced huge diffs that were wrong somewhere unfindable. Produces the same end state as the big bang, reached through verified checkpoints you can stop at, ship from, or roll back to."
---

# Incremental Implementation Skill

The big-bang failure is always the same story: three hours of changes, then "it doesn't work", then an hour of spelunking to find WHICH of forty edits broke it. Incremental work makes the *last five minutes* the only suspect, always. The discipline: every increment ends with the system working and verified — not "will work once the rest lands."

## What This Skill Produces

- The target end state, reached via increments that were each verified green
- **Stoppable points**: any checkpoint is shippable, pausable, or a rollback target
- A change history where every step's intent is legible

## Increment Method

1. **Slice vertically to working states, not horizontally to layers.** "Data layer, then logic, then UI" means nothing works until everything does. Slice so each increment is a *thin working slice*: one endpoint end-to-end · one case handled fully · one call-site migrated. The test for a slice: after it lands, can you demonstrate something that works?
2. **Separate behaviour-preserving from behaviour-changing — always.** The cardinal rule: refactor OR change behaviour in one increment, never both. Prepare-with-refactor (verify: everything still passes, nothing changed) → then the behaviour change lands small and legible. Mixing them makes every regression a two-variable mystery.
3. **Verify at every increment — the same way.** Green means: the relevant tests/build pass AND the previous increments' behaviour still holds. Establish the verification command once, run it every increment. An increment without a green check is just a chunk of a big bang wearing increments' clothes.
4. **Migrate parallel, then cut over, then remove.** For replacements: build the new alongside the old → migrate consumers one-by-one (each migration an increment) → only when the old has zero callers, delete it (its own increment). The both-exist window feels untidy; it's what makes every step reversible.
5. **When an increment goes red: fix or revert, within the increment.** Never pile the next increment onto a broken state "to fix it all together" — that's the moment incremental discipline dies and the mystery diff is born. The whole point is that red has one suspect; keep it that way.
6. **Size to risk.** Load-bearing/unfamiliar territory: smaller steps, verify obsessively. Well-trodden mechanical work: bigger steps are fine. If you can't predict what an increment will break, it's too big — split it.

## Output Format

### Increment plan: [target end state]

| # | Increment (thin working slice) | Type | Verified by | Stoppable? |
|---|---|---|---|---|
| 1 | | refactor-only / behaviour | [command/check] | ship / pause / rollback point |

**The both-exist window (if migrating):** [what coexists between steps N–M, and the cutover order]
**Standing verification:** `[the command run after every increment]`

*(during execution, per increment: what landed → verification result → next)*

## Quality Checks

- [ ] Every increment ends in a demonstrated working state — no "works once the rest lands"
- [ ] No increment mixes refactoring with behaviour change
- [ ] The same verification ran green after each increment
- [ ] Any increment could serve as a stopping point without leaving wreckage
- [ ] Red states were fixed or reverted before the next increment began

## Anti-Patterns

- [ ] Do not slice by layer — horizontal slices defer all verification to the end, which is the big bang with extra commits
- [ ] Do not "keep going" on a red state — stacking onto broken is how one bug becomes an archaeology dig
- [ ] Do not skip verification on 'trivial' increments — the trivial one is statistically where it breaks
- [ ] Do not delete the old path in the same increment as the last migration — cutover and removal are separate, reversible steps
- [ ] Do not let increments shrink into commit-theatre (40 one-line steps) — an increment is sized by verifiable meaning, not by smallness itself
