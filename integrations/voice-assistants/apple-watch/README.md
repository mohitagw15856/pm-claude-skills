# PM Skills on Apple Watch & Siri (Shortcuts)

No app to install — Apple's **Shortcuts** already does voice, watch, and Siri.
Build a shortcut called **"PM Skill"** and you get: *"Hey Siri, PM Skill"* → speak
your task → it finds the right skill and (with your key) reads back a short draft,
full version handed to your phone. Runs on Watch, HomePod, and iPhone.

## Build it (2 minutes)

Create a shortcut with these actions:

1. **Ask for Input** → Prompt: *"What's the task?"* → store as `Task`.
2. **Get Contents of URL**
   - URL: `https://pm-skills-mcp.pm-claude-skills.workers.dev/v1/search?q=[Task]&limit=1`
   - (URL-encode `Task` with the *Text → URL Encode* action first.)
3. **Get Dictionary Value** → `skills.1.name` → store as `Name`; also grab
   `skills.1.title` as `Title`.
4. **Speak Text** → *"Use the [Title] skill."*
5. **Open URL** → `https://mohitagw15856.github.io/pm-claude-skills/?skill=[Name]`
   (hands the full skill to your iPhone to run).

That's the **no-key** version — pure discovery by voice. Add Siri phrase *"PM
Skill"* in the shortcut settings.

## Optional: read a short draft aloud (bring your own key)

Add, between steps 3 and 4:

3a. **Get Contents of URL**
   - URL: `https://pm-skills-mcp.pm-claude-skills.workers.dev/v1/skills/[Name]`
   - Get Dictionary Value → `instructions` → store as `Sys`.

3b. **Get Contents of URL** (POST to Anthropic)
   - URL: `https://api.anthropic.com/v1/messages`
   - Method: **POST**, Headers: `x-api-key: <your key>`, `anthropic-version: 2023-06-01`,
     `content-type: application/json`
   - Request Body (JSON):
     ```json
     {
       "model": "claude-sonnet-4-6",
       "max_tokens": 300,
       "system": "[Sys]\n\nYou are read aloud on a watch. Answer in under 70 words, plain sentences, no markdown.",
       "messages": [{ "role": "user", "content": "[Task]" }]
     }
     ```
   - Get Dictionary Value → `content.1.text` → **Speak Text**.

Keep your key in the shortcut (it stays on-device) or in a private note the
shortcut reads — never in this repo.

## Why Shortcuts

It's the honest, zero-lock-in path to Watch + Siri: no App Store review, no
server of ours, your key never leaves your devices. The two POST/GET steps are
the same public API the web playground uses.

*A shareable `.shortcut` file can't be committed as text (it's a signed binary),
so this recipe is the canonical, auditable source — build once, share via
iCloud from your device.*
