# 🧭 Journeys — packs you can *run*, not just read

A **pack** (`PACKS.md`) is a reading list. A **journey** is the runnable version: the same skills in the order that matters, with the context from each step **carried into the next** so you're never asked for the same thing twice. Run one as a single guided session instead of skill-by-skill.

| Journey | Start when… | Steps |
|---|---|---|
| 💼 [Just laid off](journeys/just-laid-off.json) | "I just got laid off" | severance → money → benefits → network → negotiation |
| 💸 [Money in crisis](journeys/money-in-crisis.json) | "I can't pay all my bills" | triage → collectors → garnishment* → benefits cliff* → bankruptcy* |
| 🕊️ [Losing someone](journeys/losing-someone.json) | "My dad died" | notifications → eulogy* → estate* → work* → the year of firsts |
| 🍼 [New parent](journeys/new-parent.json) | "Bringing the baby home" | logistics → benefits → daycare decision* → sleep |
| 🎧 [Caring for a parent — hands-free](journeys/hands-free-caregiver.json) | "Read me the medication list" | appointment → medications → care team → burnout → respite* |

\* optional step — skipped if it doesn't apply.

## How a journey works
Each `journeys/<id>.json` has: **triggers** (how people say it), one **boundary** (the not-advice line, repeated every step), an **ask_first** (the one question that sets the order), ordered **steps** — each with a `skill`, a `why` (why now), and `carry` (what this step produces that later steps need) — and a **done_when**.

`scripts/journey-to-session.mjs` turns that into an ordered **session plan** where step *N*'s prompt says *"run this skill; you already have X, Y from earlier — don't ask again."* That plan is what a *run-this-pack-as-one-session* mode consumes (see `journeys/SESSION-MODE.md`).

```
node scripts/journey-to-session.mjs --check            # every journey valid, every skill exists
node scripts/journey-to-session.mjs money-in-crisis    # print the session plan
node scripts/journey-to-session.mjs --all              # render all → journeys/rendered/
```

## Writing a journey
- **Order is the value.** Put the time-sensitive step first (a sign-by date, a garnishment window). `ask_first` is the question that reveals the order.
- **Carry, don't re-ask.** Anything a later step needs, list in the earlier step's `carry`.
- **One boundary, every step.** High-stakes journeys keep the not-advice line on every step, not just the first.
- **Mark optional steps.** Not everyone in crisis faces garnishment; not every bereaved person gives a eulogy.
- **Real skill names only** — `--check` fails on a typo.

Next journeys to build: *New to this country*, *Starting over after incarceration*, *Getting serious about AI* (the other three packs), then work journeys (*Ship a feature* already exists as a workflow in `WORKFLOWS.md` — journeys are the life-side counterpart).
