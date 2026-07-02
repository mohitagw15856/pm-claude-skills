---
name: writing-plans
description: "Write an executable work plan BEFORE starting a complex task — decomposed steps with verification points, risks pre-named, and explicit stop conditions — so execution becomes checking boxes instead of improvising. Use when a task will take many steps, when asked to plan before doing, when previous attempts sprawled or stalled, or before delegating work to subagents. Produces a plan document another agent (or future you) could execute without re-deriving the thinking. Pairs with executing-plans."
---

# Writing Plans Skill

Complex work fails in a predictable way: start confidently, discover mid-flight, improvise, sprawl, lose the thread. A written plan converts discovery into a *phase* instead of a surprise. The bar for the plan: someone else — a colleague, a subagent, you next week — could execute it without asking what you meant.

## What This Skill Produces

- A **plan document**: goal, ordered steps with per-step verification, risks with tripwires, and stop conditions
- Sized to the work: three lines for an hour's task, a page for a project — ceremony proportional to risk

## Plan Method

1. **State the goal as an outcome test.** Not "refactor the auth module" but "auth module passes the existing suite with the session logic isolated in one file". If you can't write the done-test, the task isn't understood yet — that's the finding; plan the *investigation* instead.
2. **Decompose to independently-verifiable steps.** Each step has: the action · the **verification** (how you'll KNOW it worked — a command, a check, an observable) · what it produces for later steps. A step you can't verify is two steps hiding as one, or a guess.
3. **Order by information value.** Front-load the steps that could invalidate the plan: the risky unknown, the dependency check, the spike. Discovering step 7's blocker on step 1 is a cheap plan revision; on step 7 it's sunk work. Never plan happy-path-first when a hard unknown exists.
4. **Pre-name the risks with tripwires.** For each: what could go wrong → the *observable* early signal → the planned reaction (adapt/rollback/stop-and-ask). Risks named in advance get noticed; risks discovered in flight get rationalised.
5. **Write the stop conditions.** Explicitly: what makes this plan invalid ("if the API doesn't support X, stop — the approach changes") and what must NOT be done even if convenient ("no schema changes in this pass"). Stop conditions are what let an executor be autonomous safely.
6. **Right-size the ceremony.** One-way-door or multi-session work: full plan. Routine multi-step task: a checklist with verifications. If writing the plan takes longer than the task, you're planning a task, not a project — collapse to a checklist.

## Output Format

### Plan: [goal as outcome test]

**Done means:** [the test that proves completion]
**Not doing:** [explicit non-goals for this pass]

| # | Step | Verification (how I'll know) | Produces |
|---|---|---|---|
| 1 | [highest-information step first] | | |

**Risks & tripwires**
| Risk | Early signal | Reaction |
|---|---|---|

**Stop conditions:** [what invalidates the plan · what must not be done regardless]
**Est. checkpoints:** [where to pause and reassess if multi-session]

## Quality Checks

- [ ] The goal is a testable outcome, not an activity
- [ ] Every step has a concrete verification — no "then integrate it"
- [ ] The riskiest unknown is in the first third of the plan
- [ ] Stop conditions exist and include at least one "must not do"
- [ ] Another agent could execute this without asking what you meant

## Anti-Patterns

- [ ] Do not plan happy-path-first when a hard unknown exists — sequence to kill the plan early if it's killable
- [ ] Do not write steps without verifications — unverifiable steps are where sprawl enters
- [ ] Do not bury discoveries — when execution reveals the plan is wrong, revise the PLAN visibly (see executing-plans), don't improvise around it
- [ ] Do not gold-plate a checklist task into a project plan — ceremony must earn its cost
- [ ] Do not treat the plan as the deliverable — a beautiful plan for the wrong goal fails the interview-me test; brief first, plan second
