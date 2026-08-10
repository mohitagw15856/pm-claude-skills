---
trigger: model_decision
description: "Assemble the grab-and-go document and information kit for a disaster — the IDs, insurance, medical, financial, and property records (physical copies + secure digital backups) you'd need to prove who you are, get aid, and rebuild after a fire, flood, or evacuation. Use when someone says 'what documents for an emergency', 'important papers for a disaster', 'emergency document checklist', or 'what would I need if my house burned down'. Produces a documents checklist, a physical + digital storage plan, and the info that isn't a document (contacts, med lists). Pairs with the go-bag."
---

# Emergency Doc Kit Skill

When people lose homes to fire or flood, the second disaster is bureaucratic: no ID to
prove who they are, no policy number to start an insurance claim, no record of what they
owned, no list of their medications. Aid, insurance, and rebuilding all run on paperwork,
and that paperwork is exactly what burns or floods. The emergency doc kit solves this in
advance — the critical records gathered, copied physically for the go-bag, and backed up
securely in the cloud so they survive even if the originals don't. It's the documents core
of the [[go-bag-builder]], given its own skill because it's the piece people most often
skip and most bitterly regret skipping.

## What This Skill Produces

- A **documents checklist**, by category: identity (passports, IDs, birth/marriage
  certificates, immigration/visa docs), insurance (policies + numbers + contacts), medical
  (prescription lists, conditions, care plans, insurance cards), financial (bank/account
  info, key card details), property (deeds/lease, home inventory, vehicle titles), and
  pets/family (vaccination, custody, care needs)
- A **physical + digital storage plan**: certified/plain copies in the go-bag, originals in
  a fireproof/waterproof container or safe-deposit, and encrypted cloud backups so records
  survive the originals' loss
- The **info that isn't a document**: emergency contacts, out-of-area contact, medication
  and dosage list, medical conditions, insurance and utility phone numbers — captured
  where you can reach them
- A **home inventory prompt**: a fast photo/video walkthrough of belongings that turns a
  future insurance claim from a memory test into a documented one

## Required Inputs

Ask for (if not already provided):
- Household members (each needs their identity/medical records) and pets
- What insurance and property they hold (home/renters, auto, health, life) and where
  records currently live
- Medical realities: prescriptions, conditions, care plans that must travel
- Their digital comfort (for the secure-backup approach) and whether they have a safe/
  safe-deposit option

## Framework

1. **Gather by category so nothing's missed.** Walk identity → insurance → medical →
   financial → property → pets/family. Each category has records that are painful or slow
   to replace after a disaster (a replacement birth certificate mid-crisis is weeks of
   delay). The checklist makes the invisible-until-needed visible.
2. **Copy for the go-bag, protect the originals.** The go-bag gets copies (plain or
   certified as needed) so you can prove identity and start claims immediately after
   evacuating. Originals go in a fireproof/waterproof container or safe-deposit box —
   because carrying originals risks losing them, and losing them is the whole problem.
3. **Back up securely in the cloud — the survives-anything layer.** Encrypted digital
   copies (a password-protected archive in reputable cloud storage, or a dedicated
   secure-document service) mean the records exist even if both home and go-bag are lost.
   Handle the security honestly: these are your most sensitive documents, so encryption
   and a strong, recoverable password matter (ties to [[password]] hygiene and
   [[digital-death-plan]]'s access thinking).
4. **Capture the non-document info.** Some critical information isn't a filed document: the
   out-of-area emergency contact, everyone's medications and doses, medical conditions,
   the insurance/utility/mortgage phone numbers. Put these on a card in the kit and in the
   secure backup — in a crisis you won't remember them.
5. **Do the home inventory now.** A ten-minute phone video walking through each room, plus
   photos of high-value items and receipts, transforms an insurance claim: instead of
   proving from memory what you lost, you have documentation. Store it in the secure
   backup. This single step recovers real money after a total loss.

## Output Format

```
## Documents checklist (by category)
Identity: … · Insurance: … · Medical: … · Financial: … · Property: … · Pets/family: …
[per person where relevant]

## Storage plan (three layers)
Go-bag: copies (certified where needed) · Home: originals in fireproof/waterproof or
safe-deposit · Cloud: encrypted backups (strong, recoverable password)

## Info that isn't a document (put on a card + in backup)
[Out-of-area contact · medications & doses · medical conditions · insurance/utility/
mortgage numbers]

## Home inventory (do this today)
[The 10-minute room-by-room video + high-value photos/receipts → secure backup — turns a
future claim from memory into evidence]

⚠ These are your most sensitive records — secure the digital copies (encryption, strong
password). Pairs with the go-bag; follow official guidance in a real event.
```

## Quality Checks

- [ ] The checklist covers all categories (identity, insurance, medical, financial,
      property, pets) for each household member
- [ ] The three-layer storage (go-bag copies / protected originals / encrypted cloud) is
      specified
- [ ] Digital-copy security (encryption, strong recoverable password) is handled honestly
- [ ] The non-document info (contacts, med lists, key numbers) is captured
- [ ] The home-inventory step is included as a concrete today-action

## Anti-Patterns

- [ ] Do not tell people to carry originals in the go-bag — copies travel, originals are
      protected; losing originals is the failure mode
- [ ] Do not skip digital-copy security — these are the crown-jewel documents; unencrypted
      cloud copies are their own risk
- [ ] Do not forget the non-document info and the home inventory — the two most-skipped,
      most-regretted pieces
- [ ] Do not treat this as one-and-done — records change (new policies, expired passports);
      it needs periodic refresh
- [ ] Do not omit any household member's medical/identity records, including children and
      dependents

## Related

[[go-bag-builder]] (this is its documents core); [[password]] and [[digital-death-plan]]
for the secure-access thinking; [[after-the-disaster]] uses this kit to start claims;
[[insurance-claim]] for the claim the home inventory supports.
