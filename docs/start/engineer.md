# 🛠️ Start here: engineer

<sub>Part of [PM Skills](../../README.md). Three skills to try first. You can safely ignore everything else for now.</sub>

## Install

```bash
npx pm-claude-skills add --bundle pm-engineering
```

In Claude Code: `/plugin install pm-engineering@pm-claude-skills`. Cursor, Codex, Windsurf, Cline or Zed? Add `--agent cursor` (or `codex`, `windsurf`, `cline`, `zed`).

## Your 3 starter skills

Paste a prompt, add your own details, and the right skill loads by itself.

### 1. [pr-description-writer](../../skills/pr-description-writer/SKILL.md)

A clear PR description from a diff: summary, motivation, changes and how it was tested.

```text
Write a PR description from this diff: ...
```

### 2. [error-decoder](../../skills/error-decoder/SKILL.md)

An error or stack trace in plain English, with the exact fix and how to stop it coming back.

```text
What does this stack trace mean, and how do I fix it? ...
```

### 3. [code-review-checklist](../../skills/code-review-checklist/SKILL.md)

A review checklist tailored to the language, the kind of change and the risk.

```text
Give me a review checklist for this TypeScript PR. It touches login and session handling.
```

## When you are ready

- The full bundle: **[pm-engineering](../../plugins/pm-engineering/)**, from ADRs and RFCs to postmortems, runbooks and SLOs.
- Then: [pm-architecture](../../plugins/pm-architecture/) for system design, [pm-security](../../plugins/pm-security/) for threat models, [pm-tokens](../../plugins/pm-tokens/) to cut the tokens a coding session burns.
- Still unsure? Try the [quiz](../quiz/q1.md) or [another path](README.md).
