---
name: desktop-zero
description: "Clear the desktop that's become a hundred-icon guilt mosaic — the fast triage that empties it today, the honest read of what the desktop was being used for (it's a to-do list wearing icons), and the replacement systems that keep it clear. Use when asked clean up my desktop, my desktop has 200 files on it, why does my desktop keep filling up, or set up a clean-desktop habit. Produces the today-pass, the function-replacement mapping, and the two-minute weekly habit."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/desktop-zero.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Desktop Zero Skill

A cluttered desktop isn't a filing failure — it's three systems living in the wrong place: a to-do list (files kept visible so they're not forgotten), a working set (the stuff from current projects), and a landing zone (screenshots, downloads-adjacent debris). Sweeping it into a `Desktop-backup` folder treats the symptom and reliably regrows the mosaic. Desktop zero is achieved by *replacing the three functions* with their real systems — then the clear desktop maintains itself, because nothing needs to live there anymore.

## What This Skill Produces

- **The today-pass** — the desktop emptied in ~30 minutes using bulk rules, not item-by-item agony
- **The function read** — which of the three jobs this desktop was doing, and how much of each
- **The replacements** — reminders → the task system; working set → a `Current/` folder or workspace; landings → redirected at the source
- **The weekly two minutes** — the maintenance pass, plus the wallpaper trick that makes clutter visible again

## Required Inputs

Ask for these if not provided:
- **The census** — roughly what's there: how many icons, what kinds (screenshots? docs-in-progress? shortcuts? installers?)
- **The honest function** — "I keep things there so I don't forget them" vs "it's just where things land" — the replacement plan differs
- **The real systems available** — is there a task system to receive the reminders? A folder structure ([folder-structure-designer](../folder-structure-designer/SKILL.md)) to receive the files? Absences get patched first

## Framework: The Three-Function Rules

1. **Triage with downloads rules:** the [downloads-triage](../downloads-triage/SKILL.md) bulk classes apply — screenshots by age, installers delete, duplicates keep-highest. The desktop-specific class: **shortcuts/aliases** (recreate-able — delete freely; the dock/taskbar is their home).
2. **The reminder-files are tasks in disguise:** every file kept visible "so I don't forget" becomes a task system entry with the file linked — the file then files normally. A desktop used as a to-do list fails at both jobs (the [email-to-tasks](../email-to-tasks/SKILL.md) logic, applied to icons); this is usually the emotional core of the mosaic and the reason sweeps regrow.
3. **The working set gets a legitimate home:** current-project files go to `Current/[project]/` (or the project's real folder, with the folder pinned/favorited for one-click access). The desktop's convenience was always about *access speed* — pins and favorites deliver it without the sprawl.
4. **Landings get redirected at the source:** screenshots configured to save to a folder (every OS allows it), downloads stay in Downloads (with its own triage habit), and save-dialogs stop defaulting to Desktop. Zero inflow is what makes zero maintenance possible.
5. **The weekly two minutes + the visibility trick:** Friday: anything on the desktop gets the triage verbs (it should be nearly empty already). The trick that keeps honesty: a wallpaper you actually like — clutter on a loved wallpaper registers as clutter; on a default one it registers as normal.

## Output Format

# Desktop Zero: [icon count] → 0

## The Today-Pass
[Bulk classes and their verdicts · the reminder-files → task entries (listed) · the working set → Current/ moves]

## The Function Read
[What this desktop was doing: X% reminder-board, Y% working set, Z% landing zone — and what replaces each]

## Source Redirects
[Screenshot save-path · save-dialog defaults · the shortcut policy]

## The Habit
[Friday two-minute pass · the wallpaper trick, unironically]

## Quality Checks

- [ ] Reminder-files became task entries with links — not just moved files
- [ ] The working set landed in a pinned real home, preserving the access speed
- [ ] Landing inflows were redirected at the source, not just cleaned once
- [ ] Nothing went to a `Desktop-backup` dump — every item got a verb
- [ ] The weekly pass is scheduled

## Anti-Patterns

- [ ] Do not sweep into a backup folder — it's the mosaic with a lid, and the desktop regrows in weeks
- [ ] Do not delete the reminder-files without capturing their tasks — the anxiety was load-bearing
- [ ] Do not fight for zero while inflows still point at the desktop — redirect first, then clear
- [ ] Do not moralize the mosaic — it was three reasonable needs in the wrong place; the fix is homes, not discipline
- [ ] Do not skip the access-speed replacement — a clear desktop that slows the user down gets recluttered in self-defense

## Example Trigger Phrases

- "Clean up my desktop."
- "My desktop has 200 files on it."
- "Why does my desktop keep filling up?"
- "Set up a clean-desktop habit."
