# Example: changelog-generator

## What this skill does

Turns a git log or commit list into a user-facing changelog in Keep a Changelog format: categorised changes, breaking changes with migration notes, written for users rather than committers.

## How to trigger it

### Example 1: release notes from raw commits

**You say:**
> "Make a changelog entry for v2.4.0 from these commits: fix race in token refresh; add CSV export to reports; bump node to 20; remove legacy /v1/search endpoint (deprecated in 2.0); feat: dark mode for dashboard; fix: dates off by one in weekly email."

**Claude produces (excerpt):**

## [2.4.0] - [date]

### Breaking Changes ⚠️
- **Removed `/v1/search`:** deprecated since 2.0.0.
- **Migration required:** switch to `/v2/search`; the query parameter `q` is unchanged, responses now paginate with `next_cursor`.

### Added
- CSV export on all report pages, matching the filters you have applied.
- Dark mode for the dashboard, following your system preference.

### Changed
- Runtime upgraded to Node 20. No action needed for hosted customers; self-hosted deployments should update their base image.

### Fixed
- Weekly summary emails no longer show dates shifted by one day in western timezones.
- Sessions no longer intermittently log out during token refresh under concurrent requests.

### Example 2: deciding what users need to see

**You say:**
> "Same release, but 40 of the commits are internal refactors and CI tweaks. What goes in?"

**Claude produces (excerpt):**

**Included:** anything a user can observe: the removed endpoint, CSV export, dark mode, the two fixes.

**Excluded, with reason:** refactors, test changes and CI work have no user-visible behaviour. If the Node 20 bump affects self-hosters, it stays; pure dependency bumps without action do not.

**One-line summary for the top of the release:** "CSV export and dark mode; `/v1/search` is gone, migrate to `/v2/search`."

## Tips for best results

- Paste the real git log; the skill filters noise better than a pre-trimmed list.
- Say who reads the changelog (end users, API developers, self-hosters); it changes what counts as breaking.
- Flag anything deprecated now so the removal entry can cite the version later.

## Related skills

- `release-notes-writer` for marketing-toned announcements rather than a reference changelog
- `api-docs-writer` when the change needs updated endpoint documentation, not just a mention
