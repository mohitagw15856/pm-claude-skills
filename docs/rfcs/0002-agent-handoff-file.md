# RFC 0002 — HANDOFF.md: a dead-simple agent session-handoff convention

**Status:** Draft · **Author:** pm-claude-skills · **Supersedes:** — · **Requires:** nothing (files + a convention)

> Your agent, but it remembers Monday.

## The problem

Every coding agent loses its mind at the session boundary. You `/clear`, the context compacts, you come back tomorrow — and the agent re-derives everything from scratch: what you decided, what's half-done, which file is a landmine. The existing fixes are heavy: knowledge-graph indexers, memory MCP servers (which then charge [rent](../../bin/mcp-audit.mjs) on every turn), vendor-specific memory features. All of them are infrastructure.

The thing that actually survives tool churn is a **file and a convention.** Git proved this. `.editorconfig` proved this. A handoff note the agent writes on the way out and reads on the way in needs no server, no index, no vendor — it works in Claude Code, Codex, Cursor, and whatever ships next, because it's just markdown in your repo.

## The convention

A file named **`HANDOFF.md`** at the repo root (or `.agent/HANDOFF.md` to keep the root clean). It holds *state and reasons*, not history — the [session-handoff skill](../../skills/session-handoff/SKILL.md) is the authoring discipline; this RFC is the file's contract.

```markdown
# HANDOFF
<!-- agent-handoff v1 · updated: 2026-07-20T14:30:00Z · by: claude-code -->

## Decisions (with reasons)
- Chose Postgres over SQLite because the reporting queries need window functions. Rejected: SQLite (no partial indexes we need).

## Live state
- Auth refactor: `src/auth/*` migrated to the new middleware; `legacy-auth.ts` still imported by 2 call sites (grep `legacyVerify`).
- Verified: login + refresh flows pass. Assumed (not tested): SSO path.

## In flight
- Rate limiter: 3 of 5 endpoints done. Next physical action: add the middleware to `routes/upload.ts` and `routes/export.ts`.

## Landmines
- `npm test` flakes on `payments.spec` ~1/5 runs — it's the test, not the code. Re-run before trusting a red.
- `config/prod.ts` looks editable but is generated from `config/prod.template.ts`.

## Next action
- Wire the rate limiter into the two remaining routes, then run the full suite.
```

### The contract

1. **The HTML comment line is the machine-readable header** — `<!-- agent-handoff v1 · updated: <ISO8601> · by: <agent> -->`. Tools detect a handoff file by this marker; humans ignore it. The `updated` timestamp lets a reader trust or distrust staleness.
2. **Five sections, fixed order, fixed headings** — Decisions, Live state, In flight, Landmines, Next action. Fixed so a reader (human or model) knows exactly where to look; a section may be empty but its heading stays.
3. **Decisions carry their reasons and rejected alternatives** — the anti-relitigation payload. `Chose X over Y because Z` is one line that saves a thousand tokens of re-deciding.
4. **State is positions and values, never a transcript** — file paths, current values, verified-vs-assumed. History is the transcript's job, and the transcript is being retired.
5. **In-flight items have physical next actions** — "wire the limiter into `routes/upload.ts`" resumes; "working on the rate limiter" resumes as archaeology.
6. **It's ~5% of a transcript, and it's overwritten, not appended** — the handoff is the *current* state, not a log. Old handoffs die; git history keeps them if you care.

## The mechanism (optional, adoptable per tool)

Two hooks make it automatic in Claude Code (and the pattern ports to any agent with lifecycle hooks):

- **SessionEnd / pre-compact** → the agent writes/overwrites `HANDOFF.md` using the session-handoff skill's discipline.
- **SessionStart** → if `HANDOFF.md` exists and its `updated` is recent, load it into context first, so the session opens already oriented.

Reference hooks ship in [`hooks/`](../../hooks/) (`handoff-write.sh`, `handoff-read.sh`). But the convention stands alone: even hand-written, a `HANDOFF.md` a human updates and the agent reads on request delivers most of the value. The floor is *a file the team agrees to keep*; the ceiling is fully automatic.

## Why this and not a memory MCP

| | HANDOFF.md | Memory MCP / knowledge graph |
|---|---|---|
| Setup | a file | a server + config |
| Per-turn token cost | zero (loaded once at start) | [rent](../../bin/mcp-audit.mjs) — schemas + retrieved context every turn |
| Portable across tools | yes (it's markdown) | no (vendor/protocol-specific) |
| Forkable / inspectable | it's in your repo | in a database |
| Survives the tool dying | yes | no |

A memory server is the right tool when you need *semantic retrieval across thousands of past sessions*. For "remember what I was doing yesterday in this repo," a file is strictly better — cheaper, portable, and legible.

## Adoption

- **Individuals:** drop a `HANDOFF.md`, ask your agent to keep it updated. Done.
- **Teams:** add `HANDOFF.md` to the repo, put "update the handoff before you stop" in [working-agreements](../../skills/working-agreements/SKILL.md), and it becomes the async baton-pass between whoever (human or agent) picks up next.
- **Tool authors:** detect the `agent-handoff v1` marker, read on start, offer to write on end. The marker is the whole integration surface.

## Open questions

- `.gitignore` HANDOFF.md or commit it? (Commit for team baton-passing; ignore for personal scratch. The convention is agnostic; teams decide.)
- Versioning beyond `v1`: additive sections should not bump the version; a breaking header change would. Kept deliberately minimal until real usage demands more.

## Prior art & relation to this repo

Builds directly on the [session-handoff skill](../../skills/session-handoff/SKILL.md) (the *how to write one well*) and complements [RFC 0001 — Agent Skill Interchange](0001-skill-interchange.md). The pitch, in one sentence, is the whole spec: **a file your agent writes on the way out and reads on the way in.**
