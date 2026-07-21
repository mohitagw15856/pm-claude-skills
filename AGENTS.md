# AGENTS.md

Guidance for AI agents working in this repository. (Human contributors: see [CONTRIBUTING.md](CONTRIBUTING.md) and [SKILL-AUTHORING-STANDARD.md](SKILL-AUTHORING-STANDARD.md).)

## What this repo is

A library of professional **Agent Skills** — each a plain `SKILL.md` file that teaches an assistant to do one professional task well. Skills live in `skills/<name>/SKILL.md`; bundles in `plugins/<bundle>/`; the marketplace in `.claude-plugin/marketplace.json`.

## Working conventions

- **New skill / bundle:** scaffold with `node scripts/new-skill.mjs` or `node scripts/new-bundle.mjs` — don't hand-wire `plugins/` and `marketplace.json`.
- **Every skill must pass the L3 / SkillSpec gate.** Validate with `node scripts/skillcheck.mjs`.
- **Keep counts honest.** After adding skills, run `node scripts/check-drift.mjs` (skill/bundle counts across docs must match) and regenerate derived files with `npm run check`.
- **Don't hand-edit generated files** (`web/skills.json`, `exports/**`, `web/catalog.html`, `web/coverage.html`) — they're rebuilt.
- **Ship via a branch + PR**, not direct pushes to `main`.

## House prose rules (the mini standard)

Everything you write — skill bodies, docs, and the prose a skill *produces* — follows this. Full version: [`docs/prose-style.md`](docs/prose-style.md); as a persona: [`output-styles/plain-honest-prose.md`](output-styles/plain-honest-prose.md).

- Write for a specific reader and the action the text is for.
- Match voice to genre: docs and summaries stay neutral; only personal/persuasive writing shows a person. When unsure, neutral.
- Give every paragraph a checkable detail — but **never invent a number, quote, date, or fact to sound specific.** Hedge honestly or ask.
- Plain words over inflated ones; drop filler (*leverage, robust, seamless, delve, game-changer*).
- Cut the staged parts: no ceremonial openers ("Let's dive in", "It's worth noting"), no keynote rule-of-three, no "Great question!", no "In conclusion" restatement.
- Don't fake humanity: no manufactured typos, forced slang, random "But" openers, or sentences chopped just to vary length. Earned, or absent.
- Keep useful structure (headings, steps, tables); remove decoration, not architecture.
- Revise by reading and cutting — it should end shorter than it started.
