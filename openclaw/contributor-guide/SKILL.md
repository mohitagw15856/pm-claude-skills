---
name: contributor-guide
description: "Write a CONTRIBUTING guide that helps people contribute to an open-source project without friction. Use when asked to write a CONTRIBUTING.md, set up contribution guidelines, or make a repo welcoming to contributors. Produces a clear guide: how to set up, the contribution workflow, standards, PR expectations, and how to get help — lowering the barrier to a first PR."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/contributor-guide.html
metadata:
  {
    "openclaw": { "emoji": "🗣" }
  }
---

# Contributor Guide Skill

Most would-be contributors give up at setup friction or unclear expectations. A good `CONTRIBUTING.md` removes
the guesswork: how to get the project running, how to propose a change, what a mergeable PR looks like, and
where to ask. This skill writes that guide — welcoming, specific, and aimed at getting someone to a successful
**first PR**.

## Required Inputs

Ask for these only if they aren't already provided:

- **Project & stack** — what it is, language/framework, repo layout basics.
- **Dev setup** — how to clone, install, run locally, and run tests.
- **Workflow** — branch model, commit/PR conventions, where issues live, who reviews.
- **Standards** — linting/formatting, test requirements, the Code of Conduct (link).
- **Norms** (optional) — how decisions are made, response times, good-first-issue process.

## Output Format

A `CONTRIBUTING.md`:

### Contributing to [Project]
A warm one-liner: contributions are welcome, here's how to make it smooth.

**Ways to contribute** — issues, docs, code, triage — not everyone writes code.

**Development setup**
```
# clone, install, run, test — the exact commands
```
…so a contributor can get the project running and tests passing locally.

**Finding something to work on** — point to `good first issue` / `help wanted`; ask people to comment before starting larger work.

**Making a change (the workflow)**
1. Branch from … with naming convention …
2. Make the change; follow the standards below.
3. Add/update tests; run the linter/tests locally.
4. Open a PR — what the PR description should include; link the issue.

**Standards** — formatting/linting, test expectations, commit/PR conventions, the Code of Conduct link.

**What happens next** — who reviews, rough turnaround, how feedback works.

**Getting help** — where to ask (Discussions, chat, issue) — make it explicitly OK to ask.

## Quality Checks

- [ ] Setup commands actually get the project running and tests passing
- [ ] The contribution workflow is numbered and unambiguous (branch → change → test → PR)
- [ ] Standards (lint, tests, commit/PR conventions, CoC) are stated and linked
- [ ] It points to good-first-issues and welcomes non-code contributions
- [ ] It's encouraging in tone and tells people exactly where to get help

## Anti-Patterns

- [ ] Do not assume the contributor knows the setup — spell out the exact commands
- [ ] Do not leave PR expectations implicit — say what a mergeable PR includes
- [ ] Do not be gatekeep-y or cold — friction and tone both lose contributors
- [ ] Do not omit how to get help or who reviews — uncertainty stalls first PRs
- [ ] Do not forget the Code of Conduct link — it sets the community standard

## Based On

Open-source contribution best practices (clear setup, defined workflow, good-first-issues, welcoming tone, CoC).

## Example Trigger Phrases

- "Write a CONTRIBUTING.md."
- "Set up contribution guidelines."
- "Make a repo welcoming to contributors."
