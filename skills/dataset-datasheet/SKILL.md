---
name: dataset-datasheet
description: "Document a dataset so others know what it is, how it was made, and when not to use it. Use when asked to write a datasheet for a dataset, document training/eval data, or assess whether a dataset is fit for a use. Produces a datasheet — motivation, composition, collection process, preprocessing, recommended uses & limits, distribution, and maintenance."
---

# Dataset Datasheet Skill

Models inherit the flaws of their data, and most data debt is invisible because nobody wrote down where
the data came from. A datasheet is that record: how the dataset was collected, what's in it, what's
missing, and what it should *not* be used for. It's the difference between a reusable asset and a liability.

## Required Inputs

Ask for these only if they aren't already provided:

- **Dataset name, version, owner** and what it's used for today.
- **Motivation** — why it was created and for what task.
- **Composition** — what an instance is, how many, fields/labels, and time range.
- **Collection** — sources, method (scraped, logged, purchased, annotated), and consent/licensing basis.
- **Known issues** — gaps, imbalances, label noise, sensitive attributes, duplicates.

## Output Format

### Datasheet: [dataset] v[version]
**Owner:** [team] · **Created:** [date] · **License:** [license]

**1. Motivation** — why this dataset exists, the task it serves, and who funded/created it.

**2. Composition**
- What a single instance represents; total count; the schema (fields, label definitions).
- Class/label balance and key distributions (and notable skews).
- **Sensitive attributes** present (directly or by proxy), and whether individuals are identifiable.
- Known missing data, duplicates, or noise.

**3. Collection process** — sources, mechanism (scrape/log/survey/annotation), time window, sampling strategy, and the **legal/consent basis** (license, ToS, opt-in).

**4. Preprocessing / labelling** — cleaning, dedup, filtering, and how labels were produced (who annotated, guidelines, inter-annotator agreement).

**5. Recommended uses & limits**
- **Appropriate uses:** tasks this data supports well.
- **Do not use for:** tasks where its biases/gaps would cause harm or invalid results.

**6. Distribution & access** — who can use it, how it's shared, and tenancy/PII handling.

**7. Maintenance** — owner, update cadence, versioning, and how errors get reported and fixed.

## Quality Checks

- [ ] The collection method and **legal/consent basis** are stated — not assumed
- [ ] Class balance and key distribution skews are quantified, not hand-waved
- [ ] Sensitive attributes (and proxies for them) are identified explicitly
- [ ] "Do not use for" lists concrete tasks where the data would mislead
- [ ] Label provenance is documented (who labelled, with what guidelines, and agreement level)
- [ ] An owner and update/error-reporting process are named

## Anti-Patterns

- [ ] Do not describe only the happy-path contents — the gaps, skews, and noise are what cause model failures
- [ ] Do not omit the consent/licensing basis — "we scraped it" is a legal and ethical liability if undocumented
- [ ] Do not ignore proxy variables — removing race/gender columns doesn't remove the bias if zip code or name encodes it
- [ ] Do not present label quality as perfect — state who labelled it and the agreement rate, or note it's unmeasured
- [ ] Do not leave the dataset ownerless — an unmaintained dataset silently rots as the world changes

## Based On

Datasheets for Datasets (Gebru et al., 2018) and data-documentation practice in responsible-AI reviews.

## Example Trigger Phrases

- "Write a datasheet for a dataset."
- "Document training/eval data."
- "Assess whether a dataset is fit for a use."
