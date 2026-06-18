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
#   --models claude-opus-4-8,claude-sonnet-4-6,claude-haiku-4-5-20251001
#   --judge  claude-opus-4-8
node scripts/build-leaderboard.mjs       # render web/leaderboard.html
```

`run-evals.mjs` writes `evals/results.json`; the leaderboard builder prefers it and falls
back to `results.example.json` (clearly labelled) so the page renders before you run real evals.

### No local key? Run it in CI

Add an `ANTHROPIC_API_KEY` repo secret, then go to **Actions → "Update Skill Leaderboard"
→ Run workflow**. It runs the evals, commits `evals/results.json`, and the Pages deploy
re-renders the public leaderboard with real numbers — no laptop required.

## Add a case

Append to [`cases.json`](cases.json): `{ "skill": "<name>", "input": "<a realistic prompt>" }`.
Keep inputs short but representative of how the skill is actually used.

## Honesty notes

- Scores are an LLM judge's opinion, not ground truth — treat them as a comparative signal.
- The judge sees the skill's stated purpose and the output, not the model name (reduces bias).
- Re-run after model upgrades; numbers drift.
