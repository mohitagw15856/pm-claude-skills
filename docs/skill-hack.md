# The quarterly Skill Hack

The [Skill Cup](../SKILL-CUP.md) asks for one good skill a month. The Skill Hack runs once a quarter and asks for something bigger: a **pack of 2 to 4 skills that work together** on one theme, the way a real job uses several at once. The schedule and themes are in [`data/skill-hack.json`](../data/skill-hack.json) and on the [Cup page](https://mohitagw15856.github.io/pm-claude-skills/cup.html#hack).

Entering is free. You need no API key, and nothing in the checks below costs money.

## What to build

- **2 to 4 new skills** on the quarter's theme, each in `skills/<name>/SKILL.md`. A pack may also lean on skills the library already has, but only new skills count towards the score.
- **One eval case per new skill** in `evals/cases.json`: a real request the skill should handle.
- **A pack line**: a short paragraph in the pull request description saying who the pack is for, the order the skills run in, and what each hands to the next.
- Solo or a team of up to three people. List every author in the pull request description.
- Any language. A pack written in Hindi, Chinese or Polish is judged in that language, as in the Cup.

## The free checks (run them before you open the pull request)

```bash
npx skillspec-check skills/<each-new-skill>   # must reach L3
node scripts/skill-audit.mjs                  # no high-severity findings
node scripts/check-injection.mjs              # no prompt-injection patterns
node scripts/skill-dupes.mjs --check          # not a near-copy of an existing skill
```

An entry that fails any of these is not scored. Fix it and push again before the quarter closes.

## How it is scored

Each new skill is scored exactly as a Cup entry is, with [`scripts/score-cup-entry.mjs`](../scripts/score-cup-entry.mjs): its eval cases run with the skill, and the pinned judge scores the output blind, 1 to 5, on the library's rubric of structure, completeness, usefulness and grounding. **The pack's score is the mean of its new skills' scores.** A maintainer runs the scoring at the close of the quarter and posts the result on each pull request. Ties go to the earlier pull request.

There is no popularity vote, and a pack cannot win on one strong skill carrying weak ones: every skill counts equally.

## To enter

Open one pull request with `[Hack]` in the title during the quarter's dates. Use one pull request per pack. A pack can also count as Cup entries for the months it runs in, if a skill fits that month's theme.

## What the winner gets

- The winning pack ships as a **named starter pack** (in `data/duet-packs.json` when it suits an assistant, otherwise in the catalogue), with the authors credited.
- A permanent line in the Hack table in [SKILL-CUP.md](../SKILL-CUP.md) and on the Cup page.
- First pick of a theme for a future quarter.

Sponsors can fund a prize for a quarter in the same way as for a month of the Cup: see [SPONSOR-THE-CUP.md](SPONSOR-THE-CUP.md).

## Adding a quarter

Maintainers add the next quarters to `data/skill-hack.json`. `tests/checks/skill-hack.mjs` keeps the schedule in order and inside each quarter, and `node scripts/close-skill-cup.mjs` refreshes the table in SKILL-CUP.md.
