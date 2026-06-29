---
name: subtitle-caption
description: "Write or translate subtitles/captions that respect reading speed and timing rules. Use when asked to write subtitles, captions, SRT/VTT content, or to translate subtitles for a video. Produces properly-formatted, readable subtitles — line-length and reading-speed compliant, well-segmented, with translation that fits the time available, plus SDH/caption guidance where relevant."
---

# Subtitle & Caption Skill

Subtitles fail when they're too long to read before they vanish, badly segmented, or a literal
translation that overruns the timing. Good subtitling obeys real constraints: **reading speed** (≈17
chars/sec / ~160–180 wpm), **line length** (~42 chars), **max 2 lines**, and sentence-aware segmentation.
This skill writes or translates captions to those rules — readable, well-timed, and condensed to fit.

## Required Inputs

Ask for these only if they aren't already provided:

- **The content** — a transcript, script, or existing subtitles (with timecodes if you have them).
- **Task** — caption (same language), translate-subtitle (to another language), or SDH (deaf/HOH captions with sound cues).
- **Format** — SRT, WebVTT, or plain; and any platform limits (YouTube, broadcast, Netflix-style specs).
- **Constraints** — reading-speed/line-length target if non-standard.

## Output Format

### Subtitles: [content] — [task]

**The subtitles** in the requested format (SRT/VTT), each cue:
- **≤2 lines**, each **~42 chars**, broken at natural phrase boundaries (don't split an article from its noun).
- **Timed to reading speed** — long sentences are **condensed** (not every word — paraphrase to the gist) so they're readable in the time available. Where you have timecodes, respect them; where not, note suggested durations.
- For **translation**: render meaning compactly — the target must fit the same time slot, so condense more aggressively than prose translation, keeping the essential meaning.
- For **SDH**: include speaker IDs and `[sound cues]` (e.g. `[door slams]`, `[tense music]`).

**Notes** — where you condensed/cut and why, any cue that's tight on reading speed (a 🔴 flag to adjust timing), and segmentation choices.

## Quality Checks

- [ ] Each cue is ≤2 lines and within the line-length limit (~42 chars)
- [ ] Cues are readable at standard reading speed — long lines are condensed, not crammed
- [ ] Line breaks fall at natural phrase boundaries (no orphaned articles/prepositions)
- [ ] Translations are condensed to fit the original timing, keeping the meaning
- [ ] SDH captions include speaker IDs and sound cues where requested
- [ ] Output is in the requested format (valid SRT/VTT structure)

## Anti-Patterns

- [ ] Do not exceed reading speed — a perfectly accurate caption no one can read in time has failed
- [ ] Do not translate verbatim for subtitles — the target overruns the slot; condense to the gist
- [ ] Do not break lines mid-phrase — split at clause/phrase boundaries for readability
- [ ] Do not exceed 2 lines per cue — split into multiple cues instead
- [ ] Do not omit sound cues in SDH — they're the point of accessible captions

## Based On

Subtitling standards — reading-speed (CPS) limits, ~42-char lines, 2-line max, phrase-boundary segmentation, SDH conventions.
