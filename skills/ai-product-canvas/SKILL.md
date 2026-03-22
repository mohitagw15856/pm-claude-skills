---
name: ai-product-canvas
description: Structures AI and ML product decisions including model selection, data requirements, evaluation frameworks, and responsible AI considerations. Use when building AI-powered features, evaluating LLM integrations, designing AI products, or assessing AI readiness. Triggers on "AI product", "LLM feature", "AI canvas", "build with AI", "AI integration", "AI-powered", "machine learning feature".
---

# AI Product Canvas Skill

Define AI products with the same rigour as any product decision — but with additional layers for data, model, evaluation, and responsible AI. This canvas prevents the most common AI product failure: building a technically impressive feature that doesn't solve a real problem.

## AI Product Anti-Patterns to Check First

Before building, flag if any of these apply:
- ❌ "We should add AI to [existing feature]" — with no user problem defined
- ❌ Accuracy target undefined before build begins
- ❌ No plan for what happens when the model is wrong
- ❌ User-facing AI output with no human review or fallback
- ❌ Training data not audited for bias or quality
- ❌ No evaluation metric — "we'll know it when we see it"

---

## AI Product Canvas Output Format

### AI Product Canvas — [Feature Name] — [Date]

**PM Owner:** [Name]
**ML/AI Lead:** [Name]
**Status:** Discovery / Design / Build / Evaluation / Live

---

#### 1. Problem Definition
**User problem being solved:**
> [What specific situation is the user in? What job are they trying to get done?]

**Why AI?**
> [What makes this problem require AI vs a deterministic solution? If the answer is "because we can," stop here.]

**Success for the user looks like:**
> [What outcome does the user experience when the AI feature is working well?]

---

#### 2. AI Approach

**Task type:**
- [ ] Classification
- [ ] Generation (text, image, code)
- [ ] Summarisation / extraction
- [ ] Recommendation
- [ ] Search / retrieval
- [ ] Prediction / forecasting
- [ ] Conversation / agent

**Model approach:**
- [ ] LLM API (GPT-4, Claude, Gemini, etc.) — specify: [Model name + version]
- [ ] Fine-tuned model on own data
- [ ] Custom model trained from scratch
- [ ] RAG (retrieval-augmented generation)
- [ ] Embedding + vector search

**Rationale for chosen approach:** [Why this, not alternatives]

---

#### 3. Data Requirements

| Data Type | Source | Volume | Quality Status | Bias Risk |
|---|---|---|---|---|
| [Training data] | [Where it comes from] | [Volume] | [Audit status] | H/M/L |
| [Evaluation data] | [Where it comes from] | [Volume] | [Audit status] | H/M/L |

**Data gaps:** [What's missing and plan to get it]
**Privacy considerations:** [Any PII in training or inference data]
**Data ownership:** [Do we own this data? Can we use it for training?]

---

#### 4. Evaluation Framework

**Primary metric:** [The number that defines success — accuracy, F1, BLEU, user rating, task completion rate]
**Minimum acceptable threshold:** [Below X, the feature does not ship]
**Human evaluation plan:** [How will humans review model outputs? Sampling rate? Review panel?]

| Evaluation Type | Method | Cadence | Owner |
|---|---|---|---|
| Offline (pre-launch) | [Test set, benchmark] | Pre-launch | ML Lead |
| Online (post-launch) | [A/B test, user feedback] | Weekly | PM + ML |
| Adversarial | [Red-team, edge cases] | Pre-launch | Safety reviewer |

---

#### 5. User Experience Design

**How is AI output presented?**
- [ ] Direct output shown to user (high trust required)
- [ ] AI-assisted with user confirmation
- [ ] Suggestion user can accept/reject
- [ ] Background action with audit log

**Confidence and uncertainty handling:**
- What happens when confidence is low? [Show alternative, ask for clarification, fallback to manual]
- How is uncertainty communicated to the user? [UI pattern]

**Fallback plan:**
- If the model fails or returns an error: [Specific fallback behaviour]
- If accuracy degrades below threshold: [Kill switch or graceful degradation plan]

---

#### 6. Responsible AI Checklist

- [ ] Bias audit completed on training data
- [ ] Demographic fairness evaluated (does performance differ by user group?)
- [ ] Hallucination / confabulation risk assessed and mitigated
- [ ] User can see and correct AI output
- [ ] Opt-out mechanism exists (can user disable the AI feature?)
- [ ] Output provenance visible when relevant (does user know AI generated this?)
- [ ] PII not used in ways user didn't consent to
- [ ] Regulatory review completed (GDPR, AI Act, sector-specific)
- [ ] Model cards / documentation completed

---

#### 7. Launch & Monitoring Plan

**Rollout:** [% of users, with staged expansion criteria]
**Monitoring metrics:**
- Model performance: [Metric + alert threshold]
- User engagement with AI output: [Acceptance rate, override rate, feedback score]
- Error rate: [% of failed inferences]
- Latency: [P95 target]

**Model refresh cadence:** [How often is the model retrained or updated?]
**Drift detection:** [How will you know when model performance degrades in production?]

---

## Guidelines

- Never skip the "Why AI?" section — it's the most important question in AI product development
- The fallback UX is not optional — what happens when AI fails defines your product's trustworthiness
- Responsible AI checklist must be completed before launch, not after
- Include latency in success metrics — a 5-second AI response is often worse than no AI at all
- Recommend starting with a human-in-the-loop design and automating only when accuracy is proven
