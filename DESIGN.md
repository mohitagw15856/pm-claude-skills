# Design

**Status:** v0.1, 2026-09-28. Stages 1 to 4 of the library's own [`ui-design-pipeline`](skills/ui-design-pipeline/SKILL.md) applied to the web pages in `web/`. The direction below describes what the pages already do. It is **proposed, awaiting confirmation by the maintainer**. Stage 5, verification in a real browser, has not been run for this document.

People and agents changing anything in `web/` read this file first. The values live in [`design-system/MASTER.md`](design-system/MASTER.md). If a change disagrees with this file, either the change is wrong or this file needs updating in the same pull request.

## Who the pages are for

Two kinds of visitor, often the same person on different days:

- Someone in the middle of a problem: a deposit withheld, a medical bill, a layoff. They did not come to admire a website.
- A professional checking whether the library is good enough to use at work.

Both want the same thing from the first screen: to run one skill and see a finished document.

## Direction

**Chosen: a warm workshop.** Dark, warm-tinted surfaces, one terracotta accent, the system typeface, dense but calm. It should feel like a well-kept reference desk, staffed by someone who has done this before.

| Choice | Decision |
|---|---|
| Typeface | The system stack. The content is the personality, and the page must load fast on a poor connection |
| Colour | One accent, terracotta (`--accent`). Everything else is a neutral with a slight warm cast |
| Density | High. Cards and tables, not hero sections. A visitor should see several skills without scrolling |
| Shape | Rounded, medium radius. Pills only for chips and tags |

**Rejected, and why:**

- *Neon developer tool* (black, glowing gradients, monospace everywhere). Most visitors are not developers, and half the library is about leases and medical bills.
- *Corporate software blue* (white, blue buttons, stock illustration). It would look like every other product and promise an account and a sales call.

## Principles

1. **The artifact is the hero.** The output of a skill gets the most space and the highest contrast on any page that has one. Navigation and chrome stay quiet.
2. **One accent, spent deliberately.** Terracotta marks the one thing to do next. If two things on a screen are terracotta, one of them is wrong.
3. **Values come from tokens.** Colour, radius and shadow come from the custom properties in `web/styles.css`. No new raw hex values. See the ratchet below.
4. **Hierarchy through size, weight and position** before borders and background fills. Every border has to justify itself.
5. **Status looks the same everywhere.** Production-ready, stable and experimental each have one colour and one label, used identically on cards, tables and detail pages.
6. **Machine values look machine-made.** Scores, counts, versions and commands use the monospace stack and one format.
7. **Words are part of the system.** One name per thing: *skill*, *bundle*, *pack*. Buttons name the action ("Run the skill"), not the mechanism ("Submit").
8. **Motion explains a change.** Entering elements ease out. Most motion stays under 300ms. Nothing animates only to decorate, and `prefers-reduced-motion` is always honoured.
9. **It must survive a small screen and a keyboard.** Every control is reachable by keyboard, has a visible focus state and a label.

## The ratchet

The stylesheet has grown by accretion, and the measured state is in `design-system/MASTER.md`: 20 font sizes, 14 radii, 26 spacing values and 22 raw colours outside the token blocks. Cleaning that up in one go would risk visual changes nobody asked for.

So the rule is a ratchet. [`design-system/baseline.json`](design-system/baseline.json) records today's counts, and [`scripts/check-design-tokens.mjs`](scripts/check-design-tokens.mjs) fails if any of them goes **up**. They may only come down. When you remove a stray value, lower the baseline in the same pull request.

## Changing the design

| You want to | Do this |
|---|---|
| Change a colour, radius or shadow | Change the token in `web/styles.css`, then the same row in `design-system/MASTER.md` |
| Add a new value | First show that no existing token fits. Then add a token, never a raw value |
| Add an animation | Add a row to the motion table with its reason. No reason, no animation |
| Build a new page | Link `styles.css`, use the tokens, and run stage 5 of the pipeline: screenshots at 390 and 1440 wide |

```bash
node scripts/check-design-tokens.mjs            # tokens match the stylesheet, counts have not gone up
node scripts/check-design-tokens.mjs --report   # the current counts
node scripts/check-design-tokens.mjs --selftest
```

## Open findings from the critique

Ranked by impact. None is fixed in the pull request that added this file, which changes no rendered output.

1. **Three form controls have no label** (`web/router.html`, and the generated catalogue). The accessibility check fails on this on every push.
2. **Twenty font sizes, several half a pixel apart.** A scale of eight would cover every use.
3. **The radius token is used once**; fourteen raw radii do the rest.
4. **Skill cards enter over 380ms with `ease`.** The rule is under 300ms with ease-out.
5. **The "evaluated" green (`#6ee7b7`) appears seven times as a raw value.** It should be a status token.
6. **Four pages do not link `styles.css`** and carry their own inline styles, so they drift from the rest.

Library: https://github.com/mohitagw15856/pm-claude-skills
