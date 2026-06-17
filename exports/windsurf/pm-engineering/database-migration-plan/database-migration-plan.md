---
trigger: model_decision
description: "Write a safe, zero-downtime database migration plan for a schema change. Use when asked to plan a database migration, design a zero-downtime schema change, document an expand/contract migration, produce a rollback procedure for a database change, or coordinate a database schema update with a deployment. Produces a structured migration plan covering migration objectives, backward compatibility analysis, expand/contract phase breakdown, exact SQL, rollback steps per phase, data validation queries, and a deployment runbook."
---

# Database Migration Plan Skill

Produce a complete, safe database migration plan for a schema change. A migration plan is not just the SQL — it is a coordinated sequence of steps that ensures the application stays available, data stays consistent, and every step can be rolled back independently.

The expand/contract pattern is the default approach: expand the schema to support both old and new states, migrate the application, then contract to remove the old state. Never combine schema changes and data backfills in a single migration that runs during deployment.

## Required Inputs

Ask for these if not already provided:
- **Current schema state** — the DDL or description of the table(s) as they are now
- **Target schema state** — the DDL or description of what the table(s) should look like after migration
- **Migration reason** — why this change is being made (new feature, performance fix, normalization, compliance)
- **Database engine** — PostgreSQL, MySQL, SQLite, CockroachDB, etc.
- **Estimated data volume** — approximate number of rows in affected tables
- **Deployment constraints** — is any downtime allowed? What is the expected traffic level during migration? Are there multiple app instances running?
- **Rollback window** — how long after deploy can the team roll back before the migration becomes irreversible?

## Output Format

---

# Database Migration Plan: [Migration Name]

**Service:** [Name] | **Team:** [Team name]
**Author:** [Name] | **Reviewed by:** [Name / DBA]
**Date:** [Date] | **Target deploy date:** [Date]
**Database engine:** [PostgreSQL X.X / MySQL X.X]
**Ticket:** [JIRA-XXX]

---

## 1. Migration Overview

**What is changing:**
[1–2 sentences: the specific schema change — e.g. "Adding a non-nullable `organisation_id` column to the `users` table and backfilling it from the `accounts` table."]

**Why:**
[1–2 sentences: the business or technical reason driving the change.]

**Migration type:** [Additive only / Additive + backfill / Column rename / Column type change / Table restructure / Index change]

**Zero-downtime:** [Yes — using expand/contract / No — requires maintenance window — state duration]

**Estimated migration duration:**
- Expand phase: [~X minutes]
- Data backfill: [~X minutes/hours — based on X rows at Y rows/second]
- Contract phase: [~X minutes after app version deployed]

---

## 2. Backward Compatibility Analysis

Before writing a single line of SQL, assess whether each change is backward compatible with the currently deployed application code.

| Change | Backward compatible? | Risk | Notes |
|---|---|---|---|
| [e.g. Add nullable column `org_id`] | Yes | Low | Old app ignores new column |
| [e.g. Backfill `org_id`] | Yes | Medium | Old app unaffected; new app reads backfilled values |
| [e.g. Add NOT NULL constraint to `org_id`] | **No** | High | Old app that inserts without `org_id` will fail |
| [e.g. Drop old column `account_id`] | **No** | High | Old app that reads `account_id` will fail |
| [e.g. Add index on `org_id`] | Yes | Low | Additive; no breaking change |
| [e.g. Rename column] | **No** | High | Never rename in one step; use expand/contract |

**Summary:** [e.g. "This migration requires the expand/contract pattern across 3 deployment phases because steps 3 and 4 are not backward compatible."]

---

## 3. Expand/Contract Phases

### Phase Overview

```
Phase 1 — EXPAND
  Deploy migration: add new column (nullable), create new indexes
  Old app: continues to work (ignores new column)
  New app: not yet deployed
  Duration: [~X min] | Rollback: trivial — drop new column

       │
       ▼

Phase 2 — BACKFILL + DUAL-WRITE
  Deploy app update: writes to both old and new columns
  Run backfill: populate new column for existing rows
  Validate: confirm 100% of rows have non-null new column
  Duration: [~X hours depending on data volume]
  Rollback: deploy previous app version; new column is still nullable

       │
       ▼

Phase 3 — ENFORCE + SWITCH
  Deploy migration: add NOT NULL constraint, drop old column/index
  Deploy app update: reads only from new column
  Duration: [~X min] | Rollback: requires forward-fix (constraint must be dropped first)

       │
       ▼

Phase 4 — CONTRACT (optional cleanup)
  Deploy migration: drop deprecated columns, rename if needed
  Final state matches target schema
  Rollback: not recommended — contract changes are destructive
```

---

### Phase 1 — Expand Schema

**Goal:** Add the new column and structures without breaking the existing application.
**Deploy order:** Run migration first, then (optionally) deploy app.
**Application state:** Old app running; no app changes required yet.

```sql
-- Migration: 001_add_org_id_to_users.sql
BEGIN;

-- Add nullable column (safe — old app ignores it)
ALTER TABLE users
    ADD COLUMN org_id UUID NULL
        REFERENCES organisations(id) ON DELETE RESTRICT;

-- Add index NOW, not in Phase 3 — building index on large table during Phase 3 is risky
CREATE INDEX CONCURRENTLY users_org_id_idx ON users (org_id);

-- Note: CONCURRENTLY does not lock the table; safe on live traffic
-- Note: Cannot run CONCURRENTLY inside a transaction block; run separately if needed

COMMIT;
```

**Validation after Phase 1:**
```sql
-- Confirm column exists and is nullable
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'users' AND column_name = 'org_id';
-- Expected: is_nullable = 'YES'

-- Confirm index exists
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'users' AND indexname = 'users_org_id_idx';
```

**Rollback (Phase 1 only):**
```sql
BEGIN;
DROP INDEX CONCURRENTLY IF EXISTS users_org_id_idx;
ALTER TABLE users DROP COLUMN IF EXISTS org_id;
COMMIT;
```

---

### Phase 2 — Backfill Existing Data

**Goal:** Populate the new column for all existing rows before enforcing NOT NULL.
**When to run:** After Phase 1 is live and stable. Can be run as a background job or a one-time script.
**Application state:** Deploy app version that dual-writes to both old and new columns.

**App code change required:**
```
// All INSERT and UPDATE operations must now set BOTH old_column and new_column
// until Phase 3 is complete. This ensures new rows are populated during the backfill window.
```

**Backfill script — batch processing:**
```sql
-- Run in batches to avoid locking. Adjust batch size based on table size and DB load.
-- Target: no single batch takes more than 5 seconds.

DO $$
DECLARE
    batch_size  INT := 1000;
    affected    INT;
BEGIN
    LOOP
        UPDATE users
        SET    org_id = accounts.organisation_id
        FROM   accounts
        WHERE  users.account_id = accounts.id
          AND  users.org_id IS NULL
        LIMIT  batch_size;

        GET DIAGNOSTICS affected = ROW_COUNT;
        EXIT WHEN affected = 0;

        -- Pause between batches to avoid saturating I/O
        PERFORM pg_sleep(0.1);
    END LOOP;
END $$;
```

**Monitoring during backfill:**
```sql
-- Check progress — run periodically during backfill
SELECT
    COUNT(*) FILTER (WHERE org_id IS NOT NULL) AS backfilled,
    COUNT(*) FILTER (WHERE org_id IS NULL)     AS remaining,
    COUNT(*)                                   AS total,
    ROUND(
        100.0 * COUNT(*) FILTER (WHERE org_id IS NOT NULL) / COUNT(*), 2
    ) AS pct_complete
FROM users;
```

**Backfill completion validation:**
```sql
-- Must return 0 before proceeding to Phase 3
SELECT COUNT(*) AS unbackfilled_rows
FROM users
WHERE org_id IS NULL;

-- Confirm no new rows written without org_id (dual-write working)
SELECT COUNT(*) AS recent_missing
FROM users
WHERE org_id IS NULL
  AND created_at > now() - INTERVAL '1 hour';
```

**Rollback (Phase 2 — app only):**
- Deploy previous app version (single-write to old column)
- `org_id` column remains nullable; no data is lost
- Backfilled values remain; harmless

---

### Phase 3 — Enforce Constraints

**Goal:** Add NOT NULL constraint and remove dependency on the old column.
**Prerequisites:** Phase 2 backfill must be 100% complete (zero rows with `org_id IS NULL`).
**Deploy order:** Run migration, then deploy app version that reads only from `org_id`.

**PostgreSQL — use NOT VALID + VALIDATE for large tables:**
```sql
-- Step 1: Add constraint as NOT VALID (no full table scan — instant)
ALTER TABLE users
    ADD CONSTRAINT users_org_id_not_null
    CHECK (org_id IS NOT NULL) NOT VALID;

-- Step 2: VALIDATE CONSTRAINT (takes a SHARE UPDATE EXCLUSIVE lock — allows reads and writes)
-- Run this separately, as it can take minutes on large tables
ALTER TABLE users
    VALIDATE CONSTRAINT users_org_id_not_null;

-- Step 3: Once validated, convert to actual NOT NULL
-- (PostgreSQL trusts the validated check constraint — this is instant)
ALTER TABLE users
    ALTER COLUMN org_id SET NOT NULL;

-- Step 4: Drop the now-redundant check constraint
ALTER TABLE users
    DROP CONSTRAINT users_org_id_not_null;
```

**Validation after Phase 3:**
```sql
-- Confirm NOT NULL is enforced
SELECT column_name, is_nullable
FROM information_schema.columns
WHERE table_name = 'users' AND column_name = 'org_id';
-- Expected: is_nullable = 'NO'

-- Test that insert without org_id fails (run in a transaction and roll back)
BEGIN;
INSERT INTO users (email) VALUES ('test@example.com');
-- Expected: ERROR: null value in column "org_id" violates not-null constraint
ROLLBACK;
```

**Rollback (Phase 3):**
```sql
-- Drop the NOT NULL constraint (restores nullable state)
ALTER TABLE users ALTER COLUMN org_id DROP NOT NULL;
-- Then deploy previous app version (dual-write)
-- Note: Once app code reading the new column is live, rolling back the constraint
-- without rolling back the app will cause issues — plan this carefully.
```

---

### Phase 4 — Contract (Remove Old Column)

**Goal:** Remove the old column once the app no longer references it.
**Prerequisites:** Phase 3 fully deployed and stable for at least [X days/hours rollback window].
**Warning:** This phase is destructive — the old column's data is permanently deleted.

```sql
BEGIN;

-- Drop the old column
ALTER TABLE users DROP COLUMN account_id;

-- Drop any indexes that referenced the old column
DROP INDEX IF EXISTS users_account_id_idx;

COMMIT;
```

**Pre-drop validation:**
```sql
-- Confirm no application queries still reference the old column
-- (Check this in code review and via a search of the codebase before running)
-- grep -r "account_id" app/

-- Confirm the column is safe to drop
SELECT COUNT(*) FROM users WHERE account_id IS NOT NULL;
-- Should be 0 (or irrelevant once new column is canonical)
```

**Rollback:** Not straightforward — dropped column data cannot be recovered. Only proceed to Phase 4 after the rollback window has passed and the change is confirmed stable.

---

## 4. Data Validation Plan

Run these queries before and after the full migration to confirm data integrity.

**Pre-migration baseline:**
```sql
-- Record these values before any migration step
SELECT COUNT(*)   AS total_users FROM users;
SELECT COUNT(*)   AS total_orgs  FROM organisations;
SELECT MIN(created_at), MAX(created_at) FROM users;

-- Check for any anomalies in the source data before backfill
SELECT COUNT(*) AS users_without_account
FROM users WHERE account_id IS NULL;
```

**Post-backfill integrity check:**
```sql
-- All users have an org that exists
SELECT COUNT(*) AS orphaned_org_refs
FROM users u
WHERE u.org_id IS NOT NULL
  AND NOT EXISTS (
      SELECT 1 FROM organisations o WHERE o.id = u.org_id
  );
-- Expected: 0

-- org_id matches expected value from source column
SELECT COUNT(*) AS mismatched_backfill
FROM users u
JOIN accounts a ON u.account_id = a.id
WHERE u.org_id != a.organisation_id;
-- Expected: 0

-- Row count unchanged (no rows created or deleted by migration)
SELECT COUNT(*) AS total_users_after FROM users;
-- Must match pre-migration baseline
```

**Post-contract final check:**
```sql
-- Old column is gone
SELECT COUNT(*) FROM information_schema.columns
WHERE table_name = 'users' AND column_name = 'account_id';
-- Expected: 0

-- New column is NOT NULL
SELECT is_nullable FROM information_schema.columns
WHERE table_name = 'users' AND column_name = 'org_id';
-- Expected: NO
```

---

## 5. Performance Impact Assessment

| Step | Lock type | Lock duration | Traffic impact |
|---|---|---|---|
| Add nullable column | ACCESS EXCLUSIVE | Milliseconds | Negligible |
| CREATE INDEX CONCURRENTLY | SHARE UPDATE EXCLUSIVE | Minutes (proportional to table size) | Reads and writes continue |
| Batch backfill | Row-level locks only | <5s per batch | Low if batches are small |
| ADD CONSTRAINT NOT VALID | ACCESS EXCLUSIVE | Milliseconds | Negligible |
| VALIDATE CONSTRAINT | SHARE UPDATE EXCLUSIVE | Minutes | Reads and writes continue |
| ALTER COLUMN SET NOT NULL | ACCESS EXCLUSIVE | Milliseconds (if check constraint validated) | Negligible |
| DROP COLUMN | ACCESS EXCLUSIVE | Milliseconds | Negligible |

**Expected load increase during backfill:**
- DB CPU: [estimated % increase during batch writes]
- DB I/O: [estimated increase]
- Monitoring threshold to pause backfill: [e.g. DB CPU > 80% for >2 minutes]

**Backfill rate estimate:**
- Table size: [X million rows]
- Batch size: [1000 rows]
- Pause between batches: [100ms]
- Estimated total duration: [X hours at Y rows/second]

---

## 6. Deployment Runbook

Follow this checklist on the day of migration. Mark each step as done before proceeding.

**Pre-migration (day before):**
- [ ] DBA / tech lead has reviewed the migration plan
- [ ] Performance impact assessed; monitoring dashboards ready
- [ ] Backfill script tested on a staging DB with production-scale data
- [ ] Rollback procedure tested on staging
- [ ] On-call engineer briefed; Slack channel [#db-migrations] set up for coordination
- [ ] Maintenance window scheduled (if required)

**Phase 1 — Expand (T+0):**
- [ ] Take a manual DB snapshot / verify automated backup is recent
- [ ] Run `001_expand_add_org_id.sql` on production
- [ ] Run Phase 1 validation queries — confirm pass
- [ ] Deploy app version with dual-write
- [ ] Monitor error rate for [10 minutes]

**Phase 2 — Backfill (T+[X hours]):**
- [ ] Confirm Phase 1 has been stable for [X hours]
- [ ] Start backfill script in a screen/tmux session
- [ ] Monitor progress via backfill progress query every [5 minutes]
- [ ] Monitor DB CPU and I/O — pause if thresholds exceeded
- [ ] Run completion validation — confirm 0 unbackfilled rows
- [ ] Run integrity checks — confirm 0 orphaned refs, 0 mismatches

**Phase 3 — Enforce (T+[X days]):**
- [ ] Confirm backfill 100% complete and stable for [X hours]
- [ ] Add NOT VALID constraint
- [ ] Run VALIDATE CONSTRAINT (monitor duration and lock waits)
- [ ] Alter column to NOT NULL
- [ ] Run Phase 3 validation queries
- [ ] Deploy app version reading only from new column
- [ ] Monitor error rate for [30 minutes]

**Phase 4 — Contract (T+[X days after rollback window]):**
- [ ] Confirm rollback window has passed — no incidents, no rollback needed
- [ ] Search codebase for references to old column — confirm zero
- [ ] Run DROP COLUMN migration
- [ ] Run final integrity checks
- [ ] Close migration ticket; update schema documentation

---

## Quality Checks

- [ ] Every migration phase has an independent rollback procedure — no phase assumes the next one has run
- [ ] Batch backfill script includes a pause between batches to avoid saturating I/O
- [ ] NOT NULL constraints use the NOT VALID + VALIDATE pattern on tables with >100k rows
- [ ] The app dual-write period is explicitly defined — old column writes are not dropped until Phase 3 is deployed
- [ ] Data validation queries include a row count check to confirm no data loss
- [ ] Lock types are identified for every DDL statement — no "should be fine" assumptions
- [ ] The deployment runbook names who runs each step, not just what to run
- [ ] Phase 4 (contract) is explicitly gated on the rollback window passing — not run on the same day as Phase 3

## Anti-Patterns

- [ ] Do not combine the expand and contract phases into a single deployment — they must be separated by a deployment cycle
- [ ] Do not run DDL changes without first testing on a production-sized data clone
- [ ] Do not skip the NOT VALID + VALIDATE pattern for constraint additions on large tables — it causes full table locks
- [ ] Do not define a rollback as "restore from backup" — each phase must have an explicit, fast rollback procedure
- [ ] Do not omit dual-write logic during the transition period — removing the old column before all writers are updated causes data loss
