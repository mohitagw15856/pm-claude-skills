# 🖥 The Cockpit — pm-skills as a desktop app

A [Tauri](https://tauri.app) shell around the full local experience: the playground served from the bundled `web/`, the workspace folder wired natively, and the Nightwatch/subscriptions surfaced in the tray. "Download the app" converts the professionals who will never `npx` anything.

## Status: scaffold complete — building binaries is an owner action
Tauri compiles per-OS with the Rust toolchain; this directory is the press-go project.

```bash
# once: rustup + tauri prerequisites (tauri.app/start/prerequisites)
cd cockpit
npm install
npm run tauri dev      # run it locally
npm run tauri build    # produce the installer for THIS os
```

Release automation: `.github/workflows/cockpit-release.yml.disabled` builds mac/win/linux installers on tag — rename to enable once you've built locally once and are happy (Actions minutes on 3 OS runners are the cost; ~15 min/release).

## What the shell adds over the website
- **Native workspace**: the app statically serves the bundled `web/` AND your chosen workspace dir — the File System Access "connect a folder" step disappears.
- **Tray brief**: the chief-of-staff (`pm-claude-skills brief`) rendered in the tray menu each morning.
- **Offline by default**: everything the PWA caches, guaranteed — it ships in the binary.

Design intent, honestly: v1 is a faithful shell (the web app is the product). Deeper native hooks (global hotkey → command bar, OS notifications for due predictions) are listed in src-tauri/src/main.rs as marked TODOs with the relevant Tauri APIs named.
