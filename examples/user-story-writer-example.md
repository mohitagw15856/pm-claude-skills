# Example: user-story-writer

## What this skill does

Writes ready-to-estimate user stories: the As-a/I-want/So-that statement for a specific user type, context, Given/When/Then acceptance criteria (one per observable behaviour), edge cases and definition of done.

## How to trigger it

### Example 1: stories from a feature brief

**You say:**
> "Write stories for 'export client list as CSV' in our CRM. Users: account managers who need the list for mail merges. Filters applied in the UI should carry into the export. Max 50k rows."

**Claude produces (excerpt):**

## Story: Export filtered client list as CSV

**Epic:** Client Data Export | **Priority:** P2

### User Story
> **As an** account manager,
> **I want to** export my currently filtered client list as a CSV,
> **so that** I can run a mail merge without re-filtering the data by hand in a spreadsheet.

### Context
AMs filter by territory and last-contact date before campaigns; today they export everything and refilter in Excel, which has caused two mis-targeted mailings.

### Acceptance Criteria

**AC1: Filters carry into the export**
```
Given I have filtered the client list to "Territory = North, last contact > 30 days"
When I click Export CSV
Then the file contains exactly the rows currently shown, in the current sort order
```

**AC2: Large exports are bounded**
```
Given my filtered list exceeds 50,000 rows
When I click Export CSV
Then I see "Export limited to 50,000 rows - narrow your filter", and no file downloads
```

### Edge Cases
- Empty filter result: export a file with headers only, not an error
- Fields containing commas or quotes: escaped per RFC 4180
- Filter changed in another tab mid-export: export reflects the state at click time

### Definition of Done
AC1-AC2 automated; manual check of the merge in Excel and Google Sheets; no PII fields beyond those visible in the list view.

### Example 2: rescuing a vague ticket

**You say:**
> "Turn this ticket into a proper story: 'Users should be able to manage notifications better.'"

**Claude produces (excerpt):**

**Before writing, this splits into at least two stories; "manage better" hides them:**

## Story: Mute notifications per project
> **As a** member of many projects,
> **I want to** mute notifications from a chosen project,
> **so that** activity in archived or low-priority projects stops burying things I must act on.

**AC1: Mute silences everything but direct mentions**
```
Given I have muted Project Atlas
When another member comments on an Atlas task
Then I receive no notification, unless the comment @mentions me
```

**What was NOT written:** a digest-frequency story; the ticket implies it but no user request confirms it. Flagged for discovery rather than invented.

## Tips for best results

- Name the real user type; "as a user" produces criteria nobody can test.
- Give the constraints (limits, formats, permissions); edge cases are built from them.
- Expect vague requests to come back as multiple stories plus flagged gaps, not one padded story.

## Related skills

- `job-story-mapper` when the motivation is unclear and needs the when-I/I-want-to/so-I-can framing first
- `sprint-planning` to estimate and schedule the stories once written
