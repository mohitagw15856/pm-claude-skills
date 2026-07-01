---
name: "Review a design, PR, or feature for security issues before i"
description: "Review a design, PR, or feature for security issues before it ships. Use when asked to do a security review, security-review a change/PR, or check a feature for vulnerabilities. Produces a structured review across the common risk areas (authn/authz, input handling, secrets, data exposure, dependencies), findings ranked by severity with concrete fixes, and a ship / fix-first verdict. For code and systems you own or are authorized to review."
---

# Security Review Skill

A security review is a focused pass for the ways a change could be abused — before it reaches production.
This skill reviews a design, PR, or feature against the recurring risk areas, ranks findings by severity, and
gives a clear verdict with concrete fixes. It's for code/systems you own or are authorized to review, and it
complements (not replaces) automated scanners and a formal pentest.

## Required Inputs

Ask for these only if they aren't already provided:

- **What's under review** — the design/diff/feature, and what it does.
- **Context** — the stack, where it runs, what data/permissions it touches, who can reach it (internet-facing? authenticated?).
- **Sensitivity** — the assets involved (PII, credentials, money, admin capability) and the threat context.

## Output Format

### Security review: [change/feature]

**Summary & verdict** — one-line read and a call: ✅ ship / 🔁 fix-first / ⛔ block, with the gating issue(s).

**Review by risk area** — scan each and note findings:
1. **AuthN / AuthZ** — is identity verified, and is every action authorized (incl. object-level / IDOR, privilege escalation)?
2. **Input handling** — validation/encoding; injection (SQL/command/template), SSRF, path traversal, deserialization, XSS.
3. **Secrets & crypto** — hard-coded secrets, key handling, weak/absent crypto, tokens in logs/URLs.
4. **Data exposure** — over-broad responses, PII in logs/errors, missing encryption in transit/at rest, verbose errors.
5. **Dependencies & config** — known-vuln libraries, insecure defaults, missing security headers, CORS, permissions.
6. **Abuse & availability** — rate-limiting, resource exhaustion, business-logic abuse, missing audit logging.

**Findings (ranked)** — each with severity, where, why it's exploitable, and the fix:

| Severity | Area | Finding (how it's exploited) | Fix |
|---|---|---|---|
| 🔴 Critical/High | | | |
| 🟡 Medium | | | |
| 🔵 Low / hardening | | | |

**What's done well** — controls already in place (so they're kept).

**Follow-ups** — anything needing a scanner, a pentest, or a deeper look.

## Quality Checks

- [ ] Every standard risk area is considered (authz incl. IDOR, input/injection, secrets, data exposure, deps, abuse)
- [ ] Findings are ranked by severity with a concrete, actionable fix each
- [ ] Exploitability is explained — why it's a real issue in this context, not a generic warning
- [ ] A clear ship / fix-first / block verdict names the gating issues
- [ ] Existing good controls are acknowledged; deeper follow-ups (scanner/pentest) are flagged

## Anti-Patterns

- [ ] Do not produce a generic checklist — tie each finding to this code/design and its exploit path
- [ ] Do not rank everything the same — separate critical from hardening nits
- [ ] Do not report an issue without a fix — give the concrete remediation
- [ ] Do not miss authorization (IDOR/privilege) — it's the most common real-world web flaw
- [ ] Do not review code you don't own or aren't authorized to assess

## Based On

Secure code/design review practice (OWASP Top 10 & ASVS risk areas, severity-ranked findings, actionable remediation).
