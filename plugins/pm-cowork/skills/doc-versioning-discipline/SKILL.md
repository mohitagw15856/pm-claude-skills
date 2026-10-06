---
name: doc-versioning-discipline
description: "Keep living documents trustworthy over time — the status header (draft/active/superseded) that tells readers what they're holding, the change-log-for-decisions inside the doc, the supersession chain that kills zombie versions, and the review-date heartbeat. Use when asked which version of this doc is current, our wiki is full of stale pages, set up doc lifecycle rules, or people keep following the old process doc. Produces the status-header standard, the in-doc change log, the supersession protocol, and the staleness heartbeat."
---

# Doc Versioning Discipline Skill

Documents don't announce their own death — the old process doc reads exactly as confidently as the new one, and readers follow whichever they found first. Trust in a doc system is a *metadata* problem: every living doc carries a status header (what am I holding — draft? active? superseded-by-X?), meaningful changes get logged inside the doc (decisions, not typo-fixes), superseded versions get killed properly (pointer left behind, per the [version-chaos-untangler](../version-chaos-untangler/SKILL.md) rule), and a review date gives every doc a heartbeat — because "current as of when?" is the question every reader silently asks.

## What This Skill Produces

- **The status-header standard** — the four-line block every living doc carries: status, owner, last-reviewed, supersedes/superseded-by
- **The in-doc change log** — decision-grade changes only, newest first, with the why
- **The supersession protocol** — how a doc dies: pointer installed, links redirected, search de-weighted where possible
- **The heartbeat** — review dates by doc class, and the stale-flag that fires when they lapse

## Required Inputs

Ask for these if not provided:
- **The doc population** — what kinds of living docs (processes, policies, onboarding, architecture) and roughly how many; discipline scales to the estate, and a 30-doc wiki needs less machinery than a 3,000-page one
- **The pain, specifically** — people following stale docs? Can't tell draft from decided? Two versions warring? The protocol emphasizes its actual complaint
- **The platform's powers** — does the wiki support labels, ownership fields, redirects? The standard uses native features where they exist and header text where they don't
- **The owners' reality** — who will actually review docs on the heartbeat; unowned discipline is a decree awaiting decay

## Framework: The Trust Rules

1. **The status header is the contract:** four lines at the top of every living doc — `Status: active · Owner: [name] · Last reviewed: [date] · Supersedes: [link] / Superseded by: —`. The reader learns in two seconds whether to trust, and the *absence* of the header becomes itself a signal ("no header = treat as unverified").
2. **Log decisions, not diffs:** the in-doc change log records changes that alter what a reader would *do* ("2026-07: approval threshold raised to $500 — see [decision]"), newest first, one line each. Platform version history holds the diffs; the log holds the meaning. A log cluttered with "fixed typo" trains readers to skip it.
3. **Supersession is an act, not an event:** the new doc names what it replaces; the old doc gets its content replaced by (or headed with) "Superseded by [link] on [date]" — never silently deleted (links break) and never left intact (zombies recruit followers). Inbound links get redirected in the same sitting.
4. **Drafts are quarantined by label:** anything unfinished says `Status: draft — do not follow` at top, and drafts live out of the main navigation until active. Half of "the doc was wrong" incidents are "the doc was a draft that escaped."
5. **The heartbeat scales by stakes:** process/policy docs review every 6–12 months, reference docs annually, the review being a 5-minute confirm-or-fix by the owner (update the date, or update the doc). Lapsed heartbeats flag the header (`⚠ review overdue`) — an honest "this may be stale" beats confident rot, and the quarterly sweep of overdue flags is the whole maintenance system.

## Output Format

# Doc Discipline: [space/team]

## The Status Header (standard)
[The four-line block · where it goes · the no-header-means-unverified norm]

## The Change Log Rule
[Decision-grade entries, newest-first, one line + why · diffs stay in platform history]

## Supersession Protocol
[The kill steps: pointer, redirects, same-sitting · the never-silent-delete and never-leave-intact rules]

## The Heartbeat
[Review cadence by doc class · the 5-minute review · the overdue flag · the quarterly sweep, owned by (role)]

## Quality Checks

- [ ] Every living doc class is covered by the header standard
- [ ] Change logs capture decisions with whys, not typo noise
- [ ] Superseded docs point forward and inbound links were redirected
- [ ] Drafts are labeled and out of main navigation
- [ ] The heartbeat has cadences, a flag, and a sweep owner

## Anti-Patterns

- [ ] Do not rely on file dates as status — modified-yesterday says nothing about trustworthy-today
- [ ] Do not delete superseded docs silently — broken links teach people to hoard copies, restarting the chaos
- [ ] Do not log typos in the change log — noise trains readers to skip the signal
- [ ] Do not let drafts share shelf space with actives — escaped drafts are the stealthiest wrong docs
- [ ] Do not install the discipline without the sweep — headers without heartbeats are just prettier rot

## Example Trigger Phrases

- "Which version of this doc is current?"
- "Our wiki is full of stale pages."
- "Set up doc lifecycle rules."
