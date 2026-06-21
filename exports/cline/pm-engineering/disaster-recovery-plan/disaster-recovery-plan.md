# Disaster Recovery Plan Skill

Produce a complete disaster recovery plan for a service or system — giving engineers, SREs, and on-call responders everything they need to recover from a disaster scenario in the shortest possible time. A good DR plan is tested regularly, has exact commands (not vague instructions), and makes RTO/RPO targets measurable so the team knows whether recovery succeeded.

## Required Inputs

Ask for these if not already provided:
- **Service name** and what it does (business function and technical role)
- **Criticality tier** — business impact of extended downtime (e.g. Tier 1 = revenue-critical, Tier 2 = ops impact, Tier 3 = internal only)
- **Current infrastructure setup** — cloud provider, regions/zones, deployment model (Kubernetes, ECS, VMs, serverless)
- **RPO/RTO requirements** — Recovery Point Objective (how much data loss is acceptable) and Recovery Time Objective (how long can it be down)
- **Backup strategy** — what is backed up, how often, where backups are stored, retention policy
- **On-call contacts** — names and contact details for the responder chain

## Output Format

---

# Disaster Recovery Plan: [Service Name]

**Team:** [Team name] | **Tech lead:** [Name]
**Criticality tier:** [Tier 1 / Tier 2 / Tier 3] | **Last tested:** [Date]
**Next DR test:** [Date] | **Document owner:** [Name]
**Last updated:** [Date] | **Review cycle:** Quarterly

> **Emergency? Skip to Section 3 — Failure Scenario Runbooks.** Find the scenario that matches your situation and follow the steps exactly.

---

## 1. Recovery Targets

| Target | Value | Rationale |
|---|---|---|
| RPO (Recovery Point Objective) | [X minutes/hours] | [e.g. "Last committed transaction — database replication is synchronous"] |
| RTO (Recovery Time Objective) | [Y minutes/hours] | [e.g. "Revenue impact begins at 30 min; target recovery in 15 min"] |
| MTTR target (non-disaster) | [Z minutes] | [Operational incidents, not DR events] |
| Data retention (backups) | [N days/weeks] | [Compliance requirement or operational policy] |
| Backup frequency | [Every X hours] | [RPO-driven — backup interval must be ≤ RPO] |

**What these mean in practice:**
- If a database is corrupted, we can lose at most [X minutes] of transactions before the business impact is unacceptable.
- The service must be operational again within [Y minutes/hours] of declaring a DR event.
- If either target cannot be met, escalate to [Engineering Manager] immediately.

---

## 2. Failure Scenario Inventory

| Scenario | Likelihood | Impact | RTO target | RPO target | Runbook |
|---|---|---|---|---|---|
| Single availability zone failure | Medium | [Partial / Full outage] | [15 min] | [0 — no data loss] | Section 3.1 |
| Full region failure | Low | Full outage | [60 min] | [5 min] | Section 3.2 |
| Database corruption / data loss | Low | Full outage | [90 min] | [RPO value] | Section 3.3 |
| Critical dependency outage | High | [Partial degradation] | [30 min] | [N/A] | Section 3.4 |
| Security breach / ransomware | Very low | Full outage + investigation | [4 hours] | [Last clean backup] | Section 3.5 |
| Accidental bulk data deletion | Low | Partial or full data loss | [60 min] | [RPO value] | Section 3.6 |

---

## 3. Failure Scenario Runbooks

### 3.1 Single Availability Zone Failure

**Trigger:** One AZ becomes unreachable — pods/instances in that zone stop responding.
**Detection:** PagerDuty alert `[AlertName]` fires, or cloud provider status page shows AZ degradation.
**Expected RTO:** [15 minutes] | **Expected RPO:** Zero (no data loss if multi-AZ replication is working)

**Step 1 — Confirm the failure**
```bash
# Check pod/instance health across zones
kubectl get pods -o wide -n [namespace] | grep -v Running

# Check which nodes are affected
kubectl get nodes -o wide | grep -v Ready

# Verify cloud provider AZ status
# AWS: https://health.aws.amazon.com/health/status
# GCP: https://status.cloud.google.com
```

**Step 2 — Assess whether auto-recovery has occurred**
```bash
# If using auto-scaling, check if replacement instances launched
kubectl get pods -n [namespace] --watch

# Check deployment replica count
kubectl get deployment [service-name] -n [namespace]

# Verify load balancer health checks are passing
[cloud provider CLI command to check target group health]
```

**Step 3 — Force rescheduling if auto-recovery stalled**
```bash
# Cordon the affected node so no new pods schedule on it
kubectl cordon [node-name]

# Drain the node — moves all pods to healthy nodes
kubectl drain [node-name] --ignore-daemonsets --delete-emptydir-data

# Verify pods have rescheduled successfully
kubectl get pods -o wide -n [namespace]
```

**Step 4 — Verify service health**
```bash
# Smoke test key endpoints
curl -s -o /dev/null -w "%{http_code}" https://[service-url]/health
curl -s -o /dev/null -w "%{http_code}" https://[service-url]/[critical-endpoint]

# Check error rate in monitoring
[dashboard link or query]
```

**Recovery confirmed when:** All pods are Running, health check returns 200, error rate is at baseline.

---

### 3.2 Full Region Failure

**Trigger:** The primary region is entirely unavailable.
**Detection:** All service health checks failing, cloud provider status page confirms region-wide event.
**Expected RTO:** [60 minutes] | **Expected RPO:** [5 minutes — based on cross-region replication lag]

**Step 1 — Confirm regional failure (5 minutes)**
```bash
# Confirm the primary region is unreachable
ping [primary-region-endpoint] || echo "Primary region unreachable"

# Check replication lag on standby region database
[command to check replica lag — e.g. for RDS: aws rds describe-db-instances --region [dr-region]]
```

**Step 2 — Declare DR event and notify (2 minutes)**

Post to `#incidents`:
```
🔴 DR EVENT — [Service Name] — Region Failure
Primary region: [region] — UNREACHABLE
Activating failover to: [dr-region]
Incident commander: [Name]
Next update: 15 minutes
```

Page [Engineering Manager] and [CTO/VP Eng] via PagerDuty.

**Step 3 — Promote DR database (10 minutes)**
```bash
# AWS RDS — promote read replica to primary
aws rds promote-read-replica \
  --db-instance-identifier [dr-replica-identifier] \
  --region [dr-region]

# Wait for promotion to complete
aws rds wait db-instance-available \
  --db-instance-identifier [dr-replica-identifier] \
  --region [dr-region]

# Record the new database endpoint
aws rds describe-db-instances \
  --db-instance-identifier [dr-replica-identifier] \
  --region [dr-region] \
  --query 'DBInstances[0].Endpoint.Address'
```

**Step 4 — Deploy service in DR region (20 minutes)**
```bash
# Update service configuration to point at DR database
kubectl set env deployment/[service-name] \
  DATABASE_URL=[new-dr-database-url] \
  -n [namespace] \
  --context [dr-region-context]

# Scale up the DR deployment
kubectl scale deployment/[service-name] --replicas=[N] \
  -n [namespace] \
  --context [dr-region-context]

# Verify all pods are running
kubectl get pods -n [namespace] --context [dr-region-context]
```

**Step 5 — Cut over DNS / load balancer (5 minutes)**
```bash
# Update DNS to point to DR region load balancer
# AWS Route 53:
aws route53 change-resource-record-sets \
  --hosted-zone-id [zone-id] \
  --change-batch file://dr-failover-dns.json

# Verify DNS propagation (may take up to [TTL] seconds)
dig [service-domain] @8.8.8.8
```

**Step 6 — Verify end-to-end**
```bash
# Full smoke test against DR endpoint
curl -s https://[service-url]/health
[run automated smoke test suite if available]
```

**Recovery confirmed when:** DNS resolves to DR region, smoke tests pass, error rate is at baseline.

**Post-failover actions (not urgent — after service is stable):**
- Do not fail back to primary until root cause is confirmed resolved
- Document data loss window (check replication lag at time of failure)
- Begin post-incident review — see [incident-postmortem skill]

---

### 3.3 Database Corruption or Data Loss

**Trigger:** Data in the database is corrupted, deleted, or otherwise incorrect due to a software bug, operator error, or hardware fault.
**Detection:** Application errors referencing missing/invalid data, monitoring alerts on query error rate, user reports.
**Expected RTO:** [90 minutes] | **Expected RPO:** [Backup interval — e.g. 1 hour]

**Step 1 — Stop the bleeding immediately**
```bash
# Put the service into maintenance mode to prevent further writes to corrupted data
[command to enable maintenance mode — e.g. kubectl set env deployment/[name] MAINTENANCE_MODE=true]

# Or: scale down the service to zero to prevent writes
kubectl scale deployment/[service-name] --replicas=0 -n [namespace]
```

**Step 2 — Assess scope of corruption**
```bash
# Identify which tables/records are affected
[SQL query to check data integrity — e.g.]
# psql $DATABASE_URL -c "SELECT COUNT(*) FROM [table] WHERE [integrity check condition]"

# Determine when corruption started (cross-reference with deploy times and error logs)
[log query to find earliest error — e.g. in Datadog:]
# service:[service-name] status:error "[corruption error message]" | sort by timestamp asc
```

**Step 3 — Identify the correct restore point**
```bash
# List available backups
[command to list backups — e.g. for RDS:]
aws rds describe-db-snapshots \
  --db-instance-identifier [db-identifier] \
  --query 'DBSnapshots[*].[SnapshotCreateTime,DBSnapshotIdentifier]' \
  --output table

# Choose the most recent backup BEFORE corruption started
# Record the chosen snapshot ID: [snapshot-id]
```

**Step 4 — Restore from backup**
```bash
# Restore to a NEW database instance (never overwrite production directly)
aws rds restore-db-instance-from-db-snapshot \
  --db-instance-identifier [service-name]-restored-[date] \
  --db-snapshot-identifier [snapshot-id] \
  --region [region]

# Wait for restore to complete
aws rds wait db-instance-available \
  --db-instance-identifier [service-name]-restored-[date]

# Get the restored instance endpoint
aws rds describe-db-instances \
  --db-instance-identifier [service-name]-restored-[date] \
  --query 'DBInstances[0].Endpoint.Address'
```

**Step 5 — Validate restored data**
```bash
# Connect to restored database and verify integrity
psql [restored-db-endpoint] -U [user] -d [database] -c "[data integrity query]"

# Confirm record counts match expectations
psql [restored-db-endpoint] -U [user] -d [database] -c "SELECT COUNT(*) FROM [critical-table]"
```

**Step 6 — Point service at restored database**
```bash
kubectl set env deployment/[service-name] \
  DATABASE_URL=postgres://[user]:[pass]@[restored-endpoint]/[db] \
  -n [namespace]

kubectl scale deployment/[service-name] --replicas=[N] -n [namespace]
```

**Recovery confirmed when:** Service is running against restored database, data integrity checks pass, error rate is at baseline.

---

### 3.4 Critical Dependency Outage

**Trigger:** A service that [service name] depends on is unavailable or degraded.
**Detection:** Increased error rate or latency on endpoints that call [dependency], alerts from dependency owner.
**Expected RTO:** Depends on dependency — [30 minutes for mitigation, resolution depends on dependency owner]

**Dependency map:**

| Dependency | Criticality | Degraded behaviour | Mitigation |
|---|---|---|---|
| [Database] | Critical — all writes fail | Full outage | Activate DR database (Section 3.3) |
| [Cache — Redis] | High — latency increases | Performance degradation | Bypass cache, serve from DB |
| [Auth service] | Critical — auth fails | All authenticated endpoints fail | Return cached tokens (if implemented) |
| [Message queue] | Medium — async processing delays | Writes succeed, async jobs queue | Queue backlog — see on-call runbook |
| [External API — name] | Low — feature X unavailable | Graceful degradation | Feature flag to disable feature X |

**Mitigation steps:**
```bash
# Enable circuit breaker / fallback for [dependency] if implemented
kubectl set env deployment/[service-name] [DEPENDENCY]_CIRCUIT_BREAKER=open -n [namespace]

# Enable feature flag to disable [dependency-backed feature]
[feature flag CLI command or dashboard link]

# Check if dependency has a status page
# [Dependency status URL]
```

**Escalation:** Contact [dependency] on-call via [PagerDuty / Slack `#[channel]`]. Share your service's error rate and the time dependency errors started.

---

### 3.5 Security Breach or Ransomware

**Trigger:** Evidence of unauthorized access, data exfiltration, or encryption of service data.
**Detection:** Security tooling alert, unusual access patterns, user reports of data exposure.
**Expected RTO:** [4+ hours — prioritise containment over speed] | **Expected RPO:** [Last verified clean backup]

**Step 1 — Isolate immediately**
```bash
# Take the service offline — do not attempt to recover while breach is active
kubectl scale deployment/[service-name] --replicas=0 -n [namespace]

# Revoke all API keys and service account credentials immediately
[command to rotate secrets — e.g. via Vault or cloud provider]

# Block all external access at network level
[firewall/security group command to deny all inbound traffic]
```

**Step 2 — Notify security team immediately**
Page [Security lead] via PagerDuty. Do NOT attempt to remediate without security team involvement.

Post to `#security-incidents` (private channel, not `#incidents`):
```
🔴 SECURITY INCIDENT — [Service Name]
Time detected: [Time]
Evidence: [One sentence — what was observed]
Actions taken: Service isolated, credentials revoked
Awaiting: Security team guidance
```

**Step 3 — Preserve evidence**
```bash
# Export current logs before any remediation
[log export command — preserve evidence for forensics]

# Snapshot the current state of all infrastructure
[snapshot/image command]
```

**Steps 4+ — Follow security team guidance.** Do not restore from backup until security team confirms the attack vector is closed.

---

### 3.6 Accidental Bulk Data Deletion

**Trigger:** An operator, script, or application bug has deleted records in bulk.
**Detection:** Sudden drop in record counts, user reports of missing data, application errors.
**Expected RTO:** [60 minutes] | **Expected RPO:** [Backup interval]

```bash
# Step 1 — Stop further writes immediately
kubectl scale deployment/[service-name] --replicas=0 -n [namespace]

# Step 2 — Determine what was deleted and when
psql $DATABASE_URL -c "
  SELECT schemaname, tablename,
         n_dead_tup, last_autovacuum
  FROM pg_stat_user_tables
  ORDER BY n_dead_tup DESC LIMIT 10;
"

# Step 3 — Check if deletion is recoverable via MVCC (PostgreSQL)
# Records may still be recoverable if VACUUM has not run
psql $DATABASE_URL -c "
  SELECT * FROM [table]
  WHERE xmax != 0  -- recently deleted rows
  LIMIT 100;
"

# Step 4 — If not recoverable via MVCC, restore from backup
# Follow Section 3.3 (Database Corruption runbook) from Step 3 onward
```

---

## 4. Backup and Restore Procedures

### Backup Configuration

| Data store | Backup type | Frequency | Retention | Location |
|---|---|---|---|---|
| [Primary database] | Automated snapshots | Every [N] hours | [N] days | [S3 bucket / cloud storage path] |
| [Primary database] | Transaction log backups | Continuous | [N] days | [Location] |
| [Secondary store — e.g. Redis] | RDB dump | Daily | [N] days | [Location] |
| [Blob/object storage] | Cross-region replication | Continuous | [N] days | [DR region bucket] |
| [Config / secrets] | Terraform state + Vault backup | On change | Indefinite | [Location] |

### Backup Validation (Run Weekly)

```bash
# Test restore of latest database backup to a throwaway instance
aws rds restore-db-instance-from-db-snapshot \
  --db-instance-identifier [service-name]-backup-test-$(date +%Y%m%d) \
  --db-snapshot-identifier $(aws rds describe-db-snapshots \
    --db-instance-identifier [db-id] \
    --query 'sort_by(DBSnapshots, &SnapshotCreateTime)[-1].DBSnapshotIdentifier' \
    --output text)

# Wait for restore, then run integrity checks
psql [test-instance-endpoint] -c "[integrity check query]"

# Confirm row counts match recent production values (allow ≤ RPO difference)
psql [test-instance-endpoint] -c "SELECT COUNT(*) FROM [critical-table]"

# Destroy the test instance
aws rds delete-db-instance \
  --db-instance-identifier [service-name]-backup-test-$(date +%Y%m%d) \
  --skip-final-snapshot
```

---

## 5. DR Testing Cadence

Regular testing is mandatory. An untested DR plan is not a DR plan.

| Test type | Frequency | Who runs it | Pass criteria |
|---|---|---|---|
| Backup restore validation | Weekly (automated) | On-call rotation | Restore completes, integrity checks pass |
| Zone failover drill | Monthly | Engineering team | RTO target met, zero data loss |
| Region failover drill | Quarterly | Engineering + SRE | RTO/RPO targets met |
| Full DR game day | Annually | Engineering + stakeholders | All scenarios exercised, gaps documented |
| Chaos engineering (infra failures) | Weekly (automated) | Chaos engineering tooling | Service degrades gracefully, recovers automatically |

### Game Day Procedure

1. **Pre-game day (1 week before):** Notify all stakeholders, freeze production changes for the day, prepare DR environment.
2. **Scope definition:** Choose 2–3 scenarios from Section 2. Document expected outcomes before the test.
3. **Execute:** One person acts as incident commander, others execute runbook steps while another observes and times.
4. **Measure:** Record actual RTO and RPO against targets for each scenario.
5. **Debrief (same day):** Document gaps, runbook inaccuracies, and automation opportunities.
6. **Action items:** File tickets for every gap found. Priority: P1 items must be fixed before next game day.

---

## 6. Communication Plan

### Internal Communication During DR Event

**Incident commander responsibilities:**
- Declare the DR event and open the incident channel
- Post updates every 15 minutes minimum
- Make the call to fail over (do not let the team decide by committee)
- Notify business stakeholders of expected recovery time

**Notify these people at DR event start:**

| Role | Name | Contact | When to notify |
|---|---|---|---|
| Engineering manager | [Name] | [Slack / Phone] | Immediately |
| CTO / VP Engineering | [Name] | [Phone] | Tier 1 services: immediately |
| Customer success lead | [Name] | [Slack] | If customer-facing impact |
| Security lead | [Name] | [Slack / PagerDuty] | If breach suspected |
| Legal / compliance | [Name] | [Email / Phone] | If data loss involves PII |

### Communication Templates

**DR event declared:**
```
🔴 DR EVENT — [Service Name]
Time: [HH:MM UTC]
Scenario: [Zone failure / Region failure / Data loss / etc.]
Impact: [Who is affected and how]
RTO target: [X minutes]
Incident commander: [Name]
War room: [Slack channel / call link]
Next update: [Time + 15 min]
```

**Status update (every 15 minutes):**
```
🔴 DR UPDATE — [Service Name] — [HH:MM UTC]
Status: [Investigating / Executing recovery / Verifying]
Progress: [One sentence on current step]
Blockers: [Any — or "None"]
Updated RTO estimate: [Time]
Next update: [Time + 15 min]
```

**Recovery confirmed:**
```
✅ DR RESOLVED — [Service Name] — [HH:MM UTC]
Total downtime: [X minutes]
Data loss: [None / X minutes of transactions]
RTO target: [X min] — Actual: [Y min] — [MET / MISSED]
RPO target: [X min] — Actual: [Y min] — [MET / MISSED]
Root cause: [One sentence]
Post-incident review: [Scheduled for / Link when created]
```

---

## 7. DR Readiness Checklist

Run this checklist quarterly and before any major infrastructure change:

**Backups:**
- [ ] Automated backups are running and alerts fire if they fail
- [ ] Most recent backup restore was tested within the last 7 days
- [ ] Backup retention meets RPO and compliance requirements
- [ ] Backups are stored in a separate region / account from primary

**Failover infrastructure:**
- [ ] DR region / environment exists and is provisioned (not just documented)
- [ ] DNS failover procedure is documented with exact commands
- [ ] DR database replica is current (replication lag is within RPO)
- [ ] Service can be deployed in DR region with a single command or automated pipeline

**Runbooks:**
- [ ] All runbooks in Section 3 have been tested within the last quarter
- [ ] Runbook commands have been verified against current infrastructure (no stale references)
- [ ] Contact list is current (no departed employees)

**Access:**
- [ ] On-call engineers have access to DR region console / CLI
- [ ] Service account credentials for DR region are provisioned and tested
- [ ] Break-glass accounts exist for emergency access if SSO is unavailable

**Monitoring:**
- [ ] Monitoring exists in DR region (not just primary)
- [ ] Alerts fire correctly when DR environment has issues

---

## Quality Checks

- [ ] RPO and RTO targets are specific numbers, not ranges, and are agreed with the business
- [ ] Every command in every runbook has been run by a human in the last quarter — not copied from documentation untested
- [ ] DR database exists in the DR region and replication lag is monitored
- [ ] Backup restore has been tested end-to-end within the last 7 days
- [ ] The game day schedule is on the team calendar — not just documented here
- [ ] Contact list contains current phone numbers, not just Slack handles (Slack may be down during a DR event)
- [ ] Security breach runbook (3.5) explicitly names the security team contact and does not attempt self-remediation
- [ ] All thresholds (RTO/RPO) are visible in the monitoring dashboard so actual vs. target is measurable in real time

## Anti-Patterns

- [ ] Do not write runbook commands without testing them — an untested command in a runbook is actively dangerous during a real disaster when cognitive load is highest
- [ ] Do not set RTO/RPO targets without business sign-off — technical teams often set aspirational targets that do not reflect actual business cost tolerance for downtime
- [ ] Do not include only the "happy path" of each failover scenario — runbooks must explicitly cover what to do when the recovery step itself fails
- [ ] Do not list Slack handles as the only escalation contact — Slack may be unavailable during a region-wide failure; phone numbers are mandatory
- [ ] Do not schedule DR game days without pre-committing to fix the gaps found — a game day that produces action items no one owns is theater, not preparedness
