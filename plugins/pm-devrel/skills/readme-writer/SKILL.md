---
name: readme-writer
description: "Write a clear, well-structured README for a software project or open-source repo. Use when asked to write or improve a README, document a project, or make a repo approachable. Produces a complete README — one-line pitch, badges, quickstart, usage, install, contributing, license — that gets someone from landing to running fast."
---

# README Writer Skill

The README is a project's front door — most people decide in seconds whether to use or bounce. This skill
writes a clear, scannable README that answers *what is this, why should I care, how do I run it* immediately,
then layers in the detail. Structured so a newcomer gets to a working result fast.

> **Not quite this?** Use `readme-benefit-writer` when you already have a README and want each feature rewritten as a user benefit.

## Required Inputs

Ask for these only if they aren't already provided:

- **Project name & one-line purpose** — what it is and what problem it solves.
- **Who it's for** — the target user/developer.
- **Install & basic usage** — how to install and the simplest working example.
- **Key features / differentiators** — the few things that matter most.
- **Project facts** (optional) — language, license, links (docs, demo), contribution policy, status (alpha/stable).

## Output Format

A complete `README.md`:

### [Project name]
> One-line pitch — what it does and for whom.

*(Badges line — build, version, license — as placeholders to fill.)*

**Why [project]?** — 2–3 sentences or bullets: the problem and what makes this worth using (honest, specific).

**Features** — the handful that matter, as a tight bullet list.

**Quickstart**
```
# install
# minimal working example
```
…with the expected result shown.

**Usage** — the common cases, with short code examples. Link out to full docs rather than inlining everything.

**Installation** — fuller install/requirements if the quickstart was minimal.

**Contributing** — how to contribute / link to CONTRIBUTING; be welcoming.

**License** — the license line.

(Adapt sections to the project; omit what doesn't apply. Keep it scannable with clear headings.)

## Quality Checks

- [ ] Opens with a one-line pitch that says what it is and for whom
- [ ] A newcomer can copy-paste the quickstart to a working result
- [ ] "Why this" is specific and honest, not generic praise
- [ ] Scannable structure (headings, short sections); deep detail is linked, not dumped
- [ ] Install, usage, contributing, and license are all covered (or consciously omitted)

## Anti-Patterns

- [ ] Do not bury what-it-does under a wall of badges or backstory — pitch first
- [ ] Do not write a quickstart with missing steps — it must actually run
- [ ] Do not inline the entire documentation — summarize and link
- [ ] Do not over-promise; reflect the real project status (alpha/beta/stable)
- [ ] Do not skip the license — it determines whether anyone can legally use it

## Based On

Open-source README best practices (one-line pitch, time-to-first-success quickstart, scannable structure, standard sections).

## Example Trigger Phrases

- "Improve a README."
- "Document a project."
- "Make a repo approachable."
