# Worked Example — Changelog Generator Skill

## The brief

Lockstep is a fictional open-source Rust CLI for database schema migrations (~9k GitHub stars). The maintainer is cutting v3.0.0 on 2026-07-10 for an audience of developers who run it in CI, and pastes a messy log of 19 commits since v2.11: two breaking changes, a security fix, and an experimental drift-detection feature built behind an env flag at the request of Nortavia, their largest production user. The raw log, condensed:

```
9f3c1aa feat: blake3 checksums for lock file (BREAKING)     6c2ea08 drop pg12 + mysql 5.7 support (BREAKING)
8802c4e feat: add plan subcommand, deprecate --dry-run      ee40a19 fix: redact db url in debug logs
77ab2f0 wip drift detection                                 41c8e3d drift detect behind env flag (nortavia rollout)
2f88c01 feat: --target for partial migrate                  a9928c6 feat: sqlite wal mode support
e21d90b fix panic on empty migrations dir                   5d91a77 fix: down migrations order on timestamp collision
c4f19b2 refactor: split runner.rs into modules              b3345f1 clippy
30d7bb4 chore: bump deps                                    90cc5ad ci: switch to cargo-nextest
f7e0d13 docs: readme badges                                 1b6f4e2 fix tests on windows
d6a02e9 wip drift detection pt2                             83fe114 chore: fmt
4a7c556 feat: plan --output json
```

## The output

---

## [3.0.0] — 2026-07-10

### Breaking Changes ⚠️
- **Lock-file checksums now use BLAKE3 instead of MD5.** Existing `lockstep.lock` files will fail validation with `checksum mismatch: lock file uses legacy hash` the first time v3 runs.
- **Migration required:** run `lockstep lock --rehash` once per project and commit the updated `lockstep.lock`. Do this before v3 runs in CI — the command verifies old checksums as it rehashes, so drift is still caught.
- **Postgres 12 and MySQL 5.7 are no longer supported.** Both are past end-of-life upstream; `lockstep` now refuses to connect and exits with `unsupported server version`.
- **Migration required:** upgrade to Postgres 13+ or MySQL 8.0+ before upgrading Lockstep, or pin `lockstep@^2.11` until you can.

### Added
- Add a `plan` subcommand that previews pending migrations without applying them, including `--output json` for CI pipelines. This replaces the `--dry-run` flag (see Deprecated).
- Add `--target <version>` to `migrate up` and `migrate down` to stop at a specific migration instead of running the full chain.
- Add SQLite WAL-mode support, so migrations no longer block concurrent readers on SQLite-backed apps.
- Add experimental schema-drift detection (`lockstep drift detect`), gated behind `LOCKSTEP_EXPERIMENTAL=1`. Built with a large production deployment and published for everyone; off by default, and the interface may change before 3.1 — feedback welcome on the tracking issue.

### Fixed
- Fix a crash when the migrations directory exists but contains no migration files.
- Fix down-migrations running in the wrong order when two migrations share the same timestamp — ordering now falls back to filename, matching `migrate up`.

### Deprecated
- `--dry-run` flag — use `lockstep plan` instead. Will be removed in 4.0.0.

### Security
- Stop writing database connection strings to debug logs. In v2.x, running with `--log-level debug` could record credentials embedded in the database URL; URLs are now redacted before any log call. If you ran v2.x at debug level in shared CI, treat those logs as sensitive and rotate the affected database credentials.

---

## Why it's shaped this way

- **Both breaking changes lead the entry, flagged ⚠️, each with a specific migration action** (`lockstep lock --rehash`, "upgrade to Postgres 13+ or pin `^2.11`") — the Quality Checks require breaking changes at the top with migration instructions, and the Anti-Patterns ban the vague "update your code" that forces users into the source.
- **Nineteen commits became eleven entries.** The three drift-detection commits (`wip`, `wip pt2`, the flag commit) collapse into one Added line; `plan` and `plan --output json` merge into one. The Anti-Patterns ban listing every micro-commit — the reader cares about capabilities, not commit archaeology.
- **Seven commits were excluded entirely** (`refactor: split runner.rs`, `clippy`, `fmt`, dep bumps, CI switch, readme badges, the Windows test fix) because they change nothing a user can observe. Curation is the job; a changelog that includes internal noise buries the entries that matter.
- **The Nortavia-driven feature is listed candidly but neutrally** — "built with a large production deployment, published for everyone, interface may change" — rather than hidden (users would find the env flag anyway) or spun as a headline feature (it's experimental). Naming the experimental status and the flag is the honest middle.
- **The security entry describes the vulnerability class and the user's remediation, not exploit mechanics** — what was logged, who is affected (`--log-level debug` in shared CI), and what to do (rotate, treat logs as sensitive) — per the Output Format's rule to describe the class, not the details.
- **Every entry is written from the user's side of the tool**: "migrations no longer block concurrent readers", not "enable WAL journal mode in the connection pragma" — the Quality Check that no internal variable names or implementation details leak through.
- **Imperative mood throughout ("Add", "Fix", "Stop writing") and no empty sections** — there were no plain behaviour changes this release, so there is no `### Changed` block sitting empty to signal a carelessly filled template.
- **The fix entries describe what was broken, not the patch** — "down-migrations running in the wrong order when two migrations share a timestamp", not "sort by filename as secondary key" — while still telling the affected user how to recognise if they were bitten.
