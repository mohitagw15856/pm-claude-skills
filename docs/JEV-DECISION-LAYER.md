# The decision layer — the fourth 20

The first three waves solved breadth, then trust, depth, reach and governance. This wave adds a **decision layer**: the places where the library needs a typed answer with a probability — *which skill, is this safe, escalate or hold, does this output clear the bar* — now get one, from a calibrated decision model ([TypeSafe Jev](https://docs.typesafe.ai), "System One": state + defined options in, one answer with probabilities out, 70–500 ms, no text generated).

Everything is additive and **vendor-neutral by construction**: no existing skill changed, the four new skills describe *contracts* any model can serve, and every script has a labelled fallback (keyword, heuristic, or "off") when `JEV_API_KEY` is absent. Every script has `--selftest` with a mocked transport; `npm run check:jev` runs them all offline.

Legend: ✅ built and self-tested · 🟡 built, needs a key or a human step to go live · 🧑 human-only step

## A. Routing & discovery
| # | Move | Status | What landed |
|---|---|---|---|
| 1 | Jev-backed suggest-skill hook | ✅ | `hooks/suggest-skill-jev.sh` + `integrations/jev/suggest.mjs` — one nudge line when confident; falls back to `suggest-skill.sh` without a key, on timeout, on any error |
| 2 | `/route` on the hosted worker | ✅ | `mcp-remote/src/jev.js` + `POST /route`, `GET /route`, `/route/badge` in `src/index.js`. **Live** through the Workers AI binding (`typesafe/jev`), no key; a TypeSafe or Vercel key via `JEV_API_KEY` overrides |
| 3 | Pack-first triage | ✅ | `integrations/jev/route.mjs` — pack → skill in two Choice calls, widening to top-3 packs on a weak pick; `--flat` for chunked comparison |
| 4 | Extension contextual discovery v2 | 🟡 | `extension/jev-suggest.js` — opt-in (key in extension storage), never on auth/banking hosts, title + host + 500 words only; rules stay the fallback. Wiring + store copy: `extension/CONTEXTUAL-DISCOVERY.md` |
| 5 | Journey step gating | ✅ | `scripts/journey-gate.mjs` — Score (empty/partial/complete) + Noul (carry-forward present) → proceed/hold; contract in `journeys/SESSION-MODE.md` |

## B. Trust & safety
| # | Move | Status | What landed |
|---|---|---|---|
| 6 | Risk-tier second opinion | ✅ | `scripts/classify-risk-tiers.mjs --changed` — scores each description against the three tier definitions, reports under-tiering; config stays authoritative |
| 7 | Crisis router for public bots | ✅ | `integrations/jev/crisis.mjs` — danger (noul, threshold 0.3: better a false positive) + lane; crisis lines by country; keyword fallback. Wired in `docs/PUBLIC-BOT-RUNBOOK.md` |
| 8 | Input guard on `/try` | ✅ | `guardInput()` in the worker — injection + PII before a sponsor-funded call; fail-open; 400 `guarded` when blocked. Live via the Workers AI binding |
| 9 | Vendor-neutrality, semantic pass | ✅ | `scripts/check-vendor-neutrality-semantic.mjs` — one Noul per changed skill; advisory (`--strict` to gate); the regex gate remains authoritative |
| 10 | Human-review queue prioritiser | ✅ | `scripts/human-review-queue.mjs --write` → `docs/HUMAN-REVIEW-QUEUE.md` + `data/human-review-queue.json` — the unreviewed high-stakes skills ranked by harm-if-wrong (heuristic now, model-scored with a key) |

## C. Quality & evals
| # | Move | Status | What landed |
|---|---|---|---|
| 11 | Typed eval judge | ✅ | `evals/jev-judge.mjs` — the four rubric dimensions as Score(5 described levels) → same `{scores, overall}` shape as the LLM judge, plus confidence per dimension |
| 12 | Sycophancy scan | ✅ | `scripts/sycophancy-scan.mjs --write` → `skillbench/SYCOPHANCY.md` — flatter and hedge rates over `examples/samples` (heuristic now; calibrated with a key) |
| 13 | Drift triage | ✅ | `scripts/drift-triage.mjs` — classifies every `check-drift` finding as breaking / semantic / cosmetic; exits 1 only on breaking |
| 14 | Example-output gate | ✅ | `scripts/example-output-gate.mjs` — scores candidate `## Example Output` sections against the bar in `docs/EXAMPLE-OUTPUT-FIELD.md` (shape, abridged, honest, input-first) |

## D. Reach & community
| # | Move | Status | What landed |
|---|---|---|---|
| 15 | `pm-skills-jev-picker` npm package | 🟡 | `integrations/jev/package.json` + `picker.mjs` + bundled `index.json`; workflow `publish-jev-picker.yml`. Publishing and the awesome-jev PR are the human steps |
| 16 | Cookbook PR to TypeSafe docs | 🧑 | `docs/cookbooks/jev-routing-1000-skills.md` — submission-ready |
| 17 | Route-bench | ✅ | `skillbench/route-bench.mjs --write` → `skillbench/reports/route-bench.md` — keyword floor committed (**51.7% top-1 / 65.2% top-3** on 267 cases); model rows fill with a key |
| 18 | Skill of the week, on signal | ✅ | `scripts/skill-of-the-week-jev.mjs` — demand + shipped-recently + seasonal + tier → one Choice; rotation stays the fallback |

## E. Product surface
| # | Move | Status | What landed |
|---|---|---|---|
| 19 | **pm-decisions** bundle (4) | ✅ | `ship-or-slip`, `escalate-or-hold`, `renew-or-churn-call`, `hire-or-pass` — each a state schema + defined options + thresholds + on-hold rule; adapters in `integrations/jev/decisions/*.json`, runner `integrations/jev/decide.mjs` |
| 20 | Skill Router page | ✅ | `web/router.html` — paste prompts (or drop Claude Code history), see the skill each should have used, confidence and risk tier; keyword in-browser, typed router when a worker URL is set |

## Wire into CI (when a key exists as a repo secret)
```
node scripts/classify-risk-tiers.mjs --changed            # report; --strict once calibrated
node scripts/check-vendor-neutrality-semantic.mjs --changed
node scripts/drift-triage.mjs                            # exit 1 only on breaking
node scripts/example-output-gate.mjs --dir candidates/   # when back-filling examples
```

## The human steps that unlock the rest
1. **Pick a credential, or don't** — TypeSafe signups are closed and both gateways (Vercel AI Gateway, Cloudflare Workers AI) want a payment method on file before they serve Jev. Until one of those is acceptable, everything runs on the **Claude adapter** (`ANTHROPIC_API_KEY`, `integrations/jev/adapter.mjs`): same typed questions, answered by `claude-haiku-4-5`, labelled `adapter:` so no number is ever mistaken for a Jev number. The hosted worker already falls through to it. When a Jev credential appears (`JEV_API_KEY`, `AI_GATEWAY_API_KEY`, or the Cloudflare pair), it wins automatically and the bench gains real Jev rows.
2. **Publish the picker** and open the awesome-jev PR (Agent Tooling category).
3. **Submit the cookbook** to the TypeSafe docs.
