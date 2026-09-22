# The promote loop: from "I keep asking for this" to a skill with tests

Every week you type a handful of prompts that are really the same job with different inputs. The promote loop turns those into skills in this library: written once, triggered by the phrases you already use, tested, and released with the rest of the catalogue.

Four skills, one command:

| Step | Skill | What it does | What you get |
|---|---|---|---|
| 1 | `promoter-scan` | Reads your Claude Code transcripts (`~/.claude/projects/**/*.jsonl`) or a claude.ai export, redacts secrets and personal data, clusters requests by intent, scores each cluster | A ranked report: pattern, times asked, score, redacted examples, verdict |
| 2 | `promoter-draft` | Turns one pattern into a complete SKILL.md with three worked examples generalised from your prompts, plus the bundle stanza | A skill folder anyone can use |
| 3 | `promoter-test` | Writes positives, near-miss negatives and goldens; measures precision and recall of the trigger description; rewrites until precision clears 0.8 | `evals.json`, a library eval case, the numbers |
| 4 | `promoter-publish` | Wires the bundle, regenerates the catalogue and exports, bumps the count and version, writes the CHANGELOG, prints the commands | The full release package and a confirmation prompt |

`/promote <path>` runs all four in order, pausing once to ask which pattern to promote and once before pushing.

## An end-to-end example

The fixture in `examples/promoter/` is a synthetic Claude Code transcript: 43 user turns over three weeks, with a few secrets planted to prove the redaction.

### 1. Scan

```bash
python3 skills/promoter-scan/scripts/promoter_scan.py examples/promoter --json scan.json
```

```
| # | Pattern                          | Times | Score |
|---|----------------------------------|------:|------:|
| 1 | write release notes log          |    14 |    82 |
| 2 | draft update notes stakeholder   |     6 |    71 |
| 3 | summarise thread decisions owners|     5 |    60 |
```

The planted secrets came out as `[api-key]`, `[email]`, `[phone]`, `[card]` and `password: [redacted]`. The report is in `examples/promoter/scan-report.md`.

Pattern 1 is the obvious promote: asked fourteen times, consistent vocabulary ("release notes", "git log"), and the prompts say what goes in and what comes out.

### 2. Draft

The user's own phrasings become the trigger. The description the draft step writes:

> Turn a git log into user-facing release notes grouped by feature and fix. Use when asked for release notes from this git log, a changelog entry from these commits, or to turn commits into release notes. Produces a grouped changelog with one line per change and a short headline.

The three worked examples are the user's prompts with the product name and version numbers made generic. The corrections the user kept making ("shorter", "group by feature", "user-facing tone") become quality checks.

### 3. Test

`evals.json` holds six positives ("release notes for v3 from the git log", "changelog entry from these commits" ...), five negatives including the near miss "write the announcement post for the launch", and three goldens. Both files are in `examples/promoter/drafted-skill/`.

```
python3 skills/promoter-test/scripts/promoter_test.py examples/promoter/drafted-skill/SKILL.md examples/promoter/drafted-skill/evals.json
precision 1.0  recall 1.0  (threshold 0.34)
```

Above 0.8, so no rewrite. When a run comes in low, `--rewrite` proposes the amended "Use when" clause and shows the new numbers.

### 4. Publish

```
node scripts/new-bundle.mjs --name pm-release --desc "..." --skills release-notes-from-git-log
node web/build-skills.mjs && node scripts/build-exports.mjs && ...   # the generators
node scripts/skillcheck.mjs && node scripts/check-drift.mjs && ...   # the gates
```

The package lists every file touched, the marketplace stanza, the CHANGELOG entry and the git commands, then asks once: confirm to push?

## Rules the loop follows

- Redact first, judge later. No prompt is quoted before emails, keys, numbers and URLs are stripped.
- A promoted skill must work for a stranger: nothing specific to one person, employer or dataset survives into the examples.
- Existing conventions win: the library's section order, the generated wiring, the drift-checked counts.
- Nothing is pushed without a yes.
