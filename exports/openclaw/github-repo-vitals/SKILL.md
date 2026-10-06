---
name: github-repo-vitals
description: "Read a GitHub repository's vital signs with keyless curl — commit recency, release cadence, issue/PR responsiveness, and bus factor — interpreted into an is-this-project-alive verdict. Use when asked is this repo maintained, check this project before we build on it, how active is this library's development, or compare these repos' health. Produces the vitals with their reads, the responsiveness sampling, the rate-limit-aware command set, and the alive/coasting/abandoned verdict."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/github-repo-vitals.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# GitHub Repo Vitals Skill

The repository is where a project's real pulse shows — registries say what shipped; the repo says whether anyone's home. GitHub's REST API serves the vitals keylessly (60 requests/hour anonymous — enough for a handful of checks, and the skill budgets accordingly): last commit, release cadence, issue responsiveness, contributor spread. The interpretation discipline matters here too: stars measure *attention once*, commits measure *life now*, and an unanswered issue tracker measures the thing adopters actually care about.

## What This Skill Produces

- **The verdict** — alive / coasting / life-support / abandoned, with reasoning
- **The vitals table** — last commit, release recency/cadence, open-issue dynamics, contributor concentration
- **The responsiveness sample** — how recent issues/PRs actually got treated (the tell no summary stat carries)
- **The commands** — each vital's curl, within the anonymous rate budget

## Required Inputs

Ask for these if not provided:
- **The repo** — owner/name; from a package check, the registry metadata's repository URL (chain from [package-health](../package-health/SKILL.md))
- **The stakes** — building on it, contributing to it, or evaluating for a fork: the verdict calibrates ("coasting" blocks adoption of a framework, not of a finished parser)
- **How many repos** — the anonymous budget is ~60 calls/hour; a comparison of five repos is fine, a screening of fifty needs a token (say so rather than degrade)

## Framework: The Vitals and the Budget

1. **The core calls (4–6 per repo):** repo overview: `curl -s "https://api.github.com/repos/OWNER/REPO"` (pushed_at, open_issues_count, archived flag — **archived is the verdict**, stop there) · latest commits: `.../commits?per_page=5` · releases: `.../releases?per_page=5` (cadence from the dates) · recent issues: `.../issues?state=all&sort=created&per_page=10` (responsiveness sampling) · contributors: `.../contributors?per_page=5` (concentration).
2. **Read pushed_at against the project's nature:** a spec implementation quiet for a year ≠ a web framework quiet for a year — same rule as package-health, applied at the repo layer. The `archived` flag and a README deprecation note outrank every other signal.
3. **Sample responsiveness, don't just count:** open_issues_count alone is noise (popular ≈ many open issues); the tell is the *sample*: of the last 10 issues, how many got any maintainer response, and how fast? Ten unanswered issues in a row is the loudest abandonment signal there is — louder than commit age.
4. **Bus factor from contributor spread:** one contributor with 95% of commits is a fact worth naming (with the nuance that solo-maintained excellence is common — it's a risk note, not an indictment); an org-backed repo with recent commits from several people reads differently.
5. **Rate-limit honesty:** anonymous = 60/hour; the skill batches to ~5 calls per repo, reports when the budget shapes the depth, and never silently fails into fabrication — a 403 rate-limit response is reported as exactly that, with the try-later or use-token options.

## Output Format

# Repo Vitals: [owner/name]

**Verdict: [alive / coasting / life-support / abandoned / ARCHIVED] — [two sentences].**

| Vital | Value | Read |
|---|---|---|
[Last push · release cadence · responsiveness sample (n of last 10 answered, typical lag) · contributor spread · archived flag]

[Comparison mode: repos × vitals]

Source: GitHub REST (anonymous, rate-budgeted) · as of [date] · rerun: `[the curls]`
[If rate-limited: the honest report + options]

## Quality Checks

- [ ] The archived flag was checked first and short-circuits everything
- [ ] Responsiveness came from a sample, not the open-issues count
- [ ] Activity age is read against the project's nature
- [ ] Contributor concentration is noted as risk-with-nuance, not indictment
- [ ] The call budget stayed anonymous-friendly and rate limits are reported, never papered over

## Anti-Patterns

- [ ] Do not read stars as health — attention once ≠ maintenance now
- [ ] Do not count open issues as a negative — sample how they're treated instead
- [ ] Do not burn the rate budget on one repo's full history — five calls tell the story
- [ ] Do not fabricate around a 403 — rate-limited is a reportable state
- [ ] Do not condemn quiet-but-finished projects — the nature test applies before the verdict

## Example Trigger Phrases

- "Is this repo maintained?"
- "Check this project before we build on it."
- "How active is this library's development?"
- "Compare these repos health."
