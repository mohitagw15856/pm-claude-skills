---
trigger: model_decision
description: "Plan tests for an API endpoint or service — functional, negative, and contract. Use when asked to test an API, write API test cases, plan REST/GraphQL endpoint testing, or validate an API contract. Produces an API test plan — per-endpoint cases (status codes, schema, auth, validation, errors), boundary/negative cases, contract checks, and non-functional notes — so the API is verified beyond the happy 200."
---

# API Test Plan Skill

APIs fail in specific, testable ways: wrong status codes, schema drift, missing auth checks, sloppy validation,
unhelpful errors. This skill plans the tests that catch them — per endpoint, across the response codes and the
error paths, with contract checks so the API keeps its promises to clients. It tests the whole behaviour, not
just the happy `200`.

## Working from a brief

Given an endpoint or an API description, **produce the test plan anyway** — infer the likely parameters,
responses, auth model, and error cases, labelling assumptions. Always include auth, validation, and negative
cases. Never hand back a question instead of a plan.

## Required Inputs

Ask for these only if they aren't already provided (else infer and label):

- **The API** — REST/GraphQL, the endpoints/operations, and what they do.
- **Contract** — request/response schemas, parameters, status codes (or an OpenAPI/spec if available).
- **Auth & rules** — the auth model (token/scopes/roles), rate limits, and validation rules.
- **Dependencies & data** — downstream services, and the data/state needed to test.

## Output Format

### API Test Plan: [API / endpoint]

**Per endpoint**, a set of cases grouped by type:

| ID | Endpoint | Case | Type | Request | Expected status | Expected body / assertion |
|---|---|---|---|---|---|---|
| API-01 | POST /orders | valid create | Functional | valid payload | 201 | body matches schema, id returned |
| API-02 | POST /orders | missing field | Validation | partial payload | 400 | error names the field |
| API-03 | POST /orders | no token | Auth | valid payload, no auth | 401 | not created |
| API-04 | POST /orders | wrong role | Authz | valid payload, wrong scope | 403 | not created |
| API-05 | GET /orders/{id} | not found | Negative | unknown id | 404 | error body |

Cover deliberately: **happy path** (correct status + schema), **validation** (missing/invalid/extra fields, types, boundaries), **auth/authz** (no token, expired, wrong scope/role), **negative** (not found, conflict, bad method), **idempotency/concurrency** where relevant, and **errors** (correct codes + helpful, consistent error bodies).

**Contract checks** — responses conform to the schema; required fields, types, and status codes match the spec; backward compatibility for existing clients.

**Non-functional notes** — rate limiting, pagination, large payloads, latency expectations, and security basics (no sensitive data leakage, proper status for unauthorised).

**Setup** — test data, environment, and any mocks/stubs for dependencies.

## Quality Checks

- [ ] Each endpoint is tested beyond 200 — error codes (4xx/5xx) and their bodies are asserted
- [ ] Auth and authorization cases are included (no token, expired, wrong scope/role)
- [ ] Validation/boundary/negative cases cover missing, invalid, and extra inputs
- [ ] Responses are checked against the schema/contract, incl. backward compatibility
- [ ] Status codes match the spec and are used correctly (e.g. 401 vs. 403, 400 vs. 422)
- [ ] Non-functional aspects (rate limits, pagination, data leakage) are noted

## Anti-Patterns

- [ ] Do not test only the happy 200 — most API bugs are in validation, auth, and error paths
- [ ] Do not ignore the response schema — a 200 with the wrong body still breaks clients
- [ ] Do not skip authz (role/scope) testing — "logged in" isn't "allowed"
- [ ] Do not assert only status codes — check the body/contract too
- [ ] Do not overlook error-body quality and correct status semantics (401 vs 403, 400 vs 404)

## Based On

API testing practice — contract/schema validation, status-code correctness, auth/authz coverage, and negative/boundary testing beyond the happy path.
