# PM Skills — offline bundle v83.2.0

Everything in this archive works with **no internet, no account, no telemetry.**
Skills are plain markdown; your AI reads them. Nothing here calls home.

## What's inside
- `skills/`      — all canonical skills (one `SKILL.md` per folder)
- `exports/`     — the same skills rendered for ChatGPT, Gemini, Cursor, Windsurf, Copilot, Aider, Cline, Continue, Zed, Roo, Kilo, Obsidian, OpenClaw, Gemini CLI and the OpenAI Agents SDK
- `pipelines/` + `schemas/` — the typed pipelines and the per-skill contracts they are checked against
- `PACKS.md`     — curated packs for a moment in your life
- `JOURNEYS.md` + `journeys/` — packs you can run as an ordered, guided session
- `overlays/`    — jurisdiction overlays (local rules) where they exist
- `SKILLS.md`    — the full catalogue · `LICENSE` — MIT
- `web/` + `org/`  — the browser playground (with its built catalogue) and the Org Edition server

## Serve it on a laptop (fully offline)
```bash
node org/server.mjs --port 8080        # from inside the extracted folder
# or, from any machine with Node and the CLI:
npx pm-claude-skills serve --bundle pm-skills-offline-83.2.0.tar.zst
```
Open http://localhost:8080 for the playground and the `/v1` API. Model calls still need a key or a local model; browsing, searching and reading every skill works with nothing else.

## Use with a local model (fully offline)
1. Install a local runner — **Ollama**, **LM Studio**, or **llama.cpp** — and pull a capable instruction model.
2. Pick a skill: open `skills/<name>/SKILL.md`.
3. Paste the whole file as the **system prompt** (or "instructions"), then ask your question as the user message. That's the entire integration.
4. For a tool that supports rules/instructions files (Cursor, Cline, Continue, Zed…), use the matching folder under `exports/` — it's already in that tool's format.

## Use in an air-gapped tool
Copy the `exports/<tool>/` folder into the tool's rules/skills directory. No installer needed — they're text files.

## Verify it
`pm-skills-offline-83.2.0.tar.zst.sha256` holds the archive hash; every exported file ends with the SHA-256 of its source skill, the same hash published at /.well-known/agent-skills.json on the site.

## Keep the boundaries
High-stakes skills (money, legal, health, grief, immigration) say "not advice — confirm locally" for a reason. Offline doesn't change that; a local model can be confidently wrong too. Use a jurisdiction variant where one exists and confirm specifics with a real professional.

Source, updates, and the browser playground (online): https://github.com/mohitagw15856/pm-claude-skills
