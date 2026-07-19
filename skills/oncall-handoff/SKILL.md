---
name: oncall-handoff
description: "Write a structured end-of-shift on-call handoff so the incoming engineer inherits state, not surprises. Use when asked to write an on-call handoff, oncall handover, shift handoff, pager handoff, or end-of-week SRE summary. Produces a handoff note with open incidents, watchlist alerts, in-flight investigations, recent changes, and one-line asks."
---

# On-Call Handoff Skill

Produces a compact end-of-shift handoff the incoming on-call can read in under two minutes and act on for the next seven days. The single job: transfer *state and attention*, not a novel.

## Working from a brief

Deliver the full handoff even from a thin brief — infer and label assumptions (never invent incident IDs, timestamps, service names, or dashboard URLs). If the outgoing engineer hasn't listed something, ask once, then move on with "unknown — confirm on takeover" placeholders.

## Required Inputs

Ask for (if not already provided), else label as unknown:

- **Rotation & window** — which rotation, dates and timezone of the shift ending, and dates of the shift starting.
- **Open incidents** — for each: ticket ID, severity, one-line status, next step, owner.
- **Silenced/flapping alerts** — alert name, why silenced, when the silence expires.
- **In-flight investigations** — hypotheses not yet closed out, where the notes live.
- **Recent risky changes** — deploys, feature flag flips, config rollouts in the last ~72h that might still bite.
- **Upcoming risky events** — planned deploys, freezes, marketing pushes, load tests.
- **Runbook or dashboard drift** — anything you touched that the runbook doesn't reflect yet.

## Output Format

```markdown
# On-Call Handoff — <rotation>
**Outgoing:** <name>  ·  **Incoming:** <name>  ·  **Window handed over:** <YYYY-MM-DD HH:MM TZ → YYYY-MM-DD HH:MM TZ>

## TL;DR (read this if nothing else)
- <3–5 bullets: the state of the world, what's smoking, what's calm>

## 🔴 Open incidents
| ID | Sev | Service | Status (one line) | Next step | Owner |
|---|---|---|---|---|---|
| <INC-…> | <S1/S2/S3> | <svc> | <what's happening now> | <what to do next> | <person> |

## 🟡 Watchlist (silenced / flapping / near-threshold)
- **<alert name>** — silenced until <ts>. Reason: <one line>. If it fires after that, do <X>.

## 🔎 In-flight investigations (no incident yet)
- **<Hypothesis in one sentence>** — evidence so far in <link>. Next probe: <one line>.

## 🚀 Recent risky changes (last 72h)
- <deploy / flag / config> — <what shipped, blast radius, rollback command or link>.

## 📅 Upcoming this shift
- <planned deploy / freeze / launch / load test> — <when, who to page if it goes sideways>.

## 🧭 Runbook / dashboard drift
- <thing the runbook still says vs. what's actually true>. Owner to fix: <person>.

## Asks of the incoming on-call
1. <one thing to check within the first hour>
2. <one thing to confirm before end-of-week>

## Contacts
- Escalation: <person / group>. Vendor tickets in play: <list>. Slack channels to lurk: <#…>.

---
_Not an incident report — for full context on any open item, follow the linked ticket._
```

## Quality Checks

- [ ] Every "open incident" row has a **next step** and an **owner** — a handoff without those is just a status page.
- [ ] Every silenced/flapping alert has an **expiry** or a **condition** for when it should stop being silenced — otherwise it will be silenced forever.
- [ ] Every "recent risky change" has a **rollback path** (command, PR revert link, or the person who knows how).
- [ ] Timestamps carry a timezone. "Tomorrow morning" is not a timestamp.
- [ ] TL;DR is readable standalone — the incoming on-call should be able to act on it before they finish coffee.
- [ ] No links or IDs are invented. Unknown values are marked "unknown — confirm on takeover", not fabricated.

## Anti-Patterns

- [ ] Do not write a chronological journal of the outgoing shift. The incoming engineer doesn't need your Tuesday afternoon; they need the state at 09:00 today.
- [ ] Do not bury the buried lede. A P1 belongs in TL;DR, not on line 47.
- [ ] Do not hand off "everything is fine" without saying what "fine" means — name the top three services you actively looked at and their SLO status.
- [ ] Do not include war stories, praise, or vent. This is a working document, not a retro.
- [ ] Do not close out an investigation with "resolved itself" — either name the fix, or move it to the watchlist with a trigger for re-opening.
- [ ] Do not silently drop items from the previous handoff. If a previous open item is now closed, list it under a one-line "Closed since last handoff:" so the incoming engineer knows you saw it.

## Example Trigger Phrases

- "Write an on-call handoff for this week"
- "Draft my SRE handover note"
- "Handoff pager to <name>"
- "End of shift summary"
- "Weekly on-call handover"
