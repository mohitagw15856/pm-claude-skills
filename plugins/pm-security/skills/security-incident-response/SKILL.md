---
name: security-incident-response
description: "Run or document a security incident response — contain, eradicate, recover, and learn. Use when responding to a breach/compromise/security incident, writing an IR plan or runbook, or producing a post-incident report. Produces a phase-by-phase response (triage, contain, eradicate, recover, post-incident) with the immediate actions, comms, evidence-handling, and a blameless review. For incidents on systems you own or defend."
---

# Security Incident Response Skill

In a security incident, the order of operations matters: contain before you clean, preserve evidence before
you wipe, and communicate deliberately. This skill drives a structured response through the standard phases,
or documents one after the fact — with the immediate actions, decision points, comms, and a blameless
post-incident review. For systems you own or are authorized to defend.

## Required Inputs

Ask for these only if they aren't already provided:

- **What's happening** — the observed incident (malware, unauthorized access, data exfiltration, ransomware, account compromise), and how it was detected.
- **Scope so far** — affected systems/accounts/data, whether it's ongoing, entry point if known.
- **Environment & stakes** — what's at risk (PII, funds, availability), regulatory/notification obligations.
- **Resources** — who's responding, tooling/access available, and any IR plan already in place.

## Output Format

### Incident response: [incident]

**Severity & summary** — classify severity (e.g. SEV1–3) and state, in two lines, what's known and what's at stake.

**Phase-by-phase actions:**

1. **Triage & declare** — confirm it's a real incident, assign severity and an incident lead, start a timeline/log.
2. **Contain** — stop the bleeding *without* destroying evidence: isolate hosts, revoke sessions/keys, block IOCs, disable compromised accounts. Preserve forensic data (snapshots, logs, memory) before wiping.
3. **Eradicate** — remove the root cause: close the entry point, remove malware/backdoors, patch the exploited flaw, rotate all potentially exposed credentials/secrets.
4. **Recover** — restore from known-good, verify integrity, monitor closely for recurrence, return to normal service deliberately.
5. **Post-incident** — a **blameless** review: timeline, root cause, what worked/didn't, and action items to prevent recurrence.

**Communications** — who to notify and when: internal (leadership, legal), customers, and any **regulatory/breach-notification** obligations (with the clock — many have strict deadlines). Draft the holding line.

**Evidence & chain of custody** — what to preserve and how, in case of legal/law-enforcement involvement.

**IOCs & detection** — indicators of compromise seen, and detections/monitoring to add.

## Quality Checks

- [ ] Severity is classified and an incident lead + running timeline are established first
- [ ] Containment preserves evidence (snapshots/logs) before eradication/wiping
- [ ] Eradication addresses the root cause and rotates all potentially exposed credentials
- [ ] Recovery restores from known-good with heightened monitoring
- [ ] Communications cover internal, customer, and regulatory/breach-notification duties with timing
- [ ] The post-incident review is blameless and produces concrete prevention action items

## Anti-Patterns

- [ ] Do not wipe/rebuild before preserving forensic evidence — you lose the ability to understand the breach
- [ ] Do not skip credential rotation — attackers persist via stolen keys/tokens
- [ ] Do not go quiet on comms — silence with customers/regulators creates legal and trust damage
- [ ] Do not blame individuals in the review — blameless analysis surfaces the real systemic causes
- [ ] Do not declare "recovered" without monitoring for re-compromise
- [ ] Do not act on systems you don't own or aren't authorized to defend

## Based On

Incident-response practice (NIST SP 800-61 / SANS PICERL: prepare, identify, contain, eradicate, recover, lessons-learned).
