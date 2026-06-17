# Architecture Decision Record (ADR) Skill

This skill produces a complete Architecture Decision Record (ADR) following the Nygard format — the most widely adopted standard. ADRs document the reasoning behind significant technical decisions so future team members understand not just *what* was decided, but *why*.

## Required Inputs

Ask the user for these if not provided:
- **ADR number** (sequential number in your ADR registry — e.g. 012; or "next available" if unknown)
- **Decision title** (brief, e.g. "Use PostgreSQL as primary datastore")
- **Context** (what situation led to this decision needing to be made?)
- **Options considered** (at least 2; if only 1 is given, prompt for alternatives that were considered or ruled out)
- **Decision made** (which option was chosen)
- **Reason for choice**
- **Status** (Proposed / Accepted / Deprecated / Superseded)
- **Author and date**
- **Team context** (optional — team size, relevant experience, org constraints; helps calibrate formality and depth of the Context section)

## Output Format

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

[Include if the decision has non-obvious implementation gotchas, or if there are related tickets/RFCs implementers will need. Skip only if the decision is purely tooling selection with no implementation ambiguity.]

---

## Review Date

[Include unless the decision is permanent or self-evidently final. State a specific trigger condition — e.g. "Review if team grows beyond 20 engineers or traffic exceeds 10M requests/day" — not just "should be reviewed periodically".]

---

## Quality Checks

- [ ] Context explains the *why* — not just the *what*
- [ ] At least 2 options are documented (including the rejected ones)
- [ ] Rejected options include honest reasons for rejection
- [ ] Consequences include *negative* consequences — no decision is consequence-free
- [ ] Decision is stated in plain language in the Decision section
- [ ] Risks section identifies what would invalidate this decision
- [ ] Context section states the problem explicitly in its first 1–2 sentences (does not assume the reader knows what problem the team was solving)
- [ ] Each rejected option's "Why ruled out" explanation names a specific constraint or trade-off (not a circular statement like "didn't meet our requirements")

## Anti-Patterns

- [ ] Do not write an ADR after the decision has already been fully implemented and the team has moved on — ADRs written retrospectively often omit the real reasons and alternatives
- [ ] Do not list only the chosen option — rejected options with honest reasons are the most valuable part of an ADR for future readers
- [ ] Do not write consequences that are all positive — every architectural decision involves trade-offs; an ADR with no negative consequences was not scrutinised honestly
- [ ] Do not leave the status as "Proposed" indefinitely — an ADR that no one has approved is not guiding anyone's decisions
- [ ] Do not write context that assumes the reader already knows what problem was being solved — the context section exists precisely for readers who lack that background

## Usage Examples
- "Write an ADR for using [technology]"
- "Document our decision to [architectural choice]"
- "Create an architecture decision record for [topic]"
- "Help me write up why we chose [option] over [alternative]"
