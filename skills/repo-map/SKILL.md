---
name: repo-map
description: "Navigate a codebase by map instead of reading files wholesale — a deterministic stdlib script that emits the tree with line counts and top-level symbols, plus the read-the-map-first discipline that cuts exploration tokens by an order of magnitude. Use when asked explore this repo efficiently, stop re-reading the whole codebase, make a map of this project, or which files should the agent actually open. Produces the compact map with its token math (map vs. everything), the navigation discipline, and the open-only-what-matches rule."
---

# Repo Map Skill

Agents burn their context windows on exploration: reading ten files to find the one, re-reading them next session, paying full price for code that was only ever navigation. The fix is the oldest one in computing — an index. This skill generates a compact, deterministic map (tree + line counts + top-level symbols via regex, no parser dependencies, nothing leaves the machine) and installs the discipline that makes it pay: *read the map first, open only the files whose names and symbols match the task.* The script prints its own economics: a typical map costs ~3% of reading everything.

## What This Skill Produces

- **The map** — tree with per-file line counts and top-level symbols (functions, classes, types) for ~10 common languages
- **The token math** — reading-everything vs. reading-the-map, printed in the header
- **The navigation plan** — for the task at hand: which files the map says to open, which to skip
- **The refresh rule** — when the map is stale and what it costs to regenerate (nothing — it's local and instant)

## Required Inputs

Ask for these if not provided:
- **The directory** — repo root or the subdirectory that matters (mapping `src/` beats mapping `node_modules`' ancestors)
- **The task** — the map is generic; the *navigation plan* needs to know what's being hunted (a bug in auth? the payment flow? where X is defined?)
- **Scale expectations** — huge monorepos get mapped per-subdirectory (`--max-files` guards the map's own size; a 40,000-file map defeats itself)

## Programmatic Helper

```bash
python3 scripts/repo_map.py .
python3 scripts/repo_map.py src --max-files 400 --max-symbols 8
```

Deterministic (sorted walk), stdlib-only, local. Skips `.git`, `node_modules`, build dirs. Symbols via per-language regex — deliberately humble: top-level names, not a full graph; the point is navigation, not analysis. Header prints files, lines, and the map-vs-everything token comparison.

## Framework: The Navigation Discipline

1. **Map before open, every exploration:** the first act in an unfamiliar repo is the map, not a file read — one ~3%-cost artifact answers "what's here, what's it called, where would X live" for the whole session.
2. **Open by match, not by curiosity:** files get opened when their *name or symbols* match the task ("`refund` appears in `billing/refunds.py → process_refund, RefundPolicy`") — the map converts "read around and see" into a shortlist, and the shortlist is the saving.
3. **The map is cache-friendly context:** stable, deterministic output means the map can sit at the top of a session and stay byte-identical across turns — unlike raw file reads, it never invalidates a provider prefix cache by reordering.
4. **Depth on demand:** map → open the shortlisted file → if still lost, map the subdirectory deeper. Escalation is cheap because every level is local and instant; what's expensive is skipping the levels and reading wholesale.
5. **Honest limits:** regex symbols miss dynamic definitions, decorators' effects, and call graphs — for "who calls this," the map shortlists candidates and grep finishes the job. The map is the index, not the analysis; tools that build true graphs exist for the deep version (see Based On).

## Output Format

# Repo Map: [path] — [N] files, map ≈ [X]% of reading everything

[The script's map output]

## Navigation Plan (for: [the task])
**Open:** [the shortlist, with the matching symbol/name per file]
**Skip:** [the big directories the task doesn't touch]
**If not found:** [the grep to run next, on the shortlist first]

## Quality Checks

- [ ] The map was generated before any wholesale file reading
- [ ] The token comparison (map vs. everything) appears
- [ ] The navigation plan shortlists by name/symbol match with reasons
- [ ] Monorepos were mapped per-subdirectory, not defeated by their own size
- [ ] The regex-symbols limitation is stated when the task is call-graph-shaped

## Anti-Patterns

- [ ] Do not read files to find out what's in them — that's the map's job at 3% of the price
- [ ] Do not regenerate the map every turn — it's stable; put it once at the session's top
- [ ] Do not oversell the symbols — top-level names, not semantics; grep and real parsers pick up where regex stops
- [ ] Do not map the world — `--max-files` and subdirectory scoping exist because a bloated map is just a slower file dump
- [ ] Do not skip the navigation plan — a map without a shortlist saved nothing yet

## Based On

The codebase-as-index pattern — local knowledge graphs for agent navigation (as in [Graphify](https://github.com/Graphify-Labs/graphify), which does the full tree-sitter graph version) — distilled here into a zero-dependency, deterministic map with the read-the-map-first discipline.
