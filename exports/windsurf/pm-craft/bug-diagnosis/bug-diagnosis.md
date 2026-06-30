---
trigger: model_decision
description: "Diagnose a bug systematically instead of guessing — reproduce, isolate, form hypotheses, and test them to root cause. Use when debugging, chasing a defect, an intermittent failure, or 'why is this happening?'. Produces a structured diagnosis: a reliable repro, the narrowed-down location, ranked hypotheses with how to test each, and the root cause + fix once found."
---

# Bug Diagnosis Skill

The slowest way to fix a bug is to start changing code and hope. This skill runs a disciplined diagnostic
loop: **reproduce it reliably, isolate where it happens, hypothesize why, and test the cheapest hypothesis
first** — narrowing until the root cause is proven, not guessed. It produces a fix *and* an explanation of why
the bug existed.

## Required Inputs

Ask for these only if they aren't already provided:

- **The symptom** — what's wrong: expected vs. actual behavior, error/stack trace, when it started.
- **Repro steps** — how to trigger it (or "can't reliably reproduce yet").
- **Context** — recent changes, environment, frequency (always / intermittent / specific inputs).
- **What's been tried** — so we don't repeat dead ends.

## Output Format

### Diagnosis: [bug]

**1. Reproduce** — the minimal, reliable steps to trigger it. If it's intermittent, the plan to make it deterministic (fixed input/seed, added logging, narrowed conditions). *No fixing until it reproduces.*

**2. Isolate** — narrow *where* it happens: bisect (git bisect / comment-out / binary search the input), check the boundaries (what's the last known-good point vs. first bad). State the smallest scope that still shows the bug.

**3. Hypotheses (ranked)** — likely causes, most-probable-and-cheapest-to-test first:

| Hypothesis | Why plausible | How to test it (the cheap check) | Verdict |
|---|---|---|---|

Test them in order; record what each rules in or out.

**4. Root cause** — the proven cause (not a symptom), with the evidence that confirms it.

**5. Fix & guard** — the fix, **a test that fails before it and passes after** (lock the bug out), and any nearby instances of the same mistake.

## Quality Checks

- [ ] A reliable reproduction exists before any fix is attempted
- [ ] The location is isolated by bisection/narrowing, not guessed
- [ ] Hypotheses are ranked by likelihood × cheapness and tested in order
- [ ] The stated cause is the *root* cause with evidence — not just the surface symptom
- [ ] A regression test is added that fails before the fix and passes after

## Anti-Patterns

- [ ] Do not start changing code before the bug reliably reproduces
- [ ] Do not fix the symptom and stop — trace to the underlying cause
- [ ] Do not change several things at once — you won't know what fixed it (or hid it)
- [ ] Do not skip the regression test — an unguarded bug comes back
- [ ] Do not ignore "what's been tried" — re-running dead ends wastes the loop

## Based On

Systematic debugging method (reproduce → isolate → hypothesize → verify) — Zeller's *Why Programs Fail* / scientific-method debugging.
