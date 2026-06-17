---
trigger: model_decision
description: "Write a STRIDE-based threat model for a service or feature. Use when asked to produce a threat model, document security risks, identify attack vectors, assess a service's security posture, or prepare for a security design review. Produces a structured threat model covering assets, trust boundaries, STRIDE threat enumeration per component, risk scores, mitigation controls, and residual risk sign-off."
---

# Security Threat Model Skill

Produce a complete STRIDE-based threat model for a service or feature. A threat model is not a list of things that could go wrong — it is a structured analysis of attackers, assets, boundaries, and controls that lets an engineering team make informed, documented security decisions.

A good threat model is specific enough that a new engineer can understand what is being protected, why each control exists, and what risk the team has accepted.

## Required Inputs

Ask for these if not already provided:
- **Service name and description** — what the service does, who uses it
- **Architecture overview** — components, dependencies, data flows (a diagram description or ASCII diagram is fine)
- **Deployment environment** — cloud provider, VPC/network topology, where it runs (Kubernetes, ECS, VMs, serverless)
- **Data sensitivity** — what data does this service handle? PII, payment data, credentials, internal-only?
- **Existing controls** — authentication method, encryption in transit/at rest, current WAF/firewall, existing security scanning
- **Trust levels** — who are the principals? (anonymous public, authenticated users, internal services, admins)

## Output Format

---

# Security Threat Model: [Service Name]

**Service:** [Name] | **Team:** [Team name]
**Author:** [Name] | **Reviewed by:** [Security lead / peer]
**Date:** [Date] | **Next review:** [Date — recommend 6 months or after major architecture change]
**Classification:** [Internal / Confidential]

---

## 1. Overview

[2–3 sentences describing the service, its role in the system, and the scope of this threat model. State what is in scope and what is explicitly out of scope.]

**In scope:**
- [Component or data flow]
- [Component or data flow]

**Out of scope:**
- [e.g. Third-party payment processor internals]
- [e.g. Corporate network / end-user devices]

---

## 2. Asset Register

Assets are the things worth protecting — data, capabilities, and reputational value.

| Asset | Description | Sensitivity | Owner |
|---|---|---|---|
| [e.g. User PII] | Names, email addresses, profile data | High — GDPR-regulated | [Team] |
| [e.g. API credentials] | Service-to-service auth tokens | Critical | [Team] |
| [e.g. Session tokens] | User authentication state | High | [Team] |
| [e.g. Audit logs] | Record of user and admin actions | Medium | [Team] |
| [e.g. Service availability] | Uptime of the [X] endpoint | Medium | [Team] |

**Data classification key:**
- **Critical** — Credential material; exposure enables direct system compromise
- **High** — PII, financial data, health data; regulated or high reputational impact
- **Medium** — Internal configuration, non-sensitive business data
- **Low** — Public information, anonymised data

---

## 3. Trust Boundaries and Architecture

Trust boundaries are the lines that separate zones with different trust levels. Threats often occur when data or requests cross a boundary.

```
  ┌─────────────────────────────────────────────────────────────────┐
  │  INTERNET (Untrusted)                                           │
  │                                                                 │
  │   [Public User]          [Bot / Attacker]                       │
  └──────────────────────────────┬──────────────────────────────────┘
                                 │ HTTPS
                    ─ ─ ─ ─ ─ ─ ─│─ ─ ─ ─ ─ ─ ─ ─
                    Trust Boundary: Public → DMZ
                    ─ ─ ─ ─ ─ ─ ─│─ ─ ─ ─ ─ ─ ─ ─
                                 ▼
  ┌──────────────────────────────────────────────────────────────────┐
  │  DMZ / Edge Layer                                                │
  │   ┌────────────┐     ┌──────────────┐                           │
  │   │  WAF / CDN │────▶│  API Gateway │                           │
  │   └────────────┘     └──────┬───────┘                           │
  └──────────────────────────────┼───────────────────────────────────┘
                    ─ ─ ─ ─ ─ ─ ─│─ ─ ─ ─ ─ ─ ─ ─
                    Trust Boundary: Edge → Application VPC
                    ─ ─ ─ ─ ─ ─ ─│─ ─ ─ ─ ─ ─ ─ ─
                                 ▼
  ┌──────────────────────────────────────────────────────────────────┐
  │  Application VPC (Private)                                       │
  │   ┌──────────────┐     ┌────────────┐     ┌──────────────────┐  │
  │   │  [Service A] │────▶│ [Service B]│────▶│  [Database]      │  │
  │   └──────────────┘     └────────────┘     └──────────────────┘  │
  │                                ▲                                  │
  │                                │                                  │
  │   ┌──────────────┐             │                                  │
  │   │  Admin (IAM) │─────────────┘                                 │
  └──────────────────────────────────────────────────────────────────┘
```

**Trust Boundaries identified:**

| Boundary | From | To | Auth mechanism | Encrypted |
|---|---|---|---|---|
| TB-1 | Public internet | API Gateway | [JWT / OAuth / API key] | TLS 1.2+ |
| TB-2 | API Gateway | Service A | [mTLS / internal JWT / IAM role] | [Yes/No] |
| TB-3 | Service A | Database | [Connection string + IAM / username+password] | [Yes/No] |
| TB-4 | Admin | Service B | [IAM role / VPN + MFA] | TLS |

---

## 4. STRIDE Threat Analysis

STRIDE is a threat classification framework. For each significant component, enumerate threats in each category.

**STRIDE key:**
- **S** — Spoofing: Impersonating another user, service, or system
- **T** — Tampering: Modifying data or code without authorisation
- **R** — Repudiation: Denying an action occurred; insufficient audit trail
- **I** — Information Disclosure: Exposing data to unauthorised parties
- **D** — Denial of Service: Making the service unavailable
- **E** — Elevation of Privilege: Gaining capabilities beyond what is authorised

### Component: [API Gateway / Auth Layer]

| ID | Category | Threat | Attack vector | Existing control |
|---|---|---|---|---|
| T-001 | S | Attacker forges a JWT token to authenticate as another user | Weak signing key or algorithm confusion (alg:none) | [e.g. RS256 with key rotation / none] |
| T-002 | S | Attacker replays a stolen session token | Theft via XSS or network sniff | [e.g. Token expiry + refresh rotation] |
| T-003 | T | Attacker modifies request headers to bypass tenant isolation | Missing validation of tenant ID header | [e.g. Server-side tenant resolution / none] |
| T-004 | R | No audit trail for admin authentication events | Logging not configured for auth failures | [e.g. CloudTrail enabled / none] |
| T-005 | I | Auth error messages reveal whether an email exists | Verbose error responses | [e.g. Normalised error responses / none] |
| T-006 | D | Credential stuffing exhausts rate limits and blocks legitimate users | Automated login attempts | [e.g. Rate limiting per IP + CAPTCHA / none] |
| T-007 | E | Compromised low-privilege token used to call admin endpoint | Missing role check on admin routes | [e.g. RBAC middleware on all routes / none] |

### Component: [Application Service / Business Logic]

| ID | Category | Threat | Attack vector | Existing control |
|---|---|---|---|---|
| T-008 | T | SQL/NoSQL injection via unsanitised user input | Unparameterised queries | [e.g. ORM with parameterised queries / none] |
| T-009 | T | Mass assignment — attacker sets fields they should not (e.g. `isAdmin: true`) | API accepts extra fields without allowlist | [e.g. Input validation / none] |
| T-010 | I | Insecure direct object reference — user accesses another user's resource | Missing ownership check on resource ID | [e.g. Ownership middleware / none] |
| T-011 | I | Sensitive data in application logs (PII, tokens) | Over-logging in debug mode | [e.g. Log scrubbing / none] |
| T-012 | D | Unprotected expensive endpoint triggers large DB scan | No pagination or query cost limit | [e.g. Pagination enforced / none] |
| T-013 | R | Business-critical state changes not logged | No audit event on [operation] | [e.g. Audit log table / none] |

### Component: [Database]

| ID | Category | Threat | Attack vector | Existing control |
|---|---|---|---|---|
| T-014 | I | Database exposed to internet (misconfigured security group) | Direct connection from outside VPC | [e.g. No public IP, security group restricts to app subnet] |
| T-015 | I | Backup snapshots not encrypted or accessible to wrong accounts | Unencrypted snapshot, public S3 | [e.g. Encrypted snapshots, private S3 bucket] |
| T-016 | T | Privilege escalation via DB account with excessive permissions | App uses a superuser DB account | [e.g. Least-privilege DB role per service / none] |
| T-017 | D | Runaway query or bulk delete causes data loss or outage | No query timeout or soft-delete | [e.g. Statement timeout, soft-delete on critical tables / none] |

### Component: [Internal Service-to-Service Communication]

| ID | Category | Threat | Attack vector | Existing control |
|---|---|---|---|---|
| T-018 | S | Rogue internal service impersonates a trusted service | No mutual authentication between services | [e.g. mTLS / service mesh / none] |
| T-019 | I | Internal traffic sniffed on shared network | Unencrypted service-to-service calls | [e.g. Service mesh with TLS / none] |
| T-020 | E | Compromised internal service calls privileged endpoints | No scoping on internal tokens | [e.g. Scoped service tokens / none] |

---

## 5. Risk Register

Score each threat: **Likelihood (1–5)** × **Impact (1–5)** = **Risk Score (1–25)**

Priority bands: Critical (20–25) | High (12–19) | Medium (6–11) | Low (1–5)

| ID | Threat summary | Likelihood | Impact | Score | Priority | Status |
|---|---|---|---|---|---|---|
| T-001 | JWT forgery — auth bypass | 2 | 5 | 10 | Medium | [Open / Mitigated / Accepted] |
| T-002 | Session token replay | 3 | 4 | 12 | High | [Open / Mitigated / Accepted] |
| T-007 | Privilege escalation via missing role check | 3 | 5 | 15 | High | [Open / Mitigated / Accepted] |
| T-008 | SQL injection | 2 | 5 | 10 | Medium | [Open / Mitigated / Accepted] |
| T-010 | IDOR — cross-user data access | 3 | 4 | 12 | High | [Open / Mitigated / Accepted] |
| T-014 | Database exposed to internet | 1 | 5 | 5 | Low | [Open / Mitigated / Accepted] |
| T-018 | Rogue internal service impersonation | 2 | 4 | 8 | Medium | [Open / Mitigated / Accepted] |

---

## 6. Mitigations Table

For every Open threat with priority Medium or above, define a specific mitigation.

| ID | Threat | Mitigation | Owner | Target date | Ticket |
|---|---|---|---|---|---|
| T-002 | Session token replay | Implement token rotation on refresh — invalidate old token server-side immediately | [Engineer name] | [Date] | [JIRA-123] |
| T-007 | Privilege escalation | Add RBAC middleware to all `/admin/*` routes; write integration test for role boundary | [Engineer name] | [Date] | [JIRA-124] |
| T-010 | IDOR | Add ownership assertion to all resource-fetching service methods; add to code review checklist | [Engineer name] | [Date] | [JIRA-125] |
| T-011 | PII in logs | Audit logging calls for PII fields; add scrubbing to logger middleware | [Engineer name] | [Date] | [JIRA-126] |
| T-018 | Rogue service impersonation | Enable mTLS via service mesh or issue scoped service tokens per service | [Engineer name] | [Date] | [JIRA-127] |

---

## 7. Accepted Risks

Accepted risks are threats the team has decided not to mitigate right now. Every accepted risk must have a named owner and a review date.

| ID | Threat | Reason for acceptance | Risk owner | Review date |
|---|---|---|---|---|
| T-014 | Database public exposure | Database has no public IP assigned; control already in place — accepted as low likelihood | [Name] | [Date] |
| [ID] | [Threat] | [Reason — e.g. "Effort exceeds risk at current scale; re-evaluate at 10× traffic"] | [Name] | [Date] |

---

## 8. Security Controls Summary

| Control | Type | Covers threats | Implemented |
|---|---|---|---|
| JWT RS256 with 15-min expiry | Preventive | T-001, T-002 | [Yes / Partial / No] |
| RBAC middleware on all routes | Preventive | T-007, T-020 | [Yes / Partial / No] |
| Parameterised queries (ORM) | Preventive | T-008 | [Yes / Partial / No] |
| Rate limiting (100 req/min per IP) | Preventive | T-006, T-012 | [Yes / Partial / No] |
| CloudTrail / audit logging | Detective | T-004, T-013 | [Yes / Partial / No] |
| Automated SAST in CI pipeline | Detective | T-008, T-009 | [Yes / Partial / No] |
| Encrypted backups + private S3 | Preventive | T-015 | [Yes / Partial / No] |
| Least-privilege DB role | Preventive | T-016 | [Yes / Partial / No] |
| Incident response runbook | Corrective | All | [Yes / Partial / No] |

---

## 9. Review Cadence

| Trigger | Action |
|---|---|
| Every 6 months | Full threat model review — update risk scores, close mitigated items |
| Major architecture change | Update trust boundary diagram and re-run STRIDE for new components |
| Security incident | Review relevant threats; add any newly discovered vectors |
| New data classification | Add assets to register; assess whether new STRIDE categories apply |
| Third-party dependency added | Assess supply chain threats for the new dependency |

**Next scheduled review:** [Date]
**Review owner:** [Name / Security lead]

---

## Quality Checks

- [ ] Every trust boundary is named and its authentication mechanism is specified — not left as "TBD"
- [ ] Every Critical and High risk in the risk register has a mitigation with a named owner and a target date
- [ ] Every accepted risk has a named risk owner and a review date — no unowned accepted risks
- [ ] The asset register includes data sensitivity levels and at least one entry for credential material
- [ ] STRIDE analysis covers all major components — not just the API layer
- [ ] Mitigation actions are specific enough to become a ticket (not "improve security")
- [ ] The ASCII trust boundary diagram matches the architecture description provided

## Anti-Patterns

- [ ] Do not restrict STRIDE analysis to only the API layer — threats exist at every component including the database and internal services
- [ ] Do not leave mitigations as vague directives like "improve security" — every mitigation must be specific enough to become a ticket
- [ ] Do not accept risks without a named owner and a review date — unowned accepted risks are not managed risks
- [ ] Do not write a threat model that covers only theoretical threats — prioritise by likelihood and impact using the risk register
- [ ] Do not omit the asset register — without knowing what is being protected, the STRIDE analysis has no anchor
