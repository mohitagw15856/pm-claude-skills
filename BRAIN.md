# 🧠 Professional Brain — memory + actions for the skills

> **Status: Phase 0 (proof).** The state layer is in; the action layer is designed, not built.

The skills library is great at producing a document. What it can't do yet is **remember** —
every run starts cold, and the *why* behind past decisions evaporates. The Professional Brain
adds the missing layer: a durable, local markdown memory that skills read before they answer and
write to after.

Pair that memory with an **action layer** (skills that file the tickets / open the PRs they
recommend) and the library stops being a document generator and becomes a teammate:

```
recall (brain) → run a skill (method) → produce the artifact → propose actions
   → approve → execute → record the decision + provenance back (brain) → weekly review
```

## What's shipped (Phase 0)

- **[`professional-brain`](skills/professional-brain/SKILL.md)** — the skill defining the brain
  schema, the provenance-tag convention, and four operations: `init`, `ingest`, `recall`, `review`.
- **[`scripts/brain_query.py`](skills/professional-brain/scripts/brain_query.py)** — stdlib-only,
  grep-based recall that returns matches ranked by provenance strength (no vector DB).
- **[`templates/brain/`](templates/brain/)** — a copyable, filled-in scaffold (Obsidian-vault
  compatible) so the loop is tangible from minute one.
- **[`/brain`](commands/brain.md)** slash command.
- Two skills made **brain-aware** as the reference pattern: [`prd-template`](skills/prd-template/SKILL.md)
  (reads strategy/context, writes the feature entity) and [`meeting-notes`](skills/meeting-notes/SKILL.md)
  (reads stakeholders, writes decisions).

### The brain schema

```
brain/
  context.md      knowledge/   decisions/   hypotheses/   stakeholders/   entities/   source/
```

Every fact is provenance-tagged — `[data] [interview] [external] [verbal] [hunch]` (strongest →
weakest) — so skills can downgrade confidence on weak evidence instead of treating a hunch as settled.

## The roadmap

| Phase | Scope | Status |
|---|---|---|
| **0 — Proof** | brain schema + provenance + recall helper + 2 brain-aware skills | ✅ this PR |
| **1 — Write-back** | an `actions` block on skills + a dry-run executor (GitHub/Linear) behind an approval gate | planned |
| **2 — Close the loop** | executed actions auto-record to the brain; `/brain review` sweep; an MCP "brain server" so n8n / Lovable / the playground share one brain | planned |
| **3 — Generalise** | profession brains (CS, founder, legal); more action targets (Notion, Slack, calendar); a scenario eval suite | planned |

## Design principles

- **Local-first, plain markdown.** Grep-able, human-editable, auditable. No embeddings hiding the reasoning.
- **Provenance over confidence theatre.** A claim's strength is explicit and travels with it.
- **Append, don't overwrite.** Decisions accrete history; the audit trail in `source/` is never edited.
- **Actions are the scariest surface.** When Phase 1 lands, write-back is dry-run by default,
  scope-limited, approval-gated, and logged. Nothing acts silently.
