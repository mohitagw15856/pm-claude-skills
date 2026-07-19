---
name: context-crusher
description: "Compress tool outputs, logs, and JSON before they enter the context window — structural compression via a deterministic stdlib script (schema + samples + stats instead of 300 raw rows), no API, no summarization loss. Use when asked shrink this tool output, my context is full of JSON, compress these logs before analysis, or stop wasting tokens on raw data. Produces the crushed artifact with its token math shown, the crush-or-keep decision rules, and the fetch-the-original escape hatch."
---

# Context Crusher Skill

The most expensive tokens in agent work are the ones nobody reads: 300 identical JSON rows when the schema plus three samples would do, a log where one error hides among four hundred heartbeats, a file pasted whole for one relevant section. This skill crushes those *structurally* — schema + head/tail samples + numeric stats for JSON arrays, dedupe-with-counts plus guaranteed error-line survival for logs, head/tail windowing for text — with a deterministic stdlib script, no model call, no summarization risk. The information that defines meaning survives; the repetition that defines cost doesn't.

## What This Skill Produces

- **The crushed artifact** — the compressed version, with its token math in the header (~6,000 → ~130 is typical for uniform JSON)
- **The crush decision** — what to crush, what to keep raw, and what to *link instead of load*
- **The escape hatch** — every crush names how to fetch the original when a detail turns out to matter
- **The pipeline habit** — where in the agent's workflow the crush step belongs (between tool and context, always)

## Required Inputs

Ask for these if not provided:
- **The payload** — the JSON/log/text (or its path), and roughly how it will be used ("I need the error" vs. "I need every row" are opposite answers)
- **The repetition question** — is this data uniform (crushable to schema+stats) or is each row genuinely distinct (crushing loses signal — keep or filter instead)?
- **The journey stage** — one-shot analysis (crush hard) vs. data the conversation will keep querying (crush to an index, keep the original fetchable)

## Programmatic Helper

```bash
python3 scripts/context_crush.py --mode json --file response.json
python3 scripts/context_crush.py --mode log --file build.log --keep 40
cat data.json | python3 scripts/context_crush.py --mode json
```

Deterministic, stdlib-only, no API. JSON arrays → `{count, schema, head samples, tail, numeric min/max/mean}` · logs → consecutive-duplicate collapse + first-occurrence dedupe + an always-preserved error/warning section · text → whitespace normalization + head/tail window with an elision marker. Inputs too small to gain are returned unchanged with an honest header.

## Framework: The Crush Rules

1. **Crush between the tool and the context, not after:** the token is spent the moment raw output enters the window — the crush step lives in the pipeline (`tool | crush | context`), not in cleanup. Retroactive crushing saves nothing already paid for.
2. **Structural beats semantic for data:** summarizing JSON with a model costs tokens, adds latency, and can hallucinate; schema+samples+stats is free, instant, and *provably* faithful — the numbers are computed, not paraphrased. Save model-summarization for prose, where structure can't do the work.
3. **Errors are sacred:** the log crusher's contract is that every error/warning line survives regardless of compression — a crush that can lose the one line that mattered is a corruption, not a compression. Any custom crushing keeps this invariant.
4. **The escape hatch is part of the artifact:** every crushed block states where the original lives ("full response in /tmp/response.json — fetch rows by id if needed"), because reversibility is what makes aggressive crushing safe.
5. **Know when not to:** non-uniform rows where each is signal, data being diffed byte-for-byte, legal/audit content, and anything under ~50 lines (the crush header costs more than it saves — the script says so itself). Crushing is a default for *bulk*, not a reflex for everything.

## Output Format

# Crushed: [payload] — ~[X] → ~[Y] tokens ([Z]% smaller)

[The crushed artifact, script header included]

**Kept raw:** [what wasn't crushed and why] · **Original:** [where it lives, how to fetch]
**Pipeline note:** [where the crush step now sits in this workflow]

## Quality Checks

- [ ] The token math appears — before, after, percent
- [ ] JSON crushes carry schema and computed stats, never paraphrased numbers
- [ ] Every error/warning line in a log crush survived
- [ ] The original's location and fetch route are stated
- [ ] Too-small inputs were returned unchanged, honestly

## Anti-Patterns

- [ ] Do not summarize data with a model when structure can compress it — paraphrased numbers are hallucination surface
- [ ] Do not crush non-uniform, every-row-is-signal data — filter or keep it
- [ ] Do not drop the escape hatch — irreversible compression turns a saving into a gamble
- [ ] Do not crush after the tokens are spent — the step belongs in the pipeline
- [ ] Do not let the crush eat errors — the invariant outranks the ratio

## Based On

The context-compression layer pattern — structural compression of tool outputs before the LLM (as in [Headroom](https://github.com/headroomlabs-ai/headroom)) — rebuilt here as a keyless, deterministic, stdlib skill.
