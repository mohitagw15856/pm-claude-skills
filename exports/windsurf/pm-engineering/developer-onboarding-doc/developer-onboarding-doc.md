---
trigger: model_decision
description: "Write a developer onboarding document for a service, codebase, or team. Use when asked to write a developer guide, service README, onboarding doc for a new engineer, codebase orientation, or getting-started guide for a technical team. Produces a structured doc covering service overview, architecture, local setup, key patterns, testing, deployment, and who to ask for what."
---

# Developer Onboarding Document Skill

Produce a complete developer onboarding document for a service or team — covering everything a new engineer needs to be productive within their first week.

A good onboarding doc is not a wiki dump. It answers the questions a new engineer actually has on day one, in the order they'll have them.

## Required Inputs

Ask for these if not already provided:
- **Service name** and what it does
- **Team** responsible for it
- **Tech stack** — language(s), framework(s), database(s), message queues, etc.
- **Key external dependencies** — upstream services, third-party APIs
- **Deployment target** — Kubernetes, ECS, Lambda, bare metal, etc.
- **Local dev setup** — how to run locally (Docker Compose, local DB, etc.)
- **Testing approach** — unit, integration, E2E; test commands
- **Deployment process** — summary of how code gets to production
- **On-call setup** — who's on-call, how alerts work
- **Contacts** — tech lead, platform team, related service owners

## Output Format

---

# Developer Onboarding: [Service Name]

**Team:** [Team name] | **Tech lead:** [Name]
**Last updated:** [Date] | **Updated by:** [Name]

> If something in this doc is wrong or out of date, fix it now — it will affect every engineer who onboards after you.

---

## What This Service Does

[3–5 sentences. What problem does this service solve? Who calls it, and who does it call? What would break if this service went down?]

**Service type:** [API / Background worker / Event consumer / Data pipeline / etc.]
**Consumers:** [List internal services or external clients that depend on this service]
**Dependencies:** [List upstream services, databases, and third-party APIs this service calls]

**Architecture diagram:** [Link or embed — even a rough ASCII diagram helps]

```
[Caller A] ──→ [This Service] ──→ [Database]
                      │
                      └──→ [Downstream Service]
```

---

## Codebase Orientation

**Repository:** [Link]
**Main branch:** `[main / master]`
**Language:** [e.g. Go 1.22 / Node.js 20 / Python 3.12]
**Framework:** [e.g. Express / FastAPI / Gin / Rails]

### Key directories

```
[repo-root]/
├── [src/ or cmd/]          # Application code
│   ├── [handlers/]         # HTTP handlers / controllers
│   ├── [services/]         # Business logic
│   ├── [repository/]       # Database access layer
│   └── [models/]           # Data models / types
├── [tests/]                # Test files
├── [migrations/]           # Database migrations
├── [scripts/]              # Utility scripts
├── [.github/workflows/]    # CI/CD pipeline definitions
└── [docs/]                 # Additional documentation
```

**Where to start reading:** [Point to 2–3 key files that give the best orientation — e.g. `main.go`, `routes.js`, `app.py`]

### Things that might surprise you

- [Unusual pattern 1 — e.g. "We use event sourcing — state is derived from an event log, not stored directly"]
- [Unusual pattern 2 — e.g. "Auth is handled by the gateway — this service trusts the `X-User-Id` header"]
- [Unusual pattern 3 — any non-obvious decisions or legacy choices]

---

## Local Development Setup

**Estimated setup time:** [X minutes for a fresh machine]

### Prerequisites

- [ ] [Tool 1] — version [X] — [install link]
- [ ] [Tool 2] — version [X] — [install link]
- [ ] Access to [repo / internal package registry] — request from [who]
- [ ] [Any secrets or credentials needed] — request from [who]

### Step-by-step setup

```bash
# 1. Clone the repo
git clone [repo URL]
cd [repo-name]

# 2. Copy and configure environment variables
cp .env.example .env
# Edit .env — see "Environment Variables" section below

# 3. Start dependencies (database, cache, etc.)
[docker compose up -d / make deps / etc.]

# 4. Install dependencies
[npm install / go mod download / pip install -r requirements.txt]

# 5. Run database migrations
[migration command]

# 6. Start the service
[start command]

# 7. Verify it's working
curl http://localhost:[PORT]/health
# Expected: {"status":"ok"}
```

**If this doesn't work:** Check [Troubleshooting section below] or ask in `#[channel]`.

### Environment Variables

| Variable | Required | Description | Example |
|---|---|---|---|
| `DATABASE_URL` | Yes | Connection string for the primary DB | `postgres://localhost:5432/[db]` |
| `[VAR_2]` | Yes | [Description] | [Example] |
| `[VAR_3]` | No | [Description — default value] | [Example] |

**Secrets for local dev:** [Where to get them — e.g. "Run `[command]` to pull from Vault" or "Ask [person] in #[channel]"]

### Useful local commands

```bash
[start command]           # Start the service
[test command]            # Run all tests
[lint command]            # Run linter
[format command]          # Format code
[migration command]       # Run pending migrations
[seed command]            # Seed local database
```

---

## Testing

**Testing philosophy:** [e.g. "We test at the integration layer — unit tests for pure functions, integration tests for anything touching the DB or external services"]

### Running tests

```bash
# All tests
[test command]

# Unit tests only
[unit test command]

# Integration tests (requires local deps running)
[integration test command]

# A specific test file or test case
[test command with filter]
```

**Test coverage:** [X]% (minimum required to pass CI: [Y]%)
**Coverage report:** [Where to find it]

### Writing tests

- **Unit tests:** [Where to put them — e.g. alongside source files as `*_test.go`]
- **Integration tests:** [Where to put them — e.g. `tests/integration/`]
- **Test database:** [How it works — e.g. "Each test gets a clean transaction that rolls back on teardown — see `tests/helpers/db.go`"]
- **Mocking:** [Policy — e.g. "We mock at the repository layer — don't mock the DB directly"]

---

## Making Changes

### Branching

[Branch naming convention — e.g. `feature/[ticket-id]-short-description`, `fix/[ticket-id]-short-description`]

### Before opening a PR

- [ ] Tests pass locally
- [ ] Linter passes (`[lint command]`)
- [ ] New behaviour has test coverage
- [ ] Any new environment variables are added to `.env.example` and documented
- [ ] Database migrations are backward-compatible (old code can run against new schema)

### Code review

- **Reviewers:** [Who to request review from — e.g. "Any engineer on [team]; lead review required for auth changes"]
- **Expected review time:** [X hours / 1 business day]
- **PR template:** [Link or auto-generated by GitHub]

### Database migrations

```bash
# Create a new migration
[migration create command]

# Apply pending migrations
[migration up command]

# Roll back last migration
[migration down command]
```

**Migration rules:**
- All migrations must be backward-compatible — old code must run against the new schema
- Never rename or drop a column in a single migration — do it in two steps (add new, migrate data, drop old)
- Test your rollback before merging

---

## Deployment

**How code gets to production:** [1–2 sentence summary — link to full CI/CD playbook if it exists]

1. Merge to `main` → automatic deploy to staging
2. Smoke tests run on staging
3. Manual approval → deploy to production
4. Post-deploy monitoring for [X minutes]

**Deployment docs:** [Link to CI/CD playbook or pipeline docs]

**Who can deploy:** [Any engineer / Lead engineer / On-call engineer — specify]

**Deployment channel:** `#[deployments channel]`

---

## Monitoring and Observability

**Dashboard:** [Datadog / Grafana / CloudWatch — link]
**Logs:** [Log aggregation tool and link — e.g. "Logs are in Datadog under service:[name]"]
**Traces:** [Tracing tool and link if applicable]
**Alerts:** [Where alerts fire — e.g. PagerDuty / Slack #alerts-[service]]

**Key metrics to know:**
- **Error rate:** Should be <[X]% (alert at [Y]%)
- **P99 latency:** Should be <[X]ms
- **[Business metric]:** [e.g. "Queue depth should be <100 items"]

---

## On-Call

**On-call schedule:** [PagerDuty / Opsgenie link]
**Who's on-call now:** [Link to current schedule or `#oncall` channel]
**Escalation:** [On-call → [team lead] → [EM] — after [X] minutes unacknowledged]

**If you get paged:**
1. Acknowledge the alert
2. Check [dashboard link] for the first clue
3. Common alert runbooks: [link to oncall-runbook or runbook-writer output]
4. If you can't resolve in [X minutes], escalate to [person/channel]

---

## Key Contacts

| Role | Name | Best way to reach |
|---|---|---|
| Tech lead | [Name] | Slack: @[handle] |
| On-call rotation | [Team] | PagerDuty / `#on-call` |
| Platform / infra | [Team] | `#platform` Slack channel |
| Database / DBA | [Name or team] | `#database` Slack channel |
| [Upstream service] owner | [Name] | Slack: @[handle] |

**Where to ask questions:**
- General engineering: `#engineering`
- This service specifically: `#[service-name]`
- Urgent / production issues: `#incidents`

---

## Troubleshooting

### "The service won't start locally"

1. Check that Docker / dependencies are running: `[command]`
2. Check `.env` is populated — missing values cause silent failures
3. Check logs: `[log command]`
4. Ask in `#[channel]`

### "Tests are failing locally but passing in CI"

- Check your local dependency versions match CI: `[version check command]`
- Try a clean install: `[clean install command]`
- Integration tests need local deps running — `[start deps command]`

### "I can't access [internal tool / system]"

- Request access through [process — e.g. Okta self-serve / ask your manager]

### "Something looks wrong in production"

1. Check [dashboard] for the error spike
2. Check recent deploys in `#deployments`
3. If it's an active incident, page on-call via [PagerDuty / Slack command]

---

## Further Reading

- [Architecture Decision Records (ADRs)](./docs/decisions/) — why the codebase is the way it is
- [API documentation](./docs/api/) or [link to external docs]
- [Incident runbooks](./docs/runbooks/)
- [CI/CD pipeline documentation](./docs/cicd/)
- [Team working agreements](./docs/team/)

---

## Quality Checks

- [ ] Local setup instructions work on a fresh machine — tested recently
- [ ] Environment variables table is complete and accurate
- [ ] "Things that might surprise you" captures the actual surprises (ask a recent joiner)
- [ ] On-call section has real links, not placeholders
- [ ] Contacts are current — team members with real Slack handles
- [ ] Troubleshooting covers the top 3 actual questions new joiners ask

## Anti-Patterns

- [ ] Do not document the ideal setup — document the actual setup; real oddities and gotchas are what new engineers need most
- [ ] Do not leave placeholder contacts like "ask your manager" — name specific people for each domain or the doc becomes useless when the new joiner has an urgent question
- [ ] Do not write the onboarding doc without reviewing it with a recent joiner — the author is blind to what they take for granted
- [ ] Do not include every piece of architectural detail — an onboarding doc that covers everything teaches nothing; link to deeper docs instead
- [ ] Do not skip the "things that might surprise you" section — undocumented non-obvious patterns are the number one cause of wasted engineering time in the first week
