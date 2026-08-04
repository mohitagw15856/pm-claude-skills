# PM Skills — website & newsletter

A simple, framework-free site to host on **Vercel**:

- **Home** (`index.html`) — value prop + newsletter signup + featured skills.
- **Catalogue** (`catalogue.html`) — searchable, filterable grid of every skill, loaded **live** from the canonical `skills.json` (so new releases show up with no redeploy).
- **Skill detail** (`skill.html?name=<skill>`) — what it produces, what it needs, a live "run it in the Playground" example, related skills, and the full skill text.
- **Newsletter** — Buttondown's official **iframe embed** widget (`buttondown.com/pm-skills?as_embed=true`). It runs client-side, so Buttondown's Cloudflare **Turnstile** bot-check completes in the visitor's browser and double opt-in works on the **free plan** — no API key, no env var, no server proxy.

No build step. Static files.

## Deploy to Vercel (5 minutes)

1. **New Project** in Vercel → import this repo (`mohitagw15856/pm-claude-skills`).
2. Set **Root Directory** to **`site`**. *(This keeps it separate from the main `web/` deploy at the repo root, which serves the Playground.)*
3. Framework preset: **Other** (it's static). No build command, output directory `.` — already set in `site/vercel.json`.
4. Deploy. That's it — the newsletter widget is a Buttondown iframe that works with **no** env vars.

> **Why an iframe and not a nice inline form?** Buttondown now guards its free subscribe endpoint with **Cloudflare Turnstile**. A server-side POST (the old `/api/subscribe` proxy) can't solve Turnstile, so it always failed with a 502. The iframe embed runs Turnstile *in the visitor's browser*, which is the only way subscriptions work on the free plan. To point the widget at a different Buttondown newsletter, change the `?as_embed=true` iframe `src` in `index.html` and `skill.html`.

> The catalogue fetches `https://mohitagw15856.github.io/pm-claude-skills/skills.json` at runtime, so it always shows the current library. To pin it to a snapshot instead, change `CATALOG_URL` in `assets/app.js`.

### Want the inline form back? (paid Buttondown only)
The `site/api/subscribe.js` serverless function is still in the repo. If you upgrade Buttondown to a **paid plan**, set `BUTTONDOWN_API_KEY` (from **Settings → API**) as a Vercel env var and restore the `<form class="newsletter">` markup — the paid API has no Turnstile gate.

## Auto-announce new skills

The repo workflow [`.github/workflows/newsletter-on-release.yml`](../.github/workflows/newsletter-on-release.yml) turns each **GitHub Release** into a **draft** newsletter in Buttondown (it never auto-sends — you review and hit send).

- Add the same **`BUTTONDOWN_API_KEY`** as a **repo secret** (Settings → Secrets and variables → Actions).
- Publish a release → a draft appears in Buttondown with the release notes → you send it.
- You can also run it manually (Actions → *Newsletter draft on release* → Run workflow) against an existing tag.

## Local preview

Any static server works, e.g.:

```bash
cd site && npx serve .      # or: python3 -m http.server
```

The `/api/subscribe` function only runs on Vercel (or `vercel dev`). Locally the form will 404 on submit — that's expected; the catalogue and pages work fully.

## Customise

- **Featured skills** on the home page: edit the `FEATURED` array in `assets/app.js`.
- **Colours**: the `--accent` tokens in `assets/styles.css` (matches the library's `#d9605a`).
- **Copy**: all in the three `.html` files.

MIT © Mohit Aggarwal
