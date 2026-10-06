---
name: delta-briefing
description: "Make a recurring brief report what changed since the last edition instead of restating everything. Use when a weekly or monthly report keeps repeating itself, when setting up a scheduled monitor or digest, or when asked to make a recurring update delta-aware. Produces a changes-first brief plus the state record the next run will diff against."
---

# Delta Briefing Skill

The failure mode of every recurring report is that edition 6 reads like edition 5. This skill structures a recurring brief around the *delta*: read the last edition's state, diff the world against it, lead with what changed, and save state for the next run.

## What This Skill Produces

- A **changes-first brief**: new / changed / resolved / unchanged-but-watched
- A **state record** (compact, machine-readable) that the next edition diffs against
- An explicit **"nothing changed" edition format** — short, honest, and still useful

## Required Inputs

Ask for (if not already provided):
- **The brief's subject and audience** (competitive landscape, product metrics, account health…)
- **The previous edition or state record** — if none exists, this run is the baseline: say so in the output and produce the first state record
- **Current sources** for this cycle
- **Where state lives** between runs (a file next to the brief, a Brain folder — see BRAIN.md if using this library's memory)

## Delta Method

1. **Load last state.** Parse the previous state record (or previous edition if that's all there is). List the items it tracked and their status.
2. **Re-observe.** Gather this cycle's facts from the sources — independently of the old state, so removals are caught too.
3. **Diff into four buckets:**
   - **New** — present now, absent last time
   - **Changed** — tracked before, materially different now (state what moved, old → new)
   - **Resolved / gone** — tracked before, no longer present or no longer a concern
   - **Watching** — unchanged but still worth tracking (compressed to one line each)
4. **Judge materiality.** A delta makes the brief only if the audience would act differently knowing it. Trivia goes to the state record, not the brief.
5. **Write state for next time.** Every tracked item, its current status, the date, and the sources read.

## Output Format

### [Brief name] — [date] (edition [n], previous: [date])

**TL;DR:** [1-2 sentences: the most consequential delta, or "no material changes"]

**New since last edition**
- [item] — [why it matters, one line]

**Changed**
- [item]: [old] → [new] — [implication]

**Resolved**
- [item] — [how it closed]

**Still watching** *(one line each)*
- [item] — [status]

<details>
<summary>State record (for the next run)</summary>

```json
{ "edition": n, "date": "YYYY-MM-DD", "sources": ["..."],
  "items": [ { "id": "...", "status": "...", "note": "..." } ] }
```
</details>

**If nothing material changed:** say exactly that in three lines — TL;DR ("no material changes"), what was checked, next edition date. Do not pad.

## Quality Checks

- [ ] The brief opens with the delta, not with background the audience read last time
- [ ] Every "Changed" item shows both the old and the new value
- [ ] Removals were checked by re-observing, not just re-confirming last edition's list
- [ ] A state record exists at the end, complete enough that the next run needs no other memory
- [ ] The baseline edition (no previous state) is labelled as a baseline, not presented as a delta

## Anti-Patterns

- [ ] Do not restate unchanged items at full length — one line in "Still watching" or nothing
- [ ] Do not fabricate a delta to make a quiet cycle look productive — "nothing changed" is a valid, valuable edition
- [ ] Do not diff against memory or vibes — only against the stored state record
- [ ] Do not let the state record and the brief disagree — the record is written from the brief's facts
- [ ] Do not track everything forever — items resolved two editions ago leave the state record

## Example Trigger Phrases

- "Our weekly report keeps repeating itself."
- "Only tell me what changed since last week."
- "Set up a scheduled monitor."
- "Make this recurring update delta-aware."
