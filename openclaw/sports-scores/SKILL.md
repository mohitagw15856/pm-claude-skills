---
name: sports-scores
description: "Get live scores, schedules, and standings for major leagues with zero API keys — ESPN's public JSON endpoints via curl, covering NFL, NBA, MLB, NHL, and world football. Use when asked what's the score, did my team win, today's games, or league standings right now. Produces the scores with game state (live/final/scheduled), the asked-team answer first, and the rerunnable command — with the unofficial-API caveat stated."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/sports-scores.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Sports Scores Skill

"Did we win?" is a live-data question with a keyless answer: ESPN serves structured JSON scoreboards for every major league over plain HTTPS — no key, no signup. The endpoints are *unofficial* (publicly accessible but undocumented, and they occasionally reshape), so this skill pairs them with the discipline that makes unofficial sources usable: state the source, expect drift, and never present a stale scoreboard as live.

## What This Skill Produces

- **The answer** — the asked team's score/result first, with game state (live Q3, final, starts 19:30 local)
- **The slate** — today's games for a league when that's the question
- **Standings/schedule** — where the endpoints serve them
- **The command** — exact curl, rerunnable, with the unofficial caveat

## Required Inputs

Ask for these if not provided:
- **Team or league** — resolve nicknames ("the Niners" → San Francisco 49ers, NFL); ambiguous city names ("New York") get asked
- **Which game** — today's default; "did they win" on an off-day means the most recent game — say which game is being answered
- **Time zone** — game times convert to the user's local

## Framework: The Endpoint Map and the Discipline

1. **Scoreboards:** `curl -s "https://site.api.espn.com/apis/site/v2/sports/{sport}/{league}/scoreboard"` — pairs: `football/nfl`, `basketball/nba`, `baseball/mlb`, `hockey/nhl`, `basketball/wnba`, `football/college-football`, `soccer/eng.1` (Premier League; other comps: `esp.1`, `ita.1`, `ger.1`, `uefa.champions`, `usa.1`). Add `?dates=YYYYMMDD` for a specific day. Each event: `competitions[0].competitors[]` (`team.displayName`, `score`, `homeAway`), `status.type` (`state`: pre/in/post, `detail`: "Final", "End of 3rd").
2. **Teams and standings:** `.../{sport}/{league}/teams` for the id map · `.../{sport}/{league}/standings` where available · a team's schedule: `.../teams/{id}/schedule`.
3. **State is part of the score:** "Lakers 98–95" means opposite things live-in-Q4 vs. final — the state string accompanies every score, and live answers carry their fetch time ("as of 21:42 — game in progress").
4. **The nickname resolution step:** fetch the teams list once when unsure rather than guessing which "Rangers" (NHL? MLB? Scottish football?) — the wrong-team answer is this domain's cardinal sin.
5. **The unofficial-source honesty:** these endpoints are publicly served but undocumented — they can reshape or vanish without notice. Say "via ESPN's public feed" in the answer; on a failed or weird response, report that rather than improvising a score. **Never answer scores from memory** — training-data scores are, by definition, old games.

## Output Format

# [Team/League]: [the game]

**[The direct answer: "49ers won 27–20 (final, last night)" or "Down 95–98, 4:12 left in the 4th — as of 21:42."]**

| Matchup | Score | State | Time (local) |
|---|---|---|---|
[The slate, when a league day was asked]

Source: ESPN public feed (unofficial) · as of [fetch time] · rerun: `[exact curl]`

## Quality Checks

- [ ] The asked team's result leads; the slate follows
- [ ] Every score carries its game state, and live scores their fetch time
- [ ] Nicknames/cities resolved to the right team, asked about when ambiguous
- [ ] Game times converted to the user's zone
- [ ] The unofficial-source line appears

## Anti-Patterns

- [ ] Do not answer scores from memory — every remembered score is an old score
- [ ] Do not present a live score without its clock state and fetch time
- [ ] Do not guess between same-name teams — resolve or ask
- [ ] Do not improvise when the endpoint reshapes — report and hand over the command
- [ ] Do not editorialize outcomes ("embarrassing loss") — the user's team just lost; read the room, give the facts

## Example Trigger Phrases

- "What's the score?"
- "Did my team win?"
- "What games are on today?"
- "Show me the league standings right now."
