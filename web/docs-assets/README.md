# Docs assets

Images used in the main README and in articles.

- `playground-demo.gif` — animated hero demo (shown in the README).
- `playground.png` — static screenshot / fallback.
- `galaxy.png` — the **Skill Galaxy** (`galaxy.html`) constellation, clustered by profession.
- `brain.png` — the **in-browser Brain** (`brain.html`), the six provenance-tagged sections.
- `cheatsheet.png` / `cheatsheet.pdf` — the one-page cheatsheet poster, rendered from
  [`../cheatsheet.html`](../cheatsheet.html) (content mirrors [`../../CHEATSHEET.md`](../../CHEATSHEET.md)).
- `PM-Skills-Guide.pdf` — the 15-page Practical Guide, rendered from [`../guide.html`](../guide.html)
  (multi-page A4). Regenerate with `PAGES=guide node web/docs-assets/shoot.mjs`.

## Screenshots of the Galaxy / Brain / Cheatsheet (automated)

`shoot.mjs` screenshots `galaxy.html` and `brain.html` from the live site (or a local
server), and renders the local `cheatsheet.html` to a full-page `cheatsheet.png` **and** a
single-page `cheatsheet.pdf`. Handy for the README and for articles.

```bash
npx playwright install chromium                 # one-time, if needed
node web/docs-assets/shoot.mjs                  # all of them
# options:
PAGES=cheatsheet node web/docs-assets/shoot.mjs                 # just one (galaxy|brain|cheatsheet)
BASE_URL=http://localhost:8080 node web/docs-assets/shoot.mjs   # shoot a local `web/` server
IGNORE_HTTPS_ERRORS=1 node web/docs-assets/shoot.mjs            # behind a TLS-intercepting proxy
```

## Re-recording the hero demo GIF (automated)

`record-demo.mjs` drives the live Playground with Playwright and records a video.
The navigation, skill selection, and form-fill are real; the streamed model output
is a representative mock, so **no API key is needed**.

```bash
# 1. Serve the playground locally
cd web && python3 -m http.server 8080 &

# 2. Build the skills data if it is stale
node web/build-skills.mjs

# 3. Record (Playwright + a matching Chromium must be installed)
#    npx playwright install chromium   # one-time, if needed
node web/docs-assets/record-demo.mjs   # writes a .webm into this folder

# 4. Convert the .webm to an optimized GIF (two-pass palette)
cd web/docs-assets
V=$(ls *.webm | head -1)
ffmpeg -y -i "$V" -vf "fps=13,scale=1080:-1:flags=lanczos,palettegen=stats_mode=diff" /tmp/palette.png
ffmpeg -y -i "$V" -i /tmp/palette.png \
  -lavfi "fps=13,scale=1080:-1:flags=lanczos[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=3:diff_mode=rectangle" \
  playground-demo.gif
rm -f *.webm
```

For a **fully live** recording (real Claude call instead of the mock), comment out the
`window.fetch` override in `record-demo.mjs` and set a key via `localStorage` first.

## Recording manually (alternative)

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
