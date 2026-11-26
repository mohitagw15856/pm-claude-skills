# Worked Example — Retrospective Analysis

A gold-standard run of this skill: a bruising sprint at a live-service game studio — 65% completion, a launch-week crash spike, four reopened tickets — turned into a blameless, data-grounded brief the team can act on in 45 minutes.

## The brief

Lumen Forge Games — a fictional mobile studio — runs *Starhaven*, a live-service RPG with seasonal events. Squad Tempest (9 people, two-week sprints) just finished Sprint 41, which collided with the launch of the "Tidefall" event. Planned: 26 tickets / 52 points. Completed: 17 tickets / 39 points. Carry-over: 9 tickets, of which 6 touch live-ops config. Unplanned work: 6 tickets (~22% of capacity) triaging a crash spike in the first 48 hours of Tidefall. Four completed tickets were reopened — all four were UI defects on tablet aspect ratios. Historical velocity average: 51 points. This is the third event launch in five that has blown up a sprint, and in the hallway the reopened tickets are being framed as "QA missed them." The producer needs the retro brief by tomorrow morning.

## The output

```
### Sprint 41 Retrospective Brief

**By the Numbers:**
- Planned: 26 tickets | Completed: 17 | Carry-over: 9 | Completion rate: 65%
- Unplanned work: 6 tickets (22% of capacity) — all Tidefall crash-spike triage
- Reopened after closing: 4 tickets — all 4 are tablet aspect-ratio UI defects
- Velocity: 39 points vs. 51 average (-24%)

**What the Data Suggests:**
1. The velocity dip is event-shaped, not team-shaped. Sprints 33 and 37 — the
   other two that overlapped event launches — came in at 41 and 38 points against
   the same ~51 average. Non-event sprints have been within ±10% of average all
   year. We plan event-launch sprints as if they were normal sprints; the data
   says they never are. This is the third time in five events.
2. Carry-over clusters on live-ops config, not on any person or discipline. 6 of
   9 carried tickets touch the live-ops config pipeline, which freezes during an
   event's first 48 hours — those tickets were arguably uncompletable the moment
   they were sprinted alongside a launch.
3. Reopened tickets share one root cause: no tablet devices in the pre-close
   check. All 4 reopens are aspect-ratio defects invisible on the phone profiles
   the team verifies against. The pattern is a coverage gap in our definition of
   done, not a review-effort problem — nothing any individual did or skipped.

**Discussion Prompts:**
- Start: reserving explicit crash-triage capacity in any sprint whose window
  overlaps an event launch — if we'd planned Sprint 41 at ~40 points, would we be
  calling this sprint a success right now?
- Stop: sprinting live-ops config tickets into the first week of an event launch
  while the config pipeline is frozen — 6 of our 9 carry-overs were blocked by
  design, not by effort. What would we have pulled instead?
- Continue: the crash-spike triage rotation from Tidefall week — incident
  response stayed with a rotating pair instead of swallowing the whole squad,
  which is why 17 tickets still landed. Do we make the rotation standing policy
  for event weeks?

**Suggested Experiment for Next Sprint (Sprint 42 window includes the Emberfall
launch):**
Plan Sprint 42 at 40 points (not 51), holding the remaining ~12 as a named
event-response buffer, and add one tablet aspect-ratio pass to the pre-close
check for UI tickets. Success metrics, measured at Sprint 42 retro: completion
rate ≥ 85% (vs 65%), and zero tickets reopened for aspect-ratio defects. If the
buffer goes unused, it converts to backlog pull-ins in week two — so the
experiment costs nothing if the launch is quiet.
```

## Why it's shaped this way

- **The reopened-ticket finding names a coverage gap, not a culprit** — the hallway framing was "QA missed them," but the anti-patterns forbid assigning blame ("observations must describe patterns, not people"); the data supports the reframe, since all four defects were invisible on the device profiles the *whole team's* pre-close check uses.
- **The velocity dip is contextualised against the event pattern before anyone can panic** — the quality checks require the velocity trend "in context (is this a one-off or a pattern?)"; comparing Sprints 33, 37, and 41 shows a repeating event-launch signature, which turns "the team got slower" into "our planning ignores a known force."
- **Carry-over is diagnosed by ticket type, not counted** — "identify the ticket type or cause, not just the count"; 6 of 9 carried tickets touching a config pipeline that was frozen by the launch converts carry-over from a velocity complaint into a scheduling insight, per the rule against treating carry-over as a velocity problem "without first identifying the root cause category."
- **Every Start/Stop/Continue prompt is welded to a Sprint 41 number and ends in a question** — the validation step demands prompts "specific to this sprint (not a recycled generic prompt)"; "Stop overcommitting" would be a vague category, but "stop sprinting live-ops config tickets into a launch's frozen first week — 6 of 9 carry-overs" names the exact behaviour the anti-patterns require.
- **The Continue prompt protects the thing that worked under pressure** — the triage rotation is why 22% unplanned work didn't become 50%; retros that only itemise failure teach teams to hide the saves.
- **The experiment is one sprint, two numbers, and a no-regret clause** — the anti-patterns bar experiments that "cannot be completed within one sprint"; a 40-point plan with a named buffer is testable at the very next retro against explicit metrics (≥85% completion, zero aspect-ratio reopens), and the unused-buffer-converts rule answers the inevitable "what if the launch is quiet?" objection in advance.
- **Facts and interpretation are kept in separate sections** — "By the Numbers" is uncontested arithmetic; "What the Data Suggests" is labelled as reading. That separation is the skill's core promise: the team spends retro time on solutions "rather than debating what happened."
