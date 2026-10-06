---
name: out-of-office-designer
description: "Design an out-of-office that actually protects the time off — the auto-reply that routes instead of apologizes, the coverage map behind it, and the pre-departure handoff that prevents the beach laptop. Use when asked write my out of office message, going on vacation what do I set up, cover my work while I'm out, or I always come back to chaos. Produces the OOO message with routing, the coverage assignments confirmed, the pre-departure checklist, and the re-entry buffer plan."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/out-of-office-designer.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Out Of Office Designer Skill

An out-of-office message is the visible 10% of a system whose real job is *making the absence survivable without you* — and most OOO setups are an apology with dates. The working version routes: every likely need maps to a named human who agreed to it, the auto-reply states who-for-what, urgent has a real path that isn't your phone, and the return date in the message is padded a day so re-entry isn't a 400-email ambush during back-to-back meetings.

## What This Skill Produces

- **The OOO message** — dates (padded), routing by need, the urgent path, no apology
- **The coverage map** — likely needs → named coverers, each *confirmed*, each briefed
- **The pre-departure checklist** — the handoffs, the expectations set, the deadlines moved before they become someone's surprise
- **The re-entry plan** — the buffer day, the triage-first rule, the coverage debrief

## Required Inputs

Ask for these if not provided:
- **The dates and the real reachability** — genuinely offline, reachable-for-emergencies (define emergency), or working-remotely-lite (a different message entirely)
- **The likely needs** — what people usually come to them for; each needs a coverer or an explicit "waits until I'm back"
- **The coverers** — names, and whether they've actually agreed (a coverage map nobody consented to is fiction)
- **In-flight work** — what's mid-stream, with deadlines that land during the absence

## Framework: The Protection Rules

1. **Route, don't apologize:** "I'm away [dates]. For X, contact [A]; for Y, [B]; everything else I'll answer from [padded return date]." No "sorry for any inconvenience" — absence is normal; the message's job is routing, and apology invites exception-seeking.
2. **Pad the return date:** message says you're back a day later than reality — the buffer day absorbs the backlog triage, the coverage debrief, and re-entry without meetings stacked on hour one. This is the single highest-value line in the design.
3. **Coverage is consent plus briefing:** each coverer gets a one-page brief per handoff (state, next step, escalation line, the do-not-decide list) — see the handoff discipline in [session-handoff](../session-handoff/SKILL.md); the same rules apply to humans.
4. **Urgent gets one narrow path:** a single named person who can reach you for a *defined* emergency ("production down, deal collapsing — not scheduling"). No path = your phone becomes the path; too-wide path = everything is urgent.
5. **Pre-departure beats remediation:** the week before: deadlines landing mid-absence get moved or delegated *now*, stakeholders get told *before* the auto-reply tells them, and the last day ends with the handoff briefs sent — not started.

## Output Format

# OOO Design: [dates] — reachability: [mode]

## The Message
[The auto-reply, verbatim: padded dates · routing lines · the urgent path · zero apology]

## Coverage Map
| Likely need | Coverer (confirmed?) | Briefed | Escalation |
|---|---|---|---|

## Pre-Departure Checklist
[Deadlines moved · stakeholders pre-told · briefs sent · calendar blocked for the buffer day]

## Re-Entry
[Buffer day: triage-first (the email-triage pass), coverage debrief, no meetings before noon]

## Quality Checks

- [ ] The message routes by need and contains no apology
- [ ] The stated return date is padded by a day
- [ ] Every coverer confirmed and holds a brief
- [ ] "Urgent" is defined, with one named path
- [ ] Mid-absence deadlines were moved before departure, not discovered after

## Anti-Patterns

- [ ] Do not write dates-and-sorry — an OOO without routing just redirects everything to your return
- [ ] Do not name coverers who haven't agreed — that's delegation by ambush
- [ ] Do not leave "urgent" undefined — undefined urgency defaults to everything
- [ ] Do not return to a full calendar — the buffer day is part of the vacation's ROI
- [ ] Do not check email "just a little" on a genuinely-offline plan — one reply resets everyone's expectations of your absence

## Example Trigger Phrases

- "Write my out of office message."
- "Cover my work while I'm out."
- "I always come back to chaos."
