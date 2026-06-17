# Docs assets

Images used in the main README.

- `playground.png` — current Skill Playground screenshot (shown in the README hero).

## Recording the hero demo GIF

To replace the static screenshot with a short looping demo:

1. **Record a ~15–25s clip** of the live Playground (https://mohitagw15856.github.io/pm-claude-skills/):
   pick a skill → fill the form → run → result streams in.
   - **macOS:** [Kap](https://getkap.co/) (free) or QuickTime screen recording.
   - **Windows:** [ScreenToGif](https://www.screentogif.com/) (free) records straight to GIF.
   - **Cross-platform:** [Peek](https://github.com/phw/peek) (Linux), or record an `.mp4` and convert with `gifski`.
2. **Export as GIF** named `playground-demo.gif`, ideally ≤ ~1200px wide and < 5 MB
   (GitHub renders it inline; keep it small so the README loads fast).
   - From an mp4: `npx gifski --fps 12 --width 1100 -o playground-demo.gif demo.mp4`
3. Drop it in this folder and update the README hero image from `playground.png` to
   `playground-demo.gif` (the `<!-- DEMO -->` comment in the README marks the spot).
