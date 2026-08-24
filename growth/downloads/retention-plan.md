# Retention — bring the 55.5k back (#13, #14, #15)

A download is a one-time event; a relationship is recurring. You already built the parts — they just need to reach the download audience.

## #13 — Amplify the `subscribe` command (your secret weapon)
`bin/subscribe.mjs` lets users turn a skill into a **standing subscription** (scheduled runs that report what changed). No competitor has this. Today it's buried.
- **Feature it in the README** quick-start and on the Playground ("run this weekly").
- **Show it in the CLI help** prominently, not as a footnote.
- **A `growth`/blog post:** "Skills you don't run — they run themselves." This is genuinely novel and shareable.

## #14 — The `update` "what's new since you installed" moment (build)
When someone updates, show them they've been away and what they missed:
```
$ npx pm-claude-skills update
✓ Updated. 34 new skills since your version (v74 → v77):
  🔑 pm-reentry, 🕊️ pm-grief, 💸 pm-hardship … see CHANGELOG
  📬 Never miss a wave: [subscribe link]
```
- **How:** compare the installed manifest version to current; diff skill counts from `CHANGELOG.md` / `web/skills.json`. Small, safe addition to the CLI.
- **Why:** turns a silent `update` into a re-engagement + subscribe prompt.

## #15 — Make the newsletter the retention spine
The download base is your biggest potential subscriber pool — but the subscribe CTA only reaches CLI/site users today.
- Put it in the **clawhub CTA** (#2), the **post-install page** (#4), and (opt-in) the **output footer** (#3).
- Keep the cadence you already have (per-wave newsletter via `build-newsletter.mjs`).
- **Every wave you ship is a reason to email 55.5k people** — but only the ones you captured. Capture harder now so the *next* wave reaches more.

## The compounding logic
Retention makes every future skill worth more: ship a wave → email the base → they run it → they tell someone. Without capture, each wave reaches only whoever happens to check GitHub. With capture, it reaches an owned, growing list. **The single highest-leverage retention act is getting the subscribe link in front of the clawhub channel.**

## Measurement (aggregate, privacy-safe)
Subscriber count over time + open/click rate per wave (from the newsletter tool) → the impact dashboard. No per-user tracking on anyone's machine.
