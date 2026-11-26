# Worked Example — Technical Debt Register Skill

## The brief

Bazareo is a European e-commerce marketplace (~9M monthly buyers, 41,000 active sellers) running a 9-year-old Rails monolith with six services extracted over the last three years (orders-svc, payments-svc, image-svc, search-svc, notify-svc, sellers-svc). The Core Commerce group — 22 engineers in three squads (Checkout, Catalogue, Seller) out of a 40-engineer org — is building this register for Q3 2026 planning. Known pain: the monolith is on Rails 6.1 (EOL since March 2026), a seller-payout cron failed silently twice in Q2, checkout writes orders in two places, and CI flakiness is eating retro time every sprint. Complication: the CEO has publicly committed the same three squads to launching the marketplace in two new countries by December, so the long-desired checkout extraction is competing with a company-level promise.

## The output

---

# Technical Debt Register: Core Commerce Group

**Team:** Core Commerce (Checkout, Catalogue, Seller squads — 22 engineers) | **Service(s):** monolith (`bazareo-web`), orders-svc, payments-svc, image-svc, search-svc, notify-svc, sellers-svc
**Author:** [Leave blank for user to fill] | **Last updated:** 2026-07-14
**Planning period:** Q3 2026 | **Review cadence:** Quarterly (interest re-priced each review)

---

## Overview

Core Commerce carries the classic mid-extraction debt profile: the monolith still owns the most valuable flows (checkout, payouts) while six extracted services have created cross-service seams with no tracing, no contract tests, and duplicated write paths. The business context matters this quarter: the international launch (two new countries by December, a public commitment) will multiply traffic through exactly the seams listed below, so Q3 priorities favour *silent-failure elimination and detection* over structural work — we are hardening the floor before the launch stands on it.

**Total items in register:** 13
**Unresolved items:** 13 (11 open/in progress, 2 deferred with review dates)
**Critical/High priority items:** 8
**Estimated total resolution effort:** ~21 engineer-weeks (~16 excluding deferred items)

---

## Debt Category Definitions

| Category | Description | Examples |
|---|---|---|
| **Code quality** | Code that works but is hard to change safely | Duplicated logic, deeply nested conditionals, inconsistent error handling, missing abstraction |
| **Architecture** | Structural decisions that limit scalability or increase coupling | Monolith that should be decomposed, sync calls that should be async, missing domain boundaries |
| **Testing** | Gaps in test coverage that increase regression risk | Missing unit tests, no integration tests, flaky test suite, no test data management |
| **Security** | Known vulnerabilities or missing security controls | Outdated dependencies with CVEs, missing rate limiting, over-broad production access |
| **Dependencies** | Outdated or risky external dependencies | End-of-life libraries, major version lag, abandoned packages |
| **Infrastructure** | Infrastructure that limits reliability or developer productivity | Manual deployment steps, no IaC, single-AZ, missing autoscaling |
| **Observability** | Gaps in visibility that slow incident response | Missing metrics, no distributed tracing, poor log structure, no alerting on key SLIs |
| **Process** | Manual or error-prone operational processes | Manual DB migrations, no runbooks, tribal knowledge not documented |

---

## Debt Register

### Scoring Method

**Business impact (1–5):**
- 5 — Blocking growth, causing production incidents, or creating compliance risk
- 4 — Significantly slowing delivery or increasing incident likelihood
- 3 — Noticeable slowdown; manageable but accumulating
- 2 — Minor friction; low immediate risk
- 1 — Cosmetic or aspirational; no current business impact

**Effort to resolve (1–5, lower = easier):**
- 1 — <0.5 day; single engineer
- 2 — 0.5–2 days; single engineer
- 3 — 3–5 days; single engineer or small pair
- 4 — 1–2 weeks; team collaboration required
- 5 — >2 weeks; significant planning and coordination

**Priority score = Business impact × (6 − Effort)** *(rewards high-impact, low-effort items)*

---

| ID | Item | Category | Business impact (1–5) | Effort (1–5) | Priority score | Status | Owner |
|---|---|---|---|---|---|---|---|
| TD-001 | No integration tests across the checkout dual-write (monolith `orders` table + orders-svc) | Testing | 5 | 3 | 15 | Open | R. Okonkwo |
| TD-002 | Monolith on Rails 6.1 (EOL Mar 2026); security fixes now hand-backported patches | Security | 5 | 4 | 10 | Open | J. Lindqvist |
| TD-003 | Catalogue search reindex is a manual rake task run from an engineer's laptop | Process | 4 | 2 | 16 | Open | P. Duarte |
| TD-004 | image-svc deployed from hand-edited Kubernetes manifests; no IaC, no rollback history | Infrastructure | 3 | 2 | 12 | In progress | M. Haddad |
| TD-005 | `OrderCreation` service object — 640 lines, writes to 11 tables, no seam for unit testing | Code quality | 4 | 4 | 8 | Open | R. Okonkwo |
| TD-006 | No distributed tracing across monolith → 6 services; cross-service debugging is timestamp-grepping | Observability | 4 | 3 | 12 | Open | A. Whitfield |
| TD-007 | Elasticsearch client gem two major versions behind; blocks the ES 8 cluster upgrade | Dependencies | 3 | 3 | 9 | Open | P. Duarte |
| TD-008 | Seller payout cron has no failure alerting — a skipped run is invisible until sellers email support | Observability | 5 | 1 | 25 | Open | T. Varga |
| TD-009 | Flaky-spec quarantine list at 118 specs; CI auto-retry is masking real regressions | Testing | 4 | 3 | 12 | Open | J. Lindqvist |
| TD-010 | Feature flags are ENV vars — every flag change requires a full deploy | Infrastructure | 3 | 2 | 12 | Open | M. Haddad |
| TD-011 | Checkout logic split across monolith and payments-svc; full extraction unscheduled | Architecture | 4 | 5 | 4 | Deferred | S. Adeyemi (EM) |
| TD-012 | Production Rails console exposes seller bank details in plain read to all engineers | Security | 5 | 3 | 15 | Open | T. Varga |
| TD-013 | Legacy admin UI on Bootstrap 3 + Sprockets pipeline; replaced by new admin in 2027 | Code quality | 2 | 4 | 4 | Deferred | S. Adeyemi (EM) |

---

## Category Breakdown

```
Category distribution (by item count):
─────────────────────────────────────────────
Code quality     ████░░░░░░  2 items  (15%)
Architecture     ██░░░░░░░░  1 item   (8%)
Testing          ████░░░░░░  2 items  (15%)
Security         ████░░░░░░  2 items  (15%)
Dependencies     ██░░░░░░░░  1 item   (8%)
Infrastructure   ████░░░░░░  2 items  (15%)
Observability    ████░░░░░░  2 items  (15%)
Process          ██░░░░░░░░  1 item   (8%)
─────────────────────────────────────────────

Priority distribution:
Critical (score 20–25): 1 item   (TD-008)
High     (score 12–19): 7 items  (TD-001, TD-003, TD-004, TD-006, TD-009, TD-010, TD-012)
Medium   (score  6–11): 3 items  (TD-002, TD-005, TD-007)
Low      (score   1–5): 2 items  (TD-011, TD-013 — both deferred with review dates)
```

Note: TD-002 (Rails 6.1 EOL) scores "Medium" because the formula honestly prices its 1–2 week effort — but it is scheduled on the fixed security cadence regardless of score (see guiding principles), not left to fight for a slot on points.

---

## Top 5 Priority Items — Resolution Plans

### TD-008: Seller payout cron has no failure alerting

**Priority score:** 25 | **Category:** Observability | **Owner:** T. Varga

**Problem:**
The nightly payout job (`payouts:disburse`) runs from a cron with no success/failure signal. If it raises or is skipped (host reboot, lock contention), nothing pages — the failure surfaces only when sellers email support about missing money. This is a control gap we chose not to build, not a bug: the job itself works.

**Business impact:**
Two silent skips in Q2 2026 delayed ~€310k of seller payouts by 24–48h each, generated 190+ support tickets, and triggered a churn-risk escalation with two top-50 sellers. Interest: ~1 incident/quarter at current rate, each costing ~15–25 support-hours plus seller-trust damage that is hard to price but easy to compound — and payout volume roughly doubles at international launch.

**Resolution approach:**
Wrap the job in a heartbeat check: emit a success metric on completion, alert if the metric is absent by 06:00 CET or if the failure counter is non-zero, and page the Seller squad's on-call. Add a runbook link to the alert.

**Steps:**
1. Emit `payouts.disburse.completed` metric (count + amount) at end of run
2. Add absence alert (no completion metric by 06:00 CET) and failure alert (exception counter > 0), routed to Seller on-call
3. Write the "payout run failed or skipped" runbook page and link it from the alert
4. Backfill a synthetic test: force-skip in staging and confirm the page fires

**Acceptance criteria:**
- [ ] A forced skip in staging pages on-call within 15 minutes
- [ ] Alert links to a runbook with re-run instructions
- [ ] Zero silent payout skips in the 60 days post-deploy

**Effort estimate:** 3 points / ~1 day
**Suggested sprint:** Q3 Sprint 1

---

### TD-003: Manual catalogue search reindex

**Priority score:** 16 | **Category:** Process | **Owner:** P. Duarte

**Problem:**
Full catalogue reindexes are run by SSHing to a utility host (historically, an engineer's laptop) and invoking a rake task with hand-typed arguments. Only two engineers know the incantation; one is leaving in September.

**Business impact:**
Reindexes consumed ~14 engineering-hours in Q2, and a mistyped index-alias argument caused a SEV-2 in May (34 minutes of degraded search, ~4% of sessions). Interest is decaying-to-worse: the international launch adds per-country indexes, tripling the number of manual runs.

**Resolution approach:**
Convert the rake task into a parameterised, idempotent job triggered from the deploy tooling, with an alias-swap safety check (refuse to swap if the new index doc-count is <95% of the old) and progress logging.

**Steps:**
1. Move reindex into a background job with explicit `--index` / `--alias` parameters and dry-run mode
2. Add the doc-count guard before alias swap
3. Expose a one-click trigger in the internal ops panel; remove SSH instructions from the wiki
4. Pair-run once with each squad's on-call to spread operational knowledge

**Acceptance criteria:**
- [ ] Reindex runs end-to-end from the ops panel with no shell access
- [ ] Alias swap refuses when doc-count guard fails (tested in staging)
- [ ] At least 4 engineers have run it successfully

**Effort estimate:** 5 points / ~2 days
**Suggested sprint:** Q3 Sprint 2

---

### TD-001: No integration tests across the checkout dual-write

**Priority score:** 15 | **Category:** Testing | **Owner:** R. Okonkwo

**Problem:**
An order is written to the monolith's `orders` table and mirrored to orders-svc in the same request, with no contract or integration test covering the pair. Drift between the two write paths is caught in production or not at all.

**Business impact:**
Three order-mirroring drift bugs reached production in the last two quarters (one caused 41 unfulfillable orders). Every checkout change carries a ~2–4 hour manual verification tax across both write paths — roughly 20–30 eng-hours/quarter of velocity interest, rising with launch-driven checkout work.

**Resolution approach:**
Add a contract test suite that places representative orders (guest, registered, multi-seller, voucher) through the full dual-write and asserts field-level parity between the monolith row and the orders-svc record, running in CI on every checkout-touching PR.

**Steps:**
1. Define the parity contract (field map + tolerated differences) with the Checkout squad
2. Build test harness that runs both writes against ephemeral DBs and diffs the results
3. Cover the 4 representative order shapes; wire into CI as a required check on checkout paths
4. Add a nightly production reconciliation report (count + checksum) as a backstop

**Acceptance criteria:**
- [ ] CI fails on a seeded parity-breaking change (verified by mutation test)
- [ ] All 4 order shapes covered
- [ ] Nightly reconciliation report shows zero drift for 30 consecutive days

**Effort estimate:** 8 points / ~4 days
**Suggested sprint:** Q3 Sprint 3 → Q4 Sprint 1 (reconciliation backstop)

---

### TD-012: Production console exposes seller bank details

**Priority score:** 15 | **Category:** Security | **Owner:** T. Varga

**Problem:**
Any engineer with production Rails console access (currently all 22) can read seller bank account fields in plain form. Access is logged at session level but not at query level.

**Business impact:**
Compliance risk, not incident risk: this is a likely finding in the payment-partner audit scheduled for Q4, and a breach of our own data-handling policy. A finding there could delay the international launch's payment licensing — which converts this from "technical" to a direct launch dependency.

**Resolution approach:**
Mask bank-detail attributes at the model layer for console sessions, gate unmasked reads behind a break-glass role with query-level audit logging, and cut default console access to a named on-call group.

**Steps:**
1. Add attribute masking for `sellers.bank_*` fields in console contexts
2. Create break-glass role with per-read audit log and 24h expiry
3. Reduce standing console access to the on-call group (8 engineers); document the request path
4. Demo the control to the compliance lead before the Q4 audit window

**Acceptance criteria:**
- [ ] Default console session shows masked values (screenshot evidence for audit)
- [ ] Unmasked read produces an audit log entry with actor, record, and timestamp
- [ ] Standing access list ≤ 8 named engineers

**Effort estimate:** 5 points / ~3 days
**Suggested sprint:** Q3 Sprint 2

---

### TD-006: No distributed tracing across services

**Priority score:** 12 | **Category:** Observability | **Owner:** A. Whitfield

*(Chosen over the other score-12 items — TD-004, TD-009, TD-010 — because its priced interest is highest: it inflates every cross-service incident, including the payout and checkout items above.)*

**Problem:**
No trace propagation exists between the monolith and the six services; incident correlation means grepping timestamps across seven log streams.

**Business impact:**
Cross-service incidents average ~3.1h MTTR vs ~40min for monolith-only incidents (Q1–Q2 incident review, n=14). Priced at ~40–60 eng-hours/quarter of incident interest, before counting the customer-facing minutes.

**Resolution approach:**
Propagate a trace ID from the edge through the monolith and all service calls; ship spans to the existing telemetry backend; start with the checkout and payout paths rather than boiling the ocean.

**Steps:**
1. Add trace-context propagation middleware to the monolith and the two highest-traffic services (orders-svc, payments-svc)
2. Instrument checkout and payout request paths end-to-end
3. Extend to the remaining four services
4. Add "find the trace" step to the incident runbook template

**Acceptance criteria:**
- [ ] A single trace ID follows a checkout request across monolith + orders-svc + payments-svc
- [ ] On-call can pull a full trace for a given order ID in <2 minutes (timed drill)
- [ ] All six services propagate context

**Effort estimate:** 8 points / ~5 days (phased)
**Suggested sprint:** Q3 Sprint 3 (phase 1); Q4 Sprint 2 (remaining services)

---

## Debt Reduction Roadmap

### Guiding principles

- Allocate 15% of each sprint's capacity to debt resolution (Q4 exception: 10% during launch-critical sprints, agreed with the EM — honesty over aspiration)
- Security and dependency debt is addressed on a fixed cadence regardless of priority score — TD-002 is scheduled even though the formula ranks it "Medium"
- No new feature work in modules with Critical debt unless the debt is scheduled for the current sprint
- Debt items closed without a resolution (accepted/deferred) must have a named owner and a review date

### Quarterly plan

| Quarter | Focus area | Items targeted | Estimated capacity | Expected outcome |
|---|---|---|---|---|
| **Q3 2026** (current) | Silent failures + audit surface | TD-008, TD-003, TD-012, TD-006 (phase 1) | ~21 points / ~11 eng-days | Payout failures page on-call; reindex is one-click; bank details masked before Q4 audit; checkout path traced |
| **Q4 2026** | Launch hardening (reduced debt budget) | TD-001, TD-006 (phase 2), TD-004 (finish) | ~14 points / ~7 eng-days | Dual-write contract tests in CI; tracing across all services; image-svc on IaC |
| **Q1 2027** | Platform hygiene | TD-002, TD-010, TD-009 | ~24 points / ~12 eng-days | Rails 7.1 shipped; runtime feature flags; quarantine list <30 specs |
| **Q2 2027** | Structure | TD-005, TD-007; revisit TD-011 | ~20 points / ~10 eng-days | `OrderCreation` decomposed with test seams; ES 8 unblocked; checkout-extraction decision made with post-launch data |

### Sprint allocation model

```
Sprint capacity (Checkout squad, 2-week sprint): 40 story points

Allocation:
  ├── Feature work:        40 × 0.75 = ~30 points  (75%)
  ├── Debt resolution:     40 × 0.15 = ~6 points   (15%)
  └── Unplanned/bugs:      40 × 0.10 = ~4 points   (10%)

Debt items that fit in one sprint (≤6 points each):
  ✓ TD-008 (3 points)
  ✓ TD-003 (5 points)
  ✓ TD-012 (5 points)
  ✓ TD-010 (4 points)

Multi-sprint debt items (break into phases):
  ~ TD-001: contract suite (6 pts) → nightly reconciliation (2 pts)
  ~ TD-006: checkout/payout paths (5 pts) → remaining services (3 pts)
  ~ TD-002: Rails 7.1 needs a dedicated upgrade pair across 2 sprints
```

---

## Accepted / Deferred Debt

Items where the cost of remediation currently exceeds the business value, accepted with explicit review dates.

| ID | Item | Reason for deferral | Review date | Owner |
|---|---|---|---|---|
| TD-011 | Checkout extraction from monolith | The engineering case is real (score suppressed only by its 5-effort), but the same three squads own the international launch — a company-level commitment for December. Running a checkout re-architecture and a launch through the same code path simultaneously would put both at risk. This is a sequencing decision, not a rejection: TD-001 and TD-006 are deliberately chosen to make the eventual extraction safer and cheaper. | 2027-01-15 (post-launch stabilisation) | S. Adeyemi (EM) |
| TD-013 | Legacy admin UI (Bootstrap 3 + Sprockets) | Expiring debt: the replacement admin ships in 2027 and this code is deleted with it. Fixing it now is paying principal on a loan we're about to discharge. Patch-only until then. | 2027-03-31 | S. Adeyemi (EM) |

**Policy:** No item may be deferred more than twice without escalation to the engineering manager.

---

## Why it's shaped this way

- **Every priority score is the formula, including the awkward ones.** TD-002 (Rails EOL) lands at "Medium 10" because its effort is honestly a 4 — the register doesn't inflate the score to force scheduling (the Anti-Pattern "do not score debt items arbitrarily"), it uses the guiding principle that security/dependency debt rides a fixed cadence instead. The Quality Check "security items are not scored below their actual business impact" is satisfied by the impact-5, not by gaming the total.
- **Interest is priced, not adjectivised**, per `references/debt-pricing.md`: TD-008 carries "€310k delayed, 190+ tickets, ~1 incident/quarter", TD-006 carries "3.1h vs 40min MTTR, ~40–60 eng-hours/quarter" — ranges with stated sources, because "a defensible range beats 'high' by a mile". That's what lets debt compete with launch features in the same currency.
- **The checkout-split deferral is the political centre of the document, handled diplomatically.** The CEO's public launch commitment is named as "a company-level commitment" and the deferral is framed as sequencing — with a review date, a named owner, and the explicit note that TD-001/TD-006 are chosen to *de-risk the eventual extraction*. This satisfies "no permanently deferred items" while telling the truth about why the highest-profile item isn't scheduled.
- **Top-5 plans are ticketable, with measurable acceptance criteria** — "a forced skip in staging pages on-call within 15 minutes", "standing access list ≤ 8 named engineers" — never "improve alerting" (the named vague-plan Anti-Pattern). Each step could be pasted into a tracker as-is.
- **TD-008 is explicitly framed as debt, not a bug** ("a control gap we chose not to build — the job itself works"), because the Quality Checks require distinguishing deliberate/accumulated shortcuts from unintended defects; the two demand different remediation stories.
- **The score-12 tie is broken in writing** (TD-006 chosen for the top 5 "because its priced interest is highest"), so the prioritisation stays auditable rather than silently editorial.
- **The Q4 debt budget drops to 10% and says so.** The Quality Check demands the roadmap "allocates realistic capacity"; pretending the launch quarter has a normal 15% debt budget would be the kind of aspirational fiction that gets registers ignored.
- **TD-013 is a celebrated non-fix** — expiring debt, patch-only, with the expiry dated. A register that only ever grows teaches the org it's a graveyard; deliberate acceptance with review dates is what keeps it a planning tool.
