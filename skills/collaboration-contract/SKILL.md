---
name: collaboration-contract
description: "Start a cross-team project with the collaboration contract that prevents the classic collisions — who decides what, how work flows between teams, the communication channels and cadence, and what done means — agreed before the first collision instead of during it. Use when asked kick off this cross-team project right, our two teams keep colliding, define how we'll work with the other team, or set up the partnership before we start. Produces the one-page contract: decision rights, interfaces, cadence, and the done-definition."
---

# Collaboration Contract Skill

Cross-team projects fail at the seams: each team runs on its own invisible rules ([working-agreements](../working-agreements/SKILL.md) are per-team; the *seam* has none), decision rights are assumed differently ("we thought design signed off; they thought we did"), and handoffs bounce because "done" meant different things. The collaboration contract is the seam's rulebook, one page, agreed at kickoff while everyone still likes each other: who decides what (the decision-rights table), how work crosses the boundary (the interface), how the teams talk (channel + cadence), and what done means per handoff — cheap to write on day one, expensive to reverse-engineer during the first fight.

## What This Skill Produces

- **The decision-rights table** — the project's likely decisions × who decides / who's consulted, the ambiguous ones forced now
- **The interface spec** — how work moves between teams: the handoff format, the request path, the done-definition per handoff type
- **The communication layer** — the shared channel, the sync cadence (as light as the project allows), the escalation path with names
- **The friction protocol** — what happens at the first collision: the two-lead conversation before anything ascends

## Required Inputs

Ask for these if not provided:
- **The project and the teams** — what's being built/done, which teams, their prior history (a scarred partnership needs the contract more and trusts it less — the tone adjusts)
- **The likely decisions** — the calls this project will force (scope, priority conflicts, quality bars, launch timing); the table pre-decides the deciders, and the awkward ones ("who wins when priorities conflict?") are exactly the ones to force now
- **The handoff shapes** — what actually crosses the seam (designs → build? data → analysis? approvals?); each shape gets its done-definition
- **The leads** — the two humans who own the seam; the contract is theirs to sign and theirs to enforce

## Framework: The Contract Rules

1. **Force the ambiguous decisions now:** the table lists the project's foreseeable calls with a decider each — and the ones both teams assume they own are the ones the kickoff must settle ("tie-breaks on priority: [name]"). Every ambiguity left standing is a scheduled fight with interest.
2. **Interfaces are formats plus done-definitions:** each handoff type gets its shape ("designs arrive as [format] with states covered; 'done' = the checklist passes") — because bounced handoffs are almost always definition mismatches, not quality failures. The [runbook-writer](../runbook-writer/SKILL.md) verify-per-step logic, applied to seams.
3. **Cadence as light as survivable:** one shared channel, one short sync at the necessary frequency (not the reassuring one — [meeting-cost-meter](../meeting-cost-meter/SKILL.md) math doubles across two teams), and the asks flowing per [async-update-format](../async-update-format/SKILL.md) shapes between syncs. The contract names it all so nobody invents parallel channels in week two.
4. **The friction protocol de-escalates by design:** first collision → the two leads talk within 48h, *before* either escalates upward ("no surprising each other's managers" is the clause that saves partnerships) → unresolved after a real attempt → the named tie-breaker. Written while calm, the protocol converts the first fight from a relationship event into a process event.
5. **The contract is one page and revisited once:** kickoff-signed, then reviewed at the first milestone ("which clause did we violate? fix it or change it" — the working-agreements revisit logic) — a living page, not a treaty. Longer contracts don't get read; unrevisited ones drift into fiction exactly when needed.

## Output Format

# Collaboration Contract: [project] — [team A] × [team B]

## Decision Rights
| Decision | Decides | Consulted | Notes |
|---|---|---|---|
[The forced-ambiguity rows marked ✓ settled]

## Interfaces
[Per handoff type: format · done-definition · the request path]

## Communication
[The channel · the sync (cadence + length) · between-syncs format · escalation names]

## Friction Protocol
[48h two-lead talk first · no-surprise-escalation clause · the tie-breaker · milestone review date]

## Quality Checks

- [ ] The both-teams-assume-they-own decisions were forced and settled
- [ ] Every handoff type carries a done-definition
- [ ] The cadence is justified by need, not reassurance
- [ ] The no-surprise-escalation clause is explicit with the 48h talk first
- [ ] The milestone review is dated

## Anti-Patterns

- [ ] Do not skip the contract because the teams get along — the contract is *why* they'll keep getting along
- [ ] Do not leave "who wins priority conflicts" unassigned — that's the fight, pre-scheduled
- [ ] Do not accept vibe-based done — bounced handoffs are definition gaps wearing quality-complaint costumes
- [ ] Do not escalate surprises — the 48h clause is the partnership's real load-bearing wall
- [ ] Do not write three pages — one page gets signed and remembered; three get filed and violated
