# SkillBench: A Benchmark for Professional Work

**A reproducible benchmark measuring whether language models produce professional
artifacts a senior practitioner would accept — PRDs, postmortems, board updates,
OKRs — rather than code or trivia.**

*Working paper · pm-claude-skills · draft, revised each benchmark release*

---

## Abstract

Coding benchmarks (HumanEval, SWE-bench) and knowledge benchmarks (MMLU, GPQA)
have driven a decade of model progress, but neither measures the work most
knowledge workers actually do: writing a product requirements document a team can
execute, a blameless postmortem that finds the real root cause, or a board update
that survives the room. We introduce **SkillBench**, a benchmark of realistic
professional tasks scored against published rubrics by a pinned LLM judge. Each
model runs every task twice — **bare** (task only) and **skilled** (task plus a
structured instruction artifact) — yielding two measures: a **SkillBench score**
(quality when properly instructed) and **skill lift** (the marginal value of
structured professional judgment). We describe the task set, rubric, judging
protocol, and reproducibility guarantees, and report initial results. We argue
skill lift is itself a finding: as base models absorb professional structure,
lift compresses, and the benchmark's fixed-instruction control makes that
trend measurable rather than anecdotal.

## 1. Motivation

"Can the model do professional work?" is usually answered by vibes. Yet the
artifacts of professional work are highly structured — a senior reader can tell
in seconds whether a PRD has load-bearing sections, whether a postmortem assigns
mechanism rather than blame, whether an OKR is a set of outcomes or a disguised
task list. That structure is *gradeable*. SkillBench operationalises it.

We separate two questions that are usually conflated:

1. **How good is a model at professional work when properly instructed?**
   (the SkillBench score)
2. **How much does explicit professional structure improve the model?**
   (skill lift = skilled − bare)

Both matter. (1) tells a buyer which model to deploy behind a well-designed
workflow. (2) tells a builder whether investing in instruction scaffolding pays
off for a given model — and, tracked over time, whether frontier models are
internalising professional judgment.

## 2. Task set (v1)

Twelve tasks span six domains of professional work, frozen in `skillbench/tasks.json`:

| Domain | Tasks |
| --- | --- |
| Product | PRD from a fuzzy feature brief · RICE ranking with weak estimates |
| Communication | Board update from messy notes · incident comms under pressure |
| Engineering ops | Blameless postmortem from a timeline · migration plan with rollback |
| Analysis | Churn investigation from raw numbers · A/B readout with a marginal result |
| Strategy | Competitive teardown · pricing-change rationale |
| People | OKRs that aren't a task list · tough performance feedback |

Each task is a realistic, deliberately *messy* brief drawn from a curated corpus
of 113 evaluation cases. Tasks are frozen: v1 is never edited in place; changes
ship as a v2 set with its own results, so scores remain comparable across model
runs at a fixed task-set version.

## 3. Protocol

**Two conditions per task.** Every model runs each task **bare** (the brief
alone) and **skilled** (the brief plus the corresponding instruction artifact —
the same `SKILL.md` the public library ships). The instruction artifact is held
constant across models: the only variable is the model.

**Judging.** Each output is scored 1–5 on a fixed four-part rubric:

- **Structure** — would a senior professional recognise the artifact's shape?
- **Completeness** — are the load-bearing sections present and specific?
- **Usefulness** — could the reader act on it without a rewrite?
- **Grounding** — does it use the brief's facts, label assumptions, and avoid
  fabrication?

The four are averaged; two judge passes are taken per output and their mean
recorded. The judge model and version are **pinned per benchmark release** and
disclosed in `results.json`. Where configured, a model does not judge its own
family's outputs; an alternative judge is substituted to limit self-preference.

**Reproducibility.** The harness version, judge identity, task-set version, and
per-task bare/skilled scores are all persisted per run. Anyone can re-run:

```bash
ANTHROPIC_API_KEY=… node skillbench/run-skillbench.mjs --models claude-sonnet-4-6
```

Official runs are produced by a manually dispatched GitHub Action so the
environment and judge are consistent.

## 4. Initial results

We report the first two model runs at task-set v1, harness 1.0, judge
`claude-sonnet-4-6`. These are a **methodology demonstration**, not a frontier
survey; a broader multi-provider run is the next milestone.

| Model | SkillBench score | Bare | Skill lift |
| --- | --- | --- | --- |
| claude-sonnet-4-6 | 4.60 | 4.95 | −0.35 |
| claude-haiku-4-5 | 4.50 | 4.77 | −0.27 |

Two observations, stated cautiously given n=2:

1. **Both models score highly bare.** On this task set, current Claude models
   already produce recognisable professional artifacts without the instruction
   artifact — the ceiling effect is real and expected for a frontier family on
   familiar formats.
2. **Lift is slightly negative here.** When a model is already near the rubric
   ceiling, adding a long instruction artifact can trade a point of concision or
   grounding for structure the model already supplied — a measurable regression,
   not noise to hide. This is exactly the signal SkillBench is designed to
   surface, and it motivates per-task analysis (§5) and instruction refinement.

We deliberately publish the negative lift. A benchmark that only flattered its
own instruction artifacts would be worthless; the fixed-instruction control
exists precisely so that "skills don't help this model on this task" is a result
the harness can *state*.

## 5. Interpreting skill lift

Lift is a per-(model, task) quantity; the headline is a mean. The interesting
structure is in the distribution: on well-specified formats a strong base model
may lose lift, while on adversarial or judgment-heavy tasks (incident comms under
pressure, OKRs that resist becoming task lists) structured instruction should
recover positive lift. Reporting lift per domain — not just in aggregate — turns
the benchmark into a map of *where* structure still pays, which is directly
actionable for whoever maintains the instruction artifacts.

## 6. Limitations

- **Judge dependence.** Scores are LLM-judged. We pin and disclose the judge and
  substitute across families, but absolute scores are judge-relative; **skill
  lift is the more robust quantity** because the judge is held constant across
  both conditions of a comparison.
- **Task-set size.** Twelve tasks is enough to demonstrate the protocol, not to
  rank the frontier. Expanding the set (while freezing versions) is ongoing work.
- **Domain coverage.** v1 centres on product, engineering, and communication
  work; whole professions (legal, clinical, finance) are represented in the
  broader library but not yet in the frozen benchmark set.
- **Instruction-artifact quality is a confound for lift, not for score.** A poor
  artifact depresses lift; the score condition still measures the model fairly.

## 7. Relationship to the skill leaderboard

SkillBench scores **models** at a fixed instruction artifact. The companion
**skill leaderboard** scores **instruction artifacts** at a fixed model — same
rubric, opposite fixed variable. Together they factor the question "why was this
output good?" into a model term and an instruction term.

## 8. Reproducing and citing

Task set, harness, and results are in `skillbench/` in the pm-claude-skills
repository. Each quarter the maintainers re-run SkillBench on current frontier
models and publish a short *State of Professional AI* report
(`skillbench/reports/`, `docs/reports/`) from the results.

```
@misc{skillbench,
  title  = {SkillBench: A Benchmark for Professional Work},
  author = {Aggarwal, Mohit},
  year   = {2026},
  note   = {pm-claude-skills},
  url    = {https://github.com/mohitagw15856/pm-claude-skills/tree/main/skillbench}
}
```

*This is a living working paper: numbers and claims are revised with each
benchmark release. Nothing here is fabricated — all reported figures come from
committed `results.json` runs.*
