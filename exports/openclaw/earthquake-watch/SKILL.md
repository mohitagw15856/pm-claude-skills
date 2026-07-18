---
name: earthquake-watch
description: "Check recent earthquakes worldwide with zero API keys — USGS real-time GeoJSON feeds via curl, filtered by magnitude, region, and time window. Use when asked was there an earthquake just now, recent quakes near a place, any big earthquakes today, or monitor seismic activity somewhere. Produces the matching events with magnitude, depth, location and time, the felt/damage context bands, and the rerunnable command — with the official-guidance line safety questions require."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/earthquake-watch.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Earthquake Watch Skill

"Did we just have an earthquake?" gets asked within seconds of every tremor, and the USGS answers globally in near-real-time over keyless HTTPS. This skill knows the feed matrix (magnitude threshold × time window), filters to the place actually asked about, and frames magnitudes honestly — a 4.5 under a city and a 6.0 under the ocean are different events, and depth is half the story. For anything safety-shaped, it points at official emergency guidance rather than improvising any.

## What This Skill Produces

- **The events** — matching quakes with magnitude, depth, location, and time (converted to the user's zone)
- **The context read** — what that magnitude/depth typically means for feeling it and damage, as bands not predictions
- **The regional filter** — the feed is global; the answer is about the place asked
- **The command** — exact curl, rerunnable

## Required Inputs

Ask for these if not provided:
- **Where** — a place to filter around (the feeds are global; lat/lon of the place makes distance filtering honest)
- **The window** — "just now" (past hour feed), today, this week
- **The threshold** — significant-only vs. everything-they-can-feel (M2.5+) vs. research-grade (all)

## Framework: The Feed Matrix and the Framing

1. **The feeds** — `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/{mag}_{window}.geojson` where mag ∈ `significant`, `4.5`, `2.5`, `1.0`, `all` and window ∈ `hour`, `day`, `week`, `month`. "Just felt something" → `2.5_hour`; "big ones today" → `4.5_day`. Each feature: `properties.mag`, `.place`, `.time` (epoch ms), `.url` (event page), `geometry.coordinates` = [lon, lat, **depth km**].
2. **Targeted queries beat feed-filtering for specific regions:** `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&latitude=35.68&longitude=139.69&maxradiuskm=300&starttime=2026-07-17&minmagnitude=3` — the fdsnws endpoint takes radius, time, magnitude bounds directly.
3. **Magnitude bands, stated with every event:** <3 rarely felt · 3–4 felt, no damage · 4–5 felt widely, minor damage possible near epicenter · 5–6 damage possible in built-up areas · 6–7 serious damage potential · 7+ major. **Depth modifies everything:** a shallow (<20km) M5 outfeels a 200km-deep M6 — say both numbers together.
4. **Times get converted:** feed times are epoch UTC; the answer speaks the user's local time ("14 minutes ago, 03:12 local").
5. **The safety line:** for "should I worry / is a bigger one coming" — aftershock probabilities and tsunami assessments belong to official agencies; link the event's USGS page and name the authoritative sources (national geological survey, tsunami warning centers) instead of improvising reassurance or alarm.

## Output Format

# Earthquakes: [region] — [window]

**[The direct answer: "Yes — M4.7, 22km deep, 38km NE of [place], 14 min ago" or "No M2.5+ events near [place] in the past [window]."]**

| Time (local) | Mag | Depth | Location | USGS link |
|---|---|---|---|---|

[Context band for the notable event(s) · aftershock/official-guidance line when safety is in the air]

Source: USGS real-time feeds · rerun: `[exact curl]`
*Informational — for safety decisions follow official emergency guidance, not this summary.*

## Quality Checks

- [ ] The direct yes/no answer leads before any table
- [ ] Depth appears next to magnitude on every quoted event
- [ ] Times are converted to the user's local zone with the relative offset
- [ ] Regional questions used radius filtering, not eyeballed global feeds
- [ ] Safety-shaped questions route to official sources by name

## Anti-Patterns

- [ ] Do not answer from memory — seismicity is the definition of live data; fetch or hand over the command
- [ ] Do not quote magnitude without depth — half the felt-intensity story
- [ ] Do not predict aftershocks or all-clears — that's official-agency territory, linked not imitated
- [ ] Do not present the global significant feed as "nothing near you" — filter by place before saying no
- [ ] Do not dramatize small events or shrug at large ones — the bands calibrate the tone
