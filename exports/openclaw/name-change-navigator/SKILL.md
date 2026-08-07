---
name: name-change-navigator
description: "Get through the 40-institution slog of changing your name — after marriage, divorce, transition, or just because — in the right order, so one update doesn't block the next, with nothing important forgotten. Use when someone says 'I changed my name and don't know where to start', 'update my name everywhere', 'name change checklist', or is planning any legal name change. Produces an ordered update checklist (what unlocks what), a personalized institution list, and templates. Not legal advice — the logistics; the legal deed/court step is flagged, not performed."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/name-change-navigator.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Name Change Navigator Skill

Changing your name legally is a bureaucratic hydra: forty-odd institutions each need
updating, several require *others* to be done first (you often can't update the bank
until the ID is changed, can't change the ID without the legal document), and missing
one surfaces at the worst moment — the passport that doesn't match the ticket, the
insurance that won't pay because the name's wrong. This skill turns the chaos into an
ordered campaign: the correct sequence, the full list built from your actual life, and
templates so each update is a fill-in, not a puzzle. The reason for the change —
marriage, divorce, transition, or choice — shapes the sensitivities but not the core
machinery.

## What This Skill Produces

- An **ordered checklist**: the sequence that respects dependencies — the legal
  document first, then the primary IDs, then everything that needs those IDs, so you
  never hit a "we can't update this until you've updated that" wall
- A **personalized institution list**: built from the user's real footprint (not a
  generic list) — government, financial, work, health, home, digital, memberships,
  the easily-forgotten ones
- **Templates**: the notification wording, what documents each type of institution
  typically wants, and a tracking sheet so a multi-week slog doesn't lose its place
- **Sensitivity handling** by reason: the deadname-avoidance approach for
  transition, the emotional-logistics of divorce, the timing around a wedding

## Required Inputs

Ask for (if not already provided):
- The reason (marriage/divorce/transition/choice) and where the legal step stands
  (have the marriage certificate / deed poll / court order, or not yet?)
- Country/region — the legal mechanism and the specific agencies vary enormously;
  flagged for local verification, never asserted
- Their actual footprint: which banks, government IDs, employer, insurers, utilities,
  subscriptions, professional bodies, etc.
- Any sensitivities: avoiding the old name appearing, records that must be discreet,
  a hard deadline (travel booked, a wedding)

## Framework

1. **The legal document is the key that unlocks everything — get it first.** Almost
   nothing else will update without the underlying legal proof (marriage certificate,
   deed poll/court order — mechanism varies by place, flagged verify-local). The
   sequence starts here; skipping it wastes every downstream attempt.
2. **Then primary IDs, in dependency order.** Passport, driver's license, national
   ID, social-security-equivalent — these are the second key, because most financial
   and official bodies want an updated government ID, not the legal document directly.
   Get the ID dominoes before the things that lean on them.
3. **Build the list from THIS life, tiered.** Reconstruct the footprint and tier it:
   critical (government, primary bank, employer, health/insurance), important (other
   finances, utilities, mortgage/landlord, professional licenses), and whenever
   (subscriptions, loyalty cards, social media, the gym). Tiering lets the user do
   the load-bearing ones first and forgive themselves the long tail.
4. **Template the repetition.** Each institution asks similar things (updated ID copy,
   the notification, sometimes a form). Provide the reusable wording and a documents
   cheat-sheet, plus a tracking sheet (institution · sent · confirmed) — because a
   40-item task over weeks is lost without a place to track it.
5. **Handle the human layer by reason.** Transition: order things to minimize the old
   name resurfacing, note where it may stubbornly persist and how to push. Divorce:
   the reverting-or-not decision and its emotional weight. Marriage: timing around the
   certificate and the honeymoon passport trap (name-on-ticket must match passport).
   Choice: the freedom and the occasional "why?" script.

## Output Format

```
## Your ordered campaign
1. LEGAL DOCUMENT [verify-local mechanism] → 2. PRIMARY IDs → 3. everything that
needs the IDs. [with the "this unlocks that" dependencies shown]

## Your institution list (tiered)
Critical: … · Important: … · Whenever: …

## Templates & tracking
Notification wording · documents each type wants · tracking sheet (sent/confirmed)

## For your situation
[Reason-specific notes: deadname-avoidance / divorce reversion / wedding-passport
timing · verify-local for the legal step]
```

## Quality Checks

- [ ] The sequence respects real dependencies (legal doc → primary IDs → the rest);
      no step that would be blocked appears before its unlock
- [ ] The institution list reflects the user's actual footprint and is tiered
- [ ] A tracking method is included for the multi-week reality
- [ ] The legal mechanism and agency specifics are flagged verify-local, never asserted
- [ ] Reason-specific sensitivities (deadname, divorce, wedding timing) are handled

## Anti-Patterns

- [ ] Do not give a flat unordered list — the dependency order IS the value; an
      unordered list recreates the wall-hitting
- [ ] Do not assert the legal process, agency names, or requirements for a country —
      they vary; flag verify-local and route to the official source
- [ ] Do not deadname or let old-name persistence go unaddressed for transition users
- [ ] Do not forget the passport-vs-ticket trap for anyone with travel booked
- [ ] Do not treat the emotional layer (divorce, transition) as pure admin — the tone
      holds the human weight while listing tasks

## Related

[[coming-out-rehearsal]] often precedes a transition name change; [[contract-review]]
neighbors for the marriage/divorce paperwork; [[digital-death-plan]] shares the
build-the-list-from-real-life method.
