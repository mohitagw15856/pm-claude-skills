# Multi-Platform Exports

These folders are **generated** from the canonical `skills/*/SKILL.md` files —
the skill body is the single source of truth. Do not edit anything in `exports/`
by hand; edit the source skill and run:

```bash
node scripts/build-exports.mjs
```

Currently exporting **172 skills** to:

- **ChatGPT — Custom GPT instructions** → `exports/chatgpt/`
- **Google Gemini — Gem instructions** → `exports/gemini/`

Adding a new platform is a few lines in the `PLATFORMS` registry of
`scripts/build-exports.mjs` — no content is duplicated.
