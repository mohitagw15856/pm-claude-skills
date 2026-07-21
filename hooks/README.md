# 🪝 Hooks — automate skills into your workflow

Skills tell the model *how* to do things. **Hooks** make things happen *automatically* on an event — before/after a tool runs, when you submit a prompt, when a session ends. They're the automation slice of the Claude Code ecosystem, and they pair beautifully with skills.

These are small, dependency-free, **read-only and non-blocking** example hooks. Use them as-is or as a starting point.

## What's here

| Hook | Event | What it does |
|---|---|---|
| [`load-context.sh`](load-context.sh) | `UserPromptSubmit` | Finds a `CONTEXT.md` in your project (walking up to the git root) and injects it into every prompt — so the model always knows your company, product, voice, and glossary. Pairs with [`CONTEXT.example.md`](../CONTEXT.example.md). |
| [`suggest-skill.sh`](suggest-skill.sh) | `UserPromptSubmit` | Scans your installed skills (`~/.claude/skills/`) and, when your prompt strongly matches one, nudges the model to apply it. Stays quiet when nothing fits. |
| [`doc-quality-gate.sh`](doc-quality-gate.sh) 🆕 | `PostToolUse` (Write\|Edit) | **Ambient lint:** the model writes a `*.prd.md` / OKR / postmortem / status doc → the matching skill's Quality Checks + Anti-Patterns are injected as a self-review instruction, so it fixes its own draft before you read it. |
| [`commit-changelog-nudge.sh`](commit-changelog-nudge.sh) 🆕 | `PostToolUse` (Bash) | After a `git commit` in a repo with a `CHANGELOG.md`, proposes the Keep-a-Changelog line for it (stays silent for merges/internal changes). |
| [`session-brief.sh`](session-brief.sh) 🆕 | `Stop` | Appends one line (date · repo · branch · commits) to a local session ledger — real material for `pm-weekly-review` on Friday. ⚠ The only hook here that **writes** (append-only, `~/.claude/pm-session-ledger.md`). |

## Install (1 minute)

1. Open [`settings.example.json`](settings.example.json) and copy the `hooks` block into your `~/.claude/settings.json` (global) or `.claude/settings.json` (per-project).
2. Replace `/ABSOLUTE/PATH` with where you cloned this repo.
3. Make the scripts executable: `chmod +x hooks/*.sh`
4. Start a new Claude Code session. Submit a prompt — if a `CONTEXT.md` exists, you'll see it grounding the response; if a skill matches, you'll get a nudge.

> Hook config shape (for reference):
> ```json
> { "hooks": { "UserPromptSubmit": [ { "hooks": [ { "type": "command", "command": "bash …/load-context.sh" } ] } ] } }
> ```

## How they work

Claude Code passes the event as JSON on **stdin**; whatever a `UserPromptSubmit` hook prints to **stdout** is added to the model's context for that turn. Our scripts read the event, do their (read-only) thing, print at most a few lines, and always `exit 0` so they never block you.

## Safety

Hooks run **on your machine with your permissions** — treat them like any shell script you'd add to your shell profile. These two only *read* (`CONTEXT.md`, your installed `SKILL.md` files) and print; they never write, network, or block. If you write your own (e.g. a `PreToolUse` guard that blocks dangerous commands), keep them simple and auditable, and remember a non-zero exit on `PreToolUse` can cancel the tool call.

## Ideas for your own hooks

- **`PreToolUse` on `Bash`** — block `rm -rf`, force-push, or prod deploys without confirmation.
- **`PostToolUse` on `Write|Edit`** — auto-run `npm run skillcheck` after editing a `SKILL.md`.
- **`Stop`** — append a one-line summary of what changed to a session log.

Learn more in the [Claude Code hooks docs](https://code.claude.com/docs/en/hooks).

## ☀️ chief-of-staff.sh — the morning brief (SessionStart)

Opens every session with this project's professional state: **predictions due for settling** (from `brain/predictions/`), the **latest Firm minutes / Boardroom verdicts** (so you revise documents with their verdicts in mind), and the brain's **open hypotheses**. Pure file reads, zero API cost, prints nothing when there's nothing to say. Pairs with `npx pm-claude-skills init`.

## Agent handoff (RFC 0002)

- `handoff-read.sh` — SessionStart: loads `HANDOFF.md` so a fresh session opens oriented.
- `handoff-write.sh` — SessionEnd/PreCompact: prompts the agent to overwrite `HANDOFF.md` with current state.

The convention: [docs/rfcs/0002-agent-handoff-file.md](../docs/rfcs/0002-agent-handoff-file.md). Pairs with the [session-handoff skill](../skills/session-handoff/SKILL.md). *Your agent, but it remembers Monday.*
