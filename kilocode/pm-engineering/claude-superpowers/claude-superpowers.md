# Claude Superpowers Skill

Stop Claude from shipping the first thing it writes. Superpowers mode locks Claude into four stages — Plan, Isolate, Test First, Double Review — so that what it presents at the end is actually right.

The default problem: Claude sprints out of the gate, writes the whole thing in one shot, and it looks great — until someone runs it. It doesn't plan. It doesn't test. It doesn't verify. The result: code that breaks on edge cases, debugging rounds that burn tokens, and rework that costs more than doing it right the first time.

> **Credit:** Inspired by a skill from Nate Herk's YouTube channel — adapted and extended for this library.

---

## Required Inputs

No inputs required. Superpowers activates on command, then applies to whatever coding task follows.

---

## The Four Stages

### Stage 1 — Plan

Before writing a single line of code, Claude must produce a written plan and wait for user confirmation.

**Plan format:**

```
PLAN
════

TASK
[One-sentence restatement of what was asked. If anything is ambiguous, flag it here before proceeding.]

APPROACH
[2–4 sentences describing the implementation approach and key decisions. If there are multiple valid approaches, briefly explain why this one was chosen.]

FILES TO CREATE OR MODIFY
- [path/to/file.ts] — [what changes: create / modify / delete — one line reason]
- [path/to/file.ts] — [what changes]

EDGE CASES I WILL HANDLE
- [Edge case 1]
- [Edge case 2]
- [Edge case 3]

EDGE CASES I AM NOT HANDLING (out of scope)
- [Out of scope case — reason]

ASSUMPTIONS
- [Any assumption made where the requirements were unclear]

Confirm this plan before I start coding.
```

Claude must not proceed until the user says yes (or provides corrections). If the user corrects the plan, revise and re-confirm before starting.

---

### Stage 2 — Isolate

Claude works in isolation until the output is complete and reviewed. Nothing touches the main project until explicitly approved.

**Isolation rules:**
- If git is available: create a feature branch before making any changes. Branch name format: `superpowers/[task-slug]`
- If no git: note that changes are being made to a working copy and flag all modified files at the end for user review before they're considered "shipped"
- Do not modify files outside the scope defined in the plan unless the user explicitly expands scope during the session
- If new scope is discovered mid-task (e.g. a dependency needs to change), surface it: "This requires also modifying [X] — should I include that in scope?"

**On starting Stage 2, announce:**
```
ISOLATE
Working in isolation on branch: superpowers/[task-slug]
No changes will be considered final until Stage 4 review is complete.
```

---

### Stage 3 — Test First

Before writing the implementation, write the tests (or at minimum, define the expected behaviour as executable assertions).

**Test-first approach:**
1. Write tests that define the expected behaviour for the task
2. Write tests that cover each edge case identified in the plan
3. Run the tests — they should fail (implementation doesn't exist yet)
4. Confirm the tests are failing for the right reason before writing implementation
5. Write the implementation
6. Run the tests — they should now pass
7. If tests fail: fix the implementation, not the tests

**If the project has no test setup:** flag it and offer two options:
- Option A: Set up a minimal test harness before proceeding (recommended)
- Option B: Define the expected behaviour as a checklist of manual verification steps (faster but weaker)

**Test summary to show before writing implementation:**

```
TESTS WRITTEN
─────────────
File: [test file path]
Tests:
  ✗ [test description — covers: happy path]
  ✗ [test description — covers: edge case 1]
  ✗ [test description — covers: edge case 2]
  ✗ [test description — covers: error state]

All tests failing as expected. Starting implementation.
```

---

### Stage 4 — Double Review

After completing the code and running tests, Claude reviews its own work twice before presenting it. Neither review is a formality.

**Review 1 — "Does this match what was asked for?"**

Check the completed code against the original request and confirmed plan:
- Does it do everything that was asked?
- Does it handle all edge cases from the plan?
- Are there any mismatches between what was planned and what was built?
- Are there any assumptions baked in that weren't confirmed?

**Review 2 — "Is this good code?"**

Check for technical quality independent of the requirements:
- Obvious bugs or logic errors
- Missing error handling (especially at boundaries: API calls, file I/O, user input)
- Security issues (injection vulnerabilities, exposed secrets, missing auth checks)
- Readability: would another developer understand this in 6 months?
- Performance: any obvious inefficiencies on the critical path?
- Dead code or unused imports introduced

**Double Review output format:**

```
REVIEW 1 — CORRECTNESS
───────────────────────
✅ Handles [requirement 1]
✅ Handles [requirement 2]
✅ Edge case [X] covered
⚠️  [Issue found — what it is and what was changed to fix it]

REVIEW 2 — CODE QUALITY
────────────────────────
✅ Error handling present at all API boundaries
✅ No obvious security issues
⚠️  [Issue found — what it was and how it was fixed]
✅ Readable — no unexplained complexity

VERDICT: [Ready to present / Fixed N issues before presenting]
```

If issues are found in either review, fix them and note what was fixed. Present the corrected version, not the original draft.

---

## Activation Response

When the user triggers Superpowers mode, respond with:

```
Superpowers mode active.

I'll work in 4 stages for every coding task this session:
  1. PLAN    — Write a plan and wait for your confirmation before coding
  2. ISOLATE — Work on a branch; nothing ships until you approve
  3. TEST    — Write tests before the implementation
  4. REVIEW  — Review my own work twice before presenting it

What are we building?
```

---

## Output Structure

### Full task flow (all four stages)

```
PLAN
════
[Plan format as above]
Confirm this plan before I start coding.

---
[User confirms]
---

ISOLATE
Working in isolation on branch: superpowers/[task-slug]

TESTS WRITTEN
─────────────
[Test summary — all failing]
Starting implementation.

---
[Implementation runs]
---

REVIEW 1 — CORRECTNESS
───────────────────────
[Checklist]

REVIEW 2 — CODE QUALITY
────────────────────────
[Checklist]

VERDICT: Ready to present.

---

COMPLETE
════════
[Summary of what was built, files created/modified, how to run/test it]
Branch: superpowers/[task-slug] — merge when ready.
```

---

## CLAUDE.md Installation Text

After activating Superpowers for the session, provide the user with the exact text to add to their `CLAUDE.md` to make it permanent:

````
```
## Superpowers Framework

This framework is always active for coding tasks in this project.

### Stage 1 — Plan
Before writing any code: produce a written plan including task restatement, approach, files to create/modify, edge cases to handle, and assumptions. Wait for explicit user confirmation before proceeding.

### Stage 2 — Isolate
Work on a feature branch (superpowers/[task-slug]) or clearly flagged working copy. Nothing is considered shipped until the user approves after Stage 4.

### Stage 3 — Test First
Write tests before writing the implementation. Tests should fail before implementation, pass after. If no test setup exists, offer to create one or produce a manual verification checklist.

### Stage 4 — Double Review
After completing code, run two reviews before presenting:
- Review 1: Does this match what was asked for? Check against original request and plan.
- Review 2: Is this good code? Check for bugs, missing error handling, security issues, readability.
Fix any issues found. Present the corrected version. Show the review checklist.
```
````

Tell the user: "Add this to your CLAUDE.md and Superpowers will be active permanently for this project."

---

## Quality Checks

- [ ] Stage 1 plan was shown and user explicitly confirmed before any code was written
- [ ] Plan includes: task restatement, approach, files to modify, edge cases in scope, edge cases out of scope, assumptions
- [ ] Ambiguities in the original request were flagged in the plan (not silently assumed)
- [ ] Stage 2 isolation: a feature branch was created (or flagged as working copy if no git)
- [ ] Stage 3 tests were written before implementation — not after
- [ ] Tests were run and confirmed to be failing before implementation started
- [ ] Stage 4 Review 1 checked against the original request — not just against the plan
- [ ] Stage 4 Review 2 checked for bugs, error handling, security, readability — all four
- [ ] Issues found in either review were fixed before presenting — not flagged as "things to fix later"
- [ ] Final output shows what was built, which files were changed, and how to run/test it
- [ ] CLAUDE.md installation text was offered after activation

---

## Anti-Patterns

- [ ] Do not proceed to Stage 2 without explicit user confirmation of the plan — coding before confirmation defeats the entire purpose of the planning stage
- [ ] Do not write tests after the implementation and call it "test-first" — tests must be written and confirmed failing before the implementation starts
- [ ] Do not skip the Double Review when time is tight — the review is most valuable precisely when speed is the priority, because that is when errors are most likely
- [ ] Do not expand scope during Stage 2 without surfacing it — silent scope expansion produces code the user did not approve and may not want
- [ ] Do not mark both reviews as clean without actually performing them — a rubber-stamp review produces false confidence and defeats the framework

## Example Trigger Phrases

- "Enable superpowers mode"
- "Activate superpowers"
- "Turn on superpowers for this session"
- "Use the superpowers framework"
- "Make sure you plan before coding"
- "I want you to review your work before showing me"
- "Write tests first this time"
- "Slow down and plan it out before you start building"
- "Work on a branch and show me a plan before touching anything"
