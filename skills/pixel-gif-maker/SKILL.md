---
name: pixel-gif-maker
description: "Generate retro pixel-text animated GIFs for Slack, Teams, or a PR comment — scrolling marquees, heartbeat pulses, confetti parties, twinkling sparkles — from a bundled pure-stdlib Python script (no PIL, no dependencies, byte-exact deterministic). Use when someone wants a celebration GIF, a 'ship it' GIF, a custom Slack GIF, a launch-day animation, or to make a team win feel like one. Produces a ready-to-drag .gif file."
---

# Pixel GIF Maker Skill

The most-reacted message in any Slack channel is never the status update — it's the
GIF. This skill makes custom ones in a retro pixel style: your words, four
animations, eight colors, and a file small enough to drag anywhere. The whole
encoder is a bundled pure-stdlib Python script — this library's calculators are
dependency-free and deterministic, and so is its confetti.

## What This Skill Produces

- A `.gif` file (GIF89a, looping) with the user's text in chunky 5×7 pixel type
- One of four animations: **scroll** (marquee), **pulse** (heartbeat zoom),
  **party** (hue-cycling text + confetti), **sparkle** (twinkling stars)
- Sized for chat: typically 10–60KB, well under any upload limit

## Required Inputs

Ask for (if not already provided):
- The text — **under 24 characters**; pixel fonts are for punchlines
  ("SHIP IT", "1000 STARS", "GG TEAM", "V63 IS LIVE"). Type `*` for a ♥.
- The mood → mode: victory lap = `party` · announcement = `scroll` ·
  emphasis = `pulse` · appreciation = `sparkle`
- Optional: colors (`night, plum, teal, mint, gold, coral, white, ink, violet`)
  and `--scale 1-4` (default 3)

## Process

1. Run the bundled script — no installs, Python 3 stdlib only:
   ```bash
   python3 scripts/pixel_gif.py --text "SHIP IT" --mode party --out shipit.gif
   python3 scripts/pixel_gif.py --text "GG TEAM *" --mode sparkle --fg gold --bg night --out gg.gif
   python3 scripts/pixel_gif.py --self-test    # verify all four modes, print hashes
   ```
2. Uppercase renders best (the font is A–Z, 0–9, and common punctuation; unknown
   characters become `?` — warn the user rather than surprise them).
3. Same arguments + same `--seed` → byte-identical file; change `--seed` to
   reshuffle confetti/star positions.
4. Hand back the file path and one line on which mode was chosen and why.

## Output Format

The `.gif` itself, plus:

```
🎉 shipit.gif — 159×57, 10 frames, party mode (confetti for a launch).
Drag it into Slack. Want it calmer (sparkle) or bigger (--scale 4)?
```

## Quality Checks

- [ ] Text length checked BEFORE generating — over 24 characters, ask them to cut
      (offer the punchline edit: "SHIPPED THE MIGRATION" → "SHIPPED IT")
- [ ] Mode matches the moment — a layoff-week channel does not get confetti;
      when in doubt, sparkle
- [ ] Script ran without error and the reported file size is under ~200KB
- [ ] Any character outside the font set was flagged to the user, not silently
      turned into `?`

## Anti-Patterns

- [ ] Do not reach for image libraries or external services — the point of the
      bundled encoder is zero dependencies and deterministic output
- [ ] Do not generate GIFs containing colleagues' names in mocking contexts —
      celebration tool, not a roast tool; decline and suggest the kind version
- [ ] Do not cram sentences in — if the user insists past 24 characters, use
      scroll mode and say why
- [ ] Do not promise Slack emoji-size rendering — this makes message GIFs;
      custom emoji have their own size rules the user handles in Slack settings

## Example Trigger Phrases

- "Make a GIF to celebrate the launch in Slack."
- "Make a pixel-art banner for this PR comment."
- "Make a team win feel like one."
- "Make a scrolling marquee GIF."
