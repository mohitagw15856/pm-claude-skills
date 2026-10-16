---
name: "Find the requests you keep making to your AI assistant by sc"
description: "Find the requests you keep making to your AI assistant by scanning Claude Code transcripts and claude.ai exports, clustering them by intent, and ranking each recurring pattern by how promotable it is into a reusable skill. Use when asked what do I keep asking for, scan my transcripts, find repeated prompts, which of my prompts should become skills, or to start the promote loop. Produces a ranked report of recurring patterns with frequency, redacted example prompts, the variation between them, and a promotability score."
---

# Promoter Scan

Most people have five or six prompts they type every week with small variations. Each one is a skill that has not been written down yet. This skill reads your own transcripts, groups the requests by what they are trying to do, and ranks the groups by how much they would gain from becoming a skill: often asked, phrased consistently, with clear inputs and outputs.

It is the first step of the promote loop: scan, draft, test, publish. The `/promote` command runs the whole loop.

## What This Skill Produces

- **A ranked table of recurring patterns**: name, how many times it was asked, a promotability score from 0 to 100, and the three components behind it (frequency, consistency, clear inputs and outputs)
- **Per pattern, up to three example prompts**, redacted, plus a one-line reading of the variation between them and a verdict: promote, maybe, leave
- **A JSON version of the same report** for the draft step, so nothing is retyped

## Required Inputs

Ask for these if not provided:
- **Where the transcripts are.** Claude Code keeps session transcripts as `*.jsonl` under `~/.claude/projects/<project>/`. A claude.ai export is a `conversations.json` inside the downloaded archive. Either or both work; a folder is fine.
- **The minimum count worth reporting** (default 3) and, if the user wants, a date range to limit the scan
- **Anything that must never appear in the report** beyond the built-in redaction (client names, project codenames)

## Framework: Promotability

A pattern is worth promoting when all three are true:

| Component | Weight | High when |
|---|---|---|
| Frequency | 50% | it comes up often relative to everything else the user asks |
| Consistency | 30% | the prompts share vocabulary; the same job, not a family of jobs |
| Clear inputs and outputs | 20% | the prompts say what goes in ("from this git log") and what comes out ("as a table") |

Verdicts: 60 and above is promote; 35 to 59 is maybe, usually a family that needs splitting into two skills; below 35 is leave alone.

**Redaction is not optional.** Emails, phone numbers, card and account numbers, API keys, tokens, passwords and URLs are replaced before anything is written to the report. If the user names extra terms to strip, strip them too. When in doubt, paraphrase the example rather than quote it.

## Programmatic Helper

`scripts/promoter_scan.py` does the reading, redaction, clustering and scoring. Stdlib only.

```bash
python3 skills/promoter-scan/scripts/promoter_scan.py ~/.claude/projects/my-project --json scan-report.json
python3 skills/promoter-scan/scripts/promoter_scan.py ~/Downloads/claude-export/conversations.json --min-count 4
```

It prints the markdown report and, with `--json`, writes the clusters for the draft step. Run it first; use the output as the evidence, then add the human reading of each pattern that the script cannot give (whether two clusters are really one job, whether a high scorer is actually a one-off spree).

## Output Format

### Promoter scan: [source], [N] user turns, [date range]

| # | Pattern | Times | Score | Frequency | Consistency | Clear I/O |
|---:|---|---:|---:|---:|---:|---:|

### 1. [pattern name] (score, times)
Example prompts (redacted):
- ...
- ...
- ...

Variation: [low / medium / high, and what varies: the source material, the audience, the format].
Verdict: **[promote / maybe / leave]**, because ...
Suggested skill name: `[kebab-name]`

### What to promote first
[The one pattern with the best score-to-effort ratio and why]

## Quality Checks
- [ ] Every example prompt has been through redaction and contains no email, key, number sequence or URL
- [ ] Each pattern is one job; families ("summarise X" for five different Xs) are flagged as maybe with a note on how to split
- [ ] The score components are shown, not just the total
- [ ] One-off sprees (ten asks in one afternoon, never again) are called out rather than promoted
- [ ] A suggested skill name is given for every promote verdict, checked against the library for collisions

## Anti-Patterns
- **Quoting a prompt verbatim because it looked harmless.** Redact first, judge later.
- **Promoting by frequency alone.** Fifty variations of "help" are not a skill.
- **Merging jobs that share a verb.** "Summarise a thread" and "summarise a paper" want different frameworks.
- **Scanning other people's transcripts.** The loop is for the user's own usage, with their consent to read it.

## Example Trigger Phrases
- "What do I keep asking Claude for?"
- "Scan my transcripts and tell me which prompts should be skills."
- "Find my repeated prompts from the last month."
- "Start the promote loop on my Claude Code sessions."
