# Pharmacy Counselling Script

Most counselling fails not because the pharmacist said the wrong thing but because they said fourteen things in ninety seconds, at a counter, to someone holding a bag and thinking about parking. This picks the three that change behaviour, phrases them so the patient can repeat them back, and anticipates the specific reason this particular patient will stop taking it.

## What This Skill Produces

- **The counselling script** — purpose, administration, expectation, and the stop-signal, in plain language
- **The three-thing rule applied** — what to say when there is only time for three sentences
- **Teach-back questions** — the two questions that reveal whether the patient actually understood
- **Red-flag advice** — what would mean contact us or seek urgent care, stated without alarming
- **Adherence anticipation** — the most likely reason this patient stops, and the sentence that pre-empts it
- **The documentation line** — what was counselled and what the patient demonstrated back

## Required Inputs

Ask for these if not provided:
- **The medicine and the change** — new start, dose change, formulation switch, or a generic substitution the patient will notice
- **The patient** — age, comprehension, language, sensory needs, and who actually administers the dose
- **The context** — other medicines, what this replaces, and any prior bad experience with this class
- **The practical realities** — dosing times, food requirements, storage, and what happens if a dose is missed
- **Scope constraints** — what your jurisdiction and the product information allow you to advise on

## Framework: Three Things, Then Teach-Back

1. **Purpose first, in their words.** 'This is to bring your blood pressure down' — not the drug class. A patient who cannot say what a medicine is for stops taking it first.
2. **How, tied to something they already do.** 'With breakfast' beats 'once daily'. Anchor the dose to an existing habit.
3. **What to expect, including the unpleasant part.** The side effect you do not mention is the one that stops the therapy. Name the common, transient one and say how long it usually lasts.
4. **The stop-signal.** One clear thing that means contact us. One — a list of seven is a list of none.
5. **Teach-back, not 'any questions?'.** Ask them to tell you when they will take it and what they will do if they miss one. This is the only step that measures understanding.
6. **Anticipate the drop-off.** Name the likely reason this patient stops and address it in a sentence before they leave.

## Output Format

### Counselling: [medicine] · [patient] · [pharmacist] · [date]

**Purpose (their words):** [what it is for, said the way you would to a friend]

**How to take it:** [dose, timing anchored to a daily habit, with or without food, what to do about a missed dose]

**What to expect:** [the common transient effect, how long it usually lasts, and what improvement looks like and when]

**Contact us if:** [the single clear stop-signal] · **Seek urgent care if:** [the emergency signal, if any]

**Teach-back:**
- "When will you take this?" → [what the patient said]
- "What will you do if you miss one?" → [what the patient said]

**Likely reason for stopping:** [the anticipated drop-off] · **Addressed by:** [the sentence used]

**Documented:** counselled on [items] · teach-back [satisfactory / repeated / interpreter used] · written information supplied [Y/N]

> A communication framework for a licensed pharmacist. It does not determine appropriateness, dose, or interaction for any individual, and it does not replace the approved product information or your local counselling requirements. Verify every product-specific statement against current references before it reaches a patient.

## Quality Checks
- [ ] The purpose is stated in the patient's language, not the drug class
- [ ] Dosing is anchored to an existing daily habit
- [ ] One common side effect is named honestly, with its usual duration
- [ ] There is exactly one clear stop-signal, not a list
- [ ] Teach-back is used rather than 'any questions?'
- [ ] The likely reason for discontinuation is anticipated and addressed
- [ ] Counselling and teach-back outcome are documented

## Anti-Patterns
- **Reciting the leaflet.** Complete, unmemorable, and worse than three sentences.
- **'Any questions?'** Almost always answered 'no', and proves nothing.
- **Hiding the common side effect.** The patient discovers it at home and stops the medicine.
- **Seven warning signs.** Nobody retains seven; give one and it might be acted on.
- **Counselling the wrong person.** If a carer administers the dose, the counselling belongs to them.
- **Skipping the interpreter.** Comprehension you assumed is comprehension you did not check.

## Example Trigger Phrases
- "Write counselling for a patient starting metformin"
- "How do I counsel on a new inhaler at the counter?"
- "Patient is switching to a generic and is worried — what do I say?"
- "Write a teach-back script for a new anticoagulant"
- "How do I improve adherence for a patient who keeps stopping their statin?"
