# Example: style-fingerprint

## What this skill does

Studies 3-5 documents you actually shipped and distils a compact style card (rhythm, register, structure habits, signature moves, banned moves), saved to the Brain so every other skill writes in your voice instead of the model's.

## How to trigger it

### Example 1: building the card from real samples

**You say:**
> "Learn my writing style from these [pasted: 2 stakeholder emails, a product one-pager, a Slack announcement]. AI drafts never sound like me."

**Claude produces (excerpt):**

### Style card: [name] / work register, fingerprinted [date] from 4 samples

**Rhythm:** short declaratives, average ~13 words; one deliberately long sentence per paragraph that carries the nuance, then a short one that lands it.
**Register:** direct but warm; first person singular, never "we" unless a decision was genuinely shared; contractions throughout.
**Structure:** opens with the conclusion in the first line, no throat-clearing; bullets only for 3+ parallel items; one-line paragraphs used for emphasis.
**Signature moves:** "Here's where I've landed:" before a decision; naming the counter-argument before anyone raises it ("The fair pushback is..."); ending asks with a date, not "thoughts?"
**Emphasis & numbers:** bolds the number, not the sentence; always gives the comparator ("up from 12%").
**Never:** "just circling back", exclamation marks in work contexts, "super", hedged double-qualifiers ("I think maybe we could"), starting with "I hope this finds you well".
**Calibration line:** *"Here's where I've landed: we ship the smaller version Friday, and I'll own the explanation to sales."*

**Proof, same paragraph twice:**
> I hope this finds you well! I just wanted to circle back on the migration timeline. I think maybe we could potentially consider moving the date, as there are some concerns around readiness.
> Here's where I've landed: the migration moves to the 14th. QA found two blockers Friday and I'd rather slip a week than ship them. The fair pushback is that we promised the 7th; I'll own that conversation with [client].

**📥 Save to Brain:** proposing a write of this card to `brain/knowledge/style.md` with a `voice:` pointer in `context.md`; say yes and every brain-aware skill picks it up immediately.

### Example 2: catching drift later

**You say:**
> "This draft you wrote feels off; too formal. Check it against my card."

**Claude produces (excerpt):**

**Three violations against your card:** the draft opens with context before the conclusion (your card: conclusion first); "we believe" appears twice where your register says "I"; and the ask ends with "let me know your thoughts" where your signature is a date. Rewritten with all three fixed; the long-nuance sentence in paragraph two was kept because that *is* your rhythm.

## Tips for best results

- Give documents you shipped, not drafts you abandoned; the card learns from what you were willing to send.
- Include 2+ genres (email plus a doc); it separates your voice from one format's conventions.
- Approve the Brain save; the card only compounds if other skills can read it.

## Related skills

- `which-skill` to find which brain-aware skills will use the card
- `stakeholder-update` as a common first consumer of the fingerprinted voice
