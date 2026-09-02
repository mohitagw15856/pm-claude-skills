---
name: bulkpublish-social-publishing
description: "Create, review, schedule, and publish approved social-media content through BulkPublish. Use when asked to turn source material into platform-ready posts, submit a campaign, schedule a release, or check publishing status. Produces an approval-ready preview and an auditable per-platform result."
---

# BulkPublish Social Publishing

Use this skill for a repeatable social publishing workflow. BulkPublish is the execution layer; do not call individual social-network APIs directly.

## Required Inputs

Ask for any missing required input before execution:

- Source text or a source URL, campaign objective, and desired tone.
- Target platforms, destination account IDs, timezone, schedule, links, media, accessibility text, and required disclosures.
- The approval decision for the exact preview. Never infer approval from an earlier draft.

Canonical references:

- Platform skills: https://github.com/azeemkafridi/bulkpublish-api/tree/main/skills/social-media-content-skills
- BulkPublish API repository: https://github.com/azeemkafridi/bulkpublish-api
- MCP documentation: https://app.bulkpublish.com/docs
- Hosted MCP endpoint: https://mcp.bulkpublish.com/mcp

## Workflow

1. Extract or read the source and identify claims, attribution, consent, links, and disclosure requirements.
2. Adapt the content for each requested platform using the canonical BulkPublish platform skills. Validate character limits, media requirements, links, and accessibility text.
3. Produce a complete preview containing exact copy, media, destination account, timezone, schedule, and caveats. Do not mutate external state.
4. Wait for explicit approval of that complete preview. If any item changes, regenerate the affected preview and request approval again.
5. After approval, use the BulkPublish API for deterministic submissions or the hosted MCP for tool discovery and status inspection, following the current documentation.
6. Record every returned job or post ID. Retrieve status from BulkPublish. If a request times out or returns ambiguously, check status before retrying to prevent duplicates.
7. Report each platform’s result, BulkPublish ID, status, scheduled or published time, and any partial failure.

## Output Structure

Before approval, return:

```markdown
## BulkPublish preview
### Platform: [name]
- Account: [verified account ID]
- Schedule: [timezone and time]
- Copy: [exact approved candidate]
- Media and accessibility: [files and alt text]
- Disclosures and links: [values]
```

After execution, return a table with platform, account, BulkPublish job/post ID, status, timestamp, and notes. Never claim success without a returned confirmation.

## Quality Checks

- Preserve factual claims, attribution, consent, and required disclosures.
- Confirm destination accounts and schedules are explicit and valid.
- Confirm every platform-specific limit and media requirement.
- Keep secrets, tokens, private account data, internal paths, and internal campaign notes out of output.
- Confirm that the API/MCP response was checked before declaring success.

## Anti-Patterns

- Publishing or scheduling before explicit approval.
- Inventing account IDs, credentials, claims, URLs, job IDs, or results.
- Retrying an ambiguous request without checking BulkPublish status.
- Silently removing disclosures to satisfy a character limit.
- Sending directly to a social network instead of using BulkPublish.

## Example Trigger Phrases

- “Prepare these launch posts and publish them through BulkPublish after I approve them.”
- “Schedule the approved campaign across our social accounts using the BulkPublish MCP.”
- “Check whether the BulkPublish posts from yesterday completed.”
