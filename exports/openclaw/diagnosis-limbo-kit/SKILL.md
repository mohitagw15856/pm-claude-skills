---
name: diagnosis-limbo-kit
description: "Run the multi-year campaign of being chronically ill with no diagnosis — track patterns across specialists so nothing resets, avoid the 'it's just anxiety' dead-end, chase referrals that stall, and arrive at each new doctor with the longitudinal case instead of starting from zero again. Use when someone says 'I've been sick for years and no one can tell me why', 'every specialist starts over', 'they keep saying it's stress', or is stuck in diagnostic limbo. Produces a longitudinal symptom dossier, a specialist-handoff brief, and a next-move plan. Not medical advice — it organizes YOUR information so clinicians can use it."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/diagnosis-limbo-kit.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Diagnosis Limbo Kit Skill

Being undiagnosed for years is its own distinct hell, separate from any single
appointment: every new specialist starts from scratch, your two years of pattern
gets compressed into a ten-minute history you fumble, the "have you tried reducing
stress?" dead-end keeps reappearing, and referrals vanish into waitlists. This is a
campaign, not a visit — and campaigns need infrastructure. This skill builds it:
one longitudinal dossier that travels with you, a handoff brief that gets a new
doctor up to speed in 90 seconds, and a plan for the next move when the current
door closes. It organizes *your* information; it does not diagnose — that's the
clinician's job, and this makes their job possible.

## What This Skill Produces

- A **longitudinal dossier**: your symptoms over time as a pattern, not a jumble —
  onset, triggers, what's changed, what's been ruled out and by whom, meds tried
  and their effect. The document that means you never start from zero again.
- A **specialist-handoff brief**: the one-page version a new doctor can absorb
  fast — the story arc, the key negatives (tests already done), the specific
  question you need *this* specialty to answer
- A **"ruled out" ledger**: what's been tested and excluded, so you stop
  re-running the same tests and can push toward what hasn't been checked
- A **next-move plan**: when a door closes (normal results, a shrug, a dead
  referral), the concrete next step — the referral to request, the second-opinion
  case, the records to gather, the patient community/registry for your symptom
  cluster to research

## Required Inputs

Ask for (if not already provided):
- The story so far, however messy: when it started, the main symptoms, how they've
  changed, the big episodes
- Which specialists/tests you've been through and what they found or ruled out
  (results if you have them)
- What keeps happening at appointments (dismissed? handed off? tests normal so
  "nothing wrong"?)
- What you most need to happen next, and any working theories you or a doctor have
  floated

## Framework

1. **Turn the jumble into a timeline.** Symptoms scattered across years read as
   "vague" to a rushed clinician; the same data as a timeline reads as a pattern.
   Onset → progression → current, with triggers and what makes it better/worse.
   Pattern is what gets taken seriously.
2. **Build the "ruled out" ledger — it's your leverage.** Every normal test is
   progress, not failure: it narrows the field. List what's been excluded, by which
   specialty, so you can say "cardiac and thyroid are cleared — what's left?" instead
   of silently re-running them. This is how you push forward instead of in circles.
3. **Neutralize the anxiety dead-end honestly.** "It's stress/anxiety" is sometimes
   true, often a placeholder for "I don't know," and either way it shouldn't stop
   investigation of physical symptoms. The brief pre-empts it: symptoms stated
   concretely, the ask framed as "I'd like to rule out X before we land on a
   functional diagnosis" — respectful, specific, hard to wave off. (And if anxiety
   *is* part of it, the kit says so plainly and points at real support — that's not
   the enemy, dismissal is.)
4. **Write the handoff for a ten-minute brain.** New specialists have minutes and
   no context. The one-pager: three-line story, the key negatives, the single
   question you need their specialty to answer. You hand it over; it does the
   catching-up so the appointment can do the thinking.
5. **Always have the next move.** Diagnostic limbo kills morale through dead ends,
   so the plan pre-loads the branch: results normal → request referral to [logical
   next specialty] or a second opinion; referral stalled → the polite chase +
   escalation path; stuck entirely → gather full records ([[medical-records-request]]),
   research the patient-led communities and specialist centers for your symptom
   cluster, consider a diagnostic-specialty referral. A door closing is a redirect,
   not the end.

## Output Format

```
## Your story as a timeline
[Onset → progression → now, with triggers and modifiers]

## The "ruled out" ledger (your leverage)
| Tested/excluded | By whom/when | So the field narrows to… |

## Specialist handoff brief (one page — hand this over)
Three-line story · Key negatives · The one question for THIS specialty

## Pre-empting "it's just stress"
[The concrete framing that keeps physical symptoms under investigation —
respectful, specific]

## Next move (whatever happens at the next appointment)
[If normal results → … · if dismissed → … · if referral stalls → … · if stuck → …]
```

## Quality Checks

- [ ] The dossier is a genuine timeline (pattern), not a re-listed symptom jumble
- [ ] The "ruled out" ledger exists — the campaign's main leverage
- [ ] The handoff brief is truly one page and answerable by a rushed clinician
- [ ] The anxiety dead-end is handled respectfully, not dismissively — and real
      mental-health support is named as an ally, not a defeat
- [ ] There is always a concrete next move, whatever the next appointment does

## Anti-Patterns

- [ ] Do not diagnose or suggest what the user "probably has" — organize their
      information; naming the illness is the clinician's job, and armchair diagnosis
      can send them chasing the wrong door
- [ ] Do not coach antagonism toward doctors — the brief works by making you easy
      to help, not by fighting; most dead-ends are time-and-system, not malice
- [ ] Do not dismiss mental health as beneath physical symptoms, nor let it be used
      to close investigation of them — both can be true and both deserve care
- [ ] Do not promise a diagnosis is findable — some conditions stay elusive; the
      honest goal is a well-run campaign and the best next move, not a guaranteed answer
- [ ] Do not recommend unproven treatments or supplements — this organizes the
      medical process, it doesn't route around it

## Related

[[doctor-visit-prep]] for the single appointment inside the campaign;
[[medical-records-request]] to gather the paper trail; [[the-second-opinion]] when a
door closes; [[spoon-planner]] for surviving the limbo itself; [[symptom]] tracking
feeds this dossier.
