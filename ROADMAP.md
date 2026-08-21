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

- **Proving what's here.** 1117 skills, 28 with published eval scores. Coverage,
  not more content, is the constraint — see [evals/README.md](evals/README.md).
- Growing **per-skill depth** — `references/` and `templates/` for the most-used
  skills (108 have references today, 52 have templates).

## ⏭️ Next

- Expanding **Production-Ready** coverage — 50 of 1117 are promoted; the tier
  ladder needs a promotion round, not a new rung.
- **Consolidation.** The [duplicate detector](scripts/skill-dupes.mjs) gates new
  PRs; the pairs already marked "pending a content merge" in
  [skill-dupes-allow.json](skill-dupes-allow.json) still need an author pass.
- More **export/install targets** as the `SKILL.md` standard spreads.
- A public **contributor leaderboard** — the [Hall of Seasons](seasons/HALL.md)
  machinery already exists to build it on.

## 🌠 Later

- Internationalised skill descriptions. Currently a stub: 12 Spanish, 11
  Japanese, 11 Chinese, 1 French against 1117 skills. Either it gets done at
  scale or the stubs should be retired honestly.
- Deeper arenas for the Season beyond the gym.

## ✅ Shipped since this file was last true

These were listed above as upcoming for longer than they were unbuilt:

- **Skill chaining** — `pm-claude-skills chain <workflow>` runs a whole recipe
  headless ([bin/chain.mjs](bin/chain.mjs), [WORKFLOWS.md](WORKFLOWS.md)).
- **A docs site beyond the catalog** — [`docs/`](docs/) and [`site/`](site/).
- **Community skill packs** — [`packs/`](packs/), [PACKS.md](PACKS.md).
- **A deprecation contract** — skills can now be retired without breaking a
  published name ([docs/DEPRECATION.md](docs/DEPRECATION.md)).

---

## 🌱 Good first issues

New here? These are great starter contributions (open a PR — `npm run skillcheck` must pass):

1. **Add a requested skill** from [SKILL_REQUEST.md](SKILL_REQUEST.md) or the wishlist in the README. Scaffold it with `npm run new-skill -- --name your-skill`.
2. **Strengthen an existing skill** — add a missing *Quality Checks* or *Anti-Patterns* section (SkillCheck warns where they're absent: `node scripts/skillcheck.mjs`).
3. **Add a Python helper** to a skill that would benefit from computed output (see the RICE / sprint / health examples under `skills/*/scripts/`).
4. **Add an export/install target** for another tool — it's a few lines in the `PLATFORMS` registry of `scripts/build-exports.mjs` plus the installers.
5. **Improve docs** — a clearer example in a skill, or a fix in the catalog/README.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full flow.
