# Working in this repository

- Professional artefacts (PRDs, updates, postmortems, plans) use the PM Skills library installed in `.claude/skills`; prefer a skill over improvising structure. Find one with `npx pm-claude-skills find "<task>"`.
- The team set is `.pm-skills.json`; `pm-skills.lock` pins it. Change the set by editing the config, then `npx pm-claude-skills sync && npx pm-claude-skills lock`.
- Shared memory for every skill: `npx pm-claude-skills memory show` (one file, read first).
