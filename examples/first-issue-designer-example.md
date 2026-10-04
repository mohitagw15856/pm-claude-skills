# Example: first-issue-designer

## What this skill does

Turns a codebase and roadmap into 8 to 12 good first issues that a newcomer can finish without asking the maintainer anything.

## How to trigger it

### Example 1: a Python CLI before Hacktoberfest

**You say:**
> "Write good first issues for my repo `tidyrss` (Python CLI that cleans RSS feeds). Roadmap: JSON output, better errors, Windows support. I can review about 5 PRs a week. Don't touch the parser, I'm rewriting it."

**Claude produces (excerpt):**

```markdown
**Title:** Add a --json flag to the `list` command

**Context**
People pipe `tidyrss list` into other tools and currently have to scrape the table output.
A JSON option makes the CLI scriptable, which is on the roadmap.

**What to do**
1. Add a `--json` option in `tidyrss/cli.py` next to `--limit`.
2. When set, print `json.dumps([feed.to_dict() for feed in feeds], indent=2)`.

**Acceptance criteria**
- [ ] `tidyrss list --json` prints valid JSON (check with `tidyrss list --json | python -m json.tool`)
- [ ] A test in `tests/test_cli.py` covers an empty list and two feeds
- [ ] The README's usage section mentions the flag

**Files to touch**
- `tidyrss/cli.py` (new option)
- `tests/test_cli.py` (new test)
- `README.md` (one line)

**Effort:** about 1 hour
**Skills needed:** basic Python, no knowledge of the parser
**Labels:** good first issue, cli
```

Mix check: 3 docs, 3 tests, 2 small features, 2 bugs; 6 issues at two hours or less, 1 at half a day.

Dropped from the scan: "Support Atom feeds" (touches the parser you are rewriting) and
"Make errors friendlier" (needs a decision on error codes first; suggested as a discussion).

---

### Example 2: the welcome note

**You say:**
> "Write the pinned note too."

**Claude produces:**

> Welcome! Pick any issue labelled `good first issue`, comment "I'll take this", and it is
> yours for 7 days. Stuck? Ask in the issue; there are no silly questions. I review pull
> requests on Tuesdays and Fridays, so expect a reply within four days.

## Tips for best results

- Name the areas you do not want touched; the scan drops anything near them.
- Be honest about review capacity; the welcome note promises only what you can keep.
- Re-run after each release so the list stays fresh.

## Related skills

- `contributor-guide`: the CONTRIBUTING.md these issues point to.
- `fortnightly-release-planner`: decide which roadmap items stay with the maintainer.
