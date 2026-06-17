# Skill Playground

A zero-backend web app to run any skill in this repo with **your own Claude API key**.
Pick a skill → it becomes a form → fill it in → Claude executes the skill's instructions
and streams the result. Your key is stored only in your browser (`localStorage`) and sent
directly to `api.anthropic.com`. Nothing touches a server we own.

## What you can do

- **Search and filter** the full library by keyword, **bundle**, and **maturity tier**
  (🟢 Production-Ready · 🔵 Stable · 🟡 Experimental) — every tile shows its tier.
- **Run a skill** against the Claude API and stream the output (copy or download as `.md`).
- **Use it in another tool** — each skill has a *"Use this skill in another tool"* panel
  that copies the instructions formatted for **ChatGPT**, **Gemini**, or as raw text, so
  you can paste it into any assistant. (Same output as the generated `exports/` files.)

## Run locally

```bash
node web/build-skills.mjs        # regenerate skills.json from skills/
cd web && python3 -m http.server 8000
# open http://localhost:8000
```

> It must be served over HTTP (not opened as a `file://` URL) so `fetch('skills.json')` works.

Paste a key from [console.anthropic.com](https://console.anthropic.com/settings/keys) and run.

## How it works

- `build-skills.mjs` scans `../skills/*/SKILL.md`, parses the frontmatter and the
  **Required Inputs** section, tags each skill with its tier (from `../skill-tiers.json`),
  and writes a **deterministic** `skills.json` (the UI's data source — no timestamp, so CI
  can verify it stays in sync).
- `app.js` sends the skill's instruction body as the `system` prompt and the filled-in
  fields as the user message, using the Anthropic Messages API with
  `anthropic-dangerous-direct-browser-access: true` for direct browser calls.

## Keep it in sync

Re-run `node web/build-skills.mjs` whenever skills are added or edited, and commit the
updated `skills.json`. (Or wire it into CI / a pre-commit hook.)

## Deploy

It's fully static — host the `web/` folder on GitHub Pages, Netlify, Vercel, or any
static host. No environment variables, no server.
