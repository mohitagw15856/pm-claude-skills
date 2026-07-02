---
aliases: ["Word Document"]
tags: [pm-skills, skill]
skill: word-document
description: "Build a real, formatted Word (.docx) document — headings, styles, tables, TOC-ready. Use when asked to produce a Word doc, a .docx, a formatted report/contract/proposal/letter as an actual file (not markdown). Produces an actual .docx via a generated python-docx script with proper heading styles, body text, tables, and page structure. Requires a code-execution environment (Claude Code, the API code tool, or Claude.ai)."
---

# Word Document Skill

When someone needs an actual `.docx` — a report, proposal, contract, or formal letter they'll edit in
Word — markdown won't do. This skill produces a real Word file by **writing and running a `python-docx`
script**: proper heading styles (so the navigation pane and a TOC work), clean body text, tables, and
page structure — a document that looks authored, not exported.

> **Environment:** produces a binary file, so it needs code execution — **Claude Code**, the
> **API code-execution tool**, or **Claude.ai**. In the browser playground, the existing Word/PDF export
> turns any skill's markdown into a document; this skill is for a built-to-spec `.docx`.

## Required Inputs

Ask for these only if they aren't already provided:

- **Document type** — report, proposal, contract, SOP, letter, whitepaper — and its purpose/audience.
- **The content** — the material (or a brief to expand), and the required sections/structure.
- **Formatting needs** — headings/TOC, tables, numbered clauses (contracts), a cover page, letterhead/brand.
- **Length & tone**.

## Process

1. **Outline the structure** — the section hierarchy (H1/H2/H3), and where tables or numbered clauses go. Confirm structure for formal docs (contracts, proposals).
2. **Write a `python-docx` script** that:
   - Uses **real heading styles** (`Heading 1/2/3`) — not bold body text — so the nav pane, cross-refs, and a generated TOC work.
   - Sets clean body styling (font, size, spacing), adds **tables** with proper headers where needed, and page elements (title/cover, page numbers, sections) as required.
   - For contracts/formal docs: numbered headings/clauses and consistent defined-term formatting.
   - Saves to a clearly named `.docx`.
3. **Run it**, then summarise the document and note anything the user must fill (signatures, figures, brand assets).

## Output Format

- The **generated `.docx` file**.
- A short **contents summary** (the section structure) and a list of placeholders/fields the user needs to complete.

## Quality Checks

- [ ] Headings use real Word heading **styles** (not bold paragraphs) — TOC/nav pane work
- [ ] Body text, spacing, and tables are consistently formatted
- [ ] Structure matches the document type (e.g. numbered clauses for a contract)
- [ ] The script runs and the file opens cleanly in Word/Pages/Docs
- [ ] Placeholders the user must complete are clearly flagged

## Anti-Patterns

- [ ] Do not fake headings with bold text — use heading styles, or the document's structure breaks
- [ ] Do not dump unstructured text — apply the section hierarchy the doc type needs
- [ ] Do not hand-format what a style should do — consistent styles beat per-paragraph fiddling
- [ ] Do not invent contract/legal terms silently — mark drafted clauses and recommend review for anything legal
- [ ] Do not claim a file was produced without code execution — fall back to the markdown export instead

## Based On

Document-production practice (style-based formatting, structured headings, TOC-ready) implemented with python-docx.

## Programmatic Helper

This skill ships `scripts/docx_tool.py` — **zero-dependency** (stdlib zip+XML) production of real `.docx` files:

```bash
# Markdown-lite → Word (#/##/### headings, - bullets, 1. numbered, **bold**, *italic*)
python3 scripts/docx_tool.py create out.docx --text-file doc.md

# Fill {{placeholders}} through an existing .docx (body, headers, footers) —
# handles Word splitting a placeholder across formatting runs
python3 scripts/docx_tool.py fill template.docx out.docx --values '{"client":"Acme","date":"2026-07-03"}'

# Verify what a .docx actually says (plain-text extraction)
python3 scripts/docx_tool.py extract out.docx
```

Write the document first (per this skill), then `create` it as a real file. Honest limits: the markdown subset above with default styling; complex templates keep their formatting except in paragraphs where a placeholder spanned runs.

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text — replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}
