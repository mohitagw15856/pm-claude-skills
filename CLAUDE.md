# Instructions for Claude Code

**There is unfinished work.** If the maintainer says "continue" (or asks what is left), read [docs/HANDOFF.md](docs/HANDOFF.md) and finish its tasks in order, one pull request per task, ticking them off in that file. When every task is done, delete `docs/HANDOFF.md` and this paragraph in the final pull request.

## Working in this repository

- main is protected: branch, open a pull request, wait for checks, squash-merge.
- **Commits:** no backticks in commit messages; write the message to a file and use `git commit -F <file>`. End commits with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>` and PR bodies with `🤖 Generated with [Claude Code](https://claude.com/claude-code)`.
- **Style:** British English. No em dashes in new content.
- **Gates:** run `npm run check` and `node scripts/skill-audit.mjs` (the audit is not part of `npm run check`) before opening a pull request.
- **More detail:** skill layout, generators and conventions are in [AGENTS.md](AGENTS.md) and [CONTRIBUTING.md](CONTRIBUTING.md); the full checklist of generators and gates is at the end of [docs/HANDOFF.md](docs/HANDOFF.md).
