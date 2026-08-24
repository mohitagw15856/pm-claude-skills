# Downloads → Value — converting 55.5k installs into stars, subscribers, sponsors & revenue

**The problem in one line:** 55.5k+ downloads (clawhub) prove the demand is already here — but the largest channel captures almost nothing. People install, get value, and vanish. ~55.5k downloads → ~1.3k stars is **≤2% conversion**, and the real rate is lower.

**The root cause:** your conversion hooks (the CLI `⭐ Star the repo / 💛 fund more` nudge in `bin/cli.mjs`, `bin/install.mjs`, `bin/init.mjs`; the `subscribe` command; the stats worker; the newsletter) all live in channels the clawhub audience **never touches**. Clawhub users install straight from the hub and never run `npx pm-claude-skills`, so every funnel-back you built is invisible to them.

**The job now:** route your biggest channel through the hooks you already have, and put a price on the value 55.5k people are getting for free — **without breaking the "no telemetry, no accounts" promise** (pull, not tracking).

Legend: ✅ done · 🟡 partial (amplify) · 🔴 build · 🧑 human action (asset ready here)

---

## A. Convert the download channel itself (highest leverage)
| # | Move | Status | Deliverable / next action |
|---|---|---|---|
| 1 | Treat the clawhub listing like an app-store page | 🧑 | Copy in `clawhub-listing.md` — paste into the hub. |
| 2 | Put the star/subscribe CTA where clawhub users land | 🟡 | CTA block in `clawhub-listing.md` + output footer (#3). |
| 3 | Opt-out attribution footer on skill outputs | ✅ | **Implemented, default-off** — `scripts/attribution.mjs` (9/9 self-test) + `config/attribution.json` (sensitive bundles/skills excluded). Ships off; flip when ready. See `attribution-footer.md`. |
| 4 | One post-install landing URL for every channel | 🔴 | Copy + ready page in `post-install-landing.md`. |

## B. Monetize the proven demand
| # | Move | Status | Deliverable |
|---|---|---|---|
| 5 | Teams/Pro tier (skills stay free) | 🔴 | `teams-pro-tier.md` — tiers + what's paid. |
| 6 | Proactive sponsor pitch with the numbers | 🧑 | `sponsor-prospectus.md` — **real numbers filled** (55.5k clawhub · ~10.8k/mo npm · ~2.6k/mo PyPI · ~1.3k stars, as of 2026-08-24); just add newsletter subs + send. |
| 7 | Paid MCP/API tier | 🔴 | API-tier section in `teams-pro-tier.md`. |
| 8 | "Build your company's skill library" service | 🧑 | `services.md`. |

## C. Win the registries (multiply discovery)
| # | Move | Status | Deliverable |
|---|---|---|---|
| 9 | Publish bundles as individually installable units | 🔴 | `registry-optimization.md`. |
| 10 | SEO the registry keywords | 🟡 | Keyword set in `registry-optimization.md`. |
| 11 | Cross-link every registry home + to each other | 🟡 | Link matrix in `registry-optimization.md`. |
| 12 | Claim/verify the clawhub publisher profile | 🧑 | Checklist in `clawhub-listing.md`. |

## D. Retention — bring downloaders back
| # | Move | Status | Deliverable |
|---|---|---|---|
| 13 | Amplify the `subscribe` command | 🟡 | `retention-plan.md`. |
| 14 | An `update` "what's new since you installed" moment | 🔴 | Spec in `retention-plan.md`. |
| 15 | Make the newsletter the retention spine | 🟡 | `retention-plan.md`. |

## E. Proof & community flywheel
| # | Move | Status | Deliverable |
|---|---|---|---|
| 16 | Public impact dashboard | 🟡 | Ready page `../pages/impact.html` — **real snapshot numbers + live wiring** for stars/runs/skills (graceful fallback). Move to `web/impact.html` to go live. |
| 17 | Harvest ROI stories | 🟡 | `roi-stories-campaign.md` (the `roi-story` template exists). |
| 18 | Turn heavy-use skills into contribution magnets | 🔴 | Ready issue list in `good-first-skill-issues.md`. |

## F. Depth that earns the star
| # | Move | Status | Deliverable |
|---|---|---|---|
| 19 | Privacy-respecting, aggregate-only funnel measurement | 🔴 | `measurement.md`. |
| 20 | "Build your own skill in 2 minutes" flow | 🟡 | `byo-skill-flow.md` (skill-creator exists). |

---

## If you do only three
1. **#1 — fix the clawhub listing.** That's where the 55.5k are; today it's a leak.
2. **#6 — pitch sponsors now** with the download number while it's fresh.
3. **#5 — stand up a Teams/Pro tier.** Downloads are the demand proof; this is where 55.5k becomes revenue.

## The privacy line (non-negotiable)
The README promises *no telemetry, no accounts.* Every idea here must be **pull, not surveillance**: CTAs, opt-in subscriptions, aggregate-only counts on the hosted playground (never on the user's machine), and attribution that's opt-out and excluded on sensitive skills (grief, hardship, reentry). Breaking that promise would cost more trust than any conversion gains.
