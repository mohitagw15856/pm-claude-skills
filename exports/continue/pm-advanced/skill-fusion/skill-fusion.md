---
name: "Fuse two skills from this library into one hybrid brief for "
description: "Fuse two skills from this library into one hybrid brief for a task that sits between them — the meta-skill. Use when a task straddles two skills (a PRD that's also a pitch; a postmortem that must double as a board update) and running them separately would produce two documents where one is needed. Produces the fused operating brief: combined structure, merged quality bar, precedence rules for where the parents disagree, and the fused output itself if input was provided."
---

# Skill Fusion

Real tasks ignore taxonomy: the investor update that's half postmortem, the launch plan that's half legal review. Running two skills sequentially produces a stapled document. Fusion produces a *hybrid* — one structure that inherits deliberately from both parents, with explicit rules for their disagreements.

## Required Inputs

- **The two parent skills** — by name if known; otherwise describe the task and identify the two best parents first (say which and why).
- **The task itself** — what's being produced, for whom. The audience decides which parent leads.
- The actual input material, if the fused skill should run immediately after being forged.

## The Fusion Method

1. **Declare the dominant parent** — the audience's primary job determines it (a board reads the postmortem-update as an *update* first). The dominant parent contributes the skeleton; the recessive parent contributes organs.
2. **Merge structures section by section** — for each parent section: keep / merge / drop, with one-line reasons. A fused doc is SHORTER than the parents combined or the fusion failed.
3. **Resolve conflicts explicitly** — where parents disagree (a PRD wants exhaustive edge cases; a pitch wants momentum), write the precedence rule ("edge cases compress to the risk table; the narrative keeps pitch pacing").
4. **Merge the quality bars** — union of both parents' Quality Checks, minus those the fusion made irrelevant, plus 1-2 new checks that only the hybrid needs ("the metrics section satisfies both the update reader who skims and the postmortem reader who audits").
5. **Inherit both anti-pattern sets** — hybrids fail in both parents' ways, plus one new way: the staple (sections that alternate voices). Check for the staple explicitly.

## Output Format

1. **The fusion header** — parents, dominant parent + why, the task it's forged for.
2. **The hybrid structure** — the fused outline with per-section parentage marked (📘 parent A / 📗 parent B / ⚗️ new).
3. **The merged quality bar and anti-patterns** — deduplicated, with the new hybrid-only entries flagged ⚗️.
4. **Precedence rules** — every parent conflict and its resolution, as one-liners.
5. **The fused output** — if input material was provided, run the hybrid on it immediately.

## Quality Checks

- [ ] The dominant parent was chosen by audience analysis, stated in one sentence — not by which skill came first
- [ ] Every parent section is dispositioned (keep/merge/drop) with a reason — no silent omissions
- [ ] The fused structure is shorter than the sum of parents — fusion compresses or it's stapling
- [ ] At least one ⚗️ hybrid-only quality check exists — if none, the task probably needed one parent, and the output should say so
- [ ] The staple test ran: no section sequence alternates parent voices without a merge

## Anti-Patterns

- [ ] Do not fuse more than two skills — three-parent hybrids are committees; run fusion twice if truly needed
- [ ] Do not fuse when one parent covers 90% — the honest output is "use X, borrow one section from Y", and it should say exactly that
- [ ] Do not average conflicting rules — precedence means one wins per conflict, visibly
- [ ] Do not inherit boilerplate from both parents (two intros, two summaries) — the classic staple smell
- [ ] Do not let the fusion drop both parents' verification sections in the compression — the quality bar merges; it never thins
