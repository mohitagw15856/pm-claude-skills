---
trigger: model_decision
description: "Turn notes, a chapter or a syllabus into flashcards built for spaced repetition: one fact per card, questions that force recall, and a file ready to import into Anki or a similar app. Use when asked to make flashcards from these notes, build an Anki deck, turn this chapter into cards, make cloze cards, or fix my flashcards. Produces a card list with front, back and tag, a count by topic, cards flagged as too big or too vague, and an import file written by the bundled script."
---

# Flashcard Deck Builder Skill

Flashcards fail when they are miniature notes: a heading on the front and a paragraph on the back. Reviewing them feels like studying and tests almost nothing. A card that works asks for one thing, can be answered in a few seconds, and can be marked right or wrong without argument. This skill writes cards that way from the student's own material and exports them. To plan when to study, use `exam-study-plan`; for a practice test, use `quiz-generator`.

> **Not quite this?** Use `quiz-generator` for a practice test with an answer key, and `study-notes-synthesizer` to turn raw notes into revision notes first.

## What This Skill Produces

- **Cards**: front, back and a topic tag, one fact each
- **Cloze cards** where a sentence with a gap tests better than a question
- **A count by topic**, so thin areas are visible
- **A review list**: source statements that were unclear, disputed or too large to card well
- **An import file**, tab-separated, written by the bundled script

## Required Inputs

Ask for these if not provided:
- **The source material**: notes, a chapter, lecture slides or a syllabus
- **The exam or goal**, and its level, so the cards match what will be asked
- **How many cards** the student can realistically review. More cards is not better
- **The app**, if not Anki, so the export suits it

Card only what is in the material. If the notes are wrong or ambiguous, flag the line instead of correcting it from memory, and never add a fact, date or formula the source does not contain.

## Framework: One Fact, Recalled

1. **Understand before carding.** A card cannot teach. If a section of the notes does not make sense, list it for the student to resolve first.
2. **One fact per card.** A list of five causes becomes five cards, or one card per cause with the others as context, never one card with five answers.
3. **Ask a question that needs recall.** "What does the enzyme do to the activation energy?" and not "Enzymes: discuss". Avoid yes or no questions.
4. **Make the answer short and checkable.** A word, a number, a phrase, one formula.
5. **Use cloze for definitions and sequences.** "The powerhouse of the cell is the {{c1::mitochondrion}}." One gap per card unless the gaps belong together.
6. **Card both directions when both are examined.** Term to definition and definition to term are different memories.
7. **Add the reason where it helps.** A second line on the back saying why makes the fact stick and stops rote guessing.
8. **Tag by topic** from the syllabus, so weak areas can be drilled.
9. **Cut.** Remove trivia the exam will not ask and anything the student already knows cold.

## Programmatic Helper

This skill ships `scripts/flashcards.py`, with no dependencies beyond the standard library. It turns the card list into an import file, so tabs, quotes and line breaks inside a card cannot corrupt the deck:

```bash
python3 scripts/flashcards.py check cards.json
python3 scripts/flashcards.py export cards.json --out deck.tsv
```

`cards.json` is a list such as `[{"front": "…", "back": "…", "tag": "enzymes"}]`. A cloze card has `"cloze": "The {{c1::answer}} sentence"` in place of front and back. `check` reports cards that are empty, duplicated, very long or cloze cards with no gap. `export` writes one tab-separated file for basic cards and, if there are cloze cards, a second file ending `-cloze.tsv`, because Anki imports the two note types separately.

## Output Format

# Flashcards: [subject] · [N] cards

## Cards
| # | Front | Back | Tag |
|---|-------|------|-----|

## Cloze Cards
| # | Sentence with gap | Tag |
|---|-------------------|-----|

## By Topic
| Topic | Cards |
|-------|------:|

## Check Before Studying
[Lines of the notes that were unclear, looked wrong or could not be carded]

## Import
[The export command, and the two-step import if there are cloze cards]

## Quality Checks

- [ ] Every card tests one fact
- [ ] Every answer can be marked right or wrong in a few seconds
- [ ] Nothing on a card is absent from the source material
- [ ] Doubtful source statements are flagged, not silently corrected
- [ ] Cards are tagged by topic
- [ ] The import file was written by the script

## Anti-Patterns

- [ ] Do not put a paragraph on the back of a card
- [ ] Do not write "explain", "discuss" or "describe" cards
- [ ] Do not card material the student has not understood
- [ ] Do not add facts from memory to fill a topic
- [ ] Do not make hundreds of cards when the student can review fifty

## Example Trigger Phrases

- "Make flashcards from these notes."
- "Build an Anki deck for this chapter."
- "Turn these definitions into cloze cards."
- "My flashcards are not working. Fix them."

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/flashcard-deck-builder.html

<!-- pm-claude-skills v84.1.0 | skill: flashcard-deck-builder | source: skills/flashcard-deck-builder/SKILL.md | sha256: b095cc69a9d9330bd8d99580317fb6a6412e06d47dc021e4ab5fd9fc472b2974 | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
