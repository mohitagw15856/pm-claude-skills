---
trigger: model_decision
description: "Write a sincere condolence or sympathy message when someone has died or a friend is grieving — warm, personal, and free of the clichés that hurt more than help. Use when asked what to say when someone dies, write a sympathy/condolence message, my friend lost their [person], or I don't know what to say. Produces a heartfelt message tuned to your relationship and the situation, drawn from a specific memory or quality where possible, an honest acknowledgment (not toxic-positive platitudes), an offer of concrete support, and guidance on what to avoid saying."
---

# Condolence Message Helper

When someone's grieving, most people freeze — afraid of saying the wrong thing, so they say something hollow or nothing at all. What actually comforts is simple: acknowledge the loss, share something real about the person if you knew them, and offer concrete support. This helps you write that, tuned to your relationship, and steers you away from the well-meant clichés that sting.

## What This Skill Produces

- **A sincere message** — warm and personal, matched to how close you are to the grieving person (and whether you knew the deceased)
- **A specific touch** — a memory or quality of the person who died, if you knew them (this means the most)
- **Honest acknowledgment** — naming the loss and the pain simply, without minimizing or "everything happens for a reason"
- **A concrete offer** — real, specific help ("I'll bring dinner Thursday") over a vague "let me know if you need anything"
- **What to avoid** — the clichés and missteps that unintentionally hurt

## Required Inputs

Ask for these if not provided:
- **Who died / what happened** — and your relationship to the person grieving
- **Did you know the deceased** — and any memory or quality you'd share
- **The channel** — card, text, message, or spoken; and how soon
- **Your closeness** — close friend, colleague, acquaintance (tunes tone/length)
- **Any sensitivities** — cause of death, faith/culture, complicated relationships

## Framework: Acknowledge, Remember, Offer — Simply

1. **Acknowledge the loss plainly.** Name it and the pain simply ("I'm so sorry — this is a huge loss"). Don't reach for silver linings or explanations.
2. **Share something specific.** If you knew the person, a brief real memory or quality ("I'll always remember her laugh") comforts far more than generic praise.
3. **Don't minimize or fix.** Avoid "at least," "everything happens for a reason," "they're in a better place," and unsolicited advice — presence beats platitudes.
4. **Offer concrete help.** Replace "let me know if you need anything" with a specific, low-burden offer they don't have to organize.
5. **Match tone and closeness.** Keep it as long or short as your relationship warrants, and be mindful of faith, culture, and any complicated history.

## Output Format

### Condolence message: [who died] · your relationship: [x] · [channel]

**Message**
> [Plain acknowledgment of the loss] … [a specific memory/quality if you knew them] … [a concrete offer of support] … [a warm close].

**Concrete offer instead of "let me know":** "[specific, low-burden help]".
**Avoid saying:** [the clichés/missteps for this situation].
**Tone note:** [adjust for closeness / faith / sensitivities].

## Quality Checks
- [ ] Acknowledges the loss simply, without minimizing
- [ ] Includes a specific memory/quality if the writer knew the deceased
- [ ] Avoids "at least" / silver-lining clichés
- [ ] Offers concrete, low-burden support over a vague "let me know"
- [ ] Tone matches the relationship and any sensitivities
- [ ] Lists what to avoid saying

## Anti-Patterns
- **Clichés that minimize** — "at least," "better place," "everything happens for a reason."
- **Making it about you** or your own losses.
- **Unsolicited advice** on grieving.
- **Vague "let me know if you need anything."**
- **Generic praise** when a specific memory was possible.

## Example Trigger Phrases
- "My friend's mum just died and I don't know what to say."
- "Write a sympathy message for a colleague who lost their spouse."
- "What do I write in a condolence card?"
- "A friend had a miscarriage — what can I say that helps?"
- "Help me message someone whose pet just died."
