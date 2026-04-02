---
name: architecture-decision-record
description: "Create an Architecture Decision Record (ADR) for any technical decision. Use when asked to document a technical decision, write an ADR, record an architecture choice, or capture why a technology or approach was selected. Produces a structured ADR with context, decision, consequences, and tradeoffs."
---

# Architecture Decision Record (ADR) Skill

This skill produces a complete Architecture Decision Record (ADR) following the Nygard format — the most widely adopted standard. ADRs document the reasoning behind significant technical decisions so future team members understand not just *what* was decided, but *why*.

## Required Inputs

Ask the user for these if not provided:
- **Decision title** (brief, e.g. "Use PostgreSQL as primary datastore")
- **Context** (what situation led to this decision needing to be made?)
- **Options considered** (at least 2; if only 1 is given, prompt for alternatives that were considered or ruled out)
- **Decision made** (which option was chosen)
- **Reason for choice**
- **Status** (Proposed / Accepted / Deprecated / Superseded)
- **Author and date**

## Output Structure

---

# ADR-[NNN]: [Decision Title]

**Date:** [YYYY-MM-DD]
**Status:** [Proposed / Accepted / Deprecated / Superseded by ADR-NNN]
**Author(s):** [Name(s)]
**Deciders:** [Who had final say — individual or team]

---

## Context

[3–6 sentences. Describe the situation, constraints, and forces at play that made this decision necessary. Include: the problem being solved, relevant system state, team constraints, timeline pressures, or non-negotiable requirements. Write as if explaining to someone joining the team 18 months from now who has no prior context.]

**Key constraints:**
- [Constraint 1: e.g. "Must be deployable on-premise for enterprise customers"]
- [Constraint 2: e.g. "Team has no prior Go experience"]
- [Add as many as are relevant]

---

## Options Considered

For each option, produce:

### Option [N]: [Name]

**Description:** [What this option is — 1–3 sentences]

**Pros:**
- [Pro 1]
- [Pro 2]

**Cons:**
- [Con 1]
- [Con 2]

**Why this was ruled out (if not chosen):** [Honest reason]

---

## Decision

**We will [chosen option].**

[2–4 sentences explaining the decision in plain language. This should be readable in isolation — someone should understand the decision from this paragraph alone without reading the full document.]

---

## Consequences

### Positive Consequences
- [What this decision enables or improves]
- [What risk it mitigates]

### Negative Consequences / Accepted Tradeoffs
- [What we're giving up or taking on as a result of this decision]
- [Technical debt or limitations introduced]
- [What must now be true for this decision to remain valid]

### Risks
- [What could cause this decision to be wrong in hindsight]
- [What would trigger us to revisit this decision]

---

## Implementation Notes

[Optional but valuable: any specific patterns, gotchas, or guidance for the team implementing based on this decision. Link to relevant tickets, RFCs, or design docs if applicable.]

---

## Review Date

[Optional: "This decision should be reviewed if [condition] — e.g. team grows beyond 20 engineers, or traffic exceeds 10M requests/day."]

---

## Quality Checks

- [ ] Context explains the *why* — not just the *what*
- [ ] At least 2 options are documented (including the rejected ones)
- [ ] Rejected options include honest reasons for rejection
- [ ] Consequences include *negative* consequences — no decision is consequence-free
- [ ] Decision is stated in plain language in the Decision section
- [ ] Risks section identifies what would invalidate this decision
- [ ] Written for someone with no prior context on this decision

## Example Trigger Phrases

- "Write an ADR for using [technology]"
- "Document our decision to [architectural choice]"
- "Create an architecture decision record for [topic]"
- "Help me write up why we chose [option] over [alternative]"
