# Models: one registry, five roles

Every Claude model id this project uses comes from one file, [data/models.json](../data/models.json). Code asks for a **role**, not a model, so a new line-up is a one-file change.

| Role | Model today | Used for |
|---|---|---|
| `default` | `claude-sonnet-5-5` | Running a skill, and any generation where no model is named |
| `fast` | `claude-haiku-5-5` | High-volume, simple work: translation, classification, bulk drafts |
| `deep` | `claude-opus-5-5` | Long or consequential documents, multi-step analysis, stricter review |
| `frontier` | `claude-fable-5-2` | [Missions](MISSIONS.md) and the hardest reasoning. Costs the most |
| `judge` | `claude-sonnet-4-6` (pinned) | Scoring in evals, the arena and the Skill Cup |

The line-up and prices were checked against the [Anthropic models overview](https://platform.claude.com/docs/en/about-claude/models/overview) on 2026-11-10. Prices per million tokens, input then output: Fable 5.2 $8 and $40, Opus 5.5 $4 and $20, Sonnet 5.5 $2 and $10, Haiku 5.5 $0.10 and $0.50.

**Why the judge is pinned to an older model.** Every published eval score in this repository was produced by that judge. A score from a different judge is not comparable with the old ones, so the judge moves only together with a re-baseline of `evals/results.json` and the scores in `SKILLS.md`. That re-baseline costs API credit and has not been run.

## Use it in code

```js
import { modelFor, requestShape, guidanceFor } from './lib/models.mjs';

const model = modelFor('default');          // throws on an unknown role
const shape = requestShape(model, 4096);    // { max_tokens } with thinking headroom on current models
const start = guidanceFor('contract-review'); // { role, model, effort } or null
```

`bin/lib/anthropic.mjs` is the shared client. `complete({ model, effort, maxTokens, ... })` applies `requestShape` for you.

## What changed with the current models

The current models think before they answer, and thinking is on by default. Three things follow, and the shared client handles all three:

1. **Thinking shares the output limit.** A request that asked for 300 tokens could spend all 300 on thinking and return nothing visible. The client adds 8,000 tokens of headroom to `max_tokens` on current models.
2. **The first content block may be a thinking block.** Reading `content[0].text` returns an empty string. The client joins the text blocks.
3. **An empty answer is an error, not a result.** If the reply has no text and the stop reason is a refusal or the token limit, the client throws and says which.

If you call the API yourself, in a page or a Worker, apply the same three. [connectors/lovable.md](../connectors/lovable.md) shows the pattern in the browser.

## Per-skill guidance

[MODEL-GUIDANCE.md](MODEL-GUIDANCE.md) says which role and effort to start each skill on. `npx pm-claude-skills run <skill> --auto-model` uses it.

## The drift check

```bash
node scripts/check-model-refs.mjs            # in npm run check
node scripts/check-model-refs.mjs --report   # every reference, by file
node scripts/check-model-refs.mjs --update   # rewrite the baseline after a migration
```

It scans the repository for Claude model ids and fails on two things: an id the registry does not list, and a **new** reference to a legacy model. Existing legacy references are counted in [data/model-refs-baseline.json](../data/model-refs-baseline.json); the count for a file may fall but not rise. Records of past runs (eval results, reports, the paper) and test fixtures are skipped, because they state what was used at the time.

## What is not migrated yet

164 references in 77 files still name a legacy model. They are live call sites that this repository cannot test without spending credit: the Cloudflare Workers, the browser pages that call the API with the visitor's key, and workflow files. Each needs one real call to confirm the three changes above before its default moves. They all still work, because the legacy ids are still served.

To migrate one:

1. Change the model id to the current one in the same family (the `replacedBy` field in the registry says which).
2. Raise `max_tokens` by 8,000 if the call asks for fewer than about 2,000 tokens of visible output.
3. Replace any `content[0].text` with a join over the text blocks.
4. Make one real call and read the output.
5. Run `node scripts/check-model-refs.mjs --update` so the baseline drops.

## When the line-up changes

1. Edit `data/models.json`: move the old entry to `legacy` with `replacedBy`, add the new one to `current`, point the role at it, update `checked`.
2. Update the price table in `web/pmcost.js`; the drift check compares the two.
3. Run `node scripts/build-model-guidance.mjs`, `node tests/anthropic-client-test.mjs` and `node scripts/check-model-refs.mjs`.
