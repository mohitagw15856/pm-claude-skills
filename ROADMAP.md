# Roadmap

Where the library is headed. This is a direction, not a contract: priorities shift with community input.

Numbers on this page were measured on 2026-09-28 from the repository itself.

## Before you build something large

Small, focused pull requests are the fastest way in: one skill, one fix, one document. They need no discussion first.

For anything larger, such as a new bundle, a new export target or a change to a gate, please [open a discussion](https://github.com/mohitagw15856/pm-claude-skills/discussions) before writing it. Ten minutes of agreement saves a rejected pull request. Check the lists below first, so that you do not build what is already planned or already decided against.

Want a skill that does not exist? [Request it](SKILL_REQUEST.md).

## ✅ Recently shipped

- **Design taste** (v80.1.0): a five-stage UI pipeline, with pointers to five specialist design skills. [pm-design-taste](plugins/pm-design-taste/)
- **The promote loop** (v80.0.0): scan your own transcripts for what you keep asking, draft it as a skill, test the triggers, publish. [docs/PROMOTE-LOOP.md](docs/PROMOTE-LOOP.md)
- **The decision layer** (v79.0.0): typed questions with a probability per option, for routing, guarding and judging. [docs/JEV-DECISION-LAYER.md](docs/JEV-DECISION-LAYER.md)
- **Skill chaining**: `pm-claude-skills chain <workflow>` runs a whole recipe headless. [WORKFLOWS.md](WORKFLOWS.md)
- **A deprecation contract**: skills can be retired without breaking a published name. [docs/DEPRECATION.md](docs/DEPRECATION.md)
- **Community skill packs**: [PACKS.md](PACKS.md)
- **Exports to 12 platforms**, one install command, an MCP server, subagents and slash commands
- **Quality gates in CI**: structure, security, duplicates, vendor neutrality, drift

## 🔭 Now

- **Proving what is here.** The library has 1196 skills. Of those, 281 have a curated eval case and 28 have published scores. Coverage, not more content, is the constraint. See [evals/README.md](evals/README.md).
- **Trust in a release.** Checking that every release installs and runs, a way to tell users when a command changes, and frozen versions of the flagship skills that a team can pin.
- **Per-skill depth.** `references/` exist for 114 of them, `templates/` for 51 and helper scripts for 57. The most-used skills come first.

## ⏭️ Next

- **A promotion round for Production-Ready.** 59 are promoted today. The tier ladder needs a promotion round, not a new rung.
- **Paying down the web design debt.** The stylesheet has more sizes, radii and colours than it needs. The plan is a ratchet that only lets the counts fall.
- **Fixing the accessibility failures** on the router and catalogue pages, which fail the check on every push.
- **More export and install targets** as the `SKILL.md` standard spreads.

## 🌠 Later

- **Translated skill descriptions.** Currently a stub: 11 Spanish, 10 Japanese, 10 Chinese and 1 French. Either it gets done at scale or the stubs are retired honestly.
- **Pinning from the CLI**, so that a team can install one skill at one version with a single command.

## ⏸ Paused

- **Seasons.** Season 2 closed with an empty board, so Season 3 is not opening for now. The [Hall](seasons/HALL.md) stays. If you want to play, say so in a discussion and it can reopen.
- **A public contributor leaderboard.** It was to be built on the seasons machinery, so it waits with it.

## ❌ Decided against

- **Skills built around one product.** A skill may name a tool as one option. It may not stop working without it. See "What Gets Rejected" in [CONTRIBUTING.md](CONTRIBUTING.md).
- **Telemetry by default.** The usage counter stays opt-in. See [docs/TELEMETRY.md](docs/TELEMETRY.md).
- **Accounts, or a hosted service you must use.** Everything works from files on your machine.

---

## 🌱 Good first issues

New here? These are good starter contributions. Open a pull request; `npm run skillcheck` must pass.

1. **Add a requested skill** from [SKILL_REQUEST.md](SKILL_REQUEST.md). Scaffold it with `npm run new-skill -- --name your-skill`.
2. **Add an eval case** for a skill that has none. It is one entry in [`evals/cases.json`](evals/cases.json), and most skills still need one.
3. **Strengthen an existing skill** by adding a missing *Quality Checks* or *Anti-Patterns* section. SkillCheck warns where they are absent: `node scripts/skillcheck.mjs`.
4. **Add a Python helper** to a skill that would benefit from computed output. See the RICE, sprint and health examples under `skills/*/scripts/`.
5. **Add an export or install target** for another tool. It is a few lines in the `PLATFORMS` registry of `scripts/build-exports.mjs`, plus the installers.
6. **Improve the docs**: a clearer example in a skill, or a fix in the catalogue or README.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full flow.
