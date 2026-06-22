# 🧠 Professional Brain — memory + actions for the skills

> **Status: Phase 2 (actions).** The full loop is in: skills read the brain, write
> provenance-tagged records back (Phase 1), and now **execute** their recommendations —
> opening tickets, posting updates — via the [`action-runner`](skills/action-runner/SKILL.md)
> skill: dry-run preview, per-action risk gate, approval-gated, then recorded back to the brain.
> A shared MCP "brain server" (one brain across n8n / Lovable / the playground) is the next step.

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

## What's shipped (Phases 0–1)

- **[`professional-brain`](skills/professional-brain/SKILL.md)** — the skill defining the brain
  schema, the provenance-tag convention, and five operations: `init`, `ingest`, `recall`,
  **`record`**, `review`.
- **[`scripts/brain_query.py`](skills/professional-brain/scripts/brain_query.py)** — stdlib-only,
  grep-based recall that returns matches ranked by provenance strength (no vector DB).
- **[`scripts/brain_write.py`](skills/professional-brain/scripts/brain_write.py)** — the write-back
  half: append-only, dry-run-by-default, approval-gated record-writing (Phase 1).
- **[`action-runner`](skills/action-runner/SKILL.md)** + **[`action_preview.py`](skills/action-runner/scripts/action_preview.py)** —
  the action layer (Phase 2): turn a skill's recommendations into executed actions (tickets,
  messages) with a dry-run preview, per-action risk gate, approval, and auto-record back to the brain.
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
| **0 — Proof** | brain schema + provenance + recall helper + 2 brain-aware skills | ✅ shipped |
| **1 — Write-back** | `record` operation + `brain_write.py` (append-only, dry-run, approval-gated) + the "📥 Propose to the Brain" block, rolled across high-value skills | ✅ shipped |
| **2 — External actions** | the [`action-runner`](skills/action-runner/SKILL.md) skill: a dry-run executor for *external* actions (open tickets, post updates) with `action_preview.py` risk-gating, approval per high-risk action, then auto-record back to the brain. Wired into product-launch-checklist, sprint-planning, incident-postmortem. | ✅ shipped |
| **3 — Shared brain & generalise** | an MCP "brain server" so n8n / Lovable / the playground share one brain; profession brains (CS, founder, legal); more action targets (Notion, Slack, calendar); a `/brain review` sweep and scenario eval suite | planned |

## Design principles

- **Local-first, plain markdown.** Grep-able, human-editable, auditable. No embeddings hiding the reasoning.
- **Provenance over confidence theatre.** A claim's strength is explicit and travels with it.
- **Append, don't overwrite.** Decisions accrete history; the audit trail in `source/` is never edited.
- **Actions are the scariest surface.** Write-back is dry-run by default, scope-limited,
  approval-gated, and append-only — nothing is written without a yes. External actions (Phase 2)
  will hold to the same bar.
