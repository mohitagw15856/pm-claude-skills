# Roadmap

Where the library is headed. This is a direction, not a contract — priorities shift with
community input. Have an idea? [Open a discussion](https://github.com/mohitagw15856/pm-claude-skills/discussions)
or [request a skill](SKILL_REQUEST.md).

## ✅ Recently shipped

- **Multi-platform** — single-source exports to Claude, ChatGPT, Gemini, Cursor, Windsurf, Aider; native installers for Hermes, Codex, OpenClaw.
- **`npx pm-claude-skills`** — one cross-platform install command (published on npm).
- **MCP server** — search & pull skills on demand from any MCP client.
- **Subagents, slash commands, personas (output-styles)** — content beyond skills.
- **Quality gates** — SkillCheck (structure) + Skill Security Auditor (safety) in CI.
- **Skill tiers**, a scaffolder (`npm run new-skill`), and a static skill catalog.

## 🔭 Now (in progress)

- Growing **per-skill depth** — `references/` and `templates/` for the most-used skills.
- A browsable **docs site** beyond the catalog (per-tool install guides, search).

## ⏭️ Next

- More **export/install targets** as the `SKILL.md` standard spreads (Kilo Code, OpenCode, Windsurf rule modes).
- **Skill chaining** helpers to make the [orchestration patterns](ORCHESTRATION.md) one-command.
- Expanding **Production-Ready** coverage — promoting Stable skills as they prove out.

## 🌠 Later

- Community **skill packs** (curated bundles for a role/industry).
- Internationalised skill descriptions.
- A public **contributor leaderboard**.

---

## 🌱 Good first issues

New here? These are great starter contributions (open a PR — `npm run skillcheck` must pass):

1. **Add a requested skill** from [SKILL_REQUEST.md](SKILL_REQUEST.md) or the wishlist in the README. Scaffold it with `npm run new-skill -- --name your-skill`.
2. **Strengthen an existing skill** — add a missing *Quality Checks* or *Anti-Patterns* section (SkillCheck warns where they're absent: `node scripts/skillcheck.mjs`).
3. **Add a Python helper** to a skill that would benefit from computed output (see the RICE / sprint / health examples under `skills/*/scripts/`).
4. **Add an export/install target** for another tool — it's a few lines in the `PLATFORMS` registry of `scripts/build-exports.mjs` plus the installers.
5. **Improve docs** — a clearer example in a skill, or a fix in the catalog/README.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full flow.
