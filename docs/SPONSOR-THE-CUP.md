# Sponsor the Skill Cup

The [Skill Cup](../SKILL-CUP.md) is a monthly contest for the best new professional skill on a theme. Entries are judged blind on real cases, and every winning skill joins a free, MIT-licensed library used by people who can't afford a professional for every question. A prize turns that into paid work for whoever writes the best one.

## Ways to sponsor

| Tier (GitHub Sponsors) | Amount | What it funds | Credit |
|---|---|---|---|
| 🏆 **Prize sponsor** | $100 one-time | One month's winner prize ($100) | "Prize: $100, thanks to <you>" on the Cup page, in `SKILL-CUP.md` and in the winner's announcement video |
| 🌍 **Language track sponsor** | $50 one-time | The prize for one language track (for example the Hindi or Spanish track) | The same credit on that track |
| 🎯 **Theme sponsor** | $250 one-time | The month's prize, plus you propose the theme (it must be useful to the public; no products or ads) | Credit as above, and "Theme suggested by <you>" |
| 🔁 **Cup patron** | $100 / month | The prize every month | Standing credit on the Cup page |

**Sponsor:** [github.com/sponsors/mohitagw15856](https://github.com/sponsors/mohitagw15856). Choose the custom amount, or the matching tier once it's listed, and say which month and track in the note.

## Rules, so prizes stay honest

- A prize is listed only once the money has arrived. It's recorded in [`config/cup-prizes.json`](../config/cup-prizes.json) with the month, track, amount and sponsor.
- The winner is whoever the published scoring ranks first ([`scripts/score-cup-entry.mjs`](../scripts/score-cup-entry.mjs)). Sponsors don't judge and can't enter the month they fund.
- The prize is paid to the winner through GitHub Sponsors (if they have a Sponsors profile) or another method they choose, within 30 days of the month closing. If a month has no entries, the prize rolls to the next month.
- The maintainer may decline a sponsor or a theme without giving a reason.

## For the maintainer: setting up the tiers

GitHub Sponsors tiers can only be created in the Sponsors dashboard ([github.com/sponsors/mohitagw15856/dashboard/tiers](https://github.com/sponsors/mohitagw15856/dashboard/tiers)). Add one-time tiers named as above, with the "What it funds" text as each description. When a payment arrives, add a line to `config/cup-prizes.json`, for example:

```json
{ "month": "2026-11", "track": "overall", "amount": 100, "currency": "USD", "sponsor": "Acme Ltd", "sponsorUrl": "https://acme.example" }
```

The next daily Cup run, or deploy, shows it everywhere.
