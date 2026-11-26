# Worked Example — PR Description Writer Skill

## The brief

Medreve is a fictional healthcare scheduling platform serving 12,400 clinics across North America. Clinics store their timezone as a fixed UTC offset captured at signup, so every DST transition shifts rendered appointment slots by an hour — after the March 2026 spring-forward, ~1,900 misrendered slots generated a support-ticket cluster (MED-4790) and a handful of patients arrived an hour early to real appointments. The fix (ticket MED-4821) adds an IANA `time_zone` column to `clinics`, backfills it from geocoded addresses (14 clinics could not be resolved automatically), and makes slot expansion zone-aware behind a feature flag. Target branch is `main`; risk is medium-high because of the 12,400-row backfill migration. The engineer also considered replacing Medreve's hand-rolled offset math in `time_utils` with the shared datetime library outright — but the Platform team owns that dependency and has the consolidation scheduled for Q3.

## The output

---

### Title

`fix: render appointment slots in clinic-local time across DST`

### Summary

Appointment slots are currently rendered using a fixed UTC offset captured at clinic signup, so every DST transition shifts displayed times by an hour — ~1,900 slots misrendered after the March transition, and some patients arrived early to real appointments (MED-4790). This PR stores each clinic's IANA timezone (e.g. `America/Chicago`) and makes slot expansion zone-aware, so local times survive DST transitions. The change ships dark behind the `tz_aware_slots` flag, with the legacy offset path kept intact for rollback.

### Changes Made

- Added a `time_zone` column (IANA identifier) to `clinics`, with a batched backfill migration (500 rows per batch) that resolves zones from geocoded clinic addresses
- Made slot expansion in `SlotService` zone-aware via the existing `time_utils.to_clinic_local` helper instead of applying the stored fixed offset
- Gated the new path behind the `tz_aware_slots` feature flag; flag off preserves current behaviour exactly
- Marked `clinics.utc_offset` deprecated but retained it for one release so the flag can be reverted without a schema rollback
- Added an ops report listing clinics whose timezone could not be resolved automatically (14 today) — these fall back to the stored offset and are flagged for manual review
- Added DST-boundary unit tests and snapshot integration tests for the slots endpoint

### Screenshots / Demo

`GET /v1/clinics/402/slots?date=2026-11-01` (fall-back date, clinic in `America/Chicago`):

Before — the 09:00 slot drifts after the transition:

```json
{ "slot_start_local": "08:00", "slot_start_utc": "2026-11-01T13:00:00Z" }
```

After — local time holds; the UTC instant moves with the offset change:

```json
{ "slot_start_local": "09:00", "slot_start_utc": "2026-11-01T15:00:00Z", "clinic_time_zone": "America/Chicago" }
```

### How to Test

1. `make db-migrate && make db-seed FIXTURE=tz_clinics` (seeds clinics 402, 977, and one unresolvable-address clinic)
2. Run with the flag on: `FEATURE_TZ_AWARE_SLOTS=1 make run`
3. Request slots for clinic 402 across 2026-03-08 (spring-forward): verify no phantom 02:xx slot and that 09:00 renders as 09:00 on both sides of the transition
4. Edge case: clinic 977 is seeded in `Australia/Lord_Howe` (UTC+10:30, half-hour DST) — verify slots render on :00/:30 boundaries correctly
5. Regression: restart with the flag off and confirm the slots response is byte-identical to `main` (covered by the snapshot test, but worth one manual look)
6. Check the backfill report: `make report REPORT=unresolved_clinic_tz` should list exactly 1 seeded clinic

### Testing Checklist

- [x] Unit tests added/updated (spring-forward, fall-back, half-hour-offset zones)
- [x] Integration tests added/updated (slots endpoint snapshots, flag on and off)
- [x] Edge cases covered
- [x] Manual testing completed (steps above, against staging data)
- [x] No regressions in existing tests

### Reviewer Notes

- **Migration lock time is my main concern.** The backfill touches 12,400 rows in batches of 500 with a pause between batches; I'd value a second opinion on the batch size from anyone who has run recent migrations against the production `clinics` table.
- **Deliberate trade-off:** `utc_offset` stays for one release. It costs us a redundant column but means rolling back is a flag flip, not a schema revert, on a medium-high-risk path.
- **Deliberate trade-off:** this PR does *not* replace the hand-rolled offset math in `time_utils` with the shared datetime library. Platform owns that dependency and has the consolidation on their Q3 plan; swapping it locally here would fork a dependency they're actively standardising, so this PR scopes to zone-aware conversion using the existing helpers. MED-4855 tracks re-pointing this code at their library when it lands.
- **Known gap, out of scope:** 14 production clinics have unresolvable addresses and stay on offset-based rendering (flagged in the ops report). Clinical Ops will resolve them manually before full rollout; the flag cohort excludes them.

### Related

- Closes MED-4821
- Related to MED-4790 (support-ticket cluster from the March DST transition)
- Follow-up tracked in MED-4855 (adopt Platform's shared datetime library in `time_utils`)

---

## Why it's shaped this way

- **The Summary spends its first sentence on the why** — the misrendered slots and patients arriving early — before the what, because the Anti-Patterns ban descriptions that only restate the diff and the Quality Checks require what *and* why. The reviewer should know the stakes before the mechanism.
- **The title is imperative, carries a valid `fix:` prefix, and is 62 characters** — inside the 72-character Quality Check — and names the user-visible behaviour ("render… in clinic-local time"), not the schema change that implements it.
- **Changes Made lists six logical changes, not a file list.** The migration, the service change, the flag, the deprecation, the ops report, and the tests are the units a reviewer reasons about — per the Quality Check that changes be logical, not file-by-file.
- **How to Test is runnable by someone who has never touched this code**: exact make targets, seeded fixture IDs, the specific DST dates to probe, and a named edge case (a half-hour-offset zone) — the Quality Check demands reproducibility by the unfamiliar, and the Anti-Patterns ban skipping testing steps.
- **Reviewer Notes is where the medium-high risk shows.** It flags one genuine uncertainty (backfill batch size), two deliberate trade-offs, and one known gap — the Quality Check requires at least one specific concern or trade-off on high-risk PRs, and "looks fine, please review" is exactly the omission the Anti-Patterns warn against.
- **The deferred library swap is stated diplomatically but honestly**: Platform owns the dependency and has the work scheduled, so the PR declines to fork it and links the follow-up ticket. That's context the diff cannot convey — a reviewer seeing hand-rolled offset math would otherwise reasonably ask "why not just use the library?"
- **The Screenshots/Demo section earns its place** with a before/after API response rather than being left as a placeholder — the Output Format says to include request/response for API-visible changes and to omit the section entirely when there's nothing visual to show.
- **The rollback story is explicit** (flag flip, column retained one release) because on a medium-high-risk PR the reviewer's first question after "is it correct?" is "how do we get out?"
