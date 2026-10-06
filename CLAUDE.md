# Instructions for Claude Code

## Working in this repository

- main is protected: branch, open a pull request, wait for checks, squash-merge.
- **Commits:** no backticks in commit messages; write the message to a file and use `git commit -F <file>`. End commits with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>` and PR bodies with `🤖 Generated with [Claude Code](https://claude.com/claude-code)`.
- **Style:** British English. No em dashes in new content.
- **Gates:** run `npm run check` and `node scripts/skill-audit.mjs` (the audit is not part of `npm run check`) before opening a pull request.
- **After editing any skills/**/SKILL.md:** rerun the generators (build-skills, build-skills-md, build-disambiguation, build-exports, build-conformance-badge, jev build-index, build-docs, build-samples, build-workflows, build-tech-tree, build-dify-templates, build-listing-prompt, build-zh-pinyin), copy `data/risk-tiers.json` to `web/risk-tiers.json`, and copy changed skills into their bundle copies under `plugins/*/skills/<name>/`.
- **More detail:** skill layout, generators and conventions are in [AGENTS.md](AGENTS.md) and [CONTRIBUTING.md](CONTRIBUTING.md).
