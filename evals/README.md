# Skill Evals

An LLM-as-judge harness that scores skill output quality across models — so claims like
"production-ready" are backed by numbers, not vibes. Results render as a public
[Skill Leaderboard](https://mohitagw15856.github.io/pm-claude-skills/leaderboard.html).

## What it measures

For each [case](cases.json), a model runs the skill, then a **judge model** scores the
output 1–5 on four dimensions:

- **structure** — follows a clear, expected structure
- **completeness** — covers what the task needs
- **usefulness** — specific and actually useful, not generic
- **grounding** — stays grounded in the input, no invented facts

## Run it

Needs an Anthropic API key (this calls the API and costs tokens):

```bash
ANTHROPIC_API_KEY=sk-ant-... node evals/run-evals.mjs
node scripts/build-leaderboard.mjs       # render web/leaderboard.html
```

## 💸 Keeping it cheap

Evals call the API, so the defaults are deliberately frugal and **nothing runs on a schedule** — every eval/improve workflow is manual (`workflow_dispatch`).

- **Cheap defaults:** one run model (Sonnet) + a **Sonnet judge** (Opus judging was ~5× the cost for a 1–5 rubric it doesn't need). A full run is roughly **$0.30**.
- **Estimate before you spend:** `node evals/run-evals.mjs --dry-run` prints the plan and a rough cost, making **no** API calls.
- **Skip unchanged:** each result stores a content hash; re-running only re-scores skills whose `SKILL.md` (or case) changed. `--force` overrides.
- **Only changed skills:** `--changed` scores just the skills that differ from `--base` (default `origin/main`) — ideal for CI / per-PR evals (often $0.00).
- **Hard cap:** `--max-skills N`.
- **Official, stricter pass** when you want it: `--models claude-sonnet-4-6,claude-haiku-4-5-20251001 --judge claude-opus-4-8`.

> **Set a hard ceiling at the source:** in the [Anthropic Console](https://console.anthropic.com/settings/limits) → **Limits**, set a monthly spend cap. That guarantees evals (or the ChatOps bot, or sample generation) can never run your balance dry again.

`run-evals.mjs` writes `evals/results.json`; the leaderboard builder prefers it and falls
back to `results.example.json` (clearly labelled) so the page renders before you run real evals.

### No local key? Run it in CI

1. Add an `ANTHROPIC_API_KEY` repo secret.
2. Enable **Settings → Actions → General → Workflow permissions → "Allow GitHub Actions to
   create and approve pull requests"** (so the workflow can open its results PR — `main`
   requires PRs).
3. **Actions → "Update Skill Leaderboard" → Run workflow.** It runs the evals and opens a
   PR with `evals/results.json`. **Merge that PR** and the Pages deploy re-renders the
   public leaderboard with real numbers — no laptop required.

## Add a case

Append to [`cases.json`](cases.json): `{ "skill": "<name>", "input": "<a realistic prompt>" }`.
Keep inputs short but representative of how the skill is actually used.

## Honesty notes

- Scores are an LLM judge's opinion, not ground truth — treat them as a comparative signal.
- The judge sees the skill's stated purpose and the output, not the model name (reduces bias).
- Re-run after model upgrades; numbers drift.
