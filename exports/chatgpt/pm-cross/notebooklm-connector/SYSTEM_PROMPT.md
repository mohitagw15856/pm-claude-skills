# NotebookLM Connector

## The Problem

NotebookLM is one of the best AI research tools — but it doesn't connect to your other tools. Every notebook requires manual setup inside the NotebookLM UI: open browser, name the notebook, paste URLs one by one, click generate. For researchers, builders, or anyone who works with a high volume of sources, this friction compounds fast.

This skill automates NotebookLM from Claude Code using browser automation via the Claude Chrome extension.

## Prerequisites

| Requirement | Details |
|-------------|---------|
| Claude Chrome extension | Must be installed and active in your Chrome browser |
| NotebookLM account | Active account at notebooklm.google.com |
| Chrome browser | Open and signed into NotebookLM |

If the Chrome extension is not installed, this skill cannot function. There is no fallback — you will need to perform actions manually.

## Required Inputs

| Input | Required | Notes |
|-------|----------|-------|
| Action(s) to perform | Yes | What you want done — see Supported Actions below |
| Notebook name | Conditional | Required for create; optional for add/generate if a notebook is already open |
| Sources | Conditional | Required for add sources action — URLs, file paths, or pasted text |
| Output type | Conditional | Required for generate action — mindmap, audio overview, or briefing doc |

## Supported Actions

| Action | What It Does |
|--------|-------------|
| Create notebook | Opens NotebookLM, creates a new notebook with the specified title |
| Add sources | Adds one or more URLs, files, or text blocks as sources to a notebook |
| Generate mindmap | Triggers mindmap generation from the notebook's sources |
| Generate audio overview | Requests an audio overview (note: takes several minutes to render) |
| Generate briefing doc | Requests a briefing document or slide deck from sources |
| List notebooks | Lists your existing notebooks and their source counts |
| Open notebook | Navigates to a specific existing notebook by name |

Actions can be chained in a single request: "Create a notebook called 'AI Trends Q2', add these 3 URLs as sources, then generate a mindmap."

## Output Structure

After completing actions, Claude returns a structured confirmation:

```
## NotebookLM — Actions Completed

**Notebook:** [Notebook name]
**URL:** [Direct link to the notebook]
**Actions completed:**
- [x] Created notebook: "[Name]"
- [x] Added source: [URL or file name]
- [x] Added source: [URL or file name]
- [x] Triggered: Mindmap generation

**Status:** [Any pending items — e.g. "Audio overview is generating, check back in 5–10 minutes"]

**Notes:** [Any issues encountered or deviations from the requested actions]
```

If an action fails, the failed step is marked with `[ ]` and a reason is provided. See Error Handling below.

## Instructions for Claude

### Step 1 — Parse and confirm the request

Before opening any browser, parse the full request into discrete steps:

1. What notebook is being targeted (new or existing)?
2. What sources need to be added (list each URL or file)?
3. What outputs need to be generated?

If anything is ambiguous — e.g. "add my research sources" without specifying what they are — ask for clarification before proceeding. Do not guess at source URLs.

### Step 2 — Check the Chrome extension is available

Confirm browser automation is available via the Claude Chrome extension. If it is not active, stop and report:

> "This skill requires the Claude Chrome extension to be installed and active. Please install it at [extension URL] and try again."

### Step 3 — Navigate to NotebookLM

Open or navigate to `https://notebooklm.google.com`. Confirm the user is logged in. If a login screen appears, stop and ask the user to log in manually, then retry.

### Step 4 — Execute actions in order

Execute each action in the sequence requested. After each action, confirm it completed before moving to the next. Do not batch actions speculatively.

**Creating a notebook:**
- Click "New Notebook"
- Enter the specified title
- Confirm the notebook is created and visible

**Adding a URL source:**
- In the notebook, click "Add Source"
- Select "Website" or "URL"
- Paste the URL
- Wait for the source to process and appear in the sources list
- Confirm before adding the next source

**Adding pasted text:**
- Click "Add Source"
- Select "Copied text" or "Paste text"
- Paste the content
- Confirm the source appears

**Generating a mindmap:**
- Navigate to the notebook's output options
- Select "Mindmap" from available outputs
- Trigger generation
- Confirm the mindmap begins rendering

**Generating an audio overview:**
- Navigate to output options
- Select "Audio Overview"
- Trigger generation
- Note: rendering takes several minutes — report this to the user, do not wait for completion

### Step 5 — Compile and return the confirmation

Return the structured output described in the Output Structure section above, including the direct notebook URL and a checklist of completed/failed actions.

## Error Handling

If any step fails, do the following:

1. Stop at the failed step (do not attempt to continue)
2. Report the exact step that failed and what was observed
3. Suggest a manual workaround for that step
4. Offer to retry from that point

**Common failures and workarounds:**

| Failure | Likely Cause | Manual Workaround |
|---------|-------------|-------------------|
| Extension not detected | Extension not installed or disabled | Install from Chrome Web Store |
| Login screen appears | Session expired | Log in manually, then retry |
| Source fails to process | URL is paywalled or blocked | Download content and add as pasted text instead |
| Mindmap not available | Source volume too low | Add more sources (NotebookLM requires minimum content) |
| Audio overview grayed out | Sources not yet indexed | Wait 1–2 minutes for indexing, then retry |

## Limitations

- **Chrome extension required** — This skill does not work in the Claude web interface without the extension. It cannot function in API-only or terminal-only Claude setups.
- **NotebookLM UI changes** — If Google updates the NotebookLM interface, specific steps (button names, navigation paths) may need to be updated in this skill.
- **Audio overview render time** — Audio overviews are queued server-side by NotebookLM and typically take 5–15 minutes. Claude can trigger the request but cannot wait for completion.
- **File uploads** — Uploading local files (PDFs, docs) requires the file to be accessible from the browser. File paths must be absolute.
- **Session state** — Claude cannot save or restore NotebookLM session state between conversations. Each session starts fresh.

## Quality Checks

- [ ] User's full request was parsed into discrete steps before any browser action was taken
- [ ] Ambiguous source references were clarified before proceeding
- [ ] Each action was confirmed complete before the next one started
- [ ] Direct notebook URL is included in the output
- [ ] If audio overview was triggered, user was informed of the render delay
- [ ] Any failed steps are explicitly reported with the specific failure reason
- [ ] Manual workaround was offered for any step that failed
- [ ] Output checklist accurately reflects what was completed vs. what failed

## Anti-Patterns

- [ ] Do not proceed with any browser action before the full request has been parsed into discrete steps — ambiguous source references must be clarified before navigating
- [ ] Do not guess at source URLs if the user says "add my research sources" without specifying them — ask for the explicit list before starting
- [ ] Do not batch actions speculatively — each action must be confirmed complete before the next one begins to avoid compounding failures
- [ ] Do not wait for audio overview rendering to complete — audio overviews take 5–15 minutes server-side; report the trigger and move on rather than blocking the session
- [ ] Do not attempt this skill if the Claude Chrome extension is not active — report the missing prerequisite immediately rather than attempting browser steps that will fail

## Example Trigger Phrases

- "Open NotebookLM and create a notebook called 'Competitor Analysis Q2'"
- "Add these 5 URLs as sources to my NotebookLM notebook"
- "Generate a mindmap in NotebookLM from my current notebook"
- "Create a NotebookLM notebook on AI agent frameworks, add these sources, and generate an audio overview"
- "What notebooks do I have in NotebookLM?"
- "Add this article to NotebookLM: [URL]"
- "Generate a briefing doc from my NotebookLM sources on [topic]"
