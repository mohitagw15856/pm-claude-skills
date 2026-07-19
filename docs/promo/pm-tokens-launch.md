# pm-tokens launch kit — ready-to-post drafts

Everything below is paste-ready. Links to use: bundle https://github.com/mohitagw15856/pm-claude-skills/tree/main/plugins/pm-tokens · release https://github.com/mohitagw15856/pm-claude-skills/releases/tag/v58.0.0 · repo https://github.com/mohitagw15856/pm-claude-skills

---

## Show HN (title + text)

**Title:** Show HN: Token optimization for every stage of an agent's journey (stdlib, no API)

**Text:**

Agent token bills come from four places: tool outputs dumped raw into context, re-reading code to navigate it, verbose output (priced at 3–5× input), and sessions that drag their whole history along. Great single-stage tools exist for each — Caveman for the output register, Headroom for context compression, Graphify for code maps.

pm-tokens covers the whole journey in one bundle of six skills + three Python scripts. The scripts are stdlib-only, deterministic, and byte-exact-tested in CI:

- context_crush.py — JSON arrays become schema + samples + computed stats (98% smaller on uniform data); logs dedupe with every error line guaranteed to survive; inputs too small to gain are returned unchanged with an honest header
- repo_map.py — tree + top-level symbols for ~10 languages, printing its own economics (a typical map costs ~3% of reading everything)
- token_cost.py — local estimates with a permanent ±15% label, priced at YOUR rates × YOUR call volume, because a 40% saving on something sent once is a rounding error and 8% on every call is real money

The other three skills are judgment, not code: the telegraphic output register in 3 levels (with the never-diet list — legal text, human deliverables), cache-aware context budgeting (stable prefix first: one volatile byte re-prices everything below it), and session handoffs at ~5% of transcript size.

It's part of a 630-skill open library (MIT). Everything is markdown + stdlib Python you can read in full before installing — there's even a skill for vetting skills.

---

## X/Twitter thread

**1/** Everyone's shipping single-stage token tools:
- Caveman → compress the output
- Headroom → compress the context
- Graphify → map the code instead of reading it

We shipped the whole journey in one bundle: pm-tokens. Six skills, three scripts, zero dependencies. 🧵

**2/** Stage 1 — tool outputs. 300 JSON rows into context = paying for 297 rows nobody reads.

context_crush.py: schema + 3 samples + computed stats. 98% smaller on uniform data. Deterministic — the stats are calculated, not paraphrased. No API, no model, no hallucination surface.

**3/** Stage 2 — code exploration. Agents read ten files to find one, then re-read them next session.

repo_map.py: tree + symbols, ~10 languages, local. It prints its own economics: the map costs ~3% of reading everything. Read the map. Open only what matches.

**4/** Stage 3 — output. Output tokens cost 3–5× input, which makes output the highest-leverage diet there is.

token-diet: the telegraphic register in 3 levels — with the honesty most guides skip: single-shot calls shouldn't diet (the instruction costs more than it saves), and humans never get level 3.

**5/** Stage 4 — the session. Everything resident in context rides EVERY turn.

context-budget: load/link/fetch allocation + the cache trick — stable content first, volatile last, because one timestamp at the top re-prices your entire cached prefix, every call.

**6/** Stage 5 — boundaries. session-handoff: decisions + state + landmines at ~5% of transcript size. What dies at compaction isn't facts (refetchable) — it's decisions and their reasons. Those are what the note carries.

**7/** Stage 0, really — measurement. token_cost.py: local estimates (±15%, labeled — no cosplaying as a tokenizer), priced at your rates × your call volume.

"You can't optimize what you don't measure" but also: measure the volume. Once vs every-call is the whole game.

**8/** All of it: MIT, keyless, stdlib, byte-exact-tested, readable before you install.

Part of a 630-skill library — decoders, simulators, calculators, and now the frugal stack.

[link]

---

## LinkedIn post

**Your AI agent's token bill has four leaks — and the tools that fix them ship separately.**

Tool outputs dumped raw into context. Code re-read for navigation. Verbose output (priced at 3–5× input). Sessions dragging their full history to every turn.

We just shipped pm-tokens: one bundle covering every stage of that journey — six skills and three Python scripts, all open source, all zero-dependency, all deterministic.

The part I'm proudest of isn't the compression ratios (98% on uniform JSON is nice). It's the honesty engineering:
→ The crusher returns small inputs unchanged rather than pretending to help
→ The token estimator wears a permanent ±15% label instead of cosplaying as a tokenizer
→ The output-diet skill tells you when NOT to use it (single-shot calls, human deliverables)
→ Every claimed number is computed, pinned, and tested byte-exact in CI

Optimization advice that never says "don't" isn't advice — it's marketing.

Part of the pm-claude-skills library: 630 skills across 87 bundles, MIT-licensed, readable in full before installing. Link in comments.

---

## Reddit (r/ClaudeAI · r/LocalLLaMA flavor)

**Title:** Built a token-optimization skill family: crush tool outputs (98% on JSON), map repos instead of reading them (~3% cost), diet the output — stdlib only, no API keys

**Body:**

Got inspired by Caveman/Headroom/Graphify each solving one stage of the token problem, and built the whole journey as one bundle for Claude Code (works with any SKILL.md-compatible agent — Hermes, Codex adapters, etc.).

What's in it: [the six-skill table]

Design constraints I held: no API calls (structural compression only — computed stats can't hallucinate), deterministic output (so cached prefixes stay byte-identical), and every script's output pinned exactly in CI.

Honest limitations: the repo map is regex symbols, not a real graph (Graphify does that properly); the token counts are heuristics (±15%, labeled); and the output diet explicitly refuses single-shot use where it costs more than it saves.

All MIT. Feedback very welcome — especially on what the crusher should handle next (CSV? HTML?).

---

## Posting notes

- HN: post morning US time, weekday; reply fast to early comments; lead with the honest-limitations answer when challenged — it's the credibility play.
- X: thread performs better with one image — the context_crush before/after screenshot (98% header line) or the repo-map output.
- Cross-link the release notes rather than the repo root on X (release pages convert better for "what's new").
- The Caveman/Headroom/Graphify credits are load-bearing everywhere: naming inspirations reads as confidence and invites their audiences instead of competing with them.
