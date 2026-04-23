---
name: test-strategy-doc
description: "Write a test strategy document from a feature spec, PRD, or system description. Use when asked to create a test plan, write a test strategy, define QA approach, or plan testing for a feature or release. Produces a complete test strategy with scope, risk assessment, test types, coverage targets, and a prioritised test case outline. Optimised for Opus 4.7 and newer models."
---

# Test Strategy Document Skill

Produces a complete test strategy from a feature spec, PRD, or system description — covering scope, test types, risk areas, coverage requirements, and a prioritised test case outline.

## Required Inputs

Ask for these if not provided:
- **Feature or system being tested** (paste a spec, PRD, or describe it in plain English)
- **Tech stack** (language, framework, testing tools already in use if known)
- **Risk level** (low / medium / high / critical — affects depth and coverage requirements)
- **Timeline** (when does this need to ship — affects prioritisation)
- **Team context** (who is doing the testing — developers / dedicated QA / both)

## Output Structure

### 1. Test Scope

**In scope:**
- [Specific functionality being tested]
- [Integration points covered]
- [User-facing flows included]

**Out of scope:**
- [What is deliberately not tested here — and why]
- [Dependencies owned by other teams]

**Assumptions:**
- [What the test strategy assumes is true — e.g. mocked services, test data availability]

### 2. Risk Assessment

Identify the highest-risk areas first — these drive depth and coverage:

| Area | Risk Level | Why | Test Priority |
|---|---|---|---|
| [e.g. Payment processing] | High | Money movement, regulatory | P0 — exhaustive |
| [e.g. User authentication] | High | Security boundary | P0 — exhaustive |
| [e.g. Email notifications] | Medium | External dependency | P1 — happy path + key failures |
| [e.g. UI copy changes] | Low | Visual only, reversible | P2 — smoke only |

### 3. Test Types and Coverage

**Unit Tests**
- **What:** Individual functions and methods in isolation
- **Who writes:** Developer
- **Coverage target:** [e.g. 80% line coverage on new code / 100% on critical paths]
- **Tools:** [e.g. Jest, pytest, go test]
- **Focus areas for this feature:** [Specific logic that needs unit coverage]

**Integration Tests**
- **What:** Service interactions, database operations, API contracts
- **Who writes:** Developer / QA
- **Coverage target:** [All happy paths + key failure modes]
- **Tools:** [e.g. Supertest, pytest + testcontainers]
- **Focus areas:** [Specific integrations at risk — e.g. third-party API, DB schema changes]

**End-to-End Tests**
- **What:** Critical user journeys from browser/client to database
- **Who writes:** QA / Developer
- **Coverage target:** [Top N user journeys — list them]
- **Tools:** [e.g. Playwright, Cypress, Selenium]
- **Focus areas:** [The 3–5 most critical user flows]

**Performance Tests** *(include only if risk is medium+)*
- **What:** Load, stress, or latency testing
- **Targets:** [Specific numbers — e.g. 200 req/sec at p95 < 200ms]
- **Tools:** [e.g. k6, Locust, JMeter]

**Security Tests** *(include only if risk is high+)*
- **What:** OWASP Top 10 checks relevant to this feature
- **Focus:** [Auth bypasses, injection, data exposure]
- **Tools:** [e.g. OWASP ZAP, manual penetration testing, Snyk]

### 4. Test Case Outline

Priority-ordered list of specific test cases:

**P0 — Must pass before merge:**
| Test Case | Type | Expected Outcome |
|---|---|---|
| [e.g. User can log in with valid credentials] | E2E | [Redirect to dashboard, session created] |
| [e.g. Invalid login returns 401] | Integration | [Error message displayed, no session] |
| [e.g. Password is never stored in plain text] | Unit | [bcrypt hash in DB] |

**P1 — Must pass before release:**
| Test Case | Type | Expected Outcome |
|---|---|---|
| [e.g. Login fails gracefully when DB is down] | Integration | [User sees friendly error, 503] |
| [e.g. Rate limiting blocks after 5 failed attempts] | Integration | [429 returned, account flagged] |

**P2 — Should pass, can ship with known issues tracked:**
| Test Case | Type | Expected Outcome |
|---|---|---|
| [e.g. Login page renders correctly on mobile] | E2E | [Layout matches design] |

### 5. Test Data Requirements
- [Specific test data needed — e.g. test user accounts with various states]
- [External service stubs or mocks needed]
- [Database seed data requirements]
- [Any PII concerns and how test data handles them]

### 6. Definition of Done
Testing is complete when:
- [ ] All P0 test cases pass
- [ ] All P1 test cases pass
- [ ] Code coverage meets the stated target
- [ ] No critical or high severity bugs open
- [ ] Performance targets met (if applicable)
- [ ] Security checks completed (if applicable)

## Quality Checks
- [ ] Risk table is populated and drives test priority (not filled in generically)
- [ ] P0 test cases cover the highest-risk paths specifically
- [ ] Each test type names a concrete tool (not "some testing framework")
- [ ] Definition of Done is measurable (not "tests are done when QA is happy")

## Example Trigger Phrases
- "Write a test strategy for [feature]" + [paste spec or PRD]
- "Create a test plan for [system]"
- "How should we test [feature]?"
- "I need a QA plan for this sprint"
- "What tests do we need for [X]?"
