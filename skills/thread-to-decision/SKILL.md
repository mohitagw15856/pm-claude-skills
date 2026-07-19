---
name: thread-to-decision
description: "Land a sprawling chat thread on an actual decision — the summarize-and-fork move (positions restated, the question isolated), the decider-and-deadline injection, and the recorded close that ends the forty-message orbit. Use when asked this thread is going in circles, get a decision out of this discussion, summarize where we landed, or why do our threads never conclude. Produces the thread summary with positions attributed, the isolated decision question, the closure message, and the decision record."
---

# Thread To Decision Skill

Threads orbit because nobody performs the landing: forty messages in, three positions have emerged, two side-quests have spawned, and every participant believes a different thing was "basically agreed." The landing is a *move*, performable by anyone (not just the boss): summarize the positions fairly with names, isolate the actual question from the side-quests, inject the missing structure — a decider and a deadline ([async-instead](../async-instead/SKILL.md) closure rules) — and when the call lands, record it where decisions live, because a decision that exists only at message 47 doesn't exist.

## What This Skill Produces

- **The summary message** — the thread compressed: the question, the positions with names, the side-quests parked
- **The structure injection** — decider named (or proposed), deadline set, silence-meaning declared
- **The closure message** — the decision, its why, dissent acknowledged
- **The record** — the decision logged durably, linked back to the thread

## Required Inputs

Ask for these if not provided:
- **The thread** — the actual messages; summarizing positions requires reading them, and attribution requires care ("A argued X" must be fair enough that A nods)
- **The user's standing** — thread owner, participant, or the person with authority to name a decider? The moves flex — a participant *proposes* the structure ("suggest [name] calls this by Friday?"); an owner installs it
- **The real question** — threads braid several; the user's read on which one matters (the summary tests it against the thread)
- **Where decisions live** — the log, the doc, the channel pin; the record needs a durable home

## Framework: The Landing Rules

1. **Summarize before structuring:** the landing message opens by compressing fairly — "Where we are: the question is X. [A] and [B] favor option 1 (reasons); [C] raises the cost concern; the tangent about Y is real but separate." A summary that participants recognize buys the standing to impose structure; a partisan summary restarts the war with citations.
2. **Isolate the question, park the quests:** threads orbit partly because three questions share one thread — the landing names *the* question and explicitly parks the others ("Y deserves its own thread — starting it separately"). One thread, one decision.
3. **Inject the missing trio:** decider, deadline, silence-meaning — "Proposal: [name] decides by Thu EOD; comments until then; silence = can-live-with-it." When the user lacks authority to appoint, the *proposal* of structure almost always gets adopted, because everyone is tired of orbiting — the mover's advantage.
4. **Close with the why and the dissent:** the decision message states the call, two sentences of why, and names the road not taken ("going with 1; C's cost concern is real — we'll cap the spend at X to address it"). Acknowledged dissent ends threads; ignored dissent schedules the sequel.
5. **Record or relitigate:** the decision goes to the durable home (the decision log, the project doc) with a link back — and the thread gets the final message pointing there. Six weeks later, "wait, did we decide this?" gets a link instead of a rematch. This is the [decision-meeting-format](../decision-meeting-format/SKILL.md) record discipline, applied to the async venue where it's skipped most.

## Output Format

# Thread Landing: [topic] — [N] messages in

## The Summary Message (post this)
[The question · positions with names, fairly · parked side-quests · the structure proposal: decider, deadline, silence-meaning]

## The Closure Message (when decided)
[The call · the two-sentence why · dissent acknowledged with its accommodation if any]

## The Record
[The durable entry: decision, why, date, thread link · posted at (home) · the thread's final pointer message]

## Quality Checks

- [ ] The summary would be endorsed by each summarized participant
- [ ] Exactly one question survived; side-quests got explicit parking
- [ ] Decider, deadline, and silence-meaning were all injected
- [ ] The closure acknowledges dissent by name and content
- [ ] The record lives outside the thread with links both ways

## Anti-Patterns

- [ ] Do not structure before summarizing — unearned structure reads as a power move and gets litigated
- [ ] Do not summarize partisanly — one slanted attribution costs the whole landing
- [ ] Do not let three questions share the landing — braided threads orbit forever
- [ ] Do not close without the dissent line — smooth closes breed rough reopenings
- [ ] Do not leave the decision at message 47 — un-recorded decisions have a half-life of six weeks
