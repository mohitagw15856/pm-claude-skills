# PM Skills — Alfred Workflow

Search the [PM Skills](https://github.com/mohitagw15856/pm-claude-skills) library from Alfred.

## Use

Type the keyword **`pm`** followed by a query:

```
pm board minutes
pm launch
pm postmortem
```

For the highlighted skill:

| Key | Action |
|-----|--------|
| `↵` | Open the skill in the browser playground |
| `⌘↵` | Copy the `npx pm-claude-skills run <skill> --text "…"` command |
| `⌥↵` | Copy the skill name |

The catalog is fetched **live** from the hosted playground, so results are always current.

## Requirements

- [Alfred](https://www.alfredapp.com/) with the **Powerpack**
- **Node.js** on your `PATH` (the workflow calls `node filter.cjs`). The Script Filter prepends the common Homebrew locations (`/usr/local/bin`, `/opt/homebrew/bin`); if your Node lives elsewhere, edit the Script Filter's `PATH` line.

## Build / install from source

```bash
cd integrations/alfred
./build.sh          # produces dist/PM-Skills.alfredworkflow
open dist/PM-Skills.alfredworkflow   # imports it into Alfred
```

Or double-click the generated `.alfredworkflow` file.

MIT © Mohit Aggarwal
