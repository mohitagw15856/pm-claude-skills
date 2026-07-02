---
name: interview-me
description: "Elicit the real requirements by interviewing the requester BEFORE building or writing anything — one question at a time, until the brief is buildable. Use when a request is vague ('make me a dashboard', 'write something for the board'), when past deliverables missed the mark, or when the user says 'interview me' / 'ask me questions first'. Produces a validated brief: goal, audience, constraints, success criteria, and explicit non-goals — then, and only then, the work."
---

# Interview Me Skill

The most expensive failure mode in AI-assisted work isn't bad output — it's excellent output *to the wrong brief*. This skill inverts the flow: before producing anything, interview the requester like a senior consultant would, one question at a time, until the brief can survive contact with the deliverable.

## What This Skill Produces

- A **validated brief**: goal, audience, constraints, success criteria, non-goals — confirmed by the requester
- Then the actual deliverable, built against that brief
- A visible **assumption ledger** for anything the interview couldn't settle

## When to Trigger (and when not)

Interview when: the request is one sentence for a multi-hour deliverable · the audience or purpose is unstated · two readings of the request lead to different artifacts · the stakes are high (board, customer-facing, irreversible). **Skip the interview** when the request is already specific, the pattern is established from earlier in the conversation, or the cost of a wrong draft is lower than the cost of five questions — say "I have enough to start" and start.

## Interview Method

1. **One question at a time.** A wall of seven questions gets skimmed answers to all and real answers to none. Ask, absorb, let the answer shape the next question.
2. **Sequence by decision-weight.** The order that converges fastest:
   - **The moment of use** — "who reads/uses this, and what are they doing in that moment?" (settles more downstream decisions than any other question)
   - **The definition of success** — "what happens if this works? what would make you send it back?"
   - **The constraints that bind** — length, tone, format, deadline, politics ("anything this must NOT say?")
   - **The prior art** — "has something like this been tried/shown before? what happened?"
   - **The non-goals** — "what's adjacent that we're deliberately not doing?"
3. **Interrogate the difference, not the topic.** Weak: "tell me more about the dashboard." Strong: "if this dashboard existed today, what decision would someone make differently this week?"
4. **Offer forks, not open fields, when the requester is fuzzy.** "Is this closer to (a) a live monitor the team glances at, or (b) a monthly readout for your boss?" — concrete options unstick vague askers far faster than "what do you envision?"
5. **Know when to stop.** 3-6 questions settles most briefs. Stop when a new answer wouldn't change what you'd build. Then **play the brief back** in ≤5 lines and get an explicit "yes, build that."
6. **Ledger what's still open.** Unresolved items become labelled assumptions in the deliverable, never silent guesses.

## Output Format

**During:** one question per turn, with a one-line reason when it isn't obvious ("asking because it changes the format entirely").

**The brief playback:**
> **Building:** [artifact] **for** [audience in their moment] **so that** [the decision/outcome].
> **Success:** … · **Constraints:** … · **Not doing:** …
> **Assumed (unconfirmed):** …
> Confirm and I'll build it.

## Quality Checks

- [ ] Questions were asked one at a time, each shaped by the previous answer
- [ ] The moment-of-use and success-definition questions were asked (or their answers were already known)
- [ ] The brief was played back and explicitly confirmed before production began
- [ ] Every unresolved item appears in the assumption ledger, labelled
- [ ] The interview stopped when answers stopped changing the build — no ritual questioning

## Anti-Patterns

- [ ] Do not fire a questionnaire — seven questions at once produces skim-answers and resentment
- [ ] Do not interview when the brief is already clear — process applied without judgment is friction
- [ ] Do not ask questions whose answers wouldn't change the deliverable — every question spends the requester's patience
- [ ] Do not start building mid-interview "to save time" — half-brief work anchors the requester to the wrong draft
- [ ] Do not skip the playback — the interview's value is captured only when the requester says "yes, that"
