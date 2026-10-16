# Stargazing Tonight

You don't need a telescope or a dark-sky reserve to have a good night under the stars — you need to know what's up, roughly where to look, and what's realistic from your backyard. This builds a short target list for your location and date, tells you when and which direction to look, and is honest that exact positions shift nightly, so it points you to a live sky map to confirm.

## What This Skill Produces

- **A target list for tonight** — bright planets, the Moon phase, easy constellations, and any notable event, filtered by your light pollution
- **When & where to look** — rough time window and compass direction/altitude for each target
- **Gear notes** — what's naked-eye, what rewards binoculars, what needs a telescope
- **Conditions to check** — Moon brightness, weather/cloud, and finding a darker spot
- **The verify step** — a nudge to confirm exact positions/times in a live planetarium app, since the sky changes nightly

## Required Inputs

Ask for these if not provided:
- **Location** — city/region (or rough latitude) — drives what's visible
- **Date & time** — tonight, or a specific evening
- **Light pollution** — city, suburb, or dark rural sky
- **Gear** — naked eye, binoculars, or a telescope
- **Experience** — total beginner or knows the basics

## Framework: Realistic Targets, Verified Live

1. **Start with the easy wins.** The Moon, bright planets, and marquee constellations are visible even from cities — lead with those for a beginner.
2. **Filter by light pollution.** Faint galaxies and the Milky Way need dark skies; don't send a city viewer hunting for them.
3. **Give direction and altitude, roughly.** "Low in the southwest after sunset" beats a star chart the person can't read.
4. **Match targets to gear.** Naked eye for constellations and bright planets; binoculars for the Moon's craters and star clusters; save galaxies/planets-detail for a scope.
5. **Flag the moving sky.** Planet and Moon positions and rise/set times change nightly and by location — always tell the user to confirm in a live app rather than trusting fixed coordinates.

## Output Format

### Tonight: [location] · [date] · [sky darkness] · [gear]

**Look for**
- 🌙 Moon — [phase], [when/where].
- 🪐 [Planet] — [when/where, naked-eye/binoculars].
- ✨ [Constellation/cluster] — [direction], [gear].

**Conditions:** Moon brightness [x] · check weather/cloud · darker spot: [tip].
**Beginner tip:** [how to orient — e.g. find X first, star-hop to Y].

> Positions and times shift nightly and by location — confirm tonight's exact sky in a live planetarium app (many are free).

## Quality Checks
- [ ] Targets are filtered by the location's light pollution
- [ ] Each target has a rough time and direction
- [ ] Gear notes distinguish naked-eye vs binocular vs telescope
- [ ] Moon phase/brightness and weather are flagged as conditions
- [ ] Tells the user to verify exact positions in a live app

## Anti-Patterns
- **Asserting exact coordinates/times** as fixed — the sky moves; point to a live app.
- **Sending a city viewer after the Milky Way** or faint galaxies.
- **Ignoring the Moon washing out** faint targets.
- **Star charts a beginner can't use** with no plain directions.
- **Recommending targets below the horizon** for that date/location.

## Example Trigger Phrases
- "What can I see in the sky tonight from London?"
- "Plan a stargazing session — I've got binoculars, suburb sky."
- "There's a really bright thing in the west after sunset — what is it?"
- "Help me find Orion and anything else easy tonight."
- "Best things to look at with a small telescope this evening?"
