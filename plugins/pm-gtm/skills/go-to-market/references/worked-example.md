# Worked Example — Go-To-Market Skill

## The brief

Carbonhive sells carbon-accounting software to EU mid-market companies (250–3,000 employees) caught by the CSRD reporting wave — 214 customers, €7.4M ARR. It is launching **Supplier Pulse**, an add-on module that automates the worst part of Scope 3 reporting: chasing suppliers for emissions data. The module sends, escalates, and validates supplier data requests automatically and maps responses to ESRS datapoints; pilots at 9 design partners cut median supplier response time from 47 to 11 days. Pricing lands at €1,250/month per legal entity as an add-on. Marketing wanted to unveil it on the main stage at the Reset:ECO summit in October; the launch is instead phased through design partners into a Q1 general release — partly because the commercial team's compensation plan doesn't recognise the new SKU until the next fiscal year, and launching a product the sales org isn't yet incentivised to sell would waste the announcement. The brief arrived with differentiators but almost no proof points, so several are inferred and labelled.

## The output

---

# GTM Pack: Carbonhive Supplier Pulse

*Scope note: this pack supports a design-partner-first rollout through Q4 2026, with the public launch moment held for the FY27 kickoff — timed so the commercial team is fully enabled and incentivised on the new SKU before it carries a quota. The Reset:ECO stage slot goes to a customer story instead, which seeds the category without pre-announcing an unsellable product.*

---

### 1. Positioning Statement

> For **sustainability leads at EU mid-market companies (250–3,000 employees)** who **must file CSRD-compliant reports with Scope 3 supplier data they cannot reliably collect**, **Carbonhive Supplier Pulse** is a **supplier-data automation module** that **collects, validates, and maps supplier emissions data into audit-ready ESRS datapoints without spreadsheet chasing**. Unlike **enterprise ESG suites like Verdantia, which bundle supplier data into six-month consulting engagements**, our product **goes live in three weeks on top of the Carbonhive account you already run**.

**Tagline:** *Scope 3 data that collects itself.* (6 words)

**Who this is not for:** companies needing full CSDDD supply-chain due-diligence workflows (human-rights audits, tiered supplier mapping), teams below ~50 reportable suppliers (manual collection is genuinely cheaper), or buyers without a core Carbonhive subscription — Supplier Pulse is an add-on, not a standalone product. Sales should qualify these out early rather than discount in.

---

### 2. Messaging Pillars

**Pillar 1 — Data that chases itself**
Supplier Pulse replaces the quarterly email-and-spreadsheet chase with automated request, reminder, and escalation sequences that run until the data arrives.
- Proof points: median supplier response time fell from 47 days to 11 days across 9 design partners *(pilot data, n=1,240 supplier requests)*; 78% first-pass data completeness vs ~40% for spreadsheet campaigns *(assumed — confirm against pilot cohort before external use)*
- Example copy: *"Your suppliers get chased so your team doesn't have to — Supplier Pulse ran 1,200 data requests last quarter without a single reminder email written by a human."*

**Pillar 2 — Audit-ready by construction**
Every datapoint lands with its source, collection method, and ESRS mapping attached — so assurance prep is an export, not a reconstruction.
- Proof points: design partner cut external assurance preparation from six weeks to nine days *(assumed — confirm with partner before naming them)*; every value carries a full lineage trail (who supplied it, when, under which methodology) — a limited-assurance auditor requirement from 2026 filings onward
- Example copy: *"When the auditor asks 'where did this number come from?', the answer is attached to the number."*

**Pillar 3 — Mid-market speed, not enterprise ceremony**
Live in three weeks, run by the team you already have, priced per legal entity rather than per supplier.
- Proof points: median time-to-first-supplier-response of 16 days from contract signature across pilots *(pilot data)*; no implementation consultants required — onboarding is handled by the existing Carbonhive CSM motion *(assumed — confirm CSM capacity model holds at GA scale)*
- Example copy: *"Verdantia's proposal came with a six-month services attachment. Supplier Pulse was collecting data before their kickoff call would have happened."*

**Pillar 4 — Your suppliers will actually answer**
The supplier-facing side is a 12-minute guided form in six languages with sector-specific defaults — because Scope 3 data quality is decided by the supplier's experience, not the buyer's dashboard.
- Proof points: 12-minute median supplier completion time *(pilot data)*; supplier opt-out rate under 4% vs the ~20% non-response typical of spreadsheet campaigns *(assumed — confirm; industry comparison point needs a citable source)*
- Example copy: *"We made the form your suppliers see as carefully as the dashboard you see — that's why they answer."*

---

### 3. Feature & Functionality List

| Feature / Functionality | Buyer Benefit (what it means for the user) |
|---|---|
| Automated request, reminder, and escalation sequences per supplier | Eliminates the quarterly chase — the median response arrives in 11 days without anyone on your team sending an email |
| Supplier-facing guided data form (6 languages, sector defaults) | Raises response rates and data quality by making the supplier's job a 12-minute task instead of a blank spreadsheet |
| Inline validation against sector emission-factor ranges | Catches unit errors and outliers at entry, before they contaminate your consolidated figures |
| Automatic mapping of responses to ESRS E1 datapoints | Removes the manual translation step between "what suppliers sent" and "what the regulation asks for" |
| Full lineage trail on every datapoint (source, method, timestamp) | Turns assurance prep into an export — auditors trace any figure to its origin in two clicks |
| Estimation engine for non-responding suppliers (spend-based fallback) | Keeps your report complete and defensibly labelled even when suppliers don't answer, with estimated values flagged as such |
| Per-legal-entity workspace with consolidated roll-up | Enables group-level reporting without each subsidiary running its own collection campaign |
| Supplier response-status dashboard with escalation flags | Shows procurement exactly which supplier relationships need a human nudge — and only those |
| Reuses existing Carbonhive supplier records and emission factors | Deploys in ~3 weeks because the module builds on data you've already loaded, not a fresh implementation |

---

### 4. Use Cases

**Use Case 1: Sustainability Lead — the Q3 collection campaign**

- **Who:** Head of Sustainability / ESG reporting lead
- **Situation:** CSRD filing requires Scope 3 supplier data from ~400 suppliers; the collection window opens in September
- **Before:** Built a spreadsheet template, mail-merged 400 requests, spent ~3 days/week for a quarter chasing non-responders, and hand-normalised units in the 60% of replies that came back inconsistent
- **With Supplier Pulse:** Launches the campaign in one afternoon; the system chases, validates, and maps responses while she works only the escalation-flagged exceptions
- **Outcome:** Collection effort drops from ~150 hours/quarter to under 20; first-pass completeness rises to ~78% *(pilot figure)*

**Use Case 2: Group Financial Controller — assurance without archaeology**

- **Who:** Financial controller who owns the CSRD filing alongside the annual report
- **Situation:** The limited-assurance auditor requests evidence for supplier-derived Scope 3 figures
- **Before:** Reconstructed data provenance from email threads and spreadsheet versions — six weeks of archaeology across two teams, with real risk of a qualified opinion on undocumented figures
- **With Supplier Pulse:** Exports the lineage package per datapoint — source, method, timestamp, and any estimation flags — directly from the module
- **Outcome:** Assurance preparation compressed from six weeks to nine days *(assumed — confirm with design partner)*; zero datapoints without documented provenance

**Use Case 3: Procurement Manager — chasing without burning relationships**

- **Who:** Procurement manager who owns the supplier relationships being chased
- **Situation:** Sustainability's data campaign risks spamming strategic suppliers she's mid-negotiation with
- **Before:** No visibility into who was emailed what; a top-10 supplier once received four duplicate data requests in a month, and she found out in a QBR
- **With Supplier Pulse:** Reviews the escalation dashboard weekly; strategic suppliers get her personal nudge, the long tail gets automation, and every contact is logged
- **Outcome:** Zero duplicate requests to strategic suppliers; her nudges are reserved for the ~15 relationships where a human ask actually moves the number

---

## Why it's shaped this way

- **The positioning statement follows the Moore format exactly and names a real enemy.** "Unlike enterprise ESG suites like Verdantia, sold with six-month consulting engagements" is specific and defensible — a statement that could not be uttered by the competitor, per the Anti-Pattern "do not create a positioning statement that could apply to any competitor". The tagline clocks in at 6 words, under the 10-word Quality Check.
- **Inferred proof points are labelled, never invented silently.** The brief supplied pilot response-time data but little else, so the pack fills the gaps with plausible figures marked *(assumed — confirm)* — following the skill's "Working from a brief" rule that a concrete, labelled assumption beats a blank, and its ban on bracketed placeholders.
- **The "not for" paragraph is load-bearing, not decorative.** Sub-50-supplier companies and CSDDD-scope buyers are qualified out explicitly because the Anti-Patterns call skipping the "not for" section a positioning failure — and because the political subtext (sales not yet comped on the SKU) makes wasted sales effort doubly expensive this quarter.
- **The conference-launch tension is handled in one diplomatic scope note.** The real reason the Reset:ECO main-stage unveil died — the comp plan doesn't cover the SKU until FY27 — is stated as "timed so the commercial team is fully enabled and incentivised", which is true, respectful to the sales org, and still tells a reader exactly why the sequence is what it is.
- **Every feature row translates into buyer language and starts with an action verb** ("Eliminates…", "Raises…", "Turns…"), because the Quality Checks require no orphaned features and the Anti-Patterns forbid feature descriptions posing as benefits. The estimation-engine row even sells a *limitation* honestly (non-responses happen; here's the defensible fallback).
- **The three use cases are three different buyers with three different fears** — the sustainability lead's time, the controller's audit, procurement's relationships — per the Anti-Pattern against using the same messaging across personas. Procurement is deliberately included because they're the internal blocker most likely to veto a supplier-chasing tool.
- **Pillar 4 exists because the pilot data says the supplier's experience is the constraint** — it's the least obvious pillar and therefore the most defensible; the obvious "compliance" claim is Verdantia's home turf and is deliberately not led with.
