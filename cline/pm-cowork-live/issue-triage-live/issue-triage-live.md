# Issue Triage (Live)

An untriaged backlog is a pile no one trusts. In Claude Cowork this skill reads the *real* open issues, classifies each, applies the safe labels and priorities in place, and hands back a report — turning a heap into a queue, while leaving the judgement calls to a human.

## What This Skill Produces

- **The triaged backlog** — each open issue typed (bug / feature / question / duplicate), severity-tagged, and prioritised
- **Applied changes** — labels and priority set via the connector; duplicates linked to their canonical issue
- **A triage-report artifact** — what was applied, the duplicate clusters, and the issues that need a human decision

## Required Inputs

Ask for these if not provided:
- **The repo/project** — which GitHub repo or Linear team, and the filter (all open, untriaged only)
- **The label & priority scheme** — existing labels and what P0–P3 mean here
- **Autonomy** — apply labels/priority automatically, or preview first (default: apply labels, preview closes/merges)

## Framework: The Triage Pass

1. **Type it** — bug / feature / question / duplicate / needs-info.
2. **Severity for bugs** — blocking / major / minor, from impact and reproducibility.
3. **Priority** — severity × reach × strategic pull → P0–P3.
4. **Dedupe** — cluster near-identical issues; pick the canonical, link the rest.
5. **Needs-info** — issues too thin to action get the label and a templated ask.

## Execution (Cowork)

1. **Read issues** — via the GitHub/Linear connector, list open issues in scope with bodies and existing labels.
2. **Classify** — apply type, severity, priority using the project's scheme; detect duplicates by title/body similarity, not exact match.
3. **Apply the safe changes** — set labels and priority through the connector; add a `needs-info` comment where required; link duplicates to the canonical issue. **Do not close** issues automatically.
4. **Escalate** — anything ambiguous, strategic, or close-worthy is listed for the human, not actioned.
5. **Emit the artifact** — the triage report with applied changes, duplicate clusters, and the human queue.

Guardrails: never auto-close issues (only propose); apply only labels/priority/links automatically; use the project's real label scheme, not invented labels; if the connector is unauthorised, produce the triage plan without applying and say so.

## Output Format

An **Issue Triage Report**:

### Summary
`N open · B bugs · F features · Q questions · D duplicate clusters · applied to M`

### Applied
| Issue | Type | Severity | Priority | Labels added |
|---|---|---|---|---|

### Duplicate clusters
- canonical #X ← #Y, #Z

### Needs a human
- #N — why (close-worthy / strategic / ambiguous)

## Quality Checks
- [ ] No issue was auto-closed
- [ ] Labels/priorities use the project's real scheme
- [ ] Duplicate clusters name a canonical issue and link the rest
- [ ] Priority reflects severity × reach, not gut feel
- [ ] Ambiguous/strategic issues were escalated, not force-labelled

## Anti-Patterns
- **Auto-closing** issues — propose, don't close.
- **Inventing labels** the project doesn't use.
- **Exact-match dedupe** that misses reworded duplicates.
- **Labelling a thin issue P2** instead of asking for repro/info.

## Example Trigger Phrases
- "Triage my open GitHub issues in Cowork."
- "Label and prioritise the backlog, and cluster the duplicates."
- "Sort my Linear issues — types, severity, priority."
- "Clean up the issue tracker and flag what needs me."
