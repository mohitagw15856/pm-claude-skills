# Cookbook: routing a prompt to one of 1,000+ agent skills with two typed choices

*A contribution-ready recipe for the TypeSafe cookbooks. Dataset and code are MIT: [pm-claude-skills](https://github.com/mohitagw15856/pm-claude-skills), `integrations/jev/`.*

## The problem
An agent has a library of **1,100+ skills** — markdown playbooks, each with a name and a one-sentence description — grouped into ~130 packs. A user types *"my landlord kept my deposit"*. Which skill should load? Today this is a keyword overlap (51.7% top-1 on the library's own eval cases) or an LLM call that costs more than running the skill.

A `choice` question is the right shape: defined options, one pick, a probability for every option. But a `choice` allows at most 255 options and the catalogue is 4× that.

## The recipe: pack, then skill
```js
import { ask, choice, decide } from 'pm-skills-jev-picker/client';

// 1. pack — ~130 options, each described by size + six titles
const packs = { 'pm-renters': 'renters — 9 skills such as Lease Decoder, Security Deposit Recovery, …', /* … */ };
const r1 = await ask(prompt, { pack: choice(
  'Which family of professional skills best fits what this person is asking for? Pick the bundle whose skills would produce the artifact they need.',
  packs) });
const d1 = decide(r1.answers.pack, { minConfidence: 0.6, minProbability: 0.7 });

// 2. skill — the pack's skills (title: summary). Weak pack pick? widen to the top-3 packs.
const candidates = d1.ok ? skillsIn(d1.pick) : top3Packs(r1.answers.pack.probabilities).flatMap(skillsIn);
const r2 = await ask(prompt, { skill: choice(
  'Which single skill would a senior professional reach for to answer this request? Pick the one whose output is what the person actually needs.',
  Object.fromEntries(candidates.map(s => [s.name, `${s.title}: ${s.summary}`]))) });
const d2 = decide(r2.answers.skill);

// 3. act or ask
if (d2.ok) load(d2.pick); else askUser([d2.pick, ...alternatives(r2.answers.skill)]);
```
Two calls, ~6k + ~4–25k input tokens, well under a second end-to-end.

## Why this beats one big choice
- **Descriptions do the work.** Jev reads the option *descriptions*; a 255-way list of near-duplicate names is noise. Pack descriptions are short and distinct; within a pack, summaries are distinct.
- **The distribution is the UX.** A 0.55 / 0.40 split between `lease-decoder` and `security-deposit-recovery` is not a wrong answer — it is the two options to show the user. Thresholds turn that into policy.
- **Widening is cheap.** When the pack pick is weak, the top-3 packs still fit in one `choice`.

## Thresholds that worked
| Signal | Act | Ask |
|---|---|---|
| pack confidence | ≥ 0.6 | widen to top-3 packs |
| skill confidence | ≥ 0.6 | show alternatives |
| skill probability | ≥ 0.7 | show alternatives |

## Measuring it
`skillbench/route-bench.mjs` runs the library's 267 curated eval cases (one real ask per skill) through **keyword**, **jev two-stage** and **jev flat (chunked)** and reports top-1, top-3, median latency and calls per route. The keyword floor is committed; the model rows fill in with a key. Publish yours.

## Where the same pattern reappears
- **Risk tiers** — `score` a skill's description against three tier definitions; flag under-tiering.
- **Input guard** — two `noul`s (injection, PII) before a paid model call.
- **Journey gates** — `score` a step's output (empty / partial / complete) + `noul` "carry-forward present" to auto-advance a multi-step session.
- **Typed eval judge** — four `score` questions with 5 described levels give the same 1–5 rubric as an LLM judge, reproducibly.
