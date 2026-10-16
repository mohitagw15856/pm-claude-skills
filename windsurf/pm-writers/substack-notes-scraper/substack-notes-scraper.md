---
trigger: model_decision
description: "Scrapes a Substack Notes page and exports engagement data to a formatted .xlsx file. Use when asked to download, analyse, or export Substack Notes performance data including likes, comments, and restacks. Produces a formatted spreadsheet with conditional formatting, summary stats, and per-note engagement metrics."
---

# Substack Notes Scraper

Substack has no public API for Notes analytics. You can't see likes, comments, and restacks in one place without scrolling through your feed manually. This skill scrapes the rendered Notes page, filters to only your original content, and exports everything to a spreadsheet you can actually analyze.

> Credit: Originally created by a Substack newsletter author — adapted and extended for this library.

---

## Required Inputs

| Input | Format | Example |
|---|---|---|
| Notes URL | Full URL to the Notes tab | `https://substack.com/@handle/notes` |
| Author handle or name | Exact handle or display name | `@handle` or `Jane Smith` |
| Date range | Plain English or explicit range | `last 30 days` or `Jan 2026 – Mar 2026` |

Claude will ask for these if not provided upfront.

---

## Output Structure

### File

```
substack-notes-[handle]-[YYYY-MM-DD].xlsx
```

### Sheet: "Notes Data"

| Column | Description |
|---|---|
| Date | Publication date (YYYY-MM-DD) |
| Text Preview | First 200 characters of the note |
| Full Text | Complete note text |
| Likes | Like count at time of scrape |
| Comments | Comment count |
| Restacks | Restack count |
| Total Engagement | Likes + Comments + Restacks |
| Link | Direct URL to the note |
| Note Type | `original` or `restack` |

**Formatting applied:**
- Row 1: frozen header row
- Auto-filter enabled on all columns
- Top 20% by Likes column: highlighted yellow (`#FFF2CC`)
- Column widths: auto-fit to content, min 12, max 60

### Sheet: "Summary"

```
Scrape Date:         [YYYY-MM-DD HH:MM UTC]
Author:              [handle]
Date Range:          [start] – [end]
Total Notes:         [n]
Original Notes:      [n]
Restacks Filtered:   [n]

Avg Likes:           [n.n]
Avg Comments:        [n.n]
Avg Restacks:        [n.n]
Avg Total Eng:       [n.n]

Best Note (Likes):   [date] — [first 80 chars] — [n] likes
Best Note (Eng):     [date] — [first 80 chars] — [n] total engagement
```

---

## Instructions for Claude

### Step 1: Validate inputs

Confirm the three required inputs are present. If any are missing, ask before proceeding. Parse the date range into a concrete start date and end date (convert relative ranges like "last 30 days" to explicit dates using today's date).

### Step 2: Fetch the Notes page

Use `WebFetch` to load the Notes URL. Substack Notes pages are JavaScript-rendered — request the full rendered HTML. If WebFetch returns a skeleton page without note content, note this in your response and ask the user to paste the page HTML manually or confirm browser access is available.

### Step 3: Paginate through all notes in the date window

Substack Notes load incrementally. Repeat fetching or scrolling until either:
- A note's date falls outside the target date range (stop loading more), or
- No new content loads on the next request.

Rate-limit: wait 2 seconds between each paginated request. Do not hammer the endpoint.

### Step 4: Parse each note

For every note element found on the page, extract:
- **Date**: the timestamp on the note (convert to YYYY-MM-DD)
- **Author**: the display name or handle shown on the note
- **Full text**: complete body text, stripping HTML tags
- **Text preview**: first 200 characters of full text
- **Likes count**: the number shown on the like/heart counter
- **Comments count**: the number shown on the comment counter
- **Restacks count**: the number shown on the restack counter
- **Link**: the direct permalink to the note
- **Note type**: `original` if the author matches the specified author; `restack` if it belongs to someone else

### Step 5: Filter

Keep ALL rows in the data (restacks included as rows with `Note Type = restack`). The Summary sheet stats should count only `original` notes. Mark restacks clearly so the user can filter them out themselves in Excel if preferred.

Apply date filter: exclude any note outside the specified date range.

### Step 6: Calculate Total Engagement

For each row: `Total Engagement = Likes + Comments + Restacks`

### Step 7: Identify top 20% by Likes

Sort original notes by Likes descending. Mark the top 20% (round up) for conditional formatting. These rows will be highlighted yellow in the output file.

### Step 8: Build the .xlsx file

Use Python with `openpyxl` to generate the file. Structure:

```python
# Required libraries
import openpyxl
from openpyxl.styles import PatternFill, Font, Alignment
from openpyxl.utils import get_column_letter
from datetime import datetime

# Sheet 1: Notes Data
# - Write header row, bold, freeze row 1
# - Write all data rows
# - Apply auto-filter: ws.auto_filter.ref = ws.dimensions
# - Apply yellow fill to top-20% rows by likes
# - Auto-size columns (iterate cells to find max length)

# Sheet 2: Summary
# - Write summary stats as key-value pairs, no table format
```

Name the file `substack-notes-[handle]-[YYYY-MM-DD].xlsx` using today's date.

### Step 9: Report back

After generating the file, report:
- File path
- Total notes found, original vs. restacks
- Date range actually covered
- Top 3 notes by total engagement (date + preview + stats)
- Any notes or warnings (e.g., page didn't fully load, some dates were ambiguous)

---

## Quality Checks

- [ ] All three required inputs were confirmed before starting
- [ ] Rate limiting honored: 2-second delay between paginated requests
- [ ] Author filter applied correctly — restacks are included as rows but flagged, not silently dropped
- [ ] Date range filter applied — no notes outside the window appear in the data
- [ ] Total Engagement column is Likes + Comments + Restacks (not hardcoded)
- [ ] Top 20% highlight is based on the actual data distribution, not a fixed threshold
- [ ] Header row is frozen and auto-filter is active
- [ ] Summary sheet stats reference only `original` notes, not restacks
- [ ] File is named with the author handle and today's date
- [ ] If the page failed to load properly, the user was told — not silently given an empty file

---

## Anti-Patterns

- [ ] Do not proceed without a valid Substack handle or profile URL — scraping without a specific target cannot be completed
- [ ] Do not ignore rate-limit responses from Substack — implement backoff and reduce request frequency before retrying
- [ ] Do not export data without conditional formatting and summary stats — raw data without visualisation is not the expected output
- [ ] Do not attempt to access private or subscriber-only notes — this skill is for public Notes content only
- [ ] Do not produce output without a clear date range filter — undated exports make trend analysis impossible

## Example Trigger Phrases

- "Scrape my Substack Notes and export to Excel — my handle is @handle, last 60 days"
- "Use the substack-notes-scraper skill on https://substack.com/@handle/notes for Q1 2026"
- "Pull my notes engagement data into a spreadsheet"
- "Export my Substack Notes stats with likes and restacks — author: Jane Smith, Jan–Mar 2026"
- "Run the Substack scraper on my notes page and show me which posts performed best"
