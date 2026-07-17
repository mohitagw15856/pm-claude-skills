# Publishing to the stores (owner runbook, ~15 min once)

The packaged extension is ready: `pm-skills-0.1.0.vsix` (also on your Desktop). Two stores, both free:

## VS Code Marketplace (the big one)
1. https://marketplace.visualstudio.com/manage → sign in with Microsoft → create publisher `mohitagw15856` (must match package.json).
2. Get a Personal Access Token: https://dev.azure.com → User settings → PATs → new token, org "All accessible", scope **Marketplace → Manage**.
3. `npx @vscode/vsce login mohitagw15856` (paste the PAT), then `npx @vscode/vsce publish` from `vscode-extension/`.
4. Future releases: bump version in package.json → `vsce publish` again (or `vsce publish patch`).

## Open VSX (Cursor/VSCodium/Windsurf users install from here)
1. https://open-vsx.org → sign in with GitHub → Settings → Access Tokens → new token.
2. `npx ovsx publish pm-skills-0.1.0.vsix -p <token>`

Listing copy, categories and screenshots: reuse the README; category **AI** + **Snippets**; add the playground GIF from `web/docs-assets/`.
