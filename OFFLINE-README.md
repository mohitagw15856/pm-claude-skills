# PM Skills — offline bundle v78.0.1

Everything in this archive works with **no internet, no account, no telemetry.**
Skills are plain markdown; your AI reads them. Nothing here calls home.

## What's inside
- `skills/`      — all canonical skills (one `SKILL.md` per folder)
- `exports/`     — the same skills rendered for ChatGPT, Gemini, Cursor, Windsurf, Aider, Cline, Continue, Zed, Roo, Kilo, Obsidian, OpenClaw
- `PACKS.md`     — curated packs for a moment in your life
- `JOURNEYS.md` + `journeys/` — packs you can run as an ordered, guided session
- `variants/`    — jurisdiction overlays where they exist
- `SKILLS.md`    — the full catalogue · `LICENSE` — MIT

## Use with a local model (fully offline)
1. Install a local runner — **Ollama**, **LM Studio**, or **llama.cpp** — and pull a capable instruction model.
2. Pick a skill: open `skills/<name>/SKILL.md`.
3. Paste the whole file as the **system prompt** (or "instructions"), then ask your question as the user message. That's the entire integration.
4. For a tool that supports rules/instructions files (Cursor, Cline, Continue, Zed…), use the matching folder under `exports/` — it's already in that tool's format.

## Use in an air-gapped tool
Copy the `exports/<tool>/` folder into the tool's rules/skills directory. No installer needed — they're text files.

## Keep the boundaries
High-stakes skills (money, legal, health, grief, immigration) say "not advice — confirm locally" for a reason. Offline doesn't change that; a local model can be confidently wrong too. Use a jurisdiction variant where one exists and confirm specifics with a real professional.

Source, updates, and the browser playground (online): https://github.com/mohitagw15856/pm-claude-skills
