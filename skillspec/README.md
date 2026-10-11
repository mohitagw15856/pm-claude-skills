# skillspec-check — the eslint for SKILL.md

Validate **any repo's** Agent Skills against [SkillSpec](https://github.com/mohitagw15856/pm-claude-skills/blob/main/SKILLSPEC.md) — the conformance standard behind the [pm-claude-skills](https://github.com/mohitagw15856/pm-claude-skills) library and its community registry.

```bash
npx skillspec-check                    # scan the current directory for SKILL.md files
npx skillspec-check skills/            # a specific tree
npx skillspec-check --min-level 2      # CI gate: every skill must be at least L2 Structured
npx skillspec-check --strict --json    # warnings fail; machine-readable output
```

## What it checks

| Level | Requires |
|---|---|
| **L1 Loadable** | Valid frontmatter: kebab-case `name` matching the folder, a `description` with **"Use when …"** trigger conditions (that's what makes auto-discovery work) |
| **L2 Structured** | Declared inputs ("Required Inputs" / "What This Skill Produces") and an Output section |
| **L3 Trustworthy** | L2 + **Quality Checks** and **Anti-Patterns** — the skill can verify its own output |

Plus, at every level, the **security scan** the curated library bans on: prompt-injection phrasing, unvetted network calls, data-exfiltration instructions, embedded credentials. Security findings are always errors.

## The badge

Wear your conformance level — this renders a live-graded shield for any public repo:

```markdown
![SkillSpec](https://img.shields.io/endpoint?url=https%3A%2F%2Fpm-skills-mcp.pm-claude-skills.workers.dev%2Fbadge%3Frepo%3DYOURUSER%2FYOURREPO)
```

The badge service grades the skills your repo ships and reports the **minimum** level across them (a chain is as strong as its weakest link). It looks in `skills/` or `.claude/skills/` when you have one, and otherwise everywhere except translation, example, test and build folders. Add `%26path%3Dyour%2Fskills%2Fdir` to point it at a folder, or `%26ref%3Dv2` for a tag. Repos with more than 40 skills are graded on an even sample of 40 and say so. Results are cached for 6 hours.

## CI in one line

```yaml
- run: npx skillspec-check --min-level 1   # add to any workflow; exits 1 on findings
```

## pre-commit

```yaml
repos:
  - repo: https://github.com/mohitagw15856/pm-claude-skills
    rev: v44.0.0
    hooks:
      - id: skillspec
```

Zero dependencies, Node ≥ 18. Exit codes: `0` clean · `1` errors / below `--min-level` / warnings with `--strict` · `2` usage.
