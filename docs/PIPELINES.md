# Typed pipelines

A pipeline chains skills by their contracts. Where `chain` passes prose forward and hopes the next skill reads it well, a pipeline binds each skill's inputs to named fields of the pipeline's inputs or of an earlier step's outputs, and the chain is proved to fit before anything runs: every required input is bound, every reference points at a field that exists, and the types agree. Only skills with a contract in [`schemas/skills/`](../schemas/skills/) (SkillSpec [section 9.2](../SKILLSPEC.md)) can take part.

```bash
npx pm-claude-skills pipeline list                                  # what exists
npx pm-claude-skills pipeline validate competitor-to-sprint         # prove the chain fits, no API
npx pm-claude-skills pipeline run competitor-to-sprint --input in.json --out-dir ./out
npx pm-claude-skills pipeline run competitor-to-sprint --input in.json --dry-run   # resolve, call nothing
```

`run` needs `ANTHROPIC_API_KEY` and makes one call per step. Each step gets the skill's instructions plus its resolved inputs as JSON, and must answer with JSON that is checked against the skill's output contract. Outputs land as `<n>-<step>.json` per step and a `pipeline.json` record.

## The pipelines that ship

| Pipeline | Steps |
|---|---|
| `competitor-to-sprint` | competitor-teardown > prd-template > user-story-writer > sprint-planning |
| `incident-to-sprint` | incident-postmortem > risk-register > sprint-planning |
| `churn-to-roadmap` | churn-analysis > okr-builder > rice-prioritisation |

## Write one

A pipeline is `pipelines/<id>.json`, checked by [`schemas/pipeline.schema.json`](../schemas/pipeline.schema.json):

```json
{
  "id": "incident-to-sprint",
  "name": "Incident to a risk register and a remediation sprint",
  "summary": "One line on what comes out.",
  "inputs": {
    "type": "object",
    "properties": { "title": { "type": "string" }, "team_size": { "type": "integer" } },
    "required": ["title", "team_size"]
  },
  "steps": [
    { "id": "postmortem", "skill": "incident-postmortem", "inputs": { "title": "$.input.title", "severity": "P2", "narrative": "$.input.narrative" } },
    { "id": "sprint", "skill": "sprint-planning", "inputs": {
        "team_size": "$.input.team_size",
        "sprint_length_weeks": 2,
        "backlog": { "from": "$.postmortem.action_items[]", "map": { "item": "action" } }
    } }
  ]
}
```

A binding is one of:

| Form | Meaning |
|---|---|
| `"$.input.title"` | a pipeline input |
| `"$.postmortem.root_cause"` | a field of an earlier step's output; `[0]` picks one item of an array |
| `{ "from": "$.churn.recommendations[]", "pick": "action" }` | an array of one field taken from each item |
| `{ "from": "$.stories.stories[]", "map": { "item": "title" } }` | an array of objects with fields renamed to what the next skill expects |
| `2`, `"P2"`, `true` | a literal, checked against the input's type and enum |

The validator (`node scripts/check-pipelines.mjs`, part of `npm run check`) fails the build when a step names a skill without a contract, leaves a required input unbound, references a field that does not exist, or changes type along the way. It warns when a binding reads a field the producing skill is not required to emit, because the run will fail if that field is absent.

## Why contracts first

A pipeline is only as reliable as the shapes it passes. The contracts you add to a skill are what make it chainable here; the `check-skill-schemas` gate keeps them well-formed and the `check-pipelines` gate keeps the chains honest. If you want a skill in a pipeline, give it a contract.

A pipeline is three or four steps. To chain pipelines into one longer run with checkpoints and resume, see [MISSIONS.md](MISSIONS.md).
