# 🖥 Local models — the "verified local" tier

The Org Edition's promise is *zero data leaving your network*. That promise is only
complete if the skills demonstrably work on models you can run yourself — so this tier
exists to answer, with numbers: **which skills hold up on an 8–14B local model, and
which quietly need a frontier model?**

## Run the harness

Works against any OpenAI-compatible local server (Ollama, LM Studio, llamafile):

```bash
ollama pull llama3.1:8b
node scripts/local-eval.mjs --model llama3.1:8b                 # 6-case smoke set
node scripts/local-eval.mjs --model qwen2.5:14b --all           # every eval case (slow)
node scripts/local-eval.mjs --model mistral --endpoint http://localhost:1234/v1
```

Same cases and same 1–5 rubric as the [skill leaderboard](../evals/README.md)
(structure, completeness, usefulness, grounding), so local numbers are directly
comparable with the cloud ones. Results land in `evals/local/results-<model>.json`.

## Judging — the honest part

By default the local model **judges its own output** (`--judge local`), so nothing
leaves the machine. That is a smoke signal, not verification: small models are lenient
judges of their own work. A run only counts toward the *verified-local* badge when
judged by the pinned cloud judge:

```bash
ALLOW_API_SPEND=true ANTHROPIC_API_KEY=… node scripts/local-eval.mjs --model llama3.1:8b --all \
  --judge anthropic:claude-sonnet-4-6
```

(Only the generated artifacts go to the judge — your inputs stay in the eval fixtures.)

A paid judge spends API credit, so it refuses to run unless `ALLOW_API_SPEND=true` is set. The free alternative is a larger local model as the judge (`--judge local:qwen3:32b`), which is what the [small-model badge](small-model-badge.md) uses.

## The badge (proposal)

A skill earns **verified-local** for a given model when its mean overall score across
its eval cases is **≥ 4.0** under a cloud judge — the same bar the leaderboard treats
as solid. The catalog would carry it as:

```yaml
localVerified: ["llama3.1:8b", "qwen2.5:14b"]
```

`skill-tiers.json` and the catalog builder are not changed by this harness — adding the
field there is a follow-up once the first full verified runs exist.

## Results

No verified runs are recorded yet — rows are added from real `evals/local/` result
files, never estimated:

| Model | Cases | Mean | Judge | Date |
|---|---|---|---|---|

## What to expect (caveats, not results)

- Long-document skills (full PRDs, board decks) are where small models most often
  miss the ≥ 4.0 bar — structure survives, specificity doesn't. Judgment-dense short
  artifacts (RICE tables, user stories, standup notes) tend to survive quantisation
  much better.
- *Verified* means "clears the rubric bar on this model" — not "equal to a frontier
  model". Run the same skill on both and read the artifacts before standardising a
  local-only workflow.
- Context limits bite before quality does on some setups: a 4K-context server
  truncates the bigger SKILL.md bodies. Prefer 8K+ context settings.
