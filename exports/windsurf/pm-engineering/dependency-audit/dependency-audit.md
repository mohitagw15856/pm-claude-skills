---
trigger: model_decision
description: "Audits project dependencies for security vulnerabilities, license compliance issues, outdated packages, and transitive dependency risk. Use when asked to audit dependencies, review package security, check license compliance, assess dependency health, or produce a vulnerability report. Produces a vulnerability findings table, license compliance matrix, update priority matrix, dependency health score, and 30-day remediation plan."
---

# Dependency Audit Skill

Produce a complete dependency audit report for a project — covering security vulnerabilities (with CVE references), license compliance against policy, outdated packages prioritised by risk, transitive dependency risk analysis, and a concrete remediation plan with timeline. A good dependency audit gives the team a clear, prioritised action list — not a raw dump of audit output that no one acts on.

## Required Inputs

Ask for these if not already provided:
- **Project language and ecosystem** — npm, pip/PyPI, Maven/Gradle, Go modules, Cargo, RubyGems, NuGet, or mixed
- **Dependency list or package manifest** — paste the contents of `package.json`, `requirements.txt`, `go.mod`, `pom.xml`, etc., or provide the audit tool output
- **License policy** — which licenses are allowed, which are restricted (e.g. "GPL is prohibited", "MIT/Apache/BSD only", or "no policy yet — recommend one")
- **Current security tooling** — Dependabot, Snyk, OWASP Dependency-Check, npm audit, pip-audit, or none

## Output Format

---

# Dependency Audit Report: [Project Name]

**Ecosystem:** [npm / pip / Maven / Go / etc.]
**Audit date:** [Date]
**Auditor:** [Name]
**Total direct dependencies:** [N]
**Total transitive dependencies:** [N]
**Audit tool(s) used:** [npm audit / pip-audit / Snyk / OWASP Dependency-Check / etc.]

---

## Executive Summary

| Category | Finding | Risk level |
|---|---|---|
| Critical vulnerabilities | [N] CVEs requiring immediate action | [Critical / High / Low] |
| High vulnerabilities | [N] CVEs — fix within 7 days | [High / Medium] |
| License violations | [N] packages with non-compliant licenses | [High / Low] |
| Severely outdated packages | [N] packages > 2 major versions behind | [Medium] |
| Packages with no active maintenance | [N] packages — no commits in 12+ months | [Medium] |
| **Overall dependency health score** | **[Score]/100** | **[Red / Amber / Green]** |

**Scoring methodology:** Critical CVEs: −20 each. High CVEs: −10 each. License violations: −15 each. Abandoned packages: −5 each. Maximum deduction: 100. Score ≥80 = Green, 60–79 = Amber, <60 = Red.

**Immediate actions required:**
1. [Most critical action — e.g. "Upgrade lodash from 4.17.11 to 4.17.21 to fix CVE-2021-23337 (Critical — prototype pollution)"]
2. [Second action]
3. [Third action]

---

## 1. Security Vulnerability Findings

### Critical and High Severity (Act within 24–72 hours)

| Package | Installed version | Fix version | CVE | Severity | CVSS score | Description | Exploitability |
|---|---|---|---|---|---|---|---|
| [package-name] | [X.Y.Z] | [A.B.C] | [CVE-YYYY-NNNNN] | Critical | [9.x] | [e.g. Prototype pollution via `merge` function — remote code execution possible] | [Known exploit / PoC available / No known exploit] |
| [package-name] | [X.Y.Z] | [A.B.C] | [CVE-YYYY-NNNNN] | High | [7.x] | [e.g. Path traversal in file serving utility] | [PoC available] |
| [package-name] | [X.Y.Z] | [A.B.C] | [CVE-YYYY-NNNNN] | High | [7.x] | [e.g. Regular expression denial of service (ReDoS)] | [No known exploit] |

### Medium Severity (Fix within 30 days)

| Package | Installed version | Fix version | CVE | Severity | CVSS score | Description |
|---|---|---|---|---|---|---|
| [package-name] | [X.Y.Z] | [A.B.C] | [CVE-YYYY-NNNNN] | Medium | [5.x] | [Description] |
| [package-name] | [X.Y.Z] | [A.B.C] | [CVE-YYYY-NNNNN] | Medium | [4.x] | [Description] |

### Low Severity (Fix within 90 days or accept risk)

| Package | Installed version | Fix version | CVE | Severity | Description |
|---|---|---|---|---|---|
| [package-name] | [X.Y.Z] | [A.B.C] | Low | [Description] |

### Vulnerabilities With No Fix Available

| Package | CVE | Severity | Recommended mitigation |
|---|---|---|---|
| [package-name] | [CVE-YYYY-NNNNN] | [High] | [e.g. "Remove this package — alternative: [replacement]"] |
| [package-name] | [CVE-YYYY-NNNNN] | [Medium] | [e.g. "Vendor has a fix in progress — track issue [URL]. Mitigate by [X]"] |

---

## 2. License Compliance Matrix

### License Policy Reference

| License | Category | Policy | Notes |
|---|---|---|---|
| MIT | Permissive | Allowed | Attribution required in distributed products |
| Apache 2.0 | Permissive | Allowed | Attribution + NOTICE file required |
| BSD 2-Clause / 3-Clause | Permissive | Allowed | Attribution required |
| ISC | Permissive | Allowed | |
| MPL 2.0 | Weak copyleft | Allowed with review | Source disclosure required for modified MPL files only |
| LGPL v2 / v3 | Weak copyleft | Allowed with review | Dynamic linking permitted; static linking may require disclosure |
| GPL v2 / v3 | Strong copyleft | **Restricted** | May require open-sourcing the entire codebase — legal review required |
| AGPL v3 | Strong copyleft | **Restricted** | Network use triggers copyleft — especially risky for SaaS |
| SSPL | Source available | **Prohibited** | Not OSI-approved — treat as proprietary |
| Proprietary / Commercial | Commercial | **Requires contract** | Verify license covers current use case and scale |
| Unknown / Unlicensed | — | **Prohibited** | No license = all rights reserved — cannot use legally |

### Findings: Packages With Compliance Issues

| Package | License | Issue | Recommendation | Risk if unaddressed |
|---|---|---|---|---|
| [package-name] | GPL v3 | Copyleft — may require open-sourcing this project | Replace with [alternative] or get legal sign-off | Legal / IP risk |
| [package-name] | AGPL v3 | Network copyleft — SaaS use triggers disclosure | Replace with [alternative] | Legal / IP risk |
| [package-name] | Proprietary | License may not cover current usage tier | Verify license scope with vendor | Contract breach |
| [package-name] | Unknown | No license declared in package metadata | Contact maintainer or replace | Cannot use legally |

### All Licenses in Use (Full Inventory)

| License | Package count | Compliance status |
|---|---|---|
| MIT | [N] | Compliant |
| Apache 2.0 | [N] | Compliant |
| BSD-3-Clause | [N] | Compliant |
| ISC | [N] | Compliant |
| MPL 2.0 | [N] | Review required |
| GPL v3 | [N] | **Non-compliant** |
| Unknown | [N] | **Non-compliant** |

---

## 3. Outdated Package Analysis

### Severely Outdated (2+ major versions behind — high upgrade effort)

| Package | Installed | Latest stable | Versions behind | Last updated | Breaking changes summary |
|---|---|---|---|---|---|
| [package-name] | [1.x.x] | [3.x.x] | 2 major | [Date] | [e.g. "API redesign in v2; async support added in v3"] |
| [package-name] | [0.x.x] | [2.x.x] | 2 major | [Date] | [Summary] |

### Moderately Outdated (1 major version behind)

| Package | Installed | Latest stable | Versions behind | Security fix in newer version? |
|---|---|---|---|---|
| [package-name] | [2.x.x] | [3.x.x] | 1 major | [Yes — CVE-YYYY-NNNNN / No] |
| [package-name] | [4.x.x] | [5.x.x] | 1 major | [No] |

### Minor/Patch Updates Available (Low risk to update)

| Package | Installed | Latest | Contains security fix? |
|---|---|---|---|
| [package-name] | [2.3.1] | [2.3.9] | [Yes / No] |
| [package-name] | [1.0.0] | [1.2.1] | [No] |

---

## 4. Dependency Graph Risk Analysis

### Transitive Dependency Risk

Transitive (indirect) dependencies carry risk because they are not explicitly managed. These are the highest-risk transitive dependencies in this project:

| Vulnerable transitive dep | Pulled in by | Installed version | Fix available | Action |
|---|---|---|---|---|
| [transitive-package] | [direct-parent] | [X.Y.Z] | [Yes — upgrade [parent] to [version]] | Upgrade direct dependency [parent] |
| [transitive-package] | [direct-parent] | [X.Y.Z] | [No] | Remove [parent] or use [alternative] |

### Dependency Concentration Risk

These packages are depended on by many other packages in the project — a vulnerability or deprecation would have cascading effects:

| Package | Depended on by (N packages) | Actively maintained? | Risk level |
|---|---|---|---|
| [package-name] | [N] | [Yes / No — last commit: date] | [High / Medium] |
| [package-name] | [N] | [Yes] | [Medium] |

### Abandoned / Unmaintained Packages

| Package | Last release | Last commit | Weekly downloads | Recommended alternative |
|---|---|---|---|---|
| [package-name] | [Date] | [Date] | [N] | [alternative-package] |
| [package-name] | [Date] | [Date] | [N] | [Maintained fork: URL] |

---

## 5. Remediation Plan

### 30-Day Plan

**Week 1 — Critical vulnerabilities (Days 1–7)**

| Action | Owner | Package | Effort | Notes |
|---|---|---|---|---|
| Upgrade [package] [old] → [new] | [Name] | [package-name] | [30 min] | [No API changes / check breaking changes guide: URL] |
| Replace [package] with [alternative] | [Name] | [package-name] | [2 hours] | [No fix available — must replace] |
| Patch override for [transitive-dep] | [Name] | [transitive-dep] | [15 min] | [Add resolutions/overrides entry in manifest] |

```bash
# Commands for Week 1 upgrades:

# npm
npm install [package]@[target-version]
npm audit fix --force  # use with caution — may introduce breaking changes

# pip
pip install --upgrade [package]==[target-version]
pip-audit --fix  # if using pip-audit

# Go
go get [module]@[version]
go mod tidy

# Maven
# Update pom.xml version property, then:
mvn versions:use-latest-releases -DallowMajorUpdates=false
mvn dependency:resolve
```

**Week 2 — High vulnerabilities and license violations (Days 8–14)**

| Action | Owner | Package | Effort | Notes |
|---|---|---|---|---|
| Upgrade [package] | [Name] | [package-name] | [1 hour] | |
| Replace GPL-licensed [package] | [Name] | [package-name] | [4 hours] | [Alternative: [package]] |
| Legal review for [package] license | Legal team | [package-name] | [Legal team SLA] | [Submit via [process]] |

**Week 3 — Medium vulnerabilities and abandoned packages (Days 15–21)**

| Action | Owner | Package | Effort | Notes |
|---|---|---|---|---|
| Upgrade [package] | [Name] | [package-name] | [30 min] | |
| Replace abandoned [package] | [Name] | [package-name] | [2 hours] | [Maintained fork or alternative: [URL]] |

**Week 4 — Process improvements (Days 22–30)**

| Action | Owner | Effort | Notes |
|---|---|---|---|
| Enable Dependabot / Renovate for automated PRs | [Name] | [2 hours] | [Config in Section 6] |
| Add `npm audit` / `pip-audit` to CI — fail on Critical/High | [Name] | [1 hour] | [Config in Section 6] |
| Document license policy in CONTRIBUTING.md | [Name] | [1 hour] | [Based on policy in Section 2] |
| Schedule next quarterly audit | [Name] | [15 min] | [Add to team calendar] |

---

## 6. Policy Recommendations

### Automated Vulnerability Scanning in CI

Add the following to your CI pipeline to catch vulnerabilities before they merge:

```yaml
# GitHub Actions — adapt for your CI platform
dependency-audit:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v3

    # npm
    - name: npm audit
      run: npm audit --audit-level=high
      # Fails build on High or Critical vulnerabilities

    # pip
    - name: pip-audit
      run: |
        pip install pip-audit
        pip-audit --requirement requirements.txt --severity high

    # Go
    - name: govulncheck
      run: |
        go install golang.org/x/vuln/cmd/govulncheck@latest
        govulncheck ./...
```

### Dependabot / Renovate Configuration

```yaml
# .github/dependabot.yml — automated dependency update PRs
version: 2
updates:
  - package-ecosystem: "[npm / pip / gomod / maven]"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
    open-pull-requests-limit: 10
    labels:
      - "dependencies"
      - "automated"
    ignore:
      # Ignore major version bumps — review these manually
      - dependency-name: "*"
        update-types: ["version-update:semver-major"]
```

### License Scanning

```bash
# npm — license checker
npx license-checker --onlyAllow 'MIT;Apache-2.0;BSD-2-Clause;BSD-3-Clause;ISC' \
  --failOn 'GPL;AGPL;LGPL'

# Python — pip-licenses
pip install pip-licenses
pip-licenses --allow-only="MIT;Apache Software License;BSD License;ISC License" \
  --fail-on="GNU General Public License"

# Go — go-licenses
go install github.com/google/go-licenses@latest
go-licenses check ./... --allowed_licenses=MIT,Apache-2.0,BSD-2-Clause,BSD-3-Clause
```

---

## 7. Dependency Health Score Detail

| Category | Max points | Score | Notes |
|---|---|---|---|
| No critical vulnerabilities | 30 | [N]/30 | −20 per critical CVE |
| No high vulnerabilities | 20 | [N]/20 | −10 per high CVE |
| License compliance | 20 | [N]/20 | −15 per violation |
| No abandoned packages | 15 | [N]/15 | −5 per abandoned package |
| Up-to-date major versions | 10 | [N]/10 | −2 per major version behind |
| Automated scanning enabled | 5 | [N]/5 | All-or-nothing |
| **Total** | **100** | **[Score]/100** | **[Red / Amber / Green]** |

---

## Quality Checks

- [ ] Every Critical and High CVE has a named owner and a resolution date in the 30-day plan
- [ ] License findings have been reviewed by legal or a named engineer with authority to accept the risk
- [ ] Transitive dependency vulnerabilities are included — not just direct dependencies
- [ ] Abandoned packages have a concrete replacement recommendation, not just "consider replacing"
- [ ] CI pipeline change is included — the audit findings should be the last time these are caught manually
- [ ] The dependency health score is calculated from actual findings, not estimated
- [ ] Remediation plan actions are specific commands or steps, not "upgrade package X" without version targets

## Anti-Patterns

- [ ] Do not report only direct dependencies — transitive dependency vulnerabilities are often more dangerous and are the most commonly missed
- [ ] Do not present raw audit tool output without interpretation — a table of 200 CVEs with no prioritisation is worse than no audit at all
- [ ] Do not assign all Critical CVEs as "fix immediately" without checking whether an exploitable path exists in your usage context
- [ ] Do not make license compliance decisions without legal input — flagging a GPL dependency without a recommendation is incomplete work
- [ ] Do not complete the audit without including a CI/CD pipeline step — a one-time audit that leaves the door open for new vulnerabilities is not a remediation
