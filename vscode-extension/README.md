# PM Skills — VS Code / Cursor extension

Bring **175 professional Agent Skills** into your editor. Search the catalog and:

- **Insert a skill as context** — drops the skill's full instructions at your cursor, ready to feed Copilot / Cursor inline chat ("now write the PRD using the structure above").
- **Copy a skill** to the clipboard.
- **Open a skill in the Playground** to run it with your own key.

The catalog is fetched live from the project's GitHub Pages, so it's always current.

## Commands
Open the Command Palette (`Cmd/Ctrl+Shift+P`) and type **PM Skills**:
- `PM Skills: Insert a skill as context`
- `PM Skills: Copy a skill to clipboard`
- `PM Skills: Open a skill in the Playground`

## Run it locally (dev)
1. `cd vscode-extension`
2. Open this folder in VS Code and press **F5** ("Run Extension") — a dev window launches with the commands available.

## Package / publish
```bash
npm i -g @vscode/vsce
cd vscode-extension
vsce package                 # produces pm-skills-0.1.0.vsix (installable via "Install from VSIX…")
vsce publish                 # publishes to the Marketplace (needs a publisher + PAT)
```
Cursor uses the same VSIX — install via *Extensions → Install from VSIX…*.

## Links
- Repo: https://github.com/mohitagw15856/pm-claude-skills
- Playground: https://mohitagw15856.github.io/pm-claude-skills/
