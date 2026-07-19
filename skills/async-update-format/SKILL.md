---
name: async-update-format
description: "Write status updates people actually read — the traffic-light-plus-narrative format (state first, story second), the blockers-are-asks rule, and the skimmable structure that respects a reader with thirty seconds. Use when asked write my weekly update, format our team's status posts, nobody reads my updates, or what goes in a good async check-in. Produces the update format with a filled example, the blockers-as-asks discipline, and the reader-time contract."
---

# Async Update Format Skill

Status updates die of two diseases: the activity log ("attended meetings, worked on the project") that says nothing, and the essay that says everything to readers with thirty seconds. The format that survives: **state first** (on-track / at-risk / blocked, with the one-line why), then the delta (what changed since last time — not what exists), then blockers written as *asks with names* ("blocked on X — need [person] to approve Y by Friday"), then the next milestone with its date. Skimmable in thirty seconds, expandable for the reader who wants more.

## What This Skill Produces

- **The format** — state → delta → asks → next, with length budgets per section
- **A filled example** — realistic, showing the delta-not-inventory discipline
- **The blockers-as-asks rule** — every blocker names a person and an action, or it's just weather
- **The reader-time contract** — the 30-second skim layer and the optional depth layer, separated

## Required Inputs

Ask for these if not provided:
- **The update's audience and altitude** — the manager (risks and asks), the team (coordination detail), stakeholders (outcomes) — one update rarely serves all three; the format flexes or splits
- **The cadence and the vehicle** — weekly in a channel? Biweekly in a doc? The format compresses for chat, breathes in docs
- **This period's raw material** — what actually happened, honestly including the nothing-moved weeks (the format has an honest shape for those too)

## Framework: The Format Rules

1. **State leads, unhedged:** 🟢 on-track / 🟡 at-risk / 🔴 blocked — plus one line of why. Readers triage by state; burying "we're going to miss the date" in paragraph three is how misses become surprises. A 🟡 with a clear why builds more trust than a 🟢 streak that flips red overnight.
2. **Delta, not inventory:** what *changed* since the last update — shipped, decided, learned, slipped. The inventory ("still working on X, Y continues") is noise wearing progress's clothes; a nothing-moved week says so in one line with the why, which is itself information.
3. **Blockers are asks with names and dates:** "blocked on legal review" is weather; "need [name] to approve the DPA by Thu or the launch slips a week" is an ask that can be actioned — by the reader, which is the point of telling them. Every blocker that stays nameless stays blocked.
4. **Next is a milestone with a date:** "next: ship the beta to 10 customers by the 28th" — the line that makes the *following* update verifiable, which is what makes the whole cadence honest. "Continue making progress" is the anti-milestone.
5. **Two layers, visibly separated:** the skim layer (state/delta/asks/next — the 30-second contract) and below a divider, the depth (details, links, numbers) for the readers who want it. Respecting the skimmer is what keeps updates read; the depth layer is what keeps them useful.

## Output Format

# Update: [project] — [date]

**State:** 🟢/🟡/🔴 — [the one-line why]
**Since last time:** [2–4 delta bullets — shipped/decided/learned/slipped]
**Asks:** [each: what, from whom, by when — or "none"]
**Next:** [milestone + date]

---
*Depth (optional):* [details, links, metrics for the interested]

## Quality Checks

- [ ] The state is first and its why fits one line
- [ ] Every bullet is a delta — no inventory restatements
- [ ] Every blocker names a person, an action, and a date
- [ ] Next is a dated milestone, verifiable next update
- [ ] The skim layer stands alone in under 30 seconds

## Anti-Patterns

- [ ] Do not log activity — attended, discussed, and continued are not deltas
- [ ] Do not hedge the state — 🟡 announced early is cheap; 🔴 discovered late is expensive
- [ ] Do not post nameless blockers — unaddressed asks are the sender's fault after the first update
- [ ] Do not write one essay for three audiences — flex the altitude or split the update
- [ ] Do not skip the nothing-happened weeks — silence reads as chaos; "no movement, because X" reads as control
