# 🏅 SkillSpec Conformance Registry

A public list of repositories whose skills conform to [SkillSpec](../SKILLSPEC.md). Two
sides of the same standard live in this folder:

- **[README.md](README.md)** certifies **agents** — does your agent *use* skills correctly (discover, restrain, follow structure, self-verify, refuse fabrication)?
- **This file** certifies **skill repositories** — do the skills themselves reach a SkillSpec conformance level (L1 Loadable → L2 Structured → L3 Trustworthy) with a clean security scan?

The point is adoption: SkillSpec is only a standard if repos other than this one can measure themselves against it and prove it. The validator is published (`skillspec-check` on npm) and has no dependencies, so anyone can.

## Earn the badge (any repo, 30 seconds)

```bash
npx skillspec-check skills/ --min-level 3     # gate your CI on L3 (exit 1 if any skill is below)
npx skillspec-check skills/ --badge > badge.json   # emit a shields.io endpoint object
```

The `--badge` output is a [shields.io endpoint](https://shields.io/badges/endpoint-badge) object whose message is the **minimum** level across all your skills (a catalog is only as trustworthy as its weakest skill) and the count. Commit `badge.json` and point a shields endpoint at its raw URL:

```markdown
![SkillSpec](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/<you>/<repo>/main/badge.json)
```

The badge is **earned, not decorative** — it recomputes from your actual skills every CI run, so it can't drift from reality.

## Get listed here

1. Make your repo pass at the level you're claiming: `npx skillspec-check <dir> --min-level <1|2|3>`.
2. PR one entry to [`registry.json`](registry.json):
   ```json
   { "name": "<repo>", "url": "https://github.com/<you>/<repo>", "skills": <n>, "level": <1|2|3>, "verifiedAt": "<YYYY-MM-DD>" }
   ```
3. CI validates your entry's shape (`node conformance/verify-registry.mjs`), and a maintainer runs the one-line validator against your repo — `npx skillspec-check <your repo> --min-level <level>` — to confirm the claimed level before merge. No self-attestation: the level is reproducible by anyone, including you, from the published tool.

## Conformance levels

| Level | Name | Bar |
|---|---|---|
| **L1** | Loadable | Valid frontmatter with a `name` and a decision-useful `description` (an agent can tell *when* to fire it). |
| **L2** | Structured | Declared inputs and a concrete output template — two runs produce the same shape of artifact. |
| **L3** | Trustworthy | L2 **plus** self-verification: `Quality Checks` and `Anti-Patterns`. The skill knows when its own output is wrong. |

All levels also pass the security scan (no instruction-override, exfiltration, or embedded-credential patterns).

## Registry

| Repo | Skills | Level | Verified |
|---|---|---|---|
| [pm-claude-skills](https://github.com/mohitagw15856/pm-claude-skills) | 750 | L3 | 2026-07-21 |
| *(be next — PR above)* | | | |

Honest scope: SkillSpec conformance is **structural + security**, not a quality score. An L3 skill is well-formed and self-checking; whether it's *good* is what the eval `--badge` (measured/unmeasured) on each skill answers separately.
