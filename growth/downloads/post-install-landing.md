# Post-install landing (#4) — one URL every channel points to

Every install moment (clawhub, npm, PyPI, MCP, CLI) should funnel to **one** short page that turns "just installed" into "starred + subscribed + oriented." A single URL you can tune, referenced everywhere.

## The URL
Something short and memorable — e.g. `pmskills.link/start` (or `.../start` on the existing Pages site). Referenced from:
- The clawhub listing CTA (`clawhub-listing.md`)
- The CLI post-install message (extend the existing `STAR` line in `bin/cli.mjs`)
- npm/PyPI "homepage", MCP description
- The end of the README quick-start

## Page content (drop-in — a ready HTML page is at `../pages/start.html`)
> # You're in. Here's what to do next. 🎉
>
> **1. Try it now.** Ask your AI a real task — *"decode this lease,"* *"write a postmortem for Friday's outage."* → [browse all 1,153 skills]
>
> **2. Start with your moment.** Not sure where to look? → [Skill Packs] (new parent · laid off · money in crisis · …)
>
> **3. Get new skills by email.** ~50 new skills land every wave. → [Subscribe]
>
> **4. If it helped, star it.** It's how others find it. → [⭐ Star on GitHub]
>
> *No accounts, no telemetry. Skills are markdown your AI reads.*

## Why one page (not scattered links)
- **One thing to optimize.** You can A/B the star vs. subscribe emphasis in one place.
- **Consistent across channels** — clawhub users get the same welcome as CLI users.
- **Measurable** (aggregate page views on the hosted site) without touching anyone's machine.

## Implementation notes
- The ready page (`../pages/start.html`) is self-contained; move it to `web/start.html` when you want it live (kept out of `web/` here to avoid touching the site build in this docs PR).
- Extend the CLI `STAR` constant to add the subscribe + start links (one-line change; test the CLI snapshot after).
