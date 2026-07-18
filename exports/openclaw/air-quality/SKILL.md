---
name: air-quality
description: "Check live air quality anywhere with zero API keys — Open-Meteo's air-quality API via curl, decoded from raw PM2.5 and AQI numbers into what they mean for going outside. Use when asked what's the air quality, is it safe to run outside, AQI in my city, or pollution levels right now. Produces the current AQI and pollutant levels, the plain-language health read with the standard bands, and the rerunnable command."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/air-quality.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Air Quality Skill

Air quality is a daily decision input — run outside or inside, windows open or closed, mask or not — and Open-Meteo serves it globally over plain HTTPS, no key, no signup. This skill fetches it, then does the part the raw number doesn't: translating PM2.5 and AQI into the standard health bands, matched to what the user was actually deciding.

## What This Skill Produces

- **The read** — one sentence: the air right now and what it suggests for the stated activity
- **The numbers** — AQI plus the pollutants that matter (PM2.5, PM10, ozone, NO₂), with the timestamp
- **The bands** — where today sits on the standard scale, so the number has meaning
- **The command** — the exact curl, rerunnable

## Required Inputs

Ask for these if not provided:
- **Location** — lat/lon or a place name (geocode first: `https://geocoding-api.open-meteo.com/v1/search?name=Delhi&count=1`)
- **The decision behind the question** — a run, a bike commute, a sensitive-lungs household, open windows — the read is calibrated to it
- **Which index they think in** — US AQI or European AQI (the API serves both; the numbers differ substantially for the same air)

## Framework: The Fetch and the Read

1. **The call:** `curl -s "https://air-quality-api.open-meteo.com/v1/air-quality?latitude=28.61&longitude=77.21&current=pm2_5,pm10,ozone,nitrogen_dioxide,us_aqi,european_aqi"` — add `&hourly=pm2_5,us_aqi&forecast_days=2` when the question is "when today will it be best."
2. **The US AQI bands, stated every time:** 0–50 good · 51–100 moderate · 101–150 unhealthy for sensitive groups · 151–200 unhealthy · 201–300 very unhealthy · 301+ hazardous. A bare "AQI 137" is not an answer; "137 — unhealthy for sensitive groups; fine for most, skip the long run if asthmatic" is.
3. **PM2.5 is the headline pollutant** for health questions (it reaches deep lung tissue); ozone matters for afternoon exercise; NO₂ tracks traffic. Match the pollutant discussed to the question asked.
4. **Timing beats averages:** pollution has a daily shape (traffic peaks, afternoon ozone) — for exercise questions, pull the hourly series and name the cleanest window rather than judging the day by one reading.
5. **Model honesty:** Open-Meteo's air quality is model-derived (CAMS), not a monitor on the user's street — excellent for bands and trends, not for litigation. Say "modeled" when precision is being leaned on, and point sensitive-health decisions to local official monitors.

## Output Format

# Air Quality: [location] — [timestamp]

**[One sentence: the band, and the answer to their actual decision.]**

| Metric | Now | Band |
|---|---|---|
[US or EU AQI per preference · PM2.5 · the pollutant relevant to their question]

[If timing asked: the hourly shape and the recommended window]

Source: Open-Meteo air-quality API (modeled/CAMS) · rerun: `[exact curl]`
*Advisory reading — for medical-grade decisions use official local monitoring.*

## Quality Checks

- [ ] The band appears with the number — never a bare AQI value
- [ ] US vs European AQI is disambiguated
- [ ] The read addresses the stated activity, not generic health advice
- [ ] Timing questions get the hourly series, not a single reading
- [ ] The modeled-data caveat appears when precision matters

## Anti-Patterns

- [ ] Do not answer from memory — fetch or hand over the command
- [ ] Do not mix up the two AQI scales — a European 80 and a US 80 are different airs
- [ ] Do not medicalize — bands and general guidance, with sensitive cases routed to official sources
- [ ] Do not judge a whole day by one hour when the question is "when"
- [ ] Do not dump all pollutants undigested — lead with the one the question is about
