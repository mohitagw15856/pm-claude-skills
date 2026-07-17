# 🧠 PM Skills Document Reviewer — a senior reviewer on every PR

Reviews pull requests that touch **professional documents** — PRDs, postmortems, RFCs/ADRs, runbooks, changelogs, READMEs, launch plans, OKRs — against the matching skill's own quality checks, anti-patterns, and scoring rubric from the [520-skill library](https://github.com/mohitagw15856/pm-claude-skills). Code is never reviewed; builds are never failed. One comment per PR, updated in place.

## Install (2 minutes)

```yaml
# .github/workflows/pm-skills-review.yml
name: PM Skills review
on:
  pull_request:
    paths: ['**.md', '**.markdown', '**.rst', '**.txt']
permissions:
  contents: read
  pull-requests: write
jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: mohitagw15856/pm-claude-skills/action/review@main
        with:
          api_key: ${{ secrets.ANTHROPIC_API_KEY }}
```

Add `ANTHROPIC_API_KEY` as a repo secret. Typical cost: ~$0.01–0.05 per reviewed document on Sonnet.

## What it does — and refuses to do

- **Reviews** documents whose filenames signal a known artifact type (postmortem, PRD, RFC/ADR, runbook, changelog, README, GTM/launch plan, board update, OKRs). Max 3 per PR (`max_files`).
- **Scores** against the skill's published 0–40 rubric where one exists, and cites the skill's own anti-patterns in findings.
- **Never fails your build** — the verdict is advice; gating on writing quality is a human's call.
- **Your key, your data** — the document goes from your repo to Anthropic on your secret; this project sees nothing.

## Why trust the rubric

Every skill it reviews against is open, [SkillSpec](https://github.com/mohitagw15856/skillspec)-validated at L3 (self-verifying structure), and versioned in public. The review comment names the exact skill used — read it, disagree with it, or PR it.
