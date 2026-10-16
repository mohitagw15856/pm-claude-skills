---
name: async-instead
description: "Convert a meeting into async work that actually decides — the doc-plus-deadline format that replaces the room, the comment-window rules, the decision-closure step that async usually fumbles, and the honest test for what still needs synchronous. Use when asked can this meeting be async, replace our status meeting with a doc, run this decision without a call, or async isn't working for us. Produces the conversion design, the async artifact format, the closure protocol, and the still-needs-a-room list."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/async-instead.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Async Instead Skill

"This meeting could have been an email" is true more often than the email would have worked — because async fails without structure: the doc nobody read, the thread that discussed forever and decided never. A working conversion replaces the meeting's *functions*, not just its slot: information transfer becomes a doc with a read-by date; discussion becomes a bounded comment window; decision becomes an explicit closure step with a named decider and a deadline — the part async most often fumbles and the part this skill enforces. And some things genuinely need rooms; the honest list is part of the design.

## What This Skill Produces

- **The conversion design** — the meeting's functions mapped to async mechanisms, with owners and deadlines
- **The artifact format** — the update-doc or decision-doc template that carries the load
- **The closure protocol** — how the async thread *ends*: the decider, the deadline, the decision recorded
- **The still-sync list** — what this meeting does that async can't, and the smaller room that remains

## Required Inputs

Ask for these if not provided:
- **The meeting being converted** — its functions in honest proportion (how much status vs. discussion vs. decision vs. the social glue)
- **The team's async maturity** — do docs get read here? Are comment deadlines respected? Conversion designs differ for teams with and without the muscle (and building the muscle starts smaller)
- **The tools** — where docs live, where comments happen, where decisions get recorded; the design uses the real stack
- **The failure history** — if async was tried and died, the autopsy (nobody read? never decided? discussion sprawled?) — the design patches the specific failure

## Framework: The Conversion Rules

1. **Map functions, not the slot:** status → the written update (structured, skimmable, due Wednesday); discussion → the comment window (open Thursday–Friday); decision → the closure step (decider decides Monday, recorded). A meeting is usually three functions braided; async unbraids them, and each gets its own deadline.
2. **The doc has a format and a due-date:** free-form updates sprawl; the template ([template-designer](../template-designer/SKILL.md) rules: prompting placeholders, lighter than the meeting) plus a hard read-by/comment-by window is what separates async-that-works from a shared doc with hopes.
3. **Closure is explicit or async fails:** every async decision names its decider and its deadline up front — "comments until Friday; [name] decides Monday; silence is assent" — because threads without closure rules discuss until the decision gets made in a hallway anyway, discrediting the whole conversion. Decisions land in the decision log, not just the thread.
4. **Silence must mean something, declared:** assent, abstention, or blocking-requires-speaking — chosen per decision's stakes and *stated in the doc*. Undeclared silence is why async decisions get relitigated by people who "never agreed."
5. **The still-sync list is honest:** genuine debate with high disagreement, sensitive feedback, creative jamming, relationship glue, and true emergencies — these keep a room, usually a smaller and shorter one than the meeting being converted ("the weekly hour becomes: async status + a 20-minute discussion slot that only fires when the comment window surfaced real conflict"). Conversions that pretend everything asyncs get reversed within a quarter.

## Output Format

# Async Conversion: [meeting] → [the design]

## Function Map
| Function (share of old meeting) | Async mechanism | Deadline | Owner |
|---|---|---|---|

## The Artifact
[The doc format with prompts · where it lives · the read/comment window]

## Closure Protocol
[Decider · deadline · silence-means · where decisions get recorded]

## Still Sync
[What keeps a room · the smaller residual slot and its fires-only-when trigger]

## Quality Checks

- [ ] Every function of the old meeting maps to a mechanism with a deadline
- [ ] The doc is templated and lighter than the meeting it replaces
- [ ] Every decision names decider, deadline, and silence-meaning up front
- [ ] Decisions land in a durable log, not just the thread
- [ ] The still-sync list is honest and its residual room is smaller, not parallel

## Anti-Patterns

- [ ] Do not convert by cancelling the meeting and hoping — the functions need explicit new homes
- [ ] Do not run async discussion without a window — unbounded threads are meetings that never end
- [ ] Do not skip the closure step — async that can't decide trains everyone to book rooms again
- [ ] Do not leave silence undefined — "nobody objected" and "nobody read it" look identical without the rule
- [ ] Do not async the genuinely synchronous — one failed forced conversion discredits ten good ones

## Example Trigger Phrases

- "Can this meeting be async?"
- "Replace our status meeting with a doc."
- "Run this decision without a call."
