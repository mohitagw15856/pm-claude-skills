---
aliases: ["Slide Deck"]
tags: [pm-skills, skill]
skill: slide-deck
description: "Build a real, editable PowerPoint (.pptx) deck from an outline or brief. Use when asked to make a slide deck, a PowerPoint, a pitch/board/sales deck as an actual file, or to turn a doc/notes into slides. Produces an actual .pptx via a generated python-pptx script — a title slide, one idea per content slide with a clear headline and concise bullets, and consistent styling. Requires a code-execution environment (Claude Code, the API code tool, or Claude.ai)."
---

# Slide Deck Skill

This produces a *real, editable* `.pptx` — not a markdown outline — by **writing and running a
`python-pptx` script**. It turns a brief, doc, or outline into a deck that follows good slide hygiene:
a headline that states the point (not a vague title), one idea per slide, concise bullets, and
consistent styling — so the user opens an actual PowerPoint they can present and edit.

> **Environment:** produces a binary file, so it needs code execution — **Claude Code**, the
> **API code-execution tool**, or **Claude.ai**. In the browser playground (no code execution), the
> existing PPTX export turns any skill's markdown into slides; this skill is for a built-from-brief deck.

## Required Inputs

Ask for these only if they aren't already provided:

- **Deck type & goal** — pitch, board update, sales deck, training, readout — and the one thing the audience should do/believe.
- **The content** — an outline, doc, or notes (the skill structures it into slides).
- **Audience & length** — who's watching and roughly how many slides.
- **Brand** — any colours/font (defaults to a clean, neutral theme otherwise).

## Process

1. **Storyline first** — turn the content into a slide-by-slide narrative: title → context → the few key points → the ask/close. One idea per slide; confirm the flow if it's a high-stakes deck.
2. **Write a `python-pptx` script** that:
   - Builds a **title slide**, then content slides each with an **assertion headline** (the takeaway, e.g. "Activation is the bottleneck — not signups") and 3–5 tight bullets or a simple visual.
   - Applies **consistent styling**: a colour accent, readable font sizes, generous spacing; uses the brand colour if given.
   - Avoids text walls — bullets are phrases, not paragraphs; speaker detail goes in notes.
   - Saves to a clearly named `.pptx`.
3. **Run it**, then summarise the deck and flag any slide that needs a chart/image the user must add.

## Output Format

- The **generated `.pptx` file**.
- A short **deck outline** (slide titles + the one-line message of each) and notes on anything to add (data, visuals).

## Quality Checks

- [ ] Each slide has an **assertion headline** (states the point), not a topic label
- [ ] One idea per slide; bullets are concise phrases, not paragraphs
- [ ] Styling is consistent (accent, fonts, spacing) and uses brand colour if provided
- [ ] The deck has a clear narrative arc and ends on the ask
- [ ] The script runs and the file opens cleanly in PowerPoint/Keynote/Slides

## Anti-Patterns

- [ ] Do not write topic-label titles ("Metrics") — use the takeaway ("Retention drove 80% of growth")
- [ ] Do not cram multiple ideas onto one slide — split them; one point per slide
- [ ] Do not paste paragraphs as bullets — phrases on the slide, detail in speaker notes
- [ ] Do not vary styling slide to slide — consistency is what makes a deck look professional
- [ ] Do not claim a file exists without code execution — fall back to the outline / the playground's PPTX export

## Based On

Presentation practice — assertion-evidence / one-idea-per-slide, Duarte/Minto narrative structure — implemented with python-pptx.

## Programmatic Helper

This skill ships `scripts/pptx_tool.py` — **zero-dependency** (stdlib zip+XML) generation of a real `.pptx` from a markdown outline:

```bash
python3 scripts/pptx_tool.py build deck.pptx --outline-file deck.md
```

Outline: `# Title` (+ next line = subtitle) · `## Slide title` · `- bullet` (two-space indent = sub-bullet) · `> speaker note`. Ships a clean 16:9 dark-title theme that opens in PowerPoint/Keynote/Slides. Design the narrative first (per this skill), then emit the outline and build. Honest limits: one theme, no images/charts — it's the restylable skeleton; for designed decks use the playground's slide export.

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text — replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}
