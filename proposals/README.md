# Proposals — where the library grows itself

The library shouldn't only grow when someone thinks of a skill. This folder is the output of the **self-growing pipeline**: it watches what people actually ask for, notices what the catalog can't yet answer, and drafts the missing skill for a human to finish.

## The loop

1. **Requests** collect in [`data/skill-requests.json`](../data/skill-requests.json) — seeded by hand and topped up automatically from GitHub issues labelled **`skill-request`**.
2. [`scripts/mine-gaps.mjs`](../scripts/mine-gaps.mjs) measures each request against all catalog skills by lexical similarity and writes **[`GAPS.md`](GAPS.md)** — a ranked shortlist of what's uncovered.
3. For the single biggest uncovered gap it scaffolds `proposals/<slug>/SKILL.md` — a valid skeleton with the request captured in a comment.
4. The [grow workflow](../.github/workflows/grow.yml) (manual, plus monthly) opens a **PR** with the report and the draft.

## Ground rules

- **Nothing auto-ships.** Drafts land in `proposals/`, never in `skills/`, and never auto-merge. A human completes the draft against the [authoring standard](../SKILL-AUTHORING-STANDARD.md), then moves it into `skills/` in a normal PR.
- **Zero model cost.** Gap detection is lexical (token overlap) — honest but shallow, so `GAPS.md` is a shortlist for judgement, not an oracle.
- The scaffold intentionally **fails** the authoring bar (it's full of `TODO`s) so it can't be mistaken for a finished skill.

## Run it yourself

```bash
node scripts/mine-gaps.mjs            # write GAPS.md + scaffold the top gap
node scripts/mine-gaps.mjs --report   # just the report, no scaffold
```

_To request a skill: open an issue labelled `skill-request` with the ask in the title. It'll show up in the next gaps run._
