---
name: status-report-pipeline
description: "Build the pipeline that turns team updates into the rollup report without the Friday scramble — the collection format that aggregates cleanly, the altitude translation (team detail → leadership signal), and the automation-lite assembly that takes minutes. Use when asked I compile status from five teams every week, streamline our reporting chain, my Friday is spent chasing updates, or make the rollup write itself. Produces the collection design, the translation rules, the assembly routine, and the chase-elimination mechanics."
---

# Status Report Pipeline Skill

Somewhere in every org, a person spends Friday chasing five sub-team updates, translating them into one rollup, and reformatting everything because each team reports differently. The pipeline fixes the three leaks: *collection* (one shared format — [async-update-format](../async-update-format/SKILL.md) shape — due Thursday, in a place the assembler can harvest), *translation* (explicit altitude rules for what leadership needs: risks, asks, deltas — not activity), and *assembly* (a standing skeleton where harvested content drops into place in minutes). The chase disappears because the deadline-and-default replaces the reminder treadmill.

## What This Skill Produces

- **The collection design** — the input format, the due-time, the single harvest location, and the missing-update default
- **The translation rules** — what ascends (risks, asks, notable deltas), what compresses (the green wall), what never ascends (activity logs)
- **The assembly routine** — the rollup skeleton + the minutes-long Friday routine that fills it
- **The chase elimination** — the deadline norm, the visible-default mechanic, and the escalation that isn't the assembler's job

## Required Inputs

Ask for these if not provided:
- **The chain's shape** — how many inputs, from whom, to whom, at what cadence; and the current pain minutes (the before-number the pipeline gets judged against)
- **What the audience actually reads** — ask them, or read the replies: which sections get questions? The rollup optimizes for the read parts and compresses the skipped ones
- **The inputs' current state** — five formats? Prose emails? The collection format converges them, and the contributors need the *why* (less rework for everyone, including them)
- **The authority backdrop** — can the assembler set a deadline with teeth, or does the default-mechanic have to do the enforcement alone?

## Framework: The Pipeline Rules

1. **One input format, harvestable location:** contributors post the four-line update (state/delta/asks/next) in the standing doc or channel thread by Thursday EOD — same structure, same place, every week. The format convergence is 60% of the assembly savings; the harvest location is the other 40% (no inbox spelunking).
2. **The missing-update default has teeth without drama:** absent updates appear in the rollup as "Team X: no update submitted" — visible, neutral, and self-correcting within two cycles, because the accountability transfers from the assembler's chasing to the contributor's silence. The assembler chases nobody; the default does the walking.
3. **Translation is altitude, not summary:** leadership reads for *risks, asks, and deltas-that-matter* — the translation rules: every 🔴/🟡 ascends with its ask · notable deltas ascend as one-liners · the green routine compresses to "on track: teams A, C, D" (the green wall is one line, not five sections). Activity never ascends; the [plain-language-rewrite](../plain-language-rewrite/SKILL.md) fidelity rule applies to state and numbers.
4. **The skeleton is standing:** the rollup's structure never changes week to week (top: the one-paragraph read · risks & asks table · deltas · the green line · appendix links to the raw updates) — so assembly is harvest-and-place, not compose. Target: under 20 minutes, measured.
5. **The pipeline is honest about what it can't automate:** the assembler's real value-add is the *synthesis sentence* — the one-paragraph "what this week means" that no format produces automatically. The pipeline exists to buy that sentence time by deleting the mechanical 90%.

## Output Format

# Status Pipeline: [inputs] → [audience], [cadence]

## Collection
[The four-line input format · due: [time] · harvest location · the no-update default line]

## Translation Rules
[Ascends: 🔴🟡 + asks + notable deltas · compresses: the green line · never: activity · fidelity note on numbers]

## The Skeleton + Routine
[The standing rollup structure · the harvest-and-place steps · the synthesis sentence last · target minutes]

## Chase Elimination
[The default mechanic · the two-cycle self-correction expectation · escalation belongs to (role), not the assembler]

## Quality Checks

- [ ] Inputs share one format in one harvestable place with a due-time
- [ ] Missing updates surface visibly instead of triggering chases
- [ ] Translation rules are altitude-based, with the green wall compressed
- [ ] The skeleton is standing and assembly is timed under target
- [ ] The synthesis sentence survived as the human's job

## Anti-Patterns

- [ ] Do not chase — the visible default is the enforcement; chasing trains everyone that deadlines are suggestions
- [ ] Do not forward five formats upward — convergence at collection or chaos at assembly
- [ ] Do not ascend the green wall — leadership reads exceptions; routine is one line
- [ ] Do not summarize activity into the rollup — deltas and risks; the diary stays below
- [ ] Do not automate away the synthesis — the paragraph is the report; the pipeline just clears its runway
