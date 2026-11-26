# PM Skills for n8n

Two workflow templates that bring the library into [n8n](https://n8n.io). Import either one from the workflow menu (Import from File).

| File | What it does | Needs a key? |
|---|---|---|
| [`find-and-fetch-skill.json`](find-and-fetch-skill.json) | Searches the catalogue for a plain-language need and fetches the best match with its full instructions. | No |
| [`run-skill-webhook.json`](run-skill-webhook.json) | A webhook that takes `{ "skill": "executive-update", "input": "your notes" }`, fetches that skill, runs it on your own Anthropic account and replies with the finished document. | Yes, yours |

## How they work

Both read from the public API at `https://pm-skills-mcp.pm-claude-skills.workers.dev` (`/v1/search` and `/v1/skills/{name}`), which needs no key. See [`../api/README.md`](../api/README.md) for the routes.

**Run a skill** chains three calls: get the skill's `instructions`, send them as the system prompt with your input as the user message, and return the text. The model call uses n8n's own **Anthropic** credential, so your key is stored by n8n and never appears in the workflow file. Nothing is sent to this project's servers except the skill lookup.

## Setting up the webhook template

1. Import `run-skill-webhook.json`.
2. Open the **Run it on your model** node and choose your Anthropic credential (create one under Credentials if you have none).
3. Change the model id in that node's body if you prefer a different one.
4. Activate the workflow and call it:

```bash
curl -X POST 'https://YOUR-N8N/webhook/pm-skill' \
  -H 'content-type: application/json' \
  -d '{"skill":"executive-update","input":"Launch slipped two weeks because of the payments audit."}'
```

Put the webhook behind n8n's authentication options before exposing it: anyone who can call it spends your model credit.

## Status

These files follow n8n's workflow export format and are checked in this repository for structure (valid JSON, every connection points at a real node, no credentials embedded). They have not been run against a live n8n instance from here, because that needs an n8n server and a paid model call. If n8n offers to upgrade a node version on import, accept it and check the node's fields.

MIT © Mohit Aggarwal
