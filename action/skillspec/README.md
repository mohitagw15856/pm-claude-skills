# SkillSpec Conformance Check — GitHub Action

Lint the `SKILL.md` files in **your** repo for [SkillSpec](../../SKILLSPEC.md) conformance (L0–L3) and known security patterns, on every PR. Wraps the published [`skillspec-check`](../../skillspec/) CLI — no API key, no cost.

> Distinct from [`action/certify`](../certify/) (which certifies an *agent's behaviour*): this checks the *skill files themselves*.

## Quick start

```yaml
# .github/workflows/skillspec.yml
name: SkillSpec
on: [pull_request]
jobs:
  conformance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: mohitagw15856/pm-claude-skills/action/skillspec@main
        with:
          path: skills          # where your SKILL.md files live
          min-level: 2           # fail the PR if any skill is below L2
          strict: false
```

## Inputs

| Input | Default | Description |
|---|---|---|
| `path` | `.` | Directory/glob of `SKILL.md` files to check |
| `min-level` | `0` | Fail if any skill is below this level (0 report-only, 1, 2, 3=Trustworthy) |
| `strict` | `false` | Treat warnings as failures |
| `badge` | `false` | Also emit a shields.io endpoint JSON (an *earned* conformance badge) |
| `badge-output` | `skillspec-badge.json` | Where to write the badge JSON |
| `version` | `latest` | `skillspec-check` version to run |

The full report lands in the **job summary**; the step's exit code gates the PR (0 clean · 1 errors / below `min-level`).

## Earn a conformance badge

Set `badge: true`, commit the JSON (or upload it), and point a shields.io endpoint badge at it:

```markdown
![SkillSpec](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/<you>/<repo>/main/skillspec-badge.json)
```

Your repo then advertises the same conformance grade this library holds itself to — that's the point: SkillSpec is a standard anyone can adopt, not a private rule. See the public [conformance registry](../../conformance/REGISTRY.md).

MIT © Mohit Aggarwal
