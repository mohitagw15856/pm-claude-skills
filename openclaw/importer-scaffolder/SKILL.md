---
name: importer-scaffolder
description: "Use when asked to build an importer from a competitor's export, migrate users' data from another tool, map a CSV or JSON export onto my data model, or make switching to my project easy. Given a sample export (CSV or JSON), produces a field mapping table, an importer code skeleton, a rule that unmatched records are kept rather than dropped, and test fixtures including the awkward cases. For a database migration inside one system, use database-migration-plan."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/importer-scaffolder.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Importer Scaffolder

People switch tools when leaving costs them nothing, and an importer is how a small project removes that cost. Importers fail quietly: a column is renamed, a date is in another format, a record has no match, and data disappears without anyone noticing. This skill builds an importer from a real sample export, with a mapping that is explicit and a rule that nothing is silently dropped.

## Required Inputs

Ask for these if not provided:
- **A sample export**: a few rows of CSV or a JSON excerpt, with any personal data replaced
- **The source tool** and how users produce the export
- **Your data model**: the target fields, types and required fields
- **Your language and stack** for the importer
- **Where unmatched data should go**: a notes field, an extras column, or a separate file

## Output Structure

### 1. Source profile
What the sample shows: format, encoding, delimiter, header names, date and number formats, nested fields, and anything ambiguous. List assumptions explicitly.

### 2. Field mapping table
| Source field | Example value | Target field | Transform | Required? | If missing or invalid |
|---|---|---|---|---|---|

Every source field appears in the table, mapped or not. Unmapped fields go to the extras destination named in the inputs.

### 3. The keep-everything rule
State it in the code and the docs: **no source record is dropped.** A record that fails validation is imported with what could be parsed, flagged, and listed in an import report; its raw source is preserved in the extras destination.

### 4. Importer skeleton
Code in the requested language with these parts, each a small function:
- `read(source)`: streams rows; detects encoding and delimiter; never loads a huge file whole
- `mapRow(row)`: applies the mapping table; returns `{ record, warnings, extras }`
- `validate(record)`: required fields and types; returns problems without throwing
- `write(record)`: idempotent upsert keyed on a stable source ID, so re-running an import does not duplicate data
- `report()`: counts of imported, imported with warnings, and per-warning examples

Include a dry-run mode that prints the report without writing.

### 5. Test fixtures
Fixture files plus the expected result for each:
- the happy path (three normal rows)
- a renamed or reordered header
- an empty required field
- a malformed date and a number with a thousands separator
- non-ASCII text (accents, Chinese characters, emoji)
- a duplicate row (checks idempotency)
- a row with extra unknown columns (checks they land in extras)

### 6. User-facing instructions
Five to eight steps telling users how to export from the source tool and import, including what the import report means.

## Quality Checks

- [ ] Every source field in the sample appears in the mapping table
- [ ] The code imports invalid records with a flag instead of dropping them
- [ ] Unmapped fields are preserved in the named extras destination
- [ ] Re-running the import on the same file creates no duplicates
- [ ] A dry-run mode exists and writes nothing
- [ ] Fixtures cover non-ASCII text, a malformed date and a duplicate row
- [ ] The sample data contains no real personal data

## Anti-Patterns

- **Silent drops.** A skipped row is lost data the user may never notice.
- **Mapping by column position.** Exports reorder columns; map by header name.
- **Loading the whole file into memory.** Real exports are bigger than samples.
- **Guessing ambiguous dates.** If 03/04 could be either order, ask or detect from the whole file, and record the choice.

## Example Trigger Phrases

- "Build an importer for Trello JSON exports into my app."
- "Here's a CSV export from Notion, map it onto my data model."
- "Make it easy for users to switch from [competitor] to my project."
- "Write a CSV importer that never drops rows."
