# Perimenopause Navigator Skill

Perimenopause can start a decade before periods stop and shows up as dozens of
symptoms most people were never told to expect — rage, anxiety, brain fog, joint
pain, palpitations, insomnia, the return of period chaos — so it gets misread as
stress, depression, or "just aging," by patients and doctors alike. Then the
appointment is ten minutes and easy to fumble. This skill does two things: helps
you see whether the pattern fits perimenopause, and builds the GP conversation that
gets you taken seriously and toward real options. It organizes your experience; it
does not diagnose or prescribe — HRT and treatment decisions belong with a
clinician, and this makes that conversation productive.

## What This Skill Produces

- A **symptom map**: what you're experiencing, sorted by how commonly it's linked to
  perimenopause (and flagging the ones that are NOT to be assumed hormonal and need
  their own check — see below)
- A **GP-visit brief**: the prioritized symptoms in the format a rushed doctor can
  act on, with impact-on-life stated (the lever that moves treatment decisions)
- A **treatment-questions list**: the informed questions about options (HRT types
  and delivery, non-hormonal routes, what to try for the specific dominant symptom),
  so the appointment is a discussion not a lecture
- A **dismissal-pushback plan**: respectful, specific ways to keep the conversation
  going if you're waved off with "you're too young" or "just antidepressants"

## Required Inputs

Ask for (if not already provided):
- The symptoms, physical and mental, and roughly when they started and how they've
  changed (cycle changes especially, if periods still happen)
- Age, and what's been said so far by any clinician
- Which symptoms hurt life most (sleep? mood? work capacity? relationships?) — impact
  drives treatment, not symptom count
- Any relevant history that affects options (this is context for the doctor, not for
  the skill to advise on) and what the user wants out of the appointment

## Framework

1. **Pattern, not self-diagnosis.** Lay the symptoms against the well-documented
   perimenopause picture so the user can see whether it fits — while being explicit
   that overlapping conditions (thyroid, anemia, cardiac symptoms, depression) can
   look identical and deserve their own ruling-out. The skill maps and flags; it
   does not conclude.
2. **Lead with impact, not a symptom list.** Doctors triage by life-impact. "I'm a bit
   tired" gets a shrug; "I haven't slept more than four hours in three months and I'm
   making errors at work and snapped at my kids" gets action. The brief foregrounds
   how symptoms are actually costing the user.
3. **Walk in informed about options.** Perimenopause care has real choices — HRT
   (estrogen types, patches vs gel vs tablets, progesterone, testosterone for some),
   non-hormonal medications, and symptom-specific approaches. The skill arms the user
   with good *questions* about these (not recommendations), so the appointment is a
   shared decision. It routes to current authoritative guidance (menopause society /
   NHS-style resources) rather than asserting protocols that vary by person and place.
4. **Plan for dismissal without antagonism.** "You're too young," "it's just stress,"
   "have some antidepressants" are common. The pushback is specific and calm: "I'd
   like to discuss whether perimenopause could explain this cluster — can we consider
   [option] or a referral to a menopause specialist?" Persistence framed as
   partnership, plus knowing that a specialist referral or a different GP is a valid
   next step.
5. **Track to build the case.** A short symptom-and-cycle log over a few weeks turns
   "I feel off" into evidence, and helps the clinician and the user tell hormonal
   patterns from other causes.

## Output Format

```
## Your symptom map
| Symptom | Commonly perimenopause-linked? | ⚠ also check for (not to assume) |

## GP-visit brief (impact-first)
Top 3 by life-impact (with the concrete cost) · when it started · what you want
from this appointment

## Questions to ask about options
[Informed questions on HRT / non-hormonal / symptom-specific routes — to discuss,
not prescribe · pointer to current authoritative menopause guidance]

## If you're dismissed
[The calm, specific pushback lines · the specialist-referral / second-GP path]

## Track this
[The short symptom + cycle log to bring next time]
```

## Quality Checks

- [ ] Symptoms are mapped to likelihood AND the look-alike conditions are flagged for
      their own check — no assuming everything is hormonal
- [ ] The brief leads with life-impact, not a symptom inventory
- [ ] Treatment content is framed as questions and routed to authoritative guidance —
      zero prescribing or dosing
- [ ] The dismissal plan is respectful and includes the referral/second-opinion path
- [ ] A tracking method is included to build evidence over time

## Anti-Patterns

- [ ] Do not diagnose or recommend/dose HRT or any treatment — organize the case,
      supply the questions, route to the clinician and to authoritative sources
- [ ] Do not assume every symptom is perimenopause — flag the serious look-alikes
      (cardiac, thyroid, clot risk symptoms) for proper medical attention
- [ ] Do not coach hostility toward doctors — the brief works by being clear and
      impact-led; most dismissal is under-informed, not malicious
- [ ] Do not present any single protocol as universal — options vary by person,
      history, and country; the skill informs the conversation, the clinician decides
- [ ] Do not treat mood symptoms as "just hormonal" if they're severe — significant
      depression or any thoughts of self-harm need direct mental-health support, said
      plainly

## Related

[[doctor-visit-prep]] for the appointment mechanics; [[diagnosis-limbo-kit]] if the
symptoms sprawl beyond one system; [[symptom]] tracking feeds the case;
[[hrt-decision|the-second-opinion]] if the first GP won't engage.
