# Decision layer — typed choices over the whole library

One call, one typed answer. This folder connects the library to a **calibrated decision model** — currently [TypeSafe AI's Jev](https://docs.typesafe.ai) ("System One") — for the places where a paragraph is the wrong output: *which skill?*, *is this safe?*, *escalate or hold?*, *does this step's output clear the bar?*

A Jev request is a **state** plus **typed questions** (`choice` over defined options, `score` against ordered levels, `noul` yes/no); the answer is the option **with a probability for every option and a confidence**. No text is generated, so nothing can be hallucinated outside the options you defined. It answers in 70–500 ms at a fraction of an LLM call.

> **Vendor neutrality.** No skill in `skills/` depends on this. The SKILL.md files describe decision *contracts* (state schema, options, thresholds) that any model can serve; this folder is one adapter. The CI gate `scripts/check-vendor-neutrality.mjs` keeps it that way.

## Setup — three ways in, no TypeSafe account required
TypeSafe's own signups are closed at the moment; the same model is served by two gateways. The client picks the first credential it finds (force one with `JEV_PROVIDER=typesafe|vercel|cloudflare`):

| Provider | Credential | Where it comes from | Endpoint the client uses |
|---|---|---|---|
| **Vercel AI Gateway** | `AI_GATEWAY_API_KEY=vck_…` | Vercel dashboard → AI Gateway → API keys (any Vercel account) | `ai-gateway.vercel.sh/typesafe/v1/systemone`, model `typesafe-ai/jev`, $0.042 / M input tokens |
| **Cloudflare Workers AI** | `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` | dash.cloudflare.com → My Profile → API Tokens (template *Workers AI*) | `api.cloudflare.com/client/v4/accounts/<id>/ai/run`, model `typesafe/jev`, 10k neurons/day free |
| **TypeSafe direct** | `JEV_API_KEY=sk-…` | console.typesafe.ai, when signups reopen | `api.typesafe.ai/v1/systemone`, model `jev-latest` |
| **Claude adapter** (last resort) | `ANTHROPIC_API_KEY` | the key you already have | `adapter.mjs` — the same typed questions answered by a Claude model (default `claude-haiku-4-5`, `JEV_ADAPTER_MODEL` overrides). Labelled `adapter:<model>`; **not Jev**, no calibration guarantee — the honest fallback and the comparison row, not the thing being benchmarked |

The hosted worker tries its providers in order — a `JEV_API_KEY` secret, the Workers AI binding, then the Claude adapter on the key that already funds `/try` — and moves on when one fails (the two gateways need a payment method on file; the adapter does not). `GET /route` shows the chain; every answer says which one served it. Adapter-backed routes are capped per IP and per day like the free runs.

```bash
export AI_GATEWAY_API_KEY=vck_…      # or the Cloudflare pair, or JEV_API_KEY
node integrations/jev/route.mjs "my landlord kept my deposit"
# no key at all? route through the deployed worker instead:
node skillbench/route-bench.mjs --worker https://pm-skills-mcp.pm-claude-skills.workers.dev --limit 20
```
Every script here and in `scripts/` that uses the model has `--selftest` (offline, mocked transport) and a **labelled fallback** when no credential is present — keyword routing, heuristics, or "off". Nothing breaks without one; it just says so.

## What's here
| File | What it does |
|---|---|
| `client.mjs` | `ask(state, questions)`, builders `choice/score/noul`, `decide()` thresholds, provider presets (TypeSafe / Vercel AI Gateway / Cloudflare Workers AI), retries on 429/529, `mockTransport` for tests |
| `catalog.mjs` | The catalogue as criteria: packs → skills, `criteriaFor()`, and the **keyword baseline** every route is measured against |
| `route.mjs` | `routePrompt()` — pack → skill in two Choice calls (or chunked flat). CLI: `node integrations/jev/route.mjs "…"` |
| `suggest.mjs` + `../../hooks/suggest-skill-jev.sh` | Claude Code `UserPromptSubmit` hook: one nudge line when the pick is confident; falls back to the keyword hook |
| `guard.mjs` | Input guard for public endpoints: injection + PII yes/no, fail-open |
| `crisis.mjs` | Public-bot first pass: danger (noul, conservative) + lane (hotline / human / skill / menu) |
| `decide.mjs` + `decisions/*.json` | Runs the **pm-decisions** contracts: `ship-or-slip`, `escalate-or-hold`, `renew-or-churn-call`, `hire-or-pass` |
| `picker.mjs` + `package.json` | The npm package **`pm-skills-jev-picker`**: `pick(prompt)` with the bundled catalogue snapshot (`index.json`, built by `build-index.mjs`) |

Elsewhere, same client: `scripts/classify-risk-tiers.mjs`, `scripts/human-review-queue.mjs`, `scripts/check-vendor-neutrality-semantic.mjs`, `scripts/journey-gate.mjs`, `scripts/drift-triage.mjs`, `scripts/example-output-gate.mjs`, `scripts/sycophancy-scan.mjs`, `scripts/skill-of-the-week-jev.mjs`, `evals/jev-judge.mjs`, `skillbench/route-bench.mjs`, `mcp-remote/src/jev.js` (`POST /route`, the `/try` guard), `extension/jev-suggest.js`. The full map with status: [docs/JEV-DECISION-LAYER.md](../../docs/JEV-DECISION-LAYER.md).

## The routing pattern (the cookbook, short)
The catalogue is 1,100+ skills in ~130 packs. A `choice` takes at most 255 options, and a 255-way choice over near-duplicates is noisier than two smaller ones. So:
1. **Pack** — `choice` over the packs (each described by its size and six titles).
2. **Skill** — `choice` over that pack's skills (title + one-line summary). If the pack pick was weak (confidence < 0.6), widen to the top-3 packs.
3. **Thresholds** — act only when confidence ≥ 0.6 *and* the winner's probability ≥ 0.7; otherwise show the alternatives and ask.

Measured against the keyword baseline on the eval cases: [skillbench/reports/route-bench.md](../../skillbench/reports/route-bench.md). The long version, ready to submit to the TypeSafe cookbooks: [docs/cookbooks/jev-routing-1000-skills.md](../../docs/cookbooks/jev-routing-1000-skills.md).

## Publishing the picker
```bash
node integrations/jev/build-index.mjs           # refresh index.json from web/skills-index.json
cd integrations/jev && npm publish --access public   # or dispatch .github/workflows/publish-jev-picker.yml
```
