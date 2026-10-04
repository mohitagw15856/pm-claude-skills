# Example: fortnightly-release-planner

## What this skill does

Turns a backlog into small themed two-week releases, with ROADMAP.md, scope per release, what is left out on purpose, and a changelog template.

## How to trigger it

### Example 1: a habit tracker with 8 hours a fortnight

**You say:**
> "Plan releases for my habit tracker. I get about 8 hours every two weeks. Backlog: dark mode, CSV export, reminders, streak freeze, iOS widget, fix timezone bug, onboarding, translations. Currently v0.6.0."

**Claude produces (excerpt):**

| Item | Type | Size (hours) | User value | Depends on |
|---|---|---|---|---|
| Fix timezone bug | bug | 3 | 3 | none |
| CSV export | feature | 4 | 2 | none |
| Reminders | feature | 9, split into: scheduling (5), notification copy and settings (4) | 3 | timezone fix |
| iOS widget | feature | 14, split into three releases' worth | 2 | none |

```markdown
### v0.7.0: Trust your streaks   (target: 18 October)
**Why this theme now:** the timezone bug resets streaks for travellers; it is the top complaint.
**In:** timezone fix (3), streak freeze (3)   total 6 of 8 hours
**Out (on purpose):** dark mode (fits nowhere near this theme; next release)
**Done means:** a streak survives a flight from London to New York; one freeze per week works.

### v0.8.0: Never miss a day   (target: 1 November)
**In:** reminder scheduling (5)   total 5 of 8 hours (notification copy and settings follow in v0.9.0)
```

Every release is planned at 80% of the 8 hours; 1.6 hours a fortnight stay free for bugs.

---

### Example 2: ROADMAP.md

**Claude produces (excerpt):**

```markdown
## Next
- v0.7.0 Trust your streaks (18 Oct): timezone fix, streak freeze
- v0.8.0 Never miss a day (1 Nov): reminders
- v0.9.0 Make it yours (15 Nov): dark mode, CSV export

## Later
iOS widget, translations

## Not planned
- Social features: the app is for private habits; sharing changes what people track.
```

## Tips for best results

- Give honest hours; the plan is only useful if it fits real life.
- Mention fixed dates (a talk, an OS release) so themes line up with them.
- Re-plan after each release rather than defending an old plan.

## Related skills

- `first-issue-designer`: hand "Later" items to contributors as starter issues.
- `demo-clip-storyboard`: a short clip for each release announcement.
