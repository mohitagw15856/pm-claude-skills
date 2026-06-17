---
trigger: model_decision
description: "Write an API versioning strategy document for a service or API platform. Use when asked to define versioning policy, plan API deprecation, classify breaking changes, or document version lifecycle. Produces a complete versioning strategy with breaking-change classification table, deprecation timeline, migration guide template, and client communication template."
---

# API Versioning Strategy

Produce a complete API versioning strategy document that gives a service team durable, consistent rules for evolving their API without breaking consumers. This document covers the versioning scheme selection (with rationale), lifecycle policy from introduction through sunset, a precise breaking-change classification, and all the communication artifacts a team needs when deprecating a version. Engineers should be able to hand this document to a new team member or external consumer and have them understand exactly what to expect.

## Required Inputs

Ask for these if not already provided:
- **API type** — REST, GraphQL, or gRPC (each has different versioning mechanics)
- **Current versioning approach** — URL path (`/v1/`), request header, query parameter, or none; if none, document starts fresh
- **Number of existing versions and active consumer count** — needed to size the lifecycle policy and migration scope
- **Deprecation timeline constraints** — any hard deadlines (contract SLAs, compliance windows, annual release cycles)
- **Consumer type** — internal teams only, external partners, public API, or mix (affects communication channel choices)

If any input is missing, ask before producing the document. For GraphQL, note that the versioning approach differs substantially (schema evolution over versioning) and tailor the scheme section accordingly.

## Output Format

---

# API Versioning Strategy: [Service Name]

**Owner:** [Team Name]
**API Type:** [REST / GraphQL / gRPC]
**Document Version:** 1.0
**Last Reviewed:** [Date]
**Next Review:** [Date + 6 months]

---

## 1. Versioning Scheme

### Selected Approach: [URL Path / Request Header / Query Parameter]

| Scheme | Example | Pros | Cons | Verdict |
|--------|---------|------|------|---------|
| URL Path | `/v2/orders` | Visible in logs and bookmarks; trivial to route | Violates strict REST resource identity; clutters URL space | **Recommended for public-facing REST APIs** |
| `Accept` Header | `Accept: application/vnd.[service].v2+json` | Keeps URLs clean; proper content negotiation | Harder to test in browser; less visible in logs | Recommended for internal APIs with controlled clients |
| Query Parameter | `/orders?version=2` | Easy to retrofit without URL restructuring | Often missed in client code; cache-key complications | Acceptable only for read-heavy APIs already in production |
| GraphQL Schema Evolution | Field deprecation + `@deprecated` directive | No versioning needed for additive changes | Requires disciplined schema design | **Recommended for GraphQL APIs** |

**Rationale for [chosen scheme]:** [One paragraph explaining why this scheme fits the API type, consumer type, and operational context provided. Reference the specific inputs — e.g., "Because this API has external partners who integrate via generated clients, URL path versioning provides the most predictable routing behavior and eliminates header negotiation complexity."]

### Version Format

```
[Base URL]/v{MAJOR}/{resource}

Examples:
  https://api.[company].com/v1/orders
  https://api.[company].com/v2/orders/{id}/items

Version identifier: integer only (v1, v2, v3)
No minor versions in the URL — minor/patch changes are non-breaking and deployed continuously.
```

---

## 2. Version Lifecycle Policy

### Lifecycle Stages

```
  STABLE ──────────────────────────────────────────────────►
      │
      ├─ STABLE        Active development, full SLA, new consumers allowed
      │
      ├─ DEPRECATED    Announced, timeline posted, migration docs live.
      │                New consumers blocked. Existing consumers receive warnings.
      │
      ├─ SUNSET        Requests return HTTP 410 Gone + migration pointer.
      │                30-day window before routing is removed.
      │
      └─ RETIRED       Routing removed, docs archived, no traffic accepted.
```

| Stage | Duration | SLA Applies | New Consumers Allowed | Required Action |
|-------|----------|-------------|----------------------|-----------------|
| Stable | Until superseded | Yes — full | Yes | None |
| Deprecated | [12 months / adjust per constraint] | Yes — degraded acceptable | No | Migrate before sunset date |
| Sunset | 30-day window | Best-effort only | No | Migrate immediately |
| Retired | Permanent | None | No | — |

**Minimum Stable Period:** A version must remain Stable for at least [6 / 12] months before deprecation can be announced.

**Maximum Simultaneous Versions:** No more than [2] versions in Stable or Deprecated status at any time. Releasing v3 requires committing to a sunset date for v1 in the same announcement.

---

## 3. Breaking vs. Non-Breaking Change Classification

Apply this table before every API change. If a change is marked Breaking, it requires a new major version. When uncertain, default to Breaking.

| Change Type | Specific Example | Classification | Rationale |
|-------------|-----------------|----------------|-----------|
| Remove a response field | Delete `order.legacy_id` from response | **Breaking** | Clients reading this field will null-pointer or fail |
| Rename a field | `user_name` → `username` | **Breaking** | Clients referencing old name receive null |
| Change field type | `"amount": "10.00"` → `"amount": 10.00` | **Breaking** | Type mismatch at deserialization |
| Make optional field required | `email` required in POST body | **Breaking** | Existing callers omitting it receive 400 |
| Remove an endpoint | `DELETE /v1/widgets/{id}` removed | **Breaking** | Existing callers receive 404 |
| Change HTTP method | `GET /search` → `POST /search` | **Breaking** | Bookmarked or cached GET calls fail |
| Change authentication scheme | API key → OAuth2 | **Breaking** | All clients must re-authenticate |
| Restructure error response shape | Error JSON schema changed | **Breaking** | Error-handling code misparses responses |
| Expand enum values (response) | New `status: "on_hold"` value returned | **Breaking** | Switch statements with no default fall through |
| Change pagination defaults | `page_size` default 20 → 50 | **Breaking** | Response length changes unexpectedly |
| Tighten input validation | Max length 100 → 50 | **Breaking** | Previously valid inputs now rejected |
| Add new optional field to response | Add `order.tax_breakdown` | Non-Breaking | Clients ignore unknown fields per spec |
| Add new optional request parameter | Add `?include_archived=true` | Non-Breaking | Ignored by existing clients |
| Add a new endpoint | `GET /v1/orders/{id}/audit` | Non-Breaking | No existing client references it |
| Relax input validation | Min length 10 → 5 | Non-Breaking | Existing valid inputs remain valid |
| Performance or latency improvement | Response time reduced | Non-Breaking | — |
| Add new enum value (request-only) | Accept new `type: "express"` | Non-Breaking | Existing values still accepted |

---

## 4. Deprecation Process

### Step-by-Step Deprecation Checklist

- [ ] **T-0 (Decision day):** Engineering lead approves deprecation. New version confirmed Stable. Sunset date set.
- [ ] **T-0:** Update API docs — add deprecation banner to all v[N] endpoint pages.
- [ ] **T-0:** Add `Deprecation` and `Sunset` response headers to all v[N] responses (see format below).
- [ ] **T-0:** Block new consumer onboarding for v[N] in API gateway and developer portal.
- [ ] **T-0:** Send initial deprecation notice to all registered consumers (see Section 5 template).
- [ ] **T-0:** Open tracking issue in engineering backlog linking all known consumers to their migration status.
- [ ] **T minus 30 days:** Send 30-day warning to all consumers still sending v[N] traffic.
- [ ] **T minus 7 days:** Send final warning. If consumer traffic > 100 req/day, escalate directly to their engineering lead.
- [ ] **Sunset date:** Switch v[N] routing to return `HTTP 410 Gone` with body pointing to migration guide.
- [ ] **T plus 30 days:** Remove routing rules. Archive documentation. Close tracking issue.

### Deprecation Response Headers

```http
HTTP/1.1 200 OK
Deprecation: true
Sunset: Sat, 01 Jan 2027 00:00:00 GMT
Link: <https://docs.[company].com/api/migration/v1-to-v2>; rel="successor-version"
```

### Sunset Response Body

```http
HTTP/1.1 410 Gone
Content-Type: application/json

{
  "error": "api_version_sunset",
  "message": "API v1 was sunset on 2027-01-01. Please migrate to v2.",
  "migration_guide": "https://docs.[company].com/api/migration/v1-to-v2",
  "support": "api-support@[company].com"
}
```

---

## 5. Client Communication Templates

### Initial Deprecation Notice

```
Subject: [Action Required] [Service Name] API v[N] Deprecation — Sunset [Date]

Hi [Team / Partner Name],

We are deprecating [Service Name] API v[N], effective [Sunset Date].

What this means for you:
- v[N] continues to work normally until [Sunset Date]
- After [Sunset Date], all v[N] requests return HTTP 410 Gone
- v[N+1] is available today and fully stable

Your current usage: approximately [X] requests/day as of [Date].
Estimated migration effort: [Small: < 1 day | Medium: 1–3 days | Large: 3–10 days]

Migration resources:
  Migration guide:  [URL]
  Changelog:        [URL]
  Office hours:     [Date/Time/Link]
  Support:          [Slack channel or email]

Key dates:
  [Date]          Deprecation announced (today)
  [Date]          New consumer onboarding blocked for v[N]
  [Date]          30-day warning sent to remaining consumers
  [Sunset Date]   v[N] returns 410 Gone

Reply to this message or contact us at [channel] with questions.

[Your Name], [Team Name]
```

### 30-Day Warning

```
Subject: [30 Days Remaining] [Service Name] API v[N] sunsets [Date]

Hi [Team / Partner Name],

[Service Name] API v[N] sunsets in 30 days on [Date].

Your current v[N] traffic: [X] requests/day — migration is not yet complete.

If you have a technical blocker requiring an extension, contact us before
[Date minus 14 days]. Extensions require a documented blocker and a committed
migration completion date.

Migration guide: [URL] | Support: [channel]
```

---

## 6. Migration Guide Template

Publish one migration guide per version transition at `docs.[company].com/api/migration/v[N]-to-v[N+1]`.

```markdown
# Migration Guide: v[N] → v[N+1]

**Estimated effort:** [Small: < 1 day | Medium: 1–3 days | Large: 3–10 days]
**Breaking changes in this guide:** [count]

## Quick Start

Update your base URL:
  Before: https://api.[company].com/v[N]/
  After:  https://api.[company].com/v[N+1]/

## Breaking Changes

### 1. [Field Rename: user_name → username]

**Affected endpoints:** `GET /users/{id}`, `POST /users`

Before (v[N]):
{ "user_name": "alice" }

After (v[N+1]):
{ "username": "alice" }

Migration: Replace all references to `user_name` with `username` in request
builders and response parsers.

### 2. [Next breaking change — repeat structure]

## New Capabilities in v[N+1]

| Feature | Description | Docs |
|---------|-------------|------|
| [Feature name] | [Brief description] | [Link] |

## SDK Upgrade Reference

| Language | Package | v[N+1] Version | Install Command |
|----------|---------|----------------|-----------------|
| Python | `[company]-sdk` | `2.0.0` | `pip install [company]-sdk==2.0.0` |
| Node.js | `@[company]/sdk` | `2.0.0` | `npm install @[company]/sdk@2.0.0` |
| Go | `github.com/[company]/sdk-go` | `v2.0.0` | `go get github.com/[company]/sdk-go/v2` |
| Java | `com.[company]:sdk` | `2.0.0` | Update pom.xml / build.gradle |

## Migration Validation Checklist

- [ ] Base URL updated to v[N+1]
- [ ] All renamed fields updated in request serializers
- [ ] All renamed fields updated in response deserializers
- [ ] Error-handling code updated for new error shape
- [ ] Integration tests passing against v[N+1] in staging
- [ ] Load test completed against v[N+1] — latency within acceptable range
- [ ] Rollback plan documented if issues arise post-cutover
```

---

## 7. Version-Specific Documentation

- Maintain separate documentation pages for each Stable and Deprecated version.
- Deprecated version docs carry a persistent banner: "This version is deprecated. Sunset date: [Date]. [Migrate to v[N+1]]."
- OpenAPI specs, Protobuf definitions, or GraphQL schemas are tagged and archived per version in the repository under `/api/v[N]/`.
- A root-level CHANGELOG.md records every breaking and non-breaking change by version — not buried in commit history.

---

## 8. SDK Versioning Alignment

| API Version | SDK Major Version | SDK GA Date | SDK EOL Date |
|-------------|------------------|-------------|--------------|
| v[1] | 1.x | [Date] | [API Sunset + 90 days] |
| v[2] | 2.x | [Date] | Active |

- SDK major versions align 1:1 with API major versions.
- SDK minor versions track non-breaking API additions.
- SDK EOL dates trail API sunset dates by 90 days to give consumers extra runway.
- SDKs emit a runtime deprecation warning log line when the underlying API version is Deprecated.

---

*Strategy authored by [Team Name] — questions to [Slack channel or email]*

---

## Anti-Patterns

- [ ] Do not classify expanding an enum (new response values) as non-breaking — clients with exhaustive switch statements will break when they receive an unexpected enum value
- [ ] Do not set a sunset date without confirming it is achievable for the largest consumer — a sunset that forces consumers to miss a legal deadline will be ignored or escalated
- [ ] Do not maintain more than two simultaneous stable/deprecated versions — each additional supported version multiplies maintenance burden and consumer confusion
- [ ] Do not use "monitor traffic" as the sole mechanism for knowing when all consumers have migrated — track named consumers against migration completion explicitly
- [ ] Do not skip the migration guide — consumers will delay migration indefinitely without a step-by-step guide that estimates effort

## Quality Checks

- [ ] Versioning scheme recommendation includes explicit rationale tied to the API type and consumer type provided — not a generic recommendation
- [ ] Breaking-change table covers at minimum: field removal, field rename, type change, making optional field required, endpoint removal, enum expansion, and default value change
- [ ] Deprecation timeline durations are filled in with concrete values, not left as abstract placeholders
- [ ] All three communication artifacts are present: initial deprecation notice, 30-day warning, and migration guide template
- [ ] Sunset response headers (`Deprecation`, `Sunset`, `Link`) use correct RFC date format and real URL structure
- [ ] SDK versioning alignment table is present and ties SDK major versions explicitly to API major versions
- [ ] Maximum simultaneous supported versions is stated with a concrete number
