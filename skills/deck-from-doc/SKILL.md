---
name: deck-from-doc
description: "Turn the user's REAL doc into a slide deck — open the source, structure the narrative, and build the actual .pptx — not slide-writing tips. Use when asked to make a deck from this doc, turn my brief into slides, build the presentation from my Drive doc, or deckify this in Cowork. Reads the document via the Google Drive/Docs connector, maps it to a one-idea-per-slide narrative, and produces a real presentation artifact (.pptx) with speaker notes plus a slide-by-slide outline."
---

# Deck from Doc (Live)

A good doc isn't a good deck — prose has to become one idea per slide with a spine an audience can follow. In Claude Cowork this skill reads the *real* document and builds an actual presentation file, so the user gets slides to refine, not advice on how to make them.

## What This Skill Produces

- **The presentation artifact** — a real `.pptx` (or Slides), one idea per slide, with a clear narrative arc and speaker notes
- **The slide-by-slide outline** — headline + the single point of each slide, for a fast review before the build
- **The narrative spine** — the argument the deck makes, stated in one line

## Required Inputs

Ask for these if not provided:
- **The doc** — a Drive/Docs link or uploaded file
- **Audience & purpose** — who's in the room and the decision/ask — the arc follows
- **Length & template** — target slide count; a brand template/theme if one exists

## Framework: Doc → Deck

1. **Find the spine** — the one argument; every slide advances it or is cut.
2. **One idea per slide** — headline states the takeaway; the body supports it.
3. **Show, don't wall-of-text** — turn dense prose into a chart, a list, or a diagram cue.
4. **Arc** — situation → complication → options → recommendation → ask.
5. **Speaker notes carry the nuance** the slide drops.

## Execution (Cowork)

1. **Open the source** — via the Google Drive/Docs connector, read the full doc. Build from the real content, not a summary of it.
2. **Map the narrative** — extract the spine and the section takeaways; draft the slide-by-slide outline and confirm it if the deck is long.
3. **Build the file** — use the `pptx` skill / presentation tooling in the sandbox to generate a real `.pptx`: title, one-idea slides with conclusion headlines, a data slide where the doc has numbers, a recommendation and an ask slide. Apply the brand template if provided.
4. **Add speaker notes** per slide with the supporting detail from the doc.
5. **Emit the artifact** (the file) + the outline; offer to save it to Drive.

Guardrails: every slide claim traces to the doc — never invent data or a recommendation the doc doesn't support; keep numbers exact; if the connector/template is unavailable, build from what's given and note the fallback.

## Output Format

### Narrative spine
> one line

### Slide outline
| # | Headline (takeaway) | The one point |
|---|---|---|

### Output
- Presentation: [file/link] · [N] slides · speaker notes included

## Quality Checks
- [ ] Every slide has a conclusion headline (not a topic label)
- [ ] No slide claim or number is absent from the source doc
- [ ] The arc ends in a clear recommendation and ask
- [ ] Speaker notes carry the detail cut from the slide
- [ ] A real, openable file was produced — not just an outline

## Anti-Patterns
- **Pasting paragraphs onto slides** — one idea per slide.
- **Inventing data** to fill a chart the doc doesn't support.
- **No recommendation/ask** — a deck that informs but doesn't land.
- **Returning only an outline** when a deck was asked for — build the file.

## Example Trigger Phrases
- "Make a deck from this strategy doc in my Drive."
- "Turn my brief into slides for the leadership review."
- "Deckify this doc — audience is the exec team, 10 slides."
- "Build the presentation from my doc and save it to Drive."
