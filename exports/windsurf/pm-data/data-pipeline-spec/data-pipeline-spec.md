---
trigger: model_decision
description: "Design an ETL/ELT data pipeline specification. Use when asked to design a data pipeline, spec an ETL or ELT process, document a data ingestion workflow, or plan a data integration. Produces a complete pipeline spec with sources, transforms, destinations, SLAs, error handling, and data quality rules."
---

# Data Pipeline Spec Skill

This skill produces a complete data pipeline specification covering sources, transformations, destinations, scheduling, SLAs, error handling, data quality checks, and monitoring requirements. Output is ready for engineering handoff or architecture review.

## Required Inputs

Ask the user for these if not provided:
- **Pipeline purpose** — what business question or workflow does this pipeline serve?
- **Source systems** — where does data come from? (databases, APIs, files, event streams)
- **Destination** — where does data land? (data warehouse, data lake, downstream DB, reporting tool)
- **Transformation type** — ETL (transform before loading) or ELT (load raw, transform in warehouse)?
- **Frequency / SLA** — how often must data be fresh? (real-time / hourly / daily / weekly)
- **Volume estimate** — approximate rows/events per run
- **Data quality requirements** — completeness, deduplication, freshness, schema enforcement
- **Team or stack** — any specific tools in use? (Airflow, dbt, Fivetran, Spark, Kafka, etc.)

## Output Structure

---

# Data Pipeline Spec: [Pipeline Name]

**Purpose:** [One sentence — what decision or workflow does this pipeline enable?]
**Type:** [ETL / ELT / Streaming / Batch]
**Owner:** [Team or individual]
**Version:** [1.0]
**Date:** [Date]
**Status:** [Draft / Under Review / Approved]

---

## 1. Overview

[2–3 sentences describing the pipeline end-to-end: what data moves, from where to where, at what cadence, and why.]

**Architecture diagram (text):**

```
[Source A] ──┐
[Source B] ──┤──► [Ingestion Layer] ──► [Transform Layer] ──► [Destination] ──► [Consumers]
[Source C] ──┘
```

---

## 2. Sources

| Source | System | Connection type | Data format | Update pattern | Volume |
|---|---|---|---|---|---|
| [Source 1] | [PostgreSQL / Salesforce / S3 / Kafka] | [JDBC / REST API / SDK / Webhook] | [JSON / CSV / Parquet / CDC] | [Append / Full refresh / Incremental] | [X rows/day] |
| [Source 2] | [...] | [...] | [...] | [...] | [...] |

**Incremental key (if applicable):** [The column used to identify new or changed records — e.g. `updated_at`, `event_id`]

**Authentication:** [API key / OAuth / IAM role / connection string — note where credentials are stored]

---

## 3. Ingestion Layer

**Tool:** [Fivetran / Airbyte / Kafka Connect / custom script / dbt source]

**Ingestion method:**
- [ ] Full extract (full table refresh each run)
- [ ] Incremental extract (only new/changed rows since last run)
- [ ] CDC (change data capture from database transaction log)
- [ ] Event streaming (continuous ingestion from Kafka/Kinesis)

**Raw landing zone:** [Where raw data lands before transformation — e.g. `raw.salesforce_opportunities` in Snowflake, S3 bucket `s3://data-raw/crm/`]

**Schema handling:** [Strict schema enforcement / Schema evolution allowed / Union schema]

---

## 4. Transformation Logic

List each transformation in execution order. For ELT pipelines, this is the dbt model or SQL layer.

| Step | Name | Description | Input | Output | Tool |
|---|---|---|---|---|---|
| 1 | [Deduplicate events] | [Remove duplicate event rows based on event_id] | `raw.events` | `staging.events_deduped` | [dbt / SQL / Spark] |
| 2 | [Join user profile] | [Enrich events with user attributes from CRM] | `staging.events_deduped`, `raw.users` | `staging.events_enriched` | [...] |
| 3 | [Aggregate to daily] | [Roll up to user×day grain] | `staging.events_enriched` | `mart.user_daily_activity` | [...] |

**Business logic rules:**
- [e.g. Revenue is recognised on `payment_confirmed_at`, not `payment_initiated_at`]
- [e.g. Users in the `internal@company.com` domain are excluded from all metrics]
- [e.g. Currency conversion uses the ECB rate from the first business day of each month]

**Slowly Changing Dimensions (SCD) — if applicable:**
- [e.g. `users.plan_tier` is SCD Type 2 — keep history of plan changes with `valid_from` / `valid_to`]

---

## 5. Destination

| Destination | System | Schema / Table | Write mode | Consumers |
|---|---|---|---|---|
| [Primary] | [Snowflake / BigQuery / Redshift / PostgreSQL] | [`analytics.mart_user_activity`] | [Append / Upsert / Full replace] | [Looker / Metabase / downstream pipeline] |
| [Secondary] | [...] | [...] | [...] | [...] |

**Partitioning / Clustering:** [e.g. Partitioned by `event_date`, clustered by `user_id` — reduces query cost for time-range scans]

**Retention policy:** [e.g. Raw data retained for 90 days; mart tables retained indefinitely]

---

## 6. Scheduling & SLAs

| SLA | Target | Breach action |
|---|---|---|
| **Data freshness** | [Data must be ≤ X hours old by HH:MM UTC] | [Page on-call / alert Slack channel] |
| **Pipeline completion** | [Must complete within X minutes of trigger] | [Alert and auto-retry] |
| **Availability** | [Pipeline must run successfully X% of days per month] | [Incident review] |

**Schedule:** [Cron expression and human description — e.g. `0 6 * * *` — daily at 06:00 UTC]

**Trigger type:**
- [ ] Time-based (cron)
- [ ] Event-based (triggered by upstream pipeline success / file arrival / Kafka lag)
- [ ] Manual (ad hoc runs only)

**Backfill strategy:** [How to reprocess historical data if the pipeline fails or logic changes — e.g. parameterised date range, full drop-and-reload]

---

## 7. Data Quality Rules

| Check | Table | Rule | Failure action |
|---|---|---|---|
| Completeness | `staging.events` | `event_id IS NOT NULL` — 100% of rows | Block load / Alert |
| Uniqueness | `mart.user_daily_activity` | `(user_id, date)` must be unique | Block load |
| Freshness | `mart.user_daily_activity` | `max(event_date) >= CURRENT_DATE - 1` | Alert |
| Volume | `staging.events` | Row count within ±20% of 7-day average | Alert |
| Referential integrity | `staging.events` | All `user_id` values exist in `users` table | Alert |

**DQ tool:** [dbt tests / Great Expectations / Monte Carlo / custom SQL assertions]

---

## 8. Error Handling & Recovery

**Retry policy:** [e.g. 3 retries with exponential back-off: 5 min, 20 min, 60 min]

**Failure modes and responses:**

| Failure | Detection | Response | Owner |
|---|---|---|---|
| Source unavailable | HTTP 5xx / connection timeout | Retry 3×, then alert and skip run | Data engineering |
| Schema change in source | Column missing or type mismatch | Block load, alert schema owner | Data owner + engineering |
| DQ check fails | dbt test failure / assertion error | Block load for P1 checks; alert for P2 | Data engineering |
| Partial load | Row count < expected threshold | Alert; do not publish to consumers until resolved | Data engineering |

**Dead-letter queue:** [Where failed records are routed for manual inspection — e.g. `raw.dlq_events`]

---

## 9. Monitoring & Observability

**Metrics to track:**
- Pipeline run duration (p50, p95)
- Rows processed per run
- DQ check pass rate
- Source freshness lag
- Error rate per source

**Alerting:**
- [Slack channel: #data-alerts]
- [PagerDuty: data-on-call escalation for P1 SLA breaches]
- [Dashboard: [link to monitoring dashboard]]

**Logging:** [What gets logged and where — e.g. Airflow task logs to CloudWatch, structured JSON to data lake]

---

## 10. Dependencies & Sequencing

**Upstream dependencies:** [Which pipelines or data sources must succeed before this pipeline runs?]

**Downstream dependents:** [Which dashboards, pipelines, or models depend on this pipeline's output?]

```
[upstream pipeline A] ──► THIS PIPELINE ──► [downstream dashboard B]
                                          └──► [downstream pipeline C]
```

**Coordination mechanism:** [Airflow DAG dependency / dbt ref() / event trigger / manual gate]

---

## 11. Security & Compliance

- **PII fields:** [List columns containing PII — e.g. `email`, `ip_address`, `name`]
- **Masking / Pseudonymisation:** [e.g. email hashed with SHA-256 before landing in mart layer]
- **Access control:** [Who can query the destination tables? — e.g. Role-based access in Snowflake]
- **Data residency:** [Which regions is data permitted to transit and rest in?]
- **Audit trail:** [Is pipeline execution auditable for compliance purposes? Where are logs retained?]

---

## Quality Checks

- [ ] Every source has an incremental key or full-refresh justification
- [ ] Business logic rules are documented, not just the SQL
- [ ] SLAs are agreed with consumers, not set unilaterally by engineering
- [ ] DQ checks cover completeness, uniqueness, freshness, and volume
- [ ] Failure modes include a documented recovery owner
- [ ] PII fields are identified and a treatment plan is specified

## Anti-Patterns

- [ ] Do not spec a pipeline without defining SLAs — "as fast as possible" is not an acceptable freshness target
- [ ] Do not omit error handling and dead-letter queue strategy — every pipeline must specify what happens to failed records
- [ ] Do not design idempotent loads without documenting the deduplication key — assume reruns will happen
- [ ] Do not leave data quality rules implicit — schema validation, null checks, and referential integrity must be explicit
- [ ] Do not ignore schema evolution — specify how upstream schema changes are detected and handled

## Example Trigger Phrases

- "Design a data pipeline for our Salesforce to Snowflake sync"
- "Write a pipeline spec for ingesting Stripe events into our data warehouse"
- "Build an ETL spec for our user activity data"
- "Document our dbt pipeline from raw events to the analytics mart"
- "Spec out the pipeline that feeds the executive dashboard"
