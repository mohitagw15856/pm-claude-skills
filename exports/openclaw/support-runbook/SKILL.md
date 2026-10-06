---
name: support-runbook
description: "Write a support runbook for handling a recurring issue type consistently. Use when asked to write a support runbook, a troubleshooting playbook for agents, a handling guide for a common issue, or a tier-1 response procedure. Produces a runbook — issue identification, triage/severity, step-by-step diagnosis & resolution, decision tree, when/how to escalate, and the customer-comms templates — so any agent resolves it the same way."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/support-runbook.html
metadata:
  {
    "openclaw": { "emoji": "🎧" }
  }
---

# Support Runbook Skill

When the same issue hits support repeatedly, every agent shouldn't reinvent the fix. A support runbook
makes the resolution consistent and fast: how to recognise it, how urgent it is, the diagnostic steps,
the decision tree, and exactly when to escalate (with what info). This skill writes that — turning tribal
knowledge into a procedure tier-1 can follow.

## Required Inputs

Ask for these only if they aren't already provided:

- **The issue type** — the recurring problem this runbook covers (e.g. "sync failures," "login loops," "billing discrepancy").
- **How to recognise it** — symptoms and how it's reported.
- **The resolution path(s)** — diagnostic steps and fixes (including the branches — "if X then…").
- **Escalation** — when it exceeds tier-1, who it goes to, and with what diagnostics.

## Output Format

### Support Runbook: [issue type]

**1. Identify** — the symptoms and how customers describe it (so agents recognise it from a vague ticket). What it's often confused with.

**2. Severity / triage** — how to rate urgency (is it down vs. degraded vs. cosmetic? affecting one user or many?) and the response-time expectation per level.

**3. Diagnose** — ordered steps to pinpoint the cause; what to check and what each result means. A **decision tree** where the path branches:
> If [symptom A] → likely [cause] → go to Fix 1.
> If [symptom B] → check [thing] → if yes, Fix 2; if no, escalate.

**4. Resolve** — the fix per branch, step by step, including what to tell the customer to do (and what *not* to touch).

**5. Escalate** — the exact trigger to escalate (time-boxed: "if unresolved in N min" or "if it affects >X users"), **who** to (team/tier), and the **diagnostics to attach** so the next tier doesn't start cold.

**6. Customer comms** — ready snippets for the key moments: acknowledging, mid-resolution update, resolved, and "escalating, here's what's next" (pair with [`support-macro`](../support-macro/SKILL.md)).

**7. Prevention note** — if this issue recurs a lot, the upstream fix/feature to flag to product/eng.

## Quality Checks

- [ ] Identification covers how customers actually describe it (not just the internal name)
- [ ] Severity/triage guidance sets response expectations
- [ ] Diagnosis is a clear ordered path / decision tree, not a wall of tips
- [ ] Escalation has an explicit trigger, target, and the diagnostics to attach
- [ ] Customer-comms snippets cover acknowledge / update / resolve / escalate
- [ ] Flags the upstream fix if the issue is frequent (so support feeds product)

## Anti-Patterns

- [ ] Do not write a tip list instead of an ordered path — agents need "do this, then this," with branches
- [ ] Do not leave escalation vague — "escalate if needed" means everyone escalates differently; time-box and specify the target + attachments
- [ ] Do not omit the customer comms — resolution + silence still feels like bad support
- [ ] Do not ignore severity — treating a full outage like a how-to question loses trust fast
- [ ] Do not let a high-frequency issue stay a runbook forever — flag the root-cause fix to product

## Based On

Support-operations practice — issue triage, decision-tree diagnosis, time-boxed escalation, and consistent agent procedures.

## Example Trigger Phrases

- "Write a support runbook."
- "Write a troubleshooting playbook for agents."
- "Write a handling guide for this common issue."
- "Write the tier-1 response procedure."
