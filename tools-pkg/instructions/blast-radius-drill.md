# Blast Radius Drill Skill

Before an agent runs unattended, one question decides whether that's brave or reckless: *if this agent were fully hijacked right now — every permission turned against you — what is the total damage?* Most people never ask it, and find the answer during the incident. The drill asks it on purpose: walk the worst case through every capability, then build the containment that bounds it — caps that halt runaway loops, a kill-switch that stops it fast, reversibility so a bad run is undoable, and isolation so the damage can't spread. The goal isn't zero risk; it's *bounded, recoverable* risk, known in advance.

## What This Skill Produces

- **The worst-case walk-through** — per capability, the maximum damage a fully-hijacked agent could do, made concrete
- **The containment controls** — the caps, halts, and isolation that bound each worst case
- **The reversibility audit** — which actions are undoable (and how) vs. irreversible (and thus gated or denied)
- **The recovery runbook** — the kill-switch, the "what did it do" audit trail, and the restore steps — decided while calm

## Required Inputs

Ask for these if not provided:
- **The agent's capabilities and environment** — from the [tool-permission-review](../tool-permission-review/SKILL.md) inventory; the drill runs the worst case through each grant
- **The autonomy scope** — how long it runs unattended, how many actions between human checks (longer + more = larger blast radius to contain)
- **What's reachable** — the accounts, systems, data, and money the agent's permissions can touch; the worst case is bounded by reach
- **The reversibility landscape** — what's backed up, version-controlled, or restorable vs. what's gone-once-done (sent email, spent money, deleted-without-backup, public posts)

## Framework: The Drill

1. **Assume total compromise, then walk each capability:** not "will it misbehave" but "it *is* hijacked — now what." File access → what could it read (secrets?) and destroy (which directories?). Send → who could it mail, how many? Shell → that's everything, so the drill for shell is "the whole machine and everything it can reach." Network → what data could leave. Money/actions → what could it spend or commit. The walk-through makes each abstract permission a concrete worst case: "it could email our entire customer list" is a sentence that changes configurations.
2. **Bound the loops with caps:** the runaway isn't always malicious — an agent stuck in a loop can send 400 emails, make 1,000 API calls, or delete a directory tree just as fast as a hijacked one. Every high-blast capability gets a cap (N actions/hour, M total, then halt-and-alert) so the worst case is bounded by the cap, not by how fast the agent runs. Uncapped autonomy is unbounded blast radius by definition.
3. **Reversibility is the safety net — audit it honestly:** sort every possible action into *undoable* (file changes under git, drafts not sent, sandboxed operations — a bad run is `restore`) and *irreversible* (sent email, spent money, public posts, deleted-without-backup, external API side effects). Irreversible actions either get denied for autonomous runs or gated to a human; reversible ones can flow, because the recovery cost is a restore. The drill's honesty: name what genuinely can't be undone and treat it accordingly.
4. **Isolation contains the spread:** the blast radius should stop at a boundary — an isolated environment (the [browser](../browser-agent-preflight/SKILL.md)/[file](../file-access-preflight/SKILL.md) sandbox), a dedicated account with limited reach, network egress limits. The difference between "the agent messed up its sandbox" and "the agent reached production" is isolation, decided before the run. A compromised agent contained to a scratch environment is a story; one with production reach is a postmortem.
5. **The recovery runbook exists before it's needed:** the kill-switch (the exact step to stop it *now* — revoke the token, kill the process, flip the toggle), the audit trail (so "what did it actually do" is answerable in minutes, not forensically), and the restore steps per reversible-damage type. Written while calm, because the version composed during a runaway at 2am is a panic, and a bounded-but-unrecovered incident is still an incident.

## Output Format

# Blast Radius Drill: [agent] — autonomy: [scope] · env: [reach]

## The Worst Case (per capability, assuming full compromise)
| Capability | Maximum damage | Concrete example |
|---|---|---|

## Containment Controls
[Caps per high-blast capability (rate + total + halt) · isolation boundary · egress limits]

## Reversibility Audit
**Undoable:** [actions → how] · **Irreversible:** [actions → denied or human-gated for autonomous runs]

## Recovery Runbook
[The kill-switch (exact step) · the audit trail (how to see what it did) · restore steps per damage type — written now]

## The Verdict
[Ready for autonomy / gate these first / not yet — with the bounded-worst-case stated]

## Quality Checks

- [ ] The worst case was walked assuming total compromise, made concrete per capability
- [ ] Every high-blast capability has a cap that halts
- [ ] Irreversible actions are denied or gated for autonomous runs
- [ ] An isolation boundary contains the spread
- [ ] The kill-switch, audit trail, and restore steps exist before go-live

## Anti-Patterns

- [ ] Do not skip the drill because "it'll probably be fine" — the worst case is found during the incident by those who don't run it
- [ ] Do not run uncapped autonomy — unbounded actions is unbounded blast radius, hijack or bug alike
- [ ] Do not let irreversible actions flow unattended — undoable can flow; sent/spent/deleted-forever gates or denies
- [ ] Do not skip isolation — the boundary is the difference between a bad sandbox and a production breach
- [ ] Do not improvise recovery — the kill-switch composed mid-runaway is a panic; write it while calm
