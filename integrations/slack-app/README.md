# PM Skills — Slack app

Run a professional skill without leaving Slack:

```
/skill executive-update  churn up 2pts, shipped referral, hiring paused
/skill a postmortem for Friday's outage        ← auto-matches the skill
/skill ? pricing email                          ← search only, don't run
```

The drafted artifact posts back into the channel. Verifies Slack's request
signature; runs the skill with **your** `ANTHROPIC_API_KEY` (a Worker secret) —
nothing routes through anyone else.

## Deploy

```bash
cd integrations/slack-app
npm install
npx wrangler deploy
npx wrangler secret put SLACK_SIGNING_SECRET   # from your Slack app's Basic Info
npx wrangler secret put ANTHROPIC_API_KEY      # to actually run skills
```

## Create the Slack app

1. api.slack.com → **Create New App** → *from manifest* → paste
   [`manifest.json`](manifest.json).
2. Set the `/skill` command URL to your deployed Worker URL.
3. Install to your workspace, copy the **Signing Secret** into the Worker secret
   above.

## Behaviour

- Slack requires a reply within 3s, so the app acks immediately (“Running…”) and
  posts the finished draft asynchronously via `response_url`.
- Without `ANTHROPIC_API_KEY` it still **finds** the right skill and tells you
  which — search works with no key.
- Search-only (`/skill ? …`) never calls the model.

## Honest scope

Real, deployable Worker: signature verification, async response, live calls to
the public skills API and (with your key) the model. What you provide is the
Slack app registration and the two secrets.

MIT © Mohit Aggarwal
