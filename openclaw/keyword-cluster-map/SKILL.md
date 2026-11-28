---
name: keyword-cluster-map
description: "Group a keyword list into topic clusters by search intent, assign one page to each cluster, and show where existing pages compete with each other. Use when asked to cluster these keywords, build a topic map, plan content from this keyword export, which page should target this term, or find keyword cannibalisation. Produces a cluster table with intent and a target page for each, a list of pages competing for the same cluster, content gaps, and a suggested internal linking plan."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/keyword-cluster-map.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Keyword Cluster Map Skill

A keyword list is not a content plan. Hundreds of phrases usually reduce to a few dozen things people actually want, and search engines tend to rank one page per want. Writing a page per keyword produces pages that compete with each other; ignoring intent produces a guide where a searcher wanted a price. This skill groups phrases by what the searcher is trying to do and gives each group exactly one home. To brief the page once it has a home, use `seo-content-brief`; to produce many templated pages, use `programmatic-seo`.

## What This Skill Produces

- **A cluster table**: the phrases in each cluster, the shared intent, and the one page that should serve it
- **A competition list**: clusters where two or more existing pages target the same want
- **Content gaps**: clusters with no page
- **A linking plan**: which pages should link to which, hub to spoke
- **A build order** based on the data supplied

## Required Inputs

Ask for these if not provided:
- **The keyword list**, ideally an export with volume and difficulty columns
- **Existing pages**: addresses and their main topic, or a sitemap
- **The business**: what is sold and to whom, so commercial intent can be judged
- **Market and language**, since intent differs by country

Use only the volumes and difficulty scores in the user's export. If none are supplied, cluster by meaning and intent alone and say the build order is not ranked by demand. Never estimate a search volume.

## Framework: One Want, One Page

1. **Clean the list.** Merge plurals, word order variants and obvious misspellings. Drop phrases that have nothing to do with the business.
2. **Label intent.** For each phrase: learn (how, what, why), compare (best, versus, alternatives, reviews), buy or act (price, buy, near me, sign up), or go to a known site (a brand or product name).
3. **Cluster by the want, not the words.** Two phrases belong together when one page would fully satisfy both searchers. "How to remove a wine stain" and "get red wine out of carpet" are one cluster; "wine stain remover price" is another.
4. **Test with the results page where possible.** If the user can share what ranks for two phrases and the results overlap heavily, they are one cluster. If the user cannot, mark the grouping as judged by meaning.
5. **Assign one page.** Existing page if one fits, otherwise a new page. Name the page type that matches the intent: guide, comparison, product or category page, tool.
6. **Find the competition.** Where two existing pages serve one cluster, pick the stronger, and plan to merge, redirect or re-aim the other.
7. **Link the clusters.** A broad page links down to its specific pages and each specific page links back up and across to close neighbours.
8. **Order the build.** With data: demand weighed against difficulty and commercial value. Without data: closest to purchase first.

## Output Format

# Keyword Cluster Map: [site or topic]

**From:** [N phrases] into [N clusters] · **Volumes from:** [the user's export, or none supplied]

## Clusters
| # | Cluster (the want) | Intent | Phrases | Total volume (supplied) | Target page | Page type | Status |
|---|--------------------|--------|---------|-------------------------|-------------|-----------|--------|

## Pages Competing With Each Other
| Cluster | Pages | Keep | Do with the other |
|---------|-------|------|-------------------|

## Gaps
[Clusters with no page, in suggested build order]

## Linking Plan
[Hub page → its specific pages; cross-links between neighbours]

## Assumptions
[Groupings judged by meaning without results data; phrases dropped and why]

## Quality Checks

- [ ] Every cluster has exactly one target page
- [ ] Each cluster carries one intent; mixed-intent groups were split
- [ ] Volumes shown are from the supplied export, or the column is marked not supplied
- [ ] Existing pages that compete are named, with a decision for each
- [ ] The page type matches the intent
- [ ] Dropped phrases are listed

## Anti-Patterns

- [ ] Do not create one page per keyword
- [ ] Do not group by shared words when the intent differs
- [ ] Do not invent search volumes or difficulty scores
- [ ] Do not leave two pages aimed at the same cluster
- [ ] Do not plan a guide for a phrase where the searcher wants to buy

## Example Trigger Phrases

- "Cluster these keywords into topics."
- "Which page should target this term?"
- "Find keyword cannibalisation on my site."
- "Turn this keyword export into a content plan."

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/keyword-cluster-map.html

<!-- pm-claude-skills v84.1.0 | skill: keyword-cluster-map | source: skills/keyword-cluster-map/SKILL.md | sha256: b97e644170fe2537178e46e49d9a27ab9e48944d4ea25dc7026203a7de7e4248 | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
