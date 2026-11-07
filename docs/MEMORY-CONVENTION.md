# The memory convention

Every AI tool keeps its own memory in its own place: Claude Code has CLAUDE.md and auto-memory, Cursor has rules, Codex has AGENTS.md, ChatGPT has its memory panel. Switch tools and your context stays behind. This library uses one plain Markdown file instead, and every skill reads it first.

## The file

| Scope | Path | When it wins |
|---|---|---|
| Project | `./.pm-skills/memory.md` | Always, when it exists |
| You, on this machine | `~/.pm-skills/memory.md` | When the project has none |

`PM_SKILLS_HOME` moves the home folder, as it does for every other CLI state file. The file is under 16 KB, is inert text, and never leaves your machine.

## What goes in it

Three short sections, any of which may be empty:

```markdown
# Memory

## Who I am
- Product manager, B2B payments, London. British English. Fortnightly releases.

## What I am working on
- Q1 2027: cut onboarding time from 9 days to 3. Board review on 12 Feb.

## Facts to remember
- Our definition of "active customer" is 3+ transactions in 30 days.
- Pricing is per seat; the enterprise tier starts at 50 seats.
```

Facts, not documents. If a skill needs a document, paste the document.

## How to manage it

```bash
npx pm-claude-skills memory show                       # print the active file and where it is
npx pm-claude-skills memory set "we ship fortnightly"  # append a fact to the project file
npx pm-claude-skills memory set --file notes.md        # replace the file wholesale
npx pm-claude-skills memory set --global "…"           # the home file instead
npx pm-claude-skills memory clear                      # delete the project file
npx pm-claude-skills memory path                       # the path a skill should read
```

The `profile` command (role, city, language) still exists and is narrower: it holds structured fields that skills substitute. Memory is free text that skills read as context.

## How skills use it

A skill that follows this convention opens with a line in its Required Inputs section:

> If `.pm-skills/memory.md` or `~/.pm-skills/memory.md` exists, read it before asking for inputs and do not ask for anything it already answers.

Hosts that cannot read files (the hosted broker, ChatGPT) are given the file's text by the client; the MCP `get_skill` result says when a skill expects it. Nothing breaks when the file is absent: the skill asks as it always did.

## Why a file and not a database

A file is diffable, fits in a repo, works offline, and every agent on earth can read one. Commit `.pm-skills/memory.md` to share project context with a team, or list it in `.gitignore` to keep it personal. The `profile`, `brain/` and `nightwatch` features are all built on the same principle.
