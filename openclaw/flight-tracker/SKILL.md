---
name: flight-tracker
description: "Track live aircraft positions with zero API keys — adsb.lol's open ADS-B network primary, OpenSky fallback, via curl: by callsign, registration, or area. Use when asked where is this flight right now, what planes are overhead, track a tail number, or is that flight in the air. Produces the live position with altitude, speed, and heading interpreted, the overhead list for a location, and the rerunnable command — with the positions-not-schedules boundary stated honestly."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/flight-tracker.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Flight Tracker Skill

"Where's that flight right now?" has a genuinely open answer: hobbyist ADS-B receiver networks share live aircraft transponder data keylessly — adsb.lol serves it clean, OpenSky backs it up. This skill queries by callsign, hex, or area, and translates transponder math into human answers ("over Poland at 38,000 ft, ~40 minutes from Warsaw-ish airspace"). It's equally honest about the boundary: this is *positions*, not airline operations — gate changes, delays, and cancellations live in keyed commercial services, and pretending otherwise produces confident fiction.

## What This Skill Produces

- **The position** — where the aircraft is now: location in words, altitude, ground speed, heading, climb/descent
- **The overhead list** — aircraft above/near a point, sorted by distance
- **The interpretation** — cruise vs. descent, direction of travel, rough progress — labeled as inference from position data
- **The command** — exact curl, rerunnable — and the boundary line when the question was schedule-shaped

## Required Inputs

Ask for these if not provided:
- **The identifier** — callsign (what ATC uses: `BAW123`, often ≈ flight number with the airline's ICAO prefix — BA→BAW, LH→DLH, UA→UAL; do the mapping and say so), registration/tail number, or ICAO hex
- **Or the place** — lat/lon for "what's overhead" questions, with a radius
- **What they actually want** — position/curiosity vs. "is it delayed / when does it land" — the second gets the honest redirect plus what positions *can* infer

## Framework: The Network and the Boundary

1. **adsb.lol — primary:** by callsign: `curl -s "https://api.adsb.lol/v2/callsign/BAW123"` · by registration: `.../v2/reg/G-XLEB` · by hex: `.../v2/hex/4075a2` · overhead: `.../v2/lat/51.5/lon/-0.12/dist/25` (nm). Fields per aircraft: `flight` (callsign), `alt_baro` (ft), `gs` (knots), `track` (° heading), `baro_rate` (ft/min climb/descent), `lat/lon`, `t` (type).
2. **OpenSky — fallback:** `curl -s "https://opensky-network.org/api/states/all?lamin=51.4&lamax=51.6&lomin=-0.4&lomax=0.2"` — anonymous access, tighter rate limits; state vectors as positional arrays (index 1 callsign, 5/6 lon/lat, 7 baro alt m, 9 velocity m/s). **Units differ between the two** (ft/knots vs. m and m/s) — convert deliberately, never mix.
3. **Interpret the physics:** `baro_rate` near 0 at 35,000+ ft = cruise; sustained −1,500 ft/min = descent (landing within ~30–45 min, framed as an estimate); track + position = direction in words ("heading east over Poland"). All labeled inference.
4. **Coverage honesty:** ADS-B networks depend on volunteer ground receivers — coverage is excellent over Europe/NA, patchy over oceans and parts of Africa/Asia. "Not found" means *not currently received or not airborne*, and the answer says both possibilities, not "the flight doesn't exist."
5. **The schedule boundary:** delays, gates, cancellations, scheduled times → keyed services (airline apps, FlightAware/FR24) — name them, don't fake them. What positions legitimately infer (airborne yes/no, descent begun, rough progress) is offered as the keyless consolation, labeled as inference.

## Output Format

# Flight: [callsign/reg] — [fetch time]

**[The answer: "Airborne — over [area] at [alt] ft, [speed] kn, heading [direction]; descending, likely landing within ~[range]." or the honest not-received line.]**

| Field | Value |
|---|---|
[Position (words + coords) · altitude · speed · heading · climb/descent · aircraft type]

[Overhead mode: table sorted by distance]

Source: [adsb.lol / OpenSky] community ADS-B · as of [time] · rerun: `[exact curl]`
[Schedule-shaped questions: the boundary line + what position data can and can't infer]

## Quality Checks

- [ ] Flight numbers were mapped to ICAO callsigns with the mapping shown
- [ ] Units are consistent and stated (the two sources differ)
- [ ] Inferences (descent, ETA-ish) are labeled as inferences from position
- [ ] "Not found" answers include the coverage explanation, both possibilities
- [ ] Schedule questions get the honest boundary, not improvised delay data

## Anti-Patterns

- [ ] Do not fake schedule data — delays and gates are not in ADS-B, and confident fiction here strands people
- [ ] Do not mix the two sources' units — a 10,000 m cruise is not a 10,000 ft one
- [ ] Do not present patchy coverage as "flight doesn't exist"
- [ ] Do not track people — flights and public transponder data, not persistent monitoring of individuals' movements
- [ ] Do not answer from memory — a remembered aircraft position is nonsense by construction

## Example Trigger Phrases

- "Where is this flight right now?"
- "What planes are overhead?"
- "Track a tail number."
- "Is that flight in the air?"
