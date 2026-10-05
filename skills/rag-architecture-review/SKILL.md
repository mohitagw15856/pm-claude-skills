---
name: rag-architecture-review
description: "Review an existing Retrieval-Augmented Generation system and find why it underperforms. Use when asked to review or audit a RAG pipeline, diagnose wrong/ungrounded answers from a 'chat with your docs' feature, or improve an already-built knowledge assistant. Produces a staged review — ingestion, chunking, retrieval, reranking, generation, evaluation — with prioritised findings, root causes, and concrete fixes."
---

# RAG Architecture Review Skill

A RAG system that "hallucinates sometimes" is almost never one bug — it's a chain where the weakest stage caps
quality, and the symptom (a wrong answer) is far from the cause (a chunk that was never retrieved). This skill
reviews an existing pipeline stage by stage, isolates where quality leaks, and ranks fixes by impact so you
work the biggest lever first. (Designing a new system from scratch? Use [`rag-design-doc`](../rag-design-doc/SKILL.md).)

## Working from a brief

Given a partial description ("it uses pgvector and sometimes makes things up"), **deliver the full staged
review anyway** — infer the likely setup for each unstated stage, label the inference, and flag what to confirm.
Never withhold the review for missing detail; a labelled assumption plus "confirm this" beats a blank.

## Required Inputs

Ask for these only if they aren't already provided (else infer and label):

- **The current architecture** — ingestion, chunking, embedding model, vector store, retrieval (top-k, hybrid?), reranking, and the generation prompt.
- **The symptoms** — examples of bad answers (wrong, ungrounded, stale, refuses) with the expected answer.
- **The corpus** — what's retrieved over, its size, structure, and update frequency.
- **Constraints** — latency, cost, and per-tenant/permission isolation needs.

## Output Format

### RAG Review: [system]

**1. Summary** — the headline: where quality is leaking and the top 3 fixes, in priority order.

**2. Stage-by-stage findings** — for each stage, what's working, what's not, and why:

| Stage | Finding | Severity | Root cause | Fix |
|---|---|---|---|---|
| Chunking | 1500-tok fixed chunks split tables mid-row | High | structure-blind splitting | structure-aware chunking + metadata |
| Retrieval | pure vector, no keyword | High | exact IDs/terms missed | add hybrid (BM25 + dense) |
| Generation | weak grounding instruction | Med | model answers from prior | "answer only from context; else say unknown" |

**3. Diagnosis: symptom → stage** — map each reported bad answer to the stage that caused it, so fixes target
the real cause (a confident-but-wrong answer is usually retrieval, not the LLM).

**4. Prioritised fix plan** — ordered by impact-to-effort, with the one change likely to move quality most first.

**5. Evaluation gap** — whether retrieval quality (recall@k, MRR) is measured **separately** from answer quality
(faithfulness, correctness); if not, that's finding #1 — you can't fix what you can't isolate. Pair with an
[`ai-eval-plan`](../ai-eval-plan/SKILL.md).

## Quality Checks

- [ ] Every reported symptom is traced to a specific stage, not blamed on "the model"
- [ ] Retrieval quality and answer quality are evaluated separately (or that gap is finding #1)
- [ ] Findings are severity-ranked and the fix plan is ordered by impact, not by stage order
- [ ] Hybrid retrieval and reranking are assessed for queries with exact terms/IDs
- [ ] Grounding instruction and "I don't know" behaviour are checked in the generation stage
- [ ] Per-tenant / permission isolation is verified in retrieval, not just the UI

## Anti-Patterns

- [ ] Do not recommend fine-tuning the model when the failure is in retrieval — fix what's retrieved first
- [ ] Do not review only the generation prompt — most RAG quality is won or lost before the LLM sees anything
- [ ] Do not present findings without severity and priority — a flat list doesn't tell the team what to do Monday
- [ ] Do not assume the corpus is fine — stale or badly-structured source data caps every downstream stage
- [ ] Do not skip the eval gap — without separated metrics, every fix is a guess

## Based On

Retrieval-Augmented Generation practice — staged diagnosis, separated retrieval/answer evaluation, hybrid retrieval, and grounded generation.

## Example Trigger Phrases

- "Audit a RAG pipeline."
- "Diagnose wrong/ungrounded answers from a 'chat with your docs' feature."
- "Improve an already-built knowledge assistant."
