# Teams / Pro tier — turn 55.5k downloads into revenue (#5, #7)

The skills stay MIT-free forever — that's the trust and the top of funnel. You monetize the things **teams** pay for that individuals don't: hosting, control, analytics, support. Downloads are your demand proof.

## The principle
Open-core, done honestly: **never paywall a skill.** Sell operational value around the free library. If it makes the free thing worse, don't do it.

## Tiers
| | Free (forever) | Team | Enterprise |
|---|---|---|---|
| All 1,153 skills (MIT) | ✅ | ✅ | ✅ |
| Browser Playground | ✅ (sponsor-funded runs) | ✅ | ✅ |
| Self-host / fork | ✅ | ✅ | ✅ |
| **Managed private MCP endpoint** | — | ✅ | ✅ |
| **Your company's private skills** hosted alongside | — | ✅ | ✅ |
| **Usage analytics** (which skills your team uses) | — | ✅ | ✅ |
| **SSO / access control** | — | — | ✅ |
| **Priority skill requests** | — | ✅ | ✅ |
| **SLA + support** | community | email | dedicated |
| Suggested price | $0 | $[x]/user/mo | custom |

## #7 — The paid API/MCP tier (closest to shippable)
You already run the MCP worker (`pm-skills-mcp.workers.dev`) serving free playground runs. Package it:
- **Free quota:** N runs/day (the current free tier — keep it generous, it's the funnel).
- **Paid:** higher quota + programmatic API keys for CI/automation, priority, and uptime.
- **Use cases:** run `churn-analysis` in CI, `incident-postmortem` from a webhook, `pr-description` in a pipeline — the `subscribe` command already hints at this "skills as standing jobs" shape.

## Why this works for *this* project
- **Demand is proven** — 55.5k downloads means people already rely on it; some fraction are teams who'd pay for hosting/control.
- **The `fork-for-your-team` guide** already exists — Team tier is "we host and manage that for you."
- **No trust cost** — nothing is taken away from the free/open library.

## What to build first (MVP)
1. A `/pro` page (copy below) collecting interest — validate demand before building billing.
2. A waitlist form → gauge how many of the 55.5k are teams.
3. Only then wire billing + the managed endpoint.

## /pro page copy (drop-in)
> ### PM Skills for Teams
> The 1,153 skills are free and MIT-licensed — always. Teams get the rest:
> a **managed private MCP endpoint**, your **company's own skills** hosted
> alongside, **usage analytics**, SSO, and support.
> Free stays free. This is hosting + control for teams that run skills at scale.
> **[Join the waitlist →]**

> Note: a real paid tier is a business decision with billing, support, and tax implications — this doc is the plan and the demand-validation MVP, not a launch. Validate with the waitlist first.
