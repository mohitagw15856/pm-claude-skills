---
name: refactoring-plan
description: "Plan a safe, incremental refactor of messy code without changing behavior. Use when code needs restructuring, is hard to change, has grown tangled, or you want to clean it up before adding a feature. Produces a sequenced plan of small behavior-preserving steps, the safety net (tests/characterization) to add first, and the target structure — refactoring as a series of green commits, not a risky big-bang rewrite."
---

# Refactoring Plan Skill

Refactoring means improving structure **without changing behavior** — and the danger is doing it in one big
risky sweep. This skill plans the opposite: a safety net first, then a sequence of small, behavior-preserving
steps, each leaving the code green and committable. It separates refactoring from feature work, so you're
never doing both at once.

## Required Inputs

Ask for these only if they aren't already provided:

- **The code & the pain** — what's being refactored and *why* (hard to change, duplicated, slow, untestable).
- **Test coverage** — what tests exist around it (and the framework). If none, that's step zero.
- **The goal** — the target structure or what you want to make easy next (e.g. "so I can add payment provider #2").
- **Constraints** — what must not change (public API, behavior, performance), time budget.

## Output Format

### Refactoring plan: [target]

**Why & goal** — the current pain in one line, and what "better" enables.

**Safety net (do first)** — the tests that must exist before touching anything. If coverage is thin, add **characterization tests** that pin current behavior (even bugs) so you'd notice any change. *Don't refactor untested code blind.*

**Target structure** — a short sketch of where you're going (the shape, the seams, the names).

**Steps (small & sequenced)** — each step is behavior-preserving and independently committable:

| # | Step | Refactoring move | Stays green by | Commit after |
|---|---|---|---|---|
| 1 | … | (extract function / rename / introduce interface / move) | run tests | ✅ |

Order them so risk drops early and each step is reversible.

**Definition of done** — behavior identical (tests still green), the goal structure reached, no feature changes smuggled in.

## Quality Checks

- [ ] A safety net (existing or characterization tests) is established before any change
- [ ] Every step is behavior-preserving and independently committable
- [ ] Steps are small and sequenced so the code is green throughout
- [ ] Refactoring is kept separate from behavior/feature changes
- [ ] The target structure is explicit and tied to what it makes easier next

## Anti-Patterns

- [ ] Do not refactor and add features in the same commit — separate them
- [ ] Do not start without tests — add characterization tests first if coverage is thin
- [ ] Do not plan a big-bang rewrite — sequence small, reversible steps
- [ ] Do not change behavior and call it refactoring — behavior must stay identical
- [ ] Do not skip running tests between steps — that's the whole safety mechanism

## Based On

Refactoring discipline (Martin Fowler): behavior-preserving transformations, characterization tests, small steps.
