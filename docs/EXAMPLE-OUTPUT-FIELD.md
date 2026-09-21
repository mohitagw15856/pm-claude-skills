# The Example Output field — every skill carries its own proof

`examples/samples` holds 22 sample outputs for 1,170+ skills. A skill's best conversion *and* quality asset is a **worked example of what it produces** — the before/after that a reader can judge in ten seconds. This makes that a field of the skill itself, so it lives next to the framework and travels into every export.

## The field
A section in `SKILL.md`, after `## Output Format` and before `## Quality Checks`:

```markdown
## Example Output

> **Input (abridged):** *"My landlord is keeping $1,200 of my $1,500 deposit for 'cleaning and paint'."*

# Deposit Recovery: $1,500 — phase: challenging
| Claimed deduction | Amount | Wear / damage / unsubstantiated | The response |
|---|---|---|---|
| Cleaning | $400 | unsubstantiated — no receipt, no itemization | Request itemized receipt; standard cleaning after 3-year tenancy is wear |
| Paint | $800 | wear — 3-year-old paint, no damage noted | Cite useful-life; request move-in report |
…
```

Rules: **real, abridged, honest** — the actual shape the skill produces, trimmed to the telling part; no invented specifics (mark `[example]` figures as illustrative); one example is enough.

## Rollout (incremental — don't break 1,170 skills)
1. **Now:** `scripts/check-example-coverage.mjs` reports coverage and lists gaps. It's report-only.
2. **Next:** add examples to the **high-stakes and flagship** skills first (the ones people share) — the `--list` output ordered by `data/risk-tiers.json`.
3. **Then:** add `Example Output` to `SKILLSPEC.md` as an **L4** (recommended) section, and raise `--min` in CI step by step (10% → 25% → 50%).
4. **Eventually:** required for new skills via the PR template checklist; existing skills back-filled by contributors (a perfect "good first skill" task — see `ROADMAP-REQUESTS.md` and the good-first-issues section of `ROADMAP.md`).

## Why it belongs in the skill, not a gallery
A gallery page is one more thing to maintain and one more place to be stale. An example *inside* the skill is versioned with it, exported with it to all 12 platforms, shown on its page automatically, and — crucially — is the thing a contributor checks their edit against.

```
node scripts/check-example-coverage.mjs --list
```
