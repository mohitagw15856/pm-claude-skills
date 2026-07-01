# Publish "PM Skills" as a Custom GPT

A ~10-minute setup that turns the whole library into a Custom GPT in the GPT Store — a new discovery channel with its own search. Everything here is copy-paste; the GPT reads skills live from the hosted API, so it stays current with no maintenance.

## Prerequisites

- A **ChatGPT Plus / Team / Enterprise** account (required to build GPTs).
- The hosted REST API (already live): `https://pm-skills-mcp.pm-claude-skills.workers.dev`.

## Steps

1. Go to **[chatgpt.com/gpts/editor](https://chatgpt.com/gpts/editor)** → **Create**.
2. Open the **Configure** tab and fill in:
   - **Name:** `PM Skills`
   - **Description:** `Produce professional-grade work — PRDs, launch plans, board minutes, postmortems, strategy memos, rubrics, contracts — using 390+ expert Agent Skills.`
   - **Instructions:** paste the entire contents of [`instructions.md`](instructions.md).
   - **Conversation starters** (suggested):
     - `Write a PRD for a referral program`
     - `Draft board minutes from these notes…`
     - `Run a launch-readiness review for my release`
     - `Which skill do I need for a churn analysis?`
   - **Capabilities:** leave Web Search / Canvas on as you like; Code Interpreter optional.
3. Under **Actions**, click **Create new action**:
   - **Authentication:** `None` (the API is read-only and public).
   - **Schema:** paste the entire contents of [`actions-openapi.json`](actions-openapi.json).
   - Confirm the 5 operations appear: `listSkills`, `getSkill`, `searchSkills`, `listWorkflows`, `getWorkflow`.
   - **Privacy policy** (required to publish publicly): `https://mohitagw15856.github.io/pm-claude-skills/privacy.html`
4. **Test** in the preview: ask *"Write a PRD for a B2B referral program."* Confirm the GPT searches, fetches the skill with `format=md`, and follows its structure.
5. Click **Publish** → set visibility to **Everyone** to list it in the GPT Store. Pick a category like *Productivity* or *Writing*.

## Keeping it current

Nothing to redo — the Action calls the live API, which is generated from the same catalog as the site. New skills appear automatically.

## Notes

- The API is unauthenticated and rate-limited; that's fine for a public GPT.
- If you rename the hosted Worker, update the `servers[0].url` in `actions-openapi.json` and re-paste the schema.
