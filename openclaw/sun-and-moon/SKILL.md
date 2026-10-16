---
name: sun-and-moon
description: "Get sunrise, sunset, golden hour, day length, and moon phase for any location with zero API keys — sunrise-sunset.org and Open-Meteo via curl, times converted to local. Use when asked when is sunset today, golden hour for a photo shoot, how long is the day, what's the moon phase tonight, or sun times for a date and place. Produces the sun/moon times in the user's local zone (the UTC trap handled), the photography windows, and the rerunnable command."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/sun-and-moon.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Sun and Moon Skill

Sunset time drives photo shoots, hikes, drone flights, fasting schedules, and the eternal "do we have time before dark" — and two keyless services answer it for any coordinates and date. This skill fetches, then does the two things the raw response doesn't: **converts UTC to the place's local time** (the classic wrong-answer generator in this domain), and derives the windows people actually want — golden hour, blue hour, usable daylight.

## What This Skill Produces

- **The times** — sunrise, sunset, solar noon, twilight bounds — in the *location's* local time, labeled
- **The derived windows** — golden hour (~the hour after sunrise / before sunset), blue hour, day length and its current trend
- **Moon phase** — tonight's phase with the plain-language name
- **The command** — exact curl, rerunnable

## Required Inputs

Ask for these if not provided:
- **Location** — lat/lon or a place name (geocode via `https://geocoding-api.open-meteo.com/v1/search?name=Lisbon&count=1`)
- **The date** — today default; any date works (both services take past and future dates)
- **The real question** — a shoot wants golden hour, a hike wants last-light, "is it a full moon" wants the phase — lead with theirs

## Framework: The Calls and the UTC Trap

1. **sunrise-sunset.org — primary:** `curl -s "https://api.sunrise-sunset.org/json?lat=35.68&lng=139.69&formatted=0&date=2026-07-19"` → ISO times including `civil_twilight_begin/end` and `day_length` (seconds). **Always `formatted=0`** and always convert: the times are UTC, and serving Tokyo's sunset as "09:57" is this domain's signature failure. Get the zone from the world-clock pattern or Open-Meteo's `timezone=auto`.
2. **Open-Meteo — fallback and bulk:** `curl -s "https://api.open-meteo.com/v1/forecast?latitude=35.68&longitude=139.69&daily=sunrise,sunset,daylight_duration&timezone=auto&forecast_days=7"` — `timezone=auto` returns *local* times directly (safer), and a week in one call for trend questions.
3. **Moon phase:** `curl -s "wttr.in/Tokyo?format=%m"` → the phase emoji; for the name and precision, compute from the synodic cycle (29.53 days from a known new moon) and say "waxing gibbous, ~87% illuminated" — labeled as computed.
4. **The derived windows:** golden hour ≈ sun within 6° of horizon — practical answer: the ~60 minutes after sunrise and before sunset; blue hour ≈ civil twilight. State them as ranges ("golden hour: 18:40–19:45"), which is what the photographer books.
5. **Trend and context:** day_length compared across the week answers "are days getting longer"; near solstices, note the daily change is seconds, near equinoxes minutes — precision theater either way is avoided.

## Output Format

# Sun & Moon: [location] — [date]

**[The lead answer: "Sunset 19:45 local; golden hour 18:45–19:45."]**

| Event | Local time |
|---|---|
[Sunrise · solar noon · sunset · civil twilight · day length]

**Moon:** [phase name, ~illumination] 
[Trend line if asked: day length vs. yesterday/next week]

Source: [sunrise-sunset.org / Open-Meteo] · times local to [zone] · rerun: `[exact curl]`

## Quality Checks

- [ ] Every time is explicitly local to the location, with the zone named
- [ ] `formatted=0` was used and UTC→local conversion applied (or timezone=auto took care of it)
- [ ] The asked-for window (golden hour, last light) leads the answer
- [ ] Moon phase carries its name, not just an emoji
- [ ] Computed values (moon %, golden hour) are labeled as derived

## Anti-Patterns

- [ ] Do not serve UTC times as local — the single failure mode this skill exists to prevent
- [ ] Do not answer from memory — sun times shift daily and by latitude dramatically
- [ ] Do not give bare sunset when the question was a photography or safety window
- [ ] Do not overstate moon precision — phase and rough illumination, not fake decimals
- [ ] Do not ignore polar edge cases — high latitudes in summer/winter return no-sunset/no-sunrise; report that as the (correct) answer, not an error

## Example Trigger Phrases

- "When is sunset today?"
- "When's golden hour for my shoot?"
- "How long is the day?"
- "What's the moon phase tonight?"
