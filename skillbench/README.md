# 🏛 SkillBench — the professional-work benchmark

**Which AI actually does professional work best?** There's HumanEval for code and MMLU for knowledge — nothing measures whether a model can write a PRD your team can execute, a postmortem that finds the real root cause, or a board update that survives the room. SkillBench is that benchmark: a **fixed set of realistic professional tasks**, a **published rubric**, an **LLM judge with a pinned version**, and a fully reproducible harness — built on the [pm-claude-skills](https://github.com/mohitagw15856/pm-claude-skills) eval infrastructure (113 curated cases, 200+ eval-scored skills).

> SkillBench scores **models**. The [skill leaderboard](https://mohitagw15856.github.io/pm-claude-skills/leaderboard.html) scores **skills**. Same rubric, opposite fixed variable.

## The task set (v1)

12 tasks across 6 domains of professional work, frozen in [`tasks.json`](tasks.json). Each is a realistic messy brief (drawn from the curated eval corpus), run two ways per model:

| Domain | Tasks |
|---|---|
| Product | PRD from a fuzzy feature brief · RICE ranking with weak estimates |
| Communication | Board update from messy notes · incident comms under pressure |
| Engineering ops | Blameless postmortem from a timeline · migration plan with rollback |
| Analysis | Churn investigation from raw numbers · A/B readout with a marginal result |
| Strategy | Competitive teardown · pricing-change rationale |
| People | OKRs that aren't a task list · tough performance feedback |

Every model runs each task **bare** (task only) and **skilled** (task + the corresponding SKILL.md), producing two headline numbers:

- **SkillBench score** — mean judge score (1–5) across skilled runs: *how good is this model at professional work when properly instructed?*
- **Skill lift** — skilled minus bare: *how much does structured judgment improve this model?* (Also evidence for whether skills matter per model.)

## Scoring

The judge scores each output 1–5 on the same fixed rubric the library uses — **structure** (would a senior professional recognise the artifact?), **completeness** (are the load-bearing sections present and specific?), **usefulness** (could the reader act on it without a rewrite?), **grounding** (does it use the brief's facts, label assumptions, avoid fabrication?) — averaged, two judge passes per output, mean taken. The judge model + version is pinned per benchmark release and disclosed in the results; a model never judges its own family's outputs where an alternative judge is configured.

## Task set v2 — verifiable ground truth (preview)

[`tasks-v2.json`](tasks-v2.json) is the answer to v1's ceiling problem ([REPORT.md](REPORT.md) §4–6): 13 briefs where every task carries **deterministic checks** — numbers that must reconcile (runway = cash/burn, RICE scores, churn rates), constraints that must survive into the output, names that must be covered. The harness scores them judge-free alongside the rubric (`gt: pass/total` per task), and `--judges a,b,c` runs a **cross-family judge panel** with per-judge scores and disagreement spread recorded. v2 freezes when the first official run publishes.

```bash
node skillbench/run-skillbench.mjs --models claude-sonnet-4-6,gpt-4o \
  --tasks skillbench/tasks-v2.json --judges claude-sonnet-4-6,gpt-4o --dry-run
```

## Run it

```bash
# Score one model (Anthropic, OpenAI, and Gemini supported via env keys)
ANTHROPIC_API_KEY=… node skillbench/run-skillbench.mjs --models claude-sonnet-4-6

# Compare across providers
ANTHROPIC_API_KEY=… OPENAI_API_KEY=… GEMINI_API_KEY=… \
  node skillbench/run-skillbench.mjs --models claude-fable-5,gpt-4o,gemini-2.0-flash

# Estimate cost first
node skillbench/run-skillbench.mjs --models claude-sonnet-4-6 --dry-run
```

Results append to [`results.json`](results.json) (per-model, per-task, bare + skilled + judge scores, with harness + judge versions). The **Run SkillBench** GitHub Action (manual dispatch) produces official runs.

## The Chinese task set (zh-1)

[`tasks-zh.json`](tasks-zh.json) holds ten tasks written in Chinese for Chinese workplaces and daily life: the weekly report, a PRD review, a promotion defence, a WeCom announcement, a severance estimate, a labour contract check, a shenlun question, campus recruitment, a Xiaohongshu note and a WeChat article. It is scored on the same rubric and published separately at [modelbench.html?set=zh](https://mohitagw15856.github.io/pm-claude-skills/modelbench.html?set=zh), so Chinese results never overwrite the English board.

```bash
DEEPSEEK_API_KEY=... DASHSCOPE_API_KEY=... ANTHROPIC_API_KEY=... \
  node skillbench/run-skillbench.mjs --models deepseek-chat,qwen-plus \
  --tasks skillbench/tasks-zh.json --out skillbench/results-zh.json
node scripts/build-modelbench.mjs --results skillbench/results-zh.json \
  --tasks skillbench/tasks-zh.json --out web/modelbench-zh.json
```

Model ids pick the provider by prefix: `deepseek-*` (DEEPSEEK_API_KEY), `qwen-*` (DASHSCOPE_API_KEY), `kimi-*` or `moonshot-*` (MOONSHOT_API_KEY), `glm-*` (ZHIPU_API_KEY) and `doubao-*` (ARK_API_KEY). In CI, add those keys as repository secrets and run the **Run SkillBench (Chinese task set)** workflow. Provider model names change often; use the current id from each provider's console.

## The State of Professional AI report

Each quarter the maintainers re-run SkillBench on the current frontier models and publish a short report from the results — which model leads per domain, how skill lift is trending, and what changed since last quarter. Reports live in [`reports/`](reports/); the template is [`reports/TEMPLATE.md`](reports/TEMPLATE.md).

## Submitting a model / citing

- **New model:** open an issue titled `skillbench: <model>` or a PR adding a results entry produced by the harness (include the exact command; official numbers are reproduced by CI before merging).
- **Cite it:** *SkillBench (pm-claude-skills), task set v1, judge as disclosed in results.json.* Please link this page.

## Honest limitations

LLM-judged (rubric-anchored and two-pass, but a judge model has tastes); 12 tasks is a floor, not a ceiling (v2 grows the set with held-out tasks); English-only for now; scores measure *artifact quality against the rubric*, not business outcomes — for outcome tracking see [`outcome-tracker`](../skills/outcome-tracker/SKILL.md).
