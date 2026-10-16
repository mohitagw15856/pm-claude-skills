---
name: prompt-regression-suite
description: "Design a regression test suite that catches an LLM feature getting worse when the prompt, model, or context changes. Use when asked to stop prompt changes breaking production, set up golden tests or CI gates for an LLM feature, or test a model/prompt upgrade before shipping it. Produces a golden case set, per-case pass criteria, CI gate thresholds, and a triage protocol for failures. For designing first-time evaluation of a new feature use ai-eval-plan instead."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/prompt-regression-suite.html
metadata:
  {
    "openclaw": { "emoji": "🦾" }
  }
---

# Prompt Regression Suite Skill

Every prompt tweak, model upgrade, and context change is a deploy. This skill designs the suite that runs on each one and answers a single question: *did anything that used to work stop working?*

## What This Skill Produces

- A **golden case set**: curated inputs with per-case pass criteria
- **Scoring methods** per case class (exact, rubric-judge, property checks)
- **CI gate thresholds** — what blocks a merge vs. what warns
- A **failure triage protocol** — flaky vs. regressed vs. golden-set-wrong

## Required Inputs

Ask for (if not already provided):
- **The feature and its contract** — what the LLM step receives and must produce
- **What has broken before** (or nearly) — past incidents seed the best cases
- **Real traffic examples** — 10-20 representative inputs, including ugly ones
- **What triggers a run** — prompt edits, model bumps, retrieval changes, all of the above?

## Building the Golden Set

Compose the set from four deliberate classes — not a random sample:

| Class | Purpose | Share |
|---|---|---|
| **Core paths** | The 5-10 inputs that represent most real traffic | ~40% |
| **Past failures** | Every input that caused a bug, complaint, or incident — permanently | ~25% |
| **Edge & adversarial** | Empty/huge inputs, wrong language, injection attempts, off-topic | ~25% |
| **Canaries** | Cases pinned to behaviours you never want to change (refusals, format, tone) | ~10% |

Keep it small enough to run on every change (30-80 cases beats 500 nobody runs). Version it in git next to the prompt.

## Scoring Per Case

Choose the cheapest check that catches the regression:
1. **Exact / structural** — JSON parses, required fields present, enum values legal. Free and deterministic; use wherever the contract is structural.
2. **Property checks** — output contains/never-contains X, length bounds, citation count. Deterministic proxies for quality.
3. **LLM-as-judge with a rubric** — only where judgement is unavoidable. Pin the judge model + rubric version, score against the *baseline output*, and spot-check judge agreement with a human on ~20 cases before trusting it.

Every case records: input, pass criteria, scoring method, and the baseline output at the time it was added.

## CI Gates

- **Block the merge:** any past-failure or canary case fails; structural pass rate < 100%; overall pass rate drops more than [X]% vs. baseline.
- **Warn, don't block:** judge-scored quality drifts within tolerance; latency/cost moves past its soft budget (pair with `llm-cost-latency-budget`).
- **Every run logs** model ID, prompt version, and per-case results — regressions must be diffable to the exact change.

## Failure Triage Protocol

When a case fails, classify before "fixing":
1. **Flaky** — re-run N times; if intermittent, tighten the prompt/temperature or the check, don't ignore it.
2. **Genuine regression** — the change made it worse: revert or fix the change.
3. **Golden set wrong** — the new behaviour is actually better: update the case *via review*, never silently, and record why the expectation changed.

## Output Format

### Prompt Regression Suite: [feature]

**Trigger:** runs on [prompt edit / model bump / retrieval change] via [CI job].

**Golden set** ([n] cases):

| # | Class | Input (summary) | Pass criteria | Method |
|---|---|---|---|---|

**Gates:** merge blocks when [conditions]. Warnings on [conditions].

**Triage:** [the three-way protocol, with who owns updates to the golden set]

**Maintenance:** every production incident adds a case within [period]; the set is reviewed for dead cases each [quarter].

## Quality Checks

- [ ] Every past production failure appears as a permanent case
- [ ] Canary cases cover the behaviours that must never change (refusals, format, safety)
- [ ] No case relies on an LLM judge where a structural or property check would do
- [ ] Gate thresholds are numbers, not "significant degradation"
- [ ] The suite is fast and cheap enough that it actually runs on every change — state its runtime and cost

## Anti-Patterns

- [ ] Do not test only happy paths — the suite exists for the inputs that hurt you
- [ ] Do not let anyone update golden expectations in the same PR that broke them, without review
- [ ] Do not use an unpinned judge model — a judge that upgrades itself moves your baseline silently
- [ ] Do not treat pass-rate-vs-baseline as the only gate — one dead canary matters more than 2% aggregate drift
- [ ] Do not grow the set unboundedly — a suite too slow to run on every change protects nothing

## Example Trigger Phrases

- "Stop prompt changes breaking production."
- "Set up golden tests or CI gates for an LLM feature."
- "Test a model/prompt upgrade before shipping it."
