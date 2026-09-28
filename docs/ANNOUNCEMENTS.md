# Announcements

One file holds the single current notice: [`announcements/current.json`](../announcements/current.json). It is for things a user has to know or do, such as a command that changed. It is not a changelog and not a place for marketing.

## Where it shows

| Place | How it reads the file |
|---|---|
| `npx pm-claude-skills doctor` | From the package on disk. No network call. |
| The playground | From `web/announcement.json`, a copy on the same origin. A visitor can dismiss it, and that is remembered in their browser only. |

Nothing is fetched from a third party and nothing is sent anywhere.

## The file

No announcement:

```json
{ "schemaVersion": 1, "announcement": null }
```

One announcement:

```json
{
  "schemaVersion": 1,
  "announcement": {
    "id": "mcp-command-package-form",
    "level": "action",
    "title": "The MCP install command changed",
    "body": "One or two plain sentences saying what to do.",
    "url": "https://github.com/mohitagw15856/pm-claude-skills/blob/main/mcp/README.md",
    "from": "2026-09-28",
    "until": "2026-11-30"
  }
}
```

| Field | Rule |
|---|---|
| `id` | kebab-case. Change it for a new notice so that people who dismissed the last one see this one. |
| `level` | `info`, `change` or `action` |
| `title` | Plain text, 80 characters at most |
| `body` | Plain text, 280 characters at most. No markup. |
| `url` | Optional. Must be `https`. |
| `from`, `until` | Dates as `YYYY-MM-DD`. The notice shows on both days and every day between. |

## Changing it

```bash
# edit announcements/current.json, then:
node scripts/check-announcement.mjs          # validates, and writes web/announcement.json
node scripts/check-announcement.mjs --check  # what CI runs
```

An announcement that has passed its `until` date stops showing by itself. The check prints a warning so that someone sets it back to `null`.

## When to use it

- A command, path or name changed and the old one no longer works
- A security fix that needs the user to update
- A deprecation with a date

If it would still make sense in the changelog a year from now, it belongs in the changelog.
