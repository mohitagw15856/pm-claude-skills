# Example: word-document

## What this skill does

Builds a real formatted Word (.docx) file, not markdown: proper heading styles, body text, tables and page structure via a generated python-docx script, plus a contents summary and the placeholders you still need to fill. Requires a code-execution environment.

## How to trigger it

### Example 1: a formatted proposal as an actual file

**You say:**
> "I need a Word doc, not markdown: a consulting proposal for [client] covering scope, timeline, team, and pricing. Three-phase engagement, 12 weeks, £8,400/month. Make it look like a real document with a cover page."

**Claude produces (excerpt):**

Generated and ran the python-docx script; here is `proposal-[client].docx`.

**Contents summary:**
- Cover page: title, client name, date, your company placeholder
- 1. Executive Summary (Heading 1, one paragraph scaffolded)
- 2. Scope of Work: three phases as Heading 2 sections, each with objectives and deliverables body text
- 3. Timeline: 12-week table (Phase | Weeks | Milestones), styled with header row shading
- 4. Team (placeholder bios)
- 5. Investment: pricing table, £8,400/month × 3 months per phase, total row computed (£25,200 per phase, £75,600 engagement)
- 6. Terms placeholder section

All headings use Word's built-in Heading 1/2 styles, so a table of contents can be inserted in Word via References → Table of Contents with no rework.

**Placeholders to complete before sending:**
- [Your company name and logo] on the cover
- [Team member names and bios] in section 4
- [Payment terms] in section 6; left blank rather than invented

### Example 2: updating the generated document

**You say:**
> "Client wants a 2-week discovery phase added before phase 1, at £4,200. Regenerate."

**Claude produces (excerpt):**

Regenerated `proposal-[client].docx`:
- New section 2.1 "Phase 0: Discovery" (2 weeks, objectives scaffolded)
- Timeline table now 14 weeks, rows renumbered
- Pricing table gains a Discovery row at £4,200; engagement total recomputed to £79,800
- Styles untouched, so the document still TOC-generates cleanly

The script is saved alongside the file, so future edits (names, prices, phases) regenerate the whole document consistently instead of hand-patching the .docx.

## Tips for best results

- Say "as a .docx" or "real Word file" explicitly; otherwise you may get markdown.
- Give the numbers and structure up front; tables are generated, not drawn, so changes are cheap but inputs matter.
- Ask for placeholders rather than invented details; names, terms and logos should be blanks you fill.

## Related skills

- `docx-tracked-changes` to edit an existing Word file with visible tracked changes
- `executive-summary` to write the summary section's content before formatting it
