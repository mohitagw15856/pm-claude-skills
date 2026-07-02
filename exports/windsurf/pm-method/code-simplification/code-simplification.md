---
trigger: model_decision
description: "Simplify code that works — remove speculative abstraction, dead flexibility, and needless indirection while keeping behaviour identical and verified. Use after a feature lands ('now simplify it'), when AI-generated code arrives over-engineered, when a file has grown hard to follow, or as the cleanup pass before review. Produces a smaller, flatter version with identical behaviour, plus a ledger of what was removed and why it was safe. For finding bugs use code-review-checklist / ai-code-review — this skill assumes it works and makes it simple."
---

# Code Simplification Skill

Code accretes defensive complexity: abstractions for futures that never came, options nobody passes, indirection that once had a reason. AI-generated code arrives pre-accreted — interfaces with one implementer, config objects with nine unused knobs. Simplification is its own pass with its own rule: **behaviour identical, verified; complexity removed, listed.**

## What This Skill Produces

- The simplified code — smaller, flatter, same behaviour
- A **removal ledger**: each simplification, why it was safe, and what future it forecloses (honestly)
- Verification evidence that behaviour held

## What to Hunt (in order of payoff)

1. **Speculative generality** — the interface with one implementation, the parameter always called with the same value, the config option no caller sets, the "pluggable" thing nothing plugs into. Rule: *the future that justified it must be on a roadmap, not in an imagination.* YAGNI is a removal warrant.
2. **Indirection without insulation** — layers that only forward: the wrapper that calls one function, the factory returning one type, the event fired for one listener sitting next door. Each hop costs a reader a jump; collapse hops that don't isolate change.
3. **Dead and duplicate paths** — unreachable branches, handled-nowhere flags, the local re-implementation of a utility that exists (`grep` before believing anything is unique).
4. **Cleverness taxing readers** — the nested ternary, the reduce that should be a loop, the regex doing four jobs. Rewrite for the next reader; "fewer characters" is not "simpler".
5. **Flatten control flow** — guard clauses over nested ifs; early returns over else-pyramids; splitting the function that needs a comment per section into functions named by those comments.

## The Safety Discipline (what makes this different from vandalism)

- **Behaviour-preserving means verified**, not asserted: run the full relevant suite before AND after; if coverage is thin over the code being simplified, *add the pinning test first* — simplifying untested code is refactoring blind.
- **One hunt-class per pass** where the code is load-bearing (remove speculation, verify; collapse indirection, verify) — mirrors incremental-implementation's rule.
- **Chesterton's fence check** on anything weird: `git log`/`blame` the strange bit before deleting it. Some "needless" complexity is a bug fix wearing an odd shape — if the history shows a fix, keep it and comment WHY it's shaped that way instead.
- **Public surface needs a wider net**: simplifying exported/shared code means checking callers across the codebase, not just the local file.

## Output Format

### Simplification: [target]

**Verification:** [suite/build run before → after: identical] · pinning tests added: [n or none-needed because…]

**Removal ledger**
| What was removed/flattened | Class | Why safe | Future foreclosed (honest) |
|---|---|---|---|

**Kept deliberately:** [the weird-but-load-bearing bits, with their Chesterton evidence]
**Size:** [LOC/complexity before → after]

## Quality Checks

- [ ] Full verification ran before and after — identical behaviour, evidenced
- [ ] Thinly-tested code got pinning tests before simplification
- [ ] Every removal states the future it forecloses — "none" must be argued, not assumed
- [ ] Strange code was history-checked before deletion (Chesterton's fence)
- [ ] The result is simpler for a READER, not just shorter

## Anti-Patterns

- [ ] Do not simplify and change behaviour in one pass — the moment behaviour shifts, this became a rewrite without a spec
- [ ] Do not delete weirdness without checking why it's weird — some of it is a production incident's scar tissue
- [ ] Do not confuse terse with simple — code golf raises the reading tax this skill exists to cut
- [ ] Do not remove flexibility that's actually on the roadmap — YAGNI applies to imagined futures, not planned ones
- [ ] Do not skip the ledger — invisible simplification is indistinguishable from unexplained deletion in review
