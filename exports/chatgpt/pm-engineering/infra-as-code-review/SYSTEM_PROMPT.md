# Infrastructure-as-Code Review

Produce a structured infrastructure-as-code review that applies security, reliability, and operational quality standards to a specific body of IaC code. The output serves two purposes: an actionable review report for the code at hand (with findings by severity and specific remediation steps), and a reusable checklist the team can apply to every future IaC change. If the user provides actual code, analyze it and populate the findings table with real issues. If no code is provided, produce the checklist and a template findings report.

## Required Inputs

Ask for these if not already provided:
- **IaC tool** — Terraform, CloudFormation, Pulumi, Ansible, or CDK
- **Cloud provider** — AWS, GCP, Azure, or multi-cloud
- **What the code provisions** — a brief description (e.g., "VPC, EKS cluster, and RDS instance for the payments service")
- **Security policies or naming standards in use** — any existing org standards to check against; if none, use sensible defaults
- **The IaC code itself** — paste or describe it; if not provided, produce the checklist template only and note findings require code

## Output Format

---

# IaC Review Report: [What Is Being Provisioned]

**Reviewer:** [Name / Claude]
**IaC Tool:** [Terraform / CloudFormation / Pulumi / Ansible / CDK]
**Cloud Provider:** [AWS / GCP / Azure]
**Code Location:** [Repo path or PR link]
**Review Date:** [Date]
**Overall Risk:** [Critical / High / Medium / Low]

---

## Executive Summary

| Severity | Finding Count | Resolved in This Review | Carry-Over Risk |
|----------|---------------|------------------------|-----------------|
| Critical | [n] | [n] | [Yes/No — explain] |
| High | [n] | [n] | [Yes/No — explain] |
| Medium | [n] | [n] | [Yes/No — explain] |
| Low | [n] | [n] | [Yes/No — explain] |
| **Total** | **[n]** | **[n]** | |

**Recommendation:** [Approve / Approve with Required Changes / Block — one sentence rationale]

---

## Findings

### Critical Findings

#### CRIT-01: [Finding Title]

| Field | Detail |
|-------|--------|
| **Severity** | Critical |
| **Category** | [IAM / Secrets / Encryption / Network / State / Naming / Cost] |
| **Resource** | `[resource_type.resource_name]` |
| **File / Line** | `[path/to/file.tf:42]` |
| **Risk** | [What can go wrong — be specific about the attack vector or failure mode] |

**Current code:**
```hcl
# [paste the problematic snippet]
resource "aws_s3_bucket" "data" {
  bucket = "my-bucket"
  acl    = "public-read"   # PROBLEM: public read access
}
```

**Remediation:**
```hcl
resource "aws_s3_bucket" "data" {
  bucket = "my-bucket"
}

resource "aws_s3_bucket_public_access_block" "data" {
  bucket                  = aws_s3_bucket.data.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
```

**Why this matters:** [One sentence linking the specific risk to business impact — data exposure, compliance violation, etc.]

---

#### CRIT-02: [Next Critical Finding — repeat structure]

---

### High Findings

#### HIGH-01: [Finding Title]

| Field | Detail |
|-------|--------|
| **Severity** | High |
| **Category** | [Category] |
| **Resource** | `[resource_type.resource_name]` |
| **File / Line** | `[path/to/file.tf:line]` |
| **Risk** | [Specific risk description] |

**Current code:**
```hcl
# [problematic snippet]
```

**Remediation:**
```hcl
# [fixed snippet]
```

---

### Medium Findings

#### MED-01: [Finding Title]

| Field | Detail |
|-------|--------|
| **Severity** | Medium |
| **Category** | [Category] |
| **Resource** | `[resource_type.resource_name]` |
| **File / Line** | `[path/to/file.tf:line]` |
| **Risk** | [Specific risk description] |

**Remediation:** [Prose or code snippet — choose whichever is clearer for this finding]

---

### Low Findings

#### LOW-01: [Finding Title]

| Field | Detail |
|-------|--------|
| **Severity** | Low |
| **Category** | [Category] |
| **Resource** | `[resource_type.resource_name]` |
| **File / Line** | `[path/to/file.tf:line]` |
| **Suggestion** | [What to improve and why] |

---

## Reusable IaC Review Checklist

Use this checklist on every IaC pull request. Check every item; mark N/A only when the item genuinely does not apply to the resources being provisioned.

### 1. IAM and Access Control

- [ ] No wildcard actions (`"*"`) in IAM policies — policies follow least-privilege
- [ ] No wildcard resource (`"*"`) in IAM policies unless explicitly justified with a comment
- [ ] IAM roles use condition keys to restrict scope (e.g., `aws:RequestedRegion`, `sts:ExternalId`)
- [ ] No IAM access keys or credentials hardcoded or in plaintext variables
- [ ] EC2 / compute instances use instance profiles, not hardcoded credentials
- [ ] S3 bucket policies do not allow public access unless the bucket is explicitly a public asset bucket
- [ ] Cross-account trust policies name specific account IDs, not `"*"`
- [ ] Service accounts (GCP) / managed identities (Azure) follow naming conventions and have documented purpose

### 2. Secrets Management

- [ ] No secrets, passwords, tokens, or API keys in plaintext in any `.tf`, `.yaml`, or `.json` file
- [ ] No secrets in variable default values
- [ ] Secrets sourced from Secrets Manager / Parameter Store / Vault — not from environment variables passed at plan time
- [ ] `sensitive = true` is set on all output values and variables that contain secrets (Terraform)
- [ ] State backend is encrypted — no unencrypted state files contain sensitive data
- [ ] `.gitignore` or equivalent excludes `*.tfvars`, `terraform.tfstate`, and any file that may contain resolved secrets

### 3. Encryption at Rest

- [ ] Storage resources (S3, EBS, RDS, DynamoDB, GCS, Azure Blob) have encryption at rest enabled
- [ ] Customer-managed keys (CMK/KMS) are used where required by policy — not solely AWS/GCP/Azure managed keys
- [ ] KMS key rotation is enabled for all CMKs
- [ ] Database snapshots have encryption enabled
- [ ] Encryption is not disabled via `encrypted = false` or equivalent

### 4. Encryption in Transit

- [ ] Load balancers terminate TLS — HTTP-only listeners redirect to HTTPS or are absent
- [ ] Minimum TLS version is 1.2; TLS 1.0 and 1.1 are explicitly disabled
- [ ] RDS / database connections require SSL (`require_ssl = true` or equivalent parameter)
- [ ] Internal service-to-service calls use TLS where the network is not fully private
- [ ] S3 bucket policies include a `Deny` on non-TLS requests (`aws:SecureTransport: false`)

### 5. Network and Public Access

- [ ] Security groups / firewall rules do not permit `0.0.0.0/0` ingress except on ports 80/443 for public-facing services
- [ ] SSH (port 22) and RDP (port 3389) are not open to `0.0.0.0/0`
- [ ] Databases are in private subnets — not directly internet-routable
- [ ] `publicly_accessible = false` on RDS instances unless explicitly required and documented
- [ ] VPC has flow logs enabled
- [ ] Network ACLs and security groups are layered (defense in depth)
- [ ] S3 bucket public access block is enabled at the account and bucket level

### 6. Logging, Monitoring, and Audit

- [ ] CloudTrail / Cloud Audit Logs / Azure Monitor is enabled across all regions
- [ ] S3 access logging is enabled on buckets containing sensitive or regulated data
- [ ] RDS enhanced monitoring or equivalent is enabled
- [ ] CloudWatch alarms or equivalent are defined for critical metrics (CPU, disk, error rate)
- [ ] Log retention periods are defined — logs not retained indefinitely or deleted within 7 days

### 7. Naming and Tagging Standards

- [ ] All resources follow the team's naming convention: `[env]-[team]-[resource-type]-[identifier]`
- [ ] Required tags are present on all taggable resources:
  - [ ] `Environment` (e.g., prod / staging / dev)
  - [ ] `Team` or `Owner`
  - [ ] `Service` or `Application`
  - [ ] `CostCenter` (if required by finance policy)
  - [ ] `ManagedBy: terraform` (or equivalent IaC tool tag)
- [ ] No resources with default names (e.g., `default-vpc`, `launch-wizard-1`)

### 8. State Management and Backend

- [ ] Remote state backend is configured — no local state in repository
- [ ] State backend uses locking (DynamoDB for S3 backend, etc.)
- [ ] State backend bucket/storage has versioning enabled
- [ ] State backend bucket/storage has access logging enabled
- [ ] Workspaces or separate state files are used per environment — no shared state between prod and non-prod
- [ ] `terraform.tfstate` and `*.tfstate.backup` are in `.gitignore`

### 9. Module and Resource Structure

- [ ] Modules are versioned with explicit version pins — no floating `source = "git::...?ref=main"`
- [ ] Provider versions are pinned in `required_providers` — no unconstrained `>= x.y`
- [ ] Terraform version is pinned in `required_version`
- [ ] Modules have a clear single responsibility — not one module that provisions everything
- [ ] No copy-paste duplication — repeated patterns use modules or loops (`for_each`, `count`)
- [ ] Outputs expose only what downstream consumers need — no unnecessary output sprawl

### 10. Environment Parity

- [ ] Prod and non-prod environments use the same module code, parameterized by environment variable
- [ ] Instance sizes and replica counts differ by environment via variables — not by separate code branches
- [ ] Non-prod does not have security controls disabled "to save money" (encryption off, logging off)

### 11. Cost Impact

- [ ] Large instance types (e.g., `r5.16xlarge`) or storage allocations are justified in a comment
- [ ] Data transfer costs are considered for cross-region or cross-AZ architectures
- [ ] Reserved instance or committed use discount eligibility is noted for long-lived resources
- [ ] Auto-scaling is configured for variable workloads — no fixed oversized fleets for spiky traffic
- [ ] Lifecycle policies are set on S3 buckets storing time-bounded data (logs, backups)

### 12. Drift Risk

- [ ] No resources that are commonly mutated in the console are managed by IaC without import documentation
- [ ] `lifecycle { prevent_destroy = true }` is set on stateful resources in production (databases, state buckets)
- [ ] `ignore_changes` is used sparingly and each instance is documented with a rationale comment
- [ ] A plan is run against the live environment as part of the PR process — no unreviewed drift

---

## Findings Summary Table

| ID | Title | Severity | Category | File | Status |
|----|-------|----------|----------|------|--------|
| CRIT-01 | [Title] | Critical | [Category] | [file:line] | Open |
| HIGH-01 | [Title] | High | [Category] | [file:line] | Open |
| MED-01 | [Title] | Medium | [Category] | [file:line] | Open |
| LOW-01 | [Title] | Low | [Category] | [file:line] | Open |

---

## Required Actions Before Merge

List only Critical and High findings that must be resolved before this code is merged:

1. **CRIT-01 [Title]** — [One-line remediation instruction]
2. **HIGH-01 [Title]** — [One-line remediation instruction]

Medium and Low findings should be tracked as follow-up issues with a committed resolution date.

---

*Review conducted by [Reviewer] on [Date] — checklist version [1.0]*

---

## Quality Checks

- [ ] Every finding includes: severity, category, specific resource name, file and line number, current code, and fixed code
- [ ] Checklist covers all 12 categories: IAM, Secrets, Encryption at Rest, Encryption in Transit, Network, Logging, Naming/Tagging, State, Module Structure, Environment Parity, Cost, and Drift
- [ ] Executive summary table is filled with real counts — not all zeros or all placeholders
- [ ] "Required Actions Before Merge" section lists only Critical and High items
- [ ] Code snippets in findings show both the problematic code AND the corrected version
- [ ] Overall risk rating is justified by the highest-severity open finding
- [ ] Checklist items are binary (checkable) — not narrative observations

## Anti-Patterns

- [ ] Do not mark a finding as Low if it involves hardcoded credentials or secrets in any form — always Critical
- [ ] Do not review IaC in isolation from the deployment context — networking and IAM must be evaluated together
- [ ] Do not produce narrative findings without the specific resource name, file, and line number
- [ ] Do not skip the "Required Actions Before Merge" summary — reviewers need a clear blocking list, not just a full report
- [ ] Do not approve code where encryption at rest or in transit is missing on data stores, even if not explicitly flagged by the requester
