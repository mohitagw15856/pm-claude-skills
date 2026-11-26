# Community SkillBench results (the Agent Arena)

Each JSON file here is one community-run SkillBench result for a model or an agent, shown in the [Agent Arena](https://mohitagw15856.github.io/pm-claude-skills/modelbench.html#arena). The full protocol is in [docs/arena.md](../../docs/arena.md).

In short: fork the repository, run the "SkillBench (bring your model)" workflow on your own key (or run the harness locally with `--save-outputs`), stage the file with `node scripts/stage-arena-submission.mjs`, and open a pull request that adds one file. `tests/checks/arena.mjs` validates every file here, including that the headline score matches the per-task scores.

The task set and the pinned judge are what make scores comparable. A different judge is allowed but is marked unpinned. Anything that games the judge is removed with a public note. One PR = one entrant = one JSON file.
