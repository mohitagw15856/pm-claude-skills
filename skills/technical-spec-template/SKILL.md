---
name: technical-spec-template
description: "Create structured technical specification documents that bridge product requirements and engineering implementation. Use when writing a tech spec, engineering spec, system design doc, or API specification. Produces a complete spec with problem statement, proposed solution, data model, API design, alternatives considered, security considerations, testing plan, and rollout strategy."
---

# Technical Spec Template Skill

Write technical specifications that engineers actually read — clear problem framing, unambiguous requirements, explicit decisions, and documented trade-offs.

## Required Inputs

Ask the user for these if not provided:
- **Feature or system description** (what needs to be specced)
- **Related PRD or product brief** (if available)
- **Engineering reviewers** (whose sign-off is needed)
- **Known constraints** (technical limitations, security requirements, performance targets)

## When to Write a Tech Spec

Write a tech spec when:
- The feature requires changes to 2+ systems
- There are significant architectural decisions to make
- More than one engineer will work on the implementation
- The feature has security, privacy, or compliance implications
- Estimated effort is >5 story points

Skip the spec for trivial bug fixes or 1-2 hour changes.

---

## Technical Spec Output Format

### Technical Specification — [Feature Name]

**Author:** [Name]
**Status:** Draft | In Review | Approved | Implemented
**Created:** [Date] | **Last Updated:** [Date]
**Reviewers:** [Eng Lead, Architect, PM, Security if needed]
**Related PRD:** [Link] | **Jira Epic:** [Link]

---

#### 1. Problem Statement
> [2–3 sentences. What problem are we solving and why now? No solution language here.]

#### 2. Goals & Non-Goals

**Goals (in scope):**
- [Specific, measurable outcome]
- [Specific, measurable outcome]

**Non-Goals (explicitly out of scope):**
- [What this spec does NOT cover]
- [Common assumption to shut down early]

#### 3. Background & Context
[Any prior art, related systems, or context engineers need to understand the decision space. Link to previous specs, ADRs, or research.]

#### 4. Proposed Solution

**High-Level Approach:**
[2–4 sentences describing the chosen solution. Why this approach vs alternatives?]

**System Architecture Diagram:**
[Describe or embed: which services are involved, how data flows, what APIs are called]

**Data Model Changes:**
```sql
-- New tables or schema changes
[Include DDL or schema definition]
```

**API Design:**
```
[Endpoint] [Method]
Request: { [fields and types] }
Response: { [fields and types] }
Error codes: [list]
```

**Key Implementation Details:**
- [Important technical constraint or approach]
- [Edge case handling]
- [Third-party dependency and version]

#### 5. Alternative Approaches Considered

| Option | Pros | Cons | Why Rejected |
|---|---|---|---|
| [Alt 1] | [Benefits] | [Drawbacks] | [Reason not chosen] |
| [Alt 2] | [Benefits] | [Drawbacks] | [Reason not chosen] |

#### 6. Security & Privacy Considerations
- Data stored: [What PII or sensitive data is involved]
- Authentication: [How is access controlled]
- Authorisation: [What permissions are required]
- Encryption: [At rest / in transit requirements]
- Compliance implications: [GDPR, SOC2, etc. if relevant]

#### 7. Performance & Scalability
- Expected load: [Requests/second, data volume]
- Latency requirements: [P50 / P95 targets]
- Caching strategy: [If applicable]
- Database indexing: [New indexes required]
- Known bottlenecks: [Where to watch]

#### 8. Testing Plan
- Unit tests: [Key scenarios to cover]
- Integration tests: [System boundaries to test]
- Load tests: [If performance-critical]
- Edge cases: [Known tricky scenarios]
- Rollback plan: [How to revert if something goes wrong]

#### 9. Rollout Plan
- Feature flag: [Yes / No — name of flag]
- Rollout stages: [% of users at each stage]
- Monitoring: [Metrics and alerts to set up]
- Success criteria to progress rollout: [What needs to be true]
- Rollback trigger: [What would cause immediate rollback]

#### 10. Open Questions
| Question | Owner | Due Date | Resolution |
|---|---|---|---|
| [Unresolved question] | [Name] | [Date] | [Pending] |

#### 11. Implementation Timeline (Rough)
| Phase | Work | Estimated Effort |
|---|---|---|
| [Phase 1] | [What gets built] | [X days/points] |
| [Phase 2] | [What gets built] | [X days/points] |
| Total | | [X story points] |

---

## Guidelines

- The spec is a decision record, not a task list — document *why* decisions were made
- All open questions must have an owner and due date
- Security and privacy sections are never optional for features that touch user data
- Recommend async review: engineers read first, then a 30-minute sync to resolve questions
- Keep the spec updated as implementation progresses — stale specs are worse than no specs

## Quality Checks

- [ ] Problem statement contains no solution language
- [ ] Non-goals explicitly list at least 2 things that might be assumed in scope
- [ ] At least 2 alternative approaches are documented with reasons for rejection
- [ ] Security and privacy section is completed for any feature touching user data
- [ ] All open questions have a named owner and due date (not "TBD")
