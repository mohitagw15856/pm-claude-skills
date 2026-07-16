# Reports — the Institute's published record

The flagship, citable outputs of the project: the annual *State of Professional
AI* synthesis, the weekly ecosystem census it draws on, and the scheduled
operator digests. Everything here is **reproducible** — each report names the
instrument that produced it and the raw data it stands on. Cite freely.

## The reports

| Report | Cadence | Instrument | Source data |
| --- | --- | --- | --- |
| [State of Professional AI](state-of-professional-ai-2026.md) | Annual (+ mid-year) | [`scripts/build-annual-report.mjs`](../../scripts/build-annual-report.mjs) | census + SkillBench + the Season + repo vitals |
| [State of Agent Skills (census)](state-of-agent-skills-2026-07-06.md) | Weekly | [`scripts/skill-census.mjs`](../../scripts/skill-census.mjs) | GitHub `SKILL.md` code search |
| Scheduled operator digests | Configurable | [`scripts/scheduled-report.mjs`](../../scripts/scheduled-report.mjs) | your inputs, via a chosen skill → [`scheduled/`](scheduled/) |
| [SkillBench (working paper)](../paper/skillbench.md) | Per benchmark release | [`skillbench/run-skillbench.mjs`](../../skillbench/run-skillbench.mjs) | frozen task set + pinned judge |

## Methodology & honesty rules

The reports share one discipline: **publish the number as measured, not the one
we hoped for.** That's why the current *State of Professional AI* reports a
*negative* skill lift on its first SkillBench run rather than burying it — the
instruments exist to be believed, which means they must be allowed to disappoint.

Every figure traces to a committed artifact:

- **Census numbers** come from GitHub code-search estimates via
  `skill-census.mjs`; conformance percentages come from running the SkillSpec
  validator over a graded sample. Both are re-runnable and dated.
- **SkillBench numbers** come from committed `skillbench/results.json` runs,
  each stamped with harness version, judge identity, and task-set version. See
  the [working paper](../paper/skillbench.md) for the protocol and its limits.
- **Season / competition numbers** come from the attested leaderboard; zero
  entries is reported as zero.
- **Repo vitals** come from the automated vitals ledger.

## How a new annual edition is produced

```bash
node scripts/build-annual-report.mjs --edition "2026 Mid-Year"
# → docs/reports/state-of-professional-ai-<year>.md
```

The generator composes the latest census, the newest SkillBench runs, the Season
standing, and repo vitals into one document. It invents nothing: where a data
source is empty, the report says so. Refresh the census first
(`scripts/skill-census.mjs`) and, if it's a benchmark release, run SkillBench so
the model numbers are current before compiling the edition.

## Indexing note

This directory is the canonical home for finished reports. The
[`scheduled/`](scheduled/) subdirectory holds machine-generated operator digests
(from `config/scheduled-reports.json`) and is written to by automation — treat
those as drafts to review, not as published Institute record.
