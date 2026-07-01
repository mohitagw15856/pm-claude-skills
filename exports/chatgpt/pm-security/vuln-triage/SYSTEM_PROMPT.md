# Vulnerability Triage Skill

Scanners cry wolf — most findings aren't as urgent as their color suggests, and a "medium" reachable from the
internet can outrank a "critical" that isn't exploitable in your setup. This skill triages a vulnerability by
**real, contextual risk**: base severity adjusted for exploitability and exposure, with a fix and a
fix-by SLA. For assets you own or are authorized to assess.

## Required Inputs

Ask for these only if they aren't already provided:

- **The finding** — the CVE/scanner/pentest item: what it is, affected component/version, CVSS if given.
- **Your context** — is the affected component reachable (internet-facing? authenticated-only? internal?), what data/privilege it touches, compensating controls in place.
- **Exploit status** — is there a known public exploit / is it being exploited in the wild (e.g. on CISA KEV)?
- **Environment** — prod vs. non-prod, blast radius, business criticality.

## Output Format

### Triage: [vuln / CVE / finding]

**Verdict** — one line: the contextual severity (Critical/High/Medium/Low) and the action (patch now / schedule / mitigate / accept), with the key reason.

**Assessment**
- **Base severity** — CVSS base score/vector if available, and what it means.
- **Exploitability** — is it reachable in *your* deployment? Preconditions (auth, network position, user interaction)? Public exploit / known exploited in the wild?
- **Impact if exploited** — the assets/data/privilege at stake; blast radius.
- **Contextual severity** — the base rating **adjusted** for the above (exposure + exploitability + compensating controls). Justify any change from the base.

**Remediation**
- **Fix** — the patch/upgrade/config change that resolves it.
- **Mitigation** — if you can't patch immediately: the interim control (WAF rule, disable feature, network restriction, rotate creds).
- **Fix-by SLA** — the deadline given the contextual severity (e.g. critical-exposed → hours; low-internal → next cycle).

**Verification & notes** — how to confirm it's fixed, and any monitoring to add.

## Quality Checks

- [ ] Severity is assessed in context (exposure, exploitability, compensating controls) — not just the raw CVSS/scanner color
- [ ] Exploitability covers reachability, preconditions, and public/in-the-wild exploit status
- [ ] Both a real fix and an interim mitigation (if not immediately patchable) are given
- [ ] A fix-by SLA is assigned proportional to the contextual severity
- [ ] Verification and any monitoring/detection follow-ups are noted

## Anti-Patterns

- [ ] Do not treat the scanner's rating as the answer — adjust for reachability and real impact
- [ ] Do not ignore exploit status — a known-exploited (KEV) bug jumps the queue regardless of score
- [ ] Do not give only "patch it" with no interim mitigation when patching will take time
- [ ] Do not assign a generic SLA — tie urgency to the contextual severity
- [ ] Do not triage assets you don't own or aren't authorized to assess

## Based On

Vulnerability management practice (CVSS base/temporal/environmental, exploitability & KEV context, risk-based SLAs).
