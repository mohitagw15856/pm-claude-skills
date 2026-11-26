# Worked Example — Architecture Decision Record (ADR) Skill

## The brief

Verdant Systems sells soil-moisture and micro-climate monitoring to large row-crop farms — ~180,000 field sensors reporting every 60 seconds (≈3,000 msg/s steady). Sensors store-and-forward through cellular gaps of up to six hours, so a regional gateway reconnect flushes backlogs in bursts: the 11 March 2026 Willamette outage produced ~22,000 msg/s for 15 minutes and the current path (MQTT → 5-minute cron batch → Postgres) dropped 40 minutes of readings. The Q3 "Irrigation Advisor" launch needs sub-minute alert latency, which the batch path cannot deliver. The platform team is 7 engineers with one shared SRE and no production Kafka experience. The team lead wants the streaming-backbone decision recorded before build starts; one candidate — waiting for the Device Platform team's Edge Gateway v2 — is organisationally sensitive.

## The output

---

# ADR-017: Adopt a managed streaming service (Kinesis) for sensor telemetry ingestion

**Date:** 2026-04-02
**Status:** Accepted
**Author(s):** Rosa Ibáñez (Platform)
**Deciders:** Rosa Ibáñez (Platform lead), Daniel Achebe (Director of Engineering)

---

## Context

Sensor telemetry currently reaches storage through a 5-minute cron batch, which cannot support the sub-minute alert latency that Irrigation Advisor (committed for Q3 2026) requires, and which loses data under reconnect floods — the 11 March Willamette gateway outage flushed six hours of buffered readings at ~22,000 msg/s and the batch path dropped 40 minutes of data. Steady-state load is ~3,000 msg/s (180k sensors × 60s cadence, ~380-byte payloads ≈ 1.1 MB/s), with observed bursts to ~22,000 msg/s (~8.4 MB/s) because store-and-forward makes bursts a designed-in behaviour, not an anomaly. We need a durable, replayable buffer between ingestion and consumers (TimescaleDB writer, alerts engine, and a future ML feature pipeline). At the time of this decision the platform team is 7 engineers sharing one SRE, with no production Kafka operating experience, and the Q3 date is fixed by seasonal irrigation timing — it cannot slip into the dry season.

**Key constraints:**
- Must absorb 8× steady-state bursts without loss (store-and-forward reconnect floods)
- Sub-minute end-to-end latency for the alerts consumer
- 7-day replay window for backfill after consumer bugs
- No dedicated infrastructure team; one shared SRE
- Q3 2026 launch date fixed by the irrigation season

---

## Options Considered

### Option 1: Managed streaming service (AWS Kinesis Data Streams)

**Description:** Provisioned-mode Kinesis stream, 16 shards, 7-day extended retention; consumers via KCL, enhanced fan-out for the alerts consumer.

**Pros:**
- Zero broker operations — no upgrades, rebalances, or disk management on a team with no streaming ops experience
- Burst headroom is a provisioning number (16 shards ≈ 16 MB/s in, ~1.9× the worst observed flood), not a capacity-planning project
- 7-day retention and per-shard replay cover the backfill requirement out of the box

**Cons:**
- Per-shard throughput caps (1 MB/s in) make partition-key discipline and a resharding runbook mandatory
- Consumer API lock-in; local development needs an emulator
- Cost scales linearly with fleet growth (~$820/month now; crossover vs self-hosted modelled at roughly 500k sensors)

### Option 2: Self-hosted Apache Kafka on the existing EKS cluster

**Description:** 3-broker Kafka (Strimzi operator), topic with 24 partitions, tiered storage deferred.

**Pros:**
- No per-partition throughput ceilings; richest ecosystem (Connect, exactly-once transactions) for the future ML pipeline
- Cheaper at scale — infra cost ~$640/month at current volume, flat-ish as fleet grows

**Why this was ruled out:** Operations, not technology. Nobody on the team has run Kafka in production, and the shared SRE cannot absorb broker upgrades, partition rebalancing, and disk-pressure incidents on top of the existing estate. Kafka lost on ops burden with our current zero streaming-ops capacity — which also defines when to revisit (see Review Date).

### Option 3: Postgres-backed queue on the existing cluster (`SKIP LOCKED` work table)

**Description:** Append telemetry to a queue table on the existing Postgres/TimescaleDB cluster; consumers poll with `FOR UPDATE SKIP LOCKED`.

**Pros:**
- Zero new infrastructure; the team already operates this cluster well
- Transactional hand-off into TimescaleDB (queue consume + hypertable insert in one transaction)

**Why this was ruled out:** Burst absorption. Sustained 22,000 inserts/s on the shared cluster would contend directly with agronomy dashboard queries and generate severe WAL amplification; a March-11-scale replay would take down the very database the queue is meant to protect. Strong option for 1/10th our load — not for a system where 8× bursts are designed-in.

### Option 4: Wait for Edge Gateway v2 (Device Platform team's pipeline)

**Description:** Device Platform's planned v2 gateway includes an internal telemetry bus with at-source deduplication — architecturally the cleanest home for this capability.

**Pros:**
- Deduplication and ordering closest to the devices; one fewer hop
- Single owner for the device-to-cloud path long-term

**Why this was ruled out:** Timing and ownership, not merit. Edge Gateway v2 is scheduled for H1 2027 on a committed roadmap that rightly prioritises fleet provisioning. Taking a dependency would put Irrigation Advisor's fixed Q3 date on another team's roadmap, and we chose not to ask Device Platform to trade their committed milestones for our timeline. We will revisit converging onto their bus once v2 is generally available (see Review Date).

---

## Decision

**We will adopt AWS Kinesis Data Streams (provisioned mode, 16 shards, 7-day retention) as the telemetry ingestion backbone.**

In plain language: sensor messages will flow from the existing MQTT tier into a managed, durable stream that absorbs reconnect floods and lets the database writer, the alerts engine, and future consumers each read at their own pace with a 7-day replay window. We are deliberately paying a modest premium and accepting per-shard limits to buy zero broker operations, because the binding constraint on this team in 2026 is operational capacity, not technology fit.

---

## Consequences

### Positive Consequences
- Alerts consumer meets sub-minute latency via enhanced fan-out, unblocking the Irrigation Advisor launch
- Reconnect floods become a provisioning margin (16 MB/s vs 8.4 MB/s worst observed) instead of a data-loss incident
- Consumer bugs are recoverable — 7-day replay replaces "the data is gone" with "re-run the consumer"

### Negative Consequences / Accepted Tradeoffs
- We own partition-key discipline forever: keys must be hash-of-`sensor_id` (regional keys would hot-shard exactly during regional reconnect floods)
- A resharding runbook and drill become part of on-call scope — per-shard caps mean growth is a runbook event, not automatic
- Consumer-side dedup is mandatory: store-and-forward produces duplicates, so all writes are idempotent on (`sensor_id`, `reading_ts`)
- Local development requires an emulator; CI gets a contract-test layer to keep us behind a thin adapter rather than raw SDK calls
- This decision remains valid only while the team lacks dedicated streaming-ops capacity and the fleet stays under ~500k sensors

### Risks
- Fleet growth beyond the modelled cost crossover (~500k sensors) makes the managed premium material
- A future hard multi-region requirement would force a re-evaluation; cross-region replication here is DIY
- If Edge Gateway v2 lands with its own bus, we risk running two parallel telemetry paths indefinitely unless convergence is planned deliberately

---

## Implementation Notes

- Partition key: FNV-1a hash of `sensor_id`. Explicitly **not** region or gateway ID — those keys concentrate load on exactly the shards serving a region mid-flood.
- 16 shards provisioned against a 9-shard peak requirement — headroom is the point; do not "optimise" this down.
- Alerts consumer uses enhanced fan-out (dedicated 2 MB/s per consumer); the TimescaleDB writer uses shared throughput — it tolerates seconds of lag.
- Consumer lag alarm at 60 seconds of backlog per shard (the alert SLO), paging the platform rotation.
- All consumers behind `internal/streamadapter` — the lock-in mitigation is only real if raw SDK types never leak past that package.

---

## Review Date

Revisit this decision if any of: fleet exceeds 500,000 sensors or sustained ingest exceeds 40,000 msg/s (cost-crossover triggers); a dedicated infrastructure pod is staffed (the operational objection to Kafka dissolves); or Edge Gateway v2 reaches general availability (convergence onto Device Platform's bus becomes the cleaner architecture). Owner: Platform lead. Absent a trigger, review at the 12-month mark (April 2027).

---

## Why it's shaped this way

- **The Context section reconstructs the pressures, not just the problem** — team of 7, one shared SRE, zero Kafka experience, a season-locked deadline, and the March 11 incident as forcing event — because `references/decision-scoping.md` sets the test that a new senior hire should be able to guess the decision from context alone. With those pressures stated, "managed service" is guessable before the options are read.
- **The problem is stated in the first two sentences of Context** (batch path can't meet alert latency; it drops data under floods), per the Quality Check that context must not assume the reader knows what problem was being solved.
- **Every rejected option has genuine strengths and a specific losing constraint tied to a context pressure** — Kafka lost on ops capacity, Postgres lost on burst contention, Edge Gateway v2 lost on timing — because "didn't meet our requirements" is a circular rejection the Quality Checks ban, and a strawman graveyard destroys trust in the whole record.
- **Option 4's rejection is political and written diplomatically but honestly**: it names the real reason (another team's committed roadmap and a fixed date) without disparaging that team's priorities, and converts the awkwardness into a concrete revisit trigger. Omitting the option entirely would violate "rejected options are the most valuable part" — future readers *will* ask why the gateway team's bus wasn't used.
- **Negative consequences carry operational specifics** — partition-key discipline, a resharding drill in on-call scope, mandatory idempotent writes — because the Anti-Patterns say an ADR with only positive consequences was not scrutinised honestly, and the reference calls this "the section future-you audits".
- **The numbers hang together and are checkable**: 180k sensors × 60s = 3k msg/s; ×380 B ≈ 1.1 MB/s; the 22k msg/s flood ≈ 8.4 MB/s; 16 shards ≈ 1.9× that peak; 7-day retention ≈ 700 GB. Internally consistent arithmetic is what makes the Review Date thresholds (500k sensors, 40k msg/s) meaningful rather than decorative.
- **The Review Date states trigger conditions, not a calendar platitude** — fleet size, sustained throughput, a staffing change, a competing system's GA — per the Output Format's instruction to name specific triggers and the Risks check that identifies what would invalidate the decision. Two triggers deliberately mirror the two most contentious rejections, so the door each one closed has a documented handle.
