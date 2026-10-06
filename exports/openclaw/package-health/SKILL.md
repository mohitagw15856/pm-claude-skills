---
name: package-health
description: "Check a package's health before you depend on it — npm and PyPI registry APIs via keyless curl: downloads, release recency, maintenance signals, and the dependency-decision read. Use when asked is this npm package maintained, check this PyPI library before we adopt it, compare these two packages, or is this dependency abandoned. Produces the health read with the signals interpreted (not just listed), the numbers with their commands, and the adopt/avoid/vendor recommendation framing."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/package-health.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Package Health Skill

Adding a dependency is hiring code you'll never interview — and the registries publish the résumé keylessly: last release date, download trajectory, version cadence, maintainer count. This skill pulls the signals for npm and PyPI over plain curl and does the part the raw numbers don't: interpretation. A package with no release in three years is *abandoned or finished* — and which one it is depends on what the package does. The output is a read, not a dashboard.

## What This Skill Produces

- **The health read** — maintained / stable-and-done / drifting / abandoned — with the reasoning
- **The signals table** — latest version + date, download scale, release cadence, deprecation flags
- **The comparison** — for adoption decisions between candidates, same signals side by side
- **The commands** — every number's curl, rerunnable

## Required Inputs

Ask for these if not provided:
- **The package(s) and ecosystem** — npm or PyPI; exact names (typosquats are a real hazard — the exact-name check is part of the job, and a near-miss name is a 🔴 finding, not a typo to auto-correct)
- **The role it would play** — a core dependency, a dev tool, a one-function utility: the stakes calibrate the read ("finished" is fine for a slugify; concerning for a crypto library)
- **The runtime context** — versions/platforms that matter for compatibility checking

## Framework: The Signals and the Reads

1. **npm calls:** latest: `curl -s "https://registry.npmjs.org/express/latest"` (version, dependencies, deprecation notices) · full metadata: `curl -s "https://registry.npmjs.org/express"` (`time` object = the whole release history — cadence lives here; `maintainers`) · downloads: `curl -s "https://api.npmjs.org/downloads/point/last-month/express"`.
2. **PyPI calls:** `curl -s "https://pypi.org/pypi/requests/json"` — `info` (version, requires_python, project_urls, yanked flags), `releases` (the dated history). Downloads for PyPI live at `https://pypistats.org/api/packages/<name>/recent` (keyless).
3. **Interpret age against purpose:** no-release-in-3-years = abandoned for an API client (upstream APIs moved), plausibly *finished* for a pure algorithm. The read must say which and why — this rule is the skill's whole value over a stats page.
4. **The signal cluster beats any single number:** healthy = recent releases + steady cadence + real downloads + active repo (chain to [github-repo-vitals](../github-repo-vitals/SKILL.md) via the metadata's repository URL). Warning shapes: downloads huge but releases stopped (the ecosystem is riding a corpse — someone will fork; watch which), single maintainer + critical role (bus-factor flag, not a disqualifier), deprecation notice in the registry (the maintainer's own verdict — believe them).
5. **The decision framing, not the decision:** adopt / adopt-and-monitor / vendor-the-function (for one-function utilities, fifty lines beats a dependency) / avoid — recommended with reasoning, stakes-calibrated; security auditing is its own discipline and gets named as out of scope rather than faked.

## Output Format

# Package Health: [name] ([ecosystem])

**The read: [maintained / stable-and-done / drifting / abandoned] — [two sentences of reasoning].**

| Signal | Value | Read |
|---|---|---|
[Version + date · release cadence · downloads/month · maintainers · deprecation/yank flags]

[Comparison mode: candidates × signals, same table, verdict per role]

**Recommendation frame:** [adopt / monitor / vendor / avoid — with the stakes reasoning]
Source: [registry] APIs · as of [date] · rerun: `[the curls]`
*Registry signals, not a security audit — that's a separate discipline.*

## Quality Checks

- [ ] The exact package name was verified — near-miss names flagged, never auto-corrected
- [ ] The read interprets age against the package's purpose, not against a universal freshness bar
- [ ] Warning shapes (riding-a-corpse, bus-factor, registry deprecation) are checked
- [ ] The repo-vitals chain is offered when the registry signals are ambiguous
- [ ] Security audit is scoped out explicitly, not implied

## Anti-Patterns

- [ ] Do not present a stats dump as a health check — the read is the product
- [ ] Do not treat "old" as "dead" without the purpose test — finished software exists
- [ ] Do not auto-correct package names — typosquats are the attack this check can catch
- [ ] Do not extrapolate download counts into quality — popularity is a signal about forks and eyes, not correctness
- [ ] Do not answer from memory — versions and deprecations are live facts; fetch or hand over the commands

## Example Trigger Phrases

- "Is this npm package maintained?"
- "Check this PyPI library before we adopt it."
- "Compare these two packages."
- "Is this dependency abandoned?"
