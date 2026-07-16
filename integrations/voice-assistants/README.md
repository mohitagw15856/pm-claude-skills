# PM Skills — voice assistants (speaker & watch)

Invoke the library by voice. The shared design: a voice device is a lousy place
to read a full PRD, so these **name the right skill out loud** and push the full
artifact to your phone via a playground deep link. With your own key, they'll
also read a short spoken draft (first moves, under ~90 words).

| Platform | What's here | Runs on |
| --- | --- | --- |
| **Alexa** | [`alexa/`](alexa/) — interaction model + Lambda handler | Echo speakers, Fire |
| **Google Assistant** | [`google/`](google/) — Actions webhook (Worker) | Nest speakers, Android |
| **Apple Watch / Siri** | [`apple-watch/`](apple-watch/) — Shortcuts recipe | Watch, HomePod, iPhone |

## Shape

All three call the same public API:

1. `GET /v1/search?q=<task>` → the best-fit skill.
2. Speak its title; hand `SITE/?skill=<name>` to the phone.
3. *(optional, with `ANTHROPIC_API_KEY`)* `GET /v1/skills/<name>` → run the
   `instructions` as the system prompt → speak a short draft.

## Honest scope

- **Alexa** and **Google** ship deployable handlers (Lambda / Worker) with real
  intent handling and live API calls; you provide the skill/action registration
  in each console and (optionally) the run key as an env var.
- **Apple Watch** uses Shortcuts rather than a native app — the auditable recipe
  is the deliverable, since a `.shortcut` is a signed binary that can't live in
  git as source. Your key stays on your devices.
- No secrets are committed; each platform holds its own.

MIT © Mohit Aggarwal
