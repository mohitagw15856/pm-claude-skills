---
name: patient-communication
description: "Write clear, plain English patient communications for any healthcare context. Use when asked to write a patient letter, patient information leaflet, appointment letter, test results letter, discharge summary for patients, or health education content. Targets accessible reading level with clear next steps."
---

# Patient Communication Skill

Writes patient-facing healthcare communications in plain, accessible language — targeting UK Grade 6 / US Grade 8 reading level.

WARNING: All patient communications must be reviewed and approved by a qualified healthcare professional before sending. This skill produces drafts only.

## Required Inputs
- **Communication type** (appointment letter / results letter / discharge info / patient leaflet / consent info / health education)
- **Clinical context**
- **Key messages** (what the patient must understand and do)
- **Tone** (reassuring / informative / urgent)
- **Specific instructions or next steps**
- **Contact details for queries**

## Output Structure

### Type A: Patient Letter

[Date]

Dear [Patient name],

**Re: [Clear subject line in bold]**

[Opening paragraph: State clearly what this letter is about. No preamble.]

[Main content — short paragraphs, 2-3 sentences each. Bullet points for instructions. Bold anything the patient must do or remember.]

**What happens next:**
- [Action 1 — specific with timeframe]
- [Action 2]

**If you have questions:**
Contact us at [phone] between [hours] or email [address].

If you feel unwell before your appointment, please [specific instruction].

Yours sincerely, [Name, Title, Department]

---

### Type B: Patient Information Leaflet

**[Plain language title]**

**What is [topic]?** [2-3 plain English sentences. Explain technical terms immediately.]

**Why has this been recommended for me?** [Personalised clinical reason in patient terms]

**What will happen?** [Numbered step by step]

**What are the benefits?** [Honest statement]

**What are the risks?** [Common first, then rare but serious. Use frequencies: "About 1 in 10 people..." not "10% incidence"]

**What should I do to prepare?** [Specific instructions]

**When should I contact someone?** [Specific signs — not vague. "Temperature above 38C" not "if you feel unwell"]

---

### Type C: Test Results Letter

**Your [test name] results — [Normal / Abnormal] — stated in the FIRST sentence, never paragraph 3.**

[What this means in plain English]

**What happens next:** [Clear next steps. If no action, say so explicitly.]

---

## Plain Language Rules (apply to all types)
- Maximum 2 syllables per word where possible
- Maximum 20 words per sentence
- Active voice: "We will contact you" not "You will be contacted"
- Spell out all acronyms on first use
- No Latin: "twice daily" not "bd"
- Use "you" and "we" throughout
- Numbers as digits: "2 tablets" not "two tablets"

## Quality Checks

- [ ] Written at or below Grade 8 reading level (short words, short sentences)
- [ ] Active voice used throughout ("We will contact you" not "You will be contacted")
- [ ] Results letter states the result in the first sentence
- [ ] Next steps are specific and include timeframes
- [ ] No Latin or acronyms without explanation
- [ ] Disclaimer that clinical review is required before sending

## Example Trigger Phrases
- "Write a patient letter about [topic]"
- "Create a patient information leaflet for [procedure]"
- "Write a plain English results letter for [test]"
