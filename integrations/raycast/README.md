# PM Skills — Raycast Extension

Search the [PM Skills](https://github.com/mohitagw15856/pm-claude-skills) library — professional Agent Skills (PRDs, launch plans, board minutes, postmortems, rubrics, contracts, and hundreds more) — straight from Raycast.

## What it does

- **Search Skills** — fuzzy-search the whole library by name, description, or bundle.
- For any skill:
  - **Run in Playground** (`↵`) — opens it in the browser playground, ready to run.
  - **Copy Run Command** (`⌘R`) — `npx pm-claude-skills run <skill> --text "…"`.
  - **Copy Install Command** (`⌘I`) — `npx pm-claude-skills add --agent claude`.
  - **Copy Skill Name / Playground Link.**

The catalog is fetched live from the hosted playground, so it's always current — no bundled snapshot to keep in sync.

## Develop locally

```bash
cd integrations/raycast
npm install
npm run dev        # opens the command in Raycast in development mode
```

## Publish to the Raycast Store

```bash
npm run build      # type-checks and bundles
npm run publish    # opens a PR against raycastapp/extensions
```

> The `assets/extension-icon.png` shipped here is generated from the repo's `icon.svg`. Replace it with a 512×512 PNG if you want a different mark before publishing.

MIT © Mohit Aggarwal
