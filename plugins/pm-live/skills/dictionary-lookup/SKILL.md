---
name: dictionary-lookup
description: "Look up word definitions, pronunciation, etymology and synonyms with zero API keys — the Free Dictionary API via curl, with honest handling of words it doesn't know. Use when asked define a word, how do you pronounce this, what's the origin of a word, or synonyms for something. Produces the definition set organized by part of speech, IPA pronunciation with audio link, and the rerunnable command — with the model's own knowledge clearly separated from the fetched source."
---

# Dictionary Lookup Skill

A dictionary lookup sounds like something a language model shouldn't need — until the question is "is this *actually* a word," "what's the IPA," or "give me a citable source," where fetched beats recalled. The Free Dictionary API answers over keyless HTTPS with definitions, phonetics, audio, and origins. This skill fetches, formats by part of speech, and keeps a clean line between what the source says and what the model adds — because a dictionary answer's whole value is knowing which is which.

## What This Skill Produces

- **The entry** — definitions grouped by part of speech, with example sentences where the source has them
- **Pronunciation** — IPA text and the audio-file link when available
- **Synonyms/antonyms** — from the source, supplemented (and labeled) by the model when thin
- **The command** — exact curl, rerunnable; and an honest miss-report when the API lacks the word

## Required Inputs

Ask for these if not provided:
- **The word** — and the *sense* if context suggests one ("mean" the verb, the adjective, or the statistic?)
- **What they actually need** — a quick meaning, pronunciation, etymology, or a citable check that a word exists — the output leads with it
- **Language note** — this API is English-only; other languages get an honest redirect (Wiktionary manually) rather than a fake answer

## Framework: Fetch, Format, and the Honesty Line

1. **The call:** `curl -s "https://api.dictionaryapi.dev/api/v2/entries/en/serendipity"` → JSON array: `phonetic`/`phonetics[]` (IPA + `.audio` mp3 links), `meanings[]` grouped by `partOfSpeech`, each with `definitions[]` (with `example` sometimes), `synonyms`, `antonyms`, plus `origin` on some entries.
2. **Lead with the asked-for thing:** a pronunciation question gets IPA in line one, not after four noun senses; an is-it-a-word check gets yes/no plus the entry as proof.
3. **The miss is information:** a 404 means *this API* lacks the word — common for new coinages, technical jargon, and inflected forms. Report exactly that, try the lemma (running → run), and if the model still knows the word, define it **clearly labeled as model knowledge, not the fetched source**. Never dress recall as a citation.
4. **Sense selection over sense-dumping:** when context implies a sense, lead with it and compress the others to one line each; "mean" has a dozen senses and the user wanted one.
5. **Supplement with labels:** the API's synonym lists are often thin — model-added synonyms go under "additional (model-suggested)," keeping the source's authority intact for the part that claims it.

## Output Format

# [word] · [IPA] [· audio link]

**[part of speech]** — [the leading sense, with example]
[Other senses, compressed · other parts of speech]

**Origin:** [when present in source or asked — labeled if model-supplied]
**Synonyms:** [source list] [· additional (model-suggested): …]

Source: Free Dictionary API · rerun: `[exact curl]`
[On a 404: "not in this dictionary — tried '[lemma]'; the definition below is model knowledge, not a fetched source"]

## Quality Checks

- [ ] The asked-for element (meaning/IPA/origin/existence) leads the answer
- [ ] Definitions are grouped by part of speech, contextual sense first
- [ ] Source content and model additions are visibly separated
- [ ] 404s report the miss and try the lemma before falling back
- [ ] The rerunnable curl appears

## Anti-Patterns

- [ ] Do not present model recall as the fetched entry — the label line is the skill's integrity
- [ ] Do not dump every sense undifferentiated when context picked one
- [ ] Do not fake non-English lookups on an English-only API — redirect honestly
- [ ] Do not treat a 404 as "not a word" — it's "not in this dictionary," a much smaller claim
- [ ] Do not skip pronunciation when the question was spoken-word-shaped (names, presentations, ESL contexts)
