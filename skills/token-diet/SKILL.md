---
name: token-diet
description: "Cut LLM output tokens 40–70% by stripping grammatical scaffolding while preserving every fact — telegraphic output modes, when they pay (pipelines, long sessions) and when they don't (single shots, human-facing prose), with the mode lines to switch on demand. Use when asked make the model respond tersely, cut output token costs, caveman mode, or compress agent-to-agent messages. Produces the diet-mode instruction block ready to paste, the three compression levels with examples, the economics of when each pays, and the never-diet list."
---

# Token Diet Skill

Most of an LLM's output is grammatical scaffolding the reader's brain (or the next model in the pipeline) reconstructs for free: articles, hedges, pleasantries, "it's worth noting that." Strip it and the facts survive in 30–60% of the tokens — output reads like a telegram, and models parse telegrams fine. But the diet has real economics: output tokens cost 3–5× input, so dieting *output* pays disproportionately — while in single-shot calls the mode instruction itself costs more than it saves, and human-facing prose dieted into fragments just transfers the reading cost to a person. This skill installs the three levels, the switch lines, and the judgment about when each pays.

## What This Skill Produces

- **The mode blocks** — paste-ready instruction text for each diet level, tuned to the use case
- **The three levels with examples** — the same content shown at each level, so the trade is visible
- **The economics** — where the diet pays (multi-turn, pipelines, agent-to-agent) and where it costs (single shots, human deliverables)
- **The never-diet list** — the content classes where scaffolding IS the content

## Required Inputs

Ask for these if not provided:
- **The use case** — interactive session, agent pipeline, logging/intermediate output, or human-facing deliverable — the level (or the refusal) follows from it
- **The reader** — a model, a developer skimming, or an end user; models tolerate level 3, humans stop at level 1–2
- **The volume shape** — many turns (mode instruction amortizes; diet pays) vs. one call (it usually doesn't — say so)

## Framework: The Three Levels and the Economics

1. **Level 1 — No filler (safe everywhere):** strip pleasantries, hedges, meta-commentary ("Certainly! It's worth noting that…"), restatements of the question. ~15–25% output reduction, zero information loss, readable by anyone. This level is just good writing and has no never-diet list.
2. **Level 2 — Compressed prose:** short declaratives, no transitions, minimal articles where clarity survives. "Deploy failed. Cause: expired cert on api-gw. Fix: rotate cert, redeploy. ETA 20min." ~30–50% reduction; fine for status updates, intermediate reasoning, developer-facing output.
3. **Level 3 — Telegraphic (the caveman register):** facts only, grammar reconstructed by the reader. "deploy fail. cert expired api-gw. rotate + redeploy. 20min." ~50–70% reduction; for agent-to-agent messages, pipeline intermediates, and logs — places where no human reads unassisted.
4. **The economics, honestly:** output tokens price at 3–5× input, so output dieting is the highest-leverage compression per effort — but the mode instruction rides *input* on every call (cheap, cacheable) and only amortizes across turns. Single-shot: skip it. And a dieted output a human must re-expand mentally didn't save tokens, it *moved the cost off the bill and onto the reader* — which is why deliverables stay at level 1.
5. **The never-diet list:** legal/contractual text, user-facing documents, teaching content (the scaffolding is the pedagogy), anything quoted verbatim later, and safety-relevant instructions — ambiguity introduced by compression is a bug, and these are where ambiguity bites. The diet compresses *transport*, never *meaning-bearing form*.

## Output Format

# Token Diet: [use case] — level [1/2/3]

## The Mode Block (paste this)
> [The instruction text, e.g. L2: "Respond in compressed prose: short declaratives, no filler, no hedges, no restating the question. Facts and actions only. Full grammar where ambiguity threatens."]

## The Same Content, Three Ways
[One realistic paragraph at L0/L1/L2/L3 with token counts — the trade made visible]

## The Economics Here
[This use case's volume × the level's reduction × output pricing — worth-it verdict in one sentence; measure with [token-cost](../token-cost/SKILL.md)]

## Never Diet
[The exclusions relevant to this user's context, named]

## Quality Checks

- [ ] The level matches the reader (models get 3, humans get 1–2)
- [ ] The single-shot case was checked — and refused when the diet costs more than it saves
- [ ] The example shows the same content at multiple levels with counts
- [ ] The never-diet exclusions are stated, not implied
- [ ] Facts survive verbatim at every level — compression touched form only

## Anti-Patterns

- [ ] Do not diet single-shot calls — the instruction outweighs the saving; the skill says no
- [ ] Do not ship level-3 output to humans — that's cost-shifting, not saving
- [ ] Do not let compression create ambiguity — where two readings appear, grammar returns
- [ ] Do not diet the never-diet list — legal text in telegraphese is a liability with a good ratio
- [ ] Do not confuse terse with rude in interactive use — level 1 removes filler, not courtesy where courtesy is content

## Based On

The output-compression register pattern — telegraphic prompting for output-token reduction (as in [Caveman](https://github.com/juliusbrussee/caveman) and the caveman-compression method) — systematized here into levels, economics, and exclusions.
