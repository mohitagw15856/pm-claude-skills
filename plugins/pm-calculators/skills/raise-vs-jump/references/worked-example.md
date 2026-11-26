# Worked Example — Raise vs Jump

A gold-standard run of this skill: a $120k engineer with a recruiter in his inbox, shown that the salary math mildly favors jumping — and that his unvested equity turns the same math upside down.

## The brief

Deshawn, a software engineer at $120,000, has a recruiter dangling "definitely 15–20% more." His employer's raise history is a reliable 3%. He asks for the ten-year picture if he becomes "a jumper" (a move every ~3 years at ~15%) versus staying put. Pressed on the invisible items: he has $60,000 of unvested RSUs vesting over the next 3 years (roughly $20k/year), his manager has said "promotion conversation next cycle" with no named role or date, and he'd rate his market demand as strong. He hasn't interviewed in four years.

## The output

### Raise vs Jump: $120k engineer, 10-year horizon

**The Trajectories** (script: `python3 scripts/raise_vs_jump.py --salary 120000`)

```
year    stay-salary   jump-salary      cum stay      cum jump
   3       131,127       143,575       382,035       390,823
   5       139,113       149,376       656,209       686,646
   8       152,012       178,722     1,099,093     1,212,367
  10       161,270       209,641     1,416,935     1,627,538
cumulative crossover: year 3 · salary gap at year 10: +48,371 · cumulative: +210,603
```

**What the Table Says:** On salary alone, jumping wins convincingly — ahead cumulatively from year 3, and $210k ahead by year 10, with a year-10 salary gap of $48k. The result is moderately sensitive to the bump size (at 10% bumps instead of 15%, the ten-year cumulative edge roughly halves) and to the between-jump raises (jumpers often land high in a band and stall — the model's 2% assumption is doing real work).

**The Checklist the Table Can't See**

| Item | This user | Weight |
|---|---|---|
| Unvested equity | **$60k vesting over 3 years — jumping now forfeits up to $60k** unless the new offer replaces it | **Decisive-scale: it exceeds the first 4 years of the jump path's cumulative edge** |
| Promotion proximity | "Conversation next cycle" — no named role, no date | Vague by the framework's test; modeled as noise, not as a stay-side jump |
| Search risk | Strong market demand, but 4 years since last interview | Moderate — worth a warm-up period, not a discount |
| Résumé pattern | First potential jump — no tenure concern | None yet; relevant by jump three |

**The Honest Read:** The pure-salary math says jump; the equity math says *not yet, or not for free.* Jumping today walks away from up to $60,000 — which the $210k ten-year edge does eventually swamp, but the first four years of that edge are roughly what the forfeited RSUs are worth. The strategy the numbers actually support: interview now (warm up after four years, price the market for real), and treat **RSU replacement — a sign-on bonus or equity grant covering the unvested $60k — as a condition of any offer**, which is a standard and routinely granted ask. If an offer replaces the equity and lands the 15%+ bump, the jump dominates cleanly. Meanwhile, the "promotion next cycle" line gets one clarifying conversation: a named role and date would put a genuine stay-side step-up into the model; another vague reassurance is itself an answer. Not modeled and worth remembering: vesting resets at the *new* company (their cliff starts over), and the numbers are one input to a decision that also contains what the work actually is.

*Educational model, not financial or career advice — the checklist items are prompts for the user's judgment, not scores from the model.*

## Why it's shaped this way

- **Trajectories, never two offer numbers** — the skill's core rule; "15–20% more" sounds like the whole story, and the ten-year table is what makes the between-jump raise assumption (2% vs 3%) visible as the quiet variable it is.
- **The equity got computed in dollars and compared against the edge** — $60k forfeited vs. the cumulative advantage's early years is the framework's "compute it in dollars, not vibes" rule; it converts "I have some RSUs" into the single decisive line of the analysis.
- **"Promotion conversation next cycle" was named vague, not modeled** — the framework's test is a named role and timeline; modeling a manager's soothing sentence as a 15% event is how stay-side math gets cooked, and the debrief instead scripts the conversation that would make it modelable.
- **The read takes a position with a mechanism** — interview now, demand RSU replacement, decide on the offer's actual terms — because the anti-patterns forbid hiding behind "it depends"; the recommendation contains its own falsification conditions (no replacement → stay; named promotion → remodel).
- **The vesting-reset-at-the-new-company caveat appears** — the not-modeled list exists so the jump path's own cliff doesn't become next year's surprise.
- **Sensitivity is stated in one line, not a second table** — the bump-size dependence is the honest error bar on the $210k headline, delivered at the weight it deserves.
