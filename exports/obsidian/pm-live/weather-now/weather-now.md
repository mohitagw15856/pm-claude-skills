---
aliases: ["Weather Now"]
tags: [pm-skills, skill]
skill: weather-now
description: "Get current weather and forecasts with zero API keys — wttr.in one-liners for humans, Open-Meteo JSON for data, with the exact curl commands and format codes. Use when asked what's the weather, will it rain today, forecast for a city, or get me weather data for a location. Produces the live conditions or forecast pulled via curl, interpreted plainly, with the source timestamp and the command used shown so the user can rerun it."
---

# Weather Now Skill

Weather is the perfect agent utility: everyone asks, and two excellent services answer over plain HTTPS with no keys, no signup, no SDK. This skill knows both — wttr.in for beautiful one-line and full-terminal answers, Open-Meteo for structured JSON when the task needs numbers — plus the format codes and fallback discipline that make the answer reliable instead of lucky.

## What This Skill Produces

- **The answer** — current conditions or forecast, interpreted in one plain sentence before any raw data
- **The data** — the relevant fields (temp, precipitation, wind, humidity) at the units the user lives in
- **The command** — the exact curl used, shown so the user can rerun or script it
- **The caveat line** — data source and its timestamp; weather data is advisory, not aviation/safety-grade

## Required Inputs

Ask for these if not provided:
- **Location** — city name, airport code (wttr.in takes IATA), lat/lon, or "here" (ask rather than guess the user's location)
- **What they actually want** — right-now vs. today vs. multi-day; "will it rain" wants precipitation timing, not a temperature
- **Units** — metric/imperial if ambiguous from the location

## Framework: The Two Services

1. **wttr.in — primary for human answers:** `curl -s "wttr.in/Tokyo?format=3"` → one line. Format codes: `%c` condition icon, `%t` temp, `%h` humidity, `%w` wind, `%p` precipitation, `%m` moon phase — compose as `?format="%l:+%c+%t,+wind+%w"`. Full 3-day panel: `curl -s "wttr.in/Tokyo"` (add `?m` metric, `?u` imperial, `?T` no-color for parsing). Airport codes work: `wttr.in/nrt`. PNG for sharing: `wttr.in/Tokyo.png`.
2. **Open-Meteo — primary for data, fallback for everything:** `curl -s "https://api.open-meteo.com/v1/forecast?latitude=35.68&longitude=139.69&current_weather=true"` → JSON. Rich forecasts: append `&hourly=temperature_2m,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto&forecast_days=3`. Geocode names first when needed: `https://geocoding-api.open-meteo.com/v1/search?name=Tokyo&count=1`.
3. **Fallback discipline:** wttr.in rate-limits and occasionally naps — on any non-weather response, switch to Open-Meteo silently and say which source answered. Never present a failed fetch as "no data exists."
4. **Interpret, don't dump:** the deliverable is "light rain from ~3pm, carry the umbrella" with the numbers beneath — not a JSON blob. Weather codes from Open-Meteo (WMO codes: 0 clear, 1–3 clouds, 51–67 rain, 71–77 snow, 95+ thunderstorm) get translated to words.
5. **Timestamp honesty:** quote the observation/forecast time from the response; if the tool environment has no network, say so and provide the command for the user to run — never recite remembered weather.

## Output Format

# Weather: [location, resolved]

**[The one-sentence answer to what they actually asked.]**

[Conditions table or forecast lines, right units] 

Source: [wttr.in / Open-Meteo] at [response timestamp] · rerun: `[the exact curl]`
*Live data, advisory only — for safety-critical decisions use official meteorological services.*

## Quality Checks

- [ ] The first line answers the actual question (rain timing, not temperature, if rain was asked)
- [ ] Units match the user's locale or stated preference
- [ ] The source and its timestamp are quoted
- [ ] The rerunnable curl appears
- [ ] Fallback engaged silently on primary failure, and the answer names which source spoke

## Anti-Patterns

- [ ] Do not answer from memory — no network means no weather; say so and hand over the command
- [ ] Do not dump raw JSON as the answer — interpret first, data second
- [ ] Do not guess the user's location — ask, or use the location they named
- [ ] Do not present a rate-limited wttr.in error page as weather
- [ ] Do not oversell precision — hour-level precipitation timing is a forecast, and the wording should sound like one

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text — replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}
