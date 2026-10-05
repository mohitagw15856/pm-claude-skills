---
name: spreadsheet-audit
description: "Audit a spreadsheet before trusting it — the error hunt (hardcoded overrides, broken ranges, silent unit mixes), the fragility map (what breaks when rows are added), and the load-bearing-formula review that catches the mistake before the meeting does. Use when asked check this spreadsheet before we present it, why don't these numbers add up, audit this model someone left behind, or is this sheet safe to build on. Produces the findings ranked by damage, the fragility map, the verified-vs-suspect ledger, and the fix list."
---

# Spreadsheet Audit Skill

Spreadsheets fail silently: the SUM that stops at row 40 while data runs to 60, the hardcoded 1.1 someone typed over a formula in March, the column that's monthly in one section and annual in another. The sheet still displays numbers — wrong ones, confidently. This skill audits the way inherited models deserve: hunt the classic error classes, map what breaks when the sheet grows, and rank findings by damage-if-wrong — because the audit's job is protecting the decision the sheet feeds, not achieving cosmetic tidiness.

## What This Skill Produces

- **The findings, ranked by damage** — each: location, what's wrong, what it's currently mis-stating
- **The fragility map** — the formulas that break on the next added row/column, before they do
- **The verified/suspect ledger** — which outputs were traced clean and which remain unverified (unverified ≠ wrong; the label is the honesty)
- **The fix list** — ordered, with the make-it-robust upgrades (structured ranges, input isolation) where they matter

## Required Inputs

Ask for these if not provided:
- **The sheet** — the file, or its formulas/structure described; audits work on the actual formulas, not the values screenshot
- **The stakes** — what decisions this sheet feeds (a budget approval? pricing? a board number?) — depth and ranking follow the damage potential
- **The lineage** — author available? Inherited from a departed colleague? Known past incidents? Inherited orphans get the deeper hardcode-hunt
- **The growth pattern** — does data get appended? The fragility map keys on how the sheet evolves

## Framework: The Hunt Rules

1. **Hardcode hunt first:** values typed over formulas are the deadliest class — invisible, intentional-once, wrong-forever. Scan for constants where columns are otherwise formulaic (inconsistent-formula warnings, or eyeball the pattern breaks). Every hardcode found gets asked: override or accident?
2. **Range-edge check on every aggregate:** SUMs/AVERAGEs/LOOKUPs vs. the data's actual extent — the stops-at-row-40 error. The robust fix where growth is real: full-column ranges or tables/structured references, so appended rows join automatically.
3. **Unit and time-grain consistency:** monthly-vs-annual mixes, currencies, thousands-vs-units — checked at every junction where sections meet. The tell is a ratio that's ~12× or ~1000× off; the fix is a stated grain per section, labeled in headers.
4. **Trace the load-bearing outputs:** the 3–5 numbers the sheet exists to produce get full precedent-traces (follow every input to its source). Everything else gets the class-level checks — tracing everything is how audits never finish; tracing nothing is how meetings get corrected from the floor.
5. **Rank by damage, report honestly:** a $2 rounding artifact and a double-counted revenue line are different findings; the report leads with what changes decisions. The verified/suspect ledger states what the audit did *not* cover — an audit that implies total coverage it didn't do is itself an error class.

## Output Format

# Spreadsheet Audit: [sheet] — feeds: [the decision]

## Findings (damage-ranked)
| # | Location | Issue | Currently mis-stating | Fix |
|---|---|---|---|---|

## Fragility Map
[What breaks on the next row/column · the structured-range upgrades worth making]

## Verified / Suspect Ledger
[Outputs traced clean: … · checked at class level: … · not covered: … — labeled, not implied]

## Fix Order
[Damage-first, with the two structural upgrades (input isolation, structured ranges) if the sheet has a future]

## Quality Checks

- [ ] The hardcode hunt ran across all formulaic columns
- [ ] Every aggregate was checked against the data's true extent
- [ ] Load-bearing outputs got full traces; the ledger says which
- [ ] Findings are ranked by decision-damage, not discovery order
- [ ] Coverage limits are stated — no implied total audit

## Anti-Patterns

- [ ] Do not audit the displayed values — the formulas are the sheet; the display is its costume
- [ ] Do not fix silently while auditing — findings first, fixes as their own reviewed pass
- [ ] Do not treat every finding as a crisis — the $2 artifact and the double-count get different fonts
- [ ] Do not imply coverage you didn't do — the suspect ledger is the audit's integrity
- [ ] Do not leave growth-fragile ranges unflagged in a sheet that grows — today's clean audit is next month's row-41 error

## Example Trigger Phrases

- "Check this spreadsheet before we present it."
- "Why don't these numbers add up?"
- "Audit this model someone left behind."
- "Is this sheet safe to build on?"
