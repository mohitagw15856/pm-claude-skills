# Example: importer-scaffolder

## What this skill does

Builds an importer from a sample export: a field mapping table, an importer skeleton that never drops records, and fixtures for the awkward cases.

## How to trigger it

### Example 1: Todoist CSV into a task app

**You say:**
> "Users want to move from Todoist. Here are 5 rows of their CSV export. My model is Task { title, notes, due (date), priority 1-3, project, tags[] }. TypeScript."

**Claude produces (excerpt):**

| Source field | Example value | Target field | Transform | If missing or invalid |
|---|---|---|---|---|
| CONTENT | Book dentist | title | trim | record kept, flagged "empty title" |
| DESCRIPTION | Ask about the crown | notes | as is | empty string |
| DATE | every mon | due | recurring text not parsed | due = null; raw text kept in extras.recurrence |
| PRIORITY | 4 | priority | 4 to 1, 3 to 2, 1 and 2 to 3 | default 2, flagged |
| TYPE | section | (none) | section rows set the project for following tasks | n/a |
| AUTHOR | Avery (12345) | (none) | not mapped | kept in extras.author |

```ts
export function mapRow(row: Record<string, string>): Mapped {
  const warnings: string[] = [];
  const extras: Record<string, string> = {};
  const title = (row.CONTENT ?? '').trim();
  if (!title) warnings.push('empty title');
  // ...every unmapped column goes to extras, never discarded
  return { record: { title, notes: row.DESCRIPTION ?? '', due, priority }, warnings, extras };
}
```

Import report on the sample: 5 read, 5 imported, 1 with warnings ("every mon": recurrence
kept as text, please set a due date).

---

### Example 2: the fixture that found a bug

**You say:**
> "Run the fixtures against my existing importer."

**Claude produces (excerpt):**

```
fixture 05-non-ascii.csv   FAIL  "Zoë's tasks" became "ZoÃ«'s tasks"
  Cause: the file is UTF-8 with a BOM; the reader assumes Latin-1 when a BOM is present.
fixture 06-duplicate.csv   FAIL  re-import created 2 copies
  Cause: upsert keys on title; key on the source ID column instead.
```

## Tips for best results

- Paste a real sample with personal data replaced, not a description of the format.
- Say where unmatched data should live; the default is an `extras` JSON field.
- Run the importer in dry-run mode on a full real export before announcing it.

## Related skills

- `database-migration-plan`: moving data between schemas inside your own system.
- `demo-data-generator`: when you need data that looks real but is not.
