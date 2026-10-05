---
name: changelog-for-humans
description: "Write changelogs and release notes readers actually benefit from — changes translated to so-whats, grouped by reader impact (breaking first, gifts second, plumbing last), with the upgrade path stated and the marketing kept honest. Use when asked write the release notes, turn this commit list into a changelog, announce this update to users, or why does nobody read our changelogs. Produces the impact-grouped changelog, the so-what translations, the breaking-changes block with migration steps, and the two-audience split when needed."
---

# Changelog For Humans Skill

Commit lists are what happened; changelogs are *what it means for you* — and most teams publish the former with headers. The human version translates each change into its so-what ("Faster search" → "Search results now return in under a second on large workspaces"), orders by reader impact — breaking changes first with migration steps, improvements second, internal plumbing compressed to a line — and never buries the one thing users must do behind twelve things the team is proud of. When audiences diverge (end users vs. developers), the changelog splits rather than serving both badly.

## What This Skill Produces

- **The impact-grouped changelog** — ⚠ breaking/action-needed → ✨ new & improved → 🔧 fixes → (plumbing, one line)
- **The so-what translations** — each entry: what changed *for the reader*, not what the team did
- **The breaking block** — who's affected, what breaks, the migration steps, the deadline if one exists
- **The audience split** — the user-facing notes and the developer/API notes, separated when their so-whats differ

## Required Inputs

Ask for these if not provided:
- **The raw changes** — commits, PR titles, the team's list; translation needs the source material and the *actual* user-visible effect of each (ask when a commit's impact is unclear — guessing so-whats manufactures lies)
- **The readers** — end users? admins? API consumers? Their vocabulary and their stakes decide the grouping and whether the split applies
- **The action items** — anything readers must *do* (migrate, re-auth, update configs) — these outrank everything and need deadlines
- **The channel** — in-app note (three lines), email (skimmable), docs page (complete) — the same release ships different depths

## Framework: The Translation Rules

1. **So-what or silence:** every entry passes "what does the reader now experience differently?" — "Refactored the auth middleware" fails (plumbing line); "You stay logged in across devices now" passes. Changes with no reader-visible effect compress to "plus internal improvements" — honesty *and* mercy.
2. **Breaking changes lead, with verbs:** the ⚠ block comes first regardless of how exciting the features are — who's affected, what stops working, the numbered migration steps, the date. Burying an action-needed under feature marketing is how support tickets get scheduled.
3. **Write the reader's grammar:** "You can now…" beats "Added support for…" — second person, present tense, the reader as subject. Feature names the team invented get one explanatory clause on first use.
4. **Honest marketing, sized claims:** "faster" carries its number when one exists ("~40% faster on large files"), known limitations ride along ("not yet on mobile"), and fixed bugs are stated plainly — readers who hit the bug deserve to find its fix by searching the changelog. Overclaiming buys one release of excitement and a subscription of skepticism.
5. **Depth per channel, one source:** the full changelog is written once (docs-grade), then compressed: email gets the breaking block + top three, in-app gets one line + link. Compression cuts entries, never the breaking block — it survives at every depth.

## Output Format

# [Product] — [version/date]

## ⚠ Action needed
[Who's affected · what breaks · migration steps, numbered · by when]

## ✨ New & improved
[Per entry: "You can now [so-what]." — number-carrying claims, limitations attached]

## 🔧 Fixed
[Plain statements — searchable by the sufferers]

*Plus internal improvements.*

---
[Channel cuts: email version · in-app line — breaking block preserved in all]

## Quality Checks

- [ ] Every entry states a reader-visible so-what or lives in the plumbing line
- [ ] Breaking/action-needed leads, with steps and dates
- [ ] Claims carry their numbers and their limitations
- [ ] The reader is the grammatical subject throughout
- [ ] Channel versions all retain the breaking block

## Anti-Patterns

- [ ] Do not publish the commit list with a header — that's the team's diary, not the reader's news
- [ ] Do not bury action-needed under features — excitement doesn't file the migration for them
- [ ] Do not overclaim improvements — the number or a modest verb
- [ ] Do not hide fixed bugs in vague language — the people who hit them are searching for exactly those words
- [ ] Do not write one changelog for two audiences with different stakes — split it or lose both

## Example Trigger Phrases

- "Write the release notes."
- "Turn this commit list into a changelog."
- "Announce this update to users."
- "Why does nobody read our changelogs?"
