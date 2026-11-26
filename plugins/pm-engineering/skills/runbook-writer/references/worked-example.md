# Worked Example — Runbook Writer Skill

## The brief

Kinovia is a subscription video-streaming service peaking at ~3.2M concurrent viewers. Delivery runs through 41 edge PoPs backed by 6 regional shield caches, which fetch CMAF segments and manifests from `vault-origin`, a 48-node S3-compatible object store shared with the encoding pipeline. When a flagship title's new episode drops at midnight, every edge misses on the same objects at once: shield hit ratio (normally ≥96%) collapses, origin fetch rate spikes from a healthy 8–15k req/s past 90k req/s, and the origin gateways start shedding load with 503s — players error out or downgrade bitrates. The delivery team wants an incident-response runbook a first-rotation on-call engineer can follow at 00:05 without waking anyone who doesn't need waking. One complication: the strongest mitigation (an origin read-throttle with serve-stale) lives on `vault-origin`, which the Media Storage team owns, and past incidents have shown that toggling it unilaterally backs up encoder publishes.

## The output

---
**Runbook:** Origin Overload During Cache-Fill Storms
**Service:** kin-edge delivery (edge PoPs → shield tier → `vault-origin`)
**Type:** Incident Response
**Last Updated:** 2026-07-14
**Owner:** Edge Delivery team (`#delivery-ops`)
**Severity:** P2 — upgrade to P1 if player error rate exceeds 2%

---

### Overview
**What this runbook covers:**
Restoring shield-tier cache effectiveness when a popular title launch causes simultaneous cache misses across all edges, overloading `vault-origin` with duplicate segment fetches.

**When to use this runbook:**
- PagerDuty alert: `vault-origin-fetch-rate-high` (origin GETs > 45k req/s for 5 min)
- PagerDuty alert: `shield-hit-ratio-low` (shield tier hit ratio < 90%)
- Grafana **Playback QoE** dashboard shows player error rate climbing alongside a title launch on the Title Launch Calendar

**Estimated time to complete:** 15–40 minutes depending on how many mitigation steps are needed.

**Impact if not completed correctly:** Origin gateways latch into shed mode (sustained 503s), playback failures for all titles — not just the launching one — and encoder publishes for in-flight titles are delayed.

---

### Prerequisites

**Access required:**
- [ ] `kinctl` production role `edge-operator` — obtain with `kinauth login --role edge-operator`
- [ ] Grafana access to **Origin Health — vault-origin** and **Playback QoE** dashboards
- [ ] PagerDuty account (you will page `media-storage-oncall` if Step 5 is needed)

**Tools required:**
- [ ] `kinctl` v2.9 or later (`kinctl version` to check)

**Before you start:**
- [ ] Announce in `#delivery-ops`: "Following the cache-fill storm runbook for [title]" — this is the incident channel of record
- [ ] Confirm this is a launch storm, not organic growth: check the Title Launch Calendar for a drop in the last 30 minutes. If nothing launched, this runbook does not apply — treat as generic origin degradation and escalate per the Escalation table.

---

### Procedure

**Step 1: Confirm the storm signature**
You are verifying that the load is duplicate fetches of a small hot set — the case this runbook's mitigations are built for.
```bash
kinctl edge top-objects --tier shield --window 5m --limit 20
```
**Expected output:** A list dominated by segment paths under a single title prefix (e.g. `/v1/titles/t-88412/...`) accounting for >60% of misses.
**If this fails:** If misses are spread across many titles with no dominant prefix, this is not a cache-fill storm — skip to Escalation (row 1). If the command errors with `role denied`, re-run `kinauth login --role edge-operator`.

**Step 2: Enable request coalescing at the shield tier**
Coalescing collapses concurrent misses for the same object into a single origin fetch. It is off by default because it adds ~1 RTT to cold-object latency, which product asked us not to pay outside storm windows.
```bash
kinctl edge coalesce enable --tier shield --scope global
```
**Expected output:** `coalesce: enabled (tier=shield, scope=global, epoch=<n>)`
**If this fails:** `epoch conflict` means another operator is mid-change — check `#delivery-ops` before retrying. Any other error → see Troubleshooting.

**Step 3: Pre-warm the shields for the launching title**
One controlled pass pushes the title's segments from origin to all shields so subsequent edge misses are absorbed at the shield tier. Run this *after* Step 2 — coalescing protects the origin while the pre-warm reads from it.
```bash
kinctl catalog lookup --slug <title-slug>          # returns the title ID, e.g. t-88412
kinctl cache prewarm --title-id t-88412 --renditions all --tier shield --pops all
```
**Expected output:** `prewarm job pw-<id> started — 6 shields, ~14,000 objects` and progress reaching 100% within ~10 minutes.
**If this fails:** Job stuck at 0% usually means origin is already saturated and the pre-warm reads are being shed — confirm Step 2 actually took effect (`kinctl edge coalesce status`), then retry. Persistent failure → Troubleshooting.

**Step 4: Raise the manifest TTL temporarily**
Manifests default to a 5s TTL so live metadata stays fresh; during a storm that refetch rate is a meaningful share of origin load. 30s is the agreed storm ceiling — above that, entitlement changes propagate too slowly.
```bash
kinctl cache ttl set --object-class manifest --ttl 30s --duration 2h
```
**Expected output:** `ttl override active: manifest=30s, expires 2026-07-15T02:05Z`
**If this fails:** `config epoch mismatch` → run `kinctl edge config status` and retry once the epochs agree. The override auto-expires; do not set `--duration` above 2h without noting it in `#delivery-ops`.

**Step 5 (last resort): Request origin read-throttle + serve-stale from Media Storage**
Only if origin fetch rate is still > 60k req/s or gateway 503s persist after Steps 2–4. `vault-origin` is shared with the encoding pipeline, and throttling delivery reads delays encoder publish validation — Media Storage carries the pager for that side, so the sign-off requirement is deliberate, not bureaucratic. Page them rather than changing origin policy directly; they can enact the throttle in under 5 minutes.
```bash
kinctl pd trigger --service media-storage-oncall --summary "Cache-fill storm: requesting vault-origin read-throttle + serve-stale per delivery runbook"
```
**Expected output:** PagerDuty incident ID; Media Storage on-call acknowledges in `#delivery-ops`.
**If this fails:** If unacknowledged after 10 minutes, escalate per the Escalation table (row 2).

**Step 6: Verify**
```bash
kinctl edge stats --tier shield --window 5m
```
**Expected state:** Shield hit ratio ≥ 96%, origin fetch rate < 45k req/s, origin 5xx < 0.1%, and player error rate back under 0.5% on **Playback QoE**. Hold for 15 minutes before standing down.

---

### Rollback

How to undo this procedure once the storm has passed (or if a step makes things worse):

**Step R1: Disable request coalescing**
```bash
kinctl edge coalesce disable --tier shield --scope global
```
**Verify rollback:** `kinctl edge coalesce status` → `coalesce: disabled (tier=shield)`

**Step R2: Reset the manifest TTL override**
```bash
kinctl cache ttl reset --object-class manifest
```
**Verify rollback:** `kinctl cache ttl show --object-class manifest` → `manifest=5s (default)`

**Step R3: Cancel a misbehaving pre-warm job (only if needed)**
```bash
kinctl cache prewarm cancel --job pw-<id>
```
**Verify rollback:** `kinctl cache prewarm status --job pw-<id>` → `state: cancelled`

If Media Storage enacted Step 5, confirm with them in `#delivery-ops` that the throttle is lifted — do not assume it auto-expires.

---

### Troubleshooting

| Symptom | Likely Cause | Resolution |
|---|---|---|
| Pre-warm job stuck at 0% | Origin already shedding; pre-warm reads are being dropped | Confirm coalescing is active (`kinctl edge coalesce status`); the step order exists for this reason. Retry after origin rate drops below 60k req/s |
| Coalescing enabled but hit ratio keeps falling | Segments carry per-session auth tokens and bypass the shared cache key | `kinctl edge top-objects --show-cache-key` — if keys differ per session, page `edge-delivery-secondary`; this needs a config fix, not this runbook |
| TTL override reports success but manifests still refetch at 5s | Config epoch mismatch between shields | `kinctl edge config status` — shields on an old epoch need `kinctl edge config sync --tier shield` |
| Origin 503s persist after fetch rate drops below 45k req/s | Gateway shed-mode latch has not released | This is a `vault-origin` gateway state — page `media-storage-oncall`; do not restart gateways yourself |

---

### Escalation

If this runbook does not resolve the issue:

| Condition | Who to Contact | How |
|---|---|---|
| Shield hit ratio still < 90% after Steps 1–4 | Edge Delivery senior on-call | PagerDuty policy: `edge-delivery-secondary` |
| Media Storage unacknowledged after 10 min, or origin 5xx > 1% for 10 min | Media Storage on-call, then their EM | PagerDuty policy: `media-storage-oncall`, then `media-storage-em` |
| Player error rate > 2% (P1 threshold) | Incident Commander rotation | PagerDuty policy: `ic-rotation` — IC owns comms and severity from here |
| Press or social-media attention on the outage | Comms duty officer | [FILL IN: current comms duty roster link] |

**Always update the incident timeline in the `#delivery-ops` topic before escalating.**

---

### Post-Procedure Checklist

After completing the runbook:
- [ ] Announce completion in `#delivery-ops` with outcome and which steps were used
- [ ] Update the incident ticket with the timeline and final metrics
- [ ] Verify `vault-origin-fetch-rate-high` and `shield-hit-ratio-low` have resolved in PagerDuty
- [ ] If Step 5 was used, confirm with Media Storage that encoder publish backlog has drained
- [ ] If this revealed a gap in this runbook — update it now (edit via the `delivery-runbooks` repo PR process)

---

## Why it's shaped this way

- **Every step is a copy-pasteable command** — `kinctl edge coalesce enable --tier shield --scope global`, not "enable coalescing" — because the Quality Checks require exact commands and the Anti-Patterns explicitly ban "run the deploy script"-style steps. At 00:05 the engineer should be pasting, not translating.
- **Every step states expected output *and* a named failure path** ("`epoch conflict` means another operator is mid-change"), never "if it fails, investigate" — the Quality Check that failure paths be explicit is what makes the runbook followable under pressure rather than a happy-path script.
- **Step order encodes judgment, not just actions.** Coalescing before pre-warm is load-bearing (the pre-warm reads from the origin the coalescing protects), and the runbook says so — this is the calibration `references/3am-usability.md` says a runbook must carry, because a cold reader can't infer it.
- **The strongest mitigation is deliberately gated on another team.** Step 5 requires Media Storage sign-off because `vault-origin` is shared with encoding; the runbook states the reason ("deliberate, not bureaucratic") diplomatically instead of either hiding the option or inviting the on-call to toggle a shared system unilaterally — the realistic tension a sanitised runbook would omit.
- **Rollback is complete and independently testable**: three concrete commands, each with its own verification command, plus the explicitly manual case (Media Storage's throttle does not auto-expire). The Anti-Patterns call a runbook without a tested rollback "incomplete and dangerous".
- **The escalation table has no bare "[Team name]" cells** — three rows carry real PagerDuty policy names and the one genuinely unknowable contact is flagged `[FILL IN: current comms duty roster link]`, exactly the two outcomes the Quality Checks permit.
- **It assumes zero system knowledge**: shield tier, coalescing, and the TTL default are each explained in one clause at point of use, and Step 1 tells the reader how to recognise when this runbook *doesn't* apply — per the Anti-Pattern "do not assume the reader knows the system".
- **Steps 4 and 5 state their costs** (entitlement propagation, encoder publish delay) so the on-call knows what they are trading, not just what to type — expected side effects are part of "expected output" in spirit.
