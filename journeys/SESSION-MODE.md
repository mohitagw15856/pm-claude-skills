# Session mode — run a pack as one guided conversation (product idea #12)

Today the Playground and cockpit run **one skill at a time**. Session mode runs a whole **journey** (`JOURNEYS.md`) as a single continuous, guided conversation: the agent walks the steps in order, carries context forward, repeats the boundary, and knows when it's done.

## The contract (what the UI consumes)
`node scripts/journey-to-session.mjs <id>` emits a **session plan**: an ordered list of step prompts. Each prompt already contains:
1. the skill to run,
2. the **carried context** from earlier steps ("you already have: severance terms; sign-by date — don't ask again"),
3. the journey's **boundary** line.

The UI's job is small: hold the conversation, feed step *N*'s prompt when step *N−1*'s output is accepted, and let the user **skip** optional steps or **stop**. The agent does the rest.

## State to keep (per session, client-side only)
- `journey_id`, `current_step`, `skipped[]`
- `carried` — the small facts each step produced (the `carry` fields), passed forward in the next prompt
- Nothing else. **No transcript leaves the browser** — same no-telemetry posture as the Playground.

## UX rules
- **Show the map.** A step rail (1 → 5) with the current step lit and optional steps marked, so the person sees they're on a path with an end.
- **One step's output at a time.** Don't dump the whole plan; the value of a journey is pacing.
- **Accept / redo / skip** on every step. "Skip" is first-class for optional steps.
- **Boundary visible, every step.** For high-stakes journeys the not-advice line is part of the step header, not a footer.
- **Voice journeys** (`"voice": true`) use the `hands-free-voice` output style: one short spoken step, "say next or repeat."
- **Done state** shows `done_when` and offers the related packs.

## Minimal wiring (Playground)
- Add a "Run as a session" entry point on each pack in `PACKS.md`/`web/starter-pack.html` that loads `journeys/<id>.json`.
- Use the existing single-skill run path per step; only the *prompt* changes (it comes from the session plan), so nothing about the model call or the free-run quota changes.
- The cockpit (`cockpit/`) can adopt the same plan format for the work-side workflows in `WORKFLOWS.md` later — journeys and workflows share the shape.

## Why this is the biggest UX lever left
A pack turns a warehouse into a path; a session turns the path into a *guide*. For someone in a crisis, "do this next" beats "here are five skills" every time.

## Gating a step (auto-advance)
A session should advance itself when a step's output is complete and carries what the next step needs — and stop to ask only when it isn't. `scripts/journey-gate.mjs <journey> <stepIndex> --output <file>` returns `proceed: true|false` from two typed questions (completeness as a 3-level score; carry-forward present as yes/no) and exits 0 / 3 accordingly. Without a decision-model key it uses a structural heuristic and says so (`method: heuristic`). The `carry` list on each step is the contract the gate checks.
