# Tech Radar

Produce a complete technology radar document for an engineering team. The radar gives the team a shared, explicit position on every significant technology in their stack — what to standardize on, what to experiment with, what to evaluate, and what to actively stop using. Follow the ThoughtWorks Tech Radar format: four quadrants (Techniques, Tools, Platforms, Languages & Frameworks) each with four rings (Adopt, Trial, Assess, Hold). Each technology entry ("blip") gets a ring assignment, a one-paragraph rationale, and a date. Include a decision trail showing what moved and why, and a maintenance process the team can run to keep the radar current.

## Required Inputs

Ask for these if not already provided:
- **Team or company name** — for the document header
- **Current tech stack** — list every significant technology, tool, language, and platform the team currently uses
- **Technologies under active evaluation** — tools or frameworks the team is currently trying or considering
- **Technologies to deprecate or move off** — anything the team wants to stop using or is actively migrating away from
- **Strategic technology bets** — any technologies the company has made a deliberate bet on (e.g., "we're all-in on Kubernetes" or "migrating to event-driven architecture")
- **Team context** — team size, product domain, and any constraints (regulatory, compliance, vendor lock-in concerns)

If a technology is mentioned without a ring placement, use the rationale inputs to determine the appropriate ring. When uncertain between two rings, ask.

## Output Format

---

# Technology Radar: [Team / Company Name]

**Edition:** [Month Year]
**Maintained by:** [Team Name / Architecture Guild / CTO Office]
**Review cadence:** Bi-annual (every 6 months)
**Next review:** [Month Year + 6 months]

---

## How to Read This Radar

This radar reflects [Team / Company Name]'s current thinking on technologies we use, evaluate, and retire. Use it to make consistent technology choices, onboard new engineers, and have structured conversations about the stack.

**Quadrants** categorize the type of technology:

| Quadrant | What belongs here |
|----------|------------------|
| **Techniques** | Methods, patterns, and practices (e.g., trunk-based development, event sourcing) |
| **Tools** | Software tools used in the development and delivery process (e.g., linters, CI systems, observability platforms) |
| **Platforms** | Infrastructure and hosting environments (e.g., AWS, Kubernetes, Snowflake) |
| **Languages & Frameworks** | Programming languages and application frameworks (e.g., Go, React, FastAPI) |

**Rings** express our recommendation:

| Ring | Meaning | What to do |
|------|---------|-----------|
| **Adopt** | Industry-proven, working well for us — our standard choice | Use by default for new work; no special justification needed |
| **Trial** | Worth pursuing — we are experimenting with it in limited production use | Use in a bounded context with architectural oversight; share learnings |
| **Assess** | Worth exploring — we have not used it in production yet | Spike, prototype, or research; do not use in production without a review |
| **Hold** | Do not start new work with this technology | Complete existing commitments; do not expand use; plan migration |

---

## Quadrant 1: Techniques

### Adopt

| Technology | Since | Notes |
|------------|-------|-------|
| [Technique name, e.g., Trunk-based development] | [Month Year] | [One sentence: why we adopted it and what it replaced] |
| [Technique name] | [Month Year] | [One sentence rationale] |
| [Technique name] | [Month Year] | [One sentence rationale] |

**[Technique name] — Adopt**
[One paragraph rationale. Explain what problem this technique solves, why it works well in your context, and what the team should know before applying it. Reference any internal experience — e.g., "We rolled this out across 8 services in 2024 and saw a 40% reduction in merge conflicts."]

[Repeat for each Adopt-ring technique.]

### Trial

| Technology | Since | Notes |
|------------|-------|-------|
| [Technique name] | [Month Year] | [One sentence: what we're testing and where] |

**[Technique name] — Trial**
[One paragraph. What are we trialing? In which teams or services? What hypothesis are we testing? What would cause us to move it to Adopt vs. Hold?]

### Assess

| Technology | Since | Notes |
|------------|-------|-------|
| [Technique name] | [Month Year] | [One sentence: why we're interested] |

**[Technique name] — Assess**
[One paragraph. Why is this interesting to us? What would we need to see to move it to Trial? Who is responsible for the assessment?]

### Hold

| Technology | Since | Notes |
|------------|-------|-------|
| [Technique name] | [Month Year] | [One sentence: why we're stopping and what replaces it] |

**[Technique name] — Hold**
[One paragraph. Why are we putting this on hold? What is the migration path? What is the target end-state for teams still using it?]

---

## Quadrant 2: Tools

### Adopt

| Technology | Since | Notes |
|------------|-------|-------|
| [Tool name, e.g., GitHub Actions] | [Month Year] | [One sentence rationale] |
| [Tool name] | [Month Year] | [One sentence rationale] |

**[Tool name] — Adopt**
[One paragraph rationale. Why is this our standard tool? What does it do well in our context? Any configuration or usage patterns the team should follow?]

[Repeat for each Adopt-ring tool.]

### Trial

| Technology | Since | Notes |
|------------|-------|-------|
| [Tool name] | [Month Year] | [One sentence: what we're testing] |

**[Tool name] — Trial**
[One paragraph rationale and trial scope.]

### Assess

| Technology | Since | Notes |
|------------|-------|-------|
| [Tool name] | [Month Year] | [One sentence: why we're evaluating it] |

**[Tool name] — Assess**
[One paragraph: what sparked interest, who is evaluating, and timeline.]

### Hold

| Technology | Since | Notes |
|------------|-------|-------|
| [Tool name] | [Month Year] | [One sentence: what replaces it] |

**[Tool name] — Hold**
[One paragraph: deprecation rationale and migration path.]

---

## Quadrant 3: Platforms

### Adopt

| Technology | Since | Notes |
|------------|-------|-------|
| [Platform name, e.g., AWS EKS] | [Month Year] | [One sentence rationale] |
| [Platform name] | [Month Year] | [One sentence rationale] |

**[Platform name] — Adopt**
[One paragraph. What does this platform provide? What are the boundaries of its use? Any internal golden-path setup the team should follow?]

[Repeat for each Adopt-ring platform.]

### Trial

| Technology | Since | Notes |
|------------|-------|-------|
| [Platform name] | [Month Year] | [One sentence: scope of trial] |

**[Platform name] — Trial**
[One paragraph rationale and trial boundaries.]

### Assess

| Technology | Since | Notes |
|------------|-------|-------|
| [Platform name] | [Month Year] | [One sentence: why we're exploring it] |

**[Platform name] — Assess**
[One paragraph assessment plan.]

### Hold

| Technology | Since | Notes |
|------------|-------|-------|
| [Platform name] | [Month Year] | [One sentence: migration target and timeline] |

**[Platform name] — Hold**
[One paragraph: what triggered the hold decision, migration target, and timeline.]

---

## Quadrant 4: Languages & Frameworks

### Adopt

| Technology | Since | Notes |
|------------|-------|-------|
| [Language/Framework, e.g., Go] | [Month Year] | [One sentence rationale] |
| [Language/Framework] | [Month Year] | [One sentence rationale] |

**[Language/Framework] — Adopt**
[One paragraph. What is this language or framework used for? What are the team's proficiency expectations? Any frameworks or libraries that go alongside it as part of the standard choice?]

[Repeat for each Adopt-ring language or framework.]

### Trial

| Technology | Since | Notes |
|------------|-------|-------|
| [Language/Framework] | [Month Year] | [One sentence: bounded use case] |

**[Language/Framework] — Trial**
[One paragraph rationale.]

### Assess

| Technology | Since | Notes |
|------------|-------|-------|
| [Language/Framework] | [Month Year] | [One sentence: interest driver] |

**[Language/Framework] — Assess**
[One paragraph assessment plan.]

### Hold

| Technology | Since | Notes |
|------------|-------|-------|
| [Language/Framework] | [Month Year] | [One sentence: reason and migration path] |

**[Language/Framework] — Hold**
[One paragraph: deprecation rationale, existing system obligations, and timeline to retire.]

---

## Decision Trail

This log records every ring movement since the radar's first edition. Use it to understand the evolution of our technology choices.

| Technology | Quadrant | Previous Ring | New Ring | Edition | Reason |
|------------|----------|--------------|----------|---------|--------|
| [Name] | [Quadrant] | — | Adopt | [Month Year] | First placement — [one sentence why] |
| [Name] | [Quadrant] | Assess | Trial | [Month Year] | [What prompted the move — evidence, team feedback, production trial results] |
| [Name] | [Quadrant] | Trial | Adopt | [Month Year] | [Adoption rationale — usage results, team satisfaction, scale proven] |
| [Name] | [Quadrant] | Adopt | Hold | [Month Year] | [Why moved to Hold — better alternative, security concern, cost, vendor issue] |
| [Name] | [Quadrant] | — | Hold | [Month Year] | First placement — added directly to Hold because [reason] |

---

## Radar Maintenance Process

### Who Contributes

- **Architecture review group / CTO office** — final ring placement decisions
- **All engineers** — submit blip nominations via [channel or form]
- **Tech leads** — triage nominations and prepare proposals for review sessions

### Update Cadence

| Activity | Frequency | Owner |
|----------|-----------|-------|
| New blip nominations accepted | Ongoing — any engineer via [channel] | Anyone |
| Nomination triage | Monthly | Tech leads |
| Full radar review session | Every 6 months | Architecture group |
| Published radar update | Every 6 months | [Owner name or role] |

### How to Nominate a Blip

1. Submit to [Slack channel / form URL] with: technology name, quadrant, proposed ring, and one-paragraph rationale.
2. A tech lead reviews within 2 weeks and either schedules it for the next review session or requests more information.
3. At the review session, the architecture group discusses and votes. Simple majority wins; ties go to Hold pending further evidence.
4. Approved blips are added to the radar doc and the decision trail within 1 week of the session.

### Ring Change Criteria

| To move TO Adopt | To move TO Trial | To move TO Assess | To move TO Hold |
|-----------------|-----------------|-------------------|-----------------|
| Proven in multiple production systems; team broadly trained; clear operational runbook exists | At least one production use case running; architectural oversight in place; learnings documented | Concrete use case identified; spike completed or in progress; interest from at least 2 engineers | Better alternative exists; known security/compliance risk; strategic direction change; unacceptable maintenance burden |

---

*Questions about this radar: [Slack channel] | Submit a nomination: [URL or channel]*

---

## Quality Checks

- [ ] Every blip has a written rationale paragraph — not just a table row entry
- [ ] The decision trail is populated with at least the initial placement date for every blip
- [ ] Hold-ring entries include a concrete migration path or target technology, not just "stop using it"
- [ ] Ring definitions are present and include both what each ring means AND what engineers should do in response
- [ ] Maintenance process includes: nomination channel, review cadence, who decides, and ring-change criteria
- [ ] Technologies identified as "strategic bets" in the inputs are placed in Adopt (if proven) or Trial (if being rolled out)
- [ ] Technologies identified for deprecation are in Hold with a rationale that references the replacement

## Anti-Patterns

- [ ] Do not place a technology in Adopt without evidence it is proven at the team's scale — aspirational placements mislead engineers
- [ ] Do not add a blip without a written rationale paragraph — table rows without context are unusable
- [ ] Do not create a Hold entry without specifying a concrete migration path or target technology
- [ ] Do not skip the maintenance process — a radar with no process for updates becomes stale within two quarters
- [ ] Do not omit ring definitions — engineers need to know what they should do in response to each ring, not just what the ring means
