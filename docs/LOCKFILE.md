# pm-skills.lock

A skill is a text file, and text files change. `pm-skills.lock` pins the exact contents your project runs on, so a teammate, a CI job or you in six months can tell whether the skills behind a result are the ones you think they are.

```bash
npx pm-claude-skills lock            # write pm-skills.lock in the current directory
npx pm-claude-skills lock --check    # exit 1 if the library or the installed copies no longer match
```

## What is in it

```json
{
  "lockfileVersion": 1,
  "library": "83.2.0",
  "generated": "2026-11-07T09:00:00.000Z",
  "source": ".pm-skills.json",
  "agents": ["claude", "cursor"],
  "lite": false,
  "skills": {
    "prd-template": {
      "sha256": "…of skills/prd-template/SKILL.md in the library…",
      "installed": { "claude": "…of the file written for Claude…", "cursor": "…of the .mdc rule…" }
    }
  }
}
```

- **Which skills:** from `.pm-skills.json` when the project has one (see [TEAMS.md](TEAMS.md)), otherwise from what `add` or `setup` last installed on this machine.
- **Two hashes per skill:** the library source, and the file as written for each agent (lite and rule-file formats differ from the source).
- **`--check` fails** when the library version you run it with ships a different SKILL.md than the one locked, when an installed copy is missing or edited, or when the set itself has changed.

## In CI

```yaml
- run: npx pm-claude-skills@83.2.0 sync --check
- run: npx pm-claude-skills@83.2.0 lock --check
```

Pin the library version in the `npx` call, as you would any other tool; `sync --check` proves the files are present, `lock --check` proves their contents.

## Updating on purpose

Change the library version in `.pm-skills.json` (or just run the newer `npx pm-claude-skills sync`), then run `lock` again and commit the new file. The diff of `pm-skills.lock` shows exactly which skills changed, and `npx pm-claude-skills changelog <skill>` shows why.

## Related

- `verify` checks the hash lockfile that `install <owner/repo>` keeps for third-party skills, and `verify --release` checks installed skills against the signed release SBOM. `lock` is for the curated library and your project.
- `doctor` says how many skills changed in the library since you installed, without needing a lockfile.
