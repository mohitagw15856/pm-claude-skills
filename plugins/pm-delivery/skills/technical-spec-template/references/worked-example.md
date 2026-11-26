# Worked Example — Technical Spec Template

A gold-standard run of this skill: an edtech offline-sync spec where the losing architecture gets a fair hearing, the security section does real work, and the hardest question is left visibly open with an owner instead of hand-waved.

## The brief

Quillside — a fictional K-12 learning platform serving 380,000 students across 240 districts — loses student work to bad connectivity: 41,000 assignment submissions failed last term, and 18% of active sessions come from schools with unreliable networks. Staff engineer Mei Lin is speccing an offline submission queue. Eng lead Sasha Petrov wants CRDT-based sync ("do it properly once"); Mei believes last-write-wins with an append-only rule for submitted work covers 97% of real conflicts at a fraction of the complexity. The wrinkle: most affected schools use **shared Chromebook carts**, where students rarely log out — so anything cached locally is a student-privacy problem. Security reviewer is Dara Okoye; PM is Jonah Feld.

## The output

### Technical Specification — Offline Submission Queue

**Author:** Mei Lin (Staff Engineer, Platform)
**Status:** In Review
**Created:** 6 July 2026 | **Last Updated:** 14 July 2026
**Reviewers:** Sasha Petrov (Eng Lead), Dara Okoye (Security), Jonah Feld (PM)
**Related PRD:** PRD-2026-031 "Work Never Lost" | **Jira Epic:** QUIL-4180

---

#### 1. Problem Statement
> Students in low-connectivity schools lose assignment work when the network drops mid-submission: 41,000 submissions failed last term, and 18% of active sessions occur on unreliable networks. Teachers re-request lost work manually, and affected districts cite it as a top-3 renewal risk.

#### 2. Goals & Non-Goals

**Goals (in scope):**
- A submission started offline (or dropped mid-flight) is durably queued on-device and syncs within 60 seconds of reconnection
- Zero data loss for submitted work: a student who hits "Submit" never loses that artefact
- Failed-submission rate drops from 2.1% to <0.1% of attempts in pilot districts

**Non-Goals (explicitly out of scope):**
- Offline *playback* of video lessons (separate epic, different storage problem)
- Offline grading or feedback for teachers — this spec is student-write-path only
- A native mobile app; this is a web/service-worker solution on managed Chromebooks
- Real-time collaborative editing — see Alternatives (CRDT) for why this boundary matters

#### 3. Background & Context
Prior art: the 2024 "draft autosave" project (ADR-019) stores drafts server-side every 30s, which is useless offline. TelemetryHub is not involved; all data stays first-party. District IT manages devices via Chromebook admin policies, which we can rely on for enforced Chrome versions (≥ M120, so IndexedDB + service workers are safe assumptions).

#### 4. Proposed Solution

**High-Level Approach:**
A service worker intercepts submission and draft-save requests. When offline (or on request failure), payloads are written to an encrypted per-user IndexedDB queue and replayed to a new idempotent batch sync endpoint on reconnect. Submitted work is append-only server-side: a replayed submission can never overwrite a newer submission, only add a version. Drafts use last-write-wins; genuine concurrent-edit conflicts land in a teacher-visible conflict queue rather than being silently merged.

**System Architecture Diagram:**
Client (service worker + IndexedDB queue) → Sync Gateway (`/v1/sync`) → Submissions service (append-only store) → Gradebook service (notified via existing events). Conflict queue surfaces in the teacher dashboard.

**Data Model Changes:**
```sql
-- Server side: sync audit + idempotency
CREATE TABLE sync_events (
  idempotency_key UUID PRIMARY KEY,
  student_id      BIGINT NOT NULL,
  assignment_id   BIGINT NOT NULL,
  device_id       TEXT NOT NULL,
  client_saved_at TIMESTAMPTZ NOT NULL,
  received_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  outcome         TEXT NOT NULL CHECK (outcome IN ('applied','duplicate','conflict'))
);
-- Client side (IndexedDB, per-user object store): queued_submissions
-- { idempotencyKey, assignmentId, payloadCiphertext, savedAt, attempts }
```

**API Design:**
```
POST /v1/sync/submissions
Request:  { deviceId, items: [{ idempotencyKey, assignmentId, payload, clientSavedAt }] }  (max 50 items)
Response: { results: [{ idempotencyKey, outcome: applied | duplicate | conflict }] }
Error codes: 401 (session expired — items stay queued), 409 (per-item conflict), 429 (reconnect-storm backoff), 507 (item too large)
```

**Key Implementation Details:**
- Queue payloads encrypted with a per-user key held in session storage; ciphertext is unreadable once the session ends (see §6 — this is the shared-Chromebook defence)
- Reconnect storms: Monday 08:00 can bring ~30k clients online together; clients apply randomised jitter (0–120s) and the gateway rate-limits with 429 + Retry-After
- Submitted work is append-only; LWW applies to drafts only. Third-party deps: none new.

#### 5. Alternative Approaches Considered

| Option | Pros | Cons | Why Rejected |
|---|---|---|---|
| CRDT-based sync (Sasha's preference) | Correct under any concurrency; no conflict queue needed | High complexity; team has no CRDT production experience; est. 3× effort | Draft telemetry shows ~3% of conflicts are truly concurrent edits. **Recorded dissent:** Sasha maintains CRDT is the right end-state. Revisit trigger agreed: if conflict-queue volume exceeds 2% of syncs for 2 consecutive weeks, we re-open this decision. |
| Native offline app | Full offline capability incl. media | Two platforms to build/maintain; 6+ months; districts resist new app installs | Solves a bigger problem than we have; delays the fix a full school year |
| SMS-based submission fallback | Works with zero data connectivity | Cannot carry file attachments (78% of submissions); per-message cost; new vendor | Fails the majority use case outright |

#### 6. Security & Privacy Considerations
- Data stored: queued student work (names, free-text answers, uploads) cached on **shared Chromebook carts where students rarely log out** — the single largest risk in this design
- Authentication: queue is keyed to the authenticated session; sync replays require a valid session or re-auth
- Authorisation: a synced item is validated server-side against the student's enrolment — a stolen queue entry cannot post to another student's assignment
- Encryption: per-user key derived at login, held in memory/session only; ciphertext at rest in IndexedDB; TLS in transit. Cache purged at logout **and** after 72h idle regardless of logout
- Compliance implications: student-records regulations require demonstrable control over PII at rest on shared devices; Dara's sign-off is gated on the shared-cart question in §10 — **this spec does not proceed to Approved without it**

#### 7. Performance & Scalability
- Expected load: steady-state ~40 req/s to `/v1/sync`; Monday-morning storm modelled at 600 req/s pre-jitter, ~180 req/s post-jitter
- Latency requirements: P50 < 300ms, P95 < 1.2s per batch
- Caching strategy: N/A (write path); Database indexing: `sync_events (student_id, assignment_id)`
- Known bottlenecks: attachment uploads on school uplinks — batches send metadata first, blobs trickle after

#### 8. Testing Plan
- Unit tests: queue encrypt/decrypt round-trip; idempotency-key reuse; LWW vs append-only branch logic
- Integration tests: kill network mid-submission; expired-session replay (401 path); duplicate replay after partial batch failure
- Load tests: 600 req/s storm simulation against staging gateway
- Edge cases: clock skew on `clientSavedAt` (trust server ordering); device storage full (507 path); student switches devices mid-assignment
- Rollback plan: flag off → service worker passes requests through untouched; queued items already on devices still drain via the sync endpoint (endpoint stays up one release beyond any rollback)

#### 9. Rollout Plan
- Feature flag: Yes — `offline_submission_queue`
- Rollout stages: 3 volunteer pilot districts (weeks 1–2) → 10% of districts (weeks 3–4) → 100%
- Monitoring: sync success rate, duplicate-outcome rate, conflict-queue depth, queue-drain latency
- Success criteria to progress rollout: failed-submission rate <0.1% and duplicate rate <0.5% at each stage
- Rollback trigger: sync failure >1% sustained 4h, or any confirmed cross-student data exposure (immediate, no threshold)

#### 10. Open Questions
| Question | Owner | Due Date | Resolution |
|---|---|---|---|
| Shared carts: is 72h-idle purge sufficient when logout rarely happens, or do we need per-period cache expiry tied to class schedule? | Dara Okoye | 24 Jul 2026 | Pending — blocks Approved status |
| Can district admin policy force logout at cart return? (Would simplify §6 materially) | Jonah Feld (with district IT council) | 31 Jul 2026 | Pending |
| Do we surface "queued, not yet submitted" state to teachers, or students only? | Jonah Feld | 24 Jul 2026 | Pending |

#### 11. Implementation Timeline (Rough)
| Phase | Work | Estimated Effort |
|---|---|---|
| Phase 1 | Service worker + encrypted IndexedDB queue | 13 points |
| Phase 2 | Sync gateway + idempotent batch endpoint | 8 points |
| Phase 3 | Conflict handling + teacher conflict queue | 8 points |
| Phase 4 | Storm-jitter, telemetry, pilot rollout | 5 points |
| Total | | 34 points |

## Why it's shaped this way

- **The problem statement contains no solution language** — no "queue," no "service worker," just failed submissions, session percentages, and renewal risk — enforcing the quality check "problem statement contains no solution language" so the solution has to earn its place in §4.
- **Non-goals shut down four specific assumptions** (offline video, teacher grading, native app, real-time collab) — the anti-pattern demands at least two things "that might be assumed in scope," and each of these was genuinely asked for in PRD review.
- **Sasha's CRDT dissent is recorded inside the alternatives table with a revisit trigger**, not smoothed over — the skill says a spec is "a decision record, not a task list"; the 2%-conflict-volume trigger converts a losing argument into a monitored condition instead of a grudge.
- **Three alternatives carry real pros and honest rejection reasons** — the anti-pattern says a spec that considers only one approach "has not been properly evaluated"; SMS fails on data (78% attachments), not on taste.
- **The security section is load-bearing, not boilerplate** — the shared-Chromebook cache is named as the design's biggest risk, and approval is explicitly gated on it, per "security and privacy sections are never optional for features that touch user data."
- **Every open question has a named owner and a date, and the hardest one visibly blocks Approved status** — the anti-pattern bans "TBD" without an owner; leaving the cart-purge question open *with teeth* is more honest than a confident guess in §6.
- **Rollback thinking extends past the flag** — the sync endpoint outlives any rollback so queued student work on devices still drains; a rollback that strands data would violate the spec's own zero-data-loss goal.
- **Numbers reconcile across sections** — 41k failures / 2.1% attempt-failure baseline (§1, §2), 30k Monday clients → 600 req/s pre-jitter → 180 post-jitter (§4, §7), and phases summing to the 34-point total, because a spec whose numbers drift is a spec engineers stop trusting.
