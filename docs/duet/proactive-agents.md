# Proactive agents, compared honestly

Three proactive agents launched within seven weeks of each other. This page tracks what each one is and how this library's skills stand with each, updated as facts change. Product facts below are from launch coverage (September and October 2026) and each vendor's own pages are the authoritative source; corrections by PR are welcome. Compatibility claims follow the library's [honesty tiers](README.md#the-three-honesty-tiers): nothing here is marked tested until a named person tested it.

## The three, as launched

| | Claude Duet (Anthropic) | Dots (OpenAI) | Muse (Meta) |
|---|---|---|---|
| Launched | 21 October 2026, US research preview | 29 September 2026, DevDay | 8 September 2026 |
| Shape | Morning brief + checks of connected apps every few hours, web and iOS app | Always-on agents inside ChatGPT, each with its own cloud computer | Personal agent app that acts: email, bookings, forms, checkout |
| Acts on your behalf? | Yes, with approval before actions such as sending or signing | No: proactive *research* with read-only tools; it cannot send or change your apps | Yes, including purchases |
| Access | Pro and Max, US, waitlist | Paid high tiers (coverage differs on exactly which) | Free tier plus paid plans |
| Connectors | 6,000+ connectors and plugins cited at launch; cloud browser for the rest | 4,000+ apps via plugins; Slack and Teams | Meta's own surfaces plus web actions |
| Cost model | Included in the plan; draws on the same usage limits, background checks included | Plan-gated | Free and paid tiers |

What they share is the failure mode this library's Duet conventions target: unattended summaries that overclaim, uncited assertions from connected sources, and actions taken on wording approvals. The [duet block](README.md), the [status vocabulary](status-vocabulary.md) and [send-approval-check](../../skills/send-approval-check/SKILL.md) are written against the failure mode, not against one vendor, which is why the table below can exist at all.

## Where the skills stand, per agent

| Skill | Duet | Dots | Muse |
|---|---|---|---|
| morning-brief-designer | designed for | designed for (its briefs are read-only by nature, a natural fit) | designed for |
| interrupt-rules | designed for | designed for | designed for |
| end-of-day-report | designed for | designed for | designed for |
| weekly-rollup | designed for | designed for | designed for |
| send-approval-check | designed for | not applicable (Dots cannot send) | designed for; untested against Muse's own checkout approvals |
| prepare-for-duet | designed for | partially applicable (connector audit yes, approval habits less so) | designed for |

"Designed for" means the skill follows the conventions and nobody has run it on that agent; the first [Tested on Duet](https://github.com/mohitagw15856/pm-claude-skills/issues/new?template=tested-on-duet.yml) report (or its Dots/Muse equivalent, same template, say which agent) moves a cell to community-tested with the issue linked here.

## Keeping this page honest

- A cell only changes with evidence: a linked tester issue or a vendor doc.
- When a vendor changes the product, the row changes and the old claim is struck through, not silently rewritten.
- TODO (maintainer): re-verify the launch facts against vendor pages monthly while all three are moving fast; the next check is due mid-November 2026.
