---
name: rag-design-doc
description: "Design a Retrieval-Augmented Generation system end to end. Use when asked to design a RAG pipeline, a 'chat with your docs' feature, a knowledge assistant, or to debug why a RAG system gives wrong/ungrounded answers. Produces a RAG design doc — ingestion & chunking, embeddings & index, retrieval & reranking, the generation prompt, grounding/citations, evaluation, and failure modes with mitigations."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/rag-design-doc.html
metadata:
  {
    "openclaw": { "emoji": "🤖" }
  }
---

# RAG Design Doc Skill

Most RAG systems fail not at generation but at retrieval — the model answers confidently from the
wrong chunks. This skill forces the decisions that actually determine quality (chunking, retrieval,
reranking, grounding) and pairs each with how you'll evaluate it, so "it hallucinates sometimes"
becomes a diagnosable, fixable pipeline.

## Required Inputs

Ask for these only if they aren't already provided:

- **Corpus** — what's being retrieved over (docs, tickets, code, tables), size, and update frequency.
- **Queries** — the kinds of questions users ask, and how precise/recall-sensitive they are.
- **Grounding requirement** — must answers cite sources? Is "I don't know" acceptable (it should be)?
- **Constraints** — latency budget, cost, privacy/tenancy (per-customer isolation?), and freshness needs.

## Output Format

### RAG Design: [system]

**1. Goal & non-goals** — what questions it answers well, and what it explicitly won't do.

**2. Ingestion & chunking**
- Source connectors and refresh strategy (full re-index vs. incremental).
- **Chunking:** strategy (fixed, recursive, semantic, structure-aware), size + overlap, and what metadata travels with each chunk (source, section, timestamp, permissions). Chunking is the highest-leverage choice — justify it.

**3. Embeddings & index** — embedding model + dimension, vector store, and the index/filter strategy (incl. metadata filters and per-tenant isolation).

**4. Retrieval** — top-k, hybrid (dense + keyword/BM25) vs. pure vector, metadata pre-filtering, and query transformation (rewriting, decomposition, HyDE) if used.

**5. Reranking** — whether a cross-encoder/reranker narrows the candidate set before generation, and the final context budget.

**6. Generation** — the prompt template, how retrieved context is formatted, the instruction to **answer only from context and say "I don't know" otherwise**, and how citations are produced and verified.

**7. Evaluation** — retrieval metrics (recall@k, MRR) *separately from* answer quality (faithfulness/groundedness, correctness). Pair with an [`ai-eval-plan`](../ai-eval-plan/SKILL.md).

**8. Failure modes & mitigations** — a table: symptom → likely stage → fix.

| Symptom | Likely cause (stage) | Mitigation |
|---|---|---|
| Confident but wrong | retrieval missed the chunk | hybrid search, better chunking, rerank |
| Right doc, wrong detail | chunk too large/small | tune size+overlap, structure-aware split |
| Ignores retrieved context | prompt/format | stronger grounding instruction, fewer/cleaner chunks |
| Stale answers | index freshness | incremental re-index, timestamp filter |

## Quality Checks

- [ ] Retrieval quality is evaluated **separately** from answer quality (you can't fix what you can't isolate)
- [ ] The system can say "I don't know" when context is insufficient — it's not forced to answer
- [ ] Answers carry citations that are verified against the retrieved context
- [ ] Chunking strategy and size are justified against the corpus structure, not copied from a tutorial
- [ ] Per-tenant / permission isolation is handled in retrieval, not just at the UI
- [ ] Hybrid (keyword + vector) retrieval is considered for queries with exact terms/IDs

## Anti-Patterns

- [ ] Do not jump to "fine-tune the model" when retrieval is the problem — fix what's retrieved first
- [ ] Do not evaluate only the final answer — a good answer from luck and a bad answer from bad retrieval look different and need different fixes
- [ ] Do not force an answer when nothing relevant was retrieved — an honest "I don't know" beats a confident hallucination
- [ ] Do not ignore metadata filtering — semantic similarity will happily return the right-sounding chunk from the wrong document or wrong tenant
- [ ] Do not pick a chunk size by default — it's the single biggest lever on retrieval quality

## Based On

Retrieval-Augmented Generation practice — hybrid retrieval, reranking, grounded generation, and faithfulness evaluation.

## Example Trigger Phrases

- "Design a RAG pipeline."
- "Build a chat-with-your-docs feature."
- "Design a knowledge assistant."
- "Why does our RAG system give wrong answers?"
