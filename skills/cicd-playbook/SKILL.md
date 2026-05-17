---
name: cicd-playbook
description: "Write a CI/CD pipeline playbook for a service or team. Use when asked to document a CI/CD pipeline, write a deployment process, define release gates, document build and test stages, or create a deployment guide. Produces a structured playbook covering pipeline stages, environment definitions, deployment gates, rollback procedures, and on-call responsibilities."
---

# CI/CD Playbook Skill

Produce a complete, actionable CI/CD playbook for a service or team — covering everything a new engineer needs to understand, contribute to, and operate the pipeline safely.

A good playbook is not a diagram. It is a document that answers: what runs, when, why, who owns it, and what to do when it breaks.

## Required Inputs

Ask for these if not already provided:
- **Service name** and brief description
- **Tech stack** — language, framework, containerisation (Docker, etc.)
- **Source control** — GitHub / GitLab / Bitbucket, branching strategy
- **CI platform** — GitHub Actions / CircleCI / Jenkins / BuildKite / other
- **CD platform / deployment target** — Kubernetes, ECS, Lambda, Heroku, VMs, etc.
- **Environments** — e.g. dev, staging, production (and any canary / feature environments)
- **Deployment frequency** — how often does the team ship?
- **Any existing gates** — manual approvals, smoke tests, feature flags
- **On-call setup** — who's responsible during deploys?

## Output Format

---

# CI/CD Playbook: [Service Name]

**Service:** [Name] | **Team:** [Team name]
**Last updated:** [Date] | **Owner:** [Name / role]
**Pipeline platform:** [CI tool] → [CD tool / platform]

---

## Overview

[2–3 sentences describing what this service does and why the CI/CD pipeline is structured the way it is. Include the deployment target and how frequently the team ships.]

**Deployment frequency:** [Multiple times per day / Daily / Weekly / On-demand]
**Average pipeline duration:** [X minutes]
**Rollback time (p95):** [X minutes]

---

## Pipeline Stages

```
[Branch push]
    │
    ▼
[1. Build & Lint] ──fail──▶ ❌ Block PR
    │
    ▼
[2. Unit Tests] ──fail──▶ ❌ Block PR
    │
    ▼
[3. Integration Tests] ──fail──▶ ❌ Block PR
    │
    ▼
[4. Security Scan] ──fail──▶ ⚠️ [Block / Warn — specify]
    │
    ▼
[5. Build Artefact / Container Image]
    │
    ▼
[6. Deploy to Staging] ──fail──▶ ❌ Block promotion
    │
    ▼
[7. Smoke Tests (Staging)]
    │
    ▼
[8. Manual Approval Gate] ──(if required)
    │
    ▼
[9. Deploy to Production] ──fail──▶ 🔁 Auto-rollback (if configured)
    │
    ▼
[10. Post-deploy checks]
```

---

## Stage Definitions

### Stage 1 — Build & Lint

**What runs:** [Build command] + [Linter — e.g. ESLint, golangci-lint, flake8]
**Trigger:** Every commit to any branch
**Blocking:** Yes — PR cannot be merged if this fails
**Typical duration:** [X minutes]
**Owner if it fails:** PR author

**Common failure causes:**
- [e.g. Missing dependency — run `npm install` locally before pushing]
- [e.g. Lint rule violation — run `npm run lint --fix` to auto-fix most issues]

---

### Stage 2 — Unit Tests

**What runs:** [Test command — e.g. `npm test`, `go test ./...`, `pytest`]
**Coverage gate:** [X]% minimum — pipeline fails below this threshold
**Trigger:** Every commit
**Blocking:** Yes
**Typical duration:** [X minutes]

**Coverage report:** [Where to find it — e.g. uploaded to Codecov, available in CI artifacts]

---

### Stage 3 — Integration Tests

**What runs:** [Test suite description — e.g. "API integration tests against a test database using Docker Compose"]
**Environment:** [Ephemeral test environment / shared test DB / etc.]
**Trigger:** Every commit to `main` and feature branches targeting `main`
**Blocking:** Yes
**Typical duration:** [X minutes]

**If slow:** [e.g. "Integration tests can be skipped locally with `SKIP_INTEGRATION=true` — never skip in CI"]

---

### Stage 4 — Security Scan

**Tools:** [e.g. Snyk, Trivy, OWASP Dependency Check, Semgrep]
**What it checks:** [Dependency vulnerabilities / SAST / secrets detection — list what applies]
**Blocking on:** Critical and High severity findings
**Non-blocking on:** Medium and Low (flagged, not blocking)
**Trigger:** Every commit to `main`

**How to handle a flagged vulnerability:**
1. Check if a fix is available — upgrade the dependency
2. If no fix available, open a security ticket and add a suppression with justification
3. Never suppress without a ticket and owner

---

### Stage 5 — Build Artefact

**What is produced:** [Docker image / binary / zip — be specific]
**Registry:** [ECR / GCR / Docker Hub / Artifactory — URL]
**Tagging convention:** `[service-name]:[git-sha]` (also tagged `:latest` on `main`)
**Trigger:** Commits to `main` only (not feature branches)

---

### Stage 6 — Deploy to Staging

**Deployment method:** [e.g. Helm upgrade / kubectl apply / ecs deploy / Terraform apply]
**Staging URL:** [URL]
**Trigger:** Automatic on successful artefact build from `main`
**Who can deploy to staging:** Any engineer (automatic)

**Environment variables:** Managed in [Vault / AWS SSM / GitHub Secrets / etc.]
**Staging is not production:** [Any differences in config, scale, or data — state them here]

---

### Stage 7 — Smoke Tests (Staging)

**What runs:** [Description — e.g. "10 critical path tests covering login, core API endpoints, and payment flow"]
**Tool:** [e.g. Playwright / Postman / custom script]
**Pass criteria:** All smoke tests pass within [X seconds] timeout
**Blocking:** Yes — production deploy will not proceed if smoke tests fail

**Smoke test suite location:** [Link to test files or folder]

---

### Stage 8 — Manual Approval Gate

**Required for:** [Production deploys / deploys affecting >X% of traffic / deploys to specific regions]
**Who can approve:** [e.g. Any engineer on the team / Lead engineer / On-call engineer]
**Approval timeout:** [e.g. 24 hours — auto-cancelled if no approval]
**How to approve:** [GitHub Actions approve step / Slack command / other — with link]

**When to withhold approval:**
- Active incident in production
- Deploy is outside the deployment window (see below)
- On-call engineer has not been notified

---

### Stage 9 — Deploy to Production

**Deployment method:** [Same as staging or different — specify]
**Deployment window:** [e.g. Monday–Thursday 09:00–16:00 UTC — no deploys on Fridays or before bank holidays]
**Canary / progressive rollout:** [Yes — X% initial traffic, full rollout after Y minutes / No — full deploy]
**Deployment notifications:** [Slack channel — #deployments]

**Who is on-call during deploy:** Deploying engineer is responsible until post-deploy checks pass.

---

### Stage 10 — Post-Deploy Checks

**Automated checks (run for [X minutes] after deploy):**
- [ ] Error rate: <[X]% (baseline: [Y]%)
- [ ] P99 latency: <[X]ms (baseline: [Y]ms)
- [ ] [Key business metric]: within [X]% of baseline

**Where to watch:** [Datadog / Grafana / CloudWatch dashboard — link]

**If a check fails:** See Rollback Procedure below.

---

## Environments

| Environment | Purpose | Deploy trigger | URL | Data |
|---|---|---|---|---|
| **Dev** | Local development | Manual | localhost | Seeded test data |
| **Staging** | Pre-production validation | Automatic (main) | [URL] | Anonymised prod copy |
| **Production** | Live traffic | Manual approval | [URL] | Live data |

---

## Branching Strategy

**Model:** [Trunk-based / GitFlow / GitHub Flow — describe briefly]

| Branch | Purpose | Who merges | Deploy target |
|---|---|---|---|
| `main` | Production-ready code | PR + review | Staging → Production |
| `feature/*` | Feature development | Author | None (CI only) |
| `hotfix/*` | Critical production fixes | Lead engineer | Can bypass staging gate with approval |

**Hotfix process:** [Describe when and how to use a hotfix branch — what level of incident justifies bypassing the standard process]

---

## Rollback Procedure

**Automated rollback:** [Yes — triggered if post-deploy error rate exceeds [X]% / No — manual only]

**Manual rollback steps:**
```bash
# 1. Identify the last known good image tag
[command to list recent deployments]

# 2. Deploy the previous version
[deployment command with previous tag]

# 3. Confirm rollback is live
[smoke test command or health check URL]

# 4. Notify the team
[Slack command or template]
```

**Rollback decision authority:** Any engineer on-call can initiate a rollback without waiting for approval.

**After a rollback:**
1. Create a post-deploy incident report (see [incident-postmortem skill])
2. Do not re-deploy the same commit without fixing the root cause
3. Notify [stakeholder / support team] of the rollback and expected fix timeline

---

## Secrets and Configuration Management

**Secret store:** [Vault / AWS SSM / GitHub Secrets / Doppler — specify]
**How to add a new secret:**
1. [Step 1]
2. [Step 2]
**Who has access:** [Role or team]
**Rotation policy:** [How often secrets are rotated and who owns it]

**Never do:** Commit secrets to source control, even in `.env` files. The pipeline includes secret scanning (Stage 4) which will flag this.

---

## Common Failures and Fixes

| Failure | Likely cause | Fix |
|---|---|---|
| Build fails with "module not found" | Dependency not installed | Run `[install command]` and commit `lock file` |
| Integration tests timeout | Test DB not seeded / external service down | Check [service] status; re-run pipeline |
| Smoke tests fail after staging deploy | Environment variable missing | Check [config location]; compare staging and prod env vars |
| Production deploy stuck at approval | Approver not notified | Tag `@[on-call handle]` in `#deployments` |
| Post-deploy error rate spike | Bad deploy / upstream dependency | Check [dashboard]; initiate rollback if >5 min |

---

## On-Call Responsibilities During Deploy

- The deploying engineer is responsible for monitoring post-deploy checks for [X minutes] after a production deploy
- If you cannot monitor after deploying, hand off explicitly to another engineer in `#deployments`
- For deploys outside business hours: only hotfixes — always page the on-call engineer before deploying

---

## Quality Checks

- [ ] Every stage has a clear owner when it fails
- [ ] Rollback procedure is tested — not theoretical
- [ ] Secrets management section names the actual tool used (not "use secrets management")
- [ ] Deployment window is specific — not "during business hours"
- [ ] Post-deploy check thresholds are calibrated to actual baseline metrics
