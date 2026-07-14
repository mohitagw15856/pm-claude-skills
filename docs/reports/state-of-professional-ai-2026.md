# The State of Professional AI — 2026 Edition

*Published 2026-07-14 by [the Open Institute for Professional Judgment](INSTITUTE.md). Every number below is reproducible: the instruments, raw data, and methods are open. Cite freely.*

## 1. The skill ecosystem (the census)

GitHub's public `SKILL.md` surface stands at roughly **4,087,808 files** — but conformance is a pyramid: in the graded sample, **96% of public skills stop at "loadable"** (frontmatter only), with structured inputs/outputs and self-verification remaining rare. The gap between a prompt-with-a-filename and a dependable instrument is the ecosystem's defining quality problem — and it is checkable (`npx skillspec-check`).
*Full census: [state-of-agent-skills-2026-07-06.md](state-of-agent-skills-2026-07-06.md) — refreshed weekly by automation with a quality gate.*

## 2. Models on professional work (SkillBench)

- **claude-haiku-4-5-20251001** — 4.5/5 skill-guided vs 4.77/5 bare (lift: -0.27) · 2026-07-07
- **claude-sonnet-4-6** — 4.6/5 skill-guided vs 4.95/5 bare (lift: -0.35) · 2026-07-07

The honest early finding: **in run 1, skill-guided outputs scored slightly BELOW bare outputs for both models** (n=12 tasks, single vendor, one judge). Two live hypotheses, both testable: the judge may reward fluent freeform over disciplined structure, or the structure tax is real on short tasks and pays off only on complex ones. We publish the number as measured rather than the one we hoped for — cross-vendor runs and a structure-aware judging rubric are the next experiments. Frozen tasks, blind judging, transcripts published: [skillbench/](../../skillbench/).

## 3. The competition (the Season)

Season 1 — *The Meridian Renewal* — opened 2026-07-11: identical hidden state for every player on Earth, attested scores, a PR-reviewed leaderboard. Entries to date: **0**. The board is open.

## 4. The library (this project as a specimen)

**496 skills · 50 production / 434 stable / 12 experimental — 100% at SkillSpec L3 (CI-enforced).** 1181 GitHub stars. The free-runs ledger (sponsor-funded, counts only): **36 runs served** across 8 recorded days (+16 in the period).

## 5. The year's theses

1. **Verification became the differentiator.** Skills that state their own quality bar can be audited, benchmarked, and trusted; the census shows almost nobody does it yet. Expect L3-style self-verification to become table stakes.
2. **Judgment is measurable.** Attested arena scores, calibration curves, and blind-judged benchmarks put numbers on things résumés only claim. Credentials that can be *checked* will crowd out credentials that must be *believed*.
3. **The agent is the new junior colleague — and it needs an employee handbook.** The fastest-growing artifacts in this ecosystem aren't prompts; they're standards of work. That is what a skills library is.

---
*Methods: census via GitHub code search (approximations, honestly labeled); bench via frozen task sets with published judges; vitals from the public ledger branch. Regenerate: `node scripts/build-annual-report.mjs`.*
