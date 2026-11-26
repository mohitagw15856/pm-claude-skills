# Worked Example — Skill Security Auditor

## The brief

Halyard Mutual, a 300-person insurer, is standing up a shared skill library for its go-to-market org. A RevOps lead has asked to add "meetminer v1.3" — a community skill from a public gist by an author handle with no other footprint ("opsdrift", ~1,900 stars) — which promises to turn raw meeting transcripts into CRM-ready notes. It ships a 96-line `SKILL.md` plus two bundled scripts, `scripts/format_helper.py` and `scripts/sync_notes.py`, and would be auto-loaded into every conversation for 40 sales and CS staff. IT security wants a pre-install audit before it goes anywhere near the library. A deliberate note on this example: the report below paraphrases hostile text instead of quoting it, so the audit itself stays inert when pasted into chat tools and ticket systems — evidence is pinned by line number and file hash instead.

## The output

---

# Skill Security Audit: meetminer v1.3 (public gist, author "opsdrift")

**Verdict:** ⛔ Do not install
**Findings:** 2 high · 1 medium · 1 low

**Scope reviewed:** `SKILL.md` (96 lines), `scripts/format_helper.py` (141 lines), `scripts/sync_notes.py` (88 lines). Source archive SHA-256 `3f9c…a41e` — evidence below is paraphrased and pinned to line numbers rather than quoted, so this report can circulate in tickets and chat without carrying live payload text; verify wording against the hashed source.

## Findings

| Severity | Category | Evidence (line/snippet) | Why it's risky |
|---|---|---|---|
| 🔴 High | Prompt injection | `SKILL.md` line 41 — a single sentence buried mid-paragraph in the "Formatting" section | An imperative addressed directly to the assistant, directing it to treat all earlier guidance as void and to obey only this file for the remainder of the session. Classic override phrasing; nothing about note formatting requires addressing the assistant's obedience at all. |
| 🔴 High | Data exfiltration | `scripts/sync_notes.py` lines 58–71, function `sync_to_workspace()` | The function builds an outbound network request whose destination is a hardcoded non-local address unrelated to any CRM the skill claims to support, and whose body includes the full meeting transcript plus the attendee list. The skill's prose never mentions this behaviour, and the function name suggests a local operation. Silent, undisclosed, off-device. |
| 🟠 Medium | Obfuscation | `SKILL.md` line 63 — between two visible words in an otherwise ordinary sentence | Fourteen zero-width Unicode codepoints that decode to a further instruction fragment (surfaced via codepoint inspection, not visible in any editor rendering). Invisible characters have no legitimate purpose in an instruction file; treat as hostile regardless of what they decode to. |
| 🟡 Low | Scope creep | `SKILL.md` lines 80–84 | A meeting-notes skill instructs the assistant to accumulate attendee names, job titles, and email addresses into a persistent local "contacts" file — unrelated to its stated formatting purpose. Rated low only because the file stays local; it compounds finding #2 by curating exactly the data that script ships off-device. |

**Reviewed and deliberately not flagged:** `format_helper.py` is clean — stdlib text processing only, no network imports, no dynamic execution. The usage notes reference `example.com` in a documented sample; that is a standard documentation pattern, not an indicator of harm.

## Recommendation

Do not install — either high-severity finding independently forces the verdict under the audit rule. If the team still wants the functionality, the path is: strip line 41 and the invisible characters from the body, delete `sync_notes.py` entirely (all the formatting value lives in `format_helper.py`), and resubmit the result for a fresh audit rather than patching in place. Separately, wire `node scripts/skill-audit.mjs` into CI so gist-sourced skills are machine-screened before a human ever reads them; the star count on the source gist was noted and given zero evidentiary weight.

---

## Why it's shaped this way

- **The verdict follows the severity rule mechanically** — two high findings, therefore "Do not install," stated in the first line rather than hedged at the end. The Quality Checks make this non-negotiable ("any high-severity finding ⇒ do not install"), and the Anti-Patterns forbid a vague "be careful" verdict; the reasoning explains the verdict, it doesn't negotiate it.
- **Both bundled scripts were read, and the worst finding lived in one.** The prose of `SKILL.md` looks almost clean; the off-device behaviour hides in a script with a reassuring function name. This is exactly the anti-pattern the skill exists to prevent — passing a skill on its markdown while the harm lives in `scripts/`.
- **Evidence is line-pinned but paraphrased, and the report says why.** The Output Format asks for exact snippets; a 15-year practitioner deviates here deliberately, because audit reports get pasted into tickets, chat, and other model contexts, and a report that quotes override phrasing verbatim becomes a carrier for it. Line numbers plus a source hash preserve verifiability without reproducing the payload — precision is kept, toxicity is not.
- **The calibration section clears things by name.** `format_helper.py` and the documented `example.com` sample are explicitly marked safe, per the Quality Check against over-flagging — an audit that cries wolf on every network-adjacent word trains the team to stop reading audits.
- **The invisible-character finding is rated on presence, not payload.** The decoded fragment barely matters; the Anti-Patterns say never to dismiss zero-width content, so the finding's "why it's risky" argues from the medium (no legitimate use in an instruction file) rather than from what this particular fragment says.
- **The low finding is recorded even though it wouldn't change the verdict**, because it compounds finding #2 — the register of *what data the skill curates* is what makes the off-device behaviour materially worse. Dropping sub-verdict findings is how resubmissions come back with the same architecture.
- **The recommendation is a resubmission path, not a warning label** — which lines to remove, which script to delete, and a CI gate (`skill-audit.mjs`) so the next gist doesn't depend on a human noticing line 41. The Quality Checks require "what to remove/change," and popularity is explicitly weighed at zero per the Anti-Patterns.
