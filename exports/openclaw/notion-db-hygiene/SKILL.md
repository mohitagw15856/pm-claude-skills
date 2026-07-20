---
name: notion-db-hygiene
description: "Clean the user's REAL Notion database — read it, find stale/incomplete/duplicate entries, and fix them via the connector — not advice on keeping Notion tidy. Use when asked to clean up my Notion database, my tracker is a mess, find the stale and duplicate entries, or tidy my projects DB in Cowork. Reads the database via the Notion connector, audits for staleness / missing required fields / duplicates / status drift, and produces a hygiene-report artifact plus the applied fixes (with a preview-and-confirm step before any change)."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/notion-db-hygiene.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Notion DB Hygiene (Live)

Trackers rot: entries stuck "In progress" for months, blank owners, the same project logged twice, statuses that no longer match reality. In Claude Cowork this skill reads the *real* database, finds the rot, and — after showing you the plan — fixes it in place, so the tracker becomes trustworthy again.

## What This Skill Produces

- **The hygiene report** — stale entries, missing required fields, duplicates, and status drift, each with the row and the issue
- **The fix plan** — exactly what would change (archive, fill, merge, re-status), shown before anything is written
- **The applied fixes** — executed via the connector after confirmation, with an undo-friendly change log

## Required Inputs

Ask for these if not provided:
- **The database** — a Notion DB link or name
- **The rules** — what "stale" means (e.g. no update in 30 days), which fields are required, what the valid statuses are
- **Autonomy** — preview-only, or apply after confirmation (default: preview then apply on approval)

## Framework: The Four Rots

1. **Stale** — no update past the threshold while still "active" → nudge, re-status, or archive.
2. **Incomplete** — required fields blank (owner, due date, status) → fill or flag.
3. **Duplicate** — same entity logged more than once → merge, keep the richer record.
4. **Status drift** — status contradicts reality (done items still open, shipped items "in progress") → correct.

## Execution (Cowork)

1. **Read the DB** — via the Notion connector, pull all rows and the schema (properties, required fields, status options).
2. **Audit** — apply the four rots using the user's rules; group findings by type; detect duplicates by title/key similarity, not exact match only.
3. **Preview the plan** — present every proposed change (row → field → old → new, or archive/merge) and **wait for confirmation**. Never write first.
4. **Apply** — on approval, execute via the connector: update fields, set statuses, archive stale rows, merge duplicates (keeping the richer record and its links). Log each change.
5. **Emit the artifact** — the hygiene report + the applied change log, plus anything left for the human.

Guardrails: never write before the preview is approved; never hard-delete — archive; when merging, preserve the richer record and its relations; respect the user's rules over defaults; if the connector is unauthorised, produce the report and plan without applying, and say so.

## Output Format

A **Notion Hygiene Report**:

### Summary
`R rows · S stale · I incomplete · D duplicates · X status-drift`

### Findings & plan
| Row | Issue | Proposed fix |
|---|---|---|

### Applied (after approval)
| Row | Change made |
|---|---|

### Left for you
- rows needing a human call (e.g. which duplicate is canonical)

## Quality Checks
- [ ] Nothing was written before the preview was approved
- [ ] No hard deletes — stale rows archived, not destroyed
- [ ] Merges kept the richer record and its relations
- [ ] "Stale/required/valid status" followed the user's rules, not defaults
- [ ] The change log lets the user see (and reverse) every edit

## Anti-Patterns
- **Editing before showing the plan.** Preview, confirm, then apply.
- **Deleting rows** instead of archiving.
- **Exact-match-only dedupe** that misses "Acme" vs "Acme Corp".
- **Guessing owners/dates** to fill blanks — flag them for the human.

## Example Trigger Phrases
- "Clean up my Notion projects database in Cowork."
- "Find the stale and duplicate entries in my tracker and fix them."
- "My Notion CRM is a mess — audit it and show me the plan."
- "Tidy my tasks DB: fill blanks, archive dead rows, fix statuses."
