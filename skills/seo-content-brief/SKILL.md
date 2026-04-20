---
name: seo-content-brief
description: "Create a structured SEO content brief for any target keyword or topic. Use when asked to write an SEO brief, content brief, keyword brief, or content strategy document. Produces a complete brief with target keyword, search intent, outline, competitor insights, internal links, and on-page SEO guidance."
---

# SEO Content Brief Skill

Produces a complete SEO content brief that writers can use to create content that ranks — combining search intent analysis, competitive insights, and on-page optimisation requirements into a single actionable document.

## Required Inputs

Ask the user for these if not provided:
- **Target keyword or topic**
- **Target audience** (who is searching for this?)
- **Website or domain** (for internal linking context)
- **Content goal** (rank for keyword / drive leads / build authority / support existing content)
- **Current ranking or page** (if improving existing content — optional)
- **Word count target or preference** (optional — if not provided, derive from search intent)

## Output Structure

---

# SEO Content Brief: [Target Keyword]

**Target keyword:** [Primary keyword]
**Secondary keywords:** [Related terms to include naturally]
**Search intent:** [Informational / Navigational / Commercial / Transactional]
**Target word count:** [Range — e.g. 1,200–1,800 words]
**Content type:** [Blog post / Landing page / Guide / Comparison / Listicle]
**Audience:** [Who will read this]
**CTA:** [What action should this page drive?]

---

## Search Intent Analysis

**What the searcher wants:** [What someone typing this keyword is actually trying to accomplish]

**What "good" looks like for this query:**
- Format: [How results typically appear — guide, list, comparison table, etc.]
- Depth: [Surface-level overview vs. comprehensive deep dive]
- Tone: [Expert / Conversational / Technical / Beginner-friendly]

**User's next question:** [What they'll search for after reading a good answer — use for internal linking]

---

## Competitor Content Analysis

| Ranking page | Word count | Key sections covered | Gaps or weaknesses |
|---|---|---|---|
| [URL or description] | [~N words] | [Sections] | [What they're missing] |

**Opportunity to differentiate:** [Specific angle, data, or depth your content can add that competitors lack]

---

## Recommended Outline

Each heading is the exact H2/H3 to use (these are what Google reads):

**[H1: Title — include primary keyword, under 60 characters]**

**Introduction** (150–200 words)
- Hook with the problem or question
- State what the reader will learn
- Include primary keyword naturally in first 100 words

**[H2: First main section]**
- [Key points to cover]
- [Include secondary keyword: X]

**[H2: Second main section]**
- [Key points]

**[H2: Third main section]**
- [Key points — consider a table or list here for featured snippet opportunity]

**[H2: FAQ section]** *(recommended for informational queries)*
- Q: [Question from "People Also Ask" for this keyword]
- Q: [Question 2]

**Conclusion** (100–150 words)
- Summarise key takeaways
- Include CTA

---

## On-Page SEO Requirements

| Element | Requirement |
|---|---|
| Title tag | [60 chars max — primary keyword near start] |
| Meta description | [155 chars max — include keyword + benefit] |
| H1 | [Match or close to title tag] |
| Keyword density | [Use primary keyword 3–5x naturally; don't force it] |
| Image alt text | [Describe image + include keyword where natural] |
| Internal links | [3–5 internal links — see suggestions below] |
| External links | [1–2 authoritative sources to cite] |

---

## Internal Linking Suggestions

| Anchor text | Link to | Why |
|---|---|---|
| [Relevant phrase] | [/page-path] | [Topic relevance] |

---

## Quality Checks

- [ ] Search intent is correctly identified (informational vs commercial)
- [ ] Outline addresses the actual user question (not just the keyword)
- [ ] Competitor gaps are specific and actionable
- [ ] FAQ section addresses real "People Also Ask" questions
- [ ] Title tag is under 60 characters and includes the keyword
- [ ] Internal linking suggestions are relevant and specific

## Example Trigger Phrases

- "Write an SEO brief for the keyword [keyword]"
- "Create a content brief for [topic]"
- "What should I include in a blog post about [keyword]?"
- "Build a content strategy brief for [topic]"
