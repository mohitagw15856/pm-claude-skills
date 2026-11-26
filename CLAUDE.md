# Instructions for Claude Code

## Working in this repository

- main is protected: branch, open a pull request, wait for checks, squash-merge.
- **Commits:** no backticks in commit messages; write the message to a file and use `git commit -F <file>`. End commits with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>` and PR bodies with `🤖 Generated with [Claude Code](https://claude.com/claude-code)`.
- **Style:** British English. No em dashes in new content.
- **Gates:** run `npm run check` before opening a pull request. It runs every gate (including `node scripts/skill-audit.mjs` and the bundle copy check) and reports all failures, not only the first; `--only <text>` runs a subset and `--bail` stops at the first failure.
- **After editing any skills/**/SKILL.md:** run `npm run regen`. It copies masters over the bundle copies under `plugins/*/skills/<name>/` (`node scripts/sync-bundles.mjs`), runs every generator, and refreshes `web/risk-tiers.json`. `build-zh-pinyin` is skipped unless `PINYIN_MODULE_DIR` is set; it matters only for a new or renamed Chinese skill name.
- **More detail:** skill layout, generators and conventions are in [AGENTS.md](AGENTS.md) and [CONTRIBUTING.md](CONTRIBUTING.md).
- **Releases:** bump `package.json`, `tools-pkg/package.json` (same version; the drift check enforces it), `server.json`, `.claude-plugin/marketplace.json` and `python/pyproject.toml`. After the GitHub release, publish npm from the repo root and from `tools-pkg/` (both build their generated files in `prepack`), then run `node scripts/release-verify.mjs`.
