# Authoring for depth — the craft standard for flagship skills

Most skills in this library are competent template-producers: they say what to make
and what a good result looks like. A *flagship* skill does more — it controls the
agent's **process**, composes with its neighbors, and reads like a practitioner wrote
it. This doc is the standard for that upgrade. It was written after studying the
skills that set the bar (notably [mattpocock/skills](https://github.com/mattpocock/skills),
whose engineering skills are processes, not templates).

Apply this to the skills that matter most first; the long tail can follow.

## 1. Write the loop, not the checklist

A template skill lists actions ("gather inputs, draft sections, review"). A flagship
skill defines a **loop or phased process** where each phase ends on a **completion
criterion** — a condition the agent can check to know it's genuinely done, before the
next phase pulls its attention.

- Each phase names *what it produces* and ends with **`Done when: <checkable, often
  exhaustive condition>`**. "Done when every requirement traces to the problem
  statement" beats "when the draft looks complete."
- Order the phases so the earliest one is the load-bearing one, and say so. In
  `diagnosing-bugs` terms: name the phase that *is* the skill, and mark the rest
  mechanical.
- A good criterion resists **premature completion** — the agent declaring victory
  while later, easier steps tempt its attention. Clarity is the resistance; sharpen
  the bound before anything else.

## 2. Compose — skills that hand off, not skills that coexist

Related skills should form a **spine**: each takes one named artifact from upstream
and hands one to downstream. The handoff artifact is the interface — the only thing
that crosses between skills.

- State the spine explicitly ("this receives X from `/upstream`, hands Y to
  `/downstream`") and invoke neighbors by name (`/rice-prioritisation`), not just as
  a "Related" footnote.
- When an upstream artifact already exists, **read it instead of re-deriving** it.
- Put the *shared vocabulary* of a spine in one reference the whole cluster points at
  (see [`craft/product-decisions.md`](craft/product-decisions.md)), the way an
  engineering skill defers to one design-vocabulary skill. Define a term once.

## 3. Progressive disclosure — split by branch, point by condition

Keep the SKILL.md the legible top of a hierarchy; push reference material into
co-located `references/*.md` files reached by a **pointer** (a line that names the
material *and* the condition for needing it).

- Inline what *every* run needs; disclose behind a pointer what only *some* runs need.
  Branching is the test: shared → inline, branch-specific → disclosed.
- The pointer's wording, not its target, decides how reliably the agent reaches it —
  front-load the trigger word, one trigger per genuinely distinct branch.
- Symptom to cure: **sprawl** — a SKILL.md so long that attention thins even though
  every line is unique. The fix is the ladder, not deletion.

## 4. Make every line load-bearing

Depth is prose quality. Cut identity a heading already carries; state a definition
once and precisely; prefer a checkable claim to an adjective. A flagship skill should
read like documentation a senior professional wrote for an agent — because that is
exactly what it is.

## The bar

A skill has reached the flagship standard when: its process has phase completion
criteria; it names its place in a spine and invokes neighbors; its heavy reference is
disclosed behind pointers to a shared vocabulary; and no line is decoration. The
[product-decision spine](craft/product-decisions.md) — `assumption-mapper` →
`prd-template` → `rice-prioritisation` → `roadmap-narrative` — is the worked example.
