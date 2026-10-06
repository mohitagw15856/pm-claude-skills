# Example: sprint-planning

## What this skill does

Structures a sprint plan: goal, capacity in points, a prioritised backlog table with owners and acceptance criteria, carry-overs, risks, and a timed planning-meeting agenda.

## How to trigger it

### Example 1: planning with real velocity data

**You say:**
> "Plan Sprint 22, 13 to 24 Oct. Team of 5, one on holiday for 3 days. Velocity last 3 sprints: 34, 29, 31. Candidate stories: SSO login (8), password reset flow (5), session audit log (5), admin role editor (8), rate limiting (3), two bug fixes (2 each)."

**Claude produces (excerpt):**

### Sprint 22: 13 October to 24 October

**Sprint Goal:**
> An admin can enforce SSO for their organisation and see who signed in.

**Team Capacity:** 25 story points available (based on 5 members, ~88% availability after holiday; rolling velocity 31, committing at 80%)

**Sprint Backlog:**

| Priority | Story | Points | Owner | Acceptance Criteria |
|---|---|---|---|---|
| 1 | SSO login | 8 | Marta | When an org has SSO enforced, password login is rejected with a clear message |
| 2 | Session audit log | 5 | Jon | When a user signs in, org admins see time, method and IP within 1 min |
| 3 | Password reset flow | 5 | Ade | When reset is requested, a single-use link expires after 30 min |
| 4 | Bug: duplicate invite emails | 2 | Jon | When an invite is resent, exactly one email is delivered |
| 5 | Rate limiting | 3 | Marta | When >10 login attempts/min, further attempts get 429 |

**Not committed:** admin role editor (8); it does not fit the 25-point commitment and has no acceptance criteria yet. Flagged, not squeezed in.

**Risks & Dependencies:**
- SSO depends on the identity provider test tenant → request access on day 1, fallback is mocked assertions
- Jon owns two items plus support rota → swap bug fix to Ade if the audit log slips

**Sprint Planning Agenda:**
- 00:00–00:10 Review sprint goal and capacity (25 of 31)
- 00:10–00:40 Walk backlog, confirm estimates; challenge the role editor's missing criteria

### Example 2: planning with no velocity history

**You say:**
> "New team, first sprint ever, 5 engineers, two weeks. How do we plan without velocity?"

**Claude produces (excerpt):**

**Team Capacity:** no velocity history exists, so start from the standard assumption of 20 to 30 points for a 5-person team and commit to the low end: **20 points**. The first sprint's job is to produce a real number, not to look fast.

**Risks & Dependencies:**
- All estimates are uncalibrated → keep stories at 5 points or smaller so one miss cannot sink the sprint
- Record actuals per story; Sprint 2 plans against measured velocity, not the assumption

## Tips for best results

- Give the last three sprints' velocity; the capacity line is calibrated from it, at 80% commitment.
- Include acceptance criteria per story, or expect the plan to flag the gaps as blockers.
- Say who is out and when; availability changes the points, not just the mood.

## Related skills

- `sprint-brief` for the one-page team-facing summary once the plan is agreed
- `user-story-writer` when candidate stories lack acceptance criteria
