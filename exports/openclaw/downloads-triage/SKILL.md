---
name: downloads-triage
description: "Empty the Downloads folder that's become a junk drawer — the four-bucket pass (file, delete, action, quarantine), the age-based bulk rules that make 2,000 items tractable, and the tiny habit that keeps it empty. Use when asked clean up my downloads folder, 2000 files in downloads help, what's safe to delete here, or stop my downloads from piling up. Produces the bucket pass with bulk rules, the safe-delete classes, the keeper-filing routes, and the weekly sweep habit."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/downloads-triage.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Downloads Triage Skill

The Downloads folder is where files land, not where they live — but without a triage habit it becomes the household junk drawer: installers from 2023, seventeen copies of the same logo, that PDF you needed once. The rescue is bulk-first: age and type rules dispose of 80% without item-by-item decisions ("installers older than a month: delete all"), the keepers get filed by the folder rules, and a ten-minute weekly sweep keeps the count near zero forever.

## What This Skill Produces

- **The bulk rules** — age × type classes that clear most of the pile in a few decisions
- **The four buckets** — delete / file (with destinations) / action (it's really a task) / quarantine (unsure, dated, auto-expiring)
- **The safe-delete classes** — what's always safe (installers, re-downloadables) and the two check-first classes
- **The sweep habit** — the weekly ten-minute pass, plus the browser setting that helps

## Required Inputs

Ask for these if not provided:
- **The scale and vintage** — item count and oldest file; a 200-item month and a 4,000-item three-years get different opening moves
- **The filing destinations** — where keepers go (the [folder-structure-designer](../folder-structure-designer/SKILL.md) structure if one exists; the `_inbox` if not)
- **Known treasures** — anything important currently living in Downloads (tax documents in the junk drawer is common and worth asking about explicitly)

## Framework: The Bulk-First Rules

1. **Sort by type, sweep by class:** installers/DMGs/MSIs older than 30 days → delete all (re-downloadable by definition) · zips already extracted → delete · duplicate-numbered files (`logo(3).png`) → keep highest, delete rest · screenshots older than 90 days → near-always deletable, one scroll-through first. Four decisions, half the pile.
2. **Re-downloadable = deletable:** anything fetchable again (statements from the bank portal, PDFs from live links, installers) carries no storage obligation — the source is the backup. The keeper test is "would losing this cost anything," not "might I want it."
3. **The two check-first classes:** documents you created/edited (they may exist only here — file them), and anything money/legal/tax-shaped (file to their real home *now*; the junk drawer is where subpoenaed documents go missing).
4. **Quarantine ends the unsure-paralysis:** the genuinely uncertain go to `_quarantine-2026-07/` — dated, out of the way, deleted whole when the date is 90 days old and nothing was fetched from it. Deferred deletion with an expiry beats both agonizing and hoarding.
5. **The habit is the fix:** weekly ten-minute sweep (the bulk rules make it fast), downloads-ask-where-to-save turned on in the browser for documents (files land filed), and the empty-ish Downloads becomes self-maintaining — a full junk drawer attracts junk; an empty one shames it.

## Output Format

# Downloads Triage: [count] items, oldest [date]

## The Bulk Pass
| Class | Rule | Est. items |
|---|---|---|
[Installers >30d: delete · extracted zips: delete · dupes: keep-highest · screenshots >90d: scroll-then-delete]

## The Remainder Buckets
**File:** [item classes → destinations] · **Action:** [the files that are really tasks — into the task system] · **Quarantine:** [`_quarantine-[date]/`, expiry set]

## The Habit
[Weekly sweep, 10 min · browser ask-where-to-save for docs · the treasure rule: money/legal files never live here]

## Quality Checks

- [ ] Bulk rules cleared the majority before any item-by-item work
- [ ] Created/edited documents were separated from re-downloadables before deleting
- [ ] Money/legal/tax files got filed to real homes immediately
- [ ] Quarantine carries a date and an auto-expiry decision
- [ ] The habit is scheduled, not aspirational

## Anti-Patterns

- [ ] Do not triage item-by-item from the top — bulk classes first or the session dies at file 60
- [ ] Do not keep re-downloadables "just in case" — the source is the backup
- [ ] Do not delete created-here documents by class — they're the one irreplaceable category
- [ ] Do not let quarantine become the new junk drawer — no expiry, no quarantine
- [ ] Do not skip asking about treasures — tax PDFs in Downloads is the classic finding

## Example Trigger Phrases

- "Clean up my downloads folder."
- "What's safe to delete here?"
- "Stop my downloads from piling up."
