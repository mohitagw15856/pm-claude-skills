---
name: source-triangulation
description: "Verify a claim before repeating it — the independent-sources test (three citations of one press release is one source), the provenance trace to the original, and the confidence grading that separates established from echoed. Use when asked is this claim actually true, verify this stat before the deck, everyone cites this number where's it from, or how solid is this source. Produces the provenance trace, the independence assessment, the confidence grade with its reasoning, and the repeat-it-as phrasing."
---

# Source Triangulation Skill

Most "well-sourced" claims are one source wearing costumes: a stat born in a vendor's report, echoed by a blog, cited by a journalist, and now "widely reported" — three citations, one origin, zero verification. Triangulation is the discipline of asking two questions before repeating anything: *where was this born* (the provenance trace back through the citation chain to the original) and *who has independently confirmed it* (independence meaning different methods or data, not different websites). The output is a confidence grade and — the practical part — the phrasing that honestly matches it.

## What This Skill Produces

- **The provenance trace** — the citation chain walked back to the origin: who created this claim, how, when
- **The independence assessment** — which supporting sources are actually independent vs. echoes of the same origin
- **The confidence grade** — established / single-sourced / contested / unverifiable — with reasoning
- **The repeat-it-as phrasing** — how to state the claim at its earned confidence ("one vendor survey suggests…" vs. the bare assertion)

## Required Inputs

Ask for these if not provided:
- **The claim, precisely** — "80% of projects fail" traced differently than "PMI found 80% of IT projects miss deadlines"; precision in the claim is precision in the trace
- **Where the user met it** — the citing source starts the chain
- **The stakes** — a deck stat, a strategy's foundation, a public claim? Depth scales: load-bearing claims get full traces; color commentary gets the quick check
- **The user's search access** — the skill directs the trace; live searching (where available) executes it — otherwise the output is the trace *plan* with the checks to run

## Framework: The Triangulation Rules

1. **Trace to the birth certificate:** follow each citation to its citation until the original appears — the survey, the paper, the filing, the dataset. The questions at the origin: who made it, with what method, what sample, when, and *with what incentive* (vendor research isn't wrong by default, but its selection pressure is part of the record).
2. **Independence is methods, not mastheads:** two outlets citing the same study = one source; a survey and a separate dataset agreeing = two. The echo test: do the supporting sources share numbers verbatim? Identical figures across "independent" sources is the fingerprint of a single origin echoing.
3. **Age and drift check:** the origin's date rides with the claim ("a 2019 survey" is a different fact in 2026), and *drift* gets caught — claims mutate through citation ("IT projects over $1M" becomes "projects"; "survey respondents" becomes "companies"). The original's precise wording vs. the circulating version is often the finding.
4. **Grade honestly, four levels:** *established* (2+ independent origins agreeing) · *single-sourced* (one origin, echoed widely — most business statistics live here) · *contested* (independent origins disagree — report the range, not your favorite) · *unverifiable* (no findable origin — the claim is folklore, however cited). The grade is the deliverable; flattering the claim helps nobody downstream.
5. **Phrase at earned confidence:** established → state it with the cite · single-sourced → attribute inline ("a 2024 Gartner survey found…") · contested → the range with both cites · unverifiable → don't repeat it, or repeat it explicitly as unsourced folklore if rhetorically necessary. The phrasing rule is what makes triangulation *usable* — it converts the grade into words.

## Output Format

# Triangulation: "[the claim]"

## The Provenance Trace
[The chain: where met → cites → … → the origin (who, method, sample, date, incentive) — or the dead end, documented]

## Independence Assessment
[Supporting sources sorted: independent (methods differ) vs. echoes (same origin) · the verbatim-number fingerprints noted]

## The Grade
**[Established / Single-sourced / Contested / Unverifiable]** — [the reasoning, including drift found between original and circulating versions]

## Repeat It As
"[The phrasing at earned confidence]" — [and the version for the deck's footnote]

## Quality Checks

- [ ] The chain was walked to an origin or an honest dead end
- [ ] Independence was judged by method/data, not by outlet count
- [ ] The origin's date and incentive are in the record
- [ ] Drift between original and circulating wording was checked
- [ ] The phrasing matches the grade — no confidence inflation in the repeat

## Anti-Patterns

- [ ] Do not count citations as confirmation — three echoes of one press release is one source with reverb
- [ ] Do not stop at a reputable citer — reputable outlets echo single sources daily; the origin is the standard
- [ ] Do not launder the grade in the phrasing — "studies show" for a single vendor survey is the exact sin
- [ ] Do not pick a side in contested claims — the range is the honest fact
- [ ] Do not repeat unverifiable claims bare — folklore travels on exactly that concession

## Example Trigger Phrases

- "Is this claim actually true?"
- "Verify this stat before the deck."
- "How solid is this source?"
