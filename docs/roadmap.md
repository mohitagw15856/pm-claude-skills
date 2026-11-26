# Roadmap (docs mirror)

The maintained roadmap lives at the repository root: **[ROADMAP.md](../ROADMAP.md)**. This page exists so the docs tree has a stable entry point, and to gather the live signals that feed planning in one place.

## Where direction actually comes from

| Signal | Where | How it is used |
|---|---|---|
| Confirmed direction | [ROADMAP.md](../ROADMAP.md) (Now / Next / Later / Paused / Decided against) | The maintainer's committed intent; measured numbers are dated in the file |
| Votes | The [tech tree](https://mohitagw15856.github.io/pm-claude-skills/tech-tree/), built from 👍 on [`skill-request` issues](https://github.com/mohitagw15856/pm-claude-skills/issues?q=is%3Aissue+is%3Aopen+label%3Askill-request) | The three most-voted requests sit "in research"; votes reorder the queue on every deploy |
| Requests and reports | [Issues](https://github.com/mohitagw15856/pm-claude-skills/issues/new/choose) (skill request, bug, Show and Tell, expert review) | New skills must arrive with an eval case; requests feed the Skill Cup |

## Inferred near-term items

These are **inferred from repository signals, not confirmed commitments**; the maintainer should confirm or strike each (TODO):

- ⚪ *Inferred from ROADMAP "Now"*: eval coverage before new content (389 of 1,285 skills carry cases; 28 scored), release trust (install-and-run checks, pinnable flagships), and per-skill depth (`references/`, `templates/`, helper scripts) for the most-used skills first.
- ⚪ *Inferred from ROADMAP "Next"*: a Production-Ready promotion round, the web stylesheet ratchet, and the router and catalogue accessibility fixes.
- ⚪ *Inferred from the expert-review programme*: recruiting credentialed reviewers for the [ranked high-stakes queue](HUMAN-REVIEW-QUEUE.md), where 0 reviews are recorded so far.
- ⚪ *Inferred from recent merges*: continued Skill Cup rounds and the monthly state-of-the-library report, which now generate themselves from repository records.

Anything not listed in ROADMAP.md is not planned; the fastest way to change that is a discussion or a voted skill request, not a large unannounced PR (see [ROADMAP.md](../ROADMAP.md) "Before you build something large").
