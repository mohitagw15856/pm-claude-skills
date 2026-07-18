---
aliases: ["Repair Request Escalation"]
tags: [pm-skills, skill]
skill: repair-request-escalation
description: "Get a landlord to actually fix things — the repair request that creates a record, the escalation ladder from reminder to habitability leverage, and the jurisdiction-flagged map of tenant remedies with their prerequisites. Use when asked my landlord won't fix anything, write a repair request, how long can they ignore a broken heater, or what are my options if repairs never happen. Produces the documented request, the severity triage, the escalation ladder with letters, and the remedies decode with the do-not-DIY warnings."
---

# Repair Request Escalation Skill

The difference between a repair that happens and one that doesn't is rarely the landlord's character — it's whether the request exists as a dated record with a severity the law recognizes, and whether the tenant knows the next rung. Texts evaporate; written requests start clocks. This skill builds the record, triages by habitability (a broken heater in winter and a dripping faucet live under different rules), and decodes the remedy options — with their strict prerequisites flagged, because the tenant remedies that exist in most jurisdictions also have procedural tripwires that convert self-help into an eviction case.

## What This Skill Produces

- **The repair request** — written, dated, specific, severity-framed, sent through the channel that counts
- **The severity triage** — habitability-level / major-function / quality-of-life, because the ladder's speed depends on it
- **The escalation ladder** — reminder → formal notice → the leverage rungs (inspectors, remedies) with letters drafted
- **The remedies decode** — repair-and-deduct, rent escrow/withholding, code enforcement, lease-termination-for-uninhabitability — each as a *category* with its typical prerequisites and its risks, verify-locally flagged

## Required Inputs

Ask for these if not provided:
- **The problem and its history** — what's broken, since when, what's been reported how (verbal counts for nothing going forward; the skill converts history into the first letter's recital)
- **The severity facts** — does it affect heat, water, electricity, locks, leaks, mold, pests? Season and household (a baby in an unheated unit changes the framing and the urgency)
- **The lease and the landlord shape** — repair clauses, the official notice channel, individual owner vs. management company
- **The tenant's risk posture** — month-to-month vs. long lease, rent-current or not (remedies generally require current rent — a load-bearing prerequisite), and how much relationship they want to preserve

## Framework: The Record-and-Ladder Rules

1. **Severity sets the clock:** habitability items (heat, water, sewage, electrical hazards, security) carry short legal repair windows in most places; function items (appliances, fixtures the lease includes) carry "reasonable time"; cosmetic items carry patience. The request names its category explicitly — "this affects the unit's habitability" is a phrase that moves files.
2. **The record is the request:** dated writing, specific ("the bedroom heater has not worked since [date]; overnight temps have been [X]"), photo-attached, sent via the lease's official channel *and* kept with proof. Every later rung cites this letter by date.
3. **Escalate by elapsed time, in writing:** rung 2 at the window's edge — "requested [date], [N] days elapsed, this is a habitability item; I need a repair date by [date]" — firm, factual, zero adjectives. Anger is a gift to the other side's file.
4. **The leverage rungs are real and procedural:** local code/housing inspectors (free, official, and their reports are evidence), then the jurisdiction's tenant remedies. Each remedy is presented as a category with its typical tripwires: repair-and-deduct usually has caps and notice prerequisites; withholding usually requires escrow, not just not-paying; termination-for-uninhabitability has the highest bar. **Every one is flagged: verify the local version before acting — done wrong, these become the landlord's eviction case.**
5. **Retaliation has a name:** many jurisdictions prohibit retaliatory eviction/rent-hikes after complaints — noted as a flagged category, both as reassurance and as one more reason everything lives in writing. Genuinely dangerous conditions (gas, sewage, no heat in freezing weather, exposed wiring) route to emergency lines and inspectors *today*, not to the ladder.

## Output Format

# Repair Escalation: [issue] — severity: [habitability / function / quality-of-life]

## The Request (rung 1)
[The letter verbatim: recital of history · the specific problem with dates and photos referenced · the severity framing · the asked-for repair window · sent-via note]

## The Ladder
| Rung | Trigger (elapsed time) | The move | Letter |
|---|---|---|---|
[Reminder · formal notice · inspector call · remedies consult — each drafted or scripted]

## Remedies Decode (verify locally before any of these)
[Each category: what it is · typical prerequisites (current rent, notice, caps, escrow) · the risk if done wrong · when it's the right rung]

## The Emergency Carve-Out
[The conditions that skip the ladder entirely, and where they route]

> Tenant remedies and their prerequisites are jurisdiction-specific and procedurally strict — verify the local rules or get tenant-rights help before acting on any remedy rung. Not legal advice.

## Quality Checks

- [ ] Severity is triaged and named in the request itself
- [ ] Every rung triggers on elapsed time from the dated record, not on frustration
- [ ] Every remedy carries its prerequisites and its done-wrong risk, verify-locally flagged
- [ ] Dangerous conditions route to the emergency carve-out, not the ladder
- [ ] All letters are factual, dated, and courtroom-readable

## Anti-Patterns

- [ ] Do not advise rent-withholding or deduct-and-repair as a first move or without the local prerequisites — it's the classic self-inflicted eviction
- [ ] Do not let the record start today when history exists — the first letter recites every prior request with dates
- [ ] Do not write heat into the letters — the broken heater carries the argument fine
- [ ] Do not assert repair windows or statutes as numbers — categories, flagged verify-locally
- [ ] Do not ladder a gas leak — emergencies have their own first rung and it's today

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text — replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}
