# Example: Agent Project File

## What this skill does
Set up the project file an AI agent keeps for work that runs over days or weeks: the goal, the definition of done, milestones, the current state, decisions made, open questions, and the exact point to resume from after an interruption.

## How to trigger it

### Example 1: A two-week documentation overhaul
**You say:**
> "My agent will rewrite our API docs over two weeks: 40 endpoints, new examples, a migration guide. Check in Tuesdays and Fridays."

**Claude produces (excerpt):**

**Goal:** every public endpoint documented with a working example. **Done when:** the docs PR is merged and the migration guide is published.

| Milestone | Due | Done when | Status |
|---|---|---|---|
| Inventory 40 endpoints | Tue wk1 | list approved by you | drafted |
| First 20 endpoints | Fri wk1 | PR opened, examples pass | waiting on someone else (review) |
| Migration guide | Fri wk2 | merged | blocked: needs the deprecation dates from the platform team |

**Resume from here:** read the review comments on PR #12, then update endpoints 11 to 20.

---

### Example 2: From a one-line request
**You say:**
> "Set up my agent to work on this over the next two weeks"

**Claude produces (excerpt):** the full output with sensible defaults marked [inferred], and the questions that would sharpen it at the end.

## Tips for best results
- Give one or two concrete facts (an amount, a date, a name); the defaults get much tighter
- Read the "Assumptions and gaps" lines first; they are where the output is guessing
- Keep the result somewhere your agent can read it every time

## Related skills
- `end-of-day-report`: the daily status the file feeds
- `weekly-rollup`: the weekly summary
- `standing-orders`: the agent's general rules
