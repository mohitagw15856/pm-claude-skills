# Example: pixel-gif-maker

## What this skill does

Generates retro pixel-text animated GIFs (scrolling marquee, pulse, confetti party, sparkle) from a bundled pure-stdlib Python script: no dependencies, deterministic output, ready to drag into Slack or a PR.

## How to trigger it

### Example 1: a launch-day celebration GIF

**You say:**
> "Make a 'SHIPPED 🚀' GIF for Slack, party mode, for our v2 launch this afternoon."

**Claude produces (excerpt):**

Running the bundled script:

```bash
python3 scripts/pixel_gif.py "SHIPPED" --mode party --out shipit.gif
```

🎉 shipit.gif, 159×57, 10 frames, party mode (confetti for a launch).
Drag it into Slack. Want it calmer (sparkle) or bigger (--scale 4)?

### Example 2: a scrolling marquee for a PR comment

**You say:**
> "A scrolling marquee GIF that says 'FIX THE BUILD' for the PR where CI has been red all week. Keep it small."

**Claude produces (excerpt):**

```bash
python3 scripts/pixel_gif.py "FIX THE BUILD" --mode scroll --scale 2 --out fix-the-build.gif
```

🛠 fix-the-build.gif, scroll mode, 2x scale, loops forever (like the build failures).
Byte-exact deterministic: rerunning produces the identical file, safe to commit.

## Tips for best results

- Keep the text short; marquees scroll long text but pulse and party modes sit best under 12 characters.
- Say where it is going (Slack, Teams, PR comment); size and scale suggestions follow.
- Ask for a different mode if the first feels wrong; regenerating is instant and deterministic.

## Related skills

- `clip-factory` when you want short video clips rather than pixel GIFs
- `stakeholder-update` for the message the GIF celebrates
