# Database Schema Design Skill

Produce a complete database schema design document for a given domain. A schema document is not just a list of tables — it is a record of decisions: what was modelled, how entities relate, which queries the schema is optimised for, and what trade-offs were made.

A good schema design document lets an engineer understand the data model, query it correctly, extend it safely, and write migrations without breaking things.

## Required Inputs

Ask for these if not already provided:
- **Domain description** — what the system does; what business objects are being modelled
- **Entities and relationships** — the main things in the domain and how they relate (e.g. "a User has many Orders; an Order has many OrderItems; an OrderItem references a Product")
- **Expected query patterns** — the most important read and write queries (e.g. "fetch all orders for a user, sorted by date"; "look up a product by SKU")
- **Database engine** — PostgreSQL, MySQL, SQLite, CockroachDB, etc. — this affects DDL syntax and available types
- **Expected data volume** — approximate row counts, growth rate, and any partitioning needs
- **Constraints** — any existing conventions, naming standards, or migration constraints to respect

## Output Format

---

# Database Schema Design: [Domain / Service Name]

**Service:** [Name] | **Team:** [Team name]
**Author:** [Name] | **Reviewed by:** [Name]
**Date:** [Date] | **Database engine:** [PostgreSQL X.X / MySQL X.X / etc.]
**Status:** [Draft / Reviewed / Approved]

---

## 1. Overview

[2–3 sentences describing the domain being modelled, the scope of this schema, and any key design philosophy (e.g. "this schema prioritises read performance for the customer-facing API over write simplicity", or "designed for eventual migration to multi-tenancy")]

**In scope:**
- [Entity or subsystem]
- [Entity or subsystem]

**Out of scope:**
- [e.g. Analytics / reporting tables — separate schema]
- [e.g. Audit log tables — covered in separate design doc]

---

## 2. Entity Relationship Diagram

```
┌───────────────────┐         ┌───────────────────────┐
│      users        │         │       organisations    │
│─────────────────  │         │─────────────────────── │
│ id (PK)           │    ┌───▶│ id (PK)                │
│ org_id (FK)  ─────┼────┘    │ name                   │
│ email             │         │ plan                   │
│ display_name      │         │ created_at             │
│ created_at        │         └───────────────────────┘
│ updated_at        │
└─────────┬─────────┘
          │ 1
          │
          │ N
┌─────────▼─────────┐         ┌───────────────────────┐
│      [table_a]    │         │      [table_b]         │
│─────────────────  │         │─────────────────────── │
│ id (PK)           │    N    │ id (PK)                │
│ user_id (FK) ─────┼────────▶│ [table_a]_id (FK)      │
│ [field]           │    │    │ [field]                │
│ [field]           │    │    │ [field]                │
│ created_at        │         │ created_at             │
└───────────────────┘         └───────────────────────┘
```

**Relationship summary:**

| Entity A | Relationship | Entity B | Notes |
|---|---|---|---|
| organisations | has many | users | An org can have many users |
| users | has many | [table_a] | Soft-deleted on user deletion |
| [table_a] | has many | [table_b] | Cascade delete |
| [table_b] | belongs to | [table_a] | Non-nullable FK |
| [table_c] | many-to-many (via [join_table]) | [table_d] | Join table with metadata |

---

## 3. Table Definitions

### `organisations`

[1 sentence describing what this table stores and its role in the domain.]

```sql
CREATE TABLE organisations (
    id          UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(255)    NOT NULL,
    slug        VARCHAR(100)    NOT NULL UNIQUE,
    plan        VARCHAR(50)     NOT NULL DEFAULT 'free'
                                CHECK (plan IN ('free', 'pro', 'enterprise')),
    settings    JSONB           NOT NULL DEFAULT '{}',
    created_at  TIMESTAMPTZ     NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ     NOT NULL DEFAULT now()
);
```

| Column | Type | Nullable | Default | Notes |
|---|---|---|---|---|
| id | UUID | No | gen_random_uuid() | Surrogate PK — UUID preferred over serial for distributed use |
| name | VARCHAR(255) | No | — | Display name; not unique |
| slug | VARCHAR(100) | No | — | URL-safe identifier; unique across all orgs |
| plan | VARCHAR(50) | No | 'free' | Constrained to known values via CHECK |
| settings | JSONB | No | {} | Flexible config; avoid for queryable fields |
| created_at | TIMESTAMPTZ | No | now() | Always use TIMESTAMPTZ, not TIMESTAMP |
| updated_at | TIMESTAMPTZ | No | now() | Updated via trigger (see below) |

---

### `users`

[1 sentence describing what this table stores.]

```sql
CREATE TABLE users (
    id              UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id          UUID            NOT NULL REFERENCES organisations(id)
                                    ON DELETE RESTRICT,
    email           VARCHAR(254)    NOT NULL,
    display_name    VARCHAR(255)    NOT NULL DEFAULT '',
    role            VARCHAR(50)     NOT NULL DEFAULT 'member'
                                    CHECK (role IN ('owner', 'admin', 'member', 'viewer')),
    email_verified  BOOLEAN         NOT NULL DEFAULT false,
    deleted_at      TIMESTAMPTZ     NULL,
    created_at      TIMESTAMPTZ     NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ     NOT NULL DEFAULT now(),

    CONSTRAINT users_email_org_unique UNIQUE (email, org_id)
);
```

| Column | Type | Nullable | Default | Notes |
|---|---|---|---|---|
| id | UUID | No | gen_random_uuid() | — |
| org_id | UUID | No | — | FK to organisations; RESTRICT prevents orphaning |
| email | VARCHAR(254) | No | — | RFC 5321 max length; unique per org (not globally) |
| role | VARCHAR(50) | No | 'member' | Application-level RBAC |
| deleted_at | TIMESTAMPTZ | Yes | NULL | Soft delete; NULL = active |

**Soft delete policy:** Rows with `deleted_at IS NOT NULL` are considered deleted. All application queries MUST filter `WHERE deleted_at IS NULL` unless explicitly fetching deleted records. Use a view or ORM scope to enforce this.

---

### `[table_a]`

[Description of what this table models.]

```sql
CREATE TABLE [table_a] (
    id          UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID            NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    [field_1]   VARCHAR(255)    NOT NULL,
    [field_2]   TEXT            NULL,
    [field_3]   INTEGER         NOT NULL DEFAULT 0 CHECK ([field_3] >= 0),
    status      VARCHAR(50)     NOT NULL DEFAULT 'pending'
                                CHECK (status IN ('pending', 'active', 'archived')),
    metadata    JSONB           NOT NULL DEFAULT '{}',
    created_at  TIMESTAMPTZ     NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ     NOT NULL DEFAULT now()
);
```

| Column | Type | Nullable | Notes |
|---|---|---|---|
| user_id | UUID | No | CASCADE delete — when user is deleted, their [table_a] rows are too |
| [field_1] | VARCHAR(255) | No | [Reason for length constraint] |
| status | VARCHAR(50) | No | State machine: pending → active → archived (no other transitions) |
| metadata | JSONB | No | [What is stored here and why it's not a typed column] |

---

### `[join_table]` *(Many-to-many)*

[Description of the relationship this table represents.]

```sql
CREATE TABLE [join_table] (
    [table_c]_id    UUID        NOT NULL REFERENCES [table_c](id) ON DELETE CASCADE,
    [table_d]_id    UUID        NOT NULL REFERENCES [table_d](id) ON DELETE CASCADE,
    granted_by      UUID        NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    granted_at      TIMESTAMPTZ NOT NULL DEFAULT now(),

    PRIMARY KEY ([table_c]_id, [table_d]_id)
);
```

**Why a composite PK:** The combination of `[table_c]_id + [table_d]_id` is the natural key — each association is unique and the primary key doubles as the uniqueness constraint without needing a separate index.

---

## 4. Index Strategy

For each table, define which indexes are created and why. Include the query they are designed to serve.

| Table | Index name | Columns | Type | Query served | Notes |
|---|---|---|---|---|---|
| users | `users_org_id_idx` | `(org_id)` | B-tree | `SELECT * FROM users WHERE org_id = $1` | FK lookup; required for join performance |
| users | `users_email_lower_idx` | `(lower(email))` | B-tree (functional) | `WHERE lower(email) = lower($1)` | Case-insensitive email lookup |
| users | `users_active_by_org_idx` | `(org_id, created_at DESC)` | B-tree | `WHERE org_id = $1 AND deleted_at IS NULL ORDER BY created_at DESC` | Partial index candidate (see below) |
| [table_a] | `[table_a]_user_id_status_idx` | `(user_id, status)` | B-tree | `WHERE user_id = $1 AND status = 'active'` | Compound — order matters |
| [table_a] | `[table_a]_metadata_gin_idx` | `metadata` | GIN | `WHERE metadata @> '{"key": "value"}'` | Only add if JSONB queried frequently |

**Partial indexes (PostgreSQL):**

```sql
-- Index only active (non-deleted) users — dramatically smaller for soft-delete tables
CREATE INDEX users_active_email_idx
    ON users (email, org_id)
    WHERE deleted_at IS NULL;

-- Index only pending items — avoids indexing the majority of rows
CREATE INDEX [table_a]_pending_idx
    ON [table_a] (user_id, created_at)
    WHERE status = 'pending';
```

**Index design principles applied:**
- FKs that appear in JOIN conditions always have an index
- Compound indexes follow selectivity order: most selective column first
- Functional indexes for case-insensitive lookups
- GIN indexes only where JSONB containment queries are frequent
- Partial indexes for status-filtered queries on large tables

---

## 5. Access Pattern Analysis

Document the primary queries this schema is designed to serve. For each, show the query, the indexes used, and any caveats.

### AP-1: Fetch all active users for an organisation (paginated)

**Frequency:** Very high — called on every dashboard load
**Query:**
```sql
SELECT id, email, display_name, role, created_at
FROM users
WHERE org_id = $1
  AND deleted_at IS NULL
ORDER BY created_at DESC
LIMIT 50 OFFSET $2;
```
**Index used:** `users_active_by_org_idx` (org_id, created_at DESC)
**Notes:** Use keyset pagination (`WHERE created_at < $cursor`) at scale; OFFSET degrades past ~10k rows.

---

### AP-2: Look up a user by email (case-insensitive)

**Frequency:** High — every authentication attempt
**Query:**
```sql
SELECT id, org_id, role, email_verified
FROM users
WHERE lower(email) = lower($1)
  AND deleted_at IS NULL;
```
**Index used:** `users_email_lower_idx`
**Notes:** Returns multiple rows if same email exists across orgs. Application resolves by org context.

---

### AP-3: Fetch [table_a] items for a user by status

**Frequency:** High
**Query:**
```sql
SELECT *
FROM [table_a]
WHERE user_id = $1
  AND status = $2
ORDER BY created_at DESC
LIMIT 25;
```
**Index used:** `[table_a]_user_id_status_idx`
**Notes:** Compound index covers both filter columns. Status filter must come second in the index because user_id is more selective.

---

### AP-4: [Add further access patterns as needed]

---

## 6. Normalization Decisions

Document deliberate choices to normalize or denormalize, with reasoning.

| Decision | Approach | Reasoning |
|---|---|---|
| [e.g. Organisation name on users table?] | **Not denormalized** — always join to organisations | Avoid stale copies; org name changes are infrequent and joining is cheap |
| [e.g. Status history] | **Not in this table** — separate `[table_a]_status_history` if needed | Current status is all that's needed for 99% of queries; history is auditing, not application data |
| [e.g. JSONB `settings` column on organisations] | **Denormalized into JSONB** | Settings are read together; never queried by field; schema changes don't require migrations |
| [e.g. Computed aggregate counts] | **Not stored** — computed at query time | Counts are small; maintaining a counter column requires careful locking; use `SELECT COUNT(*)` with the index |

---

## 7. Triggers and Automation

```sql
-- Automatically update updated_at on any row modification
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER [table_a]_updated_at
    BEFORE UPDATE ON [table_a]
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
```

---

## 8. Migration Notes

If this schema is being introduced to an existing system, note the migration approach.

| Step | Description | Backward compatible | Risk |
|---|---|---|---|
| 1 | Create `organisations` table | Yes — additive | Low |
| 2 | Create `users` table | Yes — additive | Low |
| 3 | Backfill `org_id` on existing users | **Requires dual-write period** | Medium |
| 4 | Add NOT NULL constraint on `org_id` | Requires backfill to be 100% complete | Medium |
| 5 | Remove deprecated columns | Requires app code updated first | Low once app deployed |

**Backfill strategy:** [Describe how to handle existing data — batch size, rate limiting, validation queries]

**Rollback:** Each migration step should be independently reversible. See [database-migration-plan skill] for the full rollback procedure template.

---

## Quality Checks

- [ ] Every table has a primary key and a `created_at` column — no implicit ordering by row insertion
- [ ] Every foreign key has a corresponding index — no missing FK indexes that would cause full table scans on joins
- [ ] All TIMESTAMPTZ columns, not TIMESTAMP — timezone awareness is explicit
- [ ] Soft-delete tables document the convention and where the filter is enforced (ORM scope, view, or query standard)
- [ ] Every access pattern in the design has a supporting index or an explicit note that a full table scan is acceptable
- [ ] JSONB columns are justified — not used as a substitute for proper schema design on queryable fields
- [ ] Normalization decisions are documented with reasoning, not just stated
- [ ] Migration notes address existing data if this is a schema change, not a greenfield schema

## Anti-Patterns

- [ ] Do not use JSONB columns as a substitute for proper relational schema design on fields that will be queried
- [ ] Do not add indexes speculatively — every index must be justified by a specific access pattern
- [ ] Do not omit timezone-awareness — use TIMESTAMPTZ, never plain TIMESTAMP
- [ ] Do not design without documenting normalization decisions — future maintainers need the reasoning, not just the structure
- [ ] Do not skip the access patterns section — schema without query patterns cannot be evaluated for correctness
