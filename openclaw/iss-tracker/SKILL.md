---
name: iss-tracker
description: "Track the International Space Station live with keyless curl — where it is right now, what it's over, and when to look up, with the orbital math translated into human terms. Use when asked where is the ISS right now, is the space station overhead, when can I see the ISS tonight, or track the station for the kids. Produces the live position translated to a place name, the overhead-math explained, the visibility rules of thumb, and the rerunnable command — the library's proof that live data can also just be delightful."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/iss-tracker.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# ISS Tracker Skill

Somewhere over your head, sixteen times a day, a football-field-sized laboratory does 27,600 km/h — and a keyless API tells you exactly where it is this second. This skill fetches the position and does the translation that makes it land: raw coordinates become "over the South Pacific, heading northeast toward Chile," and the when-can-I-see-it question gets the honest two-part answer (the rules of thumb that always hold, plus the pointer to precise pass predictions, which need more than an anonymous curl). It's the library's purest fun skill, and it behaves like one — while keeping every number real.

## What This Skill Produces

- **The position, translated** — coordinates → the ocean/country/region it's over, with direction of travel
- **The astronaut answer** — how high, how fast, how often it orbits — the numbers people actually retell
- **The visibility read** — the rules for seeing it (and why "right overhead" ≠ "visible"), with the route to precise pass times
- **The command** — exact curl, rerunnable — and delightful to hand to a kid

## Required Inputs

Ask for these if not provided:
- **Nothing, for "where is it"** — that's the beauty; fetch and answer
- **A location, for "is it near me / when can I see it"** — city or lat/lon, for the distance math and the visibility read
- **The audience** — a curious adult and a seven-year-old deserve different sentences; this skill calibrates joyfully either way

## Framework: The Fetch and the Translation

1. **The call:** `curl -s "http://api.open-notify.org/iss-now.json"` → `iss_position.latitude/longitude` + timestamp. A second fetch ~30 seconds later gives direction of travel from the delta — worth doing; "heading northeast" is half the story's life. (wheretheiss.at's richer API — altitude, velocity per call — is the fallback/enrichment when reachable.)
2. **Translate coordinates or say why not:** the lat/lon maps to a named place (ocean names count — it's over water ~70% of the time, which is itself a fun fact to deliver); the translation is the product, the raw numbers are the receipt.
3. **The stable facts carry the wonder:** ~420 km up · ~27,600 km/h · one orbit every ~92 minutes · 16 sunrises a day for the crew — stated from knowledge, labeled as the stable facts they are (the *position* is fetched; the *altitude class* barely changes).
4. **Visibility honesty:** seeing it requires (a) the station over-ish your horizon, (b) your sky dark, (c) the station still sunlit — which is why passes cluster after dusk and before dawn. Overhead at 2pm = invisible; overhead at 2am = usually invisible (station's in shadow too). The rules of thumb get taught; *precise* pass predictions need orbital propagation — point to the standard spotting services by type rather than faking a timetable.
5. **Distance math when a location is given:** great-circle distance from user to the ground track, honestly framed ("passing 1,200 km south of you — below your horizon this orbit") — the near-miss answer is still a good answer when it's true.

## Output Format

# ISS Right Now — [timestamp]

**Over [the place], heading [direction] — next up: [what's ahead on the track].**

Altitude ~420 km · speed ~27,600 km/h · orbit every ~92 minutes (the crew sees 16 sunrises a day)

[Location given: "[N] km from you — [above/below] your horizon" · the visibility read: tonight's rules of thumb + where precise pass times live]

Source: open-notify.org (position fetched live; orbital constants are stable facts) · rerun: `curl -s http://api.open-notify.org/iss-now.json`

## Quality Checks

- [ ] The position is translated to a named place, direction included when two fetches allow
- [ ] Fetched data and stable facts are labeled as what they are
- [ ] Visibility answers teach the three conditions, never fake a pass time
- [ ] Location-given answers include the horizon verdict, honest either way
- [ ] The tone matches the audience — wonder is in-spec here

## Anti-Patterns

- [ ] Do not answer position from memory — it moved 8 km while you read this sentence, which is the point
- [ ] Do not dump raw coordinates as the answer — the translation is the skill
- [ ] Do not invent pass times — rules of thumb yes, timetables need real propagation, say so
- [ ] Do not confuse overhead with visible — the sunlight condition is the teach
- [ ] Do not flatten the fun — this skill is allowed to be delighted; precision and joy aren't rivals

## Example Trigger Phrases

- "Where is the ISS right now?"
- "Is the space station overhead?"
- "Can I see the ISS tonight?"
- "Track the station for the kids."
