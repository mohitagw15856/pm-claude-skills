# Missions: long runs built from typed pipelines

A [pipeline](PIPELINES.md) chains three or four skills by their typed contracts. A **mission** chains pipelines: seven to ten steps in one run, for work that takes a planning cycle and not an afternoon. It exists because the current frontier model can hold a task that long, and because a long run needs three things a short one does not: proof that every link fits before the first call, places for a person to look, and a way to carry on after a stop.

```bash
npx pm-claude-skills mission list
npx pm-claude-skills mission plan retention-quarter          # stages, steps, checkpoints, cost ceiling; no API
npx pm-claude-skills mission run retention-quarter --input in.json --dry-run
npx pm-claude-skills mission run retention-quarter --input in.json
npx pm-claude-skills mission run retention-quarter --resume  # after a checkpoint or a failure
```

`run` needs `ANTHROPIC_API_KEY` and makes one call per step with your key. `list`, `validate`, `plan` and `--dry-run` call nothing.

## What ships

| Mission | Pipelines | Steps |
|---|---|---|
| `retention-quarter` | churn-to-roadmap, then competitor-to-sprint | 7 |
| `bad-quarter-reset` | incident-to-sprint, then churn-to-roadmap, then competitor-to-sprint | 10 |

In both, the feature that the last stage builds is the item the roadmap stage ranked first. That one binding, `$.diagnose.roadmap.ranked[0].name`, is what makes them missions and not three separate runs.

## How a mission is checked

A mission adds no new type rules. It is flattened into one long pipeline (stage `diagnose`, step `roadmap` becomes the step `diagnose-roadmap`) and handed to the same validator that checks every pipeline. So a mission that validates is a chain in which every required input is bound, every reference points at a field the earlier contract declares, and the types agree. `node scripts/check-missions.mjs` runs this in `npm run check`.

## Checkpoints and resume

- A stage may carry a `checkpoint`: a sentence saying what a person should read before the next stage. The run stops there with exit code 0 and prints the command to carry on. `--no-checkpoints` runs straight through.
- After every step the run writes `mission-state.json` in the output folder, next to one JSON file per step. `--resume` reads it and skips what is done, so a failure at step nine does not repeat the first eight calls.
- You may edit a saved output before resuming. That is the point of a checkpoint: if the roadmap ranked the wrong bet first, change the rank in `mission-state.json` and the build stage follows your edit.
- A fresh run refuses to overwrite an existing state file. Pass `--resume` or another `--out-dir`.

## Model and effort

A mission names a role from [data/models.json](../data/models.json), not a model. Both shipped missions use the `frontier` role at high effort; `--model` and `--effort` override that for one run. `mission plan` prints an upper bound on output cost: steps, times the output limit per call, times the model's output price. A real run usually costs a fraction of it, because few steps fill the limit. See [MODELS.md](MODELS.md).

## Write your own

A mission is one file, `missions/<id>.json`, described by [schemas/mission.schema.json](../schemas/mission.schema.json):

```json
{
  "id": "my-mission",
  "name": "One line",
  "summary": "What it does and where it stops.",
  "model_role": "frontier",
  "effort": "high",
  "inputs": { "type": "object", "properties": { "period": { "type": "string" } }, "required": ["period"] },
  "stages": [
    { "id": "diagnose", "pipeline": "churn-to-roadmap", "inputs": { "period": "$.input.period" }, "checkpoint": "Read the roadmap first." },
    { "id": "build", "pipeline": "competitor-to-sprint", "inputs": { "feature_name": "$.diagnose.roadmap.ranked[0].name" } }
  ]
}
```

A stage binds the inputs of its pipeline to:

| Binding | Meaning |
|---|---|
| `"$.input.period"` | a mission input |
| `"$.diagnose.roadmap.ranked[0].name"` | stage, then step, then a field of that step's output |
| `{ "from": "$.diagnose.okrs.objectives[]", "pick": "objective" }` | a list of one field, as in pipelines |
| `42`, `"text"`, `true` | a literal |

An optional pipeline input may be left unbound. A required one may not; the validator says which.

## Limits

- A stage runs a pipeline, and a pipeline only chains skills that ship a contract in `schemas/skills/`. Ten skills have one today, so missions are built from those ten.
- The run checks each output against its contract at the top level (required fields and their types). It does not judge quality; the checkpoints are where a person does that.
- The shipped missions have been run end to end against a local stand-in server (`tests/mission-test.mjs`), which proves the plumbing, the checkpoints and the resume. They have not been run against the live API in this repository, because that spends credit.
