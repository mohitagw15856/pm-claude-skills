---
name: incident-postmortem
description: "Write a structured incident postmortem or post-incident review. Use when asked to write a postmortem, incident report, P1/P2 review, outage report, or RCA (root cause analysis). Generates a blameless postmortem with timeline, root cause, contributing factors, impact summary, and action items."
---

# Incident Postmortem Skill

This skill produces a complete, blameless incident postmortem document following industry-standard format. Output is ready to share with engineering teams, leadership, and affected stakeholders.

## Required Inputs

Ask the user for these if not provided:
- **Incident title / ID**
- **Severity** (P1 / P2 / P3 or SEV1 / SEV2 / SEV3)
- **Date and duration** of the incident
- **What happened** (rough notes are fine — the skill will structure them)
- **Services or systems affected**
- **Customer impact** (how many users, what was degraded)
- **How it was detected**
- **How it was resolved**
- **Initial thoughts on root cause**
- **Action items already identified** (optional)

## Output Structure

---

# Incident Postmortem: [Incident Title]

**Incident ID:** [ID]
**Severity:** [P1/P2/P3]
**Date:** [Date]
**Duration:** [Start time → Resolution time — total duration]
**Status:** [Resolved / Monitoring / Ongoing]
**Author:** [Leave blank for user to fill]
**Last updated:** [Date]

---

## Executive Summary

[3–5 sentences. Describe what happened, who was affected, and what was done to resolve it. Written for a non-technical stakeholder. No jargon. No blame.]

---

## Impact

| Dimension | Details |
|---|---|
| **Users affected** | [Number or percentage] |
| **Services degraded** | [List affected services] |
| **Business impact** | [Revenue, SLA breach, support tickets, etc. if known] |
| **Duration** | [Total time from first detection to full resolution] |

---

## Timeline

List events in chronological order. Each entry: `[HH:MM UTC] — [What happened. Who did what. What changed.]`

Rules for timeline entries:
- Use passive or system-focused language — avoid "X made a mistake"
- Include: first symptom, detection, escalation, hypothesis tested, fix applied, confirmation of resolution
- Note time between key events (e.g. "22 minutes between detection and escalation")

---

## Root Cause

**Primary root cause:** [One clear sentence. Technical but plain. "A misconfigured deployment config caused..."]

**Contributing factors:**
- [Factor 1 — e.g. lack of canary deployment meant change hit 100% of traffic immediately]
- [Factor 2 — e.g. alert threshold was set too high to catch the initial degradation]
- [Factor 3 — add as many as are relevant]

**Why did our existing safeguards not prevent this?**
[Honest paragraph explaining why monitoring, tests, or processes didn't catch this earlier. This is where blameless analysis matters most — focus on system gaps, not individual failures.]

---

## Detection

- **How was it first detected?** [Customer report / automated alert / internal monitoring / manual observation]
- **Time from incident start to detection:** [X minutes]
- **Should we have detected this faster?** [Yes / No — and why]

---

## Resolution

**What fixed it?** [Clear description of the actual fix — one paragraph]
**Why did this work?** [Brief technical explanation]
**Was there a temporary mitigation before full resolution?** [Yes/No — describe if yes]

---

## Action Items

| # | Action | Owner | Due Date | Priority |
|---|---|---|---|---|
| 1 | [Specific, testable action] | [Team or person] | [Date] | P1/P2/P3 |

Rules for action items:
- Each action must be specific enough to close as "done" or "not done" — no vague items like "improve monitoring"
- Distinguish between: **Prevent recurrence** (fix the root cause), **Improve detection** (catch it faster next time), **Improve response** (resolve it faster next time)
- Assign a real owner — not "team" or "TBD" if avoidable
- Flag P1 actions as items that block the incident from being marked fully closed

---

## What Went Well

[3–5 honest observations about the response. Include: fast collaboration, good runbooks used, effective escalation, clear communication. This section builds team confidence and reinforces good habits.]

---

## Lessons Learned

[3–5 key insights from this incident that are worth sharing beyond this team. Write these as transferable lessons — e.g. "Our runbook for database failover didn't account for read-replica lag. All runbooks involving database failover should be reviewed."]

---

## Communication Log

[Optional — list external communications sent: status page updates, customer emails, support responses. Include timestamps.]

---

## Quality Checks

- [ ] Timeline has no blame-focused language
- [ ] Root cause is specific (not "human error")
- [ ] Contributing factors explain the systemic gaps
- [ ] Every action item has an owner and due date
- [ ] "What went well" section is genuine, not token
- [ ] Executive summary is readable by non-technical leadership

## Example Trigger Phrases

- "Write a postmortem for the [incident name] outage"
- "Help me write a P1 incident report"
- "Generate an RCA document for [service] going down on [date]"
- "Draft a blameless postmortem from these notes: [paste notes]"
