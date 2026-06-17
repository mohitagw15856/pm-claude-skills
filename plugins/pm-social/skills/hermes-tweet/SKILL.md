---
name: hermes-tweet
description: "Run read-first X/Twitter research and approval-gated social actions with the Hermes Tweet plugin. Use when planning launch monitoring, social listening, account checks, trend research, or controlled posting workflows in Hermes Agent. Produces an evidence-based findings brief or an action confirmation block before any write."
---

# Hermes Tweet Skill

Use this skill when a social media manager, founder, marketer, or community lead needs X/Twitter research or controlled account workflows through Hermes Agent and the Hermes Tweet plugin.

Hermes Tweet is a native Hermes Agent plugin for X/Twitter workflows. It exposes a read-first toolset:

- `tweet_explore` searches the endpoint catalog without network access.
- `tweet_read` calls catalog-listed read-only endpoints after `XQUIK_API_KEY` is configured.
- `tweet_action` calls write-like or private endpoints only when `HERMES_TWEET_ENABLE_ACTIONS=true` and the user has approved the exact action.

Public install guide: https://github.com/Xquik-dev/hermes-tweet#readme

## Required Inputs

Ask for these if missing:

- **Goal** - social listening, trend research, mention monitoring, account check, campaign research, reply planning, or controlled publishing.
- **Targets** - handles, keywords, tweet URLs, lists, trend category, audience segment, or campaign name.
- **Time window** - today, last 24 hours, campaign window, launch week, or another clear range.
- **Runtime** - local Hermes CLI, Desktop-backed runtime, or remote gateway.
- **Action permission** - read-only by default, or explicitly action-capable.
- **Configuration status** - confirm `XQUIK_API_KEY` is configured where the Hermes runtime executes when read or action calls are needed.

## Workflow

1. Classify the request as read-only or action-capable.
2. Use `tweet_explore` first to find the right endpoint family.
3. Use only catalog-listed endpoint paths returned by `tweet_explore`.
4. Use `tweet_read` for search, trends, timelines, account status, tweet details, monitors, radar, media, draws, exports, or other read-only routes.
5. Keep `tweet_action` disabled for unattended research, scheduled monitoring, and draft planning.
6. Before any `tweet_action`, show the endpoint, method, payload summary, target account, reason, and risk check.
7. Call `tweet_action` only after explicit approval and only when `HERMES_TWEET_ENABLE_ACTIONS=true`.
8. Summarize results with evidence, confidence, gaps, and recommended next steps.

## Output Structure

For research, monitoring, or audit requests, produce:

```markdown
# X/Twitter Findings: [Goal]

**Scope:** [targets, keywords, accounts, timeframe]
**Mode:** Read-only / Action-capable after approval
**Routes used:** [tweet_explore + tweet_read endpoint families]

## Key Signals

| Signal | Evidence | Confidence | Recommended response |
|---|---|---:|---|
| [Finding] | [Metric, post, account, or trend evidence] | [High/Medium/Low] | [Specific next step] |

## Audience and Content Notes

- [What the audience is discussing]
- [Content angles or risks]
- [Accounts or topics to monitor next]

## Gaps

- [Missing data, config, timeframe, or permissions]

## Next Steps

1. [Read-only next step]
2. [Draft or monitoring recommendation]
3. [Action step only if approval is needed]
```

For posting, replies, DMs, follows, monitor changes, webhooks, draw operations, or other account-changing work, stop and show:

```markdown
# Action Confirmation

**Endpoint:** [catalog path]
**Method:** [HTTP method]
**Reason:** [why this action is needed]
**Payload summary:** [plain-language summary, no secrets]
**Target:** [account, tweet, monitor, webhook, or campaign]
**Risk check:** [what could change publicly or privately]

Reply with approval before I call `tweet_action`.
```

## Quality Checks

Before finalizing, verify:

- `tweet_explore` was used before endpoint calls.
- No endpoint path was guessed.
- Read-only work did not call `tweet_action`.
- Any action has explicit approval, reason, payload summary, and target.
- Missing `XQUIK_API_KEY` is described as setup work, not a plugin failure.
- Output contains no API keys, tokens, cookies, private runtime details, or internal implementation claims.

## Example Trigger Phrases

- "Use Hermes Tweet to monitor launch mentions on X this week."
- "Find X/Twitter trends around this topic and summarize the strongest angles."
- "Check my Hermes Tweet account status and tell me what routes are available."
- "Draft replies to these posts, but ask before posting anything."
