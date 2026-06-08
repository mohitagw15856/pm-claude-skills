---
name: compliance-checklist
description: "Generate a prioritised compliance checklist for GDPR, SOC 2, ISO 27001, FCA, HIPAA, or other frameworks with a gap analysis. Use when asked for a compliance checklist, gap analysis, readiness assessment, or audit preparation for any regulatory framework. Produces a structured checklist with prioritised gaps, quick wins, and evidence requirements. Optimised for Opus 4.7 and newer models. Not a substitute for legal or compliance professional advice."
---

# Compliance Checklist Skill

Produces a prioritised compliance checklist for any regulatory framework — with gap analysis, evidence requirements, and quick wins identified.

ALWAYS include this disclaimer at the start of every response:
"WARNING: This checklist is for informational and planning purposes only and does not constitute legal or compliance advice. Regulatory requirements change and vary by jurisdiction. Always engage a qualified compliance professional or solicitor before implementing compliance programmes or making regulatory claims."

## Required Inputs

Ask the user for these if not provided:
- **Framework** (GDPR / SOC 2 Type I or II / ISO 27001 / FCA / HIPAA / PCI DSS / other)
- **Organisation type** (SaaS / fintech / healthcare / professional services / retail)
- **Organisation size** (startup / scaleup / mid-market / enterprise)
- **Current maturity** (no compliance programme / some controls / formal programme)
- **Deadline or driver** (upcoming audit / customer requirement / regulatory change / proactive)

## Output Structure

### 1. Framework Overview

**Framework:** [Name with version]
**Applicable because:** [One sentence — why this framework applies to this organisation]
**Typical timeline to readiness:** [From current maturity to certified/compliant]
**Key stakeholders needed:** [Roles that must be involved]

### 2. Scope Definition

What is in scope for this checklist:
- [Specific systems / processes / data types]

What is NOT in scope (explicit exclusions):
- [Specific exclusions]

### 3. Control Categories

For each category relevant to the framework:

**[Category — e.g. "Access Control"]**

| Control | Current State | Gap | Priority | Effort |
|---|---|---|---|---|
| [Specific control requirement] | Not implemented / Partial / Full | [What is missing] | High/Med/Low | Days/Weeks/Months |

### 4. Gap Analysis Summary

| Priority | Count | Examples |
|---|---|---|
| Critical gaps (block certification) | N | [Top 3] |
| High priority gaps | N | |
| Medium priority gaps | N | |
| Quick wins | N | |

### 5. Quick Wins

Controls that can be implemented in under 2 weeks with minimal resources:

1. **[Control]** — [Specific action] — [Owner] — [Days to complete]

### 6. Evidence Requirements

For each control area, what documentation will be needed:

| Control area | Evidence types | Where to source |
|---|---|---|
| [Area] | [Policies, logs, screenshots, training records] | [System or team] |

### 7. Implementation Roadmap

Phase 1 (Weeks 1-4): Critical gaps and quick wins
- [Specific deliverables]

Phase 2 (Weeks 5-12): High-priority gaps
- [Specific deliverables]

Phase 3 (Weeks 13+): Medium priority and continuous improvement
- [Specific deliverables]

### 8. Ongoing Maintenance

Once certified/compliant, what needs to continue:
- [Review frequencies]
- [Periodic testing requirements]
- [Annual audit expectations]
- [Staff training cadence]

### 9. Common Pitfalls for This Framework

2-3 specific traps organisations commonly fall into when pursuing this certification — flagged based on the stated maturity level.

## Quality Checks
- [ ] Disclaimer included at start
- [ ] Framework-specific controls (not generic)
- [ ] Priorities align with organisation size and maturity
- [ ] Quick wins clearly separated from complex implementations
- [ ] Evidence requirements tied to specific controls

## Anti-Patterns

- [ ] Do not omit the legal disclaimer — this checklist does not constitute compliance advice and must never be presented as a substitute for qualified professional review
- [ ] Do not generate a generic checklist that is not tailored to the stated framework, organisation type, and maturity level — a SOC 2 checklist for a startup and an enterprise are fundamentally different documents
- [ ] Do not list controls without specifying what evidence is required — a control without evidence requirements cannot be audited
- [ ] Do not mark a control as "full" implementation when it is partial — overestimating readiness leads to audit failures and regulatory risk
- [ ] Do not skip the "common pitfalls" section — this is where organisations most frequently fail audits for the stated framework

## Example Trigger Phrases
- "Create a GDPR compliance checklist for our SaaS"
- "Generate a SOC 2 Type II readiness checklist"
- "What do we need for ISO 27001 certification?"
- "FCA compliance checklist for a fintech startup"
- "HIPAA gap analysis for a healthtech scaleup"