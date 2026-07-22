# Private overlay — your own skills on top of the public library, without forking

Run the public 750-skill library **and** your company's private skills together, without maintaining a fork. Your private skills are additive; a private skill with the **same name** as a public one overrides it. Nothing private is ever uploaded, ranked, or sent anywhere.

## The private skills folder

A directory of skill folders, exactly like the public [`skills/`](../skills/):

```
my-private-skills/
  our-incident-process/SKILL.md
  executive-update/SKILL.md        # same name → overrides the public one for your team
  vendor-risk-review/SKILL.md
```

Each `SKILL.md` follows the [authoring standard](../SKILL-AUTHORING-STANDARD.md) — so your private skills clear the same bar. Validate them with the same tool: `npx skillspec-check my-private-skills`.

## Three ways to overlay

**1. Install into your agent (Claude Code / Codex / Hermes / OpenClaw):**
```bash
npx pm-claude-skills add --agent claude --private ./my-private-skills
```
Installs the public library, then overlays your private skills into the same target. Same-named skills override; the rest are added.

**2. Run the local library server with the overlay** (playground + `/v1` API on your laptop):
```bash
npx pm-claude-skills serve --private ./my-private-skills
```
Your team browses and runs public + private skills together; the private ones stay on your machine.

**3. Org Edition (Docker), for a team deployment:** mount the private dir and set the overlay path — see [`org/`](../org/).

## Rules that keep it safe

- **Private stays private.** Overlaid skills are never published to the marketplace, the leaderboard, ClawHub, or any registry, and their outputs never touch the public rankings.
- **Override by name.** A private `executive-update` shadows the public one everywhere the overlay is active — useful for encoding house style or compliance requirements on top of a public skill.
- **Same quality bar.** Point `skillspec-check` (or the [SkillSpec Action](../action/skillspec/)) at your private folder in your own CI so private skills are held to L2/L3 too.

## Note

The overlay for `add` applies to **native** agents (`claude`, `hermes`, `codex`, `openclaw`), which read `SKILL.md` directly. Rule-file agents (Cursor, Windsurf, …) consume generated export formats; overlay those via `serve --private` or by exporting your private skills into the target format first.
