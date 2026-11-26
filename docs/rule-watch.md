# Rule-change watch

Tax, privacy, employment and AI-law skills are only as good as the rules they encode, and rules change. Every Monday a workflow reads the official pages those skills depend on and raises an alert when one changes.

## How it works

- **`data/rule-sources.json`** lists each official page and the skills that depend on it. It currently covers the EU AI Act, GDPR and UK GDPR, UK tax and wage rates, IRS pages, US federal regulations on eCFR, and WCAG 2.2.
- **`scripts/watch-rule-sources.mjs`** fetches each page. It keeps only the readable text, dropping scripts, menus, headers, footers and forms so that cosmetic edits don't raise an alert. It then hashes the text and compares the hash with the last run.
- **`.github/workflows/rule-watch.yml`** runs weekly and on demand.
  - It keeps the hashes in a hidden block in one open issue labelled `rule-change`.
  - When a page changes, it comments on that issue with the skills to recheck.
  - It commits nothing and uses only `GITHUB_TOKEN`.

A change in the text means "look", not "the rule moved": it can be a rewording. If a page can't be read, the watcher says so and keeps the old hash, so a flaky site never looks like a rule change. The first run for a new source only records a baseline.

## When an alert arrives

1. Open the page and find what changed.
2. Check each listed skill against it, and fix the skill in a pull request if the rule moved.
3. Stamp the skill as checked, which updates the "last checked" date on its page:

```bash
node scripts/rules-reviewed.mjs --review <skill> --by <your-handle>
```

## Add a source

Add an entry to `data/rule-sources.json` with an id, a title, the URL and the skills that depend on it, then run:

```bash
node scripts/watch-rule-sources.mjs --check                          # validates the file, no network
node scripts/watch-rule-sources.mjs --only <id> --state /tmp/s.json  # one live read
```

Only list pages that answer a plain scripted request. The watcher identifies itself honestly and never pretends to be a browser, so sites that block automated readers are left out. For example, EUR-Lex serves a challenge page; this library uses the European Commission's AI Act pages, the EDPB and legislation.gov.uk instead.

Run it locally without a state file and it writes `data/rule-sources-state.json` (gitignored).
