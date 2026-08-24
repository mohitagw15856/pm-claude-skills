# Public impact dashboard (#16)

One page that shows the project's scale — for you (optimization), visitors (social proof), and sponsors (ROI). Uses only public/aggregate signals (see `measurement.md`), so it never breaks the no-telemetry promise.

## What it shows
- ⬇️ Downloads (clawhub + npm + PyPI) — 55.5k+ and climbing
- ⭐ GitHub stars
- ▶️ Playground runs served (from the existing `/try/stats` worker)
- 📬 Newsletter subscribers
- 📚 Skills / bundles (from `web/skills.json`)
- 🔥 Top skills this week (from the trending job that already runs)
- 💬 A featured ROI story (from the campaign, `roi-stories-campaign.md`)

## Data sources (all already exist or are public)
- `web/skills.json` — counts
- `pm-skills-mcp.workers.dev/try/stats` — runs served (already powering a README badge)
- GitHub API — stars
- clawhub/npm/PyPI public download stats
- newsletter tool — subscriber count

## The ready page
`../pages/impact.html` is a self-contained, theme-aware page with placeholder numbers and clearly-marked spots to wire the live endpoints. Move it to `web/impact.html` when you want it live, and link it from the README badge row ("📊 Impact").

## Why it earns its keep
- **Social proof compounds:** "55k downloads · 1.3k stars · N runs" is screenshot-able and gets shared.
- **Sponsor ROI becomes legible:** the prospectus points here for live numbers.
- **Your optimization loop:** the download→star ratio (`measurement.md`) lives here, so you see whether the playbook is working.
