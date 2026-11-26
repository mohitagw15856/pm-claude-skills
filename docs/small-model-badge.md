# Small-model badge

Does a skill still work on a model small enough to run on a laptop? The small-model badge answers that with a number from a real run, for free, on your own machine. Nothing is sent to a paid API.

![small model badge example](https://img.shields.io/badge/small%20model-4.1%2F5%20qwen3%3A8b-brightgreen)

*(The image above is an example of the format, not a recorded score.)*

## How it works

1. `scripts/local-eval.mjs` runs a skill's eval cases from `evals/cases.json` on a small open model through any OpenAI-compatible local server (Ollama, LM Studio, llamafile, vLLM).
2. A **different, larger local model** judges each output on the same rubric as the main leaderboard: structure, completeness, usefulness and grounding, scored 1 to 5. The judge sees the task as well as the output (judge version 2).
3. `--record` writes the mean per skill to `data/small-model.json`, together with the model, the judge and the date.
4. On every deploy, `scripts/build-small-model-badges.mjs` turns those rows into one shields.io endpoint file per skill under `badge/small-model/`.

A skill with no recorded run has no badge. Runs where a model graded itself are recorded but **never badged**: small models are lenient judges of their own work, so self-grading is a smoke test, not evidence.

## Run it with Ollama (free)

```bash
ollama pull qwen3:8b       # the model being tested (about 5 GB)
ollama pull qwen3:32b      # the judge (about 20 GB; any larger model you trust works)

node scripts/local-eval.mjs --model qwen3:8b --judge local:qwen3:32b \
  --skills okr-builder,meeting-notes,stakeholder-update --record
```

- Leave out `--skills` for the six-skill smoke set, or use `--all` for every eval case (slow on a laptop).
- Point at another server with `--endpoint http://localhost:1234/v1` or `LOCAL_BASE_URL`.
- Judging with a hosted model is possible (`--judge anthropic:<model>`), but it spends API credit, so it refuses unless `ALLOW_API_SPEND=true` is set.

Then commit `data/small-model.json` in a pull request. `node scripts/build-small-model-badges.mjs --check` validates the file, and CI runs the same check.

## Put the badge on a skill

```markdown
![small model](https://img.shields.io/endpoint?url=https://mohitagw15856.github.io/pm-claude-skills/badge/small-model/okr-builder.json)
```

The badge shows the best independently judged score for that skill and the model that earned it. Colours: 4.0 and above is bright green, 3.5 green, 3.0 yellow, and below that orange. `badge/small-model/index.json` lists every badged skill with its judge, cases and date.

## Reading the number honestly

- One model, one judge, a handful of cases. Treat a score as "this skill is usable on a model this size", not as a ranking.
- A local judge is weaker than a frontier judge. The leaderboard's cloud-judged scores and these are comparable in rubric, not in strictness.
- Scores go stale when a skill changes. Rerun with `--record`; the newer run replaces the older row for the same skill and model.

See also [Local models](LOCAL-MODELS.md) for the wider "verified local" tier.
