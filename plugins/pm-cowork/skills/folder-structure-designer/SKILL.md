---
name: folder-structure-designer
description: "Design a folder structure people actually file into — shallow, purpose-first, with a home for everything and an inbox for the undecided, sized to the team that must maintain it. Use when asked organize our shared drive, design a folder structure for the project, where should things live, or our files are chaos. Produces the structure with its placement rules, the depth and naming constraints, the _inbox convention, and the migration-lite plan for the existing mess."
---

# Folder Structure Designer Skill

Folder structures fail by ambition: seven levels deep, a taxonomy only its author understands, and within a month everyone files into `misc/` or nowhere. The structure that survives is shallow (three levels max), organized by *how people look for things* (purpose, then project — not file type, not org chart), and honest about human behavior: there's an `_inbox` for the undecided, a placement rule for every top-level folder, and search is embraced as half the system rather than defeated.

## What This Skill Produces

- **The structure** — top levels with per-folder placement rules ("goes here if…"), three levels deep maximum
- **The conventions** — `_inbox` for undecided, `_archive` per area, the naming rule (see [filename-convention](../filename-convention/SKILL.md))
- **The one-page guide** — the structure explained in ten lines, postable where the team will see it
- **The migration-lite plan** — new structure now, old mess frozen and drained opportunistically (never the big-bang reorganization that stalls at 30%)

## Required Inputs

Ask for these if not provided:
- **Who files and who finds** — team size, roles, and the honest filing culture (a structure for five diligent people differs from one for forty rushed ones)
- **The retrieval questions** — the actual "where is the…?" questions of the last month; structure follows retrieval, not theory
- **The existing mess** — top-level inventory of what exists now, and any folders that genuinely work (survivors get kept, not redesigned)
- **Boundaries** — what does NOT belong here (personal files, another team's domain, things that live in tools)

## Framework: The Structure Rules

1. **Organize by seek-path, not by file type:** people look for "the Acme contract," not "PDFs" — top level mirrors the retrieval questions (Clients / Projects / Team Ops / Reference), never (Documents / Spreadsheets / Images).
2. **Three levels, then stop:** `Clients / Acme / Contracts` — anything needing level four becomes a naming problem instead (dates and descriptors in filenames). Depth is where filing compliance dies; every level halves it.
3. **Every folder gets a placement rule:** one "goes-here-if" sentence per top-level folder, written on the guide. A folder whose rule can't be written in one sentence is two folders or zero.
4. **`_inbox` absorbs the undecided:** filing friction comes from placement doubt — the `_inbox` at root accepts anything instantly, and a weekly ten-minute drain files it properly. Undecided-with-a-home beats misfiled-forever; the underscore keeps it sorted to the top.
5. **Search is half the system:** the structure's job is browsability of the *current and shared*; history goes to `_archive` (per area, by year) where search — not browsing — retrieves it. Structures that try to make everything browsable forever collapse under their own history.

## Output Format

# Folder Structure: [drive/team]

## The Structure
```
[Top levels with children to depth 3, each top-level annotated: "→ goes here if …"]
_inbox/        → anything, when unsure — drained weekly
```

## The One-Page Guide
[Ten lines: the placement rules · the naming rule · the _inbox habit · the archive-by-year rule · "when unsure: _inbox, not misc"]

## Migration-Lite
[Old root frozen as `_pre-2026/` (read-only norm) · new filing starts today · drain rule: whenever you fetch an old file, refile it · no big-bang weekend]

## Quality Checks

- [ ] Top level mirrors the team's actual retrieval questions
- [ ] No path exceeds three levels
- [ ] Every top-level folder has a one-sentence placement rule
- [ ] `_inbox` exists with a named drain cadence and owner
- [ ] Migration is freeze-and-drain, not big-bang

## Anti-Patterns

- [ ] Do not build taxonomy for taxonomy's sake — every folder must earn its rule
- [ ] Do not organize by file type — nobody seeks "spreadsheets"
- [ ] Do not exceed three levels — depth is where compliance goes to die
- [ ] Do not attempt the big-bang reorg — it stalls at 30% and leaves two messes
- [ ] Do not create `misc/` — that's `_inbox` without the drain, i.e., the old problem with a new name

## Example Trigger Phrases

- "Organize our shared drive."
- "Design a folder structure for the project."
- "Where should things live?"
- "Our files are chaos."
