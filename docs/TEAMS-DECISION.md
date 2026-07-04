# Decision: Teams is not a backend — it's a folder

**Status:** decided · 2026-07 · revisit criteria at the bottom
**Decision:** pm-skills will NOT build accounts, a hosted database, or any server-side team features. Team workflows ship as conventions on top of the local-first primitives we already have.

## The question

Every tool this size eventually gets asked: "can my team share a workspace — shared brains, shared Firm minutes, team leaderboards, an admin view?" The obvious build is a backend: auth, orgs, sync, billing. This doc records why we're saying no, and what we do instead.

## Why no backend

1. **It inverts the trust model that makes this project what it is.** Every page ships with "🔒 nothing leaves your browser." That single sentence does more adoption work than any feature — PMs paste real strategy docs, real comp numbers, real board memos into the arenas *because* there is no server. The first login screen deletes that sentence everywhere.
2. **It's a second product.** Auth, tenancy, GDPR/DPAs, uptime, migrations, support — a permanent operational tax competing for the same hours that currently produce skills and arenas. The library wins by depth of content, not by re-implementing Google Drive.
3. **Teams already have a sync layer they trust: git.** Every team this product serves lives in repos all day. A shared repo is auth (GitHub perms), audit (history), review (PRs), and sync (pull) — battle-tested and free, with zero code owned by us.
4. **The primitives already compose into team workflows** (this release completed the set):
   - The **workspace bridge** (`web/workspace.js`) writes Firm minutes, Boardroom verdicts, and predictions into a real folder. Point it at a clone of a shared repo → `git push` is team sync.
   - **Replay links** (`boardroom.html#replay=…`) share a full session in a URL — no storage, gzip in the fragment, nothing touches a server even when sharing.
   - **Attestations + `verify.html`** make artifacts portable with integrity: anyone can verify that this exact document got this exact verdict.
   - The **community registry** shares skills, benches, and scenarios through git, PR-reviewed — the same trust model.

## What "Teams" is, concretely

A team adopts three conventions (documented in the README's team section as of this release):

```
team-repo/
  brain/                 # shared professional memory — PRs are the review gate
  firm-minutes/          # everyone's Firm sessions land here via the workspace bridge
  boardroom/             # verdicts + attestations, verifiable by anyone in the repo
```

- **Share a session:** send the replay link, or commit the transcript the bridge wrote.
- **Share a panel:** publish a bench pack in the registry; the team installs it in the Boardroom.
- **Team standards:** the repo's own `CLAUDE.md`/hooks load the shared brain into every member's sessions.

## What we accept by deciding this

- No real-time presence, no team dashboards, no centrally-enforced permissions beyond git's. That's the trade, taken with eyes open.
- Slightly more setup friction for non-git-native teams (they are not the core audience).

## Revisit when

Any two of: (a) repeated, specific user asks for team features that the folder conventions demonstrably can't serve; (b) a maintainer exists whose *primary* job is operations; (c) a sustainable funding source is in place for the operational tax. Until then, every "teams" request gets the conventions above — and they're good.
