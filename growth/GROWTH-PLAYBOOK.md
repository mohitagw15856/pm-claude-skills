# Growth Playbook — turning 1,100+ skills into stars

**The core problem:** the library optimized *supply* (skills) for a long time; the constraint now is *demand* (people seeing, trying, and starring). At 1,117 skills the catalogue is a conversion *liability* — a visitor thinks "this is huge, what do I do with it?" and leaves. People star **one thing that made them feel something**, not a warehouse.

This playbook is the fix: 20 growth moves, each with **status → next action**. Build order is at the bottom.

Legend: ✅ done · 🟡 partial (activate/upgrade) · 🔴 gap (build) · 🧑 human-only action (copy is ready here)

---

## A. Positioning — make a visitor feel seen in 5 seconds

| # | Move | Status | Next action |
|---|---|---|---|
| 1 | README hero around ONE story, not a count | 🟡 | Hero rewritten this wave — lead with the human moment, badges folded below. Keep iterating the first screen. |
| 2 | Lead with 3 emotional hero skills | 🟡 | `lease-decoder`, `medical-bill-decoder`, `severance-decoder` featured in the hero. |
| 3 | Persona packs instead of a warehouse | 🔴→✅ | `PACKS.md` created — 8 packs a person self-identifies with. Next: link from README + a `web/packs.html`. |

## B. Shareability — engineer every link to spread

| # | Move | Status | Next action |
|---|---|---|---|
| 4 | Per-skill OG social images | ✅ | `scripts/build-og-images.mjs` exists (192+ generated). **Run it for the new skills:** `node scripts/build-og-images.mjs` (needs Chromium). |
| 5 | "Share this result" on Playground outputs | 🟡 | `wrapped.html` proves the pattern. Add a share-as-image button to run outputs. |
| 6 | One 60-sec demo GIF/video | 🧑 | Storyboard in `growth/demo-storyboard.md`. Record with the Playground. |

## C. Distribution — get in front of people (the real missing work)

| # | Move | Status | Next action |
|---|---|---|---|
| 7 | Show HN, meta-angle not catalogue | 🧑 | Copy ready: `growth/show-hn.md`. Post Tue–Thu ~8–10am ET, *after* A/B are live. |
| 8 | Product Hunt around the Playground | 🧑 | Kit ready: `growth/product-hunt.md`. |
| 9 | Reddit as genuine help | 🧑 | Playbook + example replies: `growth/reddit-playbook.md`. |
| 10 | Awesome-list PR campaign | 🔴→✅ | Target list + PR template: `growth/awesome-lists.md`. An afternoon of PRs. |
| 11 | AI-newsletter pitches (dignity story) | 🧑 | Emails ready: `growth/newsletter-pitches.md`. |
| 12 | Weekly "Skill of the Week solving X" | 🔴→✅ | Cadence + first 4 posts: `growth/skill-of-the-week.md`. |

## D. Proof — devs star what's measurably good

| # | Move | Status | Next action |
|---|---|---|---|
| 13 | Public SkillBench leaderboard | 🟡 | `skillbench/` + `web/benchmark.html` exist. Surface the headline number in the README hero and every post. |
| 14 | Before/after gallery | 🟡 | `web/compare.html` exists. Pull 3 killer before/afters into the README. |

## E. Community flywheel — each contributor stars + shares

| # | Move | Status | Next action |
|---|---|---|---|
| 15 | "Request a skill" board | ✅ | `.github/ISSUE_TEMPLATE/skill-request.md` exists. Pin it; build the top-voted weekly. |
| 16 | Good-first-skill + contributors wall | 🟡 | `submit-skill.yml` exists. Add 5 "good first skill" issues + a contributors section. |
| 17 | "Fork this for your team" template | 🔴→✅ | Guide: `growth/fork-for-your-team.md`. |

## F. Strategic skills — build-more, but only where it earns a story

| # | Move | Status | Next action |
|---|---|---|---|
| 18 | The three no one else will touch | ✅ | Built this wave: **pm-reentry, pm-grief, pm-hardship**. This is the story a journalist writes. |
| 19 | pm-ai-native depth (dev on-ramp) | ✅ | +claude-project-setup, prompt-debugging, ai-agent-reliability — devs are who star GitHub repos. |
| 20 | One viral single-skill microsite | 🟡 | `find.html` exists ("describe your problem → the skill"). Make one share-optimized variant with OG cards. |

---

## Recommended build order (this week)

1. **Run `build-og-images.mjs`** for the new skills (#4) — compounding, touches every future share.
2. **Ship the persona packs page** + README hero (done here; add `web/packs.html`) (#1–#3).
3. **Record one demo video** (#6).
4. **Awesome-list PRs** (#10) — a durable afternoon.
5. **Show HN** (#7) — the biggest single spike, but only *after* 1–4 so the traffic converts.
6. Then the steady engine: **Skill of the Week** (#12) + **Reddit help** (#9) + **newsletter pitches** (#11).

## The one-sentence strategy

Stop adding skills for stars (you have 1,117). **Fix the conversion of the traffic you already get, then drive one big spike into a repo that finally converts.**
