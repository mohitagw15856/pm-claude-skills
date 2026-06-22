# brain/ — your Professional Brain

A durable, local markdown memory the skills read before they answer and write to after. No
vector DB, no cloud — plain files you can grep, edit, and audit. Open this folder as an
**Obsidian vault** and the links become a graph of what you know.

## Set it up

Copy this `brain/` folder to your project root (or run the `/brain` command → `init`). Then:

- **Ingest** an artifact: *"ingest these interview notes."* → original saved to `source/`,
  facts synthesised into `knowledge/` / `decisions/` / `hypotheses/`, each provenance-tagged.
- **Recall** what's known: *"what do we know about activation?"* → grounded answer that cites
  each fact's file and tag (uses `professional-brain/scripts/brain_query.py`).
- **Review** weekly: *"run a brain review."* → flags stale hypotheses, decisions due to reopen,
  and contradictions.

## Folders

| Folder | What lives here |
|---|---|
| `context.md` | product, ICP, metrics definitions, voice (your Skill Memory, deepened) |
| `knowledge/` | durable facts — strategy, market, users, org |
| `decisions/` | one file per decision: what, why, rejected alternatives, reopen-when |
| `hypotheses/` | assumptions: statement, evidence, status |
| `stakeholders/` | one file per person: asks, concerns, history |
| `entities/` | typed objects — features, accounts, experiments |
| `source/` | immutable originals (never edited after capture) |

## Provenance tags

Every fact says where it came from: `[data]` `[interview]` `[external]` `[verbal]` `[hunch]`
(strongest → weakest). Keep the tag whenever you reuse a fact; never give a `[hunch]` the
confidence of `[data]`.

The example files in each folder show the shape — replace them with your own.
