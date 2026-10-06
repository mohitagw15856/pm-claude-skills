---
name: escalation-tree
description: "Design a support/incident escalation tree — who handles what, when it escalates, and to whom. Use when asked to design an escalation path, an escalation matrix, support tiers, an on-call escalation policy, or to fix 'tickets bounce around / nothing gets escalated in time'. Produces an escalation tree — tiers & ownership, severity definitions, time-based triggers, routing rules, contacts/roles, and the customer-communication cadence per level."
---

# Escalation Tree Skill

Escalation goes wrong two ways: things sit too long before someone senior is pulled in, or everything
gets escalated and senior people drown. A clear escalation tree fixes both — it defines the tiers, the
*severity* that sets the path, the *time triggers* that force escalation, and who owns each step. This
skill designs that, so the right person is on the right issue at the right time.

## Required Inputs

Ask for these only if they aren't already provided:

- **The context** — customer support, incident/on-call, or both.
- **The tiers/teams** available — tier-1/2/3, engineering on-call, management, exec.
- **Severity meaning** — what counts as critical vs. high vs. normal in your context.
- **Constraints** — hours of coverage, SLAs/contractual response times, key roles.

## Output Format

### Escalation Tree: [support / incident]

**1. Severity levels** — define each (SEV1/P1 … or Critical/High/Normal/Low) with concrete criteria — *what qualifies*, blast radius, and the **response & resolution targets** per level. Ambiguous severity is why escalation fails.

**2. The tiers** — who owns what:

| Tier | Owns | Can resolve | Escalates when |
|---|---|---|---|
| Tier 1 | first response, known issues | runbook items | unresolved in [time] or sev ≥ [x] |
| Tier 2 | deeper diagnosis | most issues | needs code/infra change |
| Eng on-call | code/infra | the system | — |

**3. The tree (routing)** — by severity, the path and the **time triggers**:
> SEV1 → page eng on-call immediately + notify manager; if unacked in 5 min → secondary; if 15 min → eng lead.
> Normal → tier-1; if unresolved in 1 business day → tier-2.

Show the branch logic clearly (who, after how long, to whom).

**4. Contacts & roles** — by **role** (not just names — names change): who fills each, primary/secondary, and how they're reached per severity (page vs. Slack vs. ticket).

**5. Customer communication** — the update cadence per severity (e.g. SEV1: status-page + update every 30 min; normal: reply within SLA). Who owns the customer comms vs. the fix.

**6. After** — for high-sev, the handoff to a postmortem (pair with [`incident-postmortem`](../incident-postmortem/SKILL.md)).

## Quality Checks

- [ ] Severity levels have concrete qualifying criteria + response/resolution targets
- [ ] Each tier's ownership and "escalate when" condition is explicit
- [ ] Escalation triggers are **time-boxed** (after N minutes/days), not "when needed"
- [ ] Routing is defined by role with primary/secondary and the contact method per severity
- [ ] Customer-communication cadence is specified per level, with an owner
- [ ] High-severity paths hand off to a postmortem

## Anti-Patterns

- [ ] Do not leave severity fuzzy — if "critical" is subjective, everything becomes critical (or nothing does)
- [ ] Do not write "escalate when needed" — time-box it so issues don't rot waiting on judgement
- [ ] Do not route to named people only — use roles with primary/secondary; people leave and go on holiday
- [ ] Do not forget customer comms in the tree — internal escalation without customer updates still feels like neglect
- [ ] Do not over-escalate everything — tiers exist so seniors see only what truly needs them

## Based On

Support & incident-management practice — severity matrices, tiered ownership, time-based escalation, on-call routing.

## Example Trigger Phrases

- "Design an escalation path."
- "Support tiers."
- "Fix tickets bounce around / nothing gets escalated in time."
