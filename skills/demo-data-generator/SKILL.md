---
name: demo-data-generator
description: "Use when asked to create demo data, seed a no-signup demo, generate fake but realistic data for screenshots, or fill a sandbox without using real customer data. Produces realistic, internally consistent fake data so a project can ship a demo nobody has to sign up for: a data schema summary, a seeded generation script, seed files, and a checklist confirming no real personal data is included."
version: 1.0.0
---

# Demo Data Generator

A demo that asks visitors to sign up loses most of them; a demo full of "Test User 1" and "Lorem ipsum" convinces nobody. Good demo data looks like a real account a few months in, holds together (orders belong to real users, totals add up, nothing happens before signup), and contains no real person's details. This skill designs that data and writes a seeded generator that produces the same files every time.

## Required Inputs

Ask for these if not provided:
- **The data model**: entities, fields, types and relationships (a schema file, migrations or ORM models)
- **The story the demo should tell**: for example "a five-person design studio, three months in, one overdue invoice"
- **Volume**: how many of each entity makes the demo feel alive without being slow
- **Language and storage**: where the seed files will be loaded (JSON, CSV, SQL inserts)
- **Locale**: names, currency, date and phone formats

## Output Structure

### 1. Schema summary
A table of entities and the rules that keep them consistent:
| Entity | Count | Key fields | Relationships | Consistency rules |

Consistency rules include foreign keys that must exist, lifecycle order (created before updated, signup before first order), derived values (totals from lines, counts from children) and status transitions that are allowed.

### 2. The story
Five to eight sentences describing the demo account, with the specific details that make screens interesting: one item overdue, one power user, a recent spike, an empty state somewhere useful.

### 3. Generation script
A complete script, seeded so the same seed gives byte-identical output, built on `references/generator-template.mjs` (or translated to the project's language). It must:
- use a seeded random generator, never `Math.random()` directly
- generate parents before children and pick foreign keys only from generated parents
- compute derived values rather than inventing them
- run consistency checks at the end and exit with an error if any fail
- write seed files and print a one-line summary

### 4. Seed files
A short excerpt of each generated file (three records each) and the command that regenerates them.

### 5. No-real-data checklist
- [ ] Emails use `example.com`, `example.org` or `example.net` (reserved by RFC 2606)
- [ ] Phone numbers come from ranges reserved for fiction (for example UK 07700 900000 to 900999, US 555-0100 to 555-0199)
- [ ] Names come from a fixed fictional list, not scraped or copied from real records
- [ ] Addresses use fictional streets or generic city-level data only
- [ ] No production database, export or log was used as a source
- [ ] Company names do not match real companies in the same sector
- [ ] Images are generated, licensed for the purpose, or placeholders

## Quality Checks

- [ ] The script is seeded and the same seed produces identical files
- [ ] Every foreign key in the output points at a generated record
- [ ] No child record is dated before its parent's creation
- [ ] Every derived value is computed from its parts
- [ ] The script fails loudly if a consistency check fails
- [ ] Every item in the no-real-data checklist is ticked or explained
- [ ] The story includes at least one edge case the demo should show

## Anti-Patterns

- **Copying production data and "anonymising" it.** Re-identification is easier than it looks; generate from scratch.
- **Random everything.** Uniform randomness looks fake; real accounts have a few heavy users and many light ones.
- **Unseeded generation.** Screenshots and tests drift every time the data is rebuilt.
- **Real-looking emails at real domains.** Someone will receive the demo's password-reset email.

## Example Trigger Phrases

- "Generate demo data for my invoicing app so visitors don't need to sign up."
- "Create realistic seed data for screenshots, no real people."
- "Write a seeded script that fills my sandbox with consistent fake data."
- "I need a no-signup demo. Make the data tell a story."
