# Example: readme-benefit-writer

## What this skill does

Rewrites a README so every feature reads as a benefit to a named user, with a pitch, a Why section, a quick start, a Your data section and a change log for the author.

## How to trigger it

### Example 1: a local-first notes app

**You say:**
> "Rewrite my README so people get why they'd use it. It's a notes app: Tauri, SQLite, CRDT sync, full-text search, Markdown export. For people who want Notion-style notes without a cloud account."

**Claude produces:**

```markdown
# Inkwell

Inkwell helps writers keep linked notes on their own laptop without signing up for a cloud service.

## Why
If you like Notion's linked pages but not handing your drafts to a server, your options are a
plain text folder (no links, no search) or a cloud account. Inkwell gives you linked pages and
instant search, stored as a file you own.

## What you get
- **Find any note in under a second.** Full-text search runs locally over every note (measured
  on 5,000 notes on a 2021 MacBook Air).
- **Work on a plane, sync when you land.** Edits merge automatically between your devices
  when they next see each other, with no server in the middle.
- **Leave whenever you like.** One click exports every note as plain Markdown.

## Your data
Notes are stored in one SQLite file in your home folder. Nothing is sent over the network
except to your own devices when you turn on sync. Delete the file and the data is gone.
```

| Before | After | Why |
|---|---|---|
| "Built with Tauri and SQLite" | Moved to Contributing | Tech stack is for contributors, not first-time readers |
| "Blazing fast search" | "Under a second on 5,000 notes" | The claim now has a basis |

---

### Example 2: a CLI with no privacy story

**You say:**
> "Make this README convincing: `csvsnap` converts CSV to charts in the terminal."

**Claude produces (excerpt):**

```markdown
csvsnap helps analysts see the shape of a CSV in their terminal without opening a spreadsheet.

## Your data
csvsnap reads the file you point it at and prints a chart. It writes nothing to disk and makes
no network requests.
```

Note to the author: the original README did not say whether `--share` uploads anything. I have
left it out of the pitch until you confirm where shared charts go.

## Tips for best results

- Tell it who the single most likely user is; benefits only make sense for someone.
- Give real numbers if you have them. If not, it will write the benefit without one rather than invent it.
- Paste the whole README so nothing is lost; the change log shows every move.

## Related skills

- `readme-writer`: write a full README from scratch, with badges, usage and install sections.
- `demo-clip-storyboard`: the 20-second video to put at the top of the rewritten README.
