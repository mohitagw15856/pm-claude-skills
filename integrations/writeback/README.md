# Write-back to real tools

The playground makes the artifact. This closes the last mile — it puts that
artifact **where the work actually lives**: a GitHub issue, a Notion page, a
Linear ticket, a Slack message. One `POST`, one destination adapter.

It's a **thin, honest relay**. It stores nothing. You send it finished markdown
plus a destination; it calls that tool's API with a token **you** hold (a Worker
secret) and hands back the created object's URL.

## API

```
POST /writeback
{
  "dest": "github",                 // github | notion | linear | slack | jira | confluence
  "title": "Q3 launch postmortem",
  "markdown": "## What happened\n…",
  "target": { "repo": "acme/app", "labels": ["ai-drafted"] }
}
→ { "ok": true, "dest": "github", "url": "https://github.com/acme/app/issues/42" }
```

### `target` per destination

| dest | required `target` fields |
| --- | --- |
| `github` | `repo` (`"owner/name"`), optional `labels` |
| `notion` | `database_id` **or** `page_id` |
| `linear` | `team_id` |
| `jira` | `project_key` (for example `"PAY"`), optional `issue_type` (default `Task`) and `labels` |
| `confluence` | `space_id` (numeric), optional `parent_id` |
| `slack` | `channel` (id or name the bot is in) |

## Deploy

```bash
cd integrations/writeback
npm install
npx wrangler deploy
# then set only the tokens you'll use:
npx wrangler secret put GITHUB_TOKEN
npx wrangler secret put NOTION_TOKEN
npx wrangler secret put LINEAR_TOKEN
npx wrangler secret put SLACK_BOT_TOKEN
```

## Wire it to the playground

Any page that produces markdown can offer a **"Send to…"** button that POSTs the
artifact here. Example:

```js
await fetch('https://pm-skills-writeback.<you>.workers.dev/writeback', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ dest: 'notion', title, markdown, target: { database_id: DB } }),
});
```

## Honest scope

- Each adapter is a **real** API call (Issues, `pages`, `issueCreate`,
  `chat.postMessage`) — not a stub. What's left to you is provisioning the token
  and choosing the target; those are yours to hold, by design.
- Notion write splits the markdown into paragraph blocks (it doesn't round-trip
  full rich formatting — headings/tables land as text). Good enough to capture
  the draft; polish in-tool.
- Add a destination by writing one `async fn(env, {title, markdown, target})`
  that returns `{ url }` and registering it in `ADAPTERS`.

MIT © Mohit Aggarwal

## Jira and Confluence

Both use one Atlassian Cloud site and one API token. Set the secrets `ATLASSIAN_EMAIL` and `ATLASSIAN_TOKEN`, and the variable `ATLASSIAN_SITE` (for example `your-team.atlassian.net`).

The site comes from that variable only. A request cannot name the host, so nobody who can reach the relay can have your token sent somewhere else. The markdown is sent as plain paragraphs: headings and tables arrive as text, not as formatted Jira or Confluence blocks.

The request builders are covered by tests in `tests/checks/writeback-atlassian.mjs`. They have not been run against a live Atlassian site from this repository, so treat the first use as a test and check the created issue or page.
