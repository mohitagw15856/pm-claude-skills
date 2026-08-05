---
aliases: ["Backup Strategy"]
tags: [pm-skills, skill]
skill: backup-strategy
description: "Set up a backup system that actually protects your photos, files, and devices — built on the 3-2-1 rule and, crucially, tested so it works when you need it. Use when asked how to back up my data, set up backups, protect my photos/files, or what's a good backup strategy. Produces a 3-2-1 plan tailored to your devices and data, specific what-to-back-up priorities, an automation setup so it happens without you, a restore-test step, and protection against the failure that ruins backups (ransomware/sync-deletes reaching the backup)."
---

# Backup Strategy

Everyone means to back up until the drive dies or the phone is lost. This builds a real system on the 3-2-1 rule — three copies, two media, one off-site — sized to your actual data and devices, automated so it happens on its own, and (the step everyone skips) *tested* by doing a restore, because an untested backup is just a hope.

## What This Skill Produces

- **A 3-2-1 plan** — three copies, on two types of media, with one off-site/cloud, mapped to your devices
- **Priorities** — what to back up first (irreplaceable photos/documents) vs. what's re-downloadable
- **Automation** — how to make backups run automatically so they don't depend on remembering
- **A restore test** — actually recovering a file to prove the backup works
- **Resilience** — protecting backups from ransomware/accidental-deletion and sync tools propagating a deletion to every copy (versioning, offline copy)

## Required Inputs

Ask for these if not provided:
- **Devices & OS** — computers, phones, and what platform each is
- **What matters most** — photos, documents, work files, and roughly how much data
- **Current backups** — what (if anything) exists now, and whether it's tested
- **Budget & comfort** — external drives, cloud services, willingness to pay/automate
- **Threats of concern** — device loss/theft, hardware failure, ransomware, accidental deletion

## Framework: 3-2-1, Automated, Tested

1. **Apply 3-2-1.** Three copies, two different media (e.g. local drive + cloud), one off-site — so no single event (fire, theft, ransomware) takes everything.
2. **Prioritize the irreplaceable.** Photos, personal documents, and unique work first; apps and media you can re-download come later.
3. **Automate it.** Scheduled/continuous backup beats manual — the ones you have to remember are the ones that lapse.
4. **Protect the backups themselves.** Keep at least one copy offline or versioned, so ransomware or a bad sync-delete can't wipe every copy at once.
5. **Test the restore.** Recover a real file (and ideally a full-system test once). An untested backup fails exactly when it matters.

## Output Format

### Backup plan: [devices] · [key data] · [budget]

**3-2-1 for you**
- Copy 1 (primary): [device].
- Copy 2 (local): [external drive / NAS] — automated [how].
- Copy 3 (off-site): [cloud/off-site] — automated [how].

**Back up first:** [photos, documents, unique work]. Later: [re-downloadable].
**Automate:** [schedule/tool per device].
**Protect backups:** [versioning + one offline copy] against ransomware/sync-deletes.
**Test:** restore [a file] now; full-restore test [once].

## Quality Checks
- [ ] Plan follows 3-2-1 (three copies, two media, one off-site)
- [ ] Prioritizes irreplaceable data first
- [ ] Backups are automated, not manual/remembered
- [ ] Includes a restore test, not just a backup
- [ ] Protects backups from ransomware/sync-delete (offline/versioned copy)
- [ ] Tailored to the person's devices and budget

## Anti-Patterns
- **A single copy** on one drive — no redundancy.
- **Manual backups** that quietly lapse.
- **Never testing a restore** — discovering it's broken during a crisis.
- **All copies online/connected** so ransomware or a sync-delete hits them all.
- **Backing up everything equally** and burying the irreplaceable stuff.

## Example Trigger Phrases
- "How should I back up my photos and files properly?"
- "Set me up a backup system for my laptop and phone."
- "I don't want to lose my photos if my phone dies — what do I do?"
- "Is my current backup actually safe from ransomware?"
- "What's the 3-2-1 backup rule and how do I set it up?"

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text — replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}
