# PM Skills for VS Code

Find a skill from the editor and put its instructions where you are working.

| Command | What it does |
|---|---|
| **PM Skills: Find a skill and copy it** | Search in your own words, pick a skill, and copy its instructions (with your task underneath) to the clipboard, ready to paste into any assistant's chat |
| **PM Skills: Find a skill and insert it here** | The same, inserted at the cursor, or into a new Markdown document if no editor is open |
| **PM Skills: Find a skill and open its source** | Opens the skill's `SKILL.md` on GitHub |

It reads the public PM Skills API (`/v1/search` and `/v1/skills/{name}`) and nothing else. No key, no account and no telemetry. Your search text is sent to that API to find matching skills; nothing from your files is sent.

## Try it

1. Open this folder in VS Code: `code integrations/vscode`
2. Press F5 to start an Extension Development Host.
3. Open the command palette and run **PM Skills: Find a skill and copy it**.

To install it permanently, package it with `npx @vscode/vsce package` and install the `.vsix` from the Extensions view.

## Status

The search, formatting and address-building logic is covered by tests in `tests/checks/vscode-extension.mjs`. The extension has not been run inside VS Code from this repository and is not published to the Marketplace. If a command misbehaves, please open an issue with what you typed.

MIT © Mohit Aggarwal
