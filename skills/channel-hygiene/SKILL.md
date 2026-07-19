---
name: channel-hygiene
description: "Fix a team's chat sprawl — the channel map with one purpose per channel, the naming scheme that makes purpose findable, the archive pass for the dead and duplicated, and the posting norms (threads, @-discipline, urgency signals) that keep signal findable. Use when asked clean up our Slack/Teams, we have 90 channels and nothing is findable, set channel norms, or where should things get posted. Produces the channel audit and map, the naming scheme, the norms card, and the archive pass."
---

# Channel Hygiene Skill

Chat workspaces sprawl by entropy: a channel per whim, three channels where one topic lives, dead projects' channels haunting the sidebar, and every question answered with "wasn't that discussed somewhere?" Hygiene is structural: one purpose per channel (stated in the topic line), a naming scheme that sorts and signals (`#proj-`, `#team-`, `#help-`), an archive pass for the dead (archiving is free and reversible — the fear is misplaced), and posting norms that keep conversations findable — threads for discussions, @-mentions priced honestly, urgency signaled by convention instead of ALL CAPS hope.

## What This Skill Produces

- **The channel audit** — every channel: purpose (stated or guessed), last-activity, overlap verdicts
- **The map and naming scheme** — the prefix taxonomy, the one-purpose rule, topic lines written
- **The norms card** — threads, @-discipline, urgency signals, and where-to-post routing — one screen, pinned
- **The archive pass** — the dead and duplicated archived, with the it's-reversible announcement

## Required Inputs

Ask for these if not provided:
- **The channel census** — the list with member counts and last-activity (export or eyeball); the audit works on inventory, not impressions
- **The recurring confusions** — where do announcements go? Why are there three design channels? The map answers the actual questions
- **The platform's mechanics** — archiving behavior, thread culture, the tools available (channel descriptions, pinned posts) — norms use what exists
- **The team's @-pain** — is @-channel abused? Are DMs swallowing team knowledge? The norms card weights by symptom

## Framework: The Hygiene Rules

1. **One purpose, stated in the topic:** every surviving channel's topic line completes "post here for ___" — channels that need "and" in that sentence are two channels; channels where nobody can complete it are archive candidates. The topic line is the routing card at the point of confusion.
2. **Prefixes are navigation:** `#team-` (a group's home), `#proj-` (temporary, archived at ship — the expiry is the point), `#help-` (questions, threaded), `#ann-` (announcements, restricted posting, no discussion) — the sidebar becomes a sorted map, and new-channel creation inherits the scheme's discipline.
3. **Archive without fear, loudly:** channels dead >90 days get archived with the announcement stating the two facts that kill the objections: *archives are searchable* and *un-archiving takes one click*. Duplicated topics merge into the survivor with a pointer post. The sidebar halving is the visible win that funds the norms' adoption.
4. **Threads keep channels skimmable:** discussions thread; the channel surface stays scannable headlines. The norm is stated positively ("thread replies so the channel stays skimmable") and modeled by the leads — thread culture is caught, not decreed.
5. **@-signals are priced, urgency is explicit:** @-channel = "everyone must see this today" (rare by definition) · @-person = "you specifically, action expected" · no-@ = ambient. Urgent-and-blocking gets its stated convention (the 🔴 prefix, the `#help-urgent` lane — whatever's chosen, it's *written*), because unpriced attention signals inflate until everyone mutes everything — and DMs about team topics get the gentle norm: ask in the channel, so the answer compounds ([faq-builder](../faq-builder/SKILL.md) feeds on this).

## Output Format

# Channel Hygiene: [workspace] — [N] channels → [M]

## The Audit
| Channel | Purpose (topic-line test) | Last active | Verdict |
|---|---|---|---|

## The Map + Scheme
[Prefix taxonomy · surviving channels with written topic lines · the new-channel rule]

## The Norms Card (pin this)
[Threads · @-pricing · the urgency convention · where-to-post routing · the ask-in-channel-not-DM nudge]

## The Archive Pass
[The list · the merge pointers · the announcement with the two fear-killers]

## Quality Checks

- [ ] Every surviving channel passes the topic-line test
- [ ] The prefix scheme covers team/project/help/announce with project expiry noted
- [ ] The archive announcement states searchable + reversible
- [ ] The norms card fits one screen and is pinned where confusion happens
- [ ] @-signals and the urgency convention are written, not folklore

## Anti-Patterns

- [ ] Do not audit by memory — the census with last-activity dates is the ground truth
- [ ] Do not delete when archiving exists — reversibility is what makes the pass politically free
- [ ] Do not create channels per mood — the naming scheme is the door, and the door has a test
- [ ] Do not let announcements and discussion share a channel — the restricted `#ann-` lane exists so the signal survives
- [ ] Do not decree thread culture — leads model it for two weeks and it installs itself
