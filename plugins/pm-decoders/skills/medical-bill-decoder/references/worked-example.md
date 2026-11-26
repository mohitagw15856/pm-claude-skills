# Worked Example — Medical Bill Decoder

## The brief

Devon got a $2,340 bill after an ER visit for a cut requiring stitches (in-network hospital, insured, $1,500 deductible mostly unmet). The bill has five lines with codes he doesn't recognize, and the EOB says "patient responsibility: $2,340." He asks: "is any of this wrong, and do I just… pay it?"

## The output

### Bill Decode: Riverside General ER — visit of March 12

**The verdict:** Don't pay yet. Two lines deserve challenge (~$680 of the $2,340), one needs an itemized check, and this bill qualifies you to ask about financial assistance *before* any payment.

**Line-by-line decode**

| Line | Code | Plain English | Billed | Flag |
|---|---|---|---|---|
| ER visit level 4 | 99284 | "Moderately complex ER visit" | $1,240 | 🟡 Level check — stitches for a simple laceration is often a level 3 (99283); level 4 requires more complexity than the note may support |
| Laceration repair | 12002 | Stitching a 2.6–7.5cm cut | $580 | 🟢 Matches the treatment |
| Tetanus vaccine | 90714 | The shot itself | $95 | 🟢 Normal |
| Vaccine admin | 96372 | *Giving* you the shot | $210 | 🔴 Unbundling suspicion — admin billed separately at 2× the vaccine's own cost; typical admin fees run $25–60 |
| Supplies, misc | — | Unitemized "supplies" | $215 | 🔴 No code, no itemization — you're entitled to a line-level breakdown |

**What to do, in order**
1. **Request the fully itemized bill** (script below) — "supplies, misc" and the visit-level coding can't be evaluated without it, and hospitals routinely adjust when asked.
2. **Challenge the two flags** — the level-4 code against the visit notes, and the $210 admin fee against typical rates.
3. **Ask about financial assistance** — nonprofit hospitals must have a policy; asking pauses collections and costs nothing.
4. Only then discuss a payment plan on what remains — never on the pre-review number.

**The scripts**
- *Itemized bill:* "I'm requesting a fully itemized bill with CPT/HCPCS codes for every line, including the 'supplies' entry, before making any payment."
- *Coding question:* "The visit is coded 99284. Could you review whether the documentation supports level 4 rather than 99283? Please have coding review it."
- *The call:* "I'd like to resolve this today. Given the coding questions on two lines, what adjustment can you offer? I'm also requesting your financial-assistance application."

**Likely outcome range:** $1,660–$2,000 after review — and the assistance application can move it further. Deadline pressure is artificial: bills under active review don't go to collections.

*This is a plain-language reading, not medical, legal, or financial advice — billing rules vary by insurer and state; confirm anything load-bearing with your insurer or a patient advocate.*

## Why it's shaped this way

- **Every code becomes English first** — the entire premise: nobody can dispute what they can't read.
- **Flags target the two classic games** — visit-level upcoding and unbundled administration — with the *typical-range evidence* that makes the challenge credible.
- **"Supplies, misc" is flagged for what's missing** rather than guessed at — the skill demands itemization before judgment, never invented breakdowns.
- **The order of operations puts assistance before payment plans** — sequencing is the judgment; paying first forfeits leverage the skill exists to preserve.
- **Scripts are quotable verbatim** — the deliverable is words to say, because the phone call is where the money moves.
- **The outcome is a range, not a promise** — honest expectations, per the anti-patterns.
