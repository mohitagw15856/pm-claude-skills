---
name: data-cleaning-pass
description: "Clean a messy dataset methodically — the profiling pass that finds what's actually wrong (dupes, format drift, phantom spaces, mixed types), the fix order that doesn't corrupt while correcting, and the log that makes the cleaning defensible. Use when asked clean this export, why is my pivot double-counting, these names don't match between sheets, or prep this data for analysis. Produces the profile of what's wrong, the ordered cleaning plan, the join-key repairs, and the cleaning log."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/data-cleaning-pass.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Data Cleaning Pass Skill

Dirty data doesn't announce itself — it double-counts in the pivot, drops rows in the join, and averages text as zero. Cleaning done ad hoc corrupts as it corrects (the dedupe that removed real records, the find-replace that hit the wrong column). The pass is methodical: *profile first* (what's actually wrong, counted), fix in an order where each step doesn't mask the next, keep the original untouched, and log every transformation — because "how did you get these numbers" deserves an answer.

## What This Skill Produces

- **The profile** — per column: type consistency, blank/error counts, distinct-value sanity, the weirdest values surfaced
- **The cleaning plan** — ordered fixes with their methods, run on a copy
- **The join-key repair** — the match-rate before/after when sheets must link
- **The cleaning log** — what changed, how many rows/cells, by what rule — the defensibility artifact

## Required Inputs

Ask for these if not provided:
- **The data** — the sheet/export, and where it came from (system exports have signature messes: leading zeros eaten, dates re-typed, thousands separators as text)
- **The destination** — a pivot, a join, a chart, an import; the destination defines "clean enough" (a join needs perfect keys; a chart needs consistent types)
- **The authority questions** — when duplicates conflict (two rows, same customer, different phone), which source wins? Cleaning makes merge decisions; someone must own the rule

## Framework: The Pass Rules

1. **Profile before touching:** per column — count blanks, count types (text-that-looks-numeric is the classic), list distinct values on category columns (finds `NY / N.Y. / New York`), min/max on numerics (finds the 1899 dates and the 9999 placeholders). The profile converts "it's messy" into a numbered work list.
2. **Fix in non-masking order:** trim whitespace & normalize case → fix types (text-numbers to numbers, dates to real dates) → standardize categories (the NY problem) → *then* dedupe → then handle blanks. Deduping before normalization misses duplicates; deduping after catches them. Order is the craft.
3. **Dedupe with a definition:** "duplicate" needs a key (same email? same name+date?) — stated before removing anything, with conflicting-field rules decided by the named authority ("keep most recent," "prefer CRM over export"). Removed rows go to a `_removed` tab, not to oblivion.
4. **Blanks are three different things:** truly-empty (fine), should-have-a-value (flag for source follow-up, don't invent), and blank-meaning-zero (convert only when the source confirms the semantic). Filling blanks by assumption is fabrication with a keyboard.
5. **The log is the deliverable's twin:** each step: rule, scope, count affected ("trimmed 412 cells; merged 37 duplicate customers by email, keep-most-recent; 9 unresolvable → flagged"). Original preserved untouched; the cleaned copy + log travel together.

## Output Format

# Cleaning Pass: [dataset] → for [destination]

## The Profile
| Column | Type issues | Blanks | Distinct/sanity findings |
|---|---|---|---|

## The Plan (ordered)
[Trim/case → types → categories (the mapping table) → dedupe (key + conflict rule + authority) → blanks (three-way sort)]

## Join Repair (if joining)
[Key match-rate before → after · the unmatched remainder, listed for follow-up]

## The Log
[Step · rule · rows/cells affected — running, final counts at bottom · original untouched at (location)]

## Quality Checks

- [ ] Profiling produced counts before any edit
- [ ] The order ran normalize-before-dedupe
- [ ] The duplicate key and conflict authority are stated
- [ ] No blank was filled without a confirmed semantic
- [ ] The log accounts for every transformation, and the original survives untouched

## Anti-Patterns

- [ ] Do not clean in place — the original is the rollback and the audit
- [ ] Do not dedupe first — un-normalized duplicates hide from the dedupe
- [ ] Do not invent values for should-have-value blanks — flag them; fabrication compounds downstream
- [ ] Do not global find-replace without column scoping — the classic self-inflicted corruption
- [ ] Do not deliver cleaned data without the log — numbers whose provenance can't be stated get re-cleaned by the next skeptic

## Example Trigger Phrases

- "Clean this export."
- "Why is my pivot double-counting?"
- "Prep this data for analysis."
